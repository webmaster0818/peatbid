import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import medians from "@/data/yahoo-medians.json";

type MedianRec = { median?: number; filtered_n?: number; fetched_at?: string; insufficient?: boolean };
const m = medians as unknown as Record<string, MedianRec | undefined>;

const yen = (key: string): string | null => {
  const r = m[key];
  return r && r.insufficient !== true && typeof r.median === "number"
    ? `${Math.round(r.median).toLocaleString("ja-JP")}円`
    : null;
};

// NVキーは glenfarclas-nv を優先し、集計側が glenfarclas-105 キーで載せた場合も拾う
const nvRec = m["glenfarclas-nv"] ?? m["glenfarclas-105"];
const nvReady = !!nvRec && nvRec.insufficient !== true && typeof nvRec.median === "number";
const nvMedianStr = nvReady ? `${Math.round(nvRec!.median!).toLocaleString("ja-JP")}円` : null;
const nvFetchedAt = nvReady ? nvRec!.fetched_at : null;
const refFetchedAt = m["glenfarclas-25"]?.fetched_at ?? "毎週月曜";

export const metadata: Metadata = {
  title: "グレンファークラスの年代指定なし(NV)買取相場｜ボトルの見分け方と実勢価格【2026年7月】",
  description:
    "年代表記のないグレンファークラスの正体は、主に「105カスクストレングス」（60度・NAS）です。105・ヘリテージなど年数表記のないボトルの見分け方、25年など年代付きボトルとの実勢価格比較（ヤフオク落札中央値・毎週更新）、高く売るコツと無料査定の使い方まで解説します。",
  alternates: { canonical: "/articles/glenfarclas-nv-kaitori/" },
};

const faqs = [
  {
    q: "年代表記のないグレンファークラスは、何というボトルですか？",
    a: "国内で流通している年数表記のないグレンファークラスは、主に「グレンファークラス105 カスクストレングス」（アルコール度数60度）です。ラベルに大きく「105」と書かれているのが目印です。ほかに、シェリー樽熟成のノンエイジ「ヘリテージ」などもあります。ラベルの数字が「105」であれば熟成年数ではなく英国プルーフ由来の度数表記なので、25年などの年代物とは別のボトルです。",
  },
  {
    q: "グレンファークラスの年代指定なし（105等）の買取相場はいくらですか？",
    a: nvReady
      ? `当サイト集計（ヤフオク過去180日の実落札・IQR外れ値除去後の中央値）で、今週の実勢中央値は${nvMedianStr}です（取得日 ${nvFetchedAt ?? "毎週月曜更新"}・毎週更新）。これは中古市場の実勢値であり、業者の買取査定額は状態・付属品・各社の在庫状況により変動します。実際の査定額は複数業者の相見積もりでご確認ください。`
      : "本ページのNV枠の実勢データは現在収集中です（毎週更新のため近日掲載予定）。グレンファークラス105の実勢中央値（毎週更新）は当サイトのグレンファークラス105買取相場ページに掲載しています。買取査定額は状態・付属品・各社の在庫状況により変動するため、価格を保証するものではありません。",
  },
  {
    q: "年代指定なしのグレンファークラスを高く売るコツは？",
    a: "(1)外箱・冊子など付属品を揃える、(2)未開封のまま売る、(3)ラベルの「105」「Heritage」などボトル名と度数を正確に業者へ伝える、(4)複数業者で相見積もりを取る、(5)直射日光を避け縦置きで保管する、の5つが基本です。105は現行流通品のため極端なプレミアは付きにくい一方、状態と付属品の差が査定に出やすい銘柄です。",
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
  { id: "seitai", label: "1. 年代表記のないグレンファークラスの正体" },
  { id: "current-price", label: "2. 実勢価格（ヤフオク落札中央値・毎週更新）" },
  { id: "miwakekata", label: "3. 年代不明ボトルの見分け方" },
  { id: "takaku-uru", label: "4. 高く売るコツ" },
  { id: "satei", label: "5. 無料査定の使い方" },
  { id: "faq", label: "6. よくある質問" },
];

export default function GlenfarclasNvKaitoriPage() {
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
            <li><span className="text-foreground">グレンファークラス 年代指定なし(NV)</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/glenfarclas-25.png" alt="グレンファークラスの年代指定なし(NV)買取相場" width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">グレンファークラスの年代指定なし(NV)買取相場｜ボトルの見分け方と実勢価格【2026年7月】</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-07-15 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">結論（30秒）</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              <li>年代表記のないグレンファークラスの多くは <strong>「105 カスクストレングス」（60度）</strong>。ラベルの「105」は<strong>熟成年数ではなく度数由来の表記</strong>です。</li>
              <li>ほかにノンエイジの<strong>「ヘリテージ」</strong>などもあります。まずラベルのボトル名を確認しましょう。</li>
              <li>105の相場は25年などの年代物とはまったく別水準。<strong>取り違えたまま査定に出すと損</strong>をしやすいポイントです。</li>
              <li>「25年」など年数表記があるボトルは <Link href="/articles/glenfarclas-25-kaitori/" className="text-amber-dark underline">グレンファークラス25年の買取相場</Link> をご覧ください。</li>
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

          <h2 id="seitai">1. 年代表記のないグレンファークラスの正体</h2>

          <p>「グレンファークラス 年代指定なし」「グレンファークラス NV（ノンヴィンテージ）」で調べている方のボトルは、ほとんどの場合<strong>グレンファークラス105 カスクストレングス</strong>です。スペイサイドの家族経営蒸溜所グレンファークラスが手がける、アルコール度数<strong>60%</strong>の現行ボトルで、ラベル中央に大きく「105」と表記されています。</p>

          <p>この「105」は熟成年数ではなく、<strong>英国の旧プルーフ表記（105プルーフ＝60度）に由来する度数の表記</strong>です。「105年」という意味ではない点にご注意ください。</p>

          <p>105のほかには、シェリー樽熟成のノンエイジ<strong>「グレンファークラス ヘリテージ」</strong>など、年数表記のないボトルが流通しています。一方、グレンファークラスの主力は10年・12年・15年・21年・25年など<strong>年数表記のあるライン</strong>で、相場も年数によって大きく異なります。</p>

          <div className="bg-cream/40 border border-amber/40 rounded-xl p-4 my-5 not-prose">
            <p className="text-sm text-ink">🔀 ラベルに「25」など熟成年数の表記があるボトルはこちら → <Link href="/articles/glenfarclas-25-kaitori/" className="text-amber-dark underline font-bold">グレンファークラス25年の買取相場ガイド</Link></p>
          </div>

          <h2 id="current-price">2. 実勢価格（ヤフオク落札中央値・毎週更新）</h2>

          {nvReady ? (
            <p>年代指定なし（105等）の枠の<strong>今週の実勢中央値は {nvMedianStr}</strong> です（ヤフオク過去180日の実落札・IQR外れ値除去後の中央値{typeof nvRec?.filtered_n === "number" ? `・n=${nvRec.filtered_n}件` : ""}{nvFetchedAt ? `・取得日 ${nvFetchedAt}` : ""}・毎週更新）。これは中古市場の実勢値であり、特定の業者の買取価格ではありません。</p>
          ) : (
            <p>本ページのNV枠（年代指定なし）の実勢データは<strong>現在収集中です（毎週更新のため近日掲載予定）</strong>。なお、105単体の実勢中央値（ヤフオク実落札・毎週更新）は <Link href="/articles/glenfarclas-105-kaitori/" className="text-amber-dark underline">グレンファークラス105の買取相場ページ</Link> に掲載しています。あわせてご確認ください。</p>
          )}

          <p>年数表記のあるボトルとの水準差の参考に、当サイトが毎週集計している実勢中央値を並べると次の通りです。</p>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>ボトル</th><th>実勢中央値（ヤフオク・毎週更新）</th><th>相場ページ</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>グレンファークラス105（年代指定なし・60度）</td>
                  <td>{yen("glenfarclas-105") ?? nvMedianStr ?? "収集中（105ページに毎週更新の集計あり）"}</td>
                  <td><Link href="/articles/glenfarclas-105-kaitori/" className="text-amber-dark underline">105の買取相場 →</Link></td>
                </tr>
                <tr>
                  <td>グレンファークラス25年</td>
                  <td><strong>{yen("glenfarclas-25") ?? "収集中"}</strong></td>
                  <td><Link href="/articles/glenfarclas-25-kaitori/" className="text-amber-dark underline">25年の買取相場 →</Link></td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-warm-gray">※中央値はヤフオク!の過去180日落札データをIQR外れ値除去後に当サイトが独自集計した参考値です（取得日 {refFetchedAt}・毎週月曜更新）。買取額を保証するものではなく、業者の査定額は状態・付属品・各社の在庫状況により変動します。</p>

          <p>同じ「グレンファークラス」でも、105と25年では相場の桁が違います。査定に出す前に、<strong>手元のボトルがどちらなのかをラベルで確定させる</strong>ことが、適正価格で売る第一歩です。</p>

          <h2 id="miwakekata">3. 年代不明ボトルの見分け方</h2>

          <p>「年代がわからない」グレンファークラスは、次の順で確認すると特定できます。</p>

          <ol>
            <li><strong>正面ラベル中央の数字を見る</strong> — 「10」「12」「15」「21」「25」などの数字＋「YEARS OLD」があれば年数表記ボトル。「<strong>105</strong>」とあればカスクストレングス（年代指定なし）です</li>
            <li><strong>「Heritage」等のボトル名を探す</strong> — 年数の数字がなく「Heritage」などの名称があればノンエイジのラインです</li>
            <li><strong>度数表記を確認する</strong> — 105は<strong>60%</strong>と高度数。40〜46%台なら別のボトルの可能性が高いです</li>
            <li><strong>裏ラベル・肩ラベルも確認する</strong> — 正面が摩耗して読めない場合も、裏ラベルや化粧箱に名称・度数が残っていることがあります</li>
            <li><strong>それでも不明なら写真を添えて査定へ</strong> — ラベル摩耗・旧ボトルなどで特定できない場合は、正面・裏・キャップ・液面の写真を撮り、専門知識のある買取業者に判定してもらうのが確実です</li>
          </ol>

          <div className="bg-burgundy/5 border border-burgundy/30 rounded-xl p-4 my-5 not-prose">
            <p className="text-sm text-ink">🔍 売却前の真贋確認はこちら → <Link href="/articles/glenfarclas-nisemono-mikata/" className="kaitori-to-shingan text-amber-dark underline font-bold">グレンファークラスの偽物の見分け方と売る前チェック</Link></p>
          </div>

          <h2 id="takaku-uru">4. 年代指定なしのグレンファークラスを高く売るコツ</h2>

          <ol>
            <li><strong>外箱・冊子など付属品を揃える</strong> — 付属品の有無で査定評価が変わります。部分的にでも残っていれば一緒に査定へ</li>
            <li><strong>未開封のまま売る</strong> — 開封済みは大幅減額の傾向。コレクション目的なら開栓しない</li>
            <li><strong>ボトル名と度数を正確に伝える</strong> — 「105」「ヘリテージ」等の名称と60%等の度数を伝えると、年代物との取り違えによる査定ミスを防げます</li>
            <li><strong>複数業者で相見積もりを取る</strong> — 同じボトルでも業者により査定額が10〜20%異なることがあります</li>
            <li><strong>保管状態を整える</strong> — 直射日光を避け、縦置き・温度変化の少ない場所で保管。液面低下・ラベル褪色は減額要因です</li>
          </ol>

          <h2 id="satei">5. 無料査定の使い方</h2>

          <p>105など現行流通のノンエイジは、業者ごとの在庫状況で査定額が変わりやすい銘柄です。<strong>一括査定で相場感を掴んでから、専門店の個別査定と比較する</strong>のが効率的です。</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">グレンファークラスの無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数業者の査定を比較して、最高値を引き出しましょう。査定無料・キャンセル無料。</p>
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

          <h2>グレンファークラスの関連ページ</h2>
          <ul>
            <li><Link href="/articles/glenfarclas-105-kaitori/" className="text-amber-dark hover:underline font-bold">グレンファークラス105（年代指定なし）の買取相場</Link></li>
            <li><Link href="/articles/glenfarclas-25-kaitori/" className="text-amber-dark hover:underline">グレンファークラス25年の買取相場</Link></li>
            <li><Link href="/articles/glenfarclas-nisemono-mikata/" className="text-amber-dark hover:underline">グレンファークラスの偽物の見分け方（真贋ハブ）</Link></li>
            <li><Link href="/articles/whisky-nv-toha/" className="text-amber-dark hover:underline">ウイスキーの「年代指定なし(NV)」とは？買取での扱いと相場の見方</Link></li>
            <li><Link href="/souba-ranking/" className="text-amber-dark hover:underline">ウイスキー買取相場ランキング（毎週更新）</Link></li>
          </ul>

          <p className="text-xs text-warm-gray mt-8">※本記事の実勢中央値は Yahoo Auctions 過去180日落札データの中央値（IQR外れ値除去後・毎週月曜更新）にもとづく参考値です。買取額を保証するものではなく、業者の買取査定額は各社の在庫状況・キャンペーン・状態評価により変動します。最新の査定額は各業者ページで直接ご確認ください。当サイトはアフィリエイト広告（PR）を含みます。</p>
        </article>
      </div>
    </>
  );
}
