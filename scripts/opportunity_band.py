#!/usr/bin/env python3
"""機会バンド共通ロジック — フュージョン打ち手②（2026-07-04 恒久実装）

GSC 28日実測で pos8-30 × imp30+ の「機会バンド」10ページに対して、
  1. title/meta の鮮度＋中央値実数の機械挿入
  2. 直近12週スパークライン（軽量インラインSVG・外部ライブラリ不使用・静的HTMLに埋め込み）
  3. FAQ への「今の買取相場はいくら？」中央値実数Q&A
を提供する。generate-brand-pages-v3.py / generate-angle-pages-v3.py の両方から import される。

⚠️ ページは週次cron（com.peatbid.weekly-yahoo-update・毎週月曜3時）で再生成されるため、
   page.tsx 直編集は禁止。バンドの増減・表現変更はこのファイルと両生成器で行うこと。
データ源: data/price-history/{slug}.json（fetch-yahoo-medians.py が週次更新）。
insufficient（n<20）の銘柄には実数を出さない（正直設計・架空禁止）。
"""
import datetime
import json
from pathlib import Path

ROOT = Path(__file__).parent.parent
PRICE_HISTORY_DIR = ROOT / "data" / "price-history"

_NOW = datetime.date.today()
BAND_MONTH = f"【{_NOW.year}年{_NOW.month}月】"

# 買取(brand)ページ: brands.csv の slug（ページURLは /articles/{slug}-kaitori/）
BAND_BRAND_SLUGS = {
    "yamazaki-nv",
    "glenfarclas-25",
    "bowmore-blackbowmore",
    "yoichi-20",
    "springbank-15",
    "hakushu-nv",
    "ichirosu-double-distilleries",
    "yamazaki-12",
}

# 角度(angle)ページ: フルページslug（/articles/{slug}/）
BAND_ANGLE_SLUGS = {
    "glenfarclas-25-hako-nashi",
    "taketsuru-pure-kihaku",
}

# 週次cronの実行曜日（installed plist Weekday=1 = 月曜）
UPDATE_NOTE = "毎週月曜更新・ヤフオク実落札の中央値"


def load_price_history(slug):
    p = PRICE_HISTORY_DIR / f"{slug}.json"
    if not p.exists():
        return None
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return None


def band_latest(slug):
    """(median:int, sample_n:int) を返す。データ欠損・insufficient は None（実数を出さない）。"""
    d = load_price_history(slug)
    if not d:
        return None
    lat = d.get("latest") or {}
    med = lat.get("median_jpy")
    if lat.get("insufficient") or not isinstance(med, (int, float)) or med <= 0:
        return None
    n = lat.get("sample_n")
    return int(med), (int(n) if isinstance(n, (int, float)) else 0)


def band_title(display_name, median):
    """機会バンド用の機械挿入title。TITLE_ALIAS 適用後の表示名を渡すこと。"""
    return f"【毎週更新】{display_name}の買取相場｜ヤフオク落札中央値{median:,}円基準{BAND_MONTH}"


def _fmt_date_md(d):
    parts = str(d).split("-")
    if len(parts) == 3:
        return f"{int(parts[1])}/{int(parts[2])}"
    return str(d)


def sparkline_block(slug, name):
    """直近12週の中央値推移を静的インラインSVGで描画したJSXブロックを返す。
    点数<3 は捏造せず「データ蓄積中」＋現在値のみを表示（正直設計）。データ皆無なら空文字。"""
    d = load_price_history(slug)
    if not d:
        return ""
    hist = [
        h for h in (d.get("history") or [])
        if isinstance(h.get("median_jpy"), (int, float)) and h["median_jpy"] > 0
    ][-12:]
    lat = d.get("latest") or {}

    if len(hist) < 3:
        cur_html = ""
        if isinstance(lat.get("median_jpy"), (int, float)) and lat["median_jpy"] > 0 and not lat.get("insufficient"):
            n_label = lat.get("sample_n") if lat.get("sample_n") is not None else "—"
            cur_html = (
                f'\n            <p className="font-display text-2xl font-semibold text-amber-dark mb-2">{int(lat["median_jpy"]):,}円'
                f'<span className="text-xs text-warm-gray font-normal ml-2">現在のヤフオク落札中央値（n={n_label}件）</span></p>'
            )
        return f'''
          <div className="bg-white border border-warm-border rounded-xl p-5 my-6 not-prose">
            <p className="text-sm font-bold text-ink mb-2">{name}の買取相場推移（ヤフオク落札中央値）</p>{cur_html}
            <p className="text-xs text-warm-gray leading-relaxed">週次推移グラフはデータ蓄積中です（毎週月曜の自動更新で今後グラフ化されます）。出典: ヤフオク実落札データ（過去180日・IQR外れ値除去後の中央値）。買取額を保証するものではありません。</p>
          </div>
'''

    # ---- ジオメトリ ----
    W, H = 640, 210
    L, R, T, B = 66, 18, 18, 34
    vals = [float(h["median_jpy"]) for h in hist]
    vmin, vmax = min(vals), max(vals)
    span = vmax - vmin
    pad = span * 0.18 if span > 0 else max(vmax * 0.06, 1.0)
    lo, hi = vmin - pad, vmax + pad
    nx = len(hist)

    def x_at(i):
        return L + (W - L - R) * (i / (nx - 1))

    def y_at(v):
        return T + (H - T - B) * (1 - (v - lo) / (hi - lo))

    pts = " ".join(f"{x_at(i):.1f},{y_at(v):.1f}" for i, v in enumerate(vals))

    # グリッド（上・中・下の3本）＋Y軸ラベル
    grid_lines = []
    for gv in (hi - pad, (lo + hi) / 2, lo + pad):
        gy = y_at(gv)
        grid_lines.append(
            f'<line x1="{L}" y1="{gy:.1f}" x2="{W - R}" y2="{gy:.1f}" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" />'
            f'<text x="{L - 6}" y="{gy + 3.5:.1f}" fontSize="10" fill="#807565" textAnchor="end">{int(round(gv)):,}</text>'
        )
    grid_svg = "\n              ".join(grid_lines)

    # X軸ラベル（最初・中間・最後）
    label_idx = sorted({0, (nx - 1) // 2, nx - 1})
    x_labels = "\n              ".join(
        f'<text x="{x_at(i):.1f}" y="{H - 12}" fontSize="10" fill="#807565" textAnchor="middle">{_fmt_date_md(hist[i]["date"])}</text>'
        for i in label_idx
    )

    # 各点（ネイティブtooltipで日付・中央値・サンプル数を注記）
    dots = []
    for i, h in enumerate(hist):
        n_label = h.get("sample_n") if h.get("sample_n") is not None else "—"
        dots.append(
            f'<circle cx="{x_at(i):.1f}" cy="{y_at(float(h["median_jpy"])):.1f}" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5">'
            f'<title>{h["date"]}: {int(h["median_jpy"]):,}円（サンプル n={n_label}件）</title></circle>'
        )
    dots_svg = "\n              ".join(dots)

    # 最新値の注記
    last_x, last_y = x_at(nx - 1), y_at(vals[-1])
    anno_y = max(T + 10, last_y - 10)
    latest_anno = (
        f'<text x="{min(last_x, W - R - 4):.1f}" y="{anno_y:.1f}" fontSize="11" fontWeight="bold" fill="#8A5A18" textAnchor="end">{int(vals[-1]):,}円</text>'
    )

    n_vals = [int(h["sample_n"]) for h in hist if isinstance(h.get("sample_n"), (int, float))]
    n_note = f"各点のサンプル数 n={min(n_vals):,}〜{max(n_vals):,}件" if n_vals else "サンプル数は各点の注記参照"
    caption = (
        f"期間 {hist[0]['date']}〜{hist[-1]['date']}（週次{nx}点・{n_note}）。"
        f"出典: ヤフオク実落札データの週次中央値（過去180日・IQR外れ値除去）・毎週月曜自動更新。買取額を保証するものではありません。"
    )

    return f'''
          <div className="bg-white border border-warm-border rounded-xl p-5 my-6 not-prose">
            <p className="text-sm font-bold text-ink mb-3">{name}の買取相場 直近12週の推移（ヤフオク落札中央値・毎週更新）</p>
            <svg viewBox="0 0 {W} {H}" role="img" aria-label="{name}のヤフオク落札中央値の週次推移グラフ" className="w-full h-auto">
              {grid_svg}
              <polyline points="{pts}" fill="none" stroke="#C9923D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {dots_svg}
              {latest_anno}
              {x_labels}
            </svg>
            <p className="text-[11px] text-warm-gray leading-relaxed mt-2">{caption}</p>
          </div>
'''
