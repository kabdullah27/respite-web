#!/bin/zsh
# Regenerates public/og.png and public/og-id.png from og.html.
cd "${0:A:h}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
for v in en id; do
  out=../../public/og.png; [[ $v == id ]] && out=../../public/og-id.png
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
    --window-size=1200,630 --virtual-time-budget=4000 --force-device-scale-factor=1 \
    --screenshot="$PWD/$out" "file://$PWD/og.html#$v" 2>/dev/null
done
