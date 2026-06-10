#!/usr/bin/env python3
"""
Idempotent in-place patch to repair tier2 internal linking WITHOUT regenerating
(the v4 generator is stale: it still emits robots index:false, so a full regen
would re-add noindex to all 2,350 leaves). This only rewrites breadcrumbs and the
"other prefectures" block so the orphaned prefecture hubs become crawlable.

A) Leaf pages  app/tier2/{pref}/{x}-kaitori/page.tsx
   breadcrumb: ホーム > 市場相場              > {pref}×{brand}
        ->     ホーム > 地域別買取(/tier2/) > {pref}(/tier2/{pref}/) > {brand}
   = every leaf now links UP to its prefecture hub (2,350 inbound links to 47 hubs).

B) Prefecture hubs  app/tier2/{pref}/page.tsx
   - breadcrumb middle crumb -> link to /tier2/
   - replace dead "他の都道府県を見る" copy (linked only to '/') with real links to
     same-region sibling hubs + the /tier2/ index.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
from data.prefectures import PREFECTURES

TIER2 = ROOT / "app" / "tier2"

# region -> [(slug, name_ja), ...]
by_region: dict[str, list[tuple[str, str]]] = {}
for slug, p in PREFECTURES.items():
    by_region.setdefault(p["region"], []).append((slug, p["name_ja"]))

LEAF_BC_RE = re.compile(
    r'<li><Link href="/articles/whisky-kaitori-souba/" className="hover:text-amber-dark transition-colors">市場相場</Link></li>\s*'
    r'<li className="breadcrumb-sep" />\s*'
    r'<li><span className="text-foreground">([^<×]+)×([^<]+)</span></li>'
)


def patch_leaf(path: Path, pref_slug: str) -> bool:
    pref_name = PREFECTURES[pref_slug]["name_ja"]
    txt = path.read_text(encoding="utf-8")
    m = LEAF_BC_RE.search(txt)
    if not m:
        return False  # already patched or unexpected shape
    brand = m.group(2)
    repl = (
        f'<li><Link href="/tier2/" className="hover:text-amber-dark transition-colors">地域別買取</Link></li>\n'
        f'            <li className="breadcrumb-sep" />\n'
        f'            <li><Link href="/tier2/{pref_slug}/" className="hover:text-amber-dark transition-colors">{pref_name}</Link></li>\n'
        f'            <li className="breadcrumb-sep" />\n'
        f'            <li><span className="text-foreground">{brand}</span></li>'
    )
    path.write_text(txt[: m.start()] + repl + txt[m.end():], encoding="utf-8")
    return True


HUB_BC_RE = re.compile(
    r'<li><span className="text-foreground/70">市場相場</span></li>'
)
HUB_OTHER_RE = re.compile(
    r'<h2 className="font-display text-xl md:text-2xl font-semibold mt-12 mb-4">他の都道府県を見る</h2>\s*'
    r'<p class[Nn]ame="text-warm-gray text-sm mb-4">.*?</p>',
    re.DOTALL,
)


def patch_hub(path: Path, pref_slug: str) -> bool:
    region = PREFECTURES[pref_slug]["region"]
    txt = path.read_text(encoding="utf-8")
    orig = txt
    # breadcrumb middle crumb -> link
    txt = HUB_BC_RE.sub(
        '<li><Link href="/tier2/" className="hover:text-amber-dark transition-colors">地域別買取</Link></li>',
        txt,
        count=1,
    )
    # sibling chips (same region, excluding self)
    sibs = [(s, n) for s, n in by_region.get(region, []) if s != pref_slug]
    chips = "\n".join(
        f'        <Link href="/tier2/{s}/" className="inline-block bg-white border border-warm-border rounded-full px-3 py-1 text-xs font-semibold text-foreground hover:border-amber/50 hover:shadow-sm transition-all">{n}</Link>'
        for s, n in sibs
    )
    new_block = (
        '<h2 className="font-display text-xl md:text-2xl font-semibold mt-12 mb-4">他の都道府県を見る</h2>\n'
        f'      <p className="text-warm-gray text-sm mb-4">同じ{region}地方の都道府県、または<Link href="/tier2/" className="text-amber-dark underline hover:text-burgundy">地域別買取の一覧</Link>から全47都道府県を確認できます。</p>\n'
        '      <div className="flex flex-wrap gap-2 mb-6">\n'
        f'{chips}\n'
        '        <Link href="/tier2/" className="inline-block bg-amber/15 border border-amber/40 rounded-full px-3 py-1 text-xs font-semibold text-amber-dark hover:bg-amber/25 transition-all">すべての都道府県 →</Link>\n'
        '      </div>'
    )
    txt2 = HUB_OTHER_RE.sub(lambda _: new_block, txt, count=1)
    if txt2 == txt and "他の都道府県を見る" in txt and "すべての都道府県 →" not in txt:
        # the copy block regex didn't match (already patched or variant) — leave as-is
        pass
    txt = txt2
    if txt != orig:
        path.write_text(txt, encoding="utf-8")
        return True
    return False


def main():
    leaves = hubs = 0
    for pref_dir in sorted(TIER2.iterdir()):
        if not pref_dir.is_dir():
            continue
        pref_slug = pref_dir.name
        if pref_slug not in PREFECTURES:
            continue
        hub = pref_dir / "page.tsx"
        if hub.exists() and patch_hub(hub, pref_slug):
            hubs += 1
        for leaf_dir in pref_dir.iterdir():
            leaf = leaf_dir / "page.tsx"
            if leaf.exists() and patch_leaf(leaf, pref_slug):
                leaves += 1
    print(f"patched {leaves} leaf breadcrumbs, {hubs} prefecture hubs")


if __name__ == "__main__":
    main()
