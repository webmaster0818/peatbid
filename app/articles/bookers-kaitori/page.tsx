import type { Metadata } from "next";
import Link from "next/link";
import data from "./data.json";

// 2026-11-07 新規「ブッカーズ 買取」受け皿。
// ⚠️ 価格はこのディレクトリの data.json（ヤフオク落札の実測値）のみ。タイトルを目視で確認した出品だけで集計。
//    ブッカーズは国内正規品が 750ml のため、fetch-yahoo-medians.py の 700ml 前提の関数は使わず、
//    同じ closedsearch・extract_items・JUNK_RE・iqr_filter・n>=20 の規則で 750ml 版を手元で集計した（スクリプト本体は未変更）。
// ⚠️ 旧ボトルはボトルごとの差が大きいため中央値を出さない。

type Yahoo = {
  query: string;
  fetched_at: string;
  end_date_from: string;
  end_date_to: string;
  raw_n: number;
  title_filtered_n: number;
  filtered_n: number;
  median: number | null;
  min: number | null;
  q1: number;
  q3: number;
  max: number | null;
  insufficient: boolean;
};

const y = data.yahoo as Yahoo;
const off = data.official;
const sp = off.suntory_product;
const ok = !y.insufficient && typeof y.median === "number";
const yenFmt = (v: number) => `${v.toLocaleString("ja-JP")}円`;
const medianText = ok ? yenFmt(y.median as number) : "集計中";
const taxIncl = Math.round(sp.price_jpy_ex_tax * 1.1);
const ratio = ok ? ((y.median as number) / taxIncl).toFixed(2) : null;
const fmtDate = (d: string) => d.replace(/-/g, "/");
const period = `${fmtDate(y.end_date_from)}〜${fmtDate(y.end_date_to)}`;

const linkCls = "text-amber-dark underline hover:text-burgundy";

export const metadata: Metadata = {
  title: `ブッカーズの買取相場【2026年11月】ヤフオク落札中央値${medianText}｜バッチ表記・旧ボトルの見分け方`,
  description: `ブッカーズ（750ml）の買取相場を、ヤフオク落札データ${y.filtered_n}件の中央値${medianText}で掲載しています。サントリーの希望小売価格との比較、バッチ番号・度数の確認方法、旧ボトル（アルファベット入りのバッチ番号・特級表記）の扱いを説明します。`,
  alternates: { canonical: "/articles/bookers-kaitori/" },
};

const faqs = [
  {
    q: "ブッカーズの買取相場はいくらですか？",
    a: ok
      ? `当サイトの集計では、年号つきバッチ（2014〜2026年表記）の750ml・1本出品のヤフオク落札価格の中央値は${medianText}です（終了日 ${period}・IQR外れ値除去後 n=${y.filtered_n}件・取得日 ${y.fetched_at}）。これは落札された市場価格であり、業者の買取額はここから手数料等を引いた水準になります。`
      : "落札データの件数が20件に満たないため、現在は中央値を掲載していません。",
  },
  {
    q: "ブッカーズの度数や熟成年数はボトルごとに違いますか？",
    a: "違います。ブッカーズ公式サイトは「毎年いくつかのバッチをリリースし、各バッチの熟成年数とプルーフ（度数）は異なる」と説明しています。手元のボトルの度数・熟成期間・バッチ番号は、ボトルのラベルで確認してください。",
  },
  {
    q: "日本で売られているブッカーズは何mlですか？",
    a: `サントリーの商品情報ページでは「${sp.name}」の容量は${sp.volume_ml}ml、アルコール度数は${sp.abv}と記載されています（${off.checked_at}確認）。ヤフオクの出品も750mlがほとんどでした。`,
  },
  {
    q: "古いブッカーズ（旧ボトル）は高く売れますか？",
    a: "アルファベット入りのバッチ番号（C90-K-28、B95-C-31 など）や「Booker Noe's」「特級」表記のボトルは、同じ期間のヤフオクで約2万円〜10万円台の落札がありました。ただしボトルごとの差が大きく件数も少ないため、当サイトでは中央値を出していません。旧ボトルは複数の業者に個別に査定を依頼してください。",
  },
  {
    q: "木箱がなくても買取してもらえますか？",
    a: "木箱のないボトルの買取可否や減額幅は業者によって異なります。当サイトでは木箱の有無による価格差を集計していないため、数値は掲載していません。木箱・冊子が残っている場合は一緒に査定に出してください。",
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
  { id: "current-price", label: "1. 落札価格の中央値（年号つきバッチ・750ml）" },
  { id: "teika", label: "2. 希望小売価格との比較" },
  { id: "about", label: "3. ブッカーズとは（公式情報）" },
  { id: "batch", label: "4. バッチ番号・度数の確認方法" },
  { id: "old-bottle", label: "5. 旧ボトルの扱い" },
  { id: "uru-mae", label: "6. 売る前の確認事項" },
  { id: "faq", label: "7. よくある質問" },
  { id: "sources", label: "8. 出典・集計方法" },
];

export default function BookersKaitoriPage() {
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
            <li><span className="text-foreground">ブッカーズ 買取</span></li>
          </ol>
        </nav>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">ブッカーズの買取相場｜ヤフオク落札中央値とバッチ・旧ボトルの見分け方</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {y.fetched_at} / 編集: <Link href="/editorial/" className={linkCls}>PeatBid編集部</Link></p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">結論</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              {ok && (
                <li>
                  年号つきバッチ（2014〜2026年表記）の750ml・1本出品は、ヤフオク落札価格の中央値が<strong>{medianText}</strong>です（n={y.filtered_n}件・中央の半数は{yenFmt(y.q1)}〜{yenFmt(y.q3)}）。
                </li>
              )}
              <li>
                サントリーの「{sp.name}」の希望小売価格は<strong>{yenFmt(sp.price_jpy_ex_tax)}（税別）</strong>です。{ratio && <>落札中央値は税込換算（{yenFmt(taxIncl)}）の約{ratio}倍です。</>}
              </li>
              <li><strong>アルファベット入りのバッチ番号や「特級」表記の旧ボトル</strong>は約2万円〜10万円台と幅が大きく、個別の査定が必要です。</li>
              <li>掲載額は<strong>落札された市場価格</strong>です。業者の買取額はここから手数料等を引いた水準になります。</li>
            </ul>
          </div>

          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-semibold text-ink mb-2">目次</p>
            <ul className="text-sm space-y-1 list-disc list-inside text-warm-gray">
              {tocItems.map((t) => (
                <li key={t.id}><a href={`#${t.id}`} className="text-amber-dark hover:text-burgundy underline">{t.label}</a></li>
              ))}
            </ul>
          </div>

          <h2 id="current-price">1. 落札価格の中央値（年号つきバッチ・750ml）</h2>
          <p>
            ヤフオクの落札済みオークションを「{y.query}」で検索し、取得できた直近{y.raw_n}件（終了日 {period}）の出品タイトルを1件ずつ確認して集計しました。
            ブッカーズ本体の750ml・1本出品のうち、タイトルに2014〜2026年のバッチ年が入っているもの（例: 2019-01E、2024、2025）だけを対象にし、IQR（四分位範囲の1.5倍）で外れ値を除いた中央値です。
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>区分</th><th>落札中央値</th><th>件数</th><th>外れ値除去後の範囲</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>年号つきバッチ（2014〜2026年表記）750ml</strong></td>
                  <td>{medianText}</td>
                  <td>n={y.filtered_n}件（除去前 {y.title_filtered_n}件）</td>
                  <td>{ok && y.min !== null && y.max !== null ? `${yenFmt(y.min)}〜${yenFmt(y.max)}` : "—"}</td>
                </tr>
                <tr>
                  <td>旧ボトル（アルファベット入りのバッチ番号・特級表記など）</td>
                  <td>掲載なし</td>
                  <td>—</td>
                  <td>約2万円〜10万円台（<a href="#old-bottle" className={linkCls}>5章</a>）</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">
            ※集計から除いたもの: 複数本のセット・まとめ出品、ミニボトル、空瓶、他銘柄との組み合わせ、750ml以外の容量が書かれた出品、バッチ年がタイトルにない出品。取得日 {y.fetched_at}。
            これは<strong>落札された市場価格</strong>であり、買取業者の提示額ではありません。
          </p>

          <h2 id="teika">2. 希望小売価格との比較</h2>
          <p>
            サントリーの商品情報ページには、<strong>「{sp.name}」</strong>（容量{sp.volume_ml}ml・アルコール度数{sp.abv}・JANコード {sp.jan}）の希望小売価格が<strong>{yenFmt(sp.price_jpy_ex_tax)}（消費税別）</strong>と記載されています。
            同ページでは「{sp.note}」「{sp.status}」と案内されています（{off.checked_at}確認）。
          </p>
          {ratio && (
            <p>
              税込に換算すると{yenFmt(taxIncl)}で、ヤフオクの落札中央値{medianText}はその約{ratio}倍です。
              ただし落札額には送料や出品手数料が含まれず、買取業者の提示額は落札額を下回るのが一般的なため、定価を上回る金額で買い取られるとは限りません。
            </p>
          )}
          <p className="text-xs text-warm-gray">※他の年のバッチについて、サントリーの商品情報ページで希望小売価格を確認できたのは2025年分のみです。</p>

          <h2 id="about">3. ブッカーズとは（公式情報）</h2>
          <ul>
            <li><strong>造り手</strong>: ジムビームの孫でマスターディスティラーだったブッカー・ノウ（Booker Noe）が1987年に発表したバーボンです。現在はブッカーの息子フレッド・ノウが各樽をテイスティングして瓶詰めの時期を決めると説明されています（ブッカーズ公式サイト）。</li>
            <li><strong>製法</strong>: 樽出しの度数のまま（バレルストレングス）、割水も濾過もせずに（uncut &amp; unfiltered）瓶詰めされます。サントリーの商品説明も「製造工程で割水を一切せず、樽から直接瓶詰めされているバーボン」です。</li>
            <li><strong>度数と熟成年数</strong>: 公式サイトは「毎年いくつかのバッチをリリースし、各バッチの熟成年数とプルーフは異なる」としています。例として、米国の2025-01「Barry&apos;s Batch」は熟成7年2か月4日・125.7プルーフ、2026-02「Milkshake Batch」は7年6か月12日・124.4プルーフです。</li>
            <li><strong>蒸溜所</strong>: 公式サイトの運営者表記は James B. Beam Distilling Co.（米国ケンタッキー州クレアモント）です。</li>
          </ul>

          <h2 id="batch">4. バッチ番号・度数の確認方法</h2>
          <p>
            ブッカーズは<strong>バッチごとに度数と熟成期間が異なる</strong>ため、査定ではボトルを特定する情報が必要です。ラベルで次の3点を確認し、買取業者に伝えてください。
          </p>
          <ol>
            <li><strong>バッチ番号</strong>: 公式サイトでは「2025-01」のように「年-番号」の形で表記されています。ヤフオクの出品には「2024-01E」のような表記も見られます。</li>
            <li><strong>度数（%・プルーフ）</strong>: プルーフの数値は度数（%）の2倍です（例: 125.7プルーフ＝約62.9%）。</li>
            <li><strong>熟成期間</strong>: 「7年1ヶ月」のように年・月（日）単位で書かれています。</li>
          </ol>
          <p>
            なお、米国の2025-01は125.7プルーフ（約62.9%）、サントリーの「{sp.name}」は{sp.abv}と表示されており、国内品と米国のバッチは度数の表示が一致しない場合があります。手元のボトルはラベルの表記をそのまま伝えるのが確実です。
          </p>

          <h2 id="old-bottle">5. 旧ボトルの扱い</h2>
          <p>
            同じ期間のヤフオクでは、アルファベット入りのバッチ番号（C90-K-28、B95-C-31、C-K-03-82 など）や「Booker Noe&apos;s」「特級」表記のボトルが、年号つきバッチより高い価格で落札されていました。
            ただし価格の幅が大きく件数も限られるため、<strong>当サイトでは中央値を出していません</strong>。以下は実際の落札例です（タイトルは要約）。
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>出品タイトル（要約）</th><th>落札額</th><th>終了日</th></tr>
              </thead>
              <tbody>
                {data.old_bottles.examples.map((e) => (
                  <tr key={e.title}>
                    <td>{e.title}</td>
                    <td>{yenFmt(e.price)}</td>
                    <td>{fmtDate(e.end)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">
            ※ヤフオク落札データ（取得日 {y.fetched_at}）。液面・ラベル・封蝋の状態や付属品で価格は大きく変わります。旧ボトルは1社だけで決めず、複数の業者に査定を依頼してください。
          </p>

          <h2 id="uru-mae">6. 売る前の確認事項</h2>
          <ul>
            <li><strong>未開栓か</strong>: 開栓済みのお酒は買取の対象外とする業者があります。事前に各業者の条件を確認してください。</li>
            <li><strong>木箱・冊子の有無</strong>: 集計対象の出品{y.title_filtered_n}件のうち36件はタイトルに「箱付」「木箱」等の記載がありました。付属品が残っていれば一緒に査定に出してください（木箱の有無による価格差は当サイトでは集計していません）。</li>
            <li><strong>ラベル情報の控え</strong>: バッチ番号・度数・熟成期間・容量を写真に撮っておくと、オンライン査定で伝えやすくなります。</li>
            <li><strong>相見積もり</strong>: 業者ごとに在庫状況や販売先が異なるため、複数の業者で比較してください。手順は<Link href="/articles/whisky-takaku-uru/" className={linkCls}>ウイスキーを高く売るコツ</Link>にまとめています。</li>
          </ul>

          <h2 id="faq">7. よくある質問</h2>
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

          <h2 id="sources">8. 出典・集計方法</h2>
          <ul className="text-sm">
            <li>サントリー 商品情報「<a href={sp.url} className={linkCls} rel="noopener" target="_blank">{sp.name}</a>」（{off.checked_at}確認）</li>
            <li>Booker&apos;s Bourbon 公式「<a href={off.bookers_about} className={linkCls} rel="noopener" target="_blank">About Booker</a>」（{off.checked_at}確認）</li>
            <li>Booker&apos;s Bourbon 公式「<a href={off.batch_2025_01_us.url} className={linkCls} rel="noopener" target="_blank">2025-01 “Barry&apos;s Batch”</a>」「<a href={off.batch_2026_02_us.url} className={linkCls} rel="noopener" target="_blank">2026-02 “Milkshake Batch”</a>」（{off.checked_at}確認）</li>
            <li>ヤフオク 落札済みオークション検索「{y.query}」（取得日 {y.fetched_at}・直近{y.raw_n}件・終了日 {period}）。タイトルを目視で確認し、IQR外れ値除去後の中央値を算出。n&lt;20の区分は中央値を出しません。詳しくは<Link href="/methodology/" className={linkCls}>集計方法</Link>をご覧ください。</li>
          </ul>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/whisky-kaitori-souba/" className="text-amber-dark hover:text-burgundy underline">ウイスキー買取相場ガイド</Link></li>
              <li><Link href="/articles/whisky-takaku-uru/" className="text-amber-dark hover:text-burgundy underline">ウイスキーを高く売るコツ</Link></li>
              <li><Link href="/articles/whisky-sell-guide/" className="text-amber-dark hover:text-burgundy underline">ウイスキーを売る手順</Link></li>
              <li><Link href="/articles/whisky-hokan-houhou/" className="text-amber-dark hover:text-burgundy underline">ウイスキーの保管方法</Link></li>
              <li><Link href="/articles/whisky-kaitori-zeikin/" className="text-amber-dark hover:text-burgundy underline">ウイスキーを売ったときの税金</Link></li>
              <li><Link href="/souba-ranking/" className="text-amber-dark hover:text-burgundy underline">ウイスキー買取相場ランキング</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
