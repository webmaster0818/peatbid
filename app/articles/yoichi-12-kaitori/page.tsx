import type { Metadata } from "next";
import Link from "next/link";
import data from "./data.json";

// 2026-11-28 新規「余市 12年 買取」受け皿（kw-expansion・手書き＝週次再生成の対象外）。
// GSC では「余市 12年 買取」が /articles/yoichi-10-kaitori/（余市10年）に表示されていた（30回前後・30〜40位）。
// yoichi-10 の本文は余市12年を扱っていないため新設し、yoichi-10 側から導線を付けた（generate-brand-pages-v3.py の SIBLING_GUIDE）。
// ⚠️ 価格はこのディレクトリの data.json（ヤフオク落札の実測値）のみ。出品タイトルを目視で確認した出品だけで集計。
//    fetch-yahoo-medians.py と同じ closedsearch・extract_items・JUNK_RE・ML_RE・IQR・n>=20 の規則（スクリプト本体は未変更）。
//    区分は出品タイトルの容量・度数・表記（700ml 45%／750ml「北海道余市モルト原酒」／500ml 55% の3種の樽表記）で分けた。
//    10年・15年・20年・宮城峡などとの混在、2本以上のセット、ミニ、70周年記念ボトル、液面低下・ラベル/箱の傷み等の表記がある出品は除外。
// 製品の情報はアサヒビールのニュースリリース（2011/7/19・2015/6/15）のみ。nikka.com は 403 のため使っていない。

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
const range = (a: { min: number | null; max: number | null } | undefined) =>
  a && a.min && a.max ? (a.min === a.max ? yenFmt(a.min) : `${yenFmt(a.min)}〜${yenFmt(a.max)}`) : "—";
const y700 = Y["12-700"];
const y750 = Y["12-750"];
const yCask = Y["12-500-cask"];
const fetchedAt = y700?.fetched_at ?? "2026-11-28";

const linkCls = "text-amber-dark underline hover:text-burgundy";

export const metadata: Metadata = {
  title: `余市12年の買取相場【2026年11月】700ml ${med("12-700") ?? "集計中"}｜ヤフオク落札中央値と2015年8月の販売終了`,
  description: `シングルモルト余市12年の買取相場を、ヤフオクの落札データで掲載しています。700ml・45%の落札中央値は${med("12-700") ?? "集計中"}（n=${y700?.filtered_n ?? 0}件）。750mlの旧ボトル、500ml・55%の樽表記ボトルの落札額と、アサヒビールの発表にもとづく販売終了の時期をまとめています。`,
  alternates: { canonical: "/articles/yoichi-12-kaitori/" },
};

const faqs = [
  {
    q: "余市12年の買取相場はいくらですか？",
    a: ok(y700)
      ? `当サイトの集計では、出品タイトルに「700ml」「45%」とあるシングルモルト余市12年のヤフオク落札中央値は${med("12-700")}です（n=${y700.filtered_n}件・中央の半数は${yenFmt(y700.q1 as number)}〜${yenFmt(y700.q3 as number)}・取得日 ${fetchedAt}）。落札された市場価格であり、業者の買取額はここから手数料等を引いた水準になります。`
      : "落札データの件数が20件に満たないため、中央値は掲載していません。",
  },
  {
    q: "余市12年は終売していますか？",
    a: "アサヒビールは2015年6月15日のリリースで、熟成年数を表さない『シングルモルト余市』の発売（2015年9月1日）にあわせて、「シングルモルト余市10年・12年・15年・20年」を2015年8月末で販売終了すると発表しています。",
  },
  {
    q: "750mlの余市12年は700mlと別のボトルですか？",
    a: `出品タイトルに「750ml」「北海道余市モルト原酒」と書かれた余市12年は、今回${y750?.filtered_n ?? 0}件が${range(y750)}で落札されていました（20件未満のため中央値なし）。2011年のアサヒビールのリリースに記載されている余市12年の容量は700mlで、750mlのボトルの発売時期は当サイトでは公式の資料で確認できていません。`,
  },
  {
    q: "500ml・55%の「シェリー&スイート」などの余市12年はいくらですか？",
    a: `出品タイトルに「シェリー&スイート」「ウッディ&バニラ」「ピーティ&ソルティ」とある500ml・55%の余市12年は${yCask?.filtered_n ?? 0}件で、落札額は${range(yCask)}でした。20件に満たないため、中央値は出していません。これらの商品の発売時期や販売場所は、当サイトでは公式の資料で確認できていないため掲載していません。`,
  },
  {
    q: "余市12年の度数と容量は？",
    a: "2011年7月19日のアサヒビールのリリースでは、シングルモルト余市12年はアルコール分45%、瓶700mlと記載されています。価格はオープン価格です。",
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
  { id: "current-price", label: "1. 落札価格の中央値" },
  { id: "other-bottles", label: "2. 750ml・500mlの余市12年" },
  { id: "about", label: "3. 余市12年とは（アサヒビールの発表）" },
  { id: "uru-mae", label: "4. 売る前の確認事項" },
  { id: "faq", label: "5. よくある質問" },
  { id: "sources", label: "6. 出典・集計方法" },
];

const rows: { key: string; name: string; spec: string }[] = [
  { key: "12-700", name: "シングルモルト余市12年", spec: "700ml・45%" },
  { key: "12-750", name: "余市12年「北海道余市モルト原酒」等の表記", spec: "750ml" },
  { key: "12-500-cask", name: "余市12年 シェリー&スイート／ウッディ&バニラ／ピーティ&ソルティ", spec: "500ml・55%" },
];

export default function Yoichi12KaitoriPage() {
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
            <li><span className="text-foreground">余市12年 買取</span></li>
          </ol>
        </nav>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">余市12年の買取相場｜ヤフオク落札中央値と750ml・500mlの価格、2015年の販売終了</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {fetchedAt} / 編集: <Link href="/editorial/" className={linkCls}>PeatBid編集部</Link></p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">落札価格の概要</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              {ok(y700) && <li><strong>シングルモルト余市12年（700ml・45%）</strong>のヤフオク落札中央値は<strong>{med("12-700")}</strong>です（n={y700.filtered_n}件・中央の半数は{yenFmt(y700.q1 as number)}〜{yenFmt(y700.q3 as number)}）。</li>}
              <li>余市12年は、アサヒビールの発表で<strong>2015年8月末に販売を終了</strong>しています。</li>
              <li>750mlの旧ボトルは{y750?.filtered_n ?? 0}件・{range(y750)}、500ml・55%の樽表記ボトルは{yCask?.filtered_n ?? 0}件・{range(yCask)}で落札されています（いずれも20件未満のため中央値なし）。</li>
              <li>掲載額は<strong>落札された市場価格</strong>です。業者の買取額はここから手数料等を引いた水準になります。</li>
            </ul>
          </div>

          <div className="bg-cream/40 border border-amber/40 rounded-xl p-4 my-5 not-prose">
            <p className="text-sm text-ink">余市10年をお持ちの方は <Link href="/articles/yoichi-10-kaitori/" className="text-amber-dark underline font-bold">余市10年の買取相場</Link>、年数表記のない余市は <Link href="/articles/yoichi-nv-kaitori/" className="text-amber-dark underline font-bold">余市NV（ノンエイジ）の買取価格</Link> をご覧ください。</p>
          </div>

          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-semibold text-ink mb-2">目次</p>
            <ul className="text-sm space-y-1 list-disc list-inside text-warm-gray">
              {tocItems.map((t) => (
                <li key={t.id}><a href={`#${t.id}`} className={linkCls}>{t.label}</a></li>
              ))}
            </ul>
          </div>

          <h2 id="current-price">1. 落札価格の中央値</h2>
          <p>
            ヤフオクの落札済みオークションを4つの検索語（「余市 12年」「余市12年」「シングルモルト余市 12年」「YOICHI 12」）で検索し、重複を除いた{y700?.raw_n}件の出品タイトルを1件ずつ確認しました。
            容量（700ml・750ml・500ml）と度数、タイトルに書かれた樽の表記で区分を分けています。
            10年・15年・20年・宮城峡などのほかのボトルが含まれる出品、2本以上のセット、ミニボトル・180ml、70周年記念ボトル、「液面低下」やラベル・箱の傷みの記載がある出品は除きました。
            IQR（四分位範囲の1.5倍）で外れ値を除いた中央値です。<strong>件数（n）が20件未満の区分は中央値を掲載していません。</strong>
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>ボトル</th><th>落札中央値</th><th>件数</th><th>中央の半数／範囲</th><th>終了日の範囲</th></tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const a = Y[r.key];
                  if (!a) return null;
                  return (
                    <tr key={r.key}>
                      <td><strong>{r.name}</strong>（{r.spec}）</td>
                      <td>{med(r.key) ?? "データ不足（n<20）"}</td>
                      <td>n={a.filtered_n}件</td>
                      <td>{ok(a) ? `${yenFmt(a.q1 as number)}〜${yenFmt(a.q3 as number)}` : `範囲 ${range(a)}`}</td>
                      <td>{fmtDate(a.end_date_from)}〜{fmtDate(a.end_date_to)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">
            ※取得日 {fetchedAt}。検索1回あたり最大150件のため、区分ごとに集計期間が異なります（終了日の範囲を参照）。
            これは<strong>落札された市場価格</strong>であり、買取業者の提示額ではありません。
          </p>
          <p>
            700ml・45%の出品は{y700?.title_filtered_n ?? 0}件で、外れ値を除いた{y700?.filtered_n ?? 0}件が{range(y700)}の範囲に収まっていました。
            「旧ボトル」「旧ラベル」「単一蒸溜所モルト」と書かれた出品も含まれますが、これらの表記で価格の差は見られませんでした。
            除外した出品のうち、「液面低下」「オリあり」と書かれた700mlは29,150円の落札が2件ありました。
          </p>

          <h2 id="other-bottles">2. 750ml・500mlの余市12年</h2>
          <ul>
            <li>
              <strong>750ml（「北海道余市モルト原酒」などの表記）</strong>: {y750?.filtered_n ?? 0}件・{range(y750)}でした。出品タイトルでは43%と書かれています。
              このほか、「液面低下」「ラベル色褪せ」と書かれた750mlは25,000円前後で落札されていました（集計からは除外）。
            </li>
            <li>
              <strong>500ml・55%（「シェリー&スイート」「ウッディ&バニラ」「ピーティ&ソルティ」）</strong>: {yCask?.filtered_n ?? 0}件・{range(yCask)}でした。
              出品タイトルには「余市蒸溜所限定」と書かれたものがあります。180mlの同じ表記のボトルは1万円前後で落札されていました（集計からは除外）。
            </li>
            <li>
              <strong>70周年記念ボトル（700ml・58%）</strong>: 2件の落札があり、通常の12年とは別の価格帯でした（集計からは除外）。
            </li>
          </ul>
          <p>
            750mlのボトルと500mlの樽表記ボトルの発売時期・販売場所は、当サイトでは公式の資料で確認できていません。
            容量・度数・ラベルの表記をそのまま査定の申込みに書き、写真を添えて依頼してください。
          </p>

          <h2 id="about">3. 余市12年とは（アサヒビールの発表）</h2>
          <ul>
            <li><strong>度数と容量</strong>: 2011年7月19日のアサヒビールのリリースでは、「シングルモルト 余市12年」はアルコール分45%・瓶700ml・オープン価格と記載されています（同じリリースで余市10年・15年は45%、20年は52%）。</li>
            <li><strong>2011年のラベル変更</strong>: 同じリリースで、海外での評価の高まりにより輸出が増えていることから、余市10年・12年・15年・20年のラベルを「YOICHI」とローマ字表記をわかりやすくした国内・輸出共通のものに変え、700mlはスリムな新しい瓶型にすると発表しています（発売日は9月6日）。</li>
            <li><strong>製品の特長</strong>: 余市蒸溜所で蒸溜・熟成したシングルモルトで、石炭直火による蒸溜の豊かな香りと、力強く重厚な味わいが特長と説明されています。</li>
            <li><strong>販売終了</strong>: 2015年6月15日のリリースで、熟成年数を表さない『シングルモルト余市』を2015年9月1日に発売するのにあわせ、「シングルモルト余市10年・12年・15年・20年」を2015年8月末で販売終了すると発表しています。理由は、限りある原酒を有効に活用し、継続的にシングルモルトを提供するためにラインアップを集約するためと説明されています。</li>
          </ul>
          <p className="text-xs text-warm-gray">
            ※アサヒビールのニュースリリース（2011年7月19日・2015年6月15日）より（{off.checked_at}確認）。販売者はアサヒビール、製造者はニッカウヰスキーです。
            ニッカウヰスキーの公式サイトは当サイトから取得できなかったため参照していません。
          </p>

          <h2 id="uru-mae">4. 売る前の確認事項</h2>
          <ul>
            <li><strong>容量と度数を確認する</strong>: 700ml・45%、750ml、500ml・55%で落札額の区分が分かれます。ラベルの表示をそのまま査定の申込みに書いてください。</li>
            <li><strong>年数を確認する</strong>: 余市10年・15年・20年や、年数表記のない余市とは価格が異なります。10年は<Link href="/articles/yoichi-10-kaitori/" className={linkCls}>余市10年の買取相場</Link>、15年は<Link href="/articles/yoichi-15-kaitori/" className={linkCls}>余市15年の買取相場</Link>をご覧ください。</li>
            <li><strong>状態を伝える</strong>: 販売終了から10年以上たったボトルです。今回の集計では、液面低下・オリ・ラベルや箱の傷みの記載がある出品を除いています。該当する場合は、掲載額より低くなる可能性があります。保管については<Link href="/articles/whisky-hokan-houhou/" className={linkCls}>ウイスキーの保管方法</Link>にまとめています。</li>
            <li><strong>相見積もり</strong>: 業者ごとに販売先と在庫が異なるため、複数の業者で比べてください。手順は<Link href="/articles/whisky-takaku-uru/" className={linkCls}>ウイスキーを高く売るコツ</Link>と<Link href="/articles/whisky-sell-guide/" className={linkCls}>ウイスキーの売り方ガイド</Link>にまとめています。</li>
          </ul>

          <h2 id="faq">5. よくある質問</h2>
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

          <h2 id="sources">6. 出典・集計方法</h2>
          <ul className="text-sm">
            <li>アサヒビール「<a href={off.asahi_2011} className={linkCls} rel="noopener" target="_blank">『竹鶴21年ピュアモルトWWA2011受賞記念ラベル』発売 同時に、モルトウイスキーシリーズのラベル・ボトルデザインをリニューアル</a>」（2011年7月19日・{off.checked_at}確認）</li>
            <li>アサヒビール「<a href={off.asahi_2015} className={linkCls} rel="noopener" target="_blank">『シングルモルト余市』『シングルモルト宮城峡』新発売</a>」（2015年6月15日・{off.checked_at}確認）</li>
            <li>ヤフオク 落札済みオークション検索（取得日 {fetchedAt}）。検索語「{y700?.query}」。タイトルを目視で確認し、IQR外れ値除去後の中央値を算出。n&lt;20の区分は中央値を出しません。詳しくは<Link href="/methodology/" className={linkCls}>集計方法</Link>をご覧ください。</li>
          </ul>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/yoichi-10-kaitori/" className={linkCls}>余市10年の買取相場</Link></li>
              <li><Link href="/articles/yoichi-15-kaitori/" className={linkCls}>余市15年の買取相場</Link></li>
              <li><Link href="/articles/yoichi-20-kaitori/" className={linkCls}>余市20年の買取相場</Link></li>
              <li><Link href="/articles/yoichi-nv-kaitori/" className={linkCls}>余市NV（ノンエイジ）の買取価格</Link></li>
              <li><Link href="/articles/yoichi-grande-kaitori/" className={linkCls}>余市 グランデの買取相場</Link></li>
              <li><Link href="/articles/miyagikyo-12-kaitori/" className={linkCls}>宮城峡12年の買取相場</Link></li>
              <li><Link href="/articles/hibiki-12-kaitori/" className={linkCls}>響12年の買取相場</Link></li>
              <li><Link href="/articles/japanese-whisky-kaitori/" className={linkCls}>ジャパニーズウイスキーの買取相場</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
