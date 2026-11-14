import type { Metadata } from "next";
import Link from "next/link";
import data from "./data.json";

// 2026-11-14 新規「余市 グランデ 買取」受け皿（kw-expansion・手書き＝週次再生成の対象外）。
// ⚠️ 価格はこのディレクトリの data.json（ヤフオク落札の実測値）のみ。出品タイトルを目視で確認した出品だけで集計。
//    fetch-yahoo-medians.py と同じ closedsearch・extract_items・JUNK_RE・ML_RE・iqr_filter・n>=20 の規則（スクリプト本体は未変更）。
//    1本出品と、宮城峡 グランデとの2本セットを分けた（セットは JUNK_RE を外して別区分・キーワード詰め込み「検:」の出品は除外）。
//    2区分とも n<20 のため中央値は出さない。
// 製品情報は発表元（アサヒビール）の PR TIMES リリース（2022/3/25）のみ。終売時期は公式の記載がないため書かない。

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
const range = (a: Agg | undefined) =>
  a && a.min && a.max ? (a.min === a.max ? yenFmt(a.min) : `${yenFmt(a.min)}〜${yenFmt(a.max)}`) : "—";
const yG = Y["grande"];
const ySet = Y["grande-set"];
const fetchedAt = yG?.fetched_at ?? "2026-11-14";

const linkCls = "text-amber-dark underline hover:text-burgundy";

export const metadata: Metadata = {
  title: `余市 グランデの買取相場【2026年11月】${range(yG)}｜空港免税店限定品のヤフオク落札額`,
  description: `シングルモルト余市 グランデの買取相場を、ヤフオクの落札データで掲載しています。1本出品は${yG?.filtered_n ?? 0}件・${range(yG)}。2022年に空港免税店向けに数量限定で発売された商品で、参考小売価格は10,000円（税抜）です。宮城峡 グランデとのセットの落札額もまとめています。`,
  alternates: { canonical: "/articles/yoichi-grande-kaitori/" },
};

const faqs = [
  {
    q: "余市 グランデの買取相場はいくらですか？",
    a: `当サイトの集計では、ヤフオクで落札されたシングルモルト余市 グランデ（700ml）の1本出品は${yG?.filtered_n ?? 0}件で、${range(yG)}でした（${fmtDate(yG?.end_date_from ?? null)}〜${fmtDate(yG?.end_date_to ?? null)}・取得日 ${fetchedAt}）。20件に満たないため、中央値は出していません。落札された市場価格であり、業者の買取額はここから手数料等を引いた水準になります。`,
  },
  {
    q: "余市 グランデはどこで売られていた商品ですか？",
    a: "アサヒビールの2022年3月25日の発表によると、国内の空港免税店向けの商品として、2022年4月12日に全国の空港免税店で数量限定で発売されました。同年2月からシンガポールのチャンギ空港でも販売されていました。",
  },
  {
    q: "余市 グランデの定価はいくらですか？",
    a: "発表時の参考小売価格は10,000円（税抜）です。容量は700ml、アルコール分は48度です。",
  },
  {
    q: "宮城峡 グランデとセットで売るとどうなりますか？",
    a: `ヤフオクでは、余市 グランデと宮城峡 グランデの2本セットが${ySet?.filtered_n ?? 0}件、${range(ySet)}で落札されていました。余市 グランデの1本出品の範囲の約2倍です。業者に査定を依頼する際は、2本の内訳を伝えてください。`,
  },
  {
    q: "通常の「シングルモルト余市」とは何が違いますか？",
    a: "発表元のリリースでは、余市 グランデは「シングルモルト余市」のヘビーピートモルト原酒と新樽熟成モルト原酒の個性をより引き出した商品で、ろ過を常温で行う「ノンチルフィルタード製法」を採用していると説明されています。ラベルは白をベースに、空港免税店向け商品のアイコンである羅針盤が描かれています。",
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
  { id: "current-price", label: "1. 落札額の範囲" },
  { id: "about", label: "2. 余市 グランデとは（公式発表）" },
  { id: "compare", label: "3. 余市の他のボトルとの関係" },
  { id: "uru-mae", label: "4. 売る前の確認事項" },
  { id: "faq", label: "5. よくある質問" },
  { id: "sources", label: "6. 出典・集計方法" },
];

const rows: { key: string; name: string }[] = [
  { key: "grande", name: "シングルモルト余市 グランデ（1本・700ml）" },
  { key: "grande-set", name: "余市 グランデ＋宮城峡 グランデの2本セット" },
];

export default function YoichiGrandeKaitoriPage() {
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
            <li><span className="text-foreground">余市 グランデ 買取</span></li>
          </ol>
        </nav>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">余市 グランデの買取相場｜空港免税店限定品のヤフオク落札額と公式情報</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {fetchedAt} / 編集: <Link href="/editorial/" className={linkCls}>PeatBid編集部</Link></p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">落札価格の概要</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              {yG && <li><strong>シングルモルト余市 グランデ（700ml・48度）</strong>の1本出品は{yG.filtered_n}件で、<strong>{range(yG)}</strong>で落札されていました（件数不足のため中央値なし）。</li>}
              {ySet && <li><strong>宮城峡 グランデとの2本セット</strong>は{ySet.filtered_n}件・{range(ySet)}でした。</li>}
              <li>2022年4月に<strong>全国の空港免税店で数量限定</strong>で発売された商品で、発表時の<strong>参考小売価格は10,000円（税抜）</strong>です。</li>
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

          <h2 id="current-price">1. 落札額の範囲</h2>
          <p>
            ヤフオクの落札済みオークションを「{yG?.query}」で検索し、重複を除いた{yG?.raw_n}件の出品タイトルを1件ずつ確認しました。
            1本出品と、宮城峡 グランデとの2本セットを分けています。他の銘柄の名前を検索用に並べた出品は除きました。
            <strong>2区分とも件数（n）が20件未満のため、中央値は掲載せず、落札額の範囲と件数のみを示しています。</strong>
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>区分</th><th>件数</th><th>落札額の範囲</th><th>終了日の範囲</th></tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const a = Y[r.key];
                  if (!a) return null;
                  return (
                    <tr key={r.key}>
                      <td><strong>{r.name}</strong></td>
                      <td>n={a.filtered_n}件</td>
                      <td>{range(a)}</td>
                      <td>{fmtDate(a.end_date_from)}〜{fmtDate(a.end_date_to)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">
            ※取得日 {fetchedAt}。出品が少ないため、約6か月分の落札です。
            これは<strong>落札された市場価格</strong>であり、買取業者の提示額ではありません。
          </p>
          <p>
            1本出品の落札額は{range(yG)}の狭い範囲に収まっており、発表時の参考小売価格（10,000円・税抜）を上回っていました。
            件数が少ないため、今後の落札で範囲が変わる可能性があります。
          </p>

          <h2 id="about">2. 余市 グランデとは（公式発表）</h2>
          <p>アサヒビールは2022年3月25日に、空港免税店向けの『シングルモルト余市 グランデ』『シングルモルト宮城峡 グランデ』の発売を発表しました。</p>
          <div className="table-wrapper">
            <table>
              <tbody>
                <tr><th>商品名</th><td>シングルモルト余市 グランデ</td></tr>
                <tr><th>容量・アルコール分</th><td>700ml・48度</td></tr>
                <tr><th>参考小売価格</th><td>10,000円（税抜）</td></tr>
                <tr><th>発売日</th><td>2022年4月12日（数量限定）</td></tr>
                <tr><th>発売地域</th><td>全国の空港免税店（2022年2月からシンガポールのチャンギ空港でも販売）</td></tr>
              </tbody>
            </table>
          </div>
          <ul>
            <li><strong>原酒</strong>: 『シングルモルト余市』の力強く厚みのある味わいを支えるヘビーピートモルト原酒と新樽熟成モルト原酒の個性を、より引き出した商品と説明されています。</li>
            <li><strong>製法</strong>: ろ過工程を冷却せずに常温で行う「ノンチルフィルタード製法」を採用しています。</li>
            <li><strong>名称とラベル</strong>: 海外の人にも商品の特長が伝わるよう「グランデ」と名付けられました。ラベルは白がベースで、空港免税店向け商品のアイコンである羅針盤が描かれています。</li>
          </ul>
          <p className="text-xs text-warm-gray">※アサヒビールのリリース（PR TIMES・2022年3月25日）より（{off.checked_at}確認）。販売終了の時期は公式の発表を確認できなかったため、掲載していません。</p>

          <h2 id="compare">3. 余市の他のボトルとの関係</h2>
          <p>
            余市 グランデの商品名には年数の表記がありません。年数表記のない通常の「シングルモルト余市」や、年数表記のある余市とは別の商品として査定されます。
            年数ごとの相場は次のページにまとめています。
          </p>
          <ul>
            <li><Link href="/articles/yoichi-nv-kaitori/" className={linkCls}>余市（年数表記なし・NV）の買取相場</Link></li>
            <li><Link href="/articles/yoichi-10-kaitori/" className={linkCls}>余市10年の買取相場</Link></li>
            <li><Link href="/articles/yoichi-15-kaitori/" className={linkCls}>余市15年の買取相場</Link></li>
            <li><Link href="/articles/yoichi-20-kaitori/" className={linkCls}>余市20年の買取相場</Link></li>
            <li><Link href="/articles/miyagikyo-nv-kaitori/" className={linkCls}>宮城峡（年数表記なし・NV）の買取相場</Link></li>
          </ul>

          <h2 id="uru-mae">4. 売る前の確認事項</h2>
          <ul>
            <li><strong>「グランデ」の表記を確認する</strong>: 白いラベルに羅針盤が描かれたボトルです。通常の「シングルモルト余市」と区別して業者に伝えてください。</li>
            <li><strong>化粧箱をそろえる</strong>: ヤフオクでは化粧箱付きの出品が多く見られました（箱の有無による価格差は集計していません）。</li>
            <li><strong>宮城峡 グランデもある場合</strong>: 2本セットの落札額は1本出品の約2倍でした。まとめて査定に出す場合も、1本ずつの評価額を確認してください。</li>
            <li><strong>相見積もり</strong>: 業者ごとに販売先と在庫が異なるため、複数の業者で比べてください。手順は<Link href="/articles/whisky-takaku-uru/" className={linkCls}>ウイスキーを高く売るコツ</Link>にまとめています。</li>
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
            <li>アサヒビール「<a href={off.prtimes} className={linkCls} rel="noopener" target="_blank">シングルモルト余市・宮城峡それぞれの個性を強化『シングルモルト余市 グランデ』『シングルモルト宮城峡 グランデ』空港免税店向け商品として4月12日発売開始</a>」（PR TIMES・2022年3月25日・{off.checked_at}確認）</li>
            <li>ヤフオク 落札済みオークション検索（取得日 {fetchedAt}）。検索語「{yG?.query}」。タイトルを目視で確認し、IQRで外れ値を確認。n&lt;20の区分は中央値を出しません。詳しくは<Link href="/methodology/" className={linkCls}>集計方法</Link>をご覧ください。</li>
          </ul>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/ardbeg-17-kaitori/" className={linkCls}>アードベッグ17年の買取相場</Link></li>
              <li><Link href="/articles/kanosuke-kaitori/" className={linkCls}>嘉之助の買取相場</Link></li>
              <li><Link href="/articles/japanese-whisky-kaitori/" className={linkCls}>ジャパニーズウイスキーの買取相場</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className={linkCls}>ウイスキー買取相場ガイド</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
