"""Package classification.json + screenshots into picker/ (data.json + img/<id>.jpg)."""
import json, os, re, subprocess
from urllib.parse import urlparse

T = os.path.join(os.path.dirname(__file__), "..")
OUT = os.path.join(T, "picker")
os.makedirs(os.path.join(OUT, "img"), exist_ok=True)
C = json.load(open(os.path.join(T, "classification.json")))


def name(s):
    if s["id"].startswith("dr"):
        return "Dribbble · " + re.split(r"\.\s|\s—\s", s["notes"])[0][:40]
    h = urlparse(s["url"]).netloc.removeprefix("www.")
    return h + (urlparse(s["url"]).path.rstrip("/") if urlparse(s["url"]).path not in ("", "/") else "")


sites = {}
for sid, s in C["sites"].items():
    dst = os.path.join(OUT, "img", sid + ".jpg")
    if not os.path.exists(dst):
        if sid.startswith("dr"):  # crop to the shot itself, drop Dribbble's page chrome
            cmd = ["magick", os.path.join(T, "raw", sid + "-00.jpg"), "-crop", "1030x600+445+405", "+repage",
                   "-resize", "720x", "-quality", "70", dst]
        else:  # two viewports stacked
            cmd = ["magick", os.path.join(T, "sheets", sid + ".jpg"), "-resize", "720x", "-quality", "68", dst]
        subprocess.run(cmd, check=True)
    sites[sid] = {"id": sid, "name": name(s), "url": s["url"], "family": s["family"], "notes": s["notes"],
                  "scores": {c: {o: round(p, 2) for o, p in sc.items()} for c, sc in s["scores"].items()}}

cats = [{k: c[k] for k in ("id", "title", "kind", "q", "options", "examples")} for c in C["categories"]]
json.dump({"categories": cats, "sites": sites}, open(os.path.join(OUT, "data.json"), "w"), separators=(",", ":"))
size = sum(os.path.getsize(os.path.join(OUT, "img", f)) for f in os.listdir(os.path.join(OUT, "img")))
print(len(sites), "sites,", len(os.listdir(os.path.join(OUT, "img"))), "images,", round(size / 1e6, 1), "MB;",
      "data.json", round(os.path.getsize(os.path.join(OUT, "data.json")) / 1e3), "KB")
