"""買取店の掲示価格（店舗別比較・月次推移・定価・買取実績）ブロック。

data/store-prices.json（手動確認・出典URL付き）を読み、generate-brand-pages-v3.py の
「4. 現在の市場相場」節の末尾に JSX を差し込む。JSON に無い slug では全て空文字＝既存ページ無変更。
数値は各店の掲示値をそのまま表示し、こちらで計算するのは「ヤフオク中央値に対する比率」と
「定価(税込換算)に対する比率」だけ（いずれも出典の数値どうしの割り算）。
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data" / "store-prices.json"

try:
    _ALL = json.loads(DATA.read_text(encoding="utf-8"))
except FileNotFoundError:
    _ALL = {}


def get(slug):
    d = _ALL.get(slug)
    return d if isinstance(d, dict) else None


def _a(url, text):
    return f'<a href="{url}" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">{text}</a>'


def _ym(s):
    y, m = s.split("-")[:2]
    return f"{y}年{int(m)}月"


def _ymd(s):
    y, m, d = s.split("-")
    return f"{y}年{int(m)}月{int(d)}日"


def _trend_svg(t, name):
    months, prices = t["months"], t["prices"]
    n = len(prices)
    if n < 3 or n != len(months):
        return ""
    lo, hi = min(prices), max(prices)
    span = (hi - lo) or 1
    x0, x1, y0, y1 = 70, 622, 30, 160
    pts = []
    for i, p in enumerate(prices):
        x = x0 + (x1 - x0) * i / (n - 1)
        y = y1 - (y1 - y0) * (p - lo) / span
        pts.append((x, y, months[i], p))
    poly = " ".join(f"{x:.1f},{y:.1f}" for x, y, _, _ in pts)
    dots = "\n              ".join(
        f'<circle cx="{x:.1f}" cy="{y:.1f}" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>{_ym(m)}: {p:,}円</title></circle>'
        for x, y, m, p in pts
    )
    grid = ""
    for v in (hi, (hi + lo) // 2, lo):
        y = y1 - (y1 - y0) * (v - lo) / span
        grid += f'<line x1="{x0}" y1="{y:.1f}" x2="{x1}" y2="{y:.1f}" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="{x0 - 6}" y="{y + 3.5:.1f}" fontSize="10" fill="#807565" textAnchor="end">{v:,}</text>\n              '
    xl = ""
    for i in (0, n // 2, n - 1):
        x, _, m, _ = pts[i]
        xl += f'<text x="{x:.1f}" y="192" fontSize="10" fill="#807565" textAnchor="middle">{_ym(m)}</text>\n              '
    rows = "".join(
        f"<tr><td className=\"py-1 pr-4\">{_ym(m)}</td><td className=\"py-1 text-right\">{p:,}円</td></tr>"
        for m, p in zip(months, prices)
    )
    first, last = prices[0], prices[-1]
    return f'''
          <div className="bg-white border border-warm-border rounded-xl p-5 my-6 not-prose">
            <p className="text-sm font-bold text-ink mb-3">{t["label"]}の月次推移（{t["store"]}掲示・{_ym(months[0])}〜{_ym(months[-1])}）</p>
            <svg viewBox="0 0 640 205" role="img" aria-label="{name}の買取店掲示価格の月次推移グラフ" className="w-full h-auto">
              {grid}<polyline points="{poly}" fill="none" stroke="#C9923D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {dots}
              {xl}
            </svg>
            <p className="text-[12px] text-ink leading-relaxed mt-2">{_ym(months[0])} {first:,}円 → {_ym(months[-1])} {last:,}円（期間中の最高 {hi:,}円・最低 {lo:,}円）。</p>
            <details className="mt-2 text-[12px] text-warm-gray">
              <summary className="cursor-pointer">月別の数値を表で見る（{n}か月）</summary>
              <table className="mt-2"><tbody>{rows}</tbody></table>
            </details>
            <p className="text-[11px] text-warm-gray leading-relaxed mt-2">出典: {_a(t["url"], t["store"] + "「" + t["label"] + "」の価格推移グラフ")}（同ページ掲載のグラフの値を転記）。店舗の参考価格であり、実際の買取額を保証するものではありません。</p>
          </div>
'''


def block(slug, name, yahoo_median, fetched_at):
    """「4. 現在の市場相場」節の末尾に入れる JSX。データが無ければ空文字。"""
    d = get(slug)
    if not d:
        return ""
    checked = d["checked_at"]
    rows = ""
    for s in d["stores"]:
        rows += (
            f'<tr className="border-b border-warm-border/60">'
            f'<td className="py-2 pr-3">{s["store"]}</td>'
            f'<td className="py-2 pr-3">{s["item"]}<br /><span className="text-warm-gray text-xs">{s["cond"]}</span></td>'
            f'<td className="py-2 pr-3 text-right font-bold whitespace-nowrap">{s["price"]}</td>'
            f'<td className="py-2 pr-3 whitespace-nowrap">{s["updated"]}</td>'
            f'<td className="py-2">{_a(s["url"], "掲載ページ")}</td></tr>'
        )

    # ヤフオク中央値との比較（主要700ml・同条件の行だけ＝low/high を持つ行）
    cmp_p = ""
    main = [s for s in d["stores"] if s.get("low")]
    if yahoo_median and main:
        lo = min(s["low"] for s in main)
        hi = max(s["high"] for s in main)
        cmp_p = (
            f'<p>標準的な700mlボトルの掲示価格は <strong>{lo:,}〜{hi:,}円</strong> で、'
            f'PeatBid が集計しているヤフオク落札中央値 <strong>{yahoo_median:,}円</strong>（取得日 {fetched_at}）の '
            f'<strong>{lo / yahoo_median * 100:.0f}〜{hi / yahoo_median * 100:.0f}%</strong> にあたります。'
            f'中央値は個人間の落札額、掲示価格は店がその場で買い取る額なので、両方を並べると「店に売るといくらになりそうか」の見当がつきます。</p>'
        )
    note = f'<p>{d["store_note"]}</p>' if d.get("store_note") else ""

    out = f'''
          <h3 id="store-prices">{name}の買取店の掲示価格（店舗別比較・{_ymd(checked)}確認）</h3>

          <p>各店が自社サイトに公開している{name}の参考買取価格を、PeatBid編集部が {checked} に各ページで確認した値です。「店舗側の更新日」は各ページに書かれている価格の更新日です。</p>

          <div className="overflow-x-auto my-5 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">店舗</th><th className="py-2 pr-3">ボトル・条件</th><th className="py-2 pr-3 text-right">掲示価格</th><th className="py-2 pr-3">店舗側の更新日</th><th className="py-2">出典</th></tr></thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
          {cmp_p}
          {note}
'''

    if d.get("trend"):
        out += f'''
          <h3 id="store-trend">{name}の買取価格の推移（店舗の掲示価格・約2年分）</h3>
{_trend_svg(d["trend"], name)}'''

    t2 = d.get("trend2")
    if t2:
        rows2 = "".join(
            f"<tr><td className=\"py-1 pr-4\">{_ym(m)}</td><td className=\"py-1 text-right\">{p}</td></tr>" for m, p in t2["items"]
        )
        out += f'''
          <details className="my-4 text-sm">
            <summary className="cursor-pointer text-amber-dark">もう1店の推移: {t2["store"]}の{t2["label"]}（{len(t2["items"])}か月分）</summary>
            <table className="mt-2 text-[13px]"><tbody>{rows2}</tbody></table>
            <p className="text-[11px] text-warm-gray mt-2">出典: {_a(t2["url"], t2["store"] + "の掲載ページ")}</p>
          </details>
'''

    r = d.get("records")
    if r:
        li = "".join(f"<li>{_ymd(dt)}　{item}　<strong>{price}</strong></li>" for dt, item, price in r["items"])
        out += f'''
          <p className="text-sm font-bold mt-6">{r["store"]}が公開している買取実績（抜粋）</p>
          <ul className="text-sm">{li}</ul>
          <p className="text-[11px] text-warm-gray">出典: {_a(r["url"], r["store"] + "の掲載ページ")}（掲載されている実績のうち日付の新しいもの・価格差が分かるものを抜粋）</p>
'''

    lp = d.get("list_price")
    if lp:
        lrows = "".join(
            f'<tr className="border-b border-warm-border/60"><td className="py-2 pr-3 whitespace-nowrap">{per}</td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">{price}</td><td className="py-2 pr-3">{memo}</td><td className="py-2">{_a(url, "サントリー発表")}</td></tr>'
            for per, price, memo, url in lp["rows"]
        )
        ratio = ""
        if yahoo_median and lp.get("current_ex_tax"):
            inc = round(lp["current_ex_tax"] * 1.1)
            ratio = (
                f'<p>現在の希望小売価格 {lp["current_ex_tax"]:,}円（税別）は税込 {inc:,}円です。'
                f'ヤフオク落札中央値 {yahoo_median:,}円 はその <strong>{yahoo_median / inc:.2f}倍</strong>。'
                f'定価で手に入れたボトルでも、売れば定価を上回る水準で取引されているということです。</p>'
            )
        out += f'''
          <h3 id="teika">{name}の定価（メーカー希望小売価格）の推移</h3>
          <div className="overflow-x-auto my-5 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">期間</th><th className="py-2 pr-3 text-right">希望小売価格（税別）</th><th className="py-2 pr-3">内容</th><th className="py-2">出典</th></tr></thead>
              <tbody>{lrows}</tbody>
            </table>
          </div>
          {ratio}
'''
    return out


def faq(slug, name):
    """店舗別の掲示価格についての FAQ（Q, A）を1つ返す。データが無ければ None。"""
    d = get(slug)
    if not d:
        return None
    main = [s for s in d["stores"] if s.get("low")]
    if not main:
        return None
    parts = "、".join(f'{s["store"]} {s["price"]}（{s["item"]}・{s["updated"]}更新）' for s in main)
    return (
        f"{name}の買取価格はお店によって違いますか？",
        f"違います。{d['checked_at']} に各店の公開ページで確認した掲示価格は、{parts}でした。"
        f"ボトルの仕様や付属品、店の在庫状況でも変わるため、売る前に複数の店で査定を取って比べてください。",
    )


def title_tail(slug):
    d = get(slug)
    return d.get("title_tail") if d else None


def desc_tail(slug):
    d = get(slug)
    return d.get("desc_tail", "") if d else ""


def toc_item(slug):
    return '\n  { id: "store-prices", label: "4-2. 買取店の掲示価格・推移・定価" },' if get(slug) else ""
