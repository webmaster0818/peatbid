import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import medians from "@/data/yahoo-medians.json";

type MedianEntry = { median?: number; filtered_n?: number; fetched_at?: string; insufficient?: boolean };
const m = medians as Record<string, MedianEntry | undefined>;
const nv = m["bowmore-nv"];
const nvMedian = nv && !nv.insufficient && nv.median ? nv.median : null;
const b18 = m["bowmore-18"];
const b25 = m["bowmore-25"];
const yen = (v?: number) => (v ? `${v.toLocaleString("ja-JP")}円` : "—");
const fetchedAt = b18?.fetched_at ?? b25?.fetched_at ?? "";

export const metadata: Metadata = {
  title: "ボウモアの年代指定なし(NV)買取相場｜ボトルの見分け方と実勢価格【2026年7月】",
  description:
    `ボウモアの「年代指定なし（NV/ノンエイジ）」はNo.1・スモールバッチ・レジェンドなどのボトルが該当します。${nvMedian ? `NVの実勢中央値は${yen(nvMedian)}（参考値）。` : "NVの実勢中央値は現在収集中（毎週更新）。"}年代付き（18年${yen(b18?.median)}・25年${yen(b25?.median)}）との比較、手元のボトルの見分け方、高く売るコツまで実データで解説。`,
  alternates: { canonical: "/articles/bowmore-nv-kaitori/" },
};

const faqs = [
  {
    q: "年代表記のないボウモアはどのボトルですか？",
    a: "現行では「ボウモア No.1」（ファーストフィル・バーボン樽原酒主体のノンエイジ）が代表です。ほかに過去に流通した「スモールバッチ」「レジェンド」、免税店（トラベルリテール）向けの「ゴールドリーフ」「ブラックロック」などが年数表記のないボトルに該当します。ラベル正面に「12」「18」「25」などの数字がなければ、これらのいずれかの可能性が高いです。",
  },
  {
    q: "年代指定なしのボウモアでも買取してもらえますか？相場はいくらですか？",
    a: nvMedian
      ? `はい、買取可能です。当サイト集計（ヤフオク過去180日落札・IQR外れ値除去）による年代指定なしボウモアの実勢中央値は${yen(nvMedian)}です（参考値であり、買取額を保証するものではありません）。比較として、年代付きのボウモア18年は${yen(b18?.median)}、25年は${yen(b25?.median)}です。実際の査定額は業者・状態により変動するため、複数社での相見積もりをおすすめします。`
      : `はい、買取可能です。年代指定なし（NV）ボウモアの実勢中央値は現在データ収集中です（毎週更新のため近日掲載予定）。参考として、年代付きのボウモア18年は実勢中央値${yen(b18?.median)}、25年は${yen(b25?.median)}（${fetchedAt}時点・ヤフオク落札中央値）で、現行NVボトルは一般にこれより手頃な価格帯で取引されます。実際の査定額は業者・状態により変動するため、複数社での相見積もりをおすすめします。`,
  },
  {
    q: "年代指定なしのボウモアを高く売るコツは？",
    a: "(1)外箱・カートン等の付属品を揃える、(2)未開封のまま売る、(3)ボトル名（No.1／スモールバッチ等）を正確に業者へ伝える、(4)複数業者で相見積もりを取る、(5)直射日光を避け縦置きで保管する、の5つが基本です。終売・旧流通ボトル（スモールバッチ・レジェンド等）は現行品より評価が乗る場合があるため、ボトル名の特定が特に重要です。",
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
  { id: "sokutou", label: "1. 年代指定なしのボウモア＝どのボトル？（即答）" },
  { id: "lineup", label: "2. 年数表記のないボウモアの主なボトルライン" },
  { id: "jissei", label: "3. 実勢データ（NV・年代付きの比較）" },
  { id: "miwakekata", label: "4. 手元のボトルの見分け方" },
  { id: "takaku-uru", label: "5. 高く売る5つのコツ" },
  { id: "faq", label: "6. よくある質問" },
];

export default function BowmoreNvKaitoriPage() {
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
            <li><span className="text-foreground">ボウモア 年代指定なし(NV)</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/bowmore-18.png" alt="ボウモアの年代指定なし(NV)ボトルの買取相場" width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">ボウモアの年代指定なし(NV)買取相場｜ボトルの見分け方と実勢価格【2026年7月】</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-07-15 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-ink mb-2">この記事の結論（30秒）</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              <li>年数表記のないボウモア＝現行では<strong>「ボウモア No.1」</strong>が代表。ほかに旧流通の<strong>スモールバッチ・レジェンド</strong>、免税店向けの<strong>ゴールドリーフ／ブラックロック</strong>など。</li>
              <li>{nvMedian ? <>NVの実勢中央値は<strong>{yen(nvMedian)}</strong>（ヤフオク落札・参考値）。</> : <>NVの実勢中央値は<strong>現在データ収集中</strong>（毎週更新のため近日掲載）。</>}年代付きは18年 <strong>{yen(b18?.median)}</strong>・25年 <strong>{yen(b25?.median)}</strong>。</li>
              <li>ボトル名を特定して査定に出すのが高値のカギ。年数表記があるボトルは<Link href="/articles/bowmore-18-kaitori/" className="text-amber-dark underline">18年</Link>・<Link href="/articles/bowmore-25-kaitori/" className="text-amber-dark underline">25年</Link>の各ページへ。</li>
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

          <h2 id="sokutou">1. 年代指定なしのボウモア＝どのボトル？（即答）</h2>

          <p>ラベルに「12年」「18年」などの熟成年数表記がないボウモアは、<strong>「ボウモア No.1（ナンバーワン）」</strong>である可能性が最も高いです。No.1は現行ラインナップのエントリーにあたるノンエイジ（NV）ボトルで、ファーストフィル・バーボン樽で熟成した原酒を主体としています。</p>

          <p>そのほか、年数表記のないボウモアには、過去に流通した<strong>「スモールバッチ」</strong>や1990年代〜2000年代のエントリーボトル<strong>「レジェンド」</strong>、免税店（トラベルリテール）向けの<strong>「ゴールドリーフ」「ブラックロック」</strong>などがあります。オークションや買取店ではこれらをまとめて「<strong>ボウモア 年代指定なし</strong>」「<strong>ボウモア NV（ノンヴィンテージ）</strong>」と表記することがあります。</p>

          <div className="bg-cream/40 border border-amber/40 rounded-xl p-4 my-5 not-prose">
            <p className="text-sm text-ink">🔀 「18年」「25年」など熟成年数の表記があるボウモアをお探しの方はこちら → <Link href="/articles/bowmore-18-kaitori/" className="text-amber-dark underline font-bold">ボウモア18年の買取相場</Link> / <Link href="/articles/bowmore-25-kaitori/" className="text-amber-dark underline font-bold">ボウモア25年の買取相場</Link></p>
          </div>

          <h2 id="lineup">2. 年数表記のないボウモアの主なボトルライン</h2>

          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden mb-5 not-prose">
            <Image src="/images/distillery-scotch.png" alt="ボウモア蒸溜所のイメージ" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
          </div>

          <p>ボウモアは1779年創業、アイラ島最古とされる蒸溜所です。潮の香りと穏やかなスモーキーさのバランスで知られ、年数表記のあるボトル（12年・15年・18年・25年など）に加えて、以下のようなノンエイジ（NV）ボトルを展開してきました。</p>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>ボトル名</th><th>位置づけ</th><th>特徴</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>ボウモア No.1</strong></td><td>現行スタンダードNV</td><td>ファーストフィル・バーボン樽原酒主体。バニラと潮気のバランス。現行流通品</td></tr>
                <tr><td><strong>スモールバッチ</strong></td><td>旧流通品</td><td>バーボン樽熟成のNV。2010年代に流通し、現在は市場での流通が少ない</td></tr>
                <tr><td><strong>レジェンド</strong></td><td>旧エントリーNV</td><td>1990年代〜2000年代に流通した年数表記なしボトル。現在は中古市場が中心</td></tr>
                <tr><td><strong>ゴールドリーフ／ブラックロック</strong></td><td>免税店向けNV</td><td>トラベルリテール（免税店）限定。国内流通が少なく、ボトル名の特定が査定のカギ</td></tr>
              </tbody>
            </table>
          </div>

          <p>同じ「年代指定なし」でも、<strong>どのボトルラインかによって市場での評価は異なります</strong>。特に旧流通品（スモールバッチ・レジェンド）や免税店限定品は現在入手しにくいため、状態が良ければ評価が乗る場合があります。査定に出す前にボトル名を確認しましょう。</p>

          <p>なお、超高額で知られる<Link href="/articles/bowmore-blackbowmore-kaitori/" className="text-amber-dark underline">ブラックボウモア</Link>はヴィンテージ（蒸溜年）表記のある別格のコレクターズボトルで、本ページのNVボトルとは全く異なる価格帯です。</p>

          <h2 id="jissei">3. 実勢データ（NV・年代付きの比較）</h2>

          {nvMedian ? (
            <div className="bg-white border border-warm-border rounded-xl p-5 my-6 not-prose">
              <p className="text-sm font-bold text-ink mb-1">年代指定なしボウモアの今週の実勢中央値</p>
              <p className="text-3xl font-bold text-amber-dark">{yen(nvMedian)}</p>
              <p className="text-[11px] text-warm-gray leading-relaxed mt-2">出典: ヤフオク実落札データ（過去180日・IQR外れ値除去{nv?.filtered_n ? `・n=${nv.filtered_n}件` : ""}{nv?.fetched_at ? `・取得日 ${nv.fetched_at}` : ""}）・毎週更新。参考値であり、買取額を保証するものではありません。</p>
            </div>
          ) : (
            <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 my-6 not-prose">
              <p className="text-sm font-bold text-ink mb-1">年代指定なしボウモアの実勢中央値: データ収集中</p>
              <p className="text-sm text-warm-gray leading-relaxed">NVボトル（No.1等）の落札データは現在集計中です。当サイトはヤフオク実落札（過去180日・IQR外れ値除去）の中央値を毎週更新しており、十分なサンプルが集まり次第このページに掲載します。</p>
            </div>
          )}

          <p>参考として、<strong>年代付きボウモアの実勢中央値</strong>（ヤフオク過去180日落札・IQR外れ値除去・毎週更新）は以下の通りです。現行NVボトルは一般にこれより手頃な価格帯で取引されます。</p>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>ボトル</th><th>実勢中央値</th><th>サンプル数</th><th>詳細ページ</th></tr>
              </thead>
              <tbody>
                <tr><td>ボウモア18年</td><td><strong>{yen(b18?.median)}</strong></td><td>n={b18?.filtered_n ?? "—"}</td><td><Link href="/articles/bowmore-18-kaitori/" className="text-amber-dark underline">18年の買取相場</Link></td></tr>
                <tr><td>ボウモア25年</td><td><strong>{yen(b25?.median)}</strong></td><td>n={b25?.filtered_n ?? "—"}</td><td><Link href="/articles/bowmore-25-kaitori/" className="text-amber-dark underline">25年の買取相場</Link></td></tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-warm-gray">※ 実勢中央値は二次流通（オークション）の落札水準であり、{fetchedAt ? `取得日 ${fetchedAt}時点の` : ""}参考値です。業者の買取査定額は在庫状況・状態評価により変動するため、特定の買取額を保証するものではありません。</p>

          <h2 id="miwakekata">4. 手元のボトルの見分け方</h2>

          <p>「実家から出てきたボウモア、年代がわからない」という場合は、以下の順で確認すると特定できます。</p>

          <ol>
            <li><strong>ラベル正面の数字を確認</strong> — 「12」「15」「18」「25」などの数字（YEARS OLD表記）があれば年代付きボトル。数字がなければNVボトルです</li>
            <li><strong>ボトル名の表記を確認</strong> — 「No.1」「SMALL BATCH」「LEGEND」「GOLD REEF」「BLACK ROCK」などの名称がラベルに記載されています。この名称がそのままボトルラインの特定材料になります</li>
            <li><strong>キャップ・封緘の状態</strong> — 未開封かどうかで査定は大きく変わります。キャップシールの破れ・緩みがないか確認しましょう</li>
            <li><strong>ボトル形状・ラベルデザイン</strong> — 旧流通品（レジェンド等）は現行品とラベルデザインが異なります。デザインが古い場合は流通時期のヒントになります</li>
            <li><strong>裏ラベル・輸入シール</strong> — 正規輸入品には日本語の輸入者表示シールが貼られています。並行輸入品・免税店購入品はこれがない場合があり、その旨を業者に伝えると査定がスムーズです</li>
          </ol>

          <p>どうしても特定できない場合は、無理に判断せず<strong>ボトル全体・ラベル正面・裏ラベルの写真を撮って査定に出す</strong>のが確実です。お酒買取専門店なら写真からボトルラインを特定してくれます。</p>

          <h2 id="takaku-uru">5. 年代指定なしのボウモアを高く売る5つのコツ</h2>

          <ol>
            <li><strong>外箱・カートンを揃える</strong> — 付属品の有無で査定額が変動します。箱がなくても売却は可能ですが、あれば必ず一緒に</li>
            <li><strong>未開封のまま売る</strong> — 開封済みは大幅減額。飲まずに売ると決めたら開けないこと</li>
            <li><strong>ボトル名を正確に伝える</strong> — 「ボウモアの年代なし」ではなく「ボウモア No.1」「スモールバッチ」と特定して伝えると、旧流通品・限定品の評価漏れを防げます</li>
            <li><strong>複数業者で相見積もり</strong> — 同じボトルでも業者により査定額が10〜20%異なることがあります。最低3社での比較が鉄則</li>
            <li><strong>適切な保管環境を維持</strong> — 直射日光を避け、縦置きで保管。液面低下・ラベル褪色は減額要因です</li>
          </ol>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">年代指定なしのボウモアの無料一括査定はこちら</h3>
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
            <li><Link href="/articles/bowmore-18-kaitori/" className="text-amber-dark hover:underline">ボウモア18年の買取相場</Link></li>
            <li><Link href="/articles/bowmore-25-kaitori/" className="text-amber-dark hover:underline">ボウモア25年の買取相場</Link></li>
            <li><Link href="/articles/bowmore-blackbowmore-kaitori/" className="text-amber-dark hover:underline">ブラックボウモアの買取相場</Link></li>
            <li><Link href="/articles/bowmore-nisemono-mikata/" className="text-amber-dark hover:underline">ボウモアの偽物の見分け方・真贋ハブ</Link></li>
            <li><Link href="/articles/talisker-nv-kaitori/" className="text-amber-dark hover:underline">タリスカーの年代指定なし(NV)買取相場</Link></li>
            <li><Link href="/articles/laphroaig-nv-kaitori/" className="text-amber-dark hover:underline">ラフロイグの年代指定なし(NV)買取相場</Link></li>
            <li><Link href="/souba-ranking/" className="text-amber-dark hover:underline">ウイスキー買取相場ランキング</Link></li>
          </ul>

          <p className="text-xs text-warm-gray mt-8">※本記事の実勢中央値は Yahoo Auctions 過去180日落札データの中央値{fetchedAt ? `（取得日 ${fetchedAt}）` : ""}であり、参考値です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動し、特定の買取額を保証するものではありません。最新の査定額は各業者ページで直接ご確認ください。当サイトはアフィリエイト広告（PR）を含みます。</p>
        </article>
      </div>
    </>
  );
}
