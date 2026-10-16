#!/usr/bin/env bash
# Build public/resume.pdf from the private master résumé, minus the phone number.
# Usage: scripts/web-resume.sh [master.tex]   (needs tectonic on PATH, or TECTONIC=/path/to/tectonic)
set -euo pipefail
master=${1:-$HOME/Personal/resumes/kamrul_hasan_resume_master.tex}
out=$(cd "$(dirname "$0")/.." && pwd)/public
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

# drop the phone; pdfTeX-only lines break under tectonic (XeTeX); web title + expected grad year
sed -e '/faPhone/d' \
	-e '/glyphtounicode/d' -e '/pdfgentounicode/d' \
	-e 's/{\\textbf{Systems \\& ML Infrastructure Engineer} \\sep Backend \\sep On-Device AI}/{\\textbf{AI Engineer} \\sep On-Device Inference \\sep Backend}/' \
	-e 's/April 2025 -- Present/April 2025 -- 2028 (expected)/' \
	"$master" >"$tmp/resume.tex"

grep -q 'faPhone\|+880' "$tmp/resume.tex" && { echo "phone number still present" >&2; exit 1; }
"${TECTONIC:-tectonic}" -o "$tmp" "$tmp/resume.tex"
cp "$tmp/resume.pdf" "$out/resume.pdf"
echo "wrote $out/resume.pdf"
