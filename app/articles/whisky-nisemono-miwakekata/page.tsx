import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ウイスキーの偽物の見分け方｜売る前に確認したいチェックポイント【2026年】",
  description:
    "高額ウイスキーの偽物・模倣品を売る前に確認したいチェックポイントを解説。ラベル・キャップシール・液色・購入経路など見るべき点と、自分で断定せず専門査定に回すべき危険サインまで。山崎・響など高額銘柄の売却前に。",
  alternates: { canonical: "/articles/whisky-nisemono-miwakekata/" },
};

const toc = [
  ["chui", "はじめに｜自分で「本物と断定」しないこと"],
  ["check", "売る前に確認したいチェックポイント"],
  ["kiken", "専門査定に回すべき危険サイン"],
  ["kounyu", "そもそも偽物をつかまないために"],
  ["uru", "不安なときの売り方"],
  ["faq", "よくある質問"],
];

const faqs = [
  {
    q: "自分で本物かどうか確実に判定できますか？",
    a: "確実な真贋判定は専門家でも難しく、外観だけで断定するのは危険です。本記事のチェックは『不安なサインに気づく』ためのもので、最終的な判定は専門の買取業者・鑑定に委ねてください。",
  },
  {
    q: "どんな銘柄が偽物のリスクが高いですか？",
    a: "山崎・響などの高額・人気銘柄ほど模倣のリスクが相対的に高いとされます。中古・オークション・フリマで安く出ているものや、購入経路が不明なものは特に注意が必要です。",
  },
  {
    q: "偽物かもしれないボトルはどうすればよいですか？",
    a: "自分で開封・鑑定しようとせず、信頼できる買取業者の査定に出すのが安全です。複数業者で見てもらうことで、価格だけでなく真贋面の指摘も得やすくなります。",
  },
  {
    q: "購入時のレシートは残しておくべきですか？",
    a: "はい。正規流通店のレシートや保証書、購入経路の記録は、真贋の信頼性を高め査定をスムーズにします。売却益の税金（取得費の証明）の面でも有利です。",
  },
];

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="hover:text-amber-dark">ホーム</Link></li>
          <li className="breadcrumb-sep" />
          <li><Link href="/articles/" className="hover:text-amber-dark">記事一覧</Link></li>
          <li className="breadcrumb-sep" />
          <li><span className="text-foreground">偽物の見分け方</span></li>
        </ol>
      </nav>

      <article className="prose">
        <h1 className="font-display text-3xl md:text-4xl font-semibold !mt-0 mb-2">
          ウイスキーの偽物の見分け方｜売る前のチェックポイント
        </h1>
        <p className="text-warm-gray text-sm not-prose mb-6">
          最終更新: 2026-06-19 ／ 監修: <Link href="/editorial/" className="text-amber-dark underline">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline">集計方法</Link>）
        </p>

        <div className="not-prose bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6">
          <p className="font-bold text-ink mb-2">この記事の結論（30秒）</p>
          <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
            <li>外観だけで<strong>本物と断定しない</strong>。あくまで「不安サインに気づく」ためのチェック。</li>
            <li>確認点＝<strong>ラベル・キャップシール・液色・容量・購入経路</strong>。</li>
            <li>山崎・響など<strong>高額銘柄</strong>はリスクが相対的に高い。安すぎる出物は注意。</li>
            <li>不安なら自分で鑑定せず<strong>信頼できる買取業者の査定</strong>へ。</li>
          </ul>
        </div>

        <nav className="not-prose border border-warm-border rounded-xl p-5 my-8" aria-label="目次">
          <p className="font-bold text-ink mb-3">目次</p>
          <ol className="list-decimal pl-5 space-y-1.5 text-sm text-amber-dark">
            {toc.map(([id, label]) => (
              <li key={id}><a href={`#${id}`} className="hover:underline">{label}</a></li>
            ))}
          </ol>
        </nav>

        <h2 id="chui">はじめに｜自分で「本物と断定」しないこと</h2>
        <p>
          近年は高額ウイスキーの模倣品も報告されています。ただし<strong>真贋の確実な判定は専門家でも難しく</strong>、外観だけで「本物だ」と断定するのは危険です。本記事のチェックは、売却前に<strong>不安なサインに気づき、必要なら専門査定に回す</strong>ための目安としてご利用ください。
        </p>

        <h2 id="check">売る前に確認したいチェックポイント</h2>
        <ul>
          <li><strong>ラベル</strong>：印刷のかすれ・色味・フォントの違和感、貼り位置のズレ。</li>
          <li><strong>キャップ・封シール</strong>：開封跡、シールの種類・印字、ロット番号の有無。</li>
          <li><strong>液色・透明度</strong>：極端に不自然な色・濁り・浮遊物。</li>
          <li><strong>容量・ボトル形状</strong>：正規品と異なる形・刻印・容量表記。</li>
          <li><strong>購入経路</strong>：正規流通店か、相場より極端に安くないか。</li>
        </ul>
        <p className="text-sm text-warm-gray">※ いずれも「違和感に気づく」ための目安で、これだけで真贋を確定できるものではありません。</p>

        <h2 id="kiken">専門査定に回すべき危険サイン</h2>
        <ul>
          <li>相場より<strong>極端に安く</strong>入手した高額銘柄。</li>
          <li><strong>購入経路が不明</strong>、または個人間取引で証明がない。</li>
          <li>ラベル・封に<strong>明らかな違和感</strong>がある。</li>
        </ul>
        <p>当てはまる場合は、自分で開封・判断せず、<strong>信頼できる買取業者の査定</strong>に出して確認するのが安全です。</p>

        <h2 id="kounyu">そもそも偽物をつかまないために</h2>
        <ul>
          <li><strong>正規流通店・信頼できる店舗で購入</strong>する。</li>
          <li>購入時の<strong>レシート・保証書を保管</strong>する（真贋の信頼性＋<Link href="/articles/whisky-kaitori-zeikin/">税金の取得費証明</Link>にも有効）。</li>
          <li>相場を把握し、<strong>安すぎる出物を疑う</strong>（<Link href="/souba-ranking/">相場ランキング</Link>で目安確認）。</li>
        </ul>

        <h2 id="uru">不安なときの売り方</h2>
        <p>
          真贋に不安があるボトルは、<strong>複数の買取業者の無料査定</strong>に出すのが現実的です。価格比較だけでなく、真贋面の指摘も得やすくなります。特に <Link href="/articles/yamazaki-18-kaitori/">山崎</Link>・<Link href="/articles/hibiki-30-kaitori/">響</Link>・<Link href="/articles/ichirosu-double-distilleries-kaitori/">イチローズモルト</Link> など高額銘柄は、専門性のある業者を選びましょう。
        </p>
        <div className="not-prose bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 text-center">
          <p className="font-bold text-ink mb-2">高額銘柄こそ複数業者で査定</p>
          <p className="text-sm text-warm-gray mb-4">無料一括査定で、価格と対応を比較。専門性のある業者が見つかります。</p>
          <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm">無料一括査定で調べる →</a>
        </div>

        <h2 id="faq">よくある質問</h2>
        {faqs.map((f) => (
          <div key={f.q} className="mb-4">
            <p className="font-bold text-ink mb-1">Q. {f.q}</p>
            <p className="text-sm leading-relaxed text-ink/80">A. {f.a}</p>
          </div>
        ))}

        <p className="text-xs text-warm-gray not-prose border-t border-warm-border pt-4 mt-8">
          ※ 本記事は一般的な注意点の情報整理であり、真贋を保証・鑑定するものではありません。判断に迷う場合は専門の買取業者・鑑定にご相談ください。相場の目安は <Link href="/souba-ranking/" className="text-amber-dark underline">相場ランキング</Link> で確認できます。
        </p>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </div>
  );
}
