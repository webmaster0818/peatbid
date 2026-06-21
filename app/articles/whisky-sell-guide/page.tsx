import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ウイスキーを売る前に知るべき基礎ガイド｜税金・相場・状態・偽物まで【2026年】",
  description:
    "ウイスキーを高く・損なく売るための基礎を1ページに集約。買取相場の見方、年代指定なし(NV)、税金、保管・状態、偽物の確認、相続・遺品の売却、なぜ高いのかまで。各テーマの詳しい解説と銘柄別の実勢相場へ案内します。",
  alternates: { canonical: "/articles/whisky-sell-guide/" },
};

const toc = [
  ["kekka", "結論｜高く・損なく売る5つのポイント"],
  ["souba", "1. 買取相場の見方"],
  ["nv", "2. 年代指定なし(NV)の扱い"],
  ["zei", "3. 税金・確定申告"],
  ["jotai", "4. 保管・状態"],
  ["nisemono", "5. 偽物の確認"],
  ["souzoku", "6. 相続・遺品の売却"],
  ["takai", "7. なぜ高いのか"],
  ["uru", "売り方｜複数業者で比較"],
  ["faq", "よくある質問"],
];

const faqs = [
  {
    q: "ウイスキーを売るなら何から始めればいいですか？",
    a: "まず銘柄・年数・状態を確認し、相場ランキングや各銘柄の買取相場ページで実勢の目安を把握しましょう。そのうえで複数業者の無料査定を取り、手取り額が高いところを選ぶのが基本です。",
  },
  {
    q: "高く売るコツは何ですか？",
    a: "①付属品(箱・冊子)をそろえる ②良好な状態で保管する ③需要が高い局面で売る ④複数業者で相見積もりを取る、の4点です。詳しくは各テーマの記事で解説しています。",
  },
  {
    q: "売却益に税金はかかりますか？",
    a: "個人の単発売却は譲渡所得になることが多く、年間50万円の特別控除の範囲なら課税されないケースが一般的です。高額品・大量売却は課税対象になり得ます。詳細は税金の記事を参照し、判断は税務署・税理士へ。",
  },
];

const links = [
  ["/articles/whisky-souba-kimarikata/", "買取相場の決まり方", "査定額が決まる6つの要素"],
  ["/articles/whisky-nv-toha/", "年代指定なし(NV)とは", "年数表記との違いと査定"],
  ["/articles/whisky-kaitori-zeikin/", "買取の税金・確定申告", "譲渡所得・控除・申告要否"],
  ["/articles/whisky-hokan-houhou/", "保管方法", "価値を落とさない保存"],
  ["/articles/whisky-nisemono-miwakekata/", "偽物の見分け方", "売る前のチェック"],
  ["/articles/whisky-souzoku-baikyaku/", "相続・遺品のウイスキーを売る", "手順とチェックリスト"],
  ["/articles/whisky-naze-takai/", "なぜ高いのか", "高騰の理由"],
  ["/souba-ranking/", "相場ランキング", "今週の値上がり/値下がり"],
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
          <li><span className="text-foreground">売る前の基礎ガイド</span></li>
        </ol>
      </nav>

      <article className="prose">
        <h1 className="font-display text-3xl md:text-4xl font-semibold !mt-0 mb-2">
          ウイスキーを売る前に知るべき基礎ガイド
        </h1>
        <p className="text-warm-gray text-sm not-prose mb-6">
          最終更新: 2026-06-19 ／ 監修: <Link href="/editorial/" className="text-amber-dark underline">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline">集計方法</Link>）
        </p>

        <p>
          ウイスキーを<strong>高く・損なく売る</strong>ために知っておきたい基礎を1ページにまとめました。相場の見方から税金、状態、偽物、相続まで、各テーマの詳しい解説と、銘柄別の実勢相場へ案内します。
        </p>

        <div className="not-prose bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6">
          <p className="font-bold text-ink mb-2" id="kekka">結論｜高く・損なく売る5つのポイント</p>
          <ol className="text-sm text-ink/80 space-y-1 list-decimal pl-5">
            <li>銘柄・状態を確認し、<Link href="/souba-ranking/" className="text-amber-dark underline">実勢相場</Link>を把握する。</li>
            <li>付属品(箱・冊子)をそろえ、良い状態で保管する。</li>
            <li>需要が高い局面（終売報道・円安など）を狙う。</li>
            <li>高額品・大量売却は<Link href="/articles/whisky-kaitori-zeikin/" className="text-amber-dark underline">税金</Link>に注意。</li>
            <li>複数業者で相見積もりを取り、手取り額で比較する。</li>
          </ol>
        </div>

        <nav className="not-prose border border-warm-border rounded-xl p-5 my-8" aria-label="目次">
          <p className="font-bold text-ink mb-3">目次</p>
          <ol className="list-decimal pl-5 space-y-1.5 text-sm text-amber-dark">
            {toc.map(([id, label]) => (
              <li key={id}><a href={`#${id}`} className="hover:underline">{label}</a></li>
            ))}
          </ol>
        </nav>

        <h2 id="souba">1. 買取相場の見方</h2>
        <p>
          相場は定価ではなく<strong>実勢価格（実際に取引された価格）</strong>で見ます。当サイトはYahoo!オークションの落札データから外れ値を除いた実勢中央値と流通量を毎週集計。査定額は銘柄人気・希少性・流通量・状態・付属品・需要で決まります。→ <Link href="/articles/whisky-souba-kimarikata/">買取相場の決まり方</Link>
        </p>

        <h2 id="nv">2. 年代指定なし(NV)の扱い</h2>
        <p>
          ラベルに年数表記がないNV(ノンエイジ)も、人気銘柄なら中古需要は安定。年数の有無より銘柄人気・状態が査定を左右します。→ <Link href="/articles/whisky-nv-toha/">年代指定なし(NV)とは</Link>
        </p>

        <h2 id="zei">3. 税金・確定申告</h2>
        <p>
          個人の単発売却は譲渡所得になることが多く、年間50万円の特別控除内なら課税されないことが一般的。高額品・大量売却は課税対象になり得ます。→ <Link href="/articles/whisky-kaitori-zeikin/">買取の税金・確定申告</Link>
        </p>

        <h2 id="jotai">4. 保管・状態</h2>
        <p>
          縦置き・直射日光回避・冷暗所が基本。液面低下・ラベル劣化・箱の傷は減額要因です。売る予定があるなら良好な状態を保ちましょう。→ <Link href="/articles/whisky-hokan-houhou/">保管方法</Link>
        </p>

        <h2 id="nisemono">5. 偽物の確認</h2>
        <p>
          高額銘柄は模倣のリスクも。ラベル・封・購入経路に違和感があれば、自分で断定せず専門査定へ。→ <Link href="/articles/whisky-nisemono-miwakekata/">偽物の見分け方</Link>
        </p>

        <h2 id="souzoku">6. 相続・遺品の売却</h2>
        <p>
          遺品でまとめて売る場合は、状態確認チェックリストと税金（合計利益）に注意。出張・宅配買取でまとめて査定できます。→ <Link href="/articles/whisky-souzoku-baikyaku/">相続・遺品のウイスキーを売る</Link>
        </p>

        <h2 id="takai">7. なぜ高いのか</h2>
        <p>
          原酒不足・終売・世界的人気・投資需要・円安が重なり、とくにジャパニーズの中古相場が上昇。背景を知ると売り時を捉えやすくなります。→ <Link href="/articles/whisky-naze-takai/">なぜ高いのか</Link>
        </p>

        <h2 id="uru">売り方｜複数業者で比較</h2>
        <p>同じボトルでも業者で査定額が変わります。複数業者の無料査定を取り、手取り額で比較しましょう。銘柄別の相場は次のページで確認できます。</p>
        <div className="not-prose grid sm:grid-cols-2 gap-2 my-6">
          {links.map(([href, title, desc]) => (
            <Link key={href} href={href} className="block border border-warm-border rounded-lg p-3 hover:border-amber/50 hover:bg-gold-bg/40">
              <span className="block font-bold text-ink text-sm">{title}</span>
              <span className="block text-xs text-warm-gray mt-0.5">{desc}</span>
            </Link>
          ))}
        </div>
        <div className="not-prose bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 text-center">
          <p className="font-bold text-ink mb-2">まずは手持ちの相場を知る</p>
          <p className="text-sm text-warm-gray mb-4">無料一括査定で、複数業者の入札を一度に比較できます。</p>
          <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm">無料一括査定で最高値を調べる →</a>
        </div>

        <h2 id="faq">よくある質問</h2>
        {faqs.map((f) => (
          <div key={f.q} className="mb-4">
            <p className="font-bold text-ink mb-1">Q. {f.q}</p>
            <p className="text-sm leading-relaxed text-ink/80">A. {f.a}</p>
          </div>
        ))}

        <p className="text-xs text-warm-gray not-prose border-t border-warm-border pt-4 mt-8">
          ※ 本記事は公開情報・当サイトの相場集計にもとづく一般的な情報です。価格は変動し、特定の買取額・税務判断を保証するものではありません。最新の実勢は <Link href="/souba-ranking/" className="text-amber-dark underline">相場ランキング</Link> でご確認ください。
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
