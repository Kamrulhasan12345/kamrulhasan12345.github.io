#!/usr/bin/env bash
# Self-test for mechanical.mjs: plant known defects in a copy of dist/ and
# assert each one is reported. Usage: bash selftest.sh [distDir=dist] [badPdf]
# badPdf: any multi-page PDF containing a phone number (optional).
set -uo pipefail
here=$(cd "$(dirname "$0")" && pwd)
dist=${1:-dist}
bad_pdf=${2:-}
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
cp -r "$dist" "$tmp/dist"
home="$tmp/dist/index.html"
about="$tmp/dist/about/index.html"

python3 - "$home" "$about" <<'PY'
import re, sys
home, about = sys.argv[1], sys.argv[2]
h = open(home).read()
# 1 nav overflow + Home link
h = re.sub(r'(<nav[^>]*aria-label="Main"[^>]*>)', r'\1<a href="/">Home</a><a href="/x/">A</a><a href="/y/">B</a>', h, count=1)
# 2 email removed from hero
h = re.sub(r'[\w.+-]+@[\w-]+\.[\w.]+', 'email', h)
# 3 og:image removed
h = re.sub(r'<meta property="og:image"[^>]*>', '', h)
# 4 img without alt
h = h.replace('</main>', '<img src="/favicon.svg"></main>')
open(home, 'w').write(h)
a = open(about).read()
# 5 Bengali text without lang=bn, 6 second h1
a = a.replace('</main>', '<p>বাংলা লেখা</p><h1>Again</h1></main>')
open(about, 'w').write(a)
PY
rm -f "$tmp/dist/robots.txt"   # 7 robots.txt gone
pdf_arg=()
[ -n "$bad_pdf" ] && pdf_arg=("$bad_pdf")

out=$(node "$here/mechanical.mjs" "$tmp/dist" "${pdf_arg[@]}")
expect() { grep -q "\"id\":\"$1\",\"status\":\"$2\"" <<<"$out" && echo "ok   $1 $2" || { echo "MISS $1 $2"; miss=1; }; }
miss=0
expect M-NAV-01 fail
expect M-NAV-02 warn
expect M-HOME-01 fail
expect M-SEO-04 fail
expect M-A11Y-04 fail
expect M-A11Y-06 fail
expect M-A11Y-02 fail
expect M-SEO-07 fail
expect M-LNK-01 fail
if [ -n "$bad_pdf" ]; then expect M-CV-01 fail; expect M-CV-02 fail; fi
exit $miss
