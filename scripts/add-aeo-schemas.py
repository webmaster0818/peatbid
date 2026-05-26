#!/usr/bin/env python3
"""
peatbid 506記事に Article schema + BreadcrumbList schema を一括追加。
AEO/GEO 対策: ChatGPT/Perplexity からの引用率を最大化。
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ARTICLES_DIR = ROOT / "app" / "articles"
SITE_URL = "https://peatbid.com"
PUBLISHER = "PeatBid"
AUTHOR = "PeatBid編集部"
DEFAULT_PUBLISHED = "2026-05-14T00:00:00+09:00"
DEFAULT_MODIFIED = "2026-05-18T00:00:00+09:00"

# Pattern to find existing FaqSchema function
FAQ_FN_PATTERN = re.compile(r'function FaqSchema\(\) \{[\s\S]*?return <script[\s\S]*?\}}\s*}\s*\}\s*\)\s*\}\s*\}\}\s*/>;\s*\}', re.MULTILINE)
# Easier: find the line with `<FaqSchema />` inside JSX and insert schemas right before
INSERT_POINT_PATTERN = re.compile(r'(\s*<FaqSchema />\s*)')

# Extract metadata from each article file
METADATA_TITLE_PATTERN = re.compile(r"title:\s*['\"](.+?)['\"],")
METADATA_DESC_PATTERN = re.compile(r"description:\s*['\"](.+?)['\"],")
H1_PATTERN = re.compile(r'<h1[^>]*>(.+?)</h1>', re.DOTALL)

# Find breadcrumb structure
BREADCRUMB_PATTERN = re.compile(
    r'<nav aria-label="パンくずリスト"[\s\S]*?</nav>',
    re.MULTILINE
)
BREADCRUMB_ITEM_PATTERN = re.compile(
    r'<li>(?:<Link href="(?P<href>[^"]+)"[^>]*>(?P<linktext>[^<]+)</Link>|<span[^>]*>(?P<span>[^<]+)</span>)',
)


def extract_metadata(content: str, slug: str) -> dict:
    """Extract title, description, breadcrumbs from article file."""
    title_match = METADATA_TITLE_PATTERN.search(content)
    desc_match = METADATA_DESC_PATTERN.search(content)
    h1_match = H1_PATTERN.search(content)

    title = title_match.group(1) if title_match else slug
    description = desc_match.group(1) if desc_match else ""
    h1_raw = h1_match.group(1).strip() if h1_match else title
    # Strip tags from h1
    h1 = re.sub(r'<[^>]+>', '', h1_raw).strip()

    # Extract breadcrumb items
    breadcrumbs = []
    bc_match = BREADCRUMB_PATTERN.search(content)
    if bc_match:
        bc_html = bc_match.group(0)
        items = []
        position = 1
        for m in BREADCRUMB_ITEM_PATTERN.finditer(bc_html):
            if m.group('href'):
                items.append({
                    "@type": "ListItem",
                    "position": position,
                    "name": m.group('linktext'),
                    "item": f"{SITE_URL}{m.group('href')}",
                })
                position += 1
            elif m.group('span'):
                items.append({
                    "@type": "ListItem",
                    "position": position,
                    "name": m.group('span'),
                })
                position += 1
        breadcrumbs = items

    return {
        "title": title,
        "description": description,
        "h1": h1,
        "breadcrumbs": breadcrumbs,
    }


def build_article_schema(slug: str, meta: dict) -> dict:
    """Build Article JSON-LD schema."""
    url = f"{SITE_URL}/articles/{slug}/"
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": meta["h1"] or meta["title"],
        "description": meta["description"],
        "url": url,
        "datePublished": DEFAULT_PUBLISHED,
        "dateModified": DEFAULT_MODIFIED,
        "author": {
            "@type": "Organization",
            "name": AUTHOR,
            "url": f"{SITE_URL}/editorial/",
        },
        "publisher": {
            "@type": "Organization",
            "name": PUBLISHER,
            "url": SITE_URL,
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url,
        },
    }


def build_breadcrumb_schema(breadcrumbs: list) -> dict:
    """Build BreadcrumbList JSON-LD schema."""
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs,
    }


def build_schema_jsx(slug: str, meta: dict) -> str:
    """Build the JSX snippet to insert."""
    article = build_article_schema(slug, meta)
    article_json = json.dumps(article, ensure_ascii=False)

    snippets = [
        f'<script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: {json.dumps(article_json)} }}}} />'
    ]

    if meta["breadcrumbs"]:
        breadcrumb = build_breadcrumb_schema(meta["breadcrumbs"])
        breadcrumb_json = json.dumps(breadcrumb, ensure_ascii=False)
        snippets.append(
            f'<script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: {json.dumps(breadcrumb_json)} }}}} />'
        )

    return "\n      " + "\n      ".join(snippets)


def process_article(article_path: Path) -> tuple[bool, str]:
    """Process one article. Returns (success, message)."""
    slug = article_path.parent.name
    page_file = article_path

    content = page_file.read_text(encoding="utf-8")

    # Check if already has Article schema (both plain and escaped JSON forms)
    if (
        '"@type": "Article"' in content
        or '"@type":"Article"' in content
        or r'\"@type\": \"Article\"' in content
        or r'\"@type\":\"Article\"' in content
    ):
        return False, f"already has Article schema"

    meta = extract_metadata(content, slug)
    if not meta["h1"]:
        return False, "no h1 found"

    schema_jsx = build_schema_jsx(slug, meta)

    # Insert before <FaqSchema />
    match = INSERT_POINT_PATTERN.search(content)
    if not match:
        return False, "no <FaqSchema /> insertion point"

    new_content = content[:match.start()] + schema_jsx + match.group(0) + content[match.end():]
    page_file.write_text(new_content, encoding="utf-8")
    return True, f"added Article + {len(meta['breadcrumbs'])} breadcrumb items"


def main():
    article_dirs = sorted([d for d in ARTICLES_DIR.iterdir() if d.is_dir()])
    print(f"Processing {len(article_dirs)} articles...")

    stats = {"updated": 0, "skipped": 0, "errors": 0}
    skip_reasons = {}

    for article_dir in article_dirs:
        page_file = article_dir / "page.tsx"
        if not page_file.exists():
            stats["errors"] += 1
            continue

        try:
            success, msg = process_article(page_file)
            if success:
                stats["updated"] += 1
            else:
                stats["skipped"] += 1
                skip_reasons[msg] = skip_reasons.get(msg, 0) + 1
        except Exception as e:
            stats["errors"] += 1
            print(f"  ✗ {article_dir.name}: {e}")

    print(f"\n✅ Updated: {stats['updated']}")
    print(f"⏭ Skipped: {stats['skipped']}")
    for reason, count in skip_reasons.items():
        print(f"   - {reason}: {count}")
    print(f"❌ Errors: {stats['errors']}")


if __name__ == "__main__":
    main()
