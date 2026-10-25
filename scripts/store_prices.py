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
    if s.count("-") == 1:  # 月単位の実績（例: LINXAS の月間ランキング）
        return _ym(s)
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
    # 横軸は月の通し番号で配置（実績の無い月を飛ばした系列でも時間の間隔が正しく出る。連続した系列では従来と同じ位置）
    _ord = [int(m[:4]) * 12 + int(m[5:7]) for m in months]
    _os = (_ord[-1] - _ord[0]) or 1
    pts = []
    for i, p in enumerate(prices):
        x = x0 + (x1 - x0) * (_ord[i] - _ord[0]) / _os
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
            <p className="text-sm font-bold text-ink mb-3">{t["label"]}の月次推移（{t["store"]}掲示・{_ym(months[0])}〜{_ym(months[-1])}）</p>{(chr(10) + "            " + '<p className="text-[12px] text-warm-gray mb-2">' + t["lead"] + '</p>') if t.get("lead") else ""}
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
            <p className="text-[11px] text-warm-gray leading-relaxed mt-2">出典: {_a(t["url"], t["store"] + "「" + t["label"] + "」の価格推移グラフ")}（同ページ掲載のグラフの値を転記）。{t.get("source_note") or "店舗の参考価格であり、実際の買取額を保証するものではありません。"}</p>
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
            f'中央値は個人間の落札額、掲示価格は店舗が買い取る際の参考額であり、両者を比較することで店舗に売却した場合のおおよその金額を把握できます。</p>'
        )
    note = f'<p>{d["store_note"]}</p>' if d.get("store_note") else ""
    if d.get("kyugata_note"):
        note += f'\n          <p className="text-sm bg-cream/40 border border-amber/30 rounded-lg p-4 not-prose">{d["kyugata_note"]}</p>'

    intro = d.get("store_intro") or f'各店が自社サイトに公開している{name}の参考買取価格を、PeatBid編集部が {checked} に各ページで確認した値です。「店舗側の更新日」は、各ページに記載されている価格の更新日です。'
    out = f'''
          <h3 id="store-prices">{name}の買取店の掲示価格（店舗別比較・{_ymd(checked)}確認）</h3>

          <p>{intro}</p>

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
          <h3 id="store-trend">{d["trend"].get("heading") or f"{name}の買取価格の推移（店舗の掲示価格・約2年分）"}</h3>
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

    out += _longterm(slug, d)

    groups = d.get("record_groups")
    r = d.get("records")
    if r and not groups:
        li = "".join(f"<li>{_ymd(dt)}　{item}　<strong>{price}</strong></li>" for dt, item, price in r["items"])
        out += f'''
          <p className="text-sm font-bold mt-6">{r["store"]}が公開している買取実績（抜粋）</p>
          <ul className="text-sm">{li}</ul>
          <p className="text-[11px] text-warm-gray">出典: {_a(r["url"], r["store"] + "の掲載ページ")}（掲載されている実績のうち日付の新しいもの・価格差が分かるものを抜粋）</p>
'''
    if groups:
        out += f'''
          <h3 id="store-records">{name}の買取実績（各店の公開分・日付付き）</h3>
          <p>各店が自社サイトに掲載している{name}の買取実績です。実績は、その日にその店舗で買い取った金額であり、ボトルの状態や付属品の有無の記載方法は店舗により異なります（{_ymd(d["checked_at"])}確認）。</p>
'''
        for r in groups:
            li = "".join(f"<li>{_ymd(dt)}　{item}　<strong>{price}</strong></li>" for dt, item, price in r["items"])
            memo = r["note"]
            out += f'''
          <p className="text-sm font-bold mt-6">{r["store"]}</p>
          <ul className="text-sm">{li}</ul>
          <p className="text-[11px] text-warm-gray">出典: {_a(r["url"], r["store"] + "の掲載ページ")}（{memo}）</p>
'''

    out += _ceramic(name, d)

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
                f'二次流通では、定価を上回る水準で取引されています。</p>'
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


def _hist_range(slug):
    try:
        h = json.loads((ROOT / "data" / "price-history" / f"{slug}.json").read_text(encoding="utf-8")).get("history") or []
    except (FileNotFoundError, ValueError):
        return None
    h = [x for x in h if x.get("median_jpy")]
    if not h:
        return None
    return h[0]["date"], h[-1]["date"], len(h)


def _longterm(slug, d):
    lt = d.get("longterm")
    if not lt:
        return ""
    rows = "".join(
        f'<tr className="border-b border-warm-border/60"><td className="py-1 pr-4">{m}</td><td className="py-1 text-right">{p}</td></tr>'
        for m, p in lt["points"]
    )
    own = ""
    hr = _hist_range(slug)
    if hr and lt.get("own"):
        own = "<p>" + lt["own"].format(hist_from=hr[0], hist_to=hr[1], hist_n=hr[2]) + "</p>"
    ctx = f'<p>{lt["context"]}</p>' if lt.get("context") else ""
    return f'''
          <h3 id="longterm">{lt.get("heading") or "長期の価格推移（2016〜2026年・店舗の買取価格表から）"}</h3>
          <p>{lt["summary"]}</p>
          <div className="overflow-x-auto my-4 not-prose">
            <table className="text-sm"><thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-1 pr-4">時期</th><th className="py-1 text-right">買取価格（{lt["store"]}掲載）</th></tr></thead><tbody>{rows}</tbody></table>
          </div>
          <p className="text-[11px] text-warm-gray">出典: {_a(lt["url"], lt["store"] + (lt.get("label") or "「響30年の買取」の価格推移表"))}（{lt.get("source_note") or "全" + str(lt["n_points"]) + "点から要点を抜粋。同店は参考価格で、金額を保証するものではないとしています"}）</p>
          {own}
          {ctx}
'''


def _ceramic(name, d):
    c = d.get("ceramic")
    if not c:
        return ""
    rows = "".join(
        f'<tr className="border-b border-warm-border/60"><td className="py-2 pr-3">{st}</td><td className="py-2 pr-3">{it}</td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">{pr}</td><td className="py-2 pr-3 text-xs">{when}</td><td className="py-2">{_a(u, "掲載ページ")}</td></tr>'
        for st, it, pr, when, u in c["rows"]
    )
    return f'''
          <h3 id="toki-bottle">有田焼・九谷焼ボトルの{name}の買取価格</h3>
          <p>{c["intro"]}</p>
          <div className="overflow-x-auto my-5 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">店舗</th><th className="py-2 pr-3">ボトル</th><th className="py-2 pr-3 text-right">掲載の価格</th><th className="py-2 pr-3">時点・注記</th><th className="py-2">出典</th></tr></thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
          <p>{c["note"]}</p>
'''


def fake_extra(slug, name):
    """「9. 偽物・贋作の見分け方」の末尾に入れる新旧の見分け方（文章と表のみ・画像なし）。"""
    d = get(slug)
    if d and d.get("identify"):
        return _identify(name, d["identify"])
    sk = d.get("shinkyu") if d else None
    if not sk:
        return ""
    rows = "".join(
        f'<tr className="border-b border-warm-border/60"><th className="py-2 pr-3 text-left align-top whitespace-nowrap">{part}</th><td className="py-2 pr-3 align-top">{new}</td><td className="py-2 align-top">{old}</td></tr>'
        for part, new, old in sk["rows"]
    )
    holo = "".join(f"<p>{x}</p>" for x in sk["holo"])
    src = "・".join(_a(u, t) for t, u in sk["holo_src"])
    return f'''
          <h3 id="shinkyu">{name}の新型（現行）と旧型（金色の観音開き箱）の見分け方</h3>
          <div className="overflow-x-auto my-5 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">見る場所</th><th className="py-2 pr-3">現行ボトル（新型）</th><th className="py-2">旧ボトル（〜2007年頃・金色の観音開き箱）</th></tr></thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
          <p className="text-sm font-bold">ホログラムシールの有無について</p>
          {holo}
          <p className="text-[11px] text-warm-gray">出典: {_a("https://linxas.shop/whiskey/hibiki/hibiki30years/", "LINXAS")}・{_a("https://www.sakekaitori.com/whisky/japanese_whiskey/hibiki_brand/hibiki30/", "ファイブニーズ")}・{_a("https://buysell-kaitori.com/column/liquor-hibiki/", "バイセル")}・{_a("https://daikichi-kaitori.jp/column/hibiki30nenkaitori/", "買取大吉")}の各ページ（2026-10-15確認）、{src}</p>
          <p>{sk["note"]}</p>
'''


NTA_3105 = "https://www.nta.go.jp/taxes/shiraberu/taxanswer/joto/3105.htm"
NTA_3152 = "https://www.nta.go.jp/taxes/shiraberu/taxanswer/joto/3152.htm"
NTA_1900 = "https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1900.htm"


def sell_extra(slug, name):
    """「11. 売却プロセス」の末尾に入れる空き瓶・空箱と税金の節。"""
    d = get(slug)
    if not d:
        return ""
    out = ""
    e = d.get("empty")
    if e:
        li = "".join(f"<li>{_ymd(dt)}　{item}　<strong>{price}</strong></li>" for dt, item, price in e["items"])
        out += f'''
          <h3 id="akibin">{name}の空き瓶・空箱の買取</h3>
          <p>空き瓶の買取に対応している店舗があります。{e["store"]}は{name}の空き瓶の買取実績を公開しており、次の{len(e["items"])}件が掲載されています。</p>
          <ul className="text-sm">{li}</ul>
          <p className="text-[11px] text-warm-gray">出典: {_a(e["url"], e["store"] + "の掲載ページ")}（空き瓶の実績をすべて転記・{_ymd(d["checked_at"])}確認）</p>
          <p>{e["daikichi"]}（出典: {_a("https://daikichi-kaitori.jp/column/hibiki30nenkaitori/", "買取大吉")}）</p>
          <p>{e["caution"]}</p>
'''
    if d.get("tax"):
        out += f'''
          <h3 id="zeikin">{name}を売ったときの税金</h3>
          <p>国税庁のタックスアンサー {_a(NTA_3105, "No.3105 譲渡所得の対象となる資産と課税方法")} は、「家具、じゅう器、通勤用の自動車、衣服などの生活に通常必要な動産の譲渡による所得」を課税しない所得としたうえで、「ただし、貴金属や宝石、書画、骨とうなどで、1個または1組の価額が30万円を超えるものの譲渡による所得は除きます」としています（令和8年4月1日現在法令等）。</p>
          <p>ウイスキーがこの「書画、骨とうなど」に当たるかは、同ページには記載されていません。ただし、{name}は1本で30万円を超える価格で取引されている（本ページの店舗掲示価格・ヤフオク中央値）ため、生活用動産として非課税になると判断せず、課税される前提で計算しておくことをおすすめします。</p>
          <p>課税される場合は総合課税の譲渡所得で、計算は次のとおりです（{_a(NTA_3152, "No.3152 譲渡所得の計算のしかた（総合課税）")}）。</p>
          <ul>
            <li>譲渡所得の金額 ＝ 譲渡価額 −（取得費 ＋ 譲渡費用）− 50万円（特別控除。その年の譲渡益の合計から差し引く）</li>
            <li>保有期間が5年以内の場合は短期（全額が課税対象）、5年を超える場合は長期（2分の1が課税対象）</li>
          </ul>
          <p>給与を1か所から受けている会社員の方は、給与所得・退職所得以外の所得の合計が20万円を超えると確定申告が必要です（{_a(NTA_1900, "No.1900 給与所得者で確定申告が必要な人")}）。</p>
          <p>計算例（仮定の数字）: 定価125,000円（税別・2022年3月まで）の{name}を税込137,500円で買って5年を超えて持ち、530,000円で1本売った（譲渡費用0円）場合、譲渡益は392,500円で、特別控除50万円の範囲に収まるため譲渡所得は0円です。同じ年にほかの高額品も売却した場合は、合計で判定します。購入時のレシートなど、取得費が分かる資料は保管しておいてください。</p>
          <p>相続したボトルや、繰り返し売買している場合などは、扱いが異なることがあります。詳しくは <Link href="/articles/whisky-kaitori-zeikin/" className="text-amber-dark underline hover:text-burgundy">ウイスキー買取の税金</Link> の記事で解説しています。個別の判断については、税務署・税理士にご確認ください。</p>
'''
    return out


def apply_faqs(slug, faqs):
    """FAQ の置き換え（質問文の末尾一致）と追加。データが無ければ何もしない。"""
    d = get(slug)
    if not d:
        return faqs
    rep = d.get("faq_replace") or {}
    out = []
    for q, a in faqs:
        for tail, na in rep.items():
            if q.endswith(tail):
                a = na
        out.append((q, a))
        if q.endswith("税金がかかりますか？"):
            out.extend((eq, ea) for eq, ea in d.get("faq_extra") or [])
    return out


def page_updated(slug, fetched_at):
    d = get(slug)
    pu = d.get("page_updated") if d else None
    return max(pu, fetched_at) if pu and fetched_at and fetched_at[:1].isdigit() else fetched_at


def toc_fake(slug):
    d = get(slug)
    if d and d.get("identify"):
        return '\n  { id: "edition-check", label: "9-2. エディションの確認方法" },'
    return '\n  { id: "shinkyu", label: "9-2. 新型・旧型の見分け方" },' if d and d.get("shinkyu") else ""


# ---- 2026-10-16 追加: 銘柄の基本情報の上書き・エディション一覧・海外オークション・エディションの確かめ方 ----
# brands.csv の origin（産地＝「アイラ」等）・age_years（0＝NV）・abv は1本の定番ボトル前提の列で、
# ブラックボウモアのように複数エディションがある銘柄では誤記になる（「アイラが手がけるノンエイジ」「度数49%」）。
# JSON の profile がある slug だけ表示を差し替える（brands.csv は tier2・週次パッチも読むので触らない）。

def profile(slug):
    d = get(slug)
    p = d.get("profile") if d else None
    return p if isinstance(p, dict) else {}


def _month(s, month_tag):
    return s.replace("{MONTH}", month_tag).replace("{MONTH_H1}", month_tag.replace("最新】", "】"))


def title_full(slug, month_tag):
    d = get(slug)
    return _month(d["title_full"], month_tag) if d and d.get("title_full") else None


def h1_full(slug, month_tag):
    d = get(slug)
    return _month(d["h1_full"], month_tag) if d and d.get("h1_full") else None


def desc_full(slug):
    d = get(slug)
    return d.get("desc_full") if d else None


def editions_block(slug, name):
    """「1. 概要」の直後に入れる全エディション一覧（発売年・熟成・度数・本数・発売時価格・見分けるポイント）。"""
    d = get(slug)
    e = d.get("editions") if d else None
    if not e:
        return ""
    rows = "".join(
        '<tr className="border-b border-warm-border/60">'
        + "".join(f'<td className="py-2 pr-3 align-top{" whitespace-nowrap" if i in (1, 2, 3) else ""}">{c}</td>' for i, c in enumerate(r))
        + "</tr>"
        for r in e["rows"]
    )
    src = "・".join(_a(u, t) for t, u in e["sources"])
    return f'''
          <h3 id="editions">{e.get("heading") or f'{name}は全{len(e["rows"])}種｜エディション別の発売年・度数・本数'}</h3>
          <div className="overflow-x-auto my-5 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">エディション</th><th className="py-2 pr-3">発売</th><th className="py-2 pr-3">熟成</th><th className="py-2 pr-3">度数</th><th className="py-2 pr-3">本数</th><th className="py-2 pr-3">発売時の価格</th><th className="py-2">見分けるポイント</th></tr></thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
          <p className="text-sm">{e["note"]}</p>
          <p className="text-[11px] text-warm-gray">出典: {src}（{_ymd(d["checked_at"])}確認）</p>
'''


def toc_editions(slug):
    d = get(slug)
    if not (d and d.get("editions")):
        return ""
    return '\n  { id: "editions", label: "' + d["editions"].get("toc_label", "1-2. 全エディションの違い（発売年・度数・本数）") + '" },'


def auction_block(slug, name):
    """「7. オークション落札データ」の末尾に入れる海外オークションの結果（出典つき）。"""
    d = get(slug)
    a = d.get("auction") if d else None
    if not a:
        return ""
    rows = "".join(
        f'<tr className="border-b border-warm-border/60"><td className="py-2 pr-3 whitespace-nowrap align-top">{when}</td><td className="py-2 pr-3 align-top">{item}</td><td className="py-2 pr-3 align-top font-bold">{res}</td><td className="py-2 align-top">{_a(u, src)}</td></tr>'
        for when, item, res, src, u in a["items"]
    )
    return f'''
          <h3 id="auction-results">{name}の海外オークション結果（出典付き）</h3>
          <p>{a["intro"]}</p>
          <div className="overflow-x-auto my-5 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">時期</th><th className="py-2 pr-3">ボトル</th><th className="py-2 pr-3">結果</th><th className="py-2">出典</th></tr></thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
'''


def toc_auction(slug):
    d = get(slug)
    return '\n  { id: "auction-results", label: "7-2. 海外オークション結果" },' if d and d.get("auction") else ""


def _identify(name, idf):
    li = "".join(f"<li>{x}</li>" for x in idf["items"])
    return f'''
          <h3 id="edition-check">{name}のエディションの確認方法（ラベルと箱）</h3>
          <p>{idf["intro"]}</p>
          <ul>{li}</ul>
          <p>{idf["caution"]}</p>
'''


def toc_sell(slug):
    d = get(slug)
    if not d:
        return ""
    t = ""
    if d.get("empty"):
        t += '\n  { id: "akibin", label: "11-2. 空き瓶・空箱の買取" },'
    if d.get("tax"):
        t += '\n  { id: "zeikin", label: "11-3. 売ったときの税金" },'
    return t


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
        f"{name}の買取価格は店舗によって異なりますか？",
        f"異なります。{d['checked_at']} に各店の公開ページで確認した掲示価格は、{parts}でした。"
        f"ボトルの仕様や付属品、店舗の在庫状況によっても変わるため、売却前に複数の店舗で査定を受けて比較してください。",
    )


def title_tail(slug):
    d = get(slug)
    return d.get("title_tail") if d else None


def desc_tail(slug):
    d = get(slug)
    return d.get("desc_tail", "") if d else ""


def toc_item(slug):
    d = get(slug)
    if not d:
        return ""
    t = '\n  { id: "store-prices", label: "' + d.get("toc_label", "4-2. 買取店の掲示価格・推移・定価") + '" },'
    if d.get("ceramic"):
        t += '\n  { id: "toki-bottle", label: "4-3. 有田焼・九谷焼ボトル" },'
    return t


# ---- 2026-10-22 追加: ページ冒頭の要約表（「いくらで売れるか」を最初に示す） ----
# store-prices.json の quick がある slug だけ、h1・最終更新の直下（相場カードの前）に入れる。
# 値は JSON の手動確認値（各行に出典店と確認日）。ヤフオク中央値の行だけ生成時の brands.csv から自動。

def quick_block(slug, name, yahoo_median, fetched_at):
    d = get(slug)
    q = d.get("quick") if d else None
    if not q:
        return ""
    rows = "".join(
        f'<tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">{lab}</th>'
        f'<td className="py-2 pr-3 text-right font-bold whitespace-nowrap">{price}</td>'
        f'<td className="py-2 text-xs text-warm-gray">{src}</td></tr>'
        for lab, price, src in q["rows"]
    )
    if yahoo_median:
        rows += (
            f'<tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">参考: ヤフオク落札中央値（個人間の取引）</th>'
            f'<td className="py-2 pr-3 text-right font-bold whitespace-nowrap">{yahoo_median:,}円</td>'
            f'<td className="py-2 text-xs text-warm-gray">PeatBid 集計・取得日 {fetched_at}・毎週更新（店舗の買取額ではありません）</td></tr>'
        )
    lead = f'<p className="text-sm text-ink mb-3">{q["lead"]}</p>' if q.get("lead") else ""
    note = f'<p className="text-[12px] text-warm-gray leading-relaxed mt-3">{q["note"]}</p>' if q.get("note") else ""
    return f'''
          <section aria-labelledby="quick-price" className="bg-white border-2 border-amber/40 rounded-xl p-5 mb-8 not-prose">
            <h2 id="quick-price" className="text-lg font-bold text-ink mb-2">{q["heading"]}</h2>
            {lead}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">ボトル・状態</th><th className="py-2 pr-3 text-right">買取価格（店舗の掲示）</th><th className="py-2">店舗・確認日</th></tr></thead>
                <tbody>{rows}</tbody>
              </table>
            </div>
            {note}
          </section>
'''
