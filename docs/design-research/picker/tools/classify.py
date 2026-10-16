"""Classify every site against taxonomy.json with Amos.

Two votes per site:
  img  — amos-1-small sees the two viewport screenshots (the only tier that reads photos)
  text — amos-1-large reads the site name, family and research notes (highest-accuracy tier)
Raw answers are cached in votes/<id>.json so reruns only fill gaps.
"""
import json, os, sys
from concurrent.futures import ThreadPoolExecutor
sys.path.insert(0, os.path.dirname(__file__))
import amos

T = os.path.join(os.path.dirname(__file__), "..")
TAX = json.load(open(os.path.join(T, "taxonomy.json")))
SITES = json.load(open(os.path.join(T, "sites.json")))
TEXT_MODEL = os.environ.get("TEXT_MODEL", "amos-1-large")
os.makedirs(os.path.join(T, "votes"), exist_ok=True)


def questions():
    return {c["id"]: {"type": "multi" if c["kind"] == "multi" else "choice",
                      "instructions": c["q"], "criteria": c["options"]} for c in TAX}


def run(site):
    path = os.path.join(T, "votes", site["id"] + ".json")
    v = json.load(open(path)) if os.path.exists(path) else {}
    try:
        if "img" not in v:
            shots = [os.path.join(T, "raw", f"{site['id']}-{n:02d}.jpg") for n in (0, 1)]
            shots = [s for s in shots if os.path.exists(s)]
            v["img"] = amos.call("amos-1-small",
                                 "Two screenshots (first screen, then scrolled) of a website homepage. Judge its visual design.",
                                 questions(), shots)
        if "text" not in v:
            state = {"site": site["url"], "kind": site["family"], "design notes": site["notes"]}
            v["text"] = amos.call(TEXT_MODEL, state, questions())
    except Exception as e:  # keep partial votes, report, move on
        print("ERR", site["id"], e, flush=True)
    json.dump(v, open(path, "w"))
    return site["id"], sorted(v)


if __name__ == "__main__":
    only = sys.argv[1:]
    todo = [s for s in SITES if not only or s["id"] in only]
    with ThreadPoolExecutor(int(os.environ.get("WORKERS", 12))) as ex:
        for sid, got in ex.map(run, todo):
            print(sid, got, flush=True)
