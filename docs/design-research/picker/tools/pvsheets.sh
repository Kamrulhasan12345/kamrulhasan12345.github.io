#!/bin/bash
# One contact sheet per category: every option's preview screenshot side by side.
D="$1"; shift
for c in "$@"; do
  montage -label '%t' "$D"/_base.png "$D"/${c}__*.png -tile 6x -geometry 250x+3+3 -pointsize 13 -background '#222' -fill white "$D/../pvcat_$c.jpg"
  echo "$D/../pvcat_$c.jpg"
done
