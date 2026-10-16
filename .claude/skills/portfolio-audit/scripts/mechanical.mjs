#!/usr/bin/env node
// Mechanical portfolio checks on a built site. No dependencies.
// Usage: node mechanical.mjs [distDir=dist] [resumePdf=public/resume.pdf]
// Prints one JSON object per finding, then a summary line. Exit 1 if any "fail".
// Check IDs match references/checks.md. Regex HTML parsing is deliberate:
// the site is static Astro output we control, not arbitrary HTML.
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const dist = process.argv[2] ?? "dist";
const pdf = process.argv[3] ?? "public/resume.pdf";
const findings = [];
const add = (id, status, where, msg) => findings.push({ id, status, where, msg });

const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
if (!existsSync(dist)) {
	console.error(`no ${dist}/ — run the build first`);
	process.exit(2);
}
const files = walk(dist);
const pages = files.filter((f) => f.endsWith(".html"));
const route = (f) => "/" + relative(dist, f).replace(/index\.html$/, "").replace(/\.html$/, "");
const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];
const metas = (html) => [...html.matchAll(/<meta\s[^>]*>/g)].map((m) => m[0]);
const meta = (html, key) => metas(html).find((t) => attr(t, "name") === key || attr(t, "property") === key);

const isRedirect = (html) => /http-equiv="refresh"/.test(html);
const content = pages.filter((f) => !isRedirect(readFileSync(f, "utf8")) && !f.endsWith("404.html"));
const descs = new Map();

for (const f of pages) {
	const html = readFileSync(f, "utf8");
	const r = route(f);

	if (isRedirect(html)) {
		const to = html.match(/url=([^"]+)"/)?.[1]?.split("#")[0];
		const target = to && join(dist, to, to.endsWith("/") ? "index.html" : "");
		if (!/name="robots" content="noindex"/.test(html)) add("M-SEO-05", "fail", r, "redirect page is not noindex");
		if (!target || !existsSync(target)) add("M-LNK-02", "fail", r, `redirect target missing: ${to}`);
		continue;
	}

	// SEO / sharing (M-SEO)
	const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
	if (!title) add("M-SEO-01", "fail", r, "missing <title>");
	const desc = meta(html, "description");
	if (!desc) add("M-SEO-02", "fail", r, "missing meta description");
	else descs.set(attr(desc, "content"), [...(descs.get(attr(desc, "content")) ?? []), r]);
	if (!/<link rel="canonical"/.test(html)) add("M-SEO-03", "fail", r, "missing canonical");
	for (const k of ["og:title", "og:description", "og:image", "og:url", "twitter:card"])
		if (!meta(html, k)) add("M-SEO-04", "fail", r, `missing ${k}`);
	if (r.startsWith("/blog/") && r !== "/blog/" && attr(meta(html, "og:type") ?? "", "content") !== "article")
		add("M-SEO-04", "warn", r, "post og:type is not article");
	if (!/<html lang="/.test(html)) add("M-A11Y-01", "fail", r, "missing <html lang>");

	// Structure / a11y (M-A11Y)
	const h1s = html.match(/<h1[\s>]/g)?.length ?? 0;
	if (h1s !== 1) add("M-A11Y-02", "fail", r, `${h1s} <h1> elements (want 1)`);
	const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]);
	levels.forEach((l, i) => i && l > levels[i - 1] + 1 && add("M-A11Y-03", "warn", r, `heading jumps h${levels[i - 1]} → h${l}`));
	for (const img of html.match(/<img\s[^>]*>/g) ?? []) if (attr(img, "alt") === undefined) add("M-A11Y-04", "fail", r, `img without alt: ${attr(img, "src")}`);
	if (!/href="#main"/.test(html)) add("M-A11Y-05", "warn", r, "no skip link");
	if (/[ঀ-৿]/.test(html.replace(/<[^>]+>/g, "")) && !/lang="bn"/.test(html)) add("M-A11Y-06", "fail", r, "Bengali text without lang=\"bn\"");

	// Links (M-LNK): every internal href must resolve to a built file
	for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
		if (!href.startsWith("/") || href.startsWith("//")) continue;
		const p = href.split(/[?#]/)[0];
		const cands = [join(dist, p), join(dist, p, "index.html"), join(dist, p + ".html")];
		if (!cands.some((c) => existsSync(c) && statSync(c).isFile())) add("M-LNK-01", "fail", r, `broken internal link ${href}`);
	}

	// Page weight (M-PERF)
	const kb = Buffer.byteLength(html) / 1000;
	if (kb > 60) add("M-PERF-01", "warn", r, `HTML is ${kb.toFixed(0)} KB (budget 60)`);
	const ext = [...html.matchAll(/(?:src|href)="(https?:\/\/[^"]+)"/g)].map((m) => m[1]).filter((u) => /\.(js|css|woff2?)(\?|$)/.test(u));
	if (ext.length) add("M-PERF-03", "warn", r, `render-time external requests: ${ext.join(", ")}`);
}

// Navigation (M-NAV): measured on the home page header
const home = readFileSync(join(dist, "index.html"), "utf8");
const nav = home.match(/<nav[^>]*aria-label="Main"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
const navLinks = nav ? (nav.match(/<a\s/g) ?? []).length : 0;
if (!nav) add("M-NAV-01", "fail", "/", "no <nav aria-label=\"Main\">");
else if (navLinks > 5) add("M-NAV-01", "fail", "/", `${navLinks} top-level nav links (max 5)`);
else add("M-NAV-01", "pass", "/", `${navLinks} nav links`);
if (nav && /href="\/"/.test(nav)) add("M-NAV-02", "warn", "/", "nav has a Home link; the name/logo already links home");

// First screen (M-HOME): the recruiter's 10-second needs must be in the HTML before the first <h2>
const hero = home.split(/<h2[\s>]/)[1] === undefined ? home : home.slice(0, home.search(/<h2[\s>]/));
const heroText = hero.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
if (!/[\w.+-]+@[\w-]+\.[\w.]+/.test(heroText)) add("M-HOME-01", "fail", "/", "email address not visible as text before the first section");
if (!/href="\/resume\.pdf"/.test(hero)) add("M-HOME-02", "fail", "/", "no résumé link before the first section");
if (!/(open to|available|looking for)/i.test(heroText)) add("M-HOME-03", "fail", "/", "no availability statement before the first section");
if (!/(class of|expected|graduat)\D{0,20}20\d\d/i.test(heroText)) add("M-HOME-04", "warn", "/", "graduation year not on the first screen");
const ld = home.match(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/)?.[1];
try {
	if (!ld) throw new Error("missing");
	JSON.parse(ld);
} catch (e) {
	add("M-SEO-06", "fail", "/", `Person/ProfilePage JSON-LD ${e.message}`);
}

// Site-wide files
const robots = join(dist, "robots.txt");
if (!existsSync(robots) || !/Sitemap:/i.test(readFileSync(robots, "utf8"))) add("M-SEO-07", "fail", "/robots.txt", "missing or no Sitemap: line");
if (!files.some((f) => /sitemap.*\.xml$/.test(f))) add("M-SEO-07", "fail", "/", "no sitemap");
if (!existsSync(join(dist, "404.html"))) add("M-SEO-08", "fail", "/404", "no 404 page");
for (const [d, rs] of descs) if (rs.length > 1) add("M-SEO-02", "warn", rs.join(", "), `duplicate meta description: "${d.slice(0, 60)}…"`);

const fonts = files.filter((f) => /\.(woff2?|ttf|otf)$/.test(f));
for (const f of fonts) {
	const kb = statSync(f).size / 1000;
	if (kb > 100) add("M-PERF-02", "warn", relative(dist, f), `font file ${kb.toFixed(0)} KB (budget 100; subset it)`);
}

// Résumé PDF (M-CV)
if (!existsSync(pdf)) add("M-CV-01", "fail", pdf, "no résumé PDF");
else {
	const sh = (cmd, args) => {
		try {
			return execFileSync(cmd, args, { encoding: "utf8" });
		} catch {
			return null;
		}
	};
	const info = sh("pdfinfo", [pdf]);
	const text = sh("pdftotext", [pdf, "-"]);
	if (info === null || text === null) add("M-CV-00", "warn", pdf, "poppler-utils missing; résumé not checked");
	else {
		const pages_ = +info.match(/Pages:\s+(\d+)/)?.[1];
		if (pages_ !== 1) add("M-CV-01", "fail", pdf, `${pages_} pages (student résumé must be 1)`);
		if (/(\+?880[\s-]?1\d{3}|\+?\d{1,3}[\s-]?\(?\d{3,4}\)?[\s-]?\d{3}[\s-]?\d{3,4})/.test(text)) add("M-CV-02", "fail", pdf, "phone number in the public PDF");
		if (/[ﬀ-ﬆ]/.test(text)) add("M-CV-03", "fail", pdf, "ligature glyphs in extracted text (ATS keyword misses: ﬁ ﬂ ﬀ ﬃ ﬄ)");
		if (/[-]|[ĆȰȉ]/.test(text)) add("M-CV-04", "fail", pdf, "icon-font or private-use glyphs in extracted text");
		if (!/@/.test(text)) add("M-CV-05", "fail", pdf, "email not extractable");
		if (/^\s*(summary|objective|profile)\s*$/im.test(text)) add("M-CV-06", "fail", pdf, "has a Summary/Objective section");
	}
}

for (const f of findings) console.log(JSON.stringify(f));
const n = (s) => findings.filter((f) => f.status === s).length;
console.log(JSON.stringify({ summary: true, pages: pages.length, fail: n("fail"), warn: n("warn"), pass: n("pass") }));
process.exit(n("fail") ? 1 : 0);
