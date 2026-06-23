#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""tier2エリア親ページ生成（勝てる設計・実データ駆動）。
使い方: python3 scripts/gen-tier2-area.py oita
- 相場=brands.json の Yahoo180日実落札中央値（実データ）。買取目安=中央値×60〜80%（業界一般目安・断定しない）。
- 業者=全国対応の実在4社（既存送客先・実URL）。地元店の創作はしない。
- 県の事実=prefectures.py（人口・主要都市等の公開事実のみ）。気候等の冗長テンプレ文は使わない。"""
import json, importlib.util, sys, os, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UPDATED = "2026-06-23"

def load_pref():
    spec = importlib.util.spec_from_file_location("p", os.path.join(ROOT, "data/prefectures.py"))
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    return m.PREFECTURES

BUYERS = [
    ("バイセル", "https://buysell-kaitori.com/liquor/japanese-whisky/", "東証グロース上場の大手。出張・店頭・宅配の3チャネルに対応し、全国どこからでも依頼可能。", "宅配・出張・店頭"),
    ("福ちゃん", "https://fuku-chan.jp/", "総合買取の大手で、お酒・ウイスキーの査定にも対応。宅配・出張で全国をカバー。", "宅配・出張"),
    ("JOYLAB", "https://joylab.jp/", "お酒買取の専門店。希少銘柄やヴィンテージの鑑定査定に強み。宅配で全国対応。", "宅配"),
    ("LINXAS", "https://linxas.shop/whiskey/", "ウイスキー買取の専門店。銘柄別の買取参考価格を公開しており、相場の目安を掴みやすい。", "宅配"),
]

def yen(n): return f"¥{int(round(n)):,}"
def r100(n): return int(round(n / 100.0)) * 100

def esc(s): return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

def gen(pref_key):
    pref = load_pref()[pref_key]
    name = pref["name_ja"]; region = pref["region"]; pop = pref["population"]; cities = pref["cities"]
    city_list = cities.split("・")
    brands = json.load(open(os.path.join(ROOT, "data/brands.json"), encoding="utf-8"))
    brands = [b for b in brands if b.get("yahoo_median_jpy_180d")]
    brands.sort(key=lambda b: -b["yahoo_median_jpy_180d"])
    fetched = brands[0].get("yahoo_fetched_at", UPDATED)

    # 銘柄別相場テーブル行
    rows = []
    for b in brands:
        m = b["yahoo_median_jpy_180d"]; lo = r100(m*0.6); hi = r100(m*0.8); n = b.get("yahoo_sample_n", "—")
        rows.append(
            f'<tr><td className="px-3 py-2 font-medium"><Link href="/tier2/{pref_key}/{b["slug"]}-kaitori/" className="text-amber-dark underline hover:text-burgundy">{esc(b["name_ja"])}</Link></td>'
            f'<td className="px-3 py-2 text-right tabular-nums">{yen(m)}</td>'
            f'<td className="px-3 py-2 text-right tabular-nums text-amber-dark">{yen(lo)}〜{yen(hi)}</td>'
            f'<td className="px-3 py-2 text-right tabular-nums text-warm-gray">{n}</td></tr>'
        )
    rows_html = "\n              ".join(rows)

    buyer_rows = []
    for nm, url, desc, ch in BUYERS:
        buyer_rows.append(
            f'<div className="border border-warm-border rounded-xl p-4 bg-white">'
            f'<div className="flex items-center justify-between gap-3 mb-2"><p className="font-bold text-foreground">{nm}</p>'
            f'<span className="text-[11px] text-warm-gray whitespace-nowrap">{ch}</span></div>'
            f'<p className="text-sm text-warm-gray mb-3">{esc(desc)}</p>'
            f'<a href="{url}" target="_blank" rel="noopener noreferrer sponsored" className="block text-center bg-amber-dark text-white text-sm font-bold py-2.5 rounded-lg hover:opacity-90 transition">{nm}の公式サイトで査定する →</a>'
            f'</div>'
        )
    buyers_html = "\n            ".join(buyer_rows)

    # ItemList schema（銘柄ページ・実値の中央値のみ）
    items = [{"@type": "ListItem", "position": i+1, "name": f'{name}の{b["name_ja"]}買取',
              "url": f'https://peatbid.com/tier2/{pref_key}/{b["slug"]}-kaitori/'} for i, b in enumerate(brands)]
    faqs = [
        (f"{name}から宅配買取の集荷に来てもらえますか？",
         f"はい。本記事で紹介している業者はいずれも全国対応の宅配買取に対応しており、{name}（{cities}など県内全域）から集荷を依頼できます。多くは送料・査定料が無料です（最新の条件は各公式サイトでご確認ください）。"),
        ("外箱やギャランティカードが無くても売れますか？",
         "多くの場合、箱や付属品が無くても買取自体は可能です。ただし外箱・冊子・ギャランティカードが揃っていると、業界一般の目安として査定額が10〜20%程度上がる傾向があります。付属品はできるだけ揃えて査定に出すのがおすすめです。"),
        (f"{name}でウイスキーを高く売るコツは？",
         "最低でも3社、できれば複数社へ同時に査定を依頼し、相見積もりで最高額を選ぶのが基本です。付属品を揃える・状態を保つ・終売や限定銘柄は需要が高いタイミングを狙う、といった点も査定額に影響します。"),
        ("査定料・送料・キャンセル料はかかりますか？",
         "全国対応の宅配買取では査定料・送料・キャンセル料が無料の業者が一般的です。ただし条件は業者・時期により異なり変動するため、申し込み前に各公式サイトで最新の条件を必ずご確認ください。"),
        ("提示された買取額が相場より安い気がします。",
         f"買取額は市場相場（本記事のYahoo中央値）をベースに、各社が在庫・キャンペーン・状態評価・利益率を加味して決めます。業界一般の目安として市場相場の60〜80%程度に収まることが多いため、複数社の見積もりを比較し、根拠を確認したうえで判断するのが安全です。"),
    ]
    faq_html = "\n          ".join(
        f'<details className="border border-warm-border rounded-lg p-4 bg-white"><summary className="font-medium cursor-pointer">{esc(q)}</summary><p className="text-sm text-warm-gray mt-2 leading-relaxed">{esc(a)}</p></details>'
        for q, a in faqs)
    faq_ld = {"@context": "https://schema.org", "@type": "FAQPage",
              "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faqs]}
    breadcrumb_ld = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://peatbid.com/"},
        {"@type": "ListItem", "position": 2, "name": "地域別買取", "item": "https://peatbid.com/tier2/"},
        {"@type": "ListItem", "position": 3, "name": f"{name}のウイスキー買取", "item": f"https://peatbid.com/tier2/{pref_key}/"}]}
    article_ld = {"@context": "https://schema.org", "@type": "Article",
                  "headline": f"{name}のウイスキー買取｜実売相場とおすすめ業者【2026年最新】",
                  "datePublished": "2026-05-22", "dateModified": UPDATED,
                  "author": {"@type": "Organization", "name": "PeatBid編集部"},
                  "publisher": {"@type": "Organization", "name": "PeatBid"}}
    itemlist_ld = {"@context": "https://schema.org", "@type": "ItemList", "name": f"{name}のウイスキー銘柄別 実売相場", "itemListElement": items}

    title = f"ウイスキー買取 {name}｜Yahoo実売中央値で見る相場とおすすめ業者【2026年最新】"
    desc = f"{name}でウイスキーを売るなら。Yahoo!オークション過去180日の実落札中央値による銘柄別相場、買取目安、宅配買取のおすすめ業者比較、高く売るコツを掲載。{name}全域から送料無料で売却できます。"

    top_brands = "・".join(b["name_ja"] for b in brands[:4])
    page = f'''import type {{ Metadata }} from "next";
import Link from "next/link";

const TITLE = {json.dumps(title, ensure_ascii=False)};
const DESC = {json.dumps(desc, ensure_ascii=False)};
const URL = "https://peatbid.com/tier2/{pref_key}/";

export const metadata: Metadata = {{
  title: TITLE,
  description: DESC,
  alternates: {{ canonical: URL }},
  robots: {{ index: true, follow: true }},
  openGraph: {{ title: TITLE, description: DESC, url: URL }},
}};

const LD = {json.dumps([breadcrumb_ld, article_ld, faq_ld, itemlist_ld], ensure_ascii=False)};

export default function Page() {{
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: JSON.stringify(LD) }}}} />
      <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
        <ol className="flex items-center gap-1 flex-wrap">
          <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
          <li className="breadcrumb-sep" />
          <li><Link href="/tier2/" className="hover:text-amber-dark transition-colors">地域別買取</Link></li>
          <li className="breadcrumb-sep" />
          <li><span className="text-foreground">{name}</span></li>
        </ol>
      </nav>

      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-3">{name}のウイスキー買取｜実売相場とおすすめ業者</h1>
      <p className="text-warm-gray text-sm mb-2">最終更新: {UPDATED} / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link></p>
      <p className="text-sm text-warm-gray mb-8 leading-relaxed">
        本ページの相場は<strong>Yahoo!オークション過去180日の実落札中央値</strong>（{fetched}時点）に基づく一次データです。{name}でウイスキーを売却する際の、銘柄別の相場・買取目安、宅配買取のおすすめ業者、高く売るコツをまとめています。
      </p>

      {{/* 1. 結論ボックス */}}
      <div className="border-2 border-amber/40 rounded-xl p-5 mb-10 bg-cream/40">
        <p className="font-bold text-base mb-2">結論：{name}は「全国対応の宅配買取で相見積もり」が最短・確実</p>
        <p className="text-sm leading-relaxed mb-4">
          {name}（{region}地方・人口{pop}）は{cities}を中心に二次流通の需要があります。店舗へ持ち込む方法もありますが、<strong>全国対応の宅配買取なら{name}全域から送料無料で売却でき、複数社へ同時に査定を依頼して最高額を選べます</strong>。買取額は市場相場（下記Yahoo中央値）の60〜80%程度が業界一般の目安です。
        </p>
        <a href="#osusume" className="inline-block bg-amber-dark text-white text-sm font-bold py-2.5 px-5 rounded-lg hover:opacity-90 transition">おすすめの宅配買取業者を見る →</a>
        <p className="text-[10px] text-warm-gray mt-2">本ページは広告（アフィリエイト）を含みます。</p>
      </div>

      {{/* 2. 銘柄別 実売相場テーブル */}}
      <h2 id="souba" className="font-display text-xl md:text-2xl font-semibold mt-10 mb-3">{name}のウイスキー銘柄別 実売相場（Yahoo中央値）</h2>
      <p className="text-sm text-warm-gray mb-4 leading-relaxed">
        過去180日のYahoo!オークション実落札データの中央値です（{fetched}時点）。<strong>買取目安</strong>は中央値の60〜80%で算出した業界一般の参考値で、実際の買取額は業者・状態・時期により変動します。銘柄名をタップすると{name}向けの詳細ページへ移動します。
      </p>
      <div className="overflow-x-auto mb-3">
        <table className="w-full text-sm border-collapse">
          <thead><tr className="bg-cream/60 text-left">
            <th className="px-3 py-2">銘柄</th><th className="px-3 py-2 text-right">実売中央値</th>
            <th className="px-3 py-2 text-right">買取目安</th><th className="px-3 py-2 text-right">サンプル数</th>
          </tr></thead>
          <tbody className="divide-y divide-warm-border">
              {rows_html}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-warm-gray mb-12">※中央値＝過去180日のYahoo!オークション落札価格の中央値（外れ値除外後）。買取目安は中央値×60〜80%の参考レンジで、買取額を保証するものではありません。</p>

      {{/* 3. 高価買取のコツ */}}
      <h2 className="font-display text-xl md:text-2xl font-semibold mt-10 mb-3">{name}でウイスキーを高く売る4つのコツ</h2>
      <ul className="space-y-3 text-sm leading-relaxed mb-12">
        <li><strong>① 複数社で相見積もり</strong>：最低3社、できれば4〜5社へ同時に査定を依頼。同じ銘柄でも在庫・キャンペーン・査定基準の違いで、業界目安として10〜20%の差が出ることがあります。</li>
        <li><strong>② 付属品を揃える</strong>：外箱・冊子・カートン・ギャランティカードが揃うと、業界一般の目安として査定額が10〜20%上がる傾向。購入時の状態を保ちましょう。</li>
        <li><strong>③ 状態を保つ</strong>：ラベルの傷み・液面低下・キャップの状態は評価対象。直射日光・高温多湿を避けて保管します。</li>
        <li><strong>④ 需要の高い銘柄・時期を狙う</strong>：終売・限定・ヴィンテージは需要が高く、海外オークションの上昇局面では国内査定も上がりやすい傾向があります。</li>
      </ul>

      {{/* 4. 売却方法の比較 */}}
      <h2 className="font-display text-xl md:text-2xl font-semibold mt-10 mb-3">売却方法の比較（宅配・出張・店頭）</h2>
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm border-collapse">
          <thead><tr className="bg-cream/60 text-left"><th className="px-3 py-2">方式</th><th className="px-3 py-2">手間</th><th className="px-3 py-2">スピード</th><th className="px-3 py-2">向く人</th></tr></thead>
          <tbody className="divide-y divide-warm-border">
            <tr><td className="px-3 py-2 font-medium">宅配買取</td><td className="px-3 py-2">小（自宅で完結）</td><td className="px-3 py-2">数日</td><td className="px-3 py-2">{name}全域・本数が多い人・相見積もり重視</td></tr>
            <tr><td className="px-3 py-2 font-medium">出張買取</td><td className="px-3 py-2">小（自宅査定）</td><td className="px-3 py-2">最短即日</td><td className="px-3 py-2">大量・運べない・対面で売りたい人</td></tr>
            <tr><td className="px-3 py-2 font-medium">店頭買取</td><td className="px-3 py-2">中（持込）</td><td className="px-3 py-2">即日</td><td className="px-3 py-2">近隣に店舗があり少量を売りたい人</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-warm-gray mb-12 leading-relaxed">{name}は全域をカバーする宅配買取が最も確実です。<strong>宅配の流れ＝①申し込み → ②梱包キット等で梱包 → ③集荷（送料無料が一般的）→ ④査定 → ⑤入金</strong>。査定額に納得できなければキャンセルも可能です（条件は各社で確認）。</p>

      {{/* 5. 県の売却事情 */}}
      <h2 className="font-display text-xl md:text-2xl font-semibold mt-10 mb-3">{name}でウイスキーを売るときのポイント</h2>
      <p className="text-sm text-warm-gray mb-12 leading-relaxed">
        {name}は{region}地方の{pop}規模の県で、{cities}などに人口が集まります。{pref["demand"]}。大型のウイスキー専門買取店は都市部に集中しがちなため、{name}では<strong>全国対応の宅配・出張買取を活用すると、エリアを問わず複数社の査定を比較できます</strong>。古物営業法により売却時は本人確認書類（運転免許証・マイナンバーカード等）が必要です。
      </p>

      {{/* 6. おすすめ業者比較 */}}
      <h2 id="osusume" className="font-display text-xl md:text-2xl font-semibold mt-10 mb-3">{name}対応：おすすめの宅配買取業者</h2>
      <p className="text-sm text-warm-gray mb-4 leading-relaxed">いずれも全国対応で{name}から依頼できます。買取額は変動するため固定の金額は掲載せず、最新の査定額・キャンペーンは各公式サイトでご確認ください。<strong>迷ったら複数社へ同時査定</strong>がおすすめです。</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {buyers_html}
      </div>

      {{/* 7. FAQ */}}
      <h2 className="font-display text-xl md:text-2xl font-semibold mt-10 mb-3">{name}のウイスキー買取 よくある質問</h2>
      <div className="space-y-3 mb-12">
          {faq_html}
      </div>

      {{/* 8. 方法論・運営 */}}
      <div className="border-t border-warm-border pt-6 text-xs text-warm-gray leading-relaxed">
        <p className="mb-2"><strong>相場データについて</strong>：本ページの「実売中央値」は、Yahoo!オークションの過去180日の落札価格を収集し、外れ値を除外した中央値です（{fetched}時点・銘柄ごとにサンプル数を表示）。買取目安は中央値×60〜80%で算出した業界一般の参考値で、実際の買取額・査定額を保証するものではありません。最新の正確な金額は各買取業者の公式サイトでご確認ください。</p>
        <p>運営：PeatBid編集部 ／ 本ページは広告（アフィリエイト）を含みます。掲載業者・条件は変動する場合があります。</p>
      </div>
    </div>
  );
}}
'''
    out = os.path.join(ROOT, f"app/tier2/{pref_key}/page.tsx")
    open(out, "w", encoding="utf-8").write(page)
    print(f"generated {out} ({len(brands)} brands, {len(BUYERS)} buyers)")

if __name__ == "__main__":
    for k in sys.argv[1:]:
        gen(k)
