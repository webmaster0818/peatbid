import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import medians from "@/data/yahoo-medians.json";

type MedianEntry = { median?: number; filtered_n?: number; fetched_at?: string; insufficient?: boolean };
const m = medians as Record<string, MedianEntry | undefined>;
const nv = m["talisker-nv"];
const nvMedian = nv && !nv.insufficient && nv.median ? nv.median : null;
const t25 = m["talisker-25"];
const yen = (v?: number) => (v ? `${v.toLocaleString("ja-JP")}円` : "—");
const fetchedAt = t25?.fetched_at ?? "";

export const metadata: Metadata = {
  title: "タリスカーの年代指定なし(NV)買取相場｜ボトルの見分け方と実勢価格【2026年7月】",
  description:
    `タリスカーの「年代指定なし（NV/ノンエイジ）」はストーム・スカイ・ポートリー・57°ノースなどのボトルが該当します。${nvMedian ? `NVの実勢中央値は${yen(nvMedian)}（参考値）。` : "NVの実勢中央値は現在収集中（毎週更新）。"}年代付き（25年${yen(t25?.median)}）との比較、手元のボトルの見分け方、高く売るコツまで実データで解説。`,
  alternates: { canonical: "/articles/talisker-nv-kaitori/" },
};

const faqs = [
  {
    q: "年代表記のないタリスカーはどのボトルですか？",
    a: "現行では「タリスカー ストーム」「タリスカー スカイ」「タリスカー ポートリー（ポートカスク・フィニッシュ）」「タリスカー 57°ノース（カスクストレングス・57%）」などが年数表記のないノンエイジ（NV）ボトルです。免税店（トラベルリテール）向けには「ダークストーム」もあります。ラベル正面に「10」「18」「25」などの数字がなければ、これらのいずれかの可能性が高いです。",
  },
  {
    q: "年代指定なしのタリスカーでも買取してもらえますか？相場はいくらですか？",
    a: nvMedian
      ? `はい、買取可能です。当サイト集計（ヤフオク過去180日落札・IQR外れ値除去）による年代指定なしタリスカーの実勢中央値は${yen(nvMedian)}です（参考値であり、買取額を保証するものではありません）。比較として、年代付きのタリスカー25年は${yen(t25?.median)}です。実際の査定額は業者・状態により変動するため、複数社での相見積もりをおすすめします。`
      : `はい、買取可能です。年代指定なし（NV）タリスカーの実勢中央値は現在データ収集中です（毎週更新のため近日掲載予定）。参考として、年代付きのタリスカー25年は実勢中央値${yen(t25?.median)}（${fetchedAt}時点・ヤフオク落札中央値）で、現行NVボトルは一般にこれより手頃な価格帯で取引されます。実際の査定額は業者・状態により変動するため、複数社での相見積もりをおすすめします。`,
  },
  {
    q: "年代指定なしのタリスカーを高く売るコツは？",
    a: "(1)外箱・カートン等の付属品を揃える、(2)未開封のまま売る、(3)ボトル名（ストーム／スカイ／ポートリー／57°ノース等）を正確に業者へ伝える、(4)複数業者で相見積もりを取る、(5)直射日光を避け縦置きで保管する、の5つが基本です。特に57°ノースやダークストームのような限定・免税店流通ボトルは、名称を特定して伝えることで評価漏れを防げます。",
  },
];

function FaqSchema() {
  return (
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
  );
}

const tocItems = [
  { id: "sokutou", label: "1. 年代指定なしのタリスカー＝どのボトル？（即答）" },
  { id: "lineup", label: "2. 年数表記のないタリスカーの主なボトルライン" },
  { id: "jissei", label: "3. 実勢データ（NV・年代付きの比較）" },
  { id: "miwakekata", label: "4. 手元のボトルの見分け方" },
  { id: "takaku-uru", label: "5. 高く売る5つのコツ" },
  { id: "faq", label: "6. よくある質問" },
];

export default function TaliskerNvKaitoriPage() {
  return (
    <>
      <FaqSchema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><Link href="/articles/" className="hover:text-amber-dark transition-colors">銘柄一覧</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">タリスカー 年代指定なし(NV)</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/talisker-25.png" alt="タリスカーの年代指定なし(NV)ボトルの買取相場" width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">タリスカーの年代指定なし(NV)買取相場｜ボトルの見分け方と実勢価格【2026年7月】</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-07-15 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-ink mb-2">この記事の結論（30秒）</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              <li>年数表記のないタリスカー＝<strong>ストーム／スカイ／ポートリー／57°ノース</strong>など。免税店向けには<strong>ダークストーム</strong>も。</li>
              <li>{nvMedian ? <>NVの実勢中央値は<strong>{yen(nvMedian)}</strong>（ヤフオク落札・参考値）。</> : <>NVの実勢中央値は<strong>現在データ収集中</strong>（毎週更新のため近日掲載）。</>}年代付きのタリスカー25年は<strong>{yen(t25?.median)}</strong>。</li>
              <li>ボトル名を特定して査定に出すのが高値のカギ。年数表記があるボトルは<Link href="/articles/talisker-25-kaitori/" className="text-amber-dark underline">タリスカー25年</Link>のページへ。</li>
            </ul>
          </div>

          {/* Table of Contents */}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
              {tocItems.map((item) => (
                <li key={item.id}><a href={`#${item.id}`} className="hover:underline">{item.label}</a></li>
              ))}
            </ol>
          </div>

          <h2 id="sokutou">1. 年代指定なしのタリスカー＝どのボトル？（即答）</h2>

          <p>ラベルに「10年」「18年」などの熟成年数表記がないタリスカーは、現行ラインでは<strong>「ストーム」「スカイ」「ポートリー」「57°ノース」</strong>のいずれかである可能性が高いです。いずれもタリスカー蒸溜所の正規ラインナップに属する実在のノンエイジ（NV）ボトルで、それぞれ性格が異なります。</p>

          <p>オークションや買取店では、これらをまとめて「<strong>タリスカー 年代指定なし</strong>」「<strong>タリスカー NV（ノンヴィンテージ）</strong>」と表記することがあります。どのボトルかで市場評価が異なるため、まずは手元のボトル名を確認しましょう。</p>

          <div className="bg-cream/40 border border-amber/40 rounded-xl p-4 my-5 not-prose">
            <p className="text-sm text-ink">🔀 「25年」など熟成年数の表記があるタリスカーをお探しの方はこちら → <Link href="/articles/talisker-25-kaitori/" className="text-amber-dark underline font-bold">タリスカー25年の買取相場</Link></p>
          </div>

          <h2 id="lineup">2. 年数表記のないタリスカーの主なボトルライン</h2>

          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden mb-5 not-prose">
            <Image src="/images/distillery-scotch.png" alt="タリスカー蒸溜所のイメージ" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
          </div>

          <p>タリスカーは1830年創業、スコットランド・スカイ島の蒸溜所です。黒胡椒を思わせるスパイシーさと潮の風味で知られ、定番の10年をはじめとする年数表記ボトルに加えて、以下のノンエイジ（NV）ボトルを展開しています。</p>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>ボトル名</th><th>位置づけ</th><th>特徴</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>ストーム</strong></td><td>現行NV</td><td>2013年発売。10年よりも荒々しくスモーキーな方向に振ったNV</td></tr>
                <tr><td><strong>スカイ</strong></td><td>現行NV</td><td>2015年発売。蒸溜所のあるスカイ島の名を冠した、やや甘口で飲みやすいNV</td></tr>
                <tr><td><strong>ポートリー</strong></td><td>現行NV</td><td>ポートワイン樽でフィニッシュしたNV。名称はスカイ島の港町ポートリーに由来</td></tr>
                <tr><td><strong>57°ノース</strong></td><td>カスクストレングスNV</td><td>アルコール度数57%の高アルコールボトル。名称は蒸溜所の緯度（北緯57度）に由来</td></tr>
                <tr><td><strong>ダークストーム</strong></td><td>免税店向けNV</td><td>トラベルリテール（免税店）限定。強くチャーした樽を使用したスモーキーなNV</td></tr>
              </tbody>
            </table>
          </div>

          <p>同じ「年代指定なし」でも、<strong>どのボトルラインかによって市場での評価は異なります</strong>。特に免税店限定のダークストームや高アルコールの57°ノースは国内流通が少なく、ボトル名の特定が査定の精度を左右します。</p>

          <h2 id="jissei">3. 実勢データ（NV・年代付きの比較）</h2>

          {nvMedian ? (
            <div className="bg-white border border-warm-border rounded-xl p-5 my-6 not-prose">
              <p className="text-sm font-bold text-ink mb-1">年代指定なしタリスカーの今週の実勢中央値</p>
              <p className="text-3xl font-bold text-amber-dark">{yen(nvMedian)}</p>
              <p className="text-[11px] text-warm-gray leading-relaxed mt-2">出典: ヤフオク実落札データ（過去180日・IQR外れ値除去{nv?.filtered_n ? `・n=${nv.filtered_n}件` : ""}{nv?.fetched_at ? `・取得日 ${nv.fetched_at}` : ""}）・毎週更新。参考値であり、買取額を保証するものではありません。</p>
            </div>
          ) : (
            <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 my-6 not-prose">
              <p className="text-sm font-bold text-ink mb-1">年代指定なしタリスカーの実勢中央値: データ収集中</p>
              <p className="text-sm text-warm-gray leading-relaxed">NVボトル（ストーム／スカイ等）の落札データは現在集計中です。当サイトはヤフオク実落札（過去180日・IQR外れ値除去）の中央値を毎週更新しており、十分なサンプルが集まり次第このページに掲載します。</p>
            </div>
          )}

          <p>参考として、<strong>年代付きタリスカーの実勢中央値</strong>（ヤフオク過去180日落札・IQR外れ値除去・毎週更新）は以下の通りです。現行NVボトルは一般にこれより手頃な価格帯で取引されます。</p>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>ボトル</th><th>実勢中央値</th><th>サンプル数</th><th>詳細ページ</th></tr>
              </thead>
              <tbody>
                <tr><td>タリスカー25年</td><td><strong>{yen(t25?.median)}</strong></td><td>n={t25?.filtered_n ?? "—"}</td><td><Link href="/articles/talisker-25-kaitori/" className="text-amber-dark underline">25年の買取相場</Link></td></tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-warm-gray">※ 実勢中央値は二次流通（オークション）の落札水準であり、{fetchedAt ? `取得日 ${fetchedAt}時点の` : ""}参考値です。業者の買取査定額は在庫状況・状態評価により変動するため、特定の買取額を保証するものではありません。</p>

          <h2 id="miwakekata">4. 手元のボトルの見分け方</h2>

          <p>「もらいもののタリスカー、年代がわからない」という場合は、以下の順で確認すると特定できます。</p>

          <ol>
            <li><strong>ラベル正面の数字を確認</strong> — 「10」「18」「25」などの数字（YEARS OLD表記）があれば年代付きボトル。数字がなければNVボトルです</li>
            <li><strong>ボトル名の表記を確認</strong> — 「STORM」「SKYE」「PORT RUIGHE」「57° NORTH」「DARK STORM」などの名称がラベルに記載されています。この名称がそのままボトルラインの特定材料になります</li>
            <li><strong>アルコール度数を確認</strong> — 57%と記載があれば57°ノースです。通常のNVボトルは45.8%が基本です</li>
            <li><strong>キャップ・封緘の状態</strong> — 未開封かどうかで査定は大きく変わります。キャップシールの破れ・緩みがないか確認しましょう</li>
            <li><strong>裏ラベル・輸入シール</strong> — 正規輸入品には日本語の輸入者表示シールが貼られています。免税店購入品（ダークストーム等）はこれがない場合があり、その旨を業者に伝えると査定がスムーズです</li>
          </ol>

          <p>どうしても特定できない場合は、無理に判断せず<strong>ボトル全体・ラベル正面・裏ラベルの写真を撮って査定に出す</strong>のが確実です。お酒買取専門店なら写真からボトルラインを特定してくれます。</p>

          <h2 id="takaku-uru">5. 年代指定なしのタリスカーを高く売る5つのコツ</h2>

          <ol>
            <li><strong>外箱・カートンを揃える</strong> — 付属品の有無で査定額が変動します。箱がなくても売却は可能ですが、あれば必ず一緒に</li>
            <li><strong>未開封のまま売る</strong> — 開封済みは大幅減額。飲まずに売ると決めたら開けないこと</li>
            <li><strong>ボトル名を正確に伝える</strong> — 「タリスカーの年代なし」ではなく「ストーム」「57°ノース」と特定して伝えると、限定・免税店流通ボトルの評価漏れを防げます</li>
            <li><strong>複数業者で相見積もり</strong> — 同じボトルでも業者により査定額が10〜20%異なることがあります。最低3社での比較が鉄則</li>
            <li><strong>適切な保管環境を維持</strong> — 直射日光を避け、縦置きで保管。液面低下・ラベル褪色は減額要因です</li>
          </ol>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">年代指定なしのタリスカーの無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">ボトル名が特定できなくても写真査定OK。複数業者の査定を比較して、最高値を引き出しましょう。査定無料・キャンセル無料。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="burgundy-cta block text-center text-sm py-3 rounded-lg">JOYLABで専門査定</a>
              <a href="https://www.buysell-onlineshop.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2 id="faq">6. よくある質問</h2>

          <div className="space-y-3 not-prose">
            {faqs.map((faq) => (
              <details key={faq.q} className="bg-white border border-warm-border rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 font-medium text-sm">
                  <span>{faq.q}</span>
                  <svg className="w-5 h-5 text-warm-gray flex-shrink-0 ml-4 faq-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-sm text-warm-gray leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>

          <h2>関連ページ</h2>
          <ul>
            <li><Link href="/articles/whisky-nv-toha/" className="text-amber-dark hover:underline font-bold">ウイスキーの「年代指定なし(NV)」とは？買取での扱いと相場の見方</Link></li>
            <li><Link href="/articles/talisker-25-kaitori/" className="text-amber-dark hover:underline">タリスカー25年の買取相場</Link></li>
            <li><Link href="/articles/bowmore-nv-kaitori/" className="text-amber-dark hover:underline">ボウモアの年代指定なし(NV)買取相場</Link></li>
            <li><Link href="/articles/laphroaig-nv-kaitori/" className="text-amber-dark hover:underline">ラフロイグの年代指定なし(NV)買取相場</Link></li>
            <li><Link href="/souba-ranking/" className="text-amber-dark hover:underline">ウイスキー買取相場ランキング</Link></li>
          </ul>

          <p className="text-xs text-warm-gray mt-8">※本記事の実勢中央値は Yahoo Auctions 過去180日落札データの中央値{fetchedAt ? `（取得日 ${fetchedAt}）` : ""}であり、参考値です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動し、特定の買取額を保証するものではありません。最新の査定額は各業者ページで直接ご確認ください。当サイトはアフィリエイト広告（PR）を含みます。</p>
        </article>
      </div>
    </>
  );
}
