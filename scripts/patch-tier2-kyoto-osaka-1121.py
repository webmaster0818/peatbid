#!/usr/bin/env python3
"""tier2 リーフの地元業者表（京都・大阪）の未照合行を公式（2026-11-21 確認）に合わせる。冪等。

11/21 curl:
  - 買取大吉 /list/sake/store/kinki-tiku/ : 「京都府（57件）」。「京都四条店」は一覧に無い（「四条」は大阪の四条畷駅西店のみ）
    → 旧「大吉 京都四条店／京都府京都市下京区／総合買取で洋酒対応、即現金化」は公式で確認できない。行数は変えず県内件数の行に置換。
  - リカスタ /areas/area_kyoto/ : 「京都府は 出張買取 宅配買取 エリアです」「★店頭買取は【大阪店】へ」。
  - リカスタ /areas/area_osaka/ : 「大阪府は 出張買取 宅配買取 店頭買取 エリアです」・大阪店 〒540-0023 大阪市中央区北新町2-6 ツムラ谷町ビル 4F
    （谷町線 谷町四丁目駅 4番出口 徒歩4分）→ 旧「出張・宅配」は店頭が抜けていた。
  - DEゴザル osakedegozaru.com トップ: 店舗は福岡市（本店・博多駅前店）と東京都新宿区（新宿御苑駅前店）。大阪店は「オープン準備中」。
    「全国対応で送料手数料無料・運送保険付きの宅配買取、一部地域で出張買取」→ 旧「大阪・東京・福岡対応／出張・宅配」は大阪の店舗・出張が未確認。
  OKURA（京都・大阪・兵庫）は公式（wb-ookura.com）が 403 で確認できず＝据え置き（報告のみ）。福岡の DEゴザル行は対象外。
"""
import glob

DT = "（2026年11月21日確認）"
LICASTA_OSAKA = "大阪市中央区北新町2-6 ツムラ谷町ビル4F"

JOBS = {
    "kyoto": [
        (("大吉 京都四条店", "京都府京都市下京区", "店頭", "総合買取で洋酒対応、即現金化"),
         ("買取大吉（京都府内57件）", "公式の近畿地区のお酒買取店舗一覧で京都府は57件", "店頭",
          f"総合買取店。公式に「お酒に関しては、一部取り扱っていない店舗がございます」と記載{DT}")),
        (("リカスタ 京都", "京都府内対応", "出張・宅配", "お酒専門業者が出張対応"),
         ("リカスタ（お酒買取専門店）", f"京都府内に店舗なし（店頭買取は大阪店＝{LICASTA_OSAKA}）", "出張・宅配",
          f"公式の京都府ページに「京都府は 出張買取 宅配買取 エリアです」と記載{DT}")),
    ],
    "osaka": [
        (("リカスタ", "大阪府内", "出張・宅配", "お酒のプロによる査定"),
         ("リカスタ 大阪店（お酒買取専門店）", f"大阪府{LICASTA_OSAKA}（谷町線 谷町四丁目駅 徒歩4分）", "店頭・出張・宅配",
          f"公式の大阪府ページに「大阪府は 出張買取 宅配買取 店頭買取 エリアです」と記載{DT}")),
        (("DEゴザル", "大阪・東京・福岡対応", "出張・宅配", "ウイスキー特化キャンペーンを定期開催"),
         ("DEゴザル（お酒買取専門店）", "大阪府内に店舗なし（大阪店は「オープン準備中」と記載）。店舗は福岡市・東京都新宿区", "宅配（出張は一部地域）",
          f"公式に「全国対応で送料手数料無料・運送保険付きの宅配買取、一部地域で出張買取」と記載{DT}")),
    ],
}


def row(t):
    return f"<tr><td><strong>{t[0]}</strong></td><td>{t[1]}</td><td>{t[2]}</td><td>{t[3]}</td></tr>"


def py(t):
    return "(" + ", ".join(f'"{x}"' for x in t) + ")"


p = "data/prefectures.py"
ps = open(p, encoding="utf-8").read()
for slug, pairs in JOBS.items():
    files = sorted(glob.glob(f"app/tier2/{slug}/*/page.tsx"))
    for old, new in pairs:
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
        print(f"{slug} {old[0]}: app {n}/{len(files)} prefectures.py {m} left {left}")
open(p, "w", encoding="utf-8").write(ps)
