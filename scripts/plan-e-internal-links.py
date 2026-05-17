#!/usr/bin/env python3
"""
Plan E: 内部リンク自動最適化システム

各記事に「関連記事」セクションを構築:
1. 同銘柄の他切り口記事
2. 同切り口の他銘柄記事
3. 上位ハブへのリンク
"""
import re
from pathlib import Path
import csv

ROOT = Path(__file__).resolve().parent.parent
ARTICLES_DIR = ROOT / "app" / "articles"

# Angle definitions
ANGLES = [
    "takaku-uru", "nisemono-mikata", "ranking", "rekishi",
    "kihaku", "auction-suii", "kaifu-zumi", "hako-nashi", "label-yogore",
]

ANGLE_LABELS = {
    "takaku-uru": "高く売るコツ",
    "nisemono-mikata": "偽物の見分け方",
    "ranking": "買取業者ランキング",
    "rekishi": "蒸溜所の歴史",
    "kihaku": "希少価値の理由",
    "auction-suii": "オークション相場推移",
    "kaifu-zumi": "開封済みの買取",
    "hako-nashi": "箱なしの買取",
    "label-yogore": "ラベル汚れの査定",
}

# Brand families (parent → siblings)
BRAND_FAMILIES = {
    "yamazaki": ["yamazaki-nv", "yamazaki-12", "yamazaki-18", "yamazaki-25", "yamazaki-55"],
    "hibiki": ["hibiki-nv", "hibiki-17", "hibiki-21", "hibiki-30"],
    "hakushu": ["hakushu-nv", "hakushu-12", "hakushu-18", "hakushu-25"],
    "macallan": ["macallan-12", "macallan-18", "macallan-25", "macallan-30", "macallan-fine-rare"],
    "yoichi": ["yoichi-nv", "yoichi-10", "yoichi-15", "yoichi-20"],
    "miyagikyo": ["miyagikyo-nv", "miyagikyo-12", "miyagikyo-15"],
    "taketsuru": ["taketsuru-pure", "taketsuru-17", "taketsuru-21", "taketsuru-25"],
    "karuizawa": ["karuizawa-12", "karuizawa-30"],
    "bowmore": ["bowmore-18", "bowmore-25", "bowmore-blackbowmore"],
    "ardbeg": ["ardbeg-uigeadail", "ardbeg-corryvreckan"],
    "springbank": ["springbank-15", "springbank-21"],
    "ichirosu": ["ichirosu-card", "ichirosu-double-distilleries", "ichirosu-mwr"],
}


def load_brand_labels():
    """Load brand slug → Japanese label from brands.csv"""
    labels = {}
    csv_path = ROOT / "data" / "brands.csv"
    with csv_path.open("r", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            labels[row["slug"]] = row["name_ja"]
    return labels


def get_article_type(slug: str) -> tuple[str, str]:
    """
    Parse article slug and return (brand_slug, angle).
    Examples:
      yamazaki-18-kaitori → ('yamazaki-18', 'kaitori')
      yamazaki-18-takaku-uru → ('yamazaki-18', 'takaku-uru')
      whisky-kaitori-souba → ('_hub', 'whisky-souba')
      yamazaki-kaitori → ('yamazaki', '_family_hub')
    """
    for angle in ANGLES:
        if slug.endswith(f"-{angle}"):
            brand = slug[:-len(angle) - 1]
            return brand, angle

    if slug.endswith("-kaitori"):
        brand = slug[:-len("kaitori") - 1]
        # Check if it's a family hub (no year/variant after brand name)
        if brand in BRAND_FAMILIES:
            return brand, "_family_hub"
        return brand, "kaitori"

    return slug, "_other"


def find_related_articles(slug: str, all_slugs: set, brand_labels: dict) -> list[dict]:
    """Return list of related articles with title and href."""
    brand, angle = get_article_type(slug)
    related = []

    # 1. Same brand, different angles (max 4)
    if brand and angle != "_family_hub":
        for other_angle in ANGLES + ["kaitori"]:
            if other_angle == angle:
                continue
            other_slug = f"{brand}-{other_angle}"
            if other_slug in all_slugs:
                related.append({
                    "slug": other_slug,
                    "title": f"{brand_labels.get(brand, brand)}の{ANGLE_LABELS.get(other_angle, '買取情報')}",
                    "type": "same_brand",
                })

    # 2. Same angle, different brands (max 5)
    if angle in ANGLES + ["kaitori"]:
        # Pick same-tier brands (top 10 + siblings)
        priority_brands = [
            "yamazaki-18", "yamazaki-25", "hibiki-30", "hibiki-21",
            "hakushu-25", "hakushu-18", "macallan-25", "macallan-30",
            "karuizawa-12", "chichibu-the-first",
        ]
        for other_brand in priority_brands:
            if other_brand == brand:
                continue
            other_slug = f"{other_brand}-{angle}"
            if other_slug in all_slugs and other_slug != slug:
                related.append({
                    "slug": other_slug,
                    "title": f"{brand_labels.get(other_brand, other_brand)}の{ANGLE_LABELS.get(angle, '買取相場')}",
                    "type": "same_angle",
                })
                if sum(1 for r in related if r["type"] == "same_angle") >= 5:
                    break

    # 3. Family hub link (if not the hub itself)
    if brand and angle != "_family_hub":
        # Determine family (yamazaki-18 → yamazaki)
        family_name = brand.split("-")[0]
        if family_name in BRAND_FAMILIES:
            hub_slug = f"{family_name}-kaitori"
            if hub_slug in all_slugs and hub_slug != slug:
                related.append({
                    "slug": hub_slug,
                    "title": f"{family_name.capitalize()}シリーズ買取ガイド",
                    "type": "family_hub",
                })

    # 4. Global hubs
    global_hubs = [
        ("whisky-kaitori-souba", "ウイスキー買取相場ガイド"),
        ("whisky-takaku-uru", "ウイスキーを高く売るコツ"),
    ]
    for hub_slug, hub_title in global_hubs:
        if hub_slug in all_slugs and hub_slug != slug:
            related.append({"slug": hub_slug, "title": hub_title, "type": "global_hub"})

    return related


def build_related_section(related: list[dict]) -> str:
    """Generate JSX for the related articles section."""
    if not related:
        return ""

    # Group by type
    same_brand = [r for r in related if r["type"] == "same_brand"][:4]
    same_angle = [r for r in related if r["type"] == "same_angle"][:5]
    hubs = [r for r in related if r["type"] in ("family_hub", "global_hub")][:3]

    sections = []

    if same_brand:
        items = "\n".join(
            f'              <li><Link href="/articles/{r["slug"]}/" className="text-amber-dark hover:text-burgundy underline">{r["title"]}</Link></li>'
            for r in same_brand
        )
        sections.append(
            '          <div className="not-prose">\n'
            '            <h3 className="font-bold text-base mb-2 text-ink">📖 同じ銘柄の他の情報</h3>\n'
            '            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">\n'
            f'{items}\n'
            '            </ul>\n'
            '          </div>'
        )

    if same_angle:
        items = "\n".join(
            f'              <li><Link href="/articles/{r["slug"]}/" className="text-amber-dark hover:text-burgundy underline">{r["title"]}</Link></li>'
            for r in same_angle
        )
        sections.append(
            '          <div className="not-prose mt-5">\n'
            '            <h3 className="font-bold text-base mb-2 text-ink">🔍 他の銘柄の同種の記事</h3>\n'
            '            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">\n'
            f'{items}\n'
            '            </ul>\n'
            '          </div>'
        )

    if hubs:
        items = "\n".join(
            f'              <li><Link href="/articles/{r["slug"]}/" className="text-amber-dark hover:text-burgundy underline">{r["title"]}</Link></li>'
            for r in hubs
        )
        sections.append(
            '          <div className="not-prose mt-5">\n'
            '            <h3 className="font-bold text-base mb-2 text-ink">🎯 関連ガイド</h3>\n'
            '            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">\n'
            f'{items}\n'
            '            </ul>\n'
            '          </div>'
        )

    if not sections:
        return ""

    inner = "\n\n".join(sections)
    return (
        '\n          {/* Plan E: Auto Internal Links */}\n'
        '          <section className="bg-gold-bg/40 border border-warm-border rounded-2xl p-6 my-10 not-prose">\n'
        '            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">📚 関連記事</h2>\n'
        f'{inner}\n'
        '          </section>\n'
    )


def inject_related_section(page_path: Path, related_jsx: str) -> bool:
    """Insert the related section after the last </h2> (right before closing article)."""
    if not related_jsx:
        return False
    content = page_path.read_text(encoding="utf-8")

    # Skip if Plan E already applied
    if "Plan E: Auto Internal Links" in content:
        return False

    # Find the last </article> tag and inject before it
    # Some articles use <article>, others might use </div>
    # Strategy: inject before the closing </article> if present
    if "</article>" not in content:
        return False

    # Insert before the last </article>
    last_idx = content.rfind("</article>")
    new_content = content[:last_idx] + related_jsx + "          " + content[last_idx:]
    page_path.write_text(new_content, encoding="utf-8")
    return True


def main():
    all_slugs = {p.name for p in ARTICLES_DIR.iterdir() if p.is_dir()}
    brand_labels = load_brand_labels()

    print(f"Total articles: {len(all_slugs)}")
    print(f"Brand labels: {len(brand_labels)}")

    success = 0
    skipped = 0
    for slug in sorted(all_slugs):
        related = find_related_articles(slug, all_slugs, brand_labels)
        related_jsx = build_related_section(related)
        page = ARTICLES_DIR / slug / "page.tsx"
        if not page.exists():
            continue
        if inject_related_section(page, related_jsx):
            success += 1
        else:
            skipped += 1

    print(f"\n✅ Plan E applied:")
    print(f"  Injected: {success}")
    print(f"  Skipped (already done or no </article>): {skipped}")


if __name__ == "__main__":
    main()
