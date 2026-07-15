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

// 現行ラインの最年少=10年。NV枠として springbank-10 キーを条件付き表示
const nvRec = m["springbank-10"];
const nvReady = !!nvRec && nvRec.insufficient !== true && typeof nvRec.median === "number";
const nvMedianStr = nvReady ? `${Math.round(nvRec!.median!).toLocaleString("ja-JP")}円` : null;
const nvFetchedAt = nvReady ? nvRec!.fetched_at : null;
const refFetchedAt = m["springbank-15"]?.fetched_at ?? "毎週月曜";

export const metadata: Metadata = {
  title: "スプリングバンクの年代指定なし(NV)買取相場｜ボトルの見分け方と実勢価格【2026年7月】",
  description:
    "年代表記のないスプリングバンクの常時流通はごく稀で、現行ラインの最年少は10年です。年代不明に見えるボトルの多くはラベル摩耗か限定品。年数の確認手順、10年・15年・21年の実勢価格比較（ヤフオク落札中央値・毎週更新）、高く売るコツと無料査定の使い方まで解説します。",
  alternates: { canonical: "/articles/springbank-nv-kaitori/" },
};

const faqs = [
  {
    q: "年代表記のないスプリングバンクはありますか？",
    a: "現行の主力ラインナップ（10年・15年・18年・21年・25年など）はすべて年数表記があり、年数表記のないボトルの常時流通はごく稀です。お手元のボトルに年数が見当たらない場合、多くは(1)ラベルの摩耗・剥がれで年数が読めない、(2)限定・特別リリースで年数表記の位置や書式が通常と異なる、のいずれかです。裏ラベル・肩ラベル・化粧箱も含めて年数表記を探し、それでも特定できない場合は写真を添えて専門知識のある買取業者に判定を依頼してください。",
  },
  {
    q: "スプリングバンクの年代指定なし（最年少の10年）の買取相場はいくらですか？",
    a: nvReady
      ? `現行ラインで最も若いスプリングバンク10年の今週の実勢中央値は${nvMedianStr}です（ヤフオク過去180日の実落札・IQR外れ値除去後の中央値・取得日 ${nvFetchedAt ?? "毎週月曜更新"}・毎週更新）。これは中古市場の実勢値であり、業者の買取査定額は状態・付属品・各社の在庫状況により変動します。`
      : "スプリングバンク10年の実勢データは現在収集中です（毎週更新のため近日掲載予定）。参考として、当サイト集計の実勢中央値（毎週更新）はスプリングバンク15年が約3.5万円、21年が約9.9万円です。いずれも参考値で、買取額を保証するものではありません。",
  },
  {
    q: "年数が読めないスプリングバンクはどう売ればいいですか？",
    a: "ボトル名・度数・容量・裏ラベルの記載を控え、正面・裏・キャップ・液面の写真を撮ったうえで、複数の買取業者に相見積もりを依頼するのが確実です。スプリングバンクは年代・リリースによって相場が大きく異なるため、自己判断で「古いから高い／表記がないから安い」と決めつけず、専門知識のある業者の判定を受けることをおすすめします。",
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
  { id: "seitai", label: "1. 年代表記のないスプリングバンクの正体" },
  { id: "current-price", label: "2. 実勢価格（ヤフオク落札中央値・毎週更新）" },
  { id: "miwakekata", label: "3. 年代不明ボトルの見分け方" },
  { id: "takaku-uru", label: "4. 高く売るコツ" },
  { id: "satei", label: "5. 無料査定の使い方" },
  { id: "faq", label: "6. よくある質問" },
];

export default function SpringbankNvKaitoriPage() {
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
            <li><span className="text-foreground">スプリングバンク 年代指定なし(NV)</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/springbank-15.png" alt="スプリングバンクの年代指定なし(NV)買取相場" width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">スプリングバンクの年代指定なし(NV)買取相場｜ボトルの見分け方と実勢価格【2026年7月】</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-07-15 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">結論（30秒）</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              <li>スプリングバンクの現行主力ラインは<strong>すべて年数表記あり</strong>で、<strong>最年少は10年</strong>。年数表記のないボトルの常時流通は<strong>ごく稀</strong>です。</li>
              <li>「年代指定なし」に見えるボトルの多くは、<strong>ラベルの摩耗・剥がれ</strong>か、年数表記の書式が異なる<strong>限定・特別リリース</strong>です。</li>
              <li>まず裏ラベル・肩ラベル・化粧箱まで年数表記を探し、確認できたら該当年代のページ（<Link href="/articles/springbank-15-kaitori/" className="text-amber-dark underline">15年</Link>・<Link href="/articles/springbank-21-kaitori/" className="text-amber-dark underline">21年</Link>）で相場を確認しましょう。</li>
              <li>特定できないボトルは<strong>写真を添えて専門業者の査定へ</strong>。自己判断で安売りしないことが重要です。</li>
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

          <h2 id="seitai">1. 年代表記のないスプリングバンクの正体</h2>

          <p>スプリングバンクは、スコットランド・キャンベルタウンの家族経営蒸溜所が造るシングルモルトです。現行の主力ラインナップは<strong>10年・15年・18年・21年・25年</strong>など、いずれも<strong>ラベルに熟成年数の表記があるボトル</strong>で構成されており、山崎や白州の「ノンエイジ」のような年数表記のない定番ボトルは、現行ラインには<strong>ほぼ存在しません</strong>。</p>

          <p>そのため「スプリングバンク 年代指定なし」でお調べの方のボトルは、実際には次のいずれかであるケースが大半です。</p>

          <ul>
            <li><strong>ラベルの摩耗・剥がれ・褪色で年数が読めない</strong> — 長期保管品や旧ボトルに多いパターン。年数表記自体はもともと存在することがほとんどです</li>
            <li><strong>限定・特別リリースで年数表記の位置や書式が通常と異なる</strong> — スプリングバンクは少量の限定ボトルを多くリリースしており、正面ラベルの目立つ位置に年数がないデザインもあります</li>
          </ul>

          <p>いずれの場合も、ボトルの正体が確定しないまま査定に出すと適正価格を逃しやすいため、まず次章の実勢価格と第3章の見分け方で「どのスプリングバンクか」を確認するのが先決です。年代別の全体像は <Link href="/articles/springbank-kaitori/" className="text-amber-dark underline">スプリングバンク買取相場（年代別総合ガイド）</Link> にまとめています。</p>

          <h2 id="current-price">2. 実勢価格（ヤフオク落札中央値・毎週更新）</h2>

          {nvReady ? (
            <p>現行ラインで最も若い<strong>スプリングバンク10年の今週の実勢中央値は {nvMedianStr}</strong> です（ヤフオク過去180日の実落札・IQR外れ値除去後の中央値{typeof nvRec?.filtered_n === "number" ? `・n=${nvRec.filtered_n}件` : ""}{nvFetchedAt ? `・取得日 ${nvFetchedAt}` : ""}・毎週更新）。これは中古市場の実勢値であり、特定の業者の買取価格ではありません。</p>
          ) : (
            <p>現行ラインで最も若い<strong>スプリングバンク10年</strong>の実勢データは<strong>現在収集中です（毎週更新のため近日掲載予定）</strong>。先に集計が揃っている15年・21年の実勢中央値が、水準感の参考になります。</p>
          )}

          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>ボトル</th><th>実勢中央値（ヤフオク・毎週更新）</th><th>相場ページ</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>スプリングバンク10年（現行最年少）</td>
                  <td>{nvMedianStr ?? "実勢データ収集中（近日掲載）"}</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td>スプリングバンク15年</td>
                  <td><strong>{yen("springbank-15") ?? "収集中"}</strong></td>
                  <td><Link href="/articles/springbank-15-kaitori/" className="text-amber-dark underline">15年の買取相場 →</Link></td>
                </tr>
                <tr>
                  <td>スプリングバンク21年</td>
                  <td><strong>{yen("springbank-21") ?? "収集中"}</strong></td>
                  <td><Link href="/articles/springbank-21-kaitori/" className="text-amber-dark underline">21年の買取相場 →</Link></td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-warm-gray">※中央値はヤフオク!の過去180日落札データをIQR外れ値除去後に当サイトが独自集計した参考値です（取得日 {refFetchedAt}・毎週月曜更新）。買取額を保証するものではなく、業者の査定額は状態・付属品・各社の在庫状況により変動します。限定ボトルは流通量が少なく、この表の水準が当てはまらない場合があります。</p>

          <p>熟成年数が上がるほど実勢は大きく上がります。<strong>年数の特定＝査定額の桁の特定</strong>と言ってよいほど差が出るため、売却前のボトル特定が重要です。</p>

          <h2 id="miwakekata">3. 年代不明ボトルの見分け方</h2>

          <p>年数が読めないスプリングバンクは、次の順で確認すると特定できる可能性が高くなります。</p>

          <ol>
            <li><strong>正面ラベルの中央〜下部を見る</strong> — 「AGED 10 YEARS」「15 YEARS OLD」などの年数表記が基本の位置です</li>
            <li><strong>肩ラベル・裏ラベルを確認する</strong> — 正面が摩耗していても、裏ラベルや肩の小ラベルに年数・ボトル名・度数が残っていることがあります</li>
            <li><strong>化粧箱・外箱を確認する</strong> — 箱には年数・リリース名が印字されています。箱が残っていれば最有力の手がかりです</li>
            <li><strong>度数・容量・ボトル名をメモする</strong> — 46%か、それより高いカスクストレングス帯かはリリース特定の手がかりになります</li>
            <li><strong>特定できなければ写真を添えて専門査定へ</strong> — スプリングバンクは限定リリースが多く、素人判断が難しい銘柄です。正面・裏・キャップ・液面の写真を用意し、専門知識のある買取業者に判定を依頼してください</li>
          </ol>

          <div className="bg-burgundy/5 border border-burgundy/30 rounded-xl p-4 my-5 not-prose">
            <p className="text-sm text-ink">🔍 売却前の真贋確認はこちら → <Link href="/articles/springbank-nisemono-mikata/" className="kaitori-to-shingan text-amber-dark underline font-bold">スプリングバンクの偽物の見分け方と売る前チェック</Link></p>
          </div>

          <h2 id="takaku-uru">4. 年代不明のスプリングバンクを高く売るコツ</h2>

          <ol>
            <li><strong>売る前にボトルを特定する</strong> — 年数・リリース名が確定するだけで、業者間の査定比較が正確にできるようになります</li>
            <li><strong>外箱・冊子など付属品を揃える</strong> — 箱は査定評価に加え、ボトル特定の証拠にもなります</li>
            <li><strong>未開封のまま売る</strong> — 開封済みは大幅減額の傾向。液面の高さも査定要素です</li>
            <li><strong>複数業者で相見積もりを取る</strong> — 流通量の少ない銘柄ほど業者間の査定差が大きく出ます。最低3社での比較がおすすめです</li>
            <li><strong>ラベルの状態をこれ以上悪化させない</strong> — 摩耗したラベルを拭いたり剥がしたりせず、そのままの状態で査定に出してください</li>
          </ol>

          <h2 id="satei">5. 無料査定の使い方</h2>

          <p>スプリングバンクは限定リリースが多く、<strong>ボトル特定と査定額の両方で専門知識の差が出る</strong>銘柄です。一括査定で相場感を掴みつつ、お酒専門店の個別査定を併用するのが確実です。</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">スプリングバンクの無料一括査定はこちら</h3>
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

          <h2>スプリングバンクの関連ページ</h2>
          <ul>
            <li><Link href="/articles/springbank-kaitori/" className="text-amber-dark hover:underline font-bold">スプリングバンク買取相場（年代別総合ガイド）</Link></li>
            <li><Link href="/articles/springbank-15-kaitori/" className="text-amber-dark hover:underline">スプリングバンク15年の買取相場</Link></li>
            <li><Link href="/articles/springbank-21-kaitori/" className="text-amber-dark hover:underline">スプリングバンク21年の買取相場</Link></li>
            <li><Link href="/articles/springbank-nisemono-mikata/" className="text-amber-dark hover:underline">スプリングバンクの偽物の見分け方（真贋ハブ）</Link></li>
            <li><Link href="/articles/whisky-nv-toha/" className="text-amber-dark hover:underline">ウイスキーの「年代指定なし(NV)」とは？買取での扱いと相場の見方</Link></li>
            <li><Link href="/souba-ranking/" className="text-amber-dark hover:underline">ウイスキー買取相場ランキング（毎週更新）</Link></li>
          </ul>

          <p className="text-xs text-warm-gray mt-8">※本記事の実勢中央値は Yahoo Auctions 過去180日落札データの中央値（IQR外れ値除去後・毎週月曜更新）にもとづく参考値です。買取額を保証するものではなく、業者の買取査定額は各社の在庫状況・キャンペーン・状態評価により変動します。最新の査定額は各業者ページで直接ご確認ください。当サイトはアフィリエイト広告（PR）を含みます。</p>
        </article>
      </div>
    </>
  );
}
