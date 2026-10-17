#!/usr/bin/env python3
"""2026-10-17 流通ステータス・後継品・公式URLの公式再確認の反映（冪等）。

- data/brands_extra.py の値を更新し、status_as_of（公式で確認した日付）を付ける
- tier2 リーフ（app/tier2/*/{slug}-kaitori/page.tsx）を全再生成せず、同じ値を文字列置換で反映
- 注記「…は、2026年5月時点の公式情報にもとづきます。」は確認できた銘柄だけ 2026年10月17日 に進める
- 余市10年は brands.csv の description も更新（記事・tier2 が参照）

確認URLと根拠は CLAUDE.md の 2026-10-17 の記録を参照。
使い方: python3 scripts/patch-brand-status-1017.py [--dry-run]
"""
import csv
import glob
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DRY = "--dry-run" in sys.argv
AS_OF = "2026年10月17日"
OLD_NOTE = "※流通ステータスや後継品の情報は、2026年5月時点の公式情報にもとづきます。"
NEW_NOTE = f"※流通ステータスや後継品の情報は、{AS_OF}時点の公式情報にもとづきます。"

NIKKA_TAKETSURU = "https://www.nikka.com/brands/taketsuru/"
NIKKA_YM = "https://www.nikka.com/brands/yoichi_miyagikyo/"

# slug -> (confirmed, {field: new_value})
UPDATES = {
    # 公式で確認できた銘柄（日付を 10/17 に進める）
    "yamazaki-nv": (True, {}),
    "taketsuru-pure": (True, {
        "status": "現行品（2020年3月31日にリニューアル発売、数量限定）",
        "successor_product": "なし（同銘柄継続）",
        "first_release_year": "2000年（竹鶴12年ピュアモルトとして）／2020年（現行リニューアル）",
        "distillery_official_url": NIKKA_TAKETSURU,
    }),
    "taketsuru-17": (True, {
        "status": "終売（現行ラインアップに掲載なし）",
        "successor_product": "なし",
        "distillery_official_url": NIKKA_TAKETSURU,
    }),
    "taketsuru-21": (True, {
        "status": "終売（現行ラインアップに掲載なし）",
        "distillery_official_url": NIKKA_TAKETSURU,
    }),
    "taketsuru-25": (True, {
        "status": "終売（現行ラインアップに掲載なし）",
        "first_release_year": "2012年",
        "distillery_official_url": NIKKA_TAKETSURU,
    }),
    "yoichi-nv": (True, {"distillery_official_url": NIKKA_YM}),
    "yoichi-10": (True, {
        "status": "現行品（数量限定。2015年8月末に販売終了、2022年に数量限定で再発売）",
        "successor_product": "なし（同銘柄。2022年に数量限定で再発売）",
        "collectibility_note": "2015年8月末の販売終了後にプレミア化。2022年に数量限定で再発売",
        "storage_advice": "アルコール度数45%。15-18℃の冷暗所・縦置き、コルク状態定期確認",
        "distillery_official_url": NIKKA_YM,
    }),
    "yoichi-15": (True, {"status": "終売（2015年8月末で販売終了）", "distillery_official_url": NIKKA_YM}),
    "yoichi-20": (True, {"status": "終売（2015年8月末で販売終了）", "distillery_official_url": NIKKA_YM}),
    "miyagikyo-nv": (True, {"distillery_official_url": NIKKA_YM}),
    "miyagikyo-12": (True, {
        "status": "終売（2015年8月末で販売終了）",
        "successor_product": "なし",
        "distillery_official_url": NIKKA_YM,
    }),
    "miyagikyo-15": (True, {"status": "終売（2015年8月末で販売終了）", "distillery_official_url": NIKKA_YM}),
    "mars-komagatake": (True, {"distillery_official_url": "https://www.hombo.co.jp/product/mars-singlemalt-komagatake/"}),
    "bowmore-18": (True, {"distillery_official_url": "https://www.bowmore.com/whiskies/18-years-old"}),
    "ardbeg-uigeadail": (True, {"distillery_official_url": "https://www.ardbeg.com/en-int/products/ardbeg-uigeadail"}),
    "ardbeg-corryvreckan": (True, {"distillery_official_url": "https://www.ardbeg.com/en-int/products/ardbeg-corryvreckan"}),
    "glenfarclas-25": (True, {"distillery_official_url": "https://glenfarclas.com/whisky/the-aged-range/25-year-old-whisky/"}),
    "talisker-25": (True, {
        "status": "現行品（限定品）",
        "successor_product": "なし",
        "distillery_official_url": "https://www.malts.com/en-us/products/talisker-25-year-old-single-malt-scotch-whisky-750ml",
    }),
    "laphroaig-25": (True, {
        "status": "年版リリース（公式サイト掲載の最新は2023年版。在庫切れ表示）",
        "successor_product": "なし（公式サイトに2024年以降の版の掲載なし）",
        "distillery_official_url": "https://www.laphroaig.com/whiskies/25-year-old-cask-strength-2023",
    }),
    # 一部を直したが、流通ステータス全体は公式で確認できていない銘柄（日付は 5月のまま）
    "bowmore-25": (False, {"distillery_official_url": "https://www.bowmore.com/whiskies/25-year-old"}),
    "bowmore-blackbowmore": (False, {
        "successor_product": "なし（Black Bowmore コレクションは計5回のリリース。後年に Black Bowmore DB5 1964 を発売）",
        "distillery_official_url": "https://www.bowmore.com/whiskies/black-bowmore-50-year-old",
    }),
    "hibiki-21": (False, {"distillery_official_url": "https://house.suntory.com/hibiki-whisky/hibiki-21-years-old"}),
    "glenmorangie-signet": (False, {"distillery_official_url": "https://www.glenmorangie.com/en-us/products/glenmorangie-signet"}),
}

DESC_FIX = {"yoichi-10": ("余市10年。終売後プレミア化", "余市10年。2015年8月末に販売終了し、2022年に数量限定で再発売")}


def load_extra():
    sys.path.insert(0, str(ROOT))
    import importlib
    mod = importlib.import_module("data.brands_extra")
    return mod.BRANDS_EXTRA


def py_str(s):
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'


def patch_extra_file(old_extra):
    p = ROOT / "data/brands_extra.py"
    src = p.read_text(encoding="utf-8")
    orig = src
    for slug, (confirmed, fields) in UPDATES.items():
        m = re.search(r'\n    "' + re.escape(slug) + r'": \{\n(.*?)\n    \},', src, re.S)
        if not m:
            raise SystemExit(f"brands_extra: {slug} not found")
        block = m.group(1)
        new_block = block
        for k, v in fields.items():
            new_block, n = re.subn(r'(\n?        "' + re.escape(k) + r'": )"(?:[^"\\]|\\.)*",', lambda mm: mm.group(1) + py_str(v) + ",", new_block)
            if n != 1:
                raise SystemExit(f"brands_extra: {slug}.{k} matched {n}")
        if confirmed and '"status_as_of"' not in new_block:
            new_block += f'\n        "status_as_of": {py_str(AS_OF)},'
        src = src[: m.start(1)] + new_block + src[m.end(1):]
    if src != orig and not DRY:
        p.write_text(src, encoding="utf-8")
    return src != orig


def page_repls(slug, old, new_fields, confirmed):
    """(old, new) の文字列置換リスト。文脈つきで、他の文に当たらないようにする。"""
    r = []
    new = dict(old)
    new.update(new_fields)
    # 箇条書き行: 流通ステータス: {status}（{first_release_year}発売）
    if old["status"] != new["status"] or old["first_release_year"] != new["first_release_year"]:
        r.append((f'</strong>: {old["status"]}（{old["first_release_year"]}発売）</li>',
                  f'</strong>: {new["status"]}（{new["first_release_year"]}発売）</li>'))
    for k in ("status", "first_release_year", "successor_product", "collectibility_note"):
        if k in new_fields and old.get(k) != new[k]:
            r.append((f'px-3 py-2">{old[k]}</td>', f'px-3 py-2">{new[k]}</td>'))
            if k == "collectibility_note":
                r.append((f'</strong>: {old[k]}</li>', f'</strong>: {new[k]}</li>'))
    if "storage_advice" in new_fields and old.get("storage_advice") != new["storage_advice"]:
        r.append((f'保管時の基本</strong>: {old["storage_advice"]}</p>', f'保管時の基本</strong>: {new["storage_advice"]}</p>'))
    if "distillery_official_url" in new_fields and old["distillery_official_url"] != new["distillery_official_url"]:
        o, n = old["distillery_official_url"], new["distillery_official_url"]
        r.append((f'href="{o}"', f'href="{n}"'))
        r.append((f'>{o}</a>', f'>{n}</a>'))
    if confirmed:
        r.append((OLD_NOTE, NEW_NOTE))
    if slug in DESC_FIX:
        r.append(DESC_FIX[slug])
    return r


def main():
    extra = load_extra()
    already = all(
        all(extra[s].get(k) == v for k, v in f.items()) and (not c or extra[s].get("status_as_of") == AS_OF)
        for s, (c, f) in UPDATES.items()
    )
    # 置換前の値を固定（2回目実行時は旧値がもう無いので、記録した旧値を使う）
    OLD = {s: dict(extra[s]) for s in UPDATES}
    snap = ROOT / "data/.brand-status-1017-old.json"
    import json
    if snap.exists():
        OLD = json.loads(snap.read_text(encoding="utf-8"))
    elif not DRY:
        snap.write_text(json.dumps(OLD, ensure_ascii=False, indent=1), encoding="utf-8")

    changed_extra = False if already else patch_extra_file(OLD)

    pages_changed = 0
    total_repl = 0
    misses = []
    for slug, (confirmed, fields) in UPDATES.items():
        repls = page_repls(slug, OLD[slug], fields, confirmed)
        files = sorted(glob.glob(str(ROOT / f"app/tier2/*/{slug}-kaitori/page.tsx")))
        if len(files) != 47:
            misses.append(f"{slug}: files={len(files)}")
        for fp in files:
            t = Path(fp).read_text(encoding="utf-8")
            o = t
            for a, b in repls:
                if a in t:
                    total_repl += t.count(a)
                    t = t.replace(a, b)
            if t != o:
                pages_changed += 1
                if not DRY:
                    Path(fp).write_text(t, encoding="utf-8")
            # 検証: 旧値が残っていないこと
            for a, b in repls:
                if a in t:
                    misses.append(f"{fp}: residual {a[:40]}")
    # 記事と brands.csv の description
    for slug, (a, b) in DESC_FIX.items():
        for fp in [ROOT / f"app/articles/{slug}-kaitori/page.tsx", ROOT / "data/brands.csv"]:
            t = fp.read_text(encoding="utf-8")
            if a in t:
                n = t.count(a)
                total_repl += n
                if not DRY:
                    fp.write_text(t.replace(a, b), encoding="utf-8")
                pages_changed += 1
    print(f"brands_extra changed={changed_extra} pages_changed={pages_changed} replacements={total_repl} dry={DRY}")
    for m in misses:
        print("NG", m)
    if misses:
        sys.exit(1)


if __name__ == "__main__":
    main()
