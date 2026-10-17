#!/usr/bin/env bash
# Publish without GitHub Actions: build locally and push dist/ as the gh-pages branch.
# Pages must be set to "Deploy from a branch: gh-pages /" (Settings → Pages).
# Once Actions works again, switch Pages back to "GitHub Actions" and deploy.yml takes over.
# Usage: scripts/deploy-gh-pages.sh [remote]   (default: origin)
set -euo pipefail
cd "$(dirname "$0")/.."
remote=${1:-origin}

rm -rf dist
npm run build
test -f dist/.nojekyll || { echo "dist/.nojekyll missing: Pages would drop _astro/" >&2; exit 1; }

# commit dist/ as a standalone tree without touching the working copy or current branch
index=$(mktemp)
trap 'rm -f "$index"' EXIT
GIT_INDEX_FILE=$index git --work-tree=dist add -A -f .
tree=$(GIT_INDEX_FILE=$index git write-tree)
commit=$(git commit-tree "$tree" -m "Deploy $(git rev-parse --short HEAD)")
git push -f "$remote" "$commit:refs/heads/gh-pages"
echo "pushed $commit to gh-pages; live in about a minute"
