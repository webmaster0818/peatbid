#!/usr/bin/env python3
"""
peatbid 506記事に「似ているウイスキー」セクション追加。
銘柄の親グループ・地域・年式類似性で5-8銘柄を提案。
Information Gain Score 強化 + 内部リンク網密化。
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ARTICLES_DIR = ROOT / "app" / "articles"

# Brand metadata: group, region, country
BRAND_META = {
    # Suntory Japanese
    "yamazaki-nv":   {"group": "suntory", "region": "japan_kyoto", "label": "山崎NV"},
    "yamazaki-12":   {"group": "suntory", "region": "japan_kyoto", "label": "山崎12年"},
    "yamazaki-18":   {"group": "suntory", "region": "japan_kyoto", "label": "山崎18年"},
    "yamazaki-25":   {"group": "suntory", "region": "japan_kyoto", "label": "山崎25年"},
    "yamazaki-55":   {"group": "suntory", "region": "japan_kyoto", "label": "山崎55年"},
    "hibiki-nv":     {"group": "suntory", "region": "japan_blend", "label": "響NV"},
    "hibiki-17":     {"group": "suntory", "region": "japan_blend", "label": "響17年"},
    "hibiki-21":     {"group": "suntory", "region": "japan_blend", "label": "響21年"},
    "hibiki-30":     {"group": "suntory", "region": "japan_blend", "label": "響30年"},
    "hakushu-nv":    {"group": "suntory", "region": "japan_yamanashi", "label": "白州NV"},
    "hakushu-12":    {"group": "suntory", "region": "japan_yamanashi", "label": "白州12年"},
    "hakushu-18":    {"group": "suntory", "region": "japan_yamanashi", "label": "白州18年"},
    "hakushu-25":    {"group": "suntory", "region": "japan_yamanashi", "label": "白州25年"},

    # Nikka Japanese
    "taketsuru-pure": {"group": "nikka", "region": "japan_blend", "label": "竹鶴ピュアモルト"},
    "taketsuru-17":   {"group": "nikka", "region": "japan_blend", "label": "竹鶴17年"},
    "taketsuru-21":   {"group": "nikka", "region": "japan_blend", "label": "竹鶴21年"},
    "taketsuru-25":   {"group": "nikka", "region": "japan_blend", "label": "竹鶴25年"},
    "yoichi-nv":      {"group": "nikka", "region": "japan_hokkaido", "label": "余市NV"},
    "yoichi-10":      {"group": "nikka", "region": "japan_hokkaido", "label": "余市10年"},
    "yoichi-15":      {"group": "nikka", "region": "japan_hokkaido", "label": "余市15年"},
    "yoichi-20":      {"group": "nikka", "region": "japan_hokkaido", "label": "余市20年"},
    "miyagikyo-nv":   {"group": "nikka", "region": "japan_miyagi", "label": "宮城峡NV"},
    "miyagikyo-12":   {"group": "nikka", "region": "japan_miyagi", "label": "宮城峡12年"},
    "miyagikyo-15":   {"group": "nikka", "region": "japan_miyagi", "label": "宮城峡15年"},

    # Other Japanese
    "ichirosu-card":               {"group": "ichirosu", "region": "japan_chichibu", "label": "イチローズモルト カード"},
    "ichirosu-double-distilleries": {"group": "ichirosu", "region": "japan_chichibu", "label": "イチローズモルト ダブルディスティラリーズ"},
    "ichirosu-mwr":                {"group": "ichirosu", "region": "japan_chichibu", "label": "イチローズモルト MWR"},
    "karuizawa-12":                {"group": "karuizawa_closed", "region": "japan_nagano", "label": "軽井沢12年"},
    "karuizawa-30":                {"group": "karuizawa_closed", "region": "japan_nagano", "label": "軽井沢30年"},
    "hanyu-card":                  {"group": "hanyu_closed", "region": "japan_saitama", "label": "羽生 カードシリーズ"},
    "mars-komagatake":             {"group": "mars", "region": "japan_nagano", "label": "マルス 駒ヶ岳"},
    "chichibu-the-first":          {"group": "ichirosu", "region": "japan_chichibu", "label": "秩父 ザ・ファースト"},

    # Scotch - Speyside/Highland
    "macallan-12":               {"group": "macallan", "region": "scotch_speyside_sherry", "label": "マッカラン12年"},
    "macallan-18":               {"group": "macallan", "region": "scotch_speyside_sherry", "label": "マッカラン18年"},
    "macallan-25":               {"group": "macallan", "region": "scotch_speyside_sherry", "label": "マッカラン25年"},
    "macallan-30":               {"group": "macallan", "region": "scotch_speyside_sherry", "label": "マッカラン30年"},
    "macallan-fine-rare":        {"group": "macallan", "region": "scotch_speyside_sherry", "label": "マッカラン ファイン&レア"},
    "glenfiddich-30":            {"group": "glenfiddich", "region": "scotch_speyside", "label": "グレンフィディック30年"},
    "glenfarclas-25":            {"group": "glenfarclas", "region": "scotch_speyside_sherry", "label": "グレンファークラス25年"},
    "balvenie-portwood-21":      {"group": "balvenie", "region": "scotch_speyside", "label": "バルヴェニー ポートウッド21年"},
    "glenmorangie-signet":       {"group": "glenmorangie", "region": "scotch_highland", "label": "グレンモーレンジ シグネット"},

    # Scotch - Islay (peated)
    "bowmore-18":             {"group": "bowmore", "region": "scotch_islay", "label": "ボウモア18年"},
    "bowmore-25":             {"group": "bowmore", "region": "scotch_islay", "label": "ボウモア25年"},
    "bowmore-blackbowmore":   {"group": "bowmore", "region": "scotch_islay", "label": "ブラックボウモア"},
    "laphroaig-25":           {"group": "laphroaig", "region": "scotch_islay", "label": "ラフロイグ25年"},
    "ardbeg-uigeadail":       {"group": "ardbeg", "region": "scotch_islay", "label": "アードベッグ ウーガダール"},
    "ardbeg-corryvreckan":    {"group": "ardbeg", "region": "scotch_islay", "label": "アードベッグ コリーヴレッカン"},

    # Other Scotch
    "springbank-15":  {"group": "springbank", "region": "scotch_campbeltown", "label": "スプリングバンク15年"},
    "springbank-21":  {"group": "springbank", "region": "scotch_campbeltown", "label": "スプリングバンク21年"},
    "talisker-25":    {"group": "talisker", "region": "scotch_skye", "label": "タリスカー25年"},
}

# Article topics
TOPICS = [
    "kaitori", "kihaku", "ranking", "rekishi", "auction-suii",
    "hako-nashi", "kaifu-zumi", "label-yogore", "nisemono-mikata", "takaku-uru",
]

TOPIC_LABELS = {
    "kaitori": "買取相場",
    "kihaku": "希少性・投資価値",
    "ranking": "業者比較",
    "rekishi": "歴史と特徴",
    "auction-suii": "オークション推移",
    "hako-nashi": "箱なし買取",
    "kaifu-zumi": "開封済み買取",
    "label-yogore": "ラベル汚れ",
    "nisemono-mikata": "偽物の見分け方",
    "takaku-uru": "高く売るコツ",
}


def find_related_brands(slug_brand: str, max_n: int = 7) -> list:
    """Find similar brands by group → region → producer family."""
    if slug_brand not in BRAND_META:
        return []
    target = BRAND_META[slug_brand]
    candidates = []

    # Priority 1: same brand group (e.g., other Yamazaki ages)
    for slug, meta in BRAND_META.items():
        if slug == slug_brand:
            continue
        if meta["group"] == target["group"]:
            candidates.append((1, slug, meta))

    # Priority 2: same region/style
    seen = {s for _, s, _ in candidates}
    for slug, meta in BRAND_META.items():
        if slug == slug_brand or slug in seen:
            continue
        if meta["region"] == target["region"]:
            candidates.append((2, slug, meta))

    # Priority 3: same country / similar group
    seen = {s for _, s, _ in candidates}
    same_country_groups = []
    if target["region"].startswith("japan_"):
        same_country_groups = ["suntory", "nikka", "ichirosu", "karuizawa_closed", "hanyu_closed", "mars"]
    elif target["region"].startswith("scotch_"):
        same_country_groups = ["macallan", "glenfiddich", "glenfarclas", "balvenie", "glenmorangie",
                                "bowmore", "laphroaig", "ardbeg", "springbank", "talisker"]

    for slug, meta in BRAND_META.items():
        if slug == slug_brand or slug in seen:
            continue
        if meta["group"] in same_country_groups and meta["group"] != target["group"]:
            candidates.append((3, slug, meta))

    # Sort by priority and limit
    candidates.sort(key=lambda x: x[0])
    return [(s, m) for _, s, m in candidates[:max_n]]


def get_brand_slug_from_article(article_dir: str) -> tuple:
    """Extract brand-slug and topic from article directory name."""
    # E.g., yamazaki-12-kaitori → ("yamazaki-12", "kaitori")
    # Or hibiki-30-kaitori → ("hibiki-30", "kaitori")
    parts = article_dir.split("-")
    # Try matching from longest brand slug first
    for brand in sorted(BRAND_META.keys(), key=lambda x: -len(x)):
        brand_parts = brand.split("-")
        if parts[:len(brand_parts)] == brand_parts:
            topic = "-".join(parts[len(brand_parts):])
            return brand, topic
    return None, None


def build_related_section(slug_brand: str, topic: str) -> str:
    """Build the JSX section for related brands."""
    related = find_related_brands(slug_brand)
    if not related:
        return ""
    topic_label = TOPIC_LABELS.get(topic, "詳細")

    items_html = ""
    for r_slug, r_meta in related:
        # Link to the same topic on the related brand
        href = f"/articles/{r_slug}-{topic}/"
        items_html += (
            f'\n            <li><Link href="{href}" '
            f'className="text-amber-dark underline hover:text-burgundy">'
            f'{r_meta["label"]}の{topic_label}'
            f'</Link></li>'
        )

    return f'''
        <h2 className="font-display text-xl md:text-2xl font-semibold mt-12 mb-4 text-foreground">似ているウイスキー</h2>
        <p className="text-warm-gray text-sm mb-3">同じ蒸溜所・同じ地域・類似価格帯のおすすめ銘柄をピックアップ。{topic_label}情報をあわせてご確認ください。</p>
        <ul className="list-disc pl-6 mb-8 text-sm space-y-1">{items_html}
          </ul>
'''


def insert_related_section(content: str, section_jsx: str) -> str:
    """Insert the related brands section before the FAQ heading."""
    # Find FAQ section markers (multiple patterns to match different article templates)
    faq_patterns = [
        r'<h2[^>]*id="faq"[^>]*>',
        r'<h2[^>]*>\s*\d+\.\s*[^<]*よくある質問',
        r'<h2[^>]*>\s*[^<]*に関するよくある質問',
        r'<h2[^>]*>[^<]*よくある質問',
        r'<h2[^>]*>関連記事',
    ]
    for pat in faq_patterns:
        m = re.search(pat, content)
        if m:
            return content[:m.start()] + section_jsx + "\n        " + content[m.start():]
    return content  # fallback: no insert if no FAQ section


def process_article(article_path: Path) -> tuple[bool, str]:
    slug = article_path.parent.name
    brand, topic = get_brand_slug_from_article(slug)
    if not brand:
        return False, "unknown brand pattern"

    content = article_path.read_text(encoding="utf-8")

    if "似ているウイスキー" in content:
        return False, "already has related section"

    section = build_related_section(brand, topic)
    if not section:
        return False, "no related brands"

    new_content = insert_related_section(content, section)
    if new_content == content:
        return False, "no FAQ section found"

    article_path.write_text(new_content, encoding="utf-8")
    return True, "added related section"


def main():
    articles = sorted([d for d in ARTICLES_DIR.iterdir() if d.is_dir()])
    print(f"Processing {len(articles)} articles...")
    stats = {"updated": 0, "skipped": 0, "errors": 0}
    skip_reasons = {}
    for d in articles:
        page = d / "page.tsx"
        if not page.exists():
            stats["errors"] += 1
            continue
        try:
            success, msg = process_article(page)
            if success:
                stats["updated"] += 1
            else:
                stats["skipped"] += 1
                skip_reasons[msg] = skip_reasons.get(msg, 0) + 1
        except Exception as e:
            stats["errors"] += 1
            print(f"  ✗ {d.name}: {e}")
    print(f"\n✅ Updated: {stats['updated']}")
    print(f"⏭ Skipped: {stats['skipped']}")
    for r, c in skip_reasons.items():
        print(f"   - {r}: {c}")
    print(f"❌ Errors: {stats['errors']}")


if __name__ == "__main__":
    main()
