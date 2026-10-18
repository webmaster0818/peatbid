#!/usr/bin/env python3
"""2026-10-18 流通ステータスの公式再確認の反映（冪等）。10/17 の patch-brand-status-1017.py と同じ方式。

- 響17年: サントリー公式（https://www.suntory.co.jp/whisky/hibiki/portfolio/17years/）の表記
  「サントリーウイスキー「響17年」は休売中です。」に合わせ、「終売（2018年生産終了）」を「休売中」に
- 10/17 に確認できなかった銘柄のうち、10/18 にヘッドレス Chrome で公式を開けたものは status_as_of を付ける
確認URLと根拠は CLAUDE.md の 2026-10-18 の記録を参照。
使い方: python3 scripts/patch-brand-status-1018.py [--dry-run]
"""
import csv
import glob
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DRY = "--dry-run" in sys.argv
AS_OF = "2026年10月18日"
OLD_NOTE = "※流通ステータスや後継品の情報は、2026年5月時点の公式情報にもとづきます。"
NEW_NOTE = f"※流通ステータスや後継品の情報は、{AS_OF}時点の公式情報にもとづきます。"

# slug -> (confirmed, {field: new_value})
UPDATES = {
    # サントリー公式「響17年」ページ: 「サントリーウイスキー「響17年」は休売中です。」「サントリー創業90周年を記念して1989年に新発売」
    "hibiki-17": (True, {
        "status": "休売中（サントリー公式の表記）",
        "successor_product": "なし（サントリー公式に後継品の記載なし）",
        "collectibility_note": "2018年の休売報道後にプレミア化が加速。映画『ロスト・イン・トランスレーション』で世界的知名度",
        "distillery_official_url": "https://www.suntory.co.jp/whisky/hibiki/portfolio/17years/",
    }),
    # サントリー公式 商品情報（products.suntory.co.jp）に掲載＝現行品。括弧書きは公式の記載があるものだけ残す
    "yamazaki-12": (True, {
        "status": "現行品（サントリー公式の商品情報に掲載）",
        "successor_product": "なし（同銘柄継続）",
        "distillery_official_url": "https://products.suntory.co.jp/d/4901777188914/",
    }),
    "yamazaki-18": (True, {
        "status": "現行品（サントリー公式の商品情報に掲載）",
        "distillery_official_url": "https://products.suntory.co.jp/d/4901777188907/",
    }),
    "yamazaki-25": (True, {
        "status": "現行品（年間生産本数千数百本の限定品。サントリー公式）",
        "distillery_official_url": "https://products.suntory.co.jp/d/4901777347700/",
    }),
    "hakushu-nv": (True, {
        "status": "現行品（サントリー公式の商品情報に掲載）",
        "distillery_official_url": "https://products.suntory.co.jp/d/4901777233911/",
    }),
    "hakushu-12": (True, {
        "status": "現行品（サントリー公式の商品情報に掲載）",
        "distillery_official_url": "https://products.suntory.co.jp/d/4901777360440/",
    }),
    "hakushu-18": (True, {
        "status": "現行品（サントリー公式の商品情報に掲載）",
        "distillery_official_url": "https://products.suntory.co.jp/d/4901777159013/",
    }),
    "hakushu-25": (True, {
        "status": "現行品（サントリー公式の商品情報に掲載）",
        "distillery_official_url": "https://products.suntory.co.jp/d/4901777170834/",
    }),
    "hibiki-nv": (True, {
        "status": "現行品（サントリー公式の商品情報に掲載）",
        "distillery_official_url": "https://products.suntory.co.jp/d/4901777270688/",
    }),
    "hibiki-21": (True, {
        "status": "現行品（サントリー公式の商品情報に掲載）",
        "distillery_official_url": "https://products.suntory.co.jp/d/4901777040427/",
    }),
    "hibiki-30": (True, {
        "status": "現行品（数量限定。サントリー公式）",
        "distillery_official_url": "https://products.suntory.co.jp/d/4901777043725/",
    }),
}

DESC_FIX = {"hibiki-17": ("響17年。終売後プレミアが続く名作", "響17年。サントリー公式の表記は休売中で、プレミア価格が続く銘柄")}


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
    snap = ROOT / "data/.brand-status-1018-old.json"
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
