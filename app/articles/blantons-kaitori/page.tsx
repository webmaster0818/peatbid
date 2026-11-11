import type { Metadata } from "next";
import Link from "next/link";
import data from "./data.json";

// 2026-11-11 新規「ブラントン 買取」受け皿（kw-expansion・手書き＝週次再生成の対象外）。
// ⚠️ 価格はこのディレクトリの data.json（ヤフオク落札の実測値）のみ。出品タイトルを目視で確認した出品だけで集計。
//    fetch-yahoo-medians.py と同じ closedsearch・extract_items・JUNK_RE・ML_RE・iqr_filter・n>=20 の規則（スクリプト本体は未変更）。
//    ブラントンの国内流通品は 750ml。ゴールド・ブラックは n<20 のため中央値を出さない（ゴールドは落札例のみ）。
// 国内品の度数・容量は宝酒造の商品紹介、ブランドの由来・ダンプ日・ストッパーは Blanton's 公式サイトの記載のみ（2026-11-11 確認）。

type Agg = {
  label: string;
  query: string;
  fetched_at: string;
  end_date_from: string | null;
  end_date_to: string | null;
  raw_n: number;
  title_filtered_n: number;
  filtered_n: number;
  median: number | null;
  q1: number | null;
  q3: number | null;
  min: number | null;
  max: number | null;
  insufficient: boolean;
};

const Y = data.yahoo as unknown as Record<string, Agg>;
const off = data.official;
const yenFmt = (v: number) => `${v.toLocaleString("ja-JP")}円`;
const fmtDate = (d: string | null) => (d ? d.replace(/-/g, "/") : "—");
const ok = (a: Agg | undefined): a is Agg => !!a && !a.insufficient && typeof a.median === "number" && a.filtered_n >= 20;
const med = (k: string) => (ok(Y[k]) ? yenFmt(Y[k].median as number) : null);
const std = Y["standard"];
const old = Y["old"];
const gold = Y["gold"];
const black = Y["black"];
const fetchedAt = std?.fetched_at ?? "2026-11-11";

const linkCls = "text-amber-dark underline hover:text-burgundy";

export const metadata: Metadata = {
  title: `ブラントンの買取相場【2026年11月】ヤフオク落札中央値${med("standard") ?? "集計中"}｜ゴールド・ブラック・旧ボトル（1980〜2000年代）別`,
  description: `ブラントン（750ml・46.5%）の買取相場を、ヤフオク落札データの中央値${med("standard") ?? "集計中"}で掲載しています。1980〜2000年代のダンプ年表記の旧ボトル、ゴールド・ブラックの落札例、ラベルのダンプ日と馬のストッパーの確認方法をまとめています。`,
  alternates: { canonical: "/articles/blantons-kaitori/" },
};

const faqs = [
  {
    q: "ブラントンの買取相場はいくらですか？",
    a: ok(std)
      ? `当サイトの集計では、ブラントン（750ml・1本出品・2020年以降またはダンプ年の記載なし）のヤフオク落札価格の中央値は${med("standard")}です（n=${std.filtered_n}件・取得日 ${fetchedAt}）。これは落札された市場価格であり、業者の買取額はここから手数料等を引いた水準になります。`
      : "落札データの件数が20件に満たないため、中央値は掲載していません。",
  },
  {
    q: "古いブラントン（1980〜90年代）は高く売れますか？",
    a: ok(old)
      ? `タイトルに1980〜2000年代のダンプ年が書かれた出品は、中央値${med("old")}（n=${old.filtered_n}件）でした。ただし中央の半数が${yenFmt(old.q1 as number)}〜${yenFmt(old.q3 as number)}と幅が大きく、液面・封蝋・付属品の状態で価格が大きく変わります。Blanton's 公式サイトのFAQも「古いボトルは最近のボトルより価値がある可能性があるが、鑑定人ではないので確かなことは言えない」と回答しています。`
      : "件数が不足しているため、中央値は掲載していません。",
  },
  {
    q: "ゴールドやブラックはいくらですか？",
    a: `当サイトが確認した期間の1本出品は、ゴールド（750ml・51.5%）が${gold?.filtered_n ?? 0}件、ブラック（750ml・40%）が${black?.filtered_n ?? 0}件で、いずれも20件に満たないため中央値は出していません。ゴールドの落札例は5章をご覧ください。`,
  },
  {
    q: "ラベルの日付は瓶詰め日ですか？",
    a: "Blanton's 公式サイトのFAQによると、ラベルに書かれているのはダンプ日（ウイスキーを樽から出した日）で、瓶詰め日とは必ずしも一致しません。樽から出した後、1〜2日ほどで瓶詰めされることがあると説明されています。",
  },
  {
    q: "馬のストッパーの文字で価値は変わりますか？",
    a: "公式サイトのFAQでは、ストッパーの文字は「すべて同じ数だけ作られている」と説明されています。手作業で瓶詰めするため無作為に付けられ、特定の文字が見つけにくく感じられるだけとされています。当サイトの集計でも、文字ごとの価格差は集計していません。",
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
  { id: "current-price", label: "1. 落札価格の中央値（ボトル別）" },
  { id: "lineup", label: "2. 国内で流通するブラントン（宝酒造の商品紹介）" },
  { id: "about", label: "3. ブラントンとは（公式情報）" },
  { id: "label", label: "4. ダンプ日・ストッパーの確認方法" },
  { id: "gold", label: "5. ゴールドの落札例" },
  { id: "uru-mae", label: "6. 売る前の確認事項" },
  { id: "faq", label: "7. よくある質問" },
  { id: "sources", label: "8. 出典・集計方法" },
];

const rows: { key: string; name: string }[] = [
  { key: "standard", name: "ブラントン（46.5%）・2020年以降またはダンプ年の記載なし" },
  { key: "old", name: "1980〜2000年代のダンプ年表記（旧ボトル）" },
  { key: "gold", name: "ゴールド（51.5%）" },
  { key: "black", name: "ブラック（40%）" },
];

export default function BlantonsKaitoriPage() {
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
            <li><span className="text-foreground">ブラントン 買取</span></li>
          </ol>
        </nav>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">ブラントンの買取相場｜ヤフオク落札中央値と旧ボトル・ゴールド・ブラックの違い</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {fetchedAt} / 編集: <Link href="/editorial/" className={linkCls}>PeatBid編集部</Link></p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">結論</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              {ok(std) && <li><strong>ブラントン（750ml・46.5%）</strong>のヤフオク落札中央値は<strong>{med("standard")}</strong>です（n={std.filtered_n}件・中央の半数は{yenFmt(std.q1 as number)}〜{yenFmt(std.q3 as number)}）。</li>}
              {ok(old) && <li><strong>1980〜2000年代のダンプ年が書かれた旧ボトル</strong>は中央値<strong>{med("old")}</strong>（n={old.filtered_n}件）で、現行品より高い一方、状態による差が大きくなっています。</li>}
              <li><strong>ゴールド・ブラック</strong>は件数が少ないため中央値を出していません（ゴールドの落札例は<a href="#gold" className={linkCls}>5章</a>）。</li>
              <li>掲載額は<strong>落札された市場価格</strong>です。業者の買取額はここから手数料等を引いた水準になります。</li>
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

          <h2 id="current-price">1. 落札価格の中央値（ボトル別）</h2>
          <p>
            ヤフオクの落札済みオークションを「{std?.query}」で検索し、取得できた直近{std?.raw_n}件の出品タイトルを1件ずつ確認しました。
            750mlの1本出品だけを残し、セット・まとめ出品、375ml、空瓶、ブラントン以外の商品（手袋・楽器・書籍など）、「訳アリ」「液面低下」「封印切れ」と書かれた出品は除いています。
            IQR（四分位範囲の1.5倍）で外れ値を除いた中央値です。<strong>件数（n）が20件未満の区分は中央値を掲載していません。</strong>
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>区分（750ml）</th><th>落札中央値</th><th>件数</th><th>中央の半数</th></tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const a = Y[r.key];
                  if (!a) return null;
                  return (
                    <tr key={r.key}>
                      <td><strong>{r.name}</strong></td>
                      <td>{med(r.key) ?? "データ不足（n<20）"}</td>
                      <td>n={a.filtered_n}件</td>
                      <td>{ok(a) ? `${yenFmt(a.q1 as number)}〜${yenFmt(a.q3 as number)}` : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">
            ※取得日 {fetchedAt}・終了日 {fmtDate(std?.end_date_from ?? null)}〜{fmtDate(std?.end_date_to ?? null)}（検索1回あたり最大150件のため直近約3週間分）。
            旧ボトルは、タイトルに1980〜2000年代の年が書かれた出品です。2010年代の年が書かれた出品はどちらの区分にも入れていません。これは<strong>落札された市場価格</strong>であり、買取業者の提示額ではありません。
          </p>

          <h2 id="lineup">2. 国内で流通するブラントン（宝酒造の商品紹介）</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>商品名</th><th>アルコール度数</th><th>容量</th></tr>
              </thead>
              <tbody>
                {off.lineup_jp.map((l) => (
                  <tr key={l.name}><td><strong>{l.name}</strong></td><td>{l.abv}</td><td>{l.ml}ml</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            宝酒造の商品紹介では、ブラントンは「ひと樽ごとに厳格にテイスティングし、熟成のピークを迎えたものだけが選ばれる」シングルバレルバーボン、ゴールドは「樽出し原酒に近い状態でボトリング」、ブラックは「口当たりをややマイルドに仕上げた」製品と説明されています（{off.checked_at}確認）。
            度数が違うため、査定ではラベルの商品名と度数を確認してください。ヤフオクには「ストレート フロム ザ バレル」など、上記以外の表記の出品もありました。
          </p>

          <h2 id="about">3. ブラントンとは（公式情報）</h2>
          <ul>
            <li><strong>始まり</strong>: Blanton&apos;s 公式サイトによると、1984年にマスターディスティラーのエルマー・T・リーが、1952年まで蒸溜所の社長を務めたアルバート・B・ブラントン大佐にちなんで「Blanton&apos;s Single Barrel」と名付けて発表しました。「世界初のシングルバレルバーボン」と説明されています。</li>
            <li><strong>熟成庫</strong>: 禁酒法廃止後に建てた金属製の「ウェアハウスH」で熟成しています。金属の壁は外気温の変化が伝わりやすく、樽との反応が一定のペースで進むと説明されています。</li>
            <li><strong>蒸溜所</strong>: ケンタッキー州フランクフォートのバッファロー・トレース蒸溜所で造られています。</li>
            <li><strong>流通</strong>: 公式FAQは「蒸溜量を増やしているが需要が供給を上回っている」と説明しています。</li>
          </ul>

          <h2 id="label">4. ダンプ日・ストッパーの確認方法</h2>
          <ol>
            <li><strong>ダンプ日（Dump date）</strong>: ラベルに手書きで記入されている日付は、樽から出した日です（公式FAQ）。旧ボトルかどうかは、この年で判断できます。1章の「旧ボトル」はタイトルに1980〜2000年代の年が書かれた出品で集計しています。</li>
            <li><strong>度数</strong>: 宝酒造の商品紹介では、ブラントン 46.5%・ゴールド 51.5%・ブラック 40%です。</li>
            <li><strong>ストッパー（馬の栓）</strong>: 公式FAQでは、750mlと375mlに文字入りのストッパーが使われ、文字は「すべて同じ数だけ作られている」と説明されています。50mlのストッパーには文字がありません。</li>
            <li><strong>付属品</strong>: 化粧箱・巾着袋の有無を確認してください。ヤフオクでは「箱・巾着付き」と書かれた出品が多くありました（付属品の有無による価格差は集計していません）。</li>
          </ol>

          <h2 id="gold">5. ゴールドの落札例</h2>
          <p>
            ゴールド（750ml）の1本出品は、当サイトが確認した期間で{gold?.filtered_n ?? 0}件でした。件数が20件に満たないため中央値は出していません。以下は実際の落札例です（タイトルは要約）。
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>出品タイトル（要約）</th><th>落札額</th><th>終了日</th></tr>
              </thead>
              <tbody>
                {data.gold_examples.map((e) => (
                  <tr key={`${e.title}-${e.end}-${e.price}`}>
                    <td>{e.title}</td>
                    <td>{yenFmt(e.price)}</td>
                    <td>{fmtDate(e.end)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">※ダンプ年が古いゴールド（1990年代など）は、2025〜2026年表記のものより高く落札された例がありました。状態と付属品で価格は大きく変わります。</p>

          <h2 id="uru-mae">6. 売る前の確認事項</h2>
          <ul>
            <li><strong>ラベルの3点を控える</strong>: 商品名（ブラントン／ゴールド／ブラック）、ダンプ日、度数を写真に撮っておくと、オンライン査定で伝えやすくなります。</li>
            <li><strong>封蝋と液面</strong>: ヤフオクでは「蝋キャップひび」「液面低下」と書かれた出品が低い価格で落札されていました。状態は正直に伝えてください。</li>
            <li><strong>未開栓か</strong>: 開栓済みのお酒は買取の対象外とする業者があります。事前に各業者の条件を確認してください。</li>
            <li><strong>相見積もり</strong>: 特に旧ボトルは価格の幅が大きいため、複数の業者で比較してください。手順は<Link href="/articles/whisky-takaku-uru/" className={linkCls}>ウイスキーを高く売るコツ</Link>にまとめています。</li>
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
            <li>宝酒造「<a href={off.takara} className={linkCls} rel="noopener" target="_blank">商品紹介（洋酒）</a>」（度数・容量・商品説明。{off.checked_at}確認）</li>
            <li>Blanton&apos;s 公式「<a href={off.tradition} className={linkCls} rel="noopener" target="_blank">Our Story</a>」「<a href={off.faq} className={linkCls} rel="noopener" target="_blank">FAQ</a>」（{off.checked_at}確認）</li>
            <li>ヤフオク 落札済みオークション検索「{std?.query}」（取得日 {fetchedAt}・直近{std?.raw_n}件）。タイトルを目視で確認し、IQR外れ値除去後の中央値を算出。n&lt;20の区分は中央値を出しません。詳しくは<Link href="/methodology/" className={linkCls}>集計方法</Link>をご覧ください。</li>
          </ul>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/bookers-kaitori/" className={linkCls}>ブッカーズの買取相場</Link></li>
              <li><Link href="/articles/four-roses-kaitori/" className={linkCls}>フォアローゼズの買取相場</Link></li>
              <li><Link href="/articles/jack-daniels-kaitori/" className={linkCls}>ジャックダニエルの買取相場</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className={linkCls}>ウイスキー買取相場ガイド</Link></li>
              <li><Link href="/articles/whisky-sell-guide/" className={linkCls}>ウイスキーを売る手順</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
