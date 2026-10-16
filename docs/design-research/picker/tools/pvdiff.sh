#!/bin/bash
# Percent of preview pixels that differ from the default, per option (4% colour fuzz), grouped by category.
D="$1"; W=520; H=1100
magick "$D/_base.png" -background white -extent ${W}x${H} "$D/_b.png"
for f in "$D"/*__*.png; do
  n=$(basename "$f" .png)
  magick "$f" -background white -extent ${W}x${H} "$D/_x.png"
  p=$(magick compare -metric AE -fuzz 4% "$D/_x.png" "$D/_b.png" null: 2>&1 | sed -E 's/.*\(([0-9.e-]+)\).*/\1/')
  echo "${n%%__*} ${n#*__} $(awk -v p="$p" 'BEGIN{printf "%d", p*100}')"
done | awk '{a[$1]=a[$1]" "$2":"$3; if($3>m[$1])m[$1]=$3; if(!($1 in mn)||$3<mn[$1])mn[$1]=$3} END{for(k in a) printf "%-9s min %3d%% max %3d%% |%s\n",k,mn[k],m[k],a[k]}' | sort
