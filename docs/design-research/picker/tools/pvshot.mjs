// Screenshot the preview panel once per option (that option alone on top of the default) for pixel diffing.
import fs from 'node:fs';
const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
const bv = await (await fetch('http://localhost:9333/json/version')).json();
const bws = new WebSocket(bv.webSocketDebuggerUrl); await new Promise(r => bws.onopen = r);
const tid = await new Promise(r => { bws.onmessage = e => { const m = JSON.parse(e.data); if (m.id === 1) r(m.result.targetId); };
  bws.send(JSON.stringify({ id: 1, method: 'Target.createTarget', params: { url: 'about:blank', newWindow: true, width: 1440, height: 1000 } })); });
bws.close();
const tab = (await (await fetch('http://localhost:9333/json')).json()).find(t => t.id === tid);
const closeTab = () => fetch('http://localhost:9333/json/close/' + tab.id).catch(() => {});
setTimeout(async () => { await closeTab(); process.exit(2); }, 240000);
const ws = new WebSocket(tab.webSocketDebuggerUrl);
let id = 0; const pending = new Map();
ws.onmessage = e => { const m = JSON.parse(e.data); if (pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
await new Promise(r => ws.onopen = r);
const send = (method, params = {}) => new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const ev = async x => (await send('Runtime.evaluate', { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
await send('Emulation.setFocusEmulationEnabled', { enabled: true });
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: 'http://localhost:8765/' }); await sleep(4000);
const cats = await ev(`CATS.map(c => [c.id, c.kind, Object.keys(c.options)])`);
const shot = async name => {
  await sleep(250);
  const r = await ev(`(() => { const b = document.querySelector('#pv').getBoundingClientRect(); return [b.x, b.y + scrollY, b.width, Math.min(b.height, 1100)]; })()`);
  const s = await send('Page.captureScreenshot', { format: 'png', clip: { x: r[0], y: r[1], width: r[2], height: r[3], scale: 1 }, captureBeyondViewport: true });
  fs.writeFileSync(`${out}/${name}.png`, Buffer.from(s.result.data, 'base64'));
};
await ev(`picks = {}; pv(); 1`); await shot('_base');
for (const [cid, kind, opts] of cats) for (const o of opts) {
  await ev(`picks = {${JSON.stringify(cid)}: ${kind === 'multi' ? JSON.stringify([o]) : JSON.stringify(o)}}; pv(); 1`);
  await shot(`${cid}__${o}`);
}
await ev(`picks = {}; pv(); 1`);
ws.close(); await closeTab(); process.exit(0);
