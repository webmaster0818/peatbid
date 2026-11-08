import type { Metadata } from "next";
import Link from "next/link";
import medians from "@/data/yahoo-medians.json";
import data from "./data.json";

// 2026-11-07 新設。対象KW「イチローズモルト ワインウッドリザーブ 買取」（推定 56/月）。
// それまでワインウッドリザーブ（WWR）は /articles/ichirosu-mwr-kaitori/ の【参考】行にしか無く、専用の受け皿が無かった。
// ⚠️ 数値は data.json（11/7 にヤフオクを1回取得・タイトル目視済み／各店ページを11/7に確認）だけを使う。
// ⚠️ 終売・生産終了は、メーカーの発表を確認できていないため断定しない（11/7 時点）。

type MedianRec = { median?: number | null; filtered_n?: number | null; fetched_at?: string; insufficient?: boolean; query_used?: string };
const m = medians as unknown as Record<string, MedianRec | undefined>;

const y = data.yahoo;
const yen = (v: number) => `${v.toLocaleString("ja-JP")}円`;
const wwrMedian = !y.insufficient && y.filtered_n >= 20 ? y.median : null;

const mwrRec = m["ichirosu-mwr"];
const mwr =
  mwrRec && mwrRec.insufficient !== true && typeof mwrRec.median === "number" && typeof mwrRec.filtered_n === "number" && mwrRec.filtered_n >= 20
    ? mwrRec
    : null;

const stores = data.stores;
const storeLow = Math.min(...stores.map((s) => s.low));
const storeHigh = Math.max(...stores.map((s) => s.high));
const checked = data.stores_checked_at;
const UPDATED = "2026-11-07";

export const metadata: Metadata = {
  title: "イチローズモルト ワインウッドリザーブの買取価格・相場【2026年11月】4,000〜6,000円｜6店比較・ヤフオク中央値",
  description: `イチローズモルト ワインウッドリザーブ（WWR）の買取価格を6店の掲示価格で比較（2026年11月7日確認・${yen(storeLow)}〜${yen(storeHigh)}）。ヤフオク落札中央値${wwrMedian ? yen(wwrMedian) : "（集計中）"}、MWRとの差、箱なしの扱い、終売情報の確認結果を掲載しています。`,
  alternates: { canonical: "/articles/ichirosu-wwr-kaitori/" },
};

const faqs = [
  {
    q: "イチローズモルト ワインウッドリザーブの買取価格はいくらですか？",
    a: `2026年11月7日に確認した買取店6店の掲示価格は${yen(storeLow)}〜${yen(storeHigh)}です（大黒屋 4,000円、リカスタ 4,500円、LINXAS 5,000円、キングラムリカー 5,000円、ストックラボ 5,000〜6,000円、買取大吉 6,000円）。掲示価格は各店の参考価格で、実際の査定額は状態・付属品・在庫状況により変わります。`,
  },
  {
    q: "ヤフオクではいくらで落札されていますか？",
    a: wwrMedian
      ? `当サイトが ${y.fetched_at} に集計したヤフオクの落札価格（700ml・1本の出品のみ、IQR外れ値除去後 n=${y.filtered_n}件）の中央値は${yen(wwrMedian)}です。これは個人間で落札された市場価格であり、業者の買取額はここから手数料等を引いた水準になります。`
      : "落札データの件数が20件に満たないため、中央値は掲載していません。",
  },
  {
    q: "ワインウッドリザーブは終売（生産終了）になりましたか？",
    a: "2026年11月7日時点で、製造元のベンチャーウイスキーによるワインウッドリザーブの終売・生産終了の発表は確認できていません。インターネット上で「イチローズモルト2銘柄が生産終了」と紹介されている情報は、20th アニバーサリーエディションとダブルディスティラリーズを対象としたもので、ワインウッドリザーブは含まれていません。",
  },
  {
    q: "ミズナラウッドリザーブ（MWR）とどちらが高く売れますか？",
    a: "2026年11月7日に確認した6店では、同じ店の比較でMWRがWWRと同額か高い掲示でした（LINXAS・キングラムリカーは MWR 6,500円／WWR 5,000円、大黒屋は MWR 5,000円／WWR 4,000円、リカスタは MWR 5,000円／WWR 4,500円、買取大吉とストックラボは同額）。ヤフオクの落札中央値もMWRのほうが高い水準です。",
  },
  {
    q: "箱なしでも買い取ってもらえますか？",
    a: "買い取りの対象です。ただし、キングラムリカーは「箱有 5,000円・箱無は −2,000円」と箱の有無で価格を分けて掲示しています。LINXASの掲示は「完備」、リカスタは「箱付き」の価格のため、箱がない場合は事前に査定額を確認することをおすすめします。",
  },
  {
    q: "オリ（沈殿物）や浮遊物があると売れませんか？",
    a: "ヤフオクでは「オリ有」「浮遊物あり」と明記された出品も落札されています。ただし買取店の査定では状態として確認されるため、査定時にその旨を伝えてください。",
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
  { id: "store-prices", label: "1. 買取店6店の掲示価格（2026年11月7日確認）" },
  { id: "yahoo", label: "2. ヤフオク落札中央値とMWRとの比較" },
  { id: "trend", label: "3. 買取価格の推移（ストックラボの月別実績）" },
  { id: "about", label: "4. ワインウッドリザーブについて確認できた事実" },
  { id: "shuubai", label: "5. 終売・生産終了の情報について" },
  { id: "jotai", label: "6. 箱なし・状態による違い" },
  { id: "takaku-uru", label: "7. 売却前に確認したいこと" },
  { id: "faq", label: "8. よくある質問" },
  { id: "sources", label: "9. 出典" },
];

const linkCls = "text-amber-dark underline hover:text-burgundy";

export default function IchirosuWwrKaitoriPage() {
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
            <li><span className="text-foreground">イチローズモルト ワインウッドリザーブ 買取</span></li>
          </ol>
        </nav>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">イチローズモルト ワインウッドリザーブ（WWR）の買取価格と相場｜6店の掲示価格とヤフオク落札中央値</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {UPDATED} / 編集: <Link href="/editorial/" className={linkCls}>PeatBid編集部</Link>（<Link href="/methodology/" className={linkCls}>数値の算出方法</Link>）</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">ワインウッドリザーブの買取価格の要点</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              <li>買取店6店の掲示価格は <strong>{yen(storeLow)}〜{yen(storeHigh)}</strong> です（700ml・{checked} 確認）。店によって最大2,000円の差があります。</li>
              {wwrMedian && (
                <li>ヤフオクの落札中央値は <strong>{yen(wwrMedian)}</strong>（n={y.filtered_n}件・{y.fetched_at} 集計）です。業者の買取額はここから手数料等を引いた水準になります。</li>
              )}
              <li>同じリーフシリーズのミズナラウッドリザーブ（MWR）と比べると、掲示価格・落札価格ともにWWRがやや低い水準です。</li>
              <li>終売・生産終了について、製造元の発表は <strong>確認できていません</strong>（{checked} 時点）。</li>
            </ul>
          </div>

          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-semibold text-ink mb-2">目次</p>
            <ul className="text-sm space-y-1 list-disc list-inside text-warm-gray">
              {tocItems.map((t) => (
                <li key={t.id}><a href={`#${t.id}`} className={linkCls}>{t.label}</a></li>
              ))}
            </ul>
          </div>

          <h2 id="store-prices">1. 買取店6店の掲示価格（2026年11月7日確認）</h2>
          <p>
            各買取店が自社サイトに掲示しているワインウッドリザーブ（700ml）の参考買取価格を、PeatBid編集部が {checked} に各ページで確認した値です。
            「店舗側の更新日」は各ページに記載されている価格の更新日で、記載がない店は「日付表記なし」としています。
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>店舗</th><th>掲示の品名・条件</th><th>買取価格</th><th>店舗側の更新日</th><th>出典</th></tr>
              </thead>
              <tbody>
                {stores.map((s) => (
                  <tr key={s.name}>
                    <td><strong>{s.name}</strong></td>
                    <td>{s.item}</td>
                    <td className="whitespace-nowrap">{s.price}</td>
                    <td className="whitespace-nowrap">{s.updated}</td>
                    <td><a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className={linkCls}>掲載ページ</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            最も低いのは大黒屋の4,000円、最も高いのは買取大吉の6,000円です。
            LINXASの掲示は10月6日更新の価格表では5,500円でしたが、11月2日更新の価格表では5,000円になっています。
            リカスタも10月25日の当サイト確認時の4,800円から、11月7日は4,500円になっていました。掲示価格は月単位で動くため、売却前に最新の掲示を確認してください。
          </p>
          <h3 id="vs-mwr">同じ店のミズナラウッドリザーブ（MWR）との比較</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>店舗</th><th>ワインウッドリザーブ（WWR）</th><th>ミズナラウッドリザーブ（MWR）</th></tr>
              </thead>
              <tbody>
                {stores.map((s) => (
                  <tr key={`vs-${s.name}`}>
                    <td>{s.name}</td>
                    <td className="whitespace-nowrap">{s.price}</td>
                    <td className="whitespace-nowrap">{s.mwr_price_same_day}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">※{data.stores_mwr_note}。MWRの店舗別の詳細は <Link href="/articles/ichirosu-mwr-kaitori/" className={linkCls}>MWRの買取価格</Link> をご覧ください。</p>
          <p>
            6店のうち4店がMWRをWWRより500〜1,500円高く掲示しており、買取大吉とストックラボは同額でした。
          </p>

          <h2 id="yahoo">2. ヤフオク落札中央値とMWRとの比較</h2>
          {wwrMedian ? (
            <>
              <p>
                ヤフオクで「{y.query_used}」と検索した落札結果（直近の{y.raw_n}件）から、出品タイトルに「ワインウッド」「WWR」等を含み、
                セット・複数本・空瓶・ミニボトル・ミズナラウッドリザーブとの組み合わせ・700ml以外を除いた{y.title_filtered_n}件を対象に、
                IQRで外れ値を除いた中央値を算出しました。
              </p>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr><th>銘柄</th><th>落札中央値</th><th>件数</th><th>集計日</th></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>ワインウッドリザーブ（WWR）</strong></td>
                      <td>{yen(wwrMedian)}</td>
                      <td>n={y.filtered_n}件</td>
                      <td>{y.fetched_at}</td>
                    </tr>
                    {mwr && (
                      <tr>
                        <td><Link href="/articles/ichirosu-mwr-kaitori/" className={linkCls}>【参考】ミズナラウッドリザーブ（MWR）</Link></td>
                        <td>{yen(mwr.median as number)}</td>
                        <td>n={mwr.filtered_n}件</td>
                        <td>{mwr.fetched_at}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-warm-gray">
                ※ヤフオク過去180日の落札価格・IQR外れ値除去後の中央値です。これは個人間で落札された市場価格であり、業者の買取額はここから手数料等を引いた水準になります。
                WWRの外れ値除去後の範囲は {yen(y.min)}〜{yen(y.max)} です。
                MWRの値は当サイトの週次集計（検索語「{mwrRec?.query_used ?? "イチローズモルト MWR 700ml"}」・タイトルでの絞り込みなし）によるもので、集計日と方法がWWRと異なるため参考比較です。
              </p>
            </>
          ) : (
            <p>落札データの件数が20件に満たないため、中央値は掲載していません。</p>
          )}
          <p>
            落札価格の中央値と、第1章の買取店の掲示価格（4,000〜6,000円）には差があります。
            ヤフオクで売る場合は落札手数料・送料・梱包の手間がかかるため、差額だけで有利・不利を判断することはできません。
          </p>

          <h2 id="trend">3. 買取価格の推移（ストックラボの月別実績）</h2>
          <p>
            ストックラボは、ワインウッドリザーブの自社買取実績の月別中央値（{data.stocklab_monthly.range}）を公開しています。同社ページの記載によると、
            期間内の最高は <strong>{data.stocklab_monthly.high}</strong>、最低は <strong>{data.stocklab_monthly.low}</strong>、直近は <strong>{data.stocklab_monthly.latest}</strong> です
            （同社グラフの更新 {data.stocklab_monthly.page_updated}・当サイト確認 {checked}）。
          </p>
          <p>
            直近の実績（4,500円）と同社の現在の掲示（5,000〜6,000円）には差があり、掲示価格はあくまで上限寄りの参考値と考えられます。
            当サイトのヤフオク集計は今回が初回のため、WWR単体の推移は今後の集計で追加します。
          </p>

          <h2 id="about">4. ワインウッドリザーブについて確認できた事実</h2>
          <ul>
            <li><strong>製造元</strong>: 株式会社ベンチャーウイスキー（埼玉県秩父市。秩父蒸溜所を運営）</li>
            <li><strong>発売</strong>: 2010年（ウイスキー文化研究所 JWIC の秩父蒸溜所ページの年表に「MWR」「ワインウッドリザーブ」「ダブルディスティラリーズ」発売と記載）</li>
            <li><strong>受賞</strong>: TWSC2020 銅賞（同ページの受賞歴に記載）</li>
            <li><strong>容量・度数</strong>: 700ml・46%（買取店・落札出品の表記。メーカーの資料では確認できていません）</li>
            <li><strong>ラベル</strong>: リーフ（葉）のラベルの「リーフシリーズ」の1本として流通しています。品名は「WWR」「Wine Wood Reserve」と表記されることもあります</li>
          </ul>
          <p>
            原酒の構成や熟成方法については、販売店・買取店の説明が一致していません。
            羽生蒸溜所の原酒を使っていると説明する店、赤ワイン樽での後熟と説明する店、シングルモルトと説明する店があり、落札出品のタイトルにも「ピュアモルト」「ブレンデッドモルト」の両方の表記が見られます。
            当サイトではメーカーの資料で確認できていないため、原酒の構成は記載していません。
          </p>

          <h2 id="shuubai">5. 終売・生産終了の情報について</h2>
          <p>
            <strong>{checked} 時点で、ベンチャーウイスキーによるワインウッドリザーブの終売・生産終了の発表は確認できていません。</strong>
            当サイトが確認した範囲では、同社の製品情報や告知を掲載した公式サイトを確認できませんでした（以前「公式情報」として参照していた one-drinks.com は、現在ドメインパーキングの状態です）。
          </p>
          <p>
            インターネット上には「イチローズモルト2銘柄が生産終了」とする記事がありますが、対象として挙げられているのは20th アニバーサリーエディションとダブルディスティラリーズ（羽生原酒を使った旧版）で、ワインウッドリザーブは含まれていません。
            また、これらの記事もメーカーの発表文を引用していないため、当サイトではいずれの銘柄についても終売を事実としては扱っていません。
            ダブルディスティラリーズについては <Link href="/articles/ichirosu-double-distilleries-kaitori/" className={linkCls}>ダブルディスティラリーズの買取価格</Link> をご覧ください。
          </p>

          <h2 id="jotai">6. 箱なし・状態による違い</h2>
          <ul>
            <li><strong>箱なし</strong>: キングラムリカーは「箱有 5,000円・箱無は −2,000円」と掲示しています。LINXASは「完備」、リカスタは「箱付き」の価格のみを掲示しており、箱なしの価格は記載がありません。</li>
            <li><strong>オリ・浮遊物</strong>: ヤフオクでは「オリ有」「浮遊物あり」と明記された出品も、ほかの出品と近い価格で落札されています。買取店では状態として査定に反映されるため、事前に伝えてください。</li>
            <li><strong>開封済み</strong>: 未開封品のみを買取対象とする店もあります。開封済みの場合は、査定の申し込み前に対象かどうかを確認してください。</li>
          </ul>

          <h2 id="takaku-uru">7. 売却前に確認したいこと</h2>
          <ol>
            <li><strong>品名を正確に伝える</strong>: ミズナラウッドリザーブ（MWR）と同じリーフシリーズのため、取り違えに注意してください。ラベルの「Wine Wood Reserve」の表記で判別できます。</li>
            <li><strong>複数店の掲示を比べる</strong>: 11月7日時点で、同じ700mlでも4,000円と6,000円の店がありました。</li>
            <li><strong>箱を残しておく</strong>: 箱の有無で価格を分けて掲示している店があります。</li>
            <li><strong>ほかのイチローズモルトとまとめて査定に出す</strong>: MWR・ホワイトラベル・ダブルディスティラリーズを同じ店が掲示しているため、まとめて見積もりを取ると比較しやすくなります。</li>
          </ol>
          <p>
            一般的な注意点は <Link href="/articles/whisky-takaku-uru/" className={linkCls}>ウイスキーを高く売るコツ</Link> にまとめています。
          </p>

          <h2 id="faq">8. よくある質問</h2>
          <div className="space-y-3 not-prose">
            {faqs.map((f) => (
              <details key={f.q} className="bg-white border border-warm-border rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 font-medium text-sm">
                  <span>{f.q}</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-warm-gray leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>

          <h2 id="sources">9. 出典</h2>
          <ul className="text-sm">
            {stores.map((s) => (
              <li key={s.url + s.name}>
                <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className={linkCls}>{s.name}の掲載ページ</a>（{checked} 確認）
              </li>
            ))}
            <li>
              <a href="https://jwic.jp/distillery/chichibu/" target="_blank" rel="noopener noreferrer nofollow" className={linkCls}>JWIC（ジャパニーズウイスキーインフォメーションセンター）秩父蒸溜所</a>（発売年・受賞歴。{checked} 確認）
            </li>
            <li>ヤフオク落札データ: PeatBid集計（検索語「{y.query_used}」・{y.fetched_at} 取得・<Link href="/methodology/" className={linkCls}>算出方法</Link>）</li>
          </ul>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/ichirosu-mwr-kaitori/" className={linkCls}>イチローズモルト ミズナラウッドリザーブ（MWR）の買取相場</Link></li>
              <li><Link href="/articles/ichirosu-double-distilleries-kaitori/" className={linkCls}>イチローズモルト ダブルディスティラリーズの買取相場</Link></li>
              <li><Link href="/articles/ichirosu-card-kaitori/" className={linkCls}>イチローズモルト カードシリーズの買取相場</Link></li>
              <li><Link href="/articles/chichibu-the-first-kaitori/" className={linkCls}>秩父 ザ・ファーストの買取相場</Link></li>
              <li><Link href="/articles/akkeshi-kaitori/" className={linkCls}>厚岸ウイスキーの買取相場｜寒露・雨水・大寒の落札中央値と二十四節気シリーズ全24本一覧</Link></li>
              <li><Link href="/articles/ichirosu-nisemono-mikata/" className={linkCls}>イチローズモルトの偽物の見分け方</Link></li>
              <li><Link href="/articles/whisky-kaitori-zeikin/" className={linkCls}>ウイスキーを売ったときの税金</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className={linkCls}>ウイスキー買取相場ガイド</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
