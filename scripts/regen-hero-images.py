#!/usr/bin/env python3
"""
Regenerate hero images for whisky brands using accurate, brand-specific prompts.
Uses Gemini Nano Banana Pro (gemini-3-pro-image-preview).

Usage:
  python3 scripts/regen-hero-images.py [slug1 slug2 ...]
  python3 scripts/regen-hero-images.py --all-except-confirmed

Confirmed-good (won't regen unless slug specified explicitly):
  yamazaki-18, hibiki-30, karuizawa-12, macallan-25, hibiki-17
"""
import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HEROES_DIR = ROOT / "public" / "images" / "heroes"
PROMPTS_DIR = Path("/tmp/peatbid-hero-prompts")
PROMPTS_DIR.mkdir(parents=True, exist_ok=True)

CONFIRMED_GOOD = {"yamazaki-18", "hibiki-30", "karuizawa-12", "macallan-25", "hibiki-17"}

COMMON_STYLE = (
    "Photorealistic editorial product photography. 16:9 aspect ratio. "
    "Premium high-end product shot with shallow depth of field, refined atmosphere. "
    "CRITICAL TEXT RULES — failing these means the image is rejected: "
    "(1) The label must contain ONLY the exact English words and kanji explicitly listed in the prompt — nothing else. "
    "(2) DO NOT invent, hallucinate, or generate ANY additional English words, made-up brand names, fake Latin, "
    "or garbled fantasy text anywhere on the bottle or label. "
    "(3) DO NOT add small descriptive text rows, fake fine-print, fake distillery addresses, fake serial numbers, "
    "or fake katakana below the main label. "
    "(4) If you would otherwise fill space with text, leave that space EMPTY or use abstract pattern instead. "
    "(5) Spelling of all English words must be 100% correct — 'SUNTORY' not 'SUNTORZ' or 'SONTONS', "
    "'AGED' not 'ALCE' or 'AGLD' or 'YEACE', 'SINGLE MALT WHISKY' not 'SINOLE MALT WINSOY'. "
    "(6) No watermarks, no captions, no overlays. "
)

# Brand-specific prompt details. Each describes the actual product accurately.
BRAND_PROMPTS = {
    # === Yamazaki series (山崎) ===
    "yamazaki-nv": (
        "A photorealistic product photograph of a Suntory Yamazaki Single Malt Japanese Whisky "
        "(non-age statement / NV) bottle. "
        "Bottle: tall rounded-rectangular shape with smooth glass walls, narrow neck, dark amber whisky inside. "
        "Label: rectangular cream/off-white washi paper label centered on the front. "
        "Layout: 'THE SUNTORY SINGLE MALT WHISKY' in small black serif at top, "
        "large bold black '山崎' kanji in brush calligraphy on the right side, "
        "'YAMAZAKI' or smaller English text on the left. "
        "Small red wax-style seal stamp in lower right of label. "
        "Dark wood bar background with warm side lighting. "
    ),
    "yamazaki-12": (
        "A photorealistic product photograph of a Suntory Yamazaki 12 Year Single Malt Japanese Whisky bottle. "
        "Bottle: same shape as Yamazaki NV (tall rounded rectangular smooth glass), filled with deeper amber whisky. "
        "Label: white-cream washi label with 'THE YAMAZAKI' in dark serif, 'SINGLE MALT JAPANESE WHISKY' subtitle, "
        "'AGED 12 YEARS' prominent text, large '山崎' kanji in brush calligraphy on the right, "
        "and a small red square seal stamp. "
        "Warm wood shelf background with side lighting. "
    ),
    "yamazaki-25": (
        "A photorealistic product photograph of a Suntory Yamazaki 25 Year Single Malt Japanese Whisky bottle. "
        "Iconic Yamazaki bottle shape (tall rounded rectangular smooth glass), filled with very deep mahogany whisky. "
        "Red wax seal stamp at the top of the neck. "
        "Single cream/off-white washi paper label on the front of the bottle, with thin gold/burgundy border lines. "
        "Label contains ONLY these text elements (and absolutely nothing else): "
        "'THE YAMAZAKI' (small dark serif at top left), "
        "'SINGLE MALT JAPANESE WHISKY' (smaller dark serif), "
        "'AGED 25 YEARS' (prominent dark serif), "
        "and one large brushed '山崎' kanji on the right side of the label. "
        "Below the AGED 25 YEARS text, leave the label space EMPTY/blank washi paper — "
        "do not generate any fake distillery name, fake Suntory subtext, fake katakana, "
        "or any invented English words like 'SUKTORY', 'YAMAZORY', 'SUNTEDAY', 'JEPANSE'. "
        "Background: premium dark wood library/display setting with soft warm lighting. "
    ),
    "yamazaki-55": (
        "A photorealistic product photograph of an ultra-rare Suntory Yamazaki 55 Year Single Malt Whisky bottle. "
        "Iconic Yamazaki bottle shape with extremely deep mahogany/dark amber whisky. "
        "Label: cream washi with deep burgundy and gold detailing, '55 YEARS' prominently displayed, "
        "'THE YAMAZAKI', '山崎' large kanji on the right. "
        "Museum-grade lacquered wooden display box visible behind, dramatic spotlight, ultra-premium atmosphere. "
    ),

    # === Hibiki series (響) ===
    "hibiki-nv": (
        "A photorealistic product photograph of a Suntory Hibiki Japanese Harmony Blended Whisky bottle. "
        "Bottle: the iconic Hibiki 24-faceted crystal decanter shape, wide cylindrical body with 24 vertical glass facets, "
        "short faceted glass stopper, filled with rich amber whisky. "
        "Neck: thin dark purple/wine collar with 'SUNTORY HIBIKI WHISKY' in small gold text. "
        "Label: rectangular white washi paper label. Layout: 'HIBIKI' in elegant black serif, "
        "'SUNTORY WHISKY' below, 'JAPANESE HARMONY' subtitle in orange/amber color, "
        "large '響' kanji in bold brush calligraphy on the right side. "
        "Soft cream washi paper background with warm lighting. "
    ),
    "hibiki-17": (
        "A photorealistic product photograph of a Suntory Hibiki 17 Year Old Blended Whisky bottle. "
        "Iconic Hibiki 24-faceted crystal decanter shape, wide cylindrical body with 24 vertical glass facets, "
        "short faceted glass stopper with thin gold band, filled with rich amber whisky. "
        "The neck has NO PRINTED COLLAR — leave the neck plain glass with just the gold band. "
        "Single rectangular white/cream washi paper label on the front body of the bottle. "
        "Label contains ONLY these text elements (and absolutely nothing else): "
        "'17 YEAR' (small black serif at upper left), "
        "'HIBIKI' (large black serif below), "
        "'BLENDED WHISKY' (smaller red/orange serif below), "
        "and one large bold '響' kanji in sumi brush calligraphy on the right side of the label. "
        "Below 'BLENDED WHISKY' leave the label space EMPTY/blank washi paper — "
        "do not generate fake distillery names, fake fine-print, invented Latin, or any other words. "
        "Background: warm dark wood interior bar with soft side lighting. "
    ),
    "hibiki-30": (
        "A photorealistic product photograph of a Suntory Hibiki 30 Year Old Blended Whisky bottle. "
        "Iconic Hibiki 24-faceted crystal decanter shape, slightly larger than the 21, "
        "filled with very deep mahogany/amber whisky. Faceted clear stopper with thin gold band. "
        "The bottle has NO NECK COLLAR LABEL — leave the neck plain glass with just the gold band at the very top. "
        "Single rectangular gold-cream washi paper label on the front body of the bottle. "
        "Label contains ONLY these text elements (and absolutely nothing else): "
        "'30 YEAR' in small black serif at upper left, 'HIBIKI' in large black serif below, "
        "'BLENDED WHISKY' in smaller red/amber serif below, "
        "and one large bold '響' kanji in sumi brush calligraphy on the right side of the label. "
        "Below the main label text, leave the label space EMPTY/blank washi paper — "
        "do not generate any other words, fake fine-print, address text, distillery text, or invented Latin/English. "
        "Background: traditional Japanese interior with cherry blossom branches on dark wood, soft warm lighting. "
    ),
    "yamazaki-18": (
        "A photorealistic product photograph of a Suntory Yamazaki 18 Year Single Malt Japanese Whisky bottle. "
        "Iconic Yamazaki bottle shape (tall rounded rectangular smooth glass), filled with deep mahogany amber whisky. "
        "Distinctive deep burgundy/wine-red label dominating the front of the bottle. "
        "Label text in metallic gold lettering: 'THE YAMAZAKI' (top), 'SINGLE MALT JAPANESE WHISKY', "
        "'AGED 18 YEARS' (spelled exactly as AGED, not ALCE or AGLD), 'SUNTORY WHISKY' below. "
        "Large gold '山崎' kanji in brush calligraphy on the right side of label. "
        "Neck band: gold-on-burgundy with '18 YEARS / SINGLE MALT JAPANESE WHISKY'. "
        "Subtle ornamental gold filigree decoration in label corners. "
        "DO NOT add any fake katakana like 'ファイスリー' or 'ファイスリー' below the label. "
        "Background: dark wood bar interior with warm ambient lighting. "
    ),
    "hibiki-21": (
        "A photorealistic product photograph of a Suntory Hibiki 21 Year Old Blended Whisky bottle. "
        "Iconic Hibiki 24-faceted crystal decanter shape, filled with rich amber whisky. "
        "Faceted clear stopper with thin gold band at the neck. "
        "Neck: thin dark burgundy collar with 'SUNTORY HIBIKI WHISKY' in small gold lettering. "
        "Label: rectangular Echizen washi paper label. Layout: '21 YEAR' bold black, 'HIBIKI' large serif, "
        "'BLENDED WHISKY' subtitle, 'Suntory Hibiki Blended Whisky' below, "
        "large '響' kanji in bold sumi brush on the right. "
        "Dark wood shelf with autumn maple leaf and stones as accents, warm lighting. "
    ),

    # === Hakushu series (白州) ===
    "hakushu-nv": (
        "A photorealistic product photograph of a Suntory Hakushu Single Malt Japanese Whisky (NV) bottle. "
        "Bottle: tall slim rounded bottle with green-tinged clear glass, filled with light amber whisky. "
        "Label: cream-white washi label with subtle forest-green accents. "
        "Contains 'THE HAKUSHU', 'SINGLE MALT JAPANESE WHISKY' in dark serif, "
        "large '白州' kanji in bold brush calligraphy on the right side, small red seal stamp. "
        "Misty forest/moss background with cool green-amber lighting, evoking the 'Forest Whisky' identity. "
    ),
    "hakushu-12": (
        "A photorealistic product photograph of a Suntory Hakushu 12 Year Single Malt Whisky bottle. "
        "Same shape as Hakushu NV with slightly deeper amber whisky. "
        "Label: cream washi with forest-green accents, 'THE HAKUSHU', 'SINGLE MALT', "
        "'AGED 12 YEARS' in elegant serif, large '白州' kanji on the right, small red seal. "
        "Misty forest background with cool natural lighting. "
    ),
    "hakushu-18": (
        "A photorealistic product photograph of a Suntory Hakushu 18 Year Single Malt Whisky bottle. "
        "Same iconic Hakushu shape, filled with deeper amber whisky. "
        "Label: cream washi with deeper green-teal accent color, 'THE HAKUSHU', 'AGED 18 YEARS' prominent, "
        "large '白州' kanji, premium serif details, red wax seal. "
        "Refined moss-stone background with warm side lighting. "
    ),
    "hakushu-25": (
        "A photorealistic product photograph of an ultra-rare Suntory Hakushu 25 Year Single Malt Whisky bottle. "
        "Iconic Hakushu bottle shape, deep golden-amber whisky. "
        "Label: cream washi with deep emerald-green and gold accents, '25 YEARS' prominent, "
        "'THE HAKUSHU', large '白州' kanji, premium typography, red seal. "
        "Lacquered wood display, dramatic museum lighting. "
    ),

    # === Yoichi series (余市) ===
    "yoichi-nv": (
        "A photorealistic product photograph of a Nikka Yoichi Single Malt Japanese Whisky (NV) bottle. "
        "Tall rounded cylindrical bottle with smooth glass, filled with deep amber whisky. "
        "Single dark navy-black label on the front of the bottle. "
        "Label contains ONLY these text elements (and absolutely nothing else): "
        "'YOICHI' (large bold yellow-gold serif), "
        "'NIKKA' (smaller gold serif — spelled exactly), "
        "'SINGLE MALT' (small gold serif), "
        "'Japanese Whisky' (small gold cursive subtitle), "
        "and large '余市' kanji in gold brush calligraphy on the right side. "
        "Below the main text, leave the label space EMPTY — "
        "do not generate fake fine-print or invented Latin words. "
        "Hokkaido coastal background with sea-stone and warm side lighting. "
    ),
    "yoichi-10": (
        "A photorealistic product photograph of a Nikka Yoichi 10 Year Single Malt Japanese Whisky bottle. "
        "Same Yoichi rounded cylindrical bottle, deep amber whisky. "
        "The bottle has a thin gold band on the neck with '10 YEARS' embossed (no other neck text). "
        "Single dark navy-black label on the front of the bottle. "
        "Label contains ONLY these text elements (and absolutely nothing else): "
        "'YOICHI 10 YEARS' (top, gold serif), "
        "'NIKKA' (medium gold serif — spelled exactly), "
        "'SINGLE MALT' (smaller gold serif), "
        "and large '余市' kanji in gold brush calligraphy on the right. "
        "Below leave the label space EMPTY — "
        "do not generate fake fine-print like 'NIKKA OUOYARKOR DENNIYUTA' or invented Latin. "
        "Coastal Hokkaido distillery exterior with peat smoke and stone barrel, warm lighting. "
    ),
    "yoichi-15": (
        "A photorealistic product photograph of a Nikka Yoichi 15 Year Single Malt Whisky bottle. "
        "Same Yoichi shape, deeper amber whisky. "
        "Label: dark navy-black with gold '15 YEARS', 'YOICHI', 'NIKKA SINGLE MALT', "
        "'余市' large kanji, premium typography. "
        "Dark stone background with warm dramatic lighting. "
    ),
    "yoichi-20": (
        "A photorealistic product photograph of a rare Nikka Yoichi 20 Year Single Malt Whisky bottle. "
        "Yoichi bottle shape, deep mahogany-amber whisky. "
        "Label: dark navy-black with gold '20 YEARS', 'YOICHI', 'NIKKA', '余市', premium gold typography. "
        "Museum display with dramatic lighting. "
    ),

    # === Miyagikyo series (宮城峡) ===
    "miyagikyo-nv": (
        "A photorealistic product photograph of a Nikka Miyagikyo Single Malt Japanese Whisky (NV) bottle. "
        "Bottle: tall rounded cylindrical shape similar to Yoichi but with cream/light label. "
        "Filled with light amber whisky. "
        "Label: cream-white background with deep green-bronze 'MIYAGIKYO', 'NIKKA SINGLE MALT', "
        "'宮城峡' kanji in bronze brush on the right. "
        "Forest-river background with cool soft lighting, evoking the Sendai valley. "
    ),
    "miyagikyo-12": (
        "A photorealistic product photograph of a Nikka Miyagikyo 12 Year Single Malt Whisky bottle. "
        "Same Miyagikyo shape, deeper amber whisky. "
        "Label: cream-white with bronze-green '12 YEARS', 'MIYAGIKYO', 'NIKKA SINGLE MALT', "
        "'宮城峡' kanji. "
        "Soft natural-light background. "
    ),
    "miyagikyo-15": (
        "A photorealistic product photograph of a Nikka Miyagikyo 15 Year Single Malt Japanese Whisky bottle. "
        "Single bottle (NOT multiple bottles) — tall rounded cylindrical clear glass with deep amber whisky. "
        "Single cream-white paper label on the front of the bottle. "
        "Label contains ONLY these text elements (and absolutely nothing else): "
        "'MIYAGIKYO' (large dark bronze-green serif at top — spelled exactly), "
        "'15 YEARS' (prominent dark serif below), "
        "'NIKKA SINGLE MALT' (smaller dark serif — spelled exactly as NIKKA, not NICCA or NIKKO), "
        "and large '宮城峡' kanji in bronze brush calligraphy on the right side of the label. "
        "Below the main text, leave the label space EMPTY/blank paper — "
        "do not generate any fake distillery names like 'MIYAGIKKO', 'STACLE MALT WHISKY' or invented English. "
        "Background: refined forest stone setting with warm soft lighting. "
    ),

    # === Taketsuru series (竹鶴) ===
    "taketsuru-pure": (
        "A photorealistic product photograph of a Nikka Taketsuru Pure Malt Whisky bottle. "
        "Bottle: short rounded cylindrical bottle with smooth amber-colored glass. "
        "Label: cream-white washi with elegant black '竹鶴' kanji prominent, "
        "'NIKKA TAKETSURU', 'PURE MALT' in serif, small red square seal. "
        "Warm wood library background with refined lighting. "
    ),
    "taketsuru-17": (
        "A photorealistic product photograph of a rare Nikka Taketsuru 17 Year Pure Malt Whisky bottle. "
        "Same Taketsuru bottle, deeper amber whisky. "
        "Label: cream washi with '竹鶴' kanji, '17 YEARS', 'NIKKA TAKETSURU', 'PURE MALT', red seal. "
        "Premium dark wood display, warm dramatic lighting. "
    ),
    "taketsuru-21": (
        "A photorealistic product photograph of a Nikka Taketsuru 21 Year Pure Malt Whisky bottle. "
        "Short rounded cylindrical bottle with deep mahogany whisky. "
        "Single cream washi paper label on the front of the bottle. "
        "Label contains ONLY these text elements (and absolutely nothing else): "
        "Large bold '竹鶴' kanji in black sumi brush calligraphy on the right side, "
        "'21 YEARS' (small dark serif at left), "
        "'NIKKA TAKETSURU' (smaller dark serif), "
        "'PURE MALT' (small dark serif), "
        "and one small red square seal stamp. "
        "Below 'PURE MALT' leave the label space EMPTY/blank washi — "
        "do not generate fake fine-print, fake Latin like 'NEKAD-SURFTITHUNG' or fake katakana. "
        "Refined dark wood display with warm lighting. "
    ),
    "taketsuru-25": (
        "A photorealistic product photograph of a very rare Nikka Taketsuru 25 Year Pure Malt Whisky bottle. "
        "Short rounded cylindrical bottle with very deep mahogany whisky. "
        "The bottle has NO PRINTED NECK COLLAR — leave the neck plain glass. "
        "Single cream washi paper label on the front of the bottle. "
        "Label contains ONLY these text elements (and absolutely nothing else): "
        "Large bold '竹鶴' kanji in black sumi brush calligraphy at top center, "
        "'25 YEARS' (prominent dark serif below the kanji), "
        "'PURE MALT WHISKY' (smaller dark serif), "
        "'NIKKA' (smaller dark serif at bottom — spelled exactly as NIKKA, not NINKS), "
        "and one small embossed seal stamp. "
        "Below 'NIKKA' leave the label space EMPTY/blank washi — "
        "do not generate any fake fine-print or invented Latin words. "
        "Museum-grade lacquered display with dramatic spotlight. "
    ),

    # === Karuizawa (軽井沢) - closed distillery ===
    "karuizawa-30": (
        "A photorealistic product photograph of an ultra-rare Karuizawa 30 Year Single Malt Whisky bottle. "
        "Bottle: tall classic single malt bottle with deep amber/mahogany whisky. "
        "Single cream-white paper label on the front of the bottle with deep red-burgundy and gold accents. "
        "Label contains ONLY these text elements (and absolutely nothing else): "
        "'KARUIZAWA' (dark serif at upper left), "
        "'30 YEARS' (prominent dark serif below), "
        "'SINGLE MALT JAPANESE WHISKY' (smaller dark serif below — spelled exactly as JAPANESE, not JNEAVESE or JEPANSE), "
        "and large '軽井沢' kanji in elegant brush calligraphy on the right side. "
        "Below the main text, leave the label space EMPTY/blank paper — "
        "do not generate any 'CLOSED DISTILLERY EDITION' or fake fine-print text. "
        "Closed-distillery archival atmosphere, deep wood vault background with single dramatic spotlight. "
    ),
    "hanyu-card": (
        "A photorealistic product photograph of a rare Hanyu Ichiro's Malt 'Card Series' whisky bottle "
        "(featuring playing card themed label like King of Hearts or Joker, ultra-rare collector edition). "
        "Bottle: tall classic single malt bottle with deep amber whisky. "
        "Label: white background featuring a stylized playing card illustration (face card like King or Joker), "
        "'HANYU ICHIRO'S MALT' in elegant serif, '羽生' kanji, card suit symbols. "
        "Velvet collector's display with museum spotlight. "
    ),
    "chichibu-the-first": (
        "A photorealistic product photograph of a Chichibu 'The First' Single Malt Whisky bottle (Ichiro's Malt, "
        "Venture Whisky, debut release). "
        "Bottle: tall slim modern single malt bottle with deep amber whisky. "
        "Label: cream washi with '秩父' kanji prominent, 'CHICHIBU', 'THE FIRST', 'ICHIRO'S MALT', "
        "'SINGLE MALT JAPANESE WHISKY', red seal. "
        "Refined modern craft distillery background with warm lighting. "
    ),
    "ichirosu-card": (
        "A photorealistic product photograph of an Ichiro's Malt Card Series whisky bottle "
        "(playing-card themed label, collector edition). "
        "Bottle: tall slim classic single malt bottle with deep amber whisky. "
        "Label: white with stylized playing card illustration (face card or Joker), "
        "'ICHIRO'S MALT', 'CARD SERIES', card suit symbols. "
        "Collector's velvet display with dramatic spotlight. "
    ),
    "ichirosu-double-distilleries": (
        "A photorealistic product photograph of an Ichiro's Malt 'Double Distilleries' whisky bottle "
        "(blending Chichibu and Hanyu casks). "
        "Bottle: tall slim modern single malt bottle with rich amber whisky. "
        "Label: cream washi with 'ICHIRO'S MALT', 'DOUBLE DISTILLERIES', 'VENTURE WHISKY', "
        "and subtle Japanese kanji, modern minimalist design. "
        "Refined craft distillery background. "
    ),
    "ichirosu-mwr": (
        "A photorealistic product photograph of an Ichiro's Malt 'Malt & Wine Wood Reserve (MWR)' whisky bottle. "
        "Bottle: tall slim modern single malt bottle with rich red-amber whisky. "
        "Label: cream washi with 'ICHIRO'S MALT', 'MALT WINE WOOD RESERVE', 'VENTURE WHISKY', "
        "modern minimalist design with subtle wine-cask references. "
        "Warm wood barrel background. "
    ),
    "mars-komagatake": (
        "A photorealistic product photograph of a Mars 駒ヶ岳 (Komagatake) Single Malt Japanese Whisky bottle. "
        "Tall classic single malt bottle with light amber whisky. "
        "Single cream-white paper label on the front of the bottle. "
        "Label contains ONLY these text elements (and absolutely nothing else): "
        "A subdued mountain silhouette illustration at the top of the label, "
        "small 'MARS' brand mark, "
        "Large '駒ヶ岳' kanji in dark serif on the right side, "
        "'KOMAGATAKE' (dark serif), "
        "'SINGLE MALT' (smaller dark serif), "
        "'JAPANESE WHISKY' (smaller dark serif), "
        "and 'Mars Shinshu Distillery' (small italic at bottom — spelled exactly as Shinshu, not Nagsss). "
        "Below leave label space EMPTY — do not generate fake fine-print. "
        "Mountain landscape background with morning mist. "
    ),

    # === Macallan ===
    "macallan-12": (
        "A photorealistic product photograph of a Macallan 12 Year Old Sherry Oak Cask Highland Single Malt "
        "Scotch Whisky bottle. "
        "Bottle: distinctive Macallan tapered shape with broader shoulders narrowing to a point at top. "
        "Filled with rich amber-mahogany whisky from sherry cask aging. "
        "Label: white background with Macallan estate house silhouette logo at top, "
        "'The MACALLAN' in elegant black serif, 'HIGHLAND SINGLE MALT', 'SCOTCH WHISKY', "
        "'12 YEARS OLD' prominent, 'SHERRY OAK CASK' subtitle. "
        "Warm oak wood table with dramatic side lighting. "
    ),
    "macallan-18": (
        "A photorealistic product photograph of a Macallan 18 Year Old Sherry Oak Highland Single Malt Whisky bottle. "
        "Distinctive Macallan tapered bottle shape (broader shoulders narrowing to a point at top), deep mahogany whisky. "
        "Single white paper label centered on the front of the bottle. "
        "Label contains ONLY these text elements (and absolutely nothing else): "
        "Macallan estate house silhouette logo at the very top, "
        "'The MACALLAN' (elegant black serif), "
        "'HIGHLAND SINGLE MALT' (smaller serif), "
        "'SCOTCH WHISKY' (smaller serif — spelled exactly as SCOTCH, not MALT WHISKY duplicated), "
        "'18' (large numeric), "
        "'YEARS OLD' (small serif below), "
        "'SHERRY OAK CASK' (small serif at bottom). "
        "Below 'SHERRY OAK CASK' leave the label space EMPTY — "
        "do not generate fake fine-print, fake Latin like '1ECC1W IONIA' or any other invented text. "
        "Premium oak display with warm dramatic lighting. "
    ),
    "macallan-30": (
        "A photorealistic product photograph of an ultra-rare Macallan 30 Year Old Sherry Oak Single Malt Whisky bottle. "
        "Same Macallan shape, very deep mahogany whisky. "
        "Label: cream-white with Macallan estate logo, 'The MACALLAN', '30 YEARS OLD' prominent, "
        "'SHERRY OAK', burgundy and gold accents, museum-grade typography. "
        "Lacquered wood museum display with dramatic spotlight. "
    ),
    "macallan-fine-rare": (
        "A photorealistic product photograph of a Macallan Fine & Rare collection ultra-rare whisky bottle. "
        "Bottle: Macallan signature shape, deep mahogany whisky with extreme age. "
        "Label: dark black-with-gold accents, 'MACALLAN', 'FINE & RARE', vintage year in gold "
        "(e.g., '1950' or other prestigious year), premium gold serif typography. "
        "Museum vault display with single dramatic spotlight, deep shadows. "
    ),

    # === Bowmore ===
    "bowmore-25": (
        "A photorealistic product photograph of a Bowmore 25 Year Old Islay Single Malt Scotch Whisky bottle. "
        "Bottle: traditional rounded cylindrical Bowmore shape with deep amber whisky. "
        "Label: dark navy or dark green background with white/gold 'BOWMORE' text and 'ISLAY' subtitle, "
        "'25 YEARS' prominent in gold, 'SINGLE MALT SCOTCH WHISKY', traditional Bowmore distillery crest. "
        "Islay rocky coastline background with dramatic clouds and salt spray, dramatic side lighting. "
    ),
    "bowmore-blackbowmore": (
        "A photorealistic product photograph of the ultra-rare Black Bowmore Islay Single Malt Whisky bottle. "
        "Bottle: dark colored glass or very dark sherry-aged whisky giving black appearance. "
        "Label: pure black background with gold 'BLACK BOWMORE' text in elegant serif, "
        "'ISLAY SINGLE MALT', vintage year in gold. "
        "Mysterious dark Islay coast background with moonlit atmosphere. "
    ),

    # === Ardbeg ===
    "ardbeg-uigeadail": (
        "A photorealistic product photograph of an Ardbeg Uigeadail Islay Single Malt Scotch Whisky bottle. "
        "Distinctive Ardbeg dark green tinted apothecary-style glass bottle, rounded shoulders, rich amber whisky. "
        "Single vintage cream/yellow paper label on the front of the bottle. "
        "Label contains ONLY these text elements (and absolutely nothing else): "
        "'ESTD 1815' (small dark brown serif at top), "
        "Ardbeg Celtic 'A' logo crest, "
        "'Ardbeg' (bold dark brown serif — spelled exactly), "
        "'UIGEADAIL' (bold dark brown serif), "
        "'The Ultimate' (small italic), "
        "'ISLAY SINGLE MALT' (smaller dark brown serif), "
        "'SCOTCH WHISKY' (smaller dark brown serif). "
        "Below leave label space EMPTY — do not generate fake fine-print Latin like "
        "'ISLAY SOMHE CHARE SCOTCH WHISKY' or invented words. "
        "Rugged Islay coast with peat smoke and atmospheric sunset lighting. "
    ),
    "ardbeg-corryvreckan": (
        "A photorealistic product photograph of an Ardbeg Corryvreckan Islay Single Malt Whisky bottle. "
        "Same distinctive Ardbeg dark green tinted bottle, rich amber whisky. "
        "Label: vintage cream/yellow with bold 'CORRYVRECKAN' in dark brown, "
        "'ARDBEG', 'ISLAY SINGLE MALT SCOTCH WHISKY', Celtic 'A' logo, whirlpool motif. "
        "Stormy Islay sea with dramatic waves and peat smoke. "
    ),

    # === Springbank ===
    "springbank-15": (
        "A photorealistic product photograph of a Springbank 15 Year Old Single Malt Scotch Whisky bottle. "
        "Classic traditional Campbeltown-shaped single malt bottle with rich amber whisky. "
        "Single cream-white paper label on the front of the bottle. "
        "Label contains ONLY these text elements (and absolutely nothing else): "
        "'SPRINGBANK' (large bold dark serif at top), "
        "'15' (very large numeric), "
        "'YEARS OLD' (small dark serif below), "
        "'CAMPBELTOWN' (small dark serif), "
        "'SINGLE MALT SCOTCH WHISKY' (small dark serif — spelled exactly), "
        "'ESTD 1828' with small Springbank S-shield emblem at bottom. "
        "Below leave label space EMPTY — "
        "do not generate fake 'TRADITIONAL DISTILLERY' garbled text or invented Latin. "
        "Traditional Scottish distillery warehouse with casks, warm warehouse lighting. "
    ),
    "springbank-21": (
        "A photorealistic product photograph of a Springbank 21 Year Old Single Malt Scotch Whisky bottle. "
        "Same classic bottle, deeper amber whisky. "
        "Label: cream traditional with 'SPRINGBANK', '21 YEARS OLD' prominent, "
        "'CAMPBELTOWN SINGLE MALT', distillery emblem. "
        "Traditional warehouse atmosphere with dramatic lighting. "
    ),

    # === Other Scotch ===
    "laphroaig-25": (
        "A photorealistic product photograph of a Laphroaig 25 Year Old Islay Single Malt Scotch Whisky bottle. "
        "Classic Laphroaig rounded bottle with green tinted glass and deep amber whisky. "
        "Single white paper label with green Laphroaig border on the front of the bottle. "
        "Label contains ONLY these text elements (and absolutely nothing else): "
        "Laphroaig coat of arms emblem at top, "
        "'LAPHROAIG' (bold dark serif — spelled exactly), "
        "'ISLAY SINGLE MALT' (smaller dark serif), "
        "'SCOTCH WHISKY' (smaller dark serif), "
        "'AGED 25 YEARS' (smaller dark serif — spelled exactly as AGED 25 YEARS, not NDLN), "
        "and 'ESTD 1815' at the bottom. "
        "Below leave label space EMPTY — do not generate fake fine-print. "
        "Misty Islay peat moorland background, atmospheric dusk lighting. "
    ),
    "talisker-25": (
        "A photorealistic product photograph of a Talisker 25 Year Old Single Malt Scotch Whisky bottle. "
        "Bottle: distinctive square-shouldered Talisker bottle, rich amber whisky. "
        "Label: weathered cream/white label with bold 'TALISKER' in dark serif, "
        "'25 YEARS OLD' prominent, 'SINGLE MALT SCOTCH WHISKY', 'SKYE' subtitle, "
        "Talisker maritime crest. "
        "Skye Island rocky coast with sea spray, atmospheric. "
    ),
    "glenfiddich-30": (
        "A photorealistic product photograph of a Glenfiddich 30 Year Old Single Malt Scotch Whisky bottle. "
        "Bottle: the distinctive Glenfiddich triangular-cross-section bottle, deep mahogany whisky. "
        "Label: cream-white triangular label following bottle shape, 'GLENFIDDICH' in elegant black serif, "
        "'30 YEARS OLD' prominent in gold, 'SINGLE MALT SCOTCH WHISKY', "
        "the stag emblem (Glenfiddich means 'Valley of the Deer'). "
        "Warm Speyside oak warehouse with dramatic lighting. "
    ),
    "glenfarclas-25": (
        "A photorealistic product photograph of a Glenfarclas 25 Year Old Single Malt Scotch Whisky bottle. "
        "Traditional Glenfarclas tall classic bottle with rich mahogany whisky from sherry cask. "
        "Single cream-white paper label on the front of the bottle. "
        "Label contains ONLY these text elements (and absolutely nothing else): "
        "'GLENFARCLAS' (bold dark serif at top), "
        "'AGED 25 YEARS OLD' (smaller dark serif — spelled exactly as AGED, not PIGLEKD), "
        "'HIGHLAND' (smaller dark serif), "
        "'SINGLE MALT' (smaller dark serif), "
        "'SCOTCH WHISKY' (smaller dark serif), "
        "and a small Glenfarclas family crest emblem at the bottom. "
        "Below leave label space EMPTY — do not generate fake fine-print or invented Latin. "
        "Speyside warehouse with sherry casks visible, warm lighting. "
    ),
    "balvenie-portwood-21": (
        "A photorealistic product photograph of a Balvenie PortWood 21 Year Old Single Malt Scotch Whisky bottle. "
        "Distinctive teardrop-shaped Balvenie bottle, rich red-amber whisky from port cask finish. "
        "Single cream-white paper label on the front of the bottle. "
        "Label contains ONLY these text elements (and absolutely nothing else): "
        "'SINGLE MALT SCOTCH WHISKY' (small dark serif at top), "
        "'THE BALVENIE' (large elegant black serif — spelled exactly), "
        "'PORTWOOD' (dark serif — spelled exactly as PORTWOOD, not PORTWOOD FKERURY or similar), "
        "'AGED 21 YEARS' (dark serif — spelled exactly as AGED), "
        "'SINGLE MALT SCOTCH WHISKY' (small dark serif at bottom), "
        "and 'made with care' in small cursive at the very bottom (this is correct Balvenie text). "
        "Below the main text, leave the label space EMPTY/blank paper — "
        "do not generate any fake cursive Gaelic, fake fine-print, fake distillery address, "
        "or invented Latin/English words. "
        "Balvenie's signature handwritten 'made with care' branding. "
        "Warm Speyside cooperage background with port cask visible. "
    ),
    "glenmorangie-signet": (
        "A photorealistic product photograph of a Glenmorangie Signet Highland Single Malt Scotch Whisky bottle. "
        "Bottle: distinctive black opaque Glenmorangie Signet bottle (very unique black ceramic-look). "
        "Label: black-on-black with gold 'GLENMORANGIE' embossed text, 'SIGNET' prominent in gold serif, "
        "'HIGHLAND SINGLE MALT SCOTCH WHISKY' subtitle, 'CHOCOLATE MALT' description in small text. "
        "Premium black-and-gold display with dramatic spotlight. "
    ),
}


def generate_one(slug: str) -> bool:
    """Generate hero image for one brand. Returns True on success."""
    out_path = HEROES_DIR / f"{slug}.png"
    prompt_text = BRAND_PROMPTS.get(slug)
    if not prompt_text:
        print(f"  ⚠ {slug}: no prompt defined, SKIP")
        return False

    full_prompt = prompt_text.strip() + " " + COMMON_STYLE
    prompt_file = PROMPTS_DIR / f"{slug}.txt"
    prompt_file.write_text(full_prompt, encoding="utf-8")

    try:
        result = subprocess.run(
            [
                "gemini-nano-banana-tool", "generate",
                "--prompt-file", str(prompt_file),
                "-o", str(out_path),
                "--model", "gemini-3-pro-image-preview",
                "--resolution", "1K",
                "-a", "16:9",
            ],
            capture_output=True, text=True, timeout=180,
        )
        if result.returncode != 0:
            print(f"  ❌ {slug}: gen failed — {result.stderr[-200:]}")
            return False
        if out_path.exists() and out_path.stat().st_size > 50_000:
            print(f"  ✓ {slug}: {out_path.stat().st_size:,} bytes")
            return True
        else:
            print(f"  ❌ {slug}: file missing or too small")
            return False
    except subprocess.TimeoutExpired:
        print(f"  ⏱ {slug}: timeout")
        return False
    except Exception as e:
        print(f"  ❌ {slug}: exception {e}")
        return False


def main():
    args = sys.argv[1:]
    if "--all-except-confirmed" in args:
        slugs = [s for s in BRAND_PROMPTS.keys() if s not in CONFIRMED_GOOD]
    elif args:
        slugs = args
    else:
        print(__doc__)
        sys.exit(1)

    print(f"🎨 Generating {len(slugs)} hero images...")
    success = 0
    for i, slug in enumerate(slugs, 1):
        print(f"  [{i}/{len(slugs)}] {slug}")
        if generate_one(slug):
            success += 1
    print(f"\n✅ {success}/{len(slugs)} generated")


if __name__ == "__main__":
    main()
