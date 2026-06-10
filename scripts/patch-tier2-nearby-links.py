#!/usr/bin/env python3
"""
Idempotent in-place patch: add NEARBY-AREA related links to every tier2 leaf.

MediaXAI request (2026-06-10): 近いエリア同士の関連リンクも設置してほしい.
Each leaf app/tier2/{pref}/{slug}-kaitori/page.tsx gets a "近隣エリアで{brand}を売る"
block linking to the SAME brand in geographically adjacent prefectures
(/tier2/{neighbor}/{slug}-kaitori/) + the prefecture hub. This interlinks the
2,350 leaves across geography (every leaf was previously a dead-end laterally).

Inserted right before the "📚 関連ページ" box. Re-runnable (skips if already present).
NOTE: the v4 generator is stale; re-run this after any regen (see generator header).
"""
import csv
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
from data.prefectures import PREFECTURES

TIER2 = ROOT / "app" / "tier2"

# Japan prefecture adjacency (land borders; sea-nearest for islands/Shikoku-Honshu).
ADJ = {
    "hokkaido": ["aomori", "iwate", "akita"],
    "aomori": ["akita", "iwate", "hokkaido"],
    "iwate": ["aomori", "akita", "miyagi"],
    "akita": ["aomori", "iwate", "miyagi", "yamagata"],
    "miyagi": ["iwate", "akita", "yamagata", "fukushima"],
    "yamagata": ["akita", "miyagi", "fukushima", "niigata"],
    "fukushima": ["miyagi", "yamagata", "niigata", "gunma", "tochigi", "ibaraki"],
    "ibaraki": ["fukushima", "tochigi", "saitama", "chiba"],
    "tochigi": ["fukushima", "ibaraki", "gunma", "saitama"],
    "gunma": ["fukushima", "tochigi", "saitama", "niigata", "nagano"],
    "saitama": ["gunma", "tochigi", "ibaraki", "chiba", "tokyo", "yamanashi", "nagano"],
    "chiba": ["ibaraki", "saitama", "tokyo"],
    "tokyo": ["saitama", "chiba", "kanagawa", "yamanashi"],
    "kanagawa": ["tokyo", "yamanashi", "shizuoka"],
    "niigata": ["yamagata", "fukushima", "gunma", "nagano", "toyama"],
    "toyama": ["niigata", "nagano", "gifu", "ishikawa"],
    "ishikawa": ["toyama", "gifu", "fukui"],
    "fukui": ["ishikawa", "gifu", "shiga", "kyoto"],
    "yamanashi": ["saitama", "tokyo", "kanagawa", "shizuoka", "nagano"],
    "nagano": ["niigata", "gunma", "saitama", "yamanashi", "shizuoka", "aichi", "gifu", "toyama"],
    "gifu": ["toyama", "ishikawa", "fukui", "nagano", "aichi", "mie", "shiga"],
    "shizuoka": ["kanagawa", "yamanashi", "nagano", "aichi"],
    "aichi": ["nagano", "gifu", "mie", "shizuoka"],
    "mie": ["gifu", "aichi", "shiga", "kyoto", "nara", "wakayama"],
    "shiga": ["fukui", "gifu", "mie", "kyoto"],
    "kyoto": ["fukui", "shiga", "mie", "nara", "osaka", "hyogo"],
    "osaka": ["kyoto", "nara", "wakayama", "hyogo"],
    "hyogo": ["kyoto", "osaka", "tottori", "okayama"],
    "nara": ["kyoto", "mie", "osaka", "wakayama"],
    "wakayama": ["mie", "osaka", "nara"],
    "tottori": ["hyogo", "okayama", "shimane", "hiroshima"],
    "shimane": ["tottori", "hiroshima", "yamaguchi"],
    "okayama": ["hyogo", "tottori", "hiroshima", "kagawa"],
    "hiroshima": ["shimane", "tottori", "okayama", "yamaguchi", "ehime"],
    "yamaguchi": ["shimane", "hiroshima", "fukuoka"],
    "tokushima": ["kagawa", "ehime", "kochi", "hyogo"],
    "kagawa": ["tokushima", "ehime", "okayama"],
    "ehime": ["kagawa", "tokushima", "kochi", "hiroshima", "oita"],
    "kochi": ["tokushima", "ehime"],
    "fukuoka": ["yamaguchi", "saga", "oita", "kumamoto"],
    "saga": ["fukuoka", "nagasaki"],
    "nagasaki": ["saga", "fukuoka"],
    "kumamoto": ["fukuoka", "oita", "miyazaki", "kagoshima"],
    "oita": ["fukuoka", "kumamoto", "miyazaki", "ehime"],
    "miyazaki": ["kumamoto", "oita", "kagoshima"],
    "kagoshima": ["kumamoto", "miyazaki", "okinawa"],
    "okinawa": ["kagoshima"],
}
MAX_NEIGHBORS = 5

# brand slug -> name_ja
BRANDS = {}
with (ROOT / "data" / "brands.csv").open(encoding="utf-8") as f:
    for row in csv.DictReader(f):
        BRANDS[row["slug"]] = row["name_ja"]

RELATED_BOX = '<div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">'
MARKER = "近隣エリアで"


def block(pref_slug: str, slug: str, brand: str) -> str:
    neighbors = [n for n in ADJ.get(pref_slug, []) if n in PREFECTURES][:MAX_NEIGHBORS]
    chips = "\n".join(
        f'            <Link href="/tier2/{n}/{slug}-kaitori/" className="inline-block bg-white border border-warm-border rounded-full px-3 py-1 text-xs font-semibold text-foreground hover:border-amber/50 hover:shadow-sm transition-all">{PREFECTURES[n]["name_ja"]}</Link>'
        for n in neighbors
    )
    pref_name = PREFECTURES[pref_slug]["name_ja"]
    return (
        '<div className="not-prose my-8">\n'
        f'            <h2 className="font-display text-xl font-semibold mb-2 text-ink !border-none !pb-0 !mt-0">近隣エリアで{brand}を売る</h2>\n'
        f'            <p className="text-sm text-warm-gray mb-3">{pref_name}の近隣エリアでも{brand}の買取相場を比較できます。</p>\n'
        '            <div className="flex flex-wrap gap-2">\n'
        f'{chips}\n'
        f'            <Link href="/tier2/{pref_slug}/" className="inline-block bg-amber/15 border border-amber/40 rounded-full px-3 py-1 text-xs font-semibold text-amber-dark hover:bg-amber/25 transition-all">{pref_name}の全50銘柄 →</Link>\n'
        '            </div>\n'
        '          </div>\n\n'
        f'          {RELATED_BOX}'
    )


def patch_leaf(path: Path, pref_slug: str, slug: str) -> bool:
    brand = BRANDS.get(slug)
    if not brand:
        return False
    txt = path.read_text(encoding="utf-8")
    if MARKER in txt:
        return False  # already patched
    if RELATED_BOX not in txt:
        return False  # unexpected shape
    txt = txt.replace(RELATED_BOX, block(pref_slug, slug, brand), 1)
    path.write_text(txt, encoding="utf-8")
    return True


def main():
    n = 0
    for pref_dir in sorted(TIER2.iterdir()):
        if not pref_dir.is_dir() or pref_dir.name not in PREFECTURES:
            continue
        pref_slug = pref_dir.name
        for leaf_dir in pref_dir.iterdir():
            if not leaf_dir.is_dir() or not leaf_dir.name.endswith("-kaitori"):
                continue
            slug = leaf_dir.name[: -len("-kaitori")]
            leaf = leaf_dir / "page.tsx"
            if leaf.exists() and patch_leaf(leaf, pref_slug, slug):
                n += 1
    print(f"added nearby-area links to {n} leaves")


if __name__ == "__main__":
    main()
