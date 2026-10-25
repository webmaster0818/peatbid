import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import medians from "@/data/yahoo-medians.json";

type MedianEntry = { median?: number | null; filtered_n?: number | null; fetched_at?: string; insufficient?: boolean };
const m = medians as Record<string, MedianEntry | undefined>;
const nv = m["laphroaig-nv"];
const nvMedian = nv && !nv.insufficient && nv.median ? nv.median : null;
const l25 = m["laphroaig-25"];
const yen = (v?: number | null) => (v ? `${v.toLocaleString("ja-JP")}円` : "—");
const fetchedAt = l25?.fetched_at ?? "";

export const metadata: Metadata = {
  title: "ラフロイグ 年代指定なしの買取価格【2026年10月】セレクト2,000〜3,500円・ロア・トリプルウッド｜店舗の掲示価格",
  description:
    "ラフロイグの年代指定なし（NV）の買取価格を店舗の掲示価格で確認（2026年10月25日）。セレクト2,000〜3,500円、ロア6,000円、トリプルウッド10,000円。PXカスクの買取実績、10年・25年との比較、ボトルの見分け方も掲載しています。",
  alternates: { canonical: "/articles/laphroaig-nv-kaitori/" },
};

const faqs = [
  {
    q: "年代表記のないラフロイグはどのボトルですか？",
    a: "現行では「セレクト」「クォーターカスク」「トリプルウッド」「ロア」などが年数表記のないノンエイジ（NV）ボトルです。免税店（トラベルリテール）向けには「PXカスク」などもあります。ラベル正面に「10」「18」「25」などの数字がなければ、これらのいずれかであると考えられます。なお「10年カスクストレングス」は年数表記のあるボトルなのでNVには含まれません。",
  },
  {
    q: "年代指定なしのラフロイグでも買取してもらえますか？相場はいくらですか？",
    a: nvMedian
      ? `はい、買取可能です。買取店の掲示価格（2026-10-25確認）は、セレクト 2,000〜3,500円（LINXAS・ストックラボ）、ロア 6,000円・トリプルウッド 10,000円（LINXAS）です。当サイト集計（ヤフオク過去180日落札・IQR外れ値除去）による年代指定なしラフロイグの実勢中央値は${yen(nvMedian)}です（参考値であり、買取額を保証するものではありません）。比較として、年代付きのラフロイグ25年は${yen(l25?.median)}です。実際の査定額は業者・状態により変動するため、複数社での相見積もりをおすすめします。`
      : `はい、買取可能です。買取店の掲示価格（2026-10-25確認）は、セレクト 2,000〜3,500円（LINXAS・ストックラボ）、ロア 6,000円・トリプルウッド 10,000円（LINXAS）です。年代指定なし（NV）ラフロイグの実勢中央値は現在集計中です（毎週更新のため、近日掲載予定）。参考として、年代付きのラフロイグ25年は実勢中央値${yen(l25?.median)}（${fetchedAt}時点・ヤフオク落札中央値）で、現行NVボトルは一般にこれより手頃な価格帯で取引されます。実際の査定額は業者・状態により変動するため、複数社での相見積もりをおすすめします。`,
  },
  {
    q: "年代指定なしのラフロイグを高く売るコツは？",
    a: "(1)外箱・カートン等の付属品を揃える、(2)未開封のまま売る、(3)ボトル名（セレクト／クォーターカスク／トリプルウッド／ロア等）を正確に業者へ伝える、(4)複数業者で相見積もりを取る、(5)直射日光を避け縦置きで保管する、の5つが基本です。特にロアや免税店流通のPXカスクは国内流通が少なく、名称を特定して伝えることで評価漏れを防げます。",
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
  { id: "sokutou", label: "1. 年代指定なしのラフロイグに該当するボトル" },
  { id: "lineup", label: "2. 年数表記のないラフロイグの主なボトルライン" },
  { id: "store-prices", label: "3. 買取店の掲示価格（セレクト・ロア・トリプルウッド）" },
  { id: "jissei", label: "3-2. ヤフオク実勢データ（NV・年代付きの比較）" },
  { id: "miwakekata", label: "4. 手元のボトルの見分け方" },
  { id: "takaku-uru", label: "5. 高く売る5つのコツ" },
  { id: "faq", label: "6. よくある質問" },
];

export default function LaphroaigNvKaitoriPage() {
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
            <li><span className="text-foreground">ラフロイグ 年代指定なし(NV)</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/laphroaig-25.png" alt="ラフロイグの年代指定なし(NV)ボトルの買取相場" width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">ラフロイグの年代指定なし(NV)買取相場｜ボトルの見分け方と実勢価格【2026年10月】</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-10-25 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-ink mb-2">この記事の結論（30秒）</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              <li>年数表記のないラフロイグには、<strong>セレクト／クォーターカスク／トリプルウッド／ロア</strong>などがあります。免税店向けには<strong>PXカスク</strong>も。</li>
              <li>買取店の掲示価格（2026-10-25確認）は、<strong>セレクト 2,000〜3,500円・ロア 6,000円・トリプルウッド 10,000円</strong>です（<a href="#store-prices" className="text-amber-dark underline">店舗別の表</a>）。</li>
              <li>{nvMedian ? <>NVの実勢中央値は<strong>{yen(nvMedian)}</strong>（ヤフオク落札・参考値）です。</> : <>NVの実勢中央値は<strong>現在集計中</strong>です（毎週更新のため、近日掲載予定）。</>}年代付きのラフロイグ25年は<strong>{yen(l25?.median)}</strong>です。</li>
              <li>ボトル名を特定してから査定に出すことが、適正な査定額につながります。年数表記があるボトルは<Link href="/articles/laphroaig-25-kaitori/" className="text-amber-dark underline">ラフロイグ25年</Link>のページをご覧ください。</li>
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

          <h2 id="sokutou">1. 年代指定なしのラフロイグに該当するボトル</h2>

          <p>ラベルに「10年」「18年」などの熟成年数表記がないラフロイグは、現行ラインでは<strong>「セレクト」「クォーターカスク」「トリプルウッド」「ロア」</strong>のいずれかであると考えられます。いずれもラフロイグ蒸溜所の正規ラインナップに属する実在のノンエイジ（NV）ボトルで、樽使いの違いで性格が分かれます。</p>

          <p>オークションや買取店では、これらをまとめて「<strong>ラフロイグ 年代指定なし</strong>」「<strong>ラフロイグ NV（ノンヴィンテージ）</strong>」と表記することがあります。ボトルによって市場での評価が異なるため、まずはお手元のボトル名をご確認ください。なお、人気の<strong>「10年カスクストレングス」は「10年」の年数表記があるボトル</strong>なので、NVではなく年代付きの扱いになります。</p>

          <div className="bg-cream/40 border border-amber/40 rounded-xl p-4 my-5 not-prose">
            <p className="text-sm text-ink">🔀 「25年」など熟成年数の表記があるラフロイグをお探しの方はこちら → <Link href="/articles/laphroaig-25-kaitori/" className="text-amber-dark underline font-bold">ラフロイグ25年の買取相場</Link></p>
          </div>

          <h2 id="lineup">2. 年数表記のないラフロイグの主なボトルライン</h2>

          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden mb-5 not-prose">
            <Image src="/images/distillery-scotch.png" alt="ラフロイグ蒸溜所のイメージ" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
          </div>

          <p>ラフロイグは1815年創業、スコットランド・アイラ島の蒸溜所です。ヨード・薬品香とも形容される強烈なピート香で知られ、定番の10年をはじめとする年数表記ボトルに加えて、以下のノンエイジ（NV）ボトルを展開しています。</p>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>ボトル名</th><th>位置づけ</th><th>特徴</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>セレクト</strong></td><td>現行エントリーNV</td><td>2014年発売。複数タイプの樽（バーボン樽・シェリー樽等）の原酒をヴァッティングしたエントリーボトル</td></tr>
                <tr><td><strong>クォーターカスク</strong></td><td>現行NV</td><td>通常より小さい「クォーターカスク（小樽）」で追加熟成。樽との接触面積が大きく、濃厚な味わい</td></tr>
                <tr><td><strong>トリプルウッド</strong></td><td>現行NV</td><td>バーボン樽→クォーターカスク→ヨーロピアンオークのシェリー樽と3段階の樽で熟成</td></tr>
                <tr><td><strong>ロア（Lore）</strong></td><td>現行上位NV</td><td>2016年発売。複数の樽・熟成年数の原酒を組み合わせた、NVラインの上位ボトル</td></tr>
                <tr><td><strong>PXカスク</strong></td><td>免税店向けNV</td><td>ペドロヒメネス（PX）シェリー樽でフィニッシュ。トラベルリテール（免税店）中心の流通</td></tr>
              </tbody>
            </table>
          </div>

          <p>同じ「年代指定なし」でも、<strong>どのボトルラインかによって市場での評価は異なります</strong>。エントリーのセレクトと上位のロアでは定価の段階から差があり、免税店中心のPXカスクは国内流通が少ないため、ボトル名の特定が査定の精度を左右します。</p>

          <h2 id="store-prices">3. 買取店の掲示価格（セレクト・ロア・トリプルウッド）</h2>

          <p>買取店が自社サイトに公開している、年数表記のないラフロイグの参考買取価格です。PeatBid編集部が 2026-10-25 に各ページで確認しました（「店舗側の更新日」は各ページに記載の価格更新日）。10年は年数表記があるため【参考】として載せています。</p>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>店舗</th><th>ボトル</th><th>掲示価格</th><th>店舗側の更新日</th></tr>
              </thead>
              <tbody>
                <tr><td>LINXAS（リンクサス）</td><td>ラフロイグセレクト</td><td><strong>2,000円/2,000円</strong></td><td>2026-09-30</td></tr><tr><td>ストックラボ</td><td>ラフロイグ セレクト</td><td><strong>2,500円〜3,500円</strong></td><td>2026-10-24</td></tr><tr><td>LINXAS（リンクサス）</td><td>ラフロイグロア</td><td><strong>6,000円</strong></td><td>2026-09-30</td></tr><tr><td>LINXAS（リンクサス）</td><td>ラフロイグカーディストリプルウッド</td><td><strong>10,000円</strong></td><td>2026-09-30</td></tr><tr><td>LINXAS（リンクサス）</td><td>【参考】ラフロイグカーディス200周年記念2015（限定品）</td><td><strong>27,000円</strong></td><td>2026-09-30</td></tr><tr><td>LINXAS（リンクサス）</td><td>【参考】ラフロイグ10年新</td><td><strong>3,000円/2,500円</strong></td><td>2026-09-30</td></tr><tr><td>ストックラボ</td><td>【参考】ラフロイグ 10年</td><td><strong>3,500円〜4,500円</strong></td><td>2026-10-24</td></tr>
              </tbody>
            </table>
          </div>

          <p>セレクトは LINXAS が箱付・箱無とも 2,000円、ストックラボが 2,500〜3,500円 です。ロアは 6,000円、トリプルウッド（LINXAS の表記は「カーディストリプルウッド」）は 10,000円 で、同じ年数表記なしでもボトルによって5倍の差があります。<strong>クォーターカスクと PXカスクは、確認した店の価格表に行がありません</strong>（2026-10-25時点）。ストックラボの月別買取相場では、セレクトは 2025年2月〜2026年4月に 1,800〜2,500円 で推移しています（2026年5〜9月は実績なし）。</p>

          <p className="text-sm font-bold mt-4">各店が公開している買取実績（年数表記なし）</p>
          <ul className="text-sm"><li>2026-06-02　ラフロイグ PX カスク 1000ml　<strong>7,500円</strong>（ファイブニーズ）</li><li>2024-08-10　ラフロイグ セレクト 350ml　<strong>500円</strong>（ファイブニーズ）</li><li>2024-07-30　ラフロイグ カーディス 2024 700ml　<strong>16,000円</strong>（ファイブニーズ）</li><li>2025-01-16　ラフロイグ セレクト　<strong>2,000円</strong>（LINXAS（リンクサス））</li><li>2026-09-03　【参考】ラフロイグ 10年 オリジナル カスクストレングス バッチ016 58.5% 700ml　<strong>9,500円</strong>（ファイブニーズ）</li><li>2026-05-02　【参考】ラフロイグ 10年 旧ボトル 700ml　<strong>11,000円</strong>（ファイブニーズ）</li><li>2024-12-07　【参考】ラフロイグ シングルモルト 10年 750ml　<strong>2,500円</strong>（ファイブニーズ）</li><li>2024-08-12　【参考】ラフロイグ 10年 700ml　<strong>3,000円</strong>（ファイブニーズ）</li></ul>

          <p className="text-[11px] text-warm-gray">出典: <a href="https://linxas.shop/whiskey/laphroaig/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">LINXAS「ラフロイグ 買取」</a>・<a href="https://www.stock-lab.com/osake-kaitori/whiskey/laphroaig/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">ストックラボ「ラフロイグの買取」</a>・<a href="https://www.sakekaitori.com/whisky/scotch_whiskey/laphroaig_brand/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">ファイブニーズ「ラフロイグ」</a>（2026-10-25確認）。各店の参考価格であり、実際の買取額を保証するものではありません。大黒屋・リカスタ・買取大吉では、確認した範囲で年数表記のないラフロイグの掲示価格は見つかりませんでした。</p>

          <h2 id="jissei">3-2. ヤフオク実勢データ（NV・年代付きの比較）</h2>

          {nvMedian ? (
            <div className="bg-white border border-warm-border rounded-xl p-5 my-6 not-prose">
              <p className="text-sm font-bold text-ink mb-1">年代指定なしラフロイグの今週の実勢中央値</p>
              <p className="text-3xl font-bold text-amber-dark">{yen(nvMedian)}</p>
              <p className="text-[11px] text-warm-gray leading-relaxed mt-2">出典: ヤフオク実落札データ（過去180日・IQR外れ値除去{nv?.filtered_n ? `・n=${nv.filtered_n}件` : ""}{nv?.fetched_at ? `・取得日 ${nv.fetched_at}` : ""}）・毎週更新。参考値であり、買取額を保証するものではありません。</p>
            </div>
          ) : (
            <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 my-6 not-prose">
              <p className="text-sm font-bold text-ink mb-1">年代指定なしラフロイグの実勢中央値: データ収集中</p>
              <p className="text-sm text-warm-gray leading-relaxed">NVボトル（セレクト／クォーターカスク等）の落札データは現在集計中です。当サイトはヤフオク実落札（過去180日・IQR外れ値除去）の中央値を毎週更新しており、十分なサンプルが集まり次第このページに掲載します。</p>
            </div>
          )}

          <p>参考として、<strong>年代付きラフロイグの実勢中央値</strong>（ヤフオク過去180日落札・IQR外れ値除去・毎週更新）は以下の通りです。現行NVボトルは一般にこれより手頃な価格帯で取引されます。</p>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>ボトル</th><th>実勢中央値</th><th>サンプル数</th><th>詳細ページ</th></tr>
              </thead>
              <tbody>
                <tr><td>ラフロイグ25年</td><td><strong>{yen(l25?.median)}</strong></td><td>n={l25?.filtered_n ?? "—"}</td><td><Link href="/articles/laphroaig-25-kaitori/" className="text-amber-dark underline">25年の買取相場</Link></td></tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-warm-gray">※ 実勢中央値は二次流通（オークション）の落札水準であり、{fetchedAt ? `取得日 ${fetchedAt}時点の` : ""}参考値です。業者の買取査定額は在庫状況・状態評価により変動するため、特定の買取額を保証するものではありません。</p>

          <h2 id="miwakekata">4. 手元のボトルの見分け方</h2>

          <p>「棚から出てきたラフロイグ、年代がわからない」という場合は、以下の順で確認すると特定できます。</p>

          <ol>
            <li><strong>ラベル正面の数字を確認</strong> — 「10」「18」「25」などの数字（YEARS OLD表記）があれば、年代付きのボトルです。数字がなければNVボトルです</li>
            <li><strong>ボトル名の表記を確認</strong> — 「SELECT」「QUARTER CASK」「TRIPLE WOOD」「LORE」「PX CASK」などの名称が緑瓶の白ラベルに記載されています。この名称がそのままボトルラインの特定材料になります</li>
            <li><strong>「CASK STRENGTH」表記に注意</strong> — 「10 YEARS OLD CASK STRENGTH」とあれば年数表記のある10年カスクストレングスで、NVではありません。バッチ番号（Batch No.）の記載も特徴です</li>
            <li><strong>キャップ・封緘の状態</strong> — 未開封かどうかで査定は大きく変わります。キャップシールの破れ・緩みがないかご確認ください</li>
            <li><strong>裏ラベル・輸入シール</strong> — 正規輸入品には日本語の輸入者表示シールが貼られています。免税店購入品（PXカスク等）はこれがない場合があり、その旨を業者に伝えると査定がスムーズです</li>
          </ol>

          <p>どうしても特定できない場合は、無理に判断せず<strong>ボトル全体・ラベル正面・裏ラベルの写真を撮って査定に出す</strong>のが確実です。お酒の買取専門店では、写真からボトルの種類を特定できる場合があります。</p>

          <h2 id="takaku-uru">5. 年代指定なしのラフロイグを高く売る5つのコツ</h2>

          <ol>
            <li><strong>外箱・カートンを揃える</strong> — 付属品の有無で査定額が変動します。箱がなくても売却は可能ですが、あれば必ず一緒に</li>
            <li><strong>未開封のまま売る</strong> — 開封済みは大幅な減額となります。売却を予定している場合は開栓しないことをおすすめします</li>
            <li><strong>ボトル名を正確に伝える</strong> — 「ラフロイグの年代なし」ではなく「ロア」「クォーターカスク」と特定して伝えると、上位・限定ボトルの評価漏れを防げます</li>
            <li><strong>複数業者で相見積もり</strong> — 同じボトルでも業者により査定額が10〜20%異なることがあります。3社以上で比較することをおすすめします</li>
            <li><strong>適切な保管環境を保つ</strong> — 直射日光を避け、縦置きで保管してください。液面低下・ラベル褪色は減額要因です</li>
          </ol>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">年代指定なしのラフロイグの無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">ボトル名が特定できない場合も、写真査定を利用できます。複数の業者の査定額を比較できます。査定料・キャンセル料は無料です。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              
              <a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
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
            <li><Link href="/articles/whisky-nv-toha/" className="text-amber-dark hover:underline font-bold">ウイスキーの「年代指定なし(NV)」の解説買取での扱いと相場の見方</Link></li>
            <li><Link href="/articles/laphroaig-25-kaitori/" className="text-amber-dark hover:underline">ラフロイグ25年の買取相場</Link></li>
            <li><Link href="/articles/bowmore-nv-kaitori/" className="text-amber-dark hover:underline">ボウモアの年代指定なし(NV)買取相場</Link></li>
            <li><Link href="/articles/talisker-nv-kaitori/" className="text-amber-dark hover:underline">タリスカーの年代指定なし(NV)買取相場</Link></li>
            <li><Link href="/souba-ranking/" className="text-amber-dark hover:underline">ウイスキー買取相場ランキング</Link></li>
          </ul>

          <p className="text-xs text-warm-gray mt-8">※本記事の実勢中央値は Yahoo Auctions 過去180日落札データの中央値{fetchedAt ? `（取得日 ${fetchedAt}）` : ""}であり、参考値です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動し、特定の買取額を保証するものではありません。最新の査定額は各業者ページで直接ご確認ください。当サイトはアフィリエイト広告（PR）を含みます。</p>
        </article>
      </div>
    </>
  );
}
