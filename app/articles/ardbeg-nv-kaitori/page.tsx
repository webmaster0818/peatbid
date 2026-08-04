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

const uige = rec("ardbeg-uigeadail");
const corry = rec("ardbeg-corryvreckan");
const fetchedAt = uige?.fetched_at ?? corry?.fetched_at ?? "毎週月曜";

// NV帯の目安レンジ（実データのある2本の中央値から算出。片方しか無い場合は単一値表記）
const nvVals = [uige?.median, corry?.median].filter((v): v is number => typeof v === "number");
const nvRangeStr =
  nvVals.length >= 2
    ? `${Math.min(...nvVals).toLocaleString("ja-JP")}〜${Math.max(...nvVals).toLocaleString("ja-JP")}円`
    : nvVals.length === 1
      ? `${nvVals[0].toLocaleString("ja-JP")}円`
      : null;

export const metadata: Metadata = {
  title: "アードベッグ買取価格【2026年8月】年代表記なし(NV)ボトルの相場と見分け方",
  description:
    `アードベッグは主力の多くが熟成年数を表記しないノンエイジ(NV)です。ウーガダール・コリーヴレッカン・アンオーなど年数表記のないボトルの見分け方と、ヤフオク実落札の中央値${nvRangeStr ? `(NV帯 ${nvRangeStr})` : ""}、10年との価格差、高く売るコツまで実データで解説します。`,
  alternates: { canonical: "/articles/ardbeg-nv-kaitori/" },
};

const faqs = [
  {
    q: "年代表記のないアードベッグは、どのボトルですか？",
    a: "アードベッグは主力ラインの多くが熟成年数を表記しないノンエイジ(NV)です。代表的なのは「ウーガダール(Uigeadail)」「コリーヴレッカン(Corryvreckan)」「アンオー(An Oa)」の3本で、いずれもラベルに「◯年」の表記がありません。一方「アードベッグ10年(TEN)」はラベル中央に「10」と年数が入ります。まずラベルのボトル名と年数表記の有無を確認してください。",
  },
  {
    q: "年代表記のないアードベッグの買取相場はいくらですか？",
    a: nvRangeStr
      ? `当サイト集計(ヤフオク過去180日の実落札・IQR外れ値除去後の中央値)では、年数表記のないボトルの実勢中央値は${nvRangeStr}の幅に収まっています(ウーガダール${yen("ardbeg-uigeadail") ?? "収集中"}／コリーヴレッカン${yen("ardbeg-corryvreckan") ?? "収集中"}・取得日 ${fetchedAt}・毎週更新)。これは中古市場の実勢値で、業者の買取査定額は状態・付属品・各社の在庫状況により変動します。`
      : "本ページの実勢データは現在収集中です(毎週更新のため近日掲載予定)。",
  },
  {
    q: "ウーガダールとコリーヴレッカンでは、どちらが高く売れますか？",
    a:
      uige && corry
        ? `当サイトのヤフオク実落札中央値では、ウーガダール${yen("ardbeg-uigeadail")}(${nOf("ardbeg-uigeadail")})に対しコリーヴレッカン${yen("ardbeg-corryvreckan")}(${nOf("ardbeg-corryvreckan")})で、現時点では大きな差はありません。どちらも現行流通品のため、価格差より状態・付属品・業者ごとの在庫状況の方が査定額に効きます。`
        : "実勢データを収集中のため、現時点で優劣を断定できません。",
  },
  {
    q: "アードベッグを高く売るコツは？",
    a: "(1)外箱・チューブ缶などの付属品を揃える、(2)未開封のまま売る、(3)「ウーガダール」「コリーヴレッカン」などボトル名と度数を正確に伝える、(4)複数業者で相見積もりを取る、(5)直射日光を避け縦置きで保管する、の5つが基本です。アードベッグは限定リリース(アードベッグ・デーの記念ボトル等)が多く、限定品は現行品と相場が異なるため、ボトル名を正確に伝えることが特に重要です。",
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
  { id: "seitai", label: "1. 年代表記のないアードベッグ＝どのボトル？" },
  { id: "current-price", label: "2. 実勢価格（ヤフオク落札中央値・毎週更新）" },
  { id: "miwakekata", label: "3. 手元のボトルの見分け方" },
  { id: "takaku-uru", label: "4. 高く売る5つのコツ" },
  { id: "satei", label: "5. 無料査定の使い方" },
  { id: "faq", label: "6. よくある質問" },
];

const rows: { name: string; key: string; note: string; href?: string }[] = [
  { name: "ウーガダール（年数表記なし・54.2%）", key: "ardbeg-uigeadail", note: "シェリー樽原酒をヴァッティング", href: "/articles/ardbeg-uigeadail-kaitori/" },
  { name: "コリーヴレッカン（年数表記なし・57.1%）", key: "ardbeg-corryvreckan", note: "フレンチオーク由来のスパイシーさ", href: "/articles/ardbeg-corryvreckan-kaitori/" },
  { name: "アンオー（年数表記なし・46.6%）", key: "ardbeg-an-oa", note: "ギャザリング・ヴァットで後熟" },
  { name: "アードベッグ10年（年数表記あり・46%）", key: "ardbeg-10", note: "比較用の定番ボトル" },
];

export default function ArdbegNvKaitoriPage() {
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
            <li><span className="text-foreground">アードベッグ 年代指定なし(NV)</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/ardbeg-uigeadail.png" alt="アードベッグの年代指定なし(NV)買取相場" width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">アードベッグの年代指定なし(NV)買取相場｜ボトルの見分け方と実勢価格</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-08-04 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">結論（30秒）</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              <li>アードベッグは<strong>主力の多くが年数表記のないノンエイジ(NV)</strong>。ウーガダール／コリーヴレッカン／アンオーが代表です。</li>
              <li>「10年(TEN)」だけはラベルに年数が入ります。<strong>まずラベルの年数表記の有無</strong>を確認してください。</li>
              {nvRangeStr && (
                <li>年数表記のないボトルの実勢中央値は<strong>{nvRangeStr}</strong>の幅（ヤフオク実落札・毎週更新）。</li>
              )}
              <li>限定リリースが多い銘柄です。<strong>ボトル名を正確に伝えないと現行品扱いで査定される</strong>ことがあります。</li>
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

          <h2 id="seitai">1. 年代表記のないアードベッグ＝どのボトル？</h2>

          <p>「アードベッグ 買取」「アードベッグ 年代指定なし 買取」で調べている方の多くは、<strong>ラベルに熟成年数が書かれていないボトル</strong>をお持ちです。アードベッグ（アイラ島）の現行ラインは、年数表記のないノンエイジが中心という点が、他のシングルモルトと大きく違います。</p>

          <ul>
            <li><strong>ウーガダール（Uigeadail）</strong> — シェリー樽で熟成した原酒をヴァッティングしたノンエイジ。度数54.2%</li>
            <li><strong>コリーヴレッカン（Corryvreckan）</strong> — フレンチオーク由来のスパイシーな味わいのノンエイジ。度数57.1%</li>
            <li><strong>アンオー（An Oa）</strong> — 「ギャザリング・ヴァット」で後熟させたノンエイジ。度数46.6%</li>
            <li><strong>アードベッグ10年（TEN）</strong> — こちらは<strong>年数表記あり</strong>。ラベル中央に「10」が入ります</li>
          </ul>

          <p>このほか、アードベッグ・デー（毎年6月）に合わせた<strong>限定リリース</strong>が毎年発売されており、これらも年数表記のないボトルがほとんどです。限定品は本数が限られるため、現行の定番3本とは相場が別物になることがあります。</p>

          <h2 id="current-price">2. 実勢価格（ヤフオク落札中央値・毎週更新）</h2>

          <p>当サイトが毎週集計している、ヤフオク!の実落札データにもとづく中央値です。年数表記のないボトルと、比較用に10年を並べています。</p>

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

          <p className="text-xs text-warm-gray">※中央値はヤフオク!の過去180日落札データをIQR外れ値除去後に当サイトが独自集計した参考値です（取得日 {fetchedAt}・毎週月曜更新）。買取額を保証するものではなく、業者の査定額は状態・付属品・各社の在庫状況により変動します。限定リリースは本表に含みません。</p>

          <p>年数表記のないボトル同士（ウーガダール・コリーヴレッカン・アンオー）は<strong>おおむね同じ価格帯</strong>に収まっており、10年より一段高い水準です。つまりアードベッグの場合、「年数が書いていない＝安い」わけではありません。<strong>ボトル名を正確に伝えることが、適正な査定を受ける前提</strong>になります。</p>

          <h2 id="miwakekata">3. 手元のボトルの見分け方</h2>

          <ol>
            <li><strong>ラベル中央の年数表記を見る</strong> — 「10」とあれば10年。数字がなければノンエイジです</li>
            <li><strong>ボトル名（英字）を読む</strong> — Uigeadail / Corryvreckan / An Oa のいずれかが記載されています</li>
            <li><strong>度数を確認する</strong> — 54.2%＝ウーガダール、57.1%＝コリーヴレッカン、46.6%＝アンオー、46%＝10年が目安です</li>
            <li><strong>限定品かどうかを確認する</strong> — 「Ardbeg Day」「Committee Release」等の記載や、通常と異なる箱・缶があれば限定リリースの可能性があります</li>
            <li><strong>それでも不明なら写真を添えて査定へ</strong> — ラベル摩耗や旧ボトルで特定できない場合は、正面・裏・キャップ・液面の写真を用意して専門知識のある業者に判定してもらうのが確実です</li>
          </ol>

          <div className="bg-burgundy/5 border border-burgundy/30 rounded-xl p-4 my-5 not-prose">
            <p className="text-sm text-ink">🔍 売却前の真贋確認はこちら → <Link href="/articles/ardbeg-nisemono-mikata/" className="kaitori-to-shingan text-amber-dark underline font-bold">アードベッグの偽物の見分け方と売る前チェック</Link></p>
          </div>

          <h2 id="takaku-uru">4. 年代表記のないアードベッグを高く売る5つのコツ</h2>

          <ol>
            <li><strong>外箱・チューブ缶などの付属品を揃える</strong> — アードベッグは筒状の缶・化粧箱付きが多く、付属品の有無が査定に出やすい銘柄です</li>
            <li><strong>未開封のまま売る</strong> — 開封済みは大幅減額の傾向です</li>
            <li><strong>ボトル名と度数を正確に伝える</strong> — 「アードベッグ」だけでは現行品の最安ラインで見積もられることがあります</li>
            <li><strong>複数業者で相見積もりを取る</strong> — 同じボトルでも業者により査定額が10〜20%異なることがあります</li>
            <li><strong>保管状態を整える</strong> — 直射日光を避け、縦置き・温度変化の少ない場所で保管。液面低下・ラベル褪色は減額要因です</li>
          </ol>

          <h2 id="satei">5. 無料査定の使い方</h2>

          <p>現行流通のノンエイジは、業者ごとの在庫状況で査定額が変わりやすい銘柄です。<strong>一括査定で相場感を掴んでから、専門店の個別査定と比較する</strong>のが効率的です。</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">アードベッグの無料一括査定はこちら</h3>
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

          <h2>アードベッグの関連ページ</h2>
          <ul>
            <li><Link href="/articles/ardbeg-uigeadail-kaitori/" className="text-amber-dark hover:underline font-bold">アードベッグ ウーガダールの買取相場</Link></li>
            <li><Link href="/articles/ardbeg-corryvreckan-kaitori/" className="text-amber-dark hover:underline font-bold">アードベッグ コリーヴレッカンの買取相場</Link></li>
            <li><Link href="/articles/ardbeg-nisemono-mikata/" className="text-amber-dark hover:underline">アードベッグの偽物の見分け方（真贋ハブ）</Link></li>
            <li><Link href="/articles/whisky-nv-toha/" className="text-amber-dark hover:underline">ウイスキーの「年代指定なし(NV)」とは？買取での扱いと相場の見方</Link></li>
            <li><Link href="/souba-ranking/" className="text-amber-dark hover:underline">ウイスキー買取相場ランキング（毎週更新）</Link></li>
          </ul>

          <p className="text-xs text-warm-gray mt-8">※本記事の実勢中央値は Yahoo Auctions 過去180日落札データの中央値（IQR外れ値除去後・毎週月曜更新）にもとづく参考値です。買取額を保証するものではなく、業者の買取査定額は各社の在庫状況・キャンペーン・状態評価により変動します。最新の査定額は各業者ページで直接ご確認ください。当サイトはアフィリエイト広告（PR）を含みます。</p>
        </article>
      </div>
    </>
  );
}
