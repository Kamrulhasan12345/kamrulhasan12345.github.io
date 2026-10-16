"""Tiny Amos client: amos.call(model, state, questions, images=[paths]) -> answers dict."""
import base64, json, subprocess, sys, time, urllib.request, urllib.error

URL = "https://api.amos.scira.ai/v1/systemone"


def img_b64(path, width=1000):
    jpg = subprocess.run(["magick", path, "-resize", f"{width}x", "-quality", "70", "jpg:-"],
                         capture_output=True, check=True).stdout
    return base64.b64encode(jpg).decode()


def call(model, state, questions, images=(), retries=6):
    body = {"model": model, "state": state, "questions": questions}
    if images:
        body["images"] = [img_b64(p) for p in images]
    data = json.dumps(body).encode()
    for i in range(retries):
        req = urllib.request.Request(URL, data=data, headers={"Content-Type": "application/json"})
        try:
            with urllib.request.urlopen(req, timeout=240) as r:
                return json.load(r)["answers"]
        except urllib.error.HTTPError as e:
            msg = e.read().decode()[:300]
            if e.code in (429, 503, 500):
                time.sleep(int(e.headers.get("Retry-After") or 5 * (i + 1)))
                continue
            raise RuntimeError(f"{e.code}: {msg}")
        except (urllib.error.URLError, TimeoutError):
            time.sleep(10 * (i + 1))
    raise RuntimeError("amos: retries exhausted")


if __name__ == "__main__":
    a = call("amos-1-small", "Screenshot of a website homepage.", {
        "theme": {"type": "choice", "instructions": "What is the dominant page background?",
                  "criteria": {"dark": "near-black or dark navy", "light": "white or off-white", "colorful": "saturated color field"}},
        "mono": {"type": "noul", "instructions": "Is most of the text set in a monospace font?"},
        "traits": {"type": "multi", "instructions": "Which visual elements are present?",
                   "criteria": {"chart": "a bar chart or benchmark graph", "photo": "a photograph", "code": "a code or terminal snippet"}},
    }, [sys.argv[1]])
    print(json.dumps(a, indent=1))
