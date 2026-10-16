#!/usr/bin/env bash
# Build public/resume.pdf from the private 1-page résumé, minus the phone number.
# Usage: scripts/web-resume.sh [resume.tex]   (needs tectonic on PATH, or TECTONIC=/path/to/tectonic)
set -euo pipefail
src=${1:-$HOME/Personal/resumes/kamrul_hasan_resume_1page.tex}
out=$(cd "$(dirname "$0")/.." && pwd)/public
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

# drop "+880 … \sep" from the contact line
sed 's/+880[0-9 ]* \\sep//' "$src" >"$tmp/resume.tex"
grep -q '+880' "$tmp/resume.tex" && { echo "phone number still present" >&2; exit 1; }
"${TECTONIC:-tectonic}" -o "$tmp" "$tmp/resume.tex"

pages=$(pdfinfo "$tmp/resume.pdf" | awk '/^Pages:/ {print $2}')
[ "$pages" = 1 ] || { echo "résumé is $pages pages, expected 1" >&2; exit 1; }
cp "$tmp/resume.pdf" "$out/resume.pdf"
echo "wrote $out/resume.pdf"
