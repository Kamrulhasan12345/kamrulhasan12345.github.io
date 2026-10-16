"""Build sites.json: one record per single-design capture, with notes from the research docs."""
import json, os, re, sys
from urllib.parse import urlparse

T = os.path.join(os.path.dirname(__file__), "..")
DOCS = sys.argv[1]
SKIP = {"d05-framework", "e05-bruno-simon", "dr15-personal-concept", "dr16-changelog",  # blank / blocked
        "d06-berkeleygraphics"}  # redirects to usgraphics (d07)
SKIP |= {"k14-practicaltypography", "k15-beautifulracket"}  # capture timed out
EXTRA = {  # sites not in the catalog tables — notes from screenshot review
    "k01-ryanancheta": "Ryan Ancheta. Green-on-black CRT terminal portfolio: boot lines with [ OK ], giant pixel display name, prompt-driven sections, experience rendered as `git log --career` with commit hashes and tags.",
    "k02-airil": "Airil Zulkifli. Terminal-themed developer portfolio: windowed shell cards, Bayer-dithered blue pixel portrait, floating binary and hex digits as texture, numbered sections (01. About the developer), CRT/dark mode toggle.",
    "k03-asifuddin": "Md. Asif Uddin, deep-learning researcher. Warm brown-black, large serif name, italic pull quote, a 'FIGURA 1' captioned line figure, a row of research stats, chaptered sections with small-caps labels and dotted dividers.",
    "k04-carteakey": "carteakey.dev (Kartikey). Dark index of posts as dense cards with type badges (POST/NOTE/SNIPPET), dithered avatar, blue accent, small mono metadata, sketch illustrations.",
    "k05-dawidesign": "DaWi Design (Andre van Daalen). Warm dark, sans headline with serif-italic accent words, mono micro labels, numbered sections '01 — Services' to '07 — Contact', portrait photo, service cards.",
    "k06-finnh": "finnh.ca (Finn). White monochrome site, Bayer/Atkinson dithered project images and 3D object, project cards with mono dates, playful hardware projects.",
    "k07-ineedmorecoffee": "I Need More Coffee (Sohal Sudheer). Dark serif blog, narrow column, recent posts and favorites as dated lists, dithered black-and-white images in posts.",
    "k08-redblobgames": "Red Blob Games (Amit Patel). Interactive visual explanations of algorithms; homepage is a grid of diagram thumbnails, red header band.",
    "k09-nanfyi": "Not a Number (Nanda Syahrasyad). Interactive CS blog: serif titles with line-icon per post in a list, sticky left intro column, light grey.",
    "k10-maximeheckel": "Maxime Heckel's article on dithering and retro shading: dark, centered prose with live WebGL demos showing CRT, pixelation and dithering effects with toggles.",
    "k11-gabx": "gabx.io. Light-mode terminal homepage: cat readme.md, ls -la, tab completion, a profile photo pane, all monospace and readable.",
    "k12-zoomie": "Andrew Arderne. Orange color-field page, huge bold and outlined display type (SOFTWARE ENGINEER), duotone portrait, vertical timeline arrow.",
    "k13-eloquentjs": "Eloquent JavaScript (Marijn Haverbeke). A book's homepage: cover art, numbered chapter table of contents grouped into parts, small-caps serif headings.",
    "a00-carloslorenzo": "carloslorenzo.dev, the primary reference. The whole page is a source file open in an editor: line-number gutter rail, colored scope spine per section, lowercase italic rule headings (—— about ——), key-value spec list hero (Role/Team/Study/Focus/Base), a titled window with a live wavelet canvas, git-log experience ([HEAD]/[main]) with tree connectors, ~/projects/slug path-labelled cards, outline uppercase tags colored by domain, Iosevka mono plus Iosevka Aile prose, blue-black background with equal-lightness pastel accents.",
    "dr01-terminal-ui": "Terminal UI portfolio concept: an interactive shell with /whoami, /links, /help commands, numbered quick links and a status line (uptime, cmds).",
    "dr04-ai-engineer": "Light pastel gradient portfolio, centered 'Hi, I'm Jay Jhaveri' hero, pill navigation, blue call-to-action buttons.",
    "dr06-swe-docs": "Dark navy portfolio with a documentation-style sidebar, headline with a word wrapped in code braces, stat boxes.",
    "dr08-stealth": "Dark backend developer portfolio: headshot cut-out, blue accent headline, giant ABOUT US watermark text.",
    "dr09-scalable": "Dark red gradient developer portfolio with dramatic portrait photos and stacked card sections.",
    "dr12-dark-bento": "Dark green bento-grid portfolio with glowing tech-toolbox cards and a portrait.",
    "dr19-pro-dev-template": "Light blue developer template with portrait, about section, featured project cards and skill bars.",
}
FAMILY = {"a": "engineer personal site", "b": "editorial / indie web", "c": "dev-tool product site",
          "d": "hardware / object brand", "e": "OS / terminal / toy", "f": "studio / brand",
          "h": "ML / research or technical blog", "k": "gap-fill find", "i": "hardware maker / crafted app", "dr": "Dribbble concept shot"}


def host(u):
    return urlparse(u).netloc.removeprefix("www.")


# url -> id from capture lists
ids = {}
for f in ("sites.txt", "sites2.txt", "dribbble.txt", "sites3.txt"):
    for line in open(os.path.join(T, f)):
        if line.strip():
            i, u = line.split()
            ids[i] = u

# notes from catalog tables: | [name](url) | what | move |
notes = {}
for line in open(os.path.join(DOCS, "02-references.md")):
    m = re.match(r"\|\s*★?\s*\[([^\]]+)\]\(([^)]+)\)[^|]*\|([^|]*)\|([^|]*)\|", line)
    if m:
        notes[host(m.group(2))] = f"{m.group(1)}. {m.group(3).strip()} Notable: {m.group(4).strip()}"
for line in open(os.path.join(DOCS, "04-dribbble.md")):
    m = re.match(r"\|\s*\d+\s*\|\s*\*\*([^*]+)\*\*[^`]*`(dr\d+)`\s*\|([^|]*)\|", line)
    if m:
        notes[m.group(2)] = f"{m.group(1)}. {m.group(3).strip()}"

out = []
for i, u in ids.items():
    if i in SKIP or i[0] in "gj":
        continue
    fam = "dr" if i.startswith("dr") else i[0]
    key = i[:4] if fam == "dr" else host(u)
    n = EXTRA.get(i) or notes.get(key) or notes.get(host(u).split("/")[0], "")
    out.append({"id": i, "url": u, "family": FAMILY[fam], "notes": n})
json.dump(out, open(os.path.join(T, "sites.json"), "w"), indent=1)
print(len(out), "sites;", sum(1 for s in out if not s["notes"]), "without notes:",
      [s["id"] for s in out if not s["notes"]])
