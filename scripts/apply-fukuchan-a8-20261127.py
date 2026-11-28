#!/usr/bin/env python3
"""福ちゃん（A8 s00000014709010・サイト011）の計測リンクを app/ の全ページに入れる（冪等）。
2026-11-27 MediaXAI「承認取れている案件はリンク設置を進めて」。生成スクリプトで tier2 等を作り直したら必ずこれを再実行する。
提供コードのまま（href と 1×1 の 0.gif を対で使う）。px.a8.net は開かない。"""
import re, subprocess
HREF = "https://px.a8.net/svt/ejp?a8mat=4BGV64+87B8JM+35HU+1NO9YQ"
PIX = '<img src="https://www14.a8.net/0.gif?a8mat=4BGV64+87B8JM+35HU+1NO9YQ" width={1} height={1} alt="" style={{ border: "none" }} />'
pat = re.compile(r'<a href="https://fuku-chan\.jp/"( target="_blank")? rel="[^"]*"([^>]*)>([^<]*)</a>')
files = subprocess.run(['git', 'grep', '-l', 'href="https://fuku-chan.jp/"', '--', 'app'], capture_output=True, text=True).stdout.split()
n = 0
for f in files:
    s = open(f).read()
    s2, k = pat.subn(lambda m: f'<a href="{HREF}"{m.group(1) or ""} rel="nofollow noopener sponsored"{m.group(2)}>{m.group(3)}</a>{PIX}', s)
    if k:
        open(f, 'w').write(s2); n += k
print('replaced', n)
