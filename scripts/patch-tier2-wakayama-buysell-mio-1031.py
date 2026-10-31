#!/usr/bin/env python3
"""tier2 和歌山リーフの地元業者表「バイセル 和歌山」行に、県内の店舗（和歌山ミオ店）と店頭を足す。冪等。

理由: バイセル公式の和歌山県お酒買取ページ（/area/liquor-wakayama/）は FAQ で「和歌山県内にバイセルの店舗はございません」
と書く一方、同じページの「和歌山県の店舗案内」に和歌山ミオ店を載せ、同店での店頭のお酒買取実績（2026/01/23）も載せている。
店舗ページ（/store/wakayama-mio/ 2026-10-31確認）: 和歌山県和歌山市美園町5-61 和歌山ミオ 本館3F・10:00〜19:00（施設に準じる）・
JR和歌山駅 MIO地下改札・MIO2階改札より直結・「酒類の買取に関しては20歳以上のお客様のみ対象」。
→ 表の方式「出張・宅配」に店頭が抜けていた。特徴欄（「東証上場大手」）は39県共通の判断待ち（A/B）のため触らない。
app の page.tsx・data/prefectures.py（v4/full が読む）を同時に置換。"""
import glob

OLD = ("バイセル 和歌山", "和歌山県全域", "出張・宅配", "東証上場大手")
NEW = ("バイセル 和歌山ミオ店",
       "和歌山市美園町5-61 和歌山ミオ 本館3F（JR和歌山駅直結）。出張は和歌山県全域",
       "店頭・出張・宅配",
       "東証上場大手")


def row(t):
    return f"<tr><td><strong>{t[0]}</strong></td><td>{t[1]}</td><td>{t[2]}</td><td>{t[3]}</td></tr>"


def py(t):
    return "(" + ", ".join(f'"{x}"' for x in t) + ")"


n = 0
for f in sorted(glob.glob("app/tier2/wakayama/*/page.tsx")):
    s = open(f, encoding="utf-8").read()
    if row(OLD) in s:
        open(f, "w", encoding="utf-8").write(s.replace(row(OLD), row(NEW))); n += 1
print("wakayama pages changed", n)

f = "data/prefectures.py"
s = open(f, encoding="utf-8").read()
c = s.count(py(OLD))
if c:
    open(f, "w", encoding="utf-8").write(s.replace(py(OLD), py(NEW)))
print(f, "changed", c)
