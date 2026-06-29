#!/usr/bin/env python3
"""基幹銘柄の総合・真贋ハブ（山崎/響/白州/マッカラン）。
汎用「○○ 偽物 見分け方」クエリ向けに、ブランド全体の真贋ガイド＋各ボトル別偽物/買取ページへのハブ＋換金導線。
事実ベース：断定鑑定はせず一般的な真贋チェック＋専門査定/メーカー確認へ誘導。"""
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ART = ROOT / "app" / "articles"
MONTH = "【2026年6月最新】"

# base, name_ja, hero(既存variant heroを流用), variants=[(slug, label)]
BRANDS = [
    ("yamazaki", "山崎", "yamazaki-12", [
        ("yamazaki-12", "山崎12年"), ("yamazaki-18", "山崎18年"),
        ("yamazaki-25", "山崎25年"), ("yamazaki-55", "山崎55年"), ("yamazaki-nv", "山崎NV（ノンエイジ）"),
    ]),
    ("hibiki", "響", "hibiki-21", [
        ("hibiki-17", "響17年"), ("hibiki-21", "響21年"),
        ("hibiki-30", "響30年"), ("hibiki-nv", "響NV（ジャパニーズハーモニー等）"),
    ]),
    ("hakushu", "白州", "hakushu-12", [
        ("hakushu-12", "白州12年"), ("hakushu-18", "白州18年"),
        ("hakushu-25", "白州25年"), ("hakushu-nv", "白州NV（ノンエイジ）"),
    ]),
    ("macallan", "マッカラン", "macallan-18", [
        ("macallan-12", "マッカラン12年"), ("macallan-18", "マッカラン18年"),
        ("macallan-25", "マッカラン25年"), ("macallan-30", "マッカラン30年"), ("macallan-fine-rare", "マッカラン Fine & Rare"),
    ]),
    ("ichirosu", "イチローズモルト", "ichirosu-double-distilleries", [
        ("ichirosu-card", "イチローズモルト カードシリーズ"), ("ichirosu-double-distilleries", "イチローズモルト ダブルディスティラリーズ"),
        ("ichirosu-mwr", "イチローズモルト MWR"),
    ]),
    ("bowmore", "ボウモア", "bowmore-18", [
        ("bowmore-18", "ボウモア18年"), ("bowmore-25", "ボウモア25年"), ("bowmore-blackbowmore", "ブラックボウモア"),
    ]),
    ("springbank", "スプリングバンク", "springbank-15", [
        ("springbank-15", "スプリングバンク15年"), ("springbank-21", "スプリングバンク21年"),
    ]),
    ("glenfarclas", "グレンファークラス", "glenfarclas-25", [
        ("glenfarclas-25", "グレンファークラス25年"), ("glenfarclas-105", "グレンファークラス105（年代指定なし）"),
    ]),
]

FAQS = lambda n: [
    (f"{n}の偽物はどのくらい出回っていますか？",
     f"ジャパニーズウイスキー・人気スコッチのブームで二次流通価格が高騰した銘柄では、海外を中心に贋作の流通が確認されています。{n}は人気・高額帯のため、特に個人間取引（フリマ・オークションの無名出品）では注意が必要です。正規流通・信頼できるオークション経由であればリスクは大きく下がります。"),
    (f"{n}が本物か確認する一番確実な方法は？",
     f"最終的には専門家の確認が確実です。(1)お酒買取専門店（JOYLAB等）での無料鑑定査定、(2)メーカー公式お客様窓口へロット番号を伝えての確認、の2つが有効です。自分でできる一次チェックは、ラベル印刷・キャップ／封緘・液色と液面・底面刻印・購入経路の5点です（本記事で解説）。"),
    (f"{n}を売る前に真贋の確認は必要ですか？",
     f"はい、推奨します。万一偽物だと買取は拒否され、偽物と知りながら売却すると詐欺に問われる可能性もあります。少しでも不審な点があれば、売却前に専門店の無料鑑定で確認してから査定に出すのが安全です。"),
    (f"{n}が偽物だった場合はどうすればいいですか？",
     "(1)ボトル全体・ラベル・キャップ・底面刻印を高解像度で撮影して記録、(2)購入元へ返品・返金を交渉、(3)詐欺の疑いがあれば最寄りの警察署に相談、の順で対処してください。贋作と判明したボトルは売却せず、誠実に対応することが重要です。"),
    (f"正規ルートで買えば{n}の偽物の心配はないですか？",
     f"正規流通店・百貨店・メーカー直販で購入したものは、贋作リスクは極めて低いと考えてよいです。リスクが高いのは、相場より極端に安い出品、無名の個人・海外通販、SNS/LINEでの直接取引などです。「他では手に入らない」と煽る相手も典型的な注意対象です。"),
]

# 一般的な真贋5チェック（事実ベース・ブランド一般。断定鑑定はしない）
def checks(n):
    return [
        ("贋作市場の実情と、なぜチェックが必要か",
         f"ジャパニーズウイスキーや人気スコッチのブーム以降、海外の二次流通市場では贋作ボトルの流通が確認されています。{n}のように未開封・箱付きで高い流通価格を持つ銘柄は、巧妙な贋作が個人間取引で出回ることがあります。本物の空き瓶に別の液体を詰める手口も報告されており、高額帯ほど下記5点の確認が重要です。なお本記事は一般的な確認の手引きであり、真贋の最終判断は専門家・メーカーにご確認ください。"),
        ("チェック1：ラベルの印刷品質",
         "正規品はラベルの文字が鮮明・均一で、フォント・字間・色がメーカー公式と一致します。贋作は、文字のにじみ・かすれ、フォントの微妙な違い、色ズレ・色ムラ、紙質や光沢の違い、印刷位置のずれが見られることがあります。10倍ルーペでラベル全体を確認し、メーカー公式画像と細部まで比較してください。"),
        ("チェック2：キャップ・封緘・ホログラム",
         "多くの正規ボトルではホログラム等の真贋要素が用いられます。本物のホログラムは見る角度で色が変化し立体感があります。贋作はホログラムが粗い・反射が均一・平面的・貼り方が雑、といった違和感が出やすいです。キャップの締まり具合・封緘の状態（隙間や不自然さ）も確認しましょう。"),
        ("チェック3：液色・液面の状態",
         f"本物の{n}は均一で透明感のある色合いです。色ムラ・濁り・沈殿物、不自然に濃い／薄い色、消えない気泡、振った時の粘度の違いは要注意。液面の高さも目安で、長期保管による自然な目減りを超えて極端に下がっている場合は、状態不良か贋作の可能性を疑います。"),
        ("チェック4：瓶の形状・底面刻印",
         "正規ボトルは底面にロット番号・製造所コード等の刻印があることが多く、贋作は刻印が無い・印字パターンが異なる・不自然な深さ・規則に合わない番号、といった差が出ます。瓶の重量・厚みが正規品と微妙に違うこともあるため、同銘柄を複数所有していれば比較してみてください。"),
        ("チェック5：購入経路の信頼性（最重要）",
         f"信頼度が高いのは、正規流通店・百貨店、海外大手オークション（Sotheby's／Bonhams／Whisky Auctioneer）、国内大手買取業者の販売部門、信頼できるコレクターの直接取引です。リスクが高いのは、フリマ／オークションの無名出品、海外（特に無名）通販、SNS/LINEの個人取引、相場より20%以上安い「掘り出し物」。「他では手に入らない」と煽る相手も典型的な注意対象です。"),
        ("不審なボトルを見つけた場合の対処法",
         f"自身が保有する{n}や購入検討中のボトルが不審な場合は、(1)ボトル全体・ラベル各角度・キャップ・底面刻印を高解像度で撮影、(2)お酒買取専門店（JOYLAB等）で無料鑑定査定、(3)メーカー・正規輸入元の公式窓口へロット番号を伝えて確認、(4)購入経路を遡り返品交渉、(5)詐欺の疑いがあれば警察へ相談、の順で対処してください。贋作と知りながらの売却は詐欺罪に該当し得るため、誠実な対処が重要です。"),
    ]


def esc(t):  # for backtick template
    return t.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')


def build(base, name, hero, variants):
    title = f"{name}の偽物・贋作の見分け方{MONTH}本物との違い5点と各ボトル別の真贋・買取ガイド"
    desc = f"{name}の偽物・贋作を見分ける5つのチェック（ラベル・キャップ・液面・刻印・購入経路）と、本物と確認できた後の売却手順を解説。{name}12年・18年・25年・NV等、各ボトル別の真贋＆買取相場ガイドへのハブ。"
    comp = "".join(p.capitalize() for p in f"{base}-nisemono-mikata".replace("-", " ").split()) + "Page"
    secs = checks(name)
    toc = "\n".join(f'              <li><a href="#s{i}" className="hover:underline">{i+1}. {s[0]}</a></li>' for i, s in enumerate(secs))
    body = "\n\n".join(
        f'          <h2 id="s{i}">{i+1}. {s[0]}</h2>\n          <p>{s[1]}</p>'
        for i, s in enumerate(secs)
    )
    # hub grid (variant -> nisemono + kaitori)
    cards = "\n".join(
        f'''            <div className="bg-white border border-warm-border rounded-xl p-4">
              <p className="text-sm font-bold text-ink mb-2">{lbl}</p>
              <p className="text-xs"><Link href="/articles/{vs}-nisemono-mikata/" className="text-amber-dark underline">偽物の見分け方</Link>　／　<Link href="/articles/{vs}-kaitori/" className="text-amber-dark underline">買取相場ガイド</Link></p>
            </div>'''
        for vs, lbl in variants
    )
    first_kaitori = variants[0][0] + "-kaitori"
    faq_json = '{"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [' + ", ".join(
        '{ "@type": "Question", "name": ' + repr(q) + ', "acceptedAnswer": { "@type": "Answer", "text": ' + repr(a) + " } }"
        for q, a in FAQS(name)) + "] }"
    art_json = '{"@context": "https://schema.org", "@type": "Article", "headline": ' + repr(f"{name}の偽物・贋作の見分け方") + ', "datePublished": "2026-06-28", "dateModified": "2026-06-28", "author": {"@type": "Organization", "name": "PeatBid編集部"}, "publisher": {"@type": "Organization", "name": "PeatBid"}}'
    faq_react = "\n".join(
        f'''          <details className="border border-warm-border rounded-lg p-4 mb-3"><summary className="font-bold cursor-pointer">{q}</summary><p className="mt-3 text-sm">{a}</p></details>'''
        for q, a in FAQS(name))
    return f'''import type {{ Metadata }} from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {{
  title: {title!r},
  description: {desc!r},
}};

function Schema() {{
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: JSON.stringify({faq_json}) }}}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: JSON.stringify({art_json}) }}}} />
    </>
  );
}}

export default function {comp}() {{
  return (
    <>
      <Schema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><Link href="/articles/" className="hover:text-amber-dark transition-colors">銘柄一覧</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">{name}の偽物・贋作の見分け方</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/{hero}.png" alt={f"{name}の偽物・贋作の見分け方"!r} width={{1200}} height={{440}} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">{name}（全種）の偽物・贋作の見分け方</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-06-28 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <p>{name}は人気・高額帯のため、二次流通で贋作リスクが意識される銘柄です。本記事では、{name}に共通する<strong>真贋チェック5点（ラベル・キャップ／封緘・液色／液面・底面刻印・購入経路）</strong>と、本物と確認できた後の売却手順を解説します。各ボトル（12年・18年・25年・NV等）の個別の見分け方・買取相場は、下記ハブから確認できます。なお<strong>真贋の最終判断は専門店の鑑定・メーカー確認</strong>をご利用ください（本記事は一般的な手引きです）。</p>

          {{/* ボトル別ハブ */}}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 my-7 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📚 {name}のボトル別 真贋・買取ガイド</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
{cards}
            </div>
          </div>

          {{/* 目次 */}}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
{toc}
            </ol>
          </div>

{body}

          {{/* 換金導線 */}}
          <div className="bg-burgundy/5 border border-burgundy/30 rounded-xl p-5 my-8 not-prose">
            <p className="text-xs text-burgundy font-bold tracking-wider mb-2">本物と確認できたら｜次のステップ</p>
            <ol className="space-y-2 text-sm">
              <li><span className="font-bold text-burgundy">STEP 1</span>　まず相場を知る → <Link href="/articles/{first_kaitori}/" className="text-amber-dark underline">{name}の買取相場ガイド</Link>（上のハブから各ボトルの相場も確認できます）</li>
              <li><span className="font-bold text-burgundy">STEP 2</span>　高く売るコツを押さえる → <Link href="/articles/whisky-souba-kimarikata/" className="text-amber-dark underline">買取相場の決まり方（査定6要素）</Link></li>
              <li><span className="font-bold text-burgundy">STEP 3</span>　複数業者で無料一括査定 → 同じボトルでも業者で数万〜数十万円の差。相見積もりで最高値を引き出す</li>
            </ol>
          </div>

          <h2 id="faq">よくある質問</h2>
{faq_react}

          <h2>関連ガイド</h2>
          <ul>
            <li><Link href="/articles/whisky-nisemono-miwakekata/" className="text-amber-dark underline">ウイスキー全般の偽物の見分け方</Link></li>
            <li><Link href="/articles/{first_kaitori}/" className="text-amber-dark underline">{name}の買取相場ガイド</Link></li>
            <li><Link href="/articles/whisky-souba-kimarikata/" className="text-amber-dark underline">買取相場の決まり方（査定6要素）</Link></li>
          </ul>
        </article>
      </div>
    </>
  );
}}
'''


def main():
    made = []
    for base, name, hero, variants in BRANDS:
        slug = f"{base}-nisemono-mikata"
        d = ART / slug; d.mkdir(parents=True, exist_ok=True)
        (d / "page.tsx").write_text(build(base, name, hero, variants), encoding="utf-8")
        made.append(slug); print(f"  ✅ {slug} ({name}・variants {len(variants)})")
    print(f"\ngenerated: {len(made)} brand hubs")


if __name__ == "__main__":
    main()
