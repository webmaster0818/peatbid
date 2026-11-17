#!/usr/bin/env python3
"""tier2 リーフの地元業者表「バイセル ◯◯／◯◯県全域／出張・宅配」に店頭を反映（2026-11-17 公式確認）。冪等。

公式（11/17 curl・すべて buysell-kaitori.com）:
- 店舗一覧 = 店舗検索 API /wp-json/bsportal/v1/stores の map_list（201店）。県ごとの店名・住所・開店予定（store_open_info）
- 各店の店舗ページ /store/<slug>/ に「※未成年者からの買取はできません。また、酒類の買取に関しては20歳以上のお客様のみ対象となります。」
  （和歌山 10/31・徳島/愛媛 11/13・香川/熊本 11/14 と同じ根拠）
- 県のお酒買取ページ /area/liquor-<県>/ の「◯◯県の店舗案内」に全店掲載・「◯◯県全域にお住まいのお客様」（出張）
- 11/17 時点で未開店の店（NEW OPEN 11/18・11/20・11/27）は載せない。茨城（そよらひたち野うしく店 11/18）・
  福島（2店とも 11/27）・新潟（万代シテイバスセンター店 11/27）は県内に開店済みの店が無いので行を変えない。
- 特徴欄（「東証上場大手」等）は A/B 判断待ちのため据え置き。
"""
import glob
import json
import re
import sys
import unicodedata
from collections import Counter

STORES = json.load(open(sys.argv[1] if len(sys.argv) > 1 else "research/buysell-stores-2026-11-17.json", encoding="utf-8"))["stores"]

PREFS = {  # slug: (県名, 旧行)
    "aomori": ("青森県", ("バイセル 青森", "青森県全域", "出張・宅配", "東証上場大手、東北全域対応")),
    "iwate": ("岩手県", ("バイセル 岩手", "岩手県全域", "出張・宅配", "東証上場大手")),
    "tochigi": ("栃木県", ("バイセル 栃木", "栃木県全域", "出張・宅配", "東証上場大手")),
    "gunma": ("群馬県", ("バイセル 群馬", "群馬県全域", "出張・宅配", "東証上場大手")),
    "saitama": ("埼玉県", ("バイセル 埼玉", "埼玉県全域", "出張・宅配", "東証上場大手")),
    "chiba": ("千葉県", ("バイセル 千葉", "千葉県全域", "出張・宅配", "東証上場大手")),
    "kanagawa": ("神奈川県", ("バイセル 神奈川", "神奈川県全域", "出張・宅配", "東証上場の大手")),
    "nagano": ("長野県", ("バイセル 長野", "長野県全域", "出張・宅配", "東証上場大手")),
    "gifu": ("岐阜県", ("バイセル 岐阜", "岐阜県全域", "出張・宅配", "東証上場大手")),
    "shizuoka": ("静岡県", ("バイセル 静岡", "静岡県全域", "出張・宅配", "東証上場大手")),
    "mie": ("三重県", ("バイセル 三重", "三重県全域", "出張・宅配", "東証上場大手")),
    "hyogo": ("兵庫県", ("バイセル 兵庫", "兵庫県全域", "出張・宅配", "東証上場大手")),
    "nara": ("奈良県", ("バイセル 奈良", "奈良県全域", "出張・宅配", "東証上場大手")),
    "tottori": ("鳥取県", ("バイセル 鳥取", "鳥取県全域", "宅配・出張", "東証上場大手")),
    "hiroshima": ("広島県", ("バイセル 広島", "広島県全域", "出張・宅配", "東証上場大手")),
    "saga": ("佐賀県", ("バイセル 佐賀", "佐賀県全域", "宅配・出張", "東証上場大手")),
    "kagoshima": ("鹿児島県", ("バイセル 鹿児島", "鹿児島県全域", "出張・宅配", "東証上場大手")),
    "okinawa": ("沖縄県", ("バイセル 沖縄", "沖縄県全域", "宅配・出張", "東証上場大手")),
}
# FC店の運営会社（店舗ページ「運営会社：…」11/17 確認）。少数店の県だけ所在地に併記（徳島 11/13 と同じ形）
OPERATOR = {"東佐賀店": "株式会社renca", "イズミヤショッピングセンター各務原店": "株式会社ONE"}
# 11/17 時点で未開店（store_open_info の NEW OPEN 日付）
UPCOMING = {"アシコタウンあしかが店": "11月20日", "イオンモール松本店": "11月27日"}


def norm(s):
    s = unicodedata.normalize("NFKC", s)
    return re.sub(r"\s+", " ", s).strip()


def city(addr):
    m = re.match(r"^(.+?市)", addr)
    if m:
        return m.group(1)
    m = re.match(r"^.+?郡(.+?[町村])", addr)
    return m.group(1) if m else addr


def new_row(ja, old):
    open_ = [s for s in STORES if s["pref"] == ja and not s["open"].strip() or
             (s["pref"] == ja and "11/17" in s["open"])]
    up = [s for s in STORES if s["pref"] == ja and s["name"] in UPCOMING]
    assert open_, ja
    zen = f"出張は{ja}全域"
    if len(open_) <= 3:
        name = "バイセル " + "・".join(s["name"] for s in open_)
        locs = []
        for s in open_:
            a = norm(s["addr"])
            if s["name"] in OPERATOR:
                a += f"（運営会社：{OPERATOR[s['name']]}）"
            locs.append(a)
        loc = "／".join(locs) + "。" + zen
    else:
        c = Counter(city(norm(s["addr"])) for s in open_)
        name = f"バイセル（{ja}内{len(open_)}店）"
        loc = f"{ja}内{len(open_)}店（" + "・".join(f"{k}{v}" for k, v in c.most_common()) + "）。" + zen
    for s in up:
        loc += f"。{s['name']}は{UPCOMING[s['name']]}開店予定"
    return (name, loc, "店頭・出張・宅配", old[3])


def row(t):
    return f"<tr><td><strong>{t[0]}</strong></td><td>{t[1]}</td><td>{t[2]}</td><td>{t[3]}</td></tr>"


def py(t):
    return "(" + ", ".join(f'"{x}"' for x in t) + ")"


p = "data/prefectures.py"
ps = open(p, encoding="utf-8").read()
for slug, (ja, old) in PREFS.items():
    new = new_row(ja, old)
    files = sorted(glob.glob(f"app/tier2/{slug}/*/page.tsx"))
    n = 0
    for f in files:
        s = open(f, encoding="utf-8").read()
        if row(old) in s:
            open(f, "w", encoding="utf-8").write(s.replace(row(old), row(new)))
            n += 1
    m = 0
    if py(old) in ps:
        ps = ps.replace(py(old), py(new))
        m = 1
    left = sum(row(old) in open(f, encoding="utf-8").read() for f in files)
    print(f"{slug}: app {n}/{len(files)} / prefectures.py {m} / 残り {left} | {new[0]} | {new[1]}")
open(p, "w", encoding="utf-8").write(ps)
