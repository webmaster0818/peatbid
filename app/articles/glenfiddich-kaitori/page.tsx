import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import medians from "@/data/yahoo-medians.json";

type MedianRec = { median?: number; filtered_n?: number; fetched_at?: string; insufficient?: boolean };
const m = medians as unknown as Record<string, MedianRec | undefined>;

const rec = (key: string): MedianRec | null => {
  const r = m[key];
  return r && r.insufficient !== true && typeof r.median === "number" ? r : null;
};
const yen = (key: string): string | null => {
  const r = rec(key);
  return r ? `${Math.round(r.median!).toLocaleString("ja-JP")}円` : null;
};
const nOf = (key: string): string => {
  const r = rec(key);
  return r && typeof r.filtered_n === "number" ? `n=${r.filtered_n}件` : "—";
};

const g12 = rec("glenfiddich-12");
const g30 = rec("glenfiddich-30");
const fetchedAt = g12?.fetched_at ?? g30?.fetched_at ?? "毎週月曜";

export const metadata: Metadata = {
  title: "グレンフィディック買取価格【2026年8月】12年・15年・18年・30年の相場と見分け方",
  description:
    `グレンフィディックの買取相場を年代別に実データで掲載。12年${yen("glenfiddich-12") ?? "収集中"}・15年${yen("glenfiddich-15") ?? "収集中"}・18年${yen("glenfiddich-18") ?? "収集中"}・30年${yen("glenfiddich-30") ?? "収集中"}（ヤフオク実落札の中央値・毎週更新）。手元のボトルがどの年数かの見分け方、箱なし・開封済みの扱い、高く売るコツまで解説します。`,
  alternates: { canonical: "/articles/glenfiddich-kaitori/" },
};

const faqs = [
  {
    q: "グレンフィディックの買取相場はいくらですか？",
    a: g12
      ? `年数によって大きく異なります。当サイト集計（ヤフオク過去180日の実落札・IQR外れ値除去後の中央値・取得日 ${fetchedAt}）では、12年${yen("glenfiddich-12")}、15年${yen("glenfiddich-15")}、18年${yen("glenfiddich-18")}、30年${yen("glenfiddich-30") ?? "収集中"}です。同じ「グレンフィディック」でも12年と30年では20倍以上の開きがあるため、まず手元のボトルの年数を確定させてください。`
      : "実勢データを収集中です（毎週更新のため近日掲載予定）。",
  },
  {
    q: "手元のグレンフィディックが何年ものか分かりません。どこを見ればいいですか？",
    a: "三角形のボトル正面ラベルの中央〜下部に「12」「15」「18」「21」「30」などの数字と「YEARS OLD」の表記があります。数字が読み取れない場合は、化粧箱・裏ラベル・肩ラベルにも年数が入っていることが多いので確認してください。それでも判別できない場合は、正面・裏・キャップ・液面の写真を用意して買取業者に判定してもらうのが確実です。",
  },
  {
    q: "グレンフィディックに年数表記のないボトルはありますか？",
    a: "あります。「IPAカスク・フィニッシュ」「プロジェクトXX」「ファイア＆ケイン」などの実験的シリーズは熟成年数を表記していません。ただしこれらは流通量が少なく、当サイトで実落札データを十分な件数（n≥20）集められていないため、本ページでは中央値の数値を掲載していません。データが集まり次第、掲載します。",
  },
  {
    q: "箱なし・開封済みでも買取してもらえますか？",
    a: "はい、可能です。業界一般の目安として、未開封・箱なし（ラベル良好）で市場相場の80〜90%程度、開封済みで残量9割以上なら30〜40%程度が目安です（業者により評価基準は異なります）。化粧箱や冊子が部分的に残っている場合は一緒に査定に出すと評価されます。",
  },
  {
    q: "グレンフィディックを高く売るコツは？",
    a: "(1)化粧箱・冊子など付属品を揃える、(2)未開封のまま売る、(3)年数を正確に伝える（12年と18年の取り違えは査定額に直結します）、(4)複数業者で相見積もりを取る、(5)直射日光を避け縦置きで保管する、の5つが基本です。12年など流通量の多いボトルは業者間の差が出にくい一方、18年以上は在庫状況で査定額が動きやすくなります。",
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
  { id: "current-price", label: "1. 年代別の実勢価格（ヤフオク落札中央値・毎週更新）" },
  { id: "miwakekata", label: "2. 手元のボトルが何年ものかの見分け方" },
  { id: "nv", label: "3. 年数表記のないボトルについて" },
  { id: "jotai", label: "4. 箱なし・開封済みの扱い" },
  { id: "takaku-uru", label: "5. 高く売る5つのコツ" },
  { id: "satei", label: "6. 無料査定の使い方" },
  { id: "faq", label: "7. よくある質問" },
];

const rows: { name: string; key: string; note: string; href?: string }[] = [
  { name: "グレンフィディック12年", key: "glenfiddich-12", note: "最も流通量の多い定番" },
  { name: "グレンフィディック15年", key: "glenfiddich-15", note: "ソレラ・ヴァット由来の甘み" },
  { name: "グレンフィディック18年", key: "glenfiddich-18", note: "シェリー樽の比重が高い" },
  { name: "グレンフィディック30年", key: "glenfiddich-30", note: "長期熟成の上位ライン", href: "/articles/glenfiddich-30-kaitori/" },
];

export default function GlenfiddichKaitoriPage() {
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
            <li><span className="text-foreground">グレンフィディック 買取</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/glenfiddich-30.png" alt="グレンフィディックの買取相場（年代別）" width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">グレンフィディックの買取相場｜12年・15年・18年・30年の実勢価格と見分け方</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-08-04 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">結論（30秒）</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              <li>グレンフィディックは<strong>年数によって相場が桁違い</strong>。まずラベルの「◯ YEARS OLD」を確認してください。</li>
              {g12 && (
                <li>ヤフオク実落札の中央値は<strong>12年{yen("glenfiddich-12")}／15年{yen("glenfiddich-15")}／18年{yen("glenfiddich-18")}</strong>（毎週更新）。</li>
              )}
              {g30 && <li>30年は<strong>{yen("glenfiddich-30")}</strong>と別水準。取り違えたまま査定に出すと損をしやすいポイントです。</li>}
              <li>年数表記のない実験的シリーズ（IPAカスク等）は<strong>実データが不足しているため数値は掲載していません</strong>。</li>
            </ul>
          </div>

          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
              {tocItems.map((item) => (
                <li key={item.id}><a href={`#${item.id}`} className="hover:underline">{item.label}</a></li>
              ))}
            </ol>
          </div>

          <h2 id="current-price">1. 年代別の実勢価格（ヤフオク落札中央値・毎週更新）</h2>

          <p>当サイトが毎週集計している、ヤフオク!の実落札データにもとづく中央値です。同じ銘柄でも年数で水準がまったく異なることが分かります。</p>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>ボトル</th><th>実勢中央値</th><th>サンプル数</th><th>備考</th></tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.key}>
                    <td>{r.href ? <Link href={r.href} className="text-amber-dark underline">{r.name}</Link> : r.name}</td>
                    <td><strong>{yen(r.key) ?? "収集中"}</strong></td>
                    <td>{nOf(r.key)}</td>
                    <td>{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-warm-gray">※中央値はヤフオク!の過去180日落札データをIQR外れ値除去後に当サイトが独自集計した参考値です（取得日 {fetchedAt}・毎週月曜更新）。買取額を保証するものではなく、業者の査定額は状態・付属品・各社の在庫状況により変動します。</p>

          <h2 id="miwakekata">2. 手元のボトルが何年ものかの見分け方</h2>

          <ol>
            <li><strong>正面ラベル中央〜下部の数字を見る</strong> — 「12」「15」「18」「21」「30」などの数字＋「YEARS OLD」が入っています</li>
            <li><strong>化粧箱・筒缶を確認する</strong> — ラベルが読めない場合も、箱側に年数が印字されていることが多いです</li>
            <li><strong>裏ラベル・肩ラベルも見る</strong> — 正面が摩耗していても、裏や肩に年数・度数が残っている場合があります</li>
            <li><strong>年数がどこにも無ければノンエイジ</strong> — IPAカスク等の実験的シリーズの可能性があります（後述）</li>
            <li><strong>それでも不明なら写真を添えて査定へ</strong> — 正面・裏・キャップ・液面の写真を用意し、専門知識のある業者に判定してもらうのが確実です</li>
          </ol>

          <h2 id="nv">3. 年数表記のないボトルについて</h2>

          <p>グレンフィディックには、熟成年数を表記しないシリーズもあります。代表的なものが<strong>「IPAカスク・フィニッシュ」「プロジェクトXX」「ファイア＆ケイン」</strong>などの実験的リリースです。</p>

          <p>ただし、これらは定番3本（12年・15年・18年）に比べて流通量が少なく、<strong>当サイトの集計基準（過去180日の実落札・n≥20件）を満たすデータが集まっていません</strong>。そのため、本ページではこれらの中央値を数値として掲載していません。推定値で埋めることはせず、データが集まり次第、他の年代と同じ基準で追加します。</p>

          <p>年数表記のないボトルをお持ちの場合は、<Link href="/articles/whisky-nv-toha/" className="text-amber-dark underline">ウイスキーの「年代指定なし(NV)」とは</Link> もあわせてご覧ください。</p>

          <h2 id="jotai">4. 箱なし・開封済みの扱い</h2>

          <p>業界一般の目安として、状態による減額幅はおおむね次のとおりです（業者により基準は異なります）。</p>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>状態</th><th>市場相場に対する目安</th><th>12年の場合の目安額</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>未開封・箱あり（完品）</td>
                  <td>100%</td>
                  <td>{yen("glenfiddich-12") ?? "—"}</td>
                </tr>
                <tr>
                  <td>未開封・箱なし（ラベル良好）</td>
                  <td>80〜90%程度</td>
                  <td>{g12 ? `約${Math.round(g12.median! * 0.8).toLocaleString("ja-JP")}〜${Math.round(g12.median! * 0.9).toLocaleString("ja-JP")}円` : "—"}</td>
                </tr>
                <tr>
                  <td>開封済み・残量9割以上</td>
                  <td>30〜40%程度</td>
                  <td>{g12 ? `約${Math.round(g12.median! * 0.3).toLocaleString("ja-JP")}〜${Math.round(g12.median! * 0.4).toLocaleString("ja-JP")}円` : "—"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-warm-gray">※上記は市場相場（ヤフオク中央値）に業界一般の減額率を掛けた目安であり、特定業者の買取価格ではありません。実際の査定額は必ず複数社でご確認ください。</p>

          <h2 id="takaku-uru">5. グレンフィディックを高く売る5つのコツ</h2>

          <ol>
            <li><strong>化粧箱・冊子など付属品を揃える</strong> — 完品と箱なしで1〜2割の差が出ます</li>
            <li><strong>未開封のまま売る</strong> — 開封済みは大幅減額の傾向です</li>
            <li><strong>年数を正確に伝える</strong> — 12年と18年の取り違えは査定額に直結します</li>
            <li><strong>複数業者で相見積もりを取る</strong> — 18年以上は在庫状況で査定額が動きやすく、差が出ます</li>
            <li><strong>保管状態を整える</strong> — 直射日光を避け、縦置き・温度変化の少ない場所で保管。液面低下・ラベル褪色は減額要因です</li>
          </ol>

          <h2 id="satei">6. 無料査定の使い方</h2>

          <p>12年など流通量の多いボトルは相場が安定している一方、18年・30年は業者ごとの在庫状況で査定額が変わります。<strong>一括査定で相場感を掴んでから、専門店の個別査定と比較する</strong>のが効率的です。</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">グレンフィディックの無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数業者の査定を比較して、最高値を引き出しましょう。査定無料・キャンセル無料。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="burgundy-cta block text-center text-sm py-3 rounded-lg">JOYLABで専門査定</a>
              <a href="https://www.buysell-onlineshop.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2 id="faq">7. よくある質問</h2>

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

          <h2>グレンフィディックの関連ページ</h2>
          <ul>
            <li><Link href="/articles/glenfiddich-30-kaitori/" className="text-amber-dark hover:underline font-bold">グレンフィディック30年の買取相場</Link></li>
            <li><Link href="/articles/glenfiddich-30-nisemono-mikata/" className="text-amber-dark hover:underline">グレンフィディック30年の偽物の見分け方</Link></li>
            <li><Link href="/articles/whisky-nv-toha/" className="text-amber-dark hover:underline">ウイスキーの「年代指定なし(NV)」とは？買取での扱いと相場の見方</Link></li>
            <li><Link href="/articles/whisky-souba-kimarikata/" className="text-amber-dark hover:underline">ウイスキーの買取相場はどう決まる？査定6要素</Link></li>
            <li><Link href="/souba-ranking/" className="text-amber-dark hover:underline">ウイスキー買取相場ランキング（毎週更新）</Link></li>
          </ul>

          <p className="text-xs text-warm-gray mt-8">※本記事の実勢中央値は Yahoo Auctions 過去180日落札データの中央値（IQR外れ値除去後・毎週月曜更新）にもとづく参考値です。買取額を保証するものではなく、業者の買取査定額は各社の在庫状況・キャンペーン・状態評価により変動します。最新の査定額は各業者ページで直接ご確認ください。当サイトはアフィリエイト広告（PR）を含みます。</p>
        </article>
      </div>
    </>
  );
}
