#!/usr/bin/env python3
"""基幹銘柄の総合・真贋ハブ（山崎/響/白州/マッカラン）。
汎用「○○ 偽物 見分け方」クエリ向けに、ブランド全体の真贋ガイド＋各ボトル別偽物/買取ページへのハブ＋換金導線。
事実ベース：断定鑑定はせず一般的な真贋チェック＋専門査定/メーカー確認へ誘導。"""
import datetime
import os
from pathlib import Path

# 打ち手③（2026-07-04）: 真贋→買取の送客回路。実勢中央値は price-history latest（週次更新）
from opportunity_band import band_latest

ROOT = Path(__file__).resolve().parent.parent
ART = ROOT / "app" / "articles"
# 週次cron（weekly-yahoo-update.sh）で再生成されるため、生成時点の年月・日付が鮮度になる
_NOW = datetime.date.today()
MONTH = f"【{_NOW.year}年{_NOW.month}月最新】"
TODAY = _NOW.isoformat()

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
    ("ardbeg", "アードベッグ", "ardbeg-uigeadail", [
        ("ardbeg-uigeadail", "アードベッグ ウーガダール"), ("ardbeg-corryvreckan", "アードベッグ コリーヴレッカン"),
    ]),
]

FAQS = lambda n: [
    (f"{n}の偽物はどのくらい出回っていますか？",
     f"ジャパニーズウイスキー・人気スコッチのブームで二次流通価格が高騰した銘柄では、海外を中心に贋作の流通が確認されています。{n}は人気・高額帯のため、特に個人間取引（フリマ・オークションの無名出品）では注意が必要です。正規流通品や、信頼できるオークションで購入したものであれば、リスクは大きく下がります。"),
    (f"{n}が本物かを確認する最も確実な方法は何ですか？",
     f"最終的には専門家の確認が確実です。(1)お酒買取の専門店での無料鑑定査定、(2)メーカー公式お客様窓口へロット番号を伝えての確認、の2つが有効です。ご自身でできる確認は、ラベル印刷・キャップ／封緘・液色と液面・底面刻印・購入経路の5点です（本記事で解説）。"),
    (f"{n}を売る前に真贋の確認は必要ですか？",
     f"はい、おすすめします。偽物の場合は買取を断られ、偽物と知りながら売却すると詐欺に問われる可能性もあります。不審な点がある場合は、売却前に専門店の無料鑑定で確認してから査定に出してください。"),
    (f"{n}が偽物だった場合は、どのように対処すればよいですか？",
     "(1)ボトル全体・ラベル・キャップ・底面刻印を高解像度で撮影して記録、(2)購入元へ返品・返金を交渉、(3)詐欺の疑いがあれば最寄りの警察署に相談、の順で対処してください。贋作と判明したボトルは売却せず、誠実に対応することが重要です。"),
    (f"正規の販売店で購入した{n}にも偽物の心配はありますか？",
     f"正規流通店・百貨店・メーカー直販で購入したものは、贋作のリスクは極めて低いと考えられます。リスクが高いのは、相場より極端に安い出品、無名の個人・海外通販、SNS/LINEでの直接取引などです。「他では入手できない」と購入を急がせる相手にも注意が必要です。"),
]

# 一般的な真贋5チェック（事実ベース・ブランド一般。断定鑑定はしない）
def checks(n):
    return [
        ("贋作の流通状況と確認の必要性",
         f"ジャパニーズウイスキーや人気スコッチのブーム以降、海外の二次流通市場では贋作ボトルの流通が確認されています。{n}のように未開封・箱付きで高い流通価格を持つ銘柄は、精巧な贋作が個人間取引で流通する例があります。本物の空き瓶に別の液体を詰める手口も報告されており、高額帯ほど下記5点の確認が重要です。なお本記事は一般的な確認の手引きであり、真贋の最終判断は専門家・メーカーにご確認ください。"),
        ("チェック1：ラベルの印刷品質",
         "正規品はラベルの文字が鮮明で均一であり、書体・字間・色がメーカー公式のものと一致します。贋作では、文字のにじみ・かすれ、書体のわずかな違い、色ずれ・色むら、紙質や光沢の違い、印刷位置のずれが見られることがあります。10倍ルーペでラベル全体を確認し、メーカー公式画像と細部まで比較してください。"),
        ("チェック2：キャップ・封緘・ホログラム",
         "多くの正規ボトルではホログラム等の真贋要素が用いられます。正規品のホログラムは見る角度で色が変化し、立体感があります。贋作では、ホログラムが粗い・反射が均一・平面的・貼り方が不正確といった特徴が見られます。キャップの締まり具合・封緘の状態（隙間や不自然な点）もご確認ください。"),
        ("チェック3：液色・液面の状態",
         f"正規品の{n}は、均一で透明感のある色合いです。色むら・濁り・沈殿物、不自然に濃い／薄い色、消えない気泡、振ったときの粘度の違いには注意が必要です。液面の高さも目安となり、長期保管による自然な目減りを超えて極端に下がっている場合は、状態不良または贋作の可能性があります。"),
        ("チェック4：瓶の形状・底面刻印",
         "正規品のボトルには、底面にロット番号・製造所コード等の刻印がある場合が多く、贋作では刻印がない・印字のパターンが異なる・深さが不自然・番号が規則に合わない、といった違いが見られます。瓶の重量・厚みが正規品とわずかに異なる場合もあるため、同じ銘柄を複数お持ちの場合は比較してください。"),
        ("チェック5：購入経路の信頼性",
         f"信頼性が高いのは、正規流通店・百貨店、海外大手オークション（Sotheby's／Bonhams／Whisky Auctioneer）、国内大手買取業者の販売部門、信頼できるコレクターの直接取引です。リスクが高いのは、フリマ／オークションの無名出品、海外（特に無名）通販、SNS/LINEの個人取引、相場より20%以上安い出品です。「他では入手できない」と購入を急がせる相手にも注意が必要です。"),
        ("不審なボトルを見つけた場合の対処法",
         f"自身が保有する{n}や購入検討中のボトルが不審な場合は、(1)ボトル全体・ラベル各角度・キャップ・底面刻印を高解像度で撮影、(2)お酒買取の専門店で無料鑑定査定、(3)メーカー・正規輸入元の公式窓口へロット番号を伝えて確認、(4)購入経路を遡り返品交渉、(5)詐欺の疑いがあれば警察へ相談、の順で対処してください。贋作と知りながら売却すると詐欺罪に該当する可能性があるため、誠実な対応が必要です。"),
    ]


def esc(t):  # for backtick template
    return t.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')


# 冒頭の答え（2026-10-28 16時 遅れ挽回）: 「響 偽物」7.1位・imp28／「響 偽物 見分け方」8.2位（GSC 9/28〜10/25）。
# 汎用の5チェックから始まっていて、響に固有の事実（摘発例・ホログラムシールの対象と出荷時期）が冒頭に無かった。
# 出典: J-CAST トレンド 2022-06-17（サントリーホールディングス広報への取材）。サントリー公式FAQ は 10/28 403 で取得できず＝使っていない。
BRAND_LEAD = {
    "hibiki": (
        "響の偽物について（先に結論）",
        '<ul className="list-disc pl-5 space-y-1">'
        '<li><strong>響の偽物は実際に摘発されています。</strong>2018年8月、フリマサイトで偽の「響30年」を販売したとして2人が商標法違反と詐欺の疑いで逮捕され、古物店に偽ウイスキーを買い取らせた容疑でも起訴されました（J-CAST トレンド 2022年6月17日が報道を引用）。</li>'
        '<li>サントリーホールディングス広報によると、偽造防止のため<strong>響30年・響21年・響 BLENDER\'S CHOICE・響 JAPANESE HARMONY（いずれも700ml）</strong>のキャップに<strong>ホログラムシール</strong>を貼っており、シール付きの製品は<strong>2022年2月以降の出荷</strong>です（同記事・免税品や限定品など一部は記載なし）。</li>'
        '<li>そのため、<strong>2022年1月以前に出荷されたボトルや、上の一覧に無いボトル（響17年・響12年など）にシールが無いことだけでは、偽物とは判断できません</strong>。反対に、2022年2月以降の現行品で一覧のボトルなのにシールが無い・剥がした跡がある場合は、査定時に申告して確認を受けてください。</li>'
        '<li>売る前に自分で見るのは、<strong>キャップ・封緘の破れや開封の跡</strong>、<strong>液面</strong>（自然な目減りを超えて減っていないか）、<strong>購入経路</strong>（相場より極端に安い個人出品で買ったものか）の3点です。判断できない場合は、ラベル表・裏、キャップ、箱の写真を添えて買取店の査定（無料）に出してください（<Link href="/articles/hibiki-kaitori/" className="text-amber-dark underline">響の買取相場（全ボトル）</Link>）。</li>'
        '</ul>'
        '<p className="text-[11px] text-warm-gray mt-2">出典: <a href="https://www.j-cast.com/trend/2022/06/17439568.html" target="_blank" rel="noopener noreferrer nofollow" className="underline">J-CAST トレンド「サントリー高級ウイスキー「偽物対策」か フタに「ホログラムシール」」（2022-06-17）</a>（PeatBid編集部 2026-10-28 確認）</p>'
    ),
}


def build(base, name, hero, variants):
    title = f"{name}の偽物・贋作の見分け方{MONTH}本物との違い5点と各ボトル別の真贋・買取ガイド"
    desc = f"{name}の偽物・贋作を見分ける5つのチェック（ラベル・キャップ・液面・刻印・購入経路）と、本物と確認できた後の売却手順を解説しています。{name}12年・18年・25年・NV等、各ボトルの真贋と買取相場のページもご案内しています。"
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
    # 打ち手③: CVブロック用のボトル別実勢中央値（insufficient/データ無しは金額を出さない＝捏造禁止）
    price_items = []
    for vs, lbl in variants:
        lm = band_latest(vs)
        if lm:
            price_items.append(
                f'              <li className="flex flex-wrap items-baseline gap-x-2"><span className="font-bold text-ink">{lbl}</span><span className="font-display text-lg font-semibold text-amber-dark">¥{lm[0]:,}</span><span className="text-[11px] text-warm-gray">（n={lm[1]}件）</span><Link href="/articles/{vs}-kaitori/" className="shingan-to-kaitori text-amber-dark underline text-xs">相場ページで詳細を見る →</Link></li>'
            )
        else:
            price_items.append(
                f'              <li className="flex flex-wrap items-baseline gap-x-2"><span className="font-bold text-ink">{lbl}</span><span className="text-xs text-warm-gray">実勢データ集計中のため、金額は掲載していません</span><Link href="/articles/{vs}-kaitori/" className="shingan-to-kaitori text-amber-dark underline text-xs">相場ページへ →</Link></li>'
            )
    price_list = "\n".join(price_items)
    lead_html = ""
    if base in BRAND_LEAD:
        _lh, _lb = BRAND_LEAD[base]
        lead_html = f'''
          <div className="bg-gold-bg border-2 border-amber rounded-xl p-4 mb-6 not-prose">
            <p className="text-sm font-bold text-ink mb-2">{_lh}</p>
            <div className="text-sm text-ink leading-relaxed">{_lb}</div>
          </div>
'''
    faq_json = '{"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [' + ", ".join(
        '{ "@type": "Question", "name": ' + repr(q) + ', "acceptedAnswer": { "@type": "Answer", "text": ' + repr(a) + " } }"
        for q, a in FAQS(name)) + "] }"
    art_json = '{"@context": "https://schema.org", "@type": "Article", "headline": ' + repr(f"{name}の偽物・贋作の見分け方") + ', "datePublished": "2026-06-28", "dateModified": "' + TODAY + '", "author": {"@type": "Organization", "name": "PeatBid編集部"}, "publisher": {"@type": "Organization", "name": "PeatBid"}}'
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
          <p className="text-warm-gray text-sm mb-6">最終更新: {TODAY} / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>
{lead_html}
          <p>{name}は人気・高額帯のため、二次流通で贋作リスクが意識される銘柄です。本記事では、{name}に共通する<strong>真贋チェック5点（ラベル・キャップ／封緘・液色／液面・底面刻印・購入経路）</strong>と、本物と確認できた後の売却手順を解説します。各ボトル（12年・18年・25年・NV等）の個別の見分け方・買取相場は、以下のリンクからご確認いただけます。なお<strong>真贋の最終判断は専門店の鑑定・メーカー確認</strong>をご利用ください（本記事は一般的な手引きです）。</p>

          {{/* ボトル別ハブ */}}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 my-7 not-prose">
            <p className="font-bold text-base mb-3 text-ink">{name}のボトル別 真贋・買取ガイド</p>
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

          {{/* 換金導線（真贋→買取の送客回路・打ち手③） */}}
          <div className="bg-burgundy/5 border-2 border-burgundy/30 rounded-xl p-6 my-8 not-prose">
            <p className="text-xs text-burgundy font-bold tracking-wider mb-2">真贋の確認後の手順</p>
            <h3 className="font-display text-xl font-semibold text-ink mb-3">{name}のボトル別の実勢中央値</h3>
            <p className="text-sm text-warm-gray leading-relaxed mb-3">ヤフオク実落札（過去180日・IQR外れ値除去）の中央値で、毎週月曜に更新しています。落札サンプルが少ないボトルは金額を掲載していません。買取額を保証するものではありません。</p>
            <ul className="space-y-2 text-sm mb-4 list-none pl-0">
{price_list}
            </ul>
            <ol className="space-y-2 text-sm mb-4">
              <li><span className="font-bold text-burgundy">STEP 1</span>　相場の詳細を見る → 上のボトル別リンク、または<Link href="/articles/{first_kaitori}/" className="shingan-to-kaitori text-amber-dark underline">{name}の買取相場ガイド</Link></li>
              <li><span className="font-bold text-burgundy">STEP 2</span>　査定額の決まり方を確認する → <Link href="/articles/whisky-souba-kimarikata/" className="shingan-to-kaitori text-amber-dark underline">買取相場の決まり方（査定6要素）</Link></li>
              <li><span className="font-bold text-burgundy">STEP 3</span>　複数の業者に無料一括査定を依頼する → 同じボトルでも、業者により数万〜数十万円の差が生じる場合があります</li>
            </ol>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で無料一括査定</a>
            </div>
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
