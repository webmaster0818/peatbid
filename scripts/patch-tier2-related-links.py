#!/usr/bin/env python3
"""
tier2 リーフ（app/tier2/{pref}/{slug}-kaitori/page.tsx）に関連リンクを2ブロック入れる（何度流しても同じ結果）。

  1. 近隣エリアで{銘柄}を売る   … 同じ銘柄 × 隣接する都道府県（patch-tier2-nearby-links.py の隣接マップ）
  2. {県}で売れる関連銘柄       … 同じ県 × 同じ蒸溜所・産地・カテゴリの銘柄（data/brands.csv の origin / category）

なぜ要るか（2026-10-05）:
  公開前チェック（site-precheck.py [14]）で tier2 リーフ 1,598 ページが「被リンク1本以下」だった。
  6/10 に patch-tier2-nearby-links.py で入れた近隣リンクが、8/4 の全リーフ再生成（JOYLAB撤去）で
  消えたまま戻されていなかったのが原因。リーフは県ハブからしか張られておらず、282 ページは 0 本だった。

⚠️ generate-tier2-v4-plan-a.py は末尾でこのスクリプトを呼ぶ（再生成でリンクが消えないように）。
   手でリーフを作り直した場合も必ず流すこと:  python3 scripts/patch-tier2-related-links.py

リンク先は「隣接県」「同じ産地・カテゴリ」という実データだけで決める。全ページへの羅列はしない
（1リーフあたり 近隣県 最大5 ＋ 関連銘柄 最大6）。
"""
import csv
import importlib.util
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
from data.prefectures import PREFECTURES  # noqa: E402

TIER2 = ROOT / "app" / "tier2"

# 隣接マップは既存スクリプトの定義をそのまま使う（二重管理しない）
_spec = importlib.util.spec_from_file_location("nearby", ROOT / "scripts" / "patch-tier2-nearby-links.py")
_nearby = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_nearby)
ADJ = _nearby.ADJ

MAX_NEIGHBORS = 5
MAX_BRANDS = 6
CATEGORY_LABEL = {"japanese-whisky": "ジャパニーズウイスキー", "scotch-whisky": "スコッチウイスキー"}

BRANDS = []  # CSV順（同じ蒸溜所の銘柄が並んでいる）
with (ROOT / "data" / "brands.csv").open(encoding="utf-8") as f:
    for row in csv.DictReader(f):
        BRANDS.append({"slug": row["slug"], "name": row["name_ja"],
                       "category": row["category"], "origin": row["origin"]})
BY_SLUG = {b["slug"]: b for b in BRANDS}

RELATED_BOX = '<div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">'
BEGIN = "{/* tier2-related-links:begin */}"
END = "{/* tier2-related-links:end */}"
BLOCK_RE = re.compile(re.escape(BEGIN) + r".*?" + re.escape(END) + r"\s*", re.S)
# 6/10 の旧ブロック（マーカー無し）が残っているリーフ用
OLD_RE = re.compile(r'<div className="not-prose my-8">\s*<h2[^>]*>近隣エリアで.*?</div>\s*</div>\s*', re.S)

CHIP = ("inline-block bg-white border border-warm-border rounded-full px-3 py-1 text-xs font-semibold "
        "text-foreground hover:border-amber/50 hover:shadow-sm transition-all")
H2 = "font-display text-xl font-semibold mb-2 text-ink !border-none !pb-0 !mt-0"


def related_brands(slug: str) -> list:
    """同じカテゴリの中から、①CSV順で次の2銘柄（輪）②同じ origin（蒸溜所・産地）の銘柄 の順に最大 MAX_BRANDS。
    ①を必ず入れるのは、蒸溜所に1銘柄しかないもの（秩父・羽生など）にも被リンクが届くようにするため。"""
    me = BY_SLUG[slug]
    cat = [b for b in BRANDS if b["category"] == me["category"]]
    i = next(k for k, b in enumerate(cat) if b["slug"] == slug)
    ring = [cat[(i + d) % len(cat)] for d in (1, 2)]
    same_origin = [b for b in cat if b["origin"] == me["origin"]]
    picked = []
    for b in ring + same_origin:
        if b["slug"] != slug and b not in picked:
            picked.append(b)
    return picked[:MAX_BRANDS]


def block(pref_slug: str, slug: str) -> str:
    me = BY_SLUG[slug]
    pref_name = PREFECTURES[pref_slug]["name_ja"]
    exists = lambda p, s: (TIER2 / p / f"{s}-kaitori" / "page.tsx").exists()  # noqa: E731

    neighbors = [n for n in ADJ.get(pref_slug, []) if n in PREFECTURES and exists(n, slug)][:MAX_NEIGHBORS]
    pref_chips = "\n".join(
        f'              <Link href="/tier2/{n}/{slug}-kaitori/" className="{CHIP}">{PREFECTURES[n]["name_ja"]}</Link>'
        for n in neighbors)
    brands = [b for b in related_brands(slug) if exists(pref_slug, b["slug"])]
    brand_chips = "\n".join(
        f'              <Link href="/tier2/{pref_slug}/{b["slug"]}-kaitori/" className="{CHIP}">{b["name"]}</Link>'
        for b in brands)
    cat_label = CATEGORY_LABEL.get(me["category"], "ウイスキー")

    return f'''{BEGIN}
          <div className="not-prose my-8">
            <h2 className="{H2}">近隣エリアで{me["name"]}を売る</h2>
            <p className="text-sm text-warm-gray mb-3">{pref_name}の近隣エリアで{me["name"]}を売る場合のガイドです。</p>
            <div className="flex flex-wrap gap-2">
{pref_chips}
            </div>
          </div>
          <div className="not-prose my-8">
            <h2 className="{H2}">{pref_name}で売れる関連銘柄</h2>
            <p className="text-sm text-warm-gray mb-3">{me["name"]}と同じ{cat_label}の銘柄を{pref_name}で売る場合のガイドです。</p>
            <div className="flex flex-wrap gap-2">
{brand_chips}
              <Link href="/tier2/{pref_slug}/" className="inline-block bg-amber/15 border border-amber/40 rounded-full px-3 py-1 text-xs font-semibold text-amber-dark hover:bg-amber/25 transition-all">{pref_name}の銘柄一覧 →</Link>
            </div>
          </div>
          {END}

          '''


def patch_leaf(path: Path, pref_slug: str, slug: str) -> bool:
    txt = path.read_text(encoding="utf-8")
    new = BLOCK_RE.sub("", txt)
    new = OLD_RE.sub("", new)
    if RELATED_BOX not in new:
        return False  # 想定外の形。触らない
    new = new.replace(RELATED_BOX, block(pref_slug, slug) + RELATED_BOX, 1)
    if new == txt:
        return False
    path.write_text(new, encoding="utf-8")
    return True


def main():
    changed = total = skipped = 0
    for pref_dir in sorted(TIER2.iterdir()):
        if not pref_dir.is_dir() or pref_dir.name not in PREFECTURES:
            continue
        for leaf_dir in sorted(pref_dir.iterdir()):
            if not leaf_dir.is_dir() or not leaf_dir.name.endswith("-kaitori"):
                continue
            slug = leaf_dir.name[: -len("-kaitori")]
            leaf = leaf_dir / "page.tsx"
            if slug not in BY_SLUG or not leaf.exists():
                skipped += 1
                continue
            total += 1
            if patch_leaf(leaf, pref_dir.name, slug):
                changed += 1
    print(f"tier2 related links: {changed} leaves updated / {total} leaves (skipped {skipped})")


if __name__ == "__main__":
    main()
