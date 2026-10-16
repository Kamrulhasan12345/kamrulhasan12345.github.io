"""Merge Amos votes -> classification.json, and build one review sheet per category.

score(option) = w_img * p_img + (1 - w_img) * p_text   (w_img set per category in taxonomy.json)
overrides.json ({site: {category: option-or-[options]}}) pins manual corrections after visual review.
"""
import json, os, subprocess, sys

T = os.path.join(os.path.dirname(__file__), "..")
TAX = json.load(open(os.path.join(T, "taxonomy.json")))
SITES = {s["id"]: s for s in json.load(open(os.path.join(T, "sites.json")))}
OVR = json.load(open(os.path.join(T, "overrides.json"))) if os.path.exists(os.path.join(T, "overrides.json")) else {}


def probs(ans):
    if not ans:
        return {}
    return ans.get("probabilities") or {}


out = {"categories": TAX, "sites": {}}
for sid, s in SITES.items():
    p = os.path.join(T, "votes", sid + ".json")
    v = json.load(open(p)) if os.path.exists(p) else {}
    scores = {}
    for c in TAX:
        pi, pt = probs(v.get("img", {}).get(c["id"])), probs(v.get("text", {}).get(c["id"]))
        w = c["w_img"] if pi and pt else (1.0 if pi else 0.0)
        sc = {o: round(w * pi.get(o, 0) + (1 - w) * pt.get(o, 0), 3) for o in c["options"]}
        pin = OVR.get(sid, {}).get(c["id"])
        if pin is not None:  # manual correction wins
            pins = pin if isinstance(pin, list) else [pin]
            sc = {o: (0.99 if o in pins else min(x, 0.2)) for o, x in sc.items()}
        scores[c["id"]] = sc
    out["sites"][sid] = {**s, "scores": scores}

# rank examples per option
for c in TAX:
    c["examples"] = {}
    for o in c["options"]:
        ranked = sorted(out["sites"], key=lambda sid: -out["sites"][sid]["scores"][c["id"]][o])
        if c["kind"] == "single":  # an example must have this option as its top pick
            ranked = [sid for sid in ranked
                      if max(out["sites"][sid]["scores"][c["id"]].items(), key=lambda kv: kv[1])[0] == o]
        else:
            ranked = [sid for sid in ranked if out["sites"][sid]["scores"][c["id"]][o] >= 0.5]
        c["examples"][o] = ranked[:8]

json.dump(out, open(os.path.join(T, "classification.json"), "w"), indent=1)

# review sheets: one row per option, top 4 example heroes
if "--sheets" in sys.argv:
    os.makedirs(os.path.join(T, "review"), exist_ok=True)
    for c in TAX:
        rows = []
        for o, ex in c["examples"].items():
            args = ["montage"]
            for sid in ex[:4]:
                args += ["-label", sid, os.path.join(T, "raw", sid + "-00.jpg")]
            if not ex:
                args += ["-label", "(none)", "xc:#333"]
            row = os.path.join(T, "review", f"_{c['id']}_{o}.jpg")
            args += ["-tile", "4x1", "-geometry", "420x262+3+3", "-pointsize", "16", "-background", "#222",
                     "-fill", "white", "-title", o, row]
            subprocess.run(args, check=True)
            rows.append(row)
        subprocess.run(["magick", *rows, "-append", "-resize", "1700x", "-quality", "70",
                        os.path.join(T, "review", c["id"] + ".jpg")], check=True)
        for r in rows:
            os.remove(r)
        print("review/" + c["id"] + ".jpg")
print("sites:", len(out["sites"]), " empty options:",
      [f"{c['id']}.{o}" for c in TAX for o, ex in c["examples"].items() if not ex])
