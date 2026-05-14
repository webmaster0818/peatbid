import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "編集部紹介",
  description: "PeatBid（ピートビッド）編集部の体制・専門性・編集方針をご紹介します。ウイスキー市場に精通した専門スタッフが、最新の買取相場・銘柄情報・売却ノウハウを発信しています。",
};

const editorRoles = [
  {
    role: "編集長 / コンテンツ責任者",
    description:
      "ウイスキー業界・買取市場の最新動向を統括。記事の品質基準・編集方針の策定責任を負います。海外オークション（Sotheby's、Bonhams、Whisky Auctioneer等）の落札データを定期的にチェックし、相場の客観性を担保しています。",
  },
  {
    role: "リサーチチーム",
    description:
      "国内外の買取業者・オークション・小売店の価格データを日次で収集。各銘柄の流通量・終売情報・限定リリース情報を網羅的に追跡し、相場予測の精度を高めています。",
  },
  {
    role: "ファクトチェック担当",
    description:
      "記事公開前に、価格データ・銘柄スペック・歴史的事実・法規制情報の正確性を検証。誤情報の混入を防ぐ最後の砦として機能しています。",
  },
  {
    role: "監修パートナー",
    description:
      "ウイスキーバー運営者・お酒買取業者・愛好家コレクター等、業界に深く関わる外部パートナーが記事を監修。実務に基づく知見でコンテンツの専門性を支えています。",
  },
];

const policies = [
  {
    title: "事実に基づく情報提供",
    body: "全ての価格情報は、公式買取業者の公開データ、海外オークションの落札結果、信頼できる業界紙の調査をベースに算出します。憶測・伝聞に基づく相場提示は行いません。",
  },
  {
    title: "中立性の維持",
    body: "PeatBidはアフィリエイト広告（PR）を含むメディアですが、紹介料の有無で業者ランキング・評価が変わることはありません。すべての業者は、編集部独自の5項目基準で評価しています。",
  },
  {
    title: "鮮度の確保",
    body: "相場データは月次以上の頻度で見直し、終売・限定リリース等の重要な市場変化は即座に反映します。各記事には最終更新日を明記しています。",
  },
  {
    title: "透明性の確保",
    body: "アフィリエイト関係、データ源、評価基準、すべて公開しています。読者が情報の信頼性を自身で判断できる材料を提供することを最重視しています。",
  },
  {
    title: "未成年保護",
    body: "ウイスキーは酒類であるため、20歳未満の方には買取案内を行いません。各記事に年齢制限の表示と、未成年者飲酒禁止法の遵守を明記しています。",
  },
];

export default function EditorialPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
      <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
          <li className="breadcrumb-sep" />
          <li><span className="text-foreground">編集部紹介</span></li>
        </ol>
      </nav>

      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2">PeatBid 編集部紹介</h1>
      <p className="text-warm-gray text-sm mb-8">最終更新: 2026年5月14日</p>

      <section className="prose">
        <p>
          PeatBid（ピートビッド）はウイスキー買取の比較・解説に特化した情報メディアです。
          編集部はウイスキー業界・買取市場・オークション動向に精通したスタッフで構成され、
          コレクター・愛好家・売却検討者にとって本当に役立つ情報を発信することをミッションとしています。
        </p>

        <h2>編集部の体制</h2>
        <p>
          PeatBidは個人名ではなく**編集部全体の合議制**で記事を作成・公開しています。
          理由は、ウイスキー市場が刻一刻と変動する性質を持ち、単一の編集者では追いきれないためです。
          各セクションの専門家が連携し、相互レビューを経て公開する体制を取っています。
        </p>

        <div className="not-prose space-y-4 my-6">
          {editorRoles.map((e) => (
            <div key={e.role} className="bg-white border border-warm-border rounded-xl p-5">
              <p className="font-display text-lg font-semibold text-ink mb-2">{e.role}</p>
              <p className="text-sm text-ink/80 leading-relaxed">{e.description}</p>
            </div>
          ))}
        </div>

        <h2>編集方針</h2>
        <p>
          PeatBidは以下の5原則に基づいて記事を作成しています。
        </p>

        <ol className="not-prose space-y-3 my-6">
          {policies.map((p, i) => (
            <li key={p.title} className="bg-cream/40 border-l-4 border-amber pl-5 py-3 pr-4">
              <p className="font-bold text-ink mb-1">
                <span className="text-amber-dark mr-2">{i + 1}.</span>{p.title}
              </p>
              <p className="text-sm text-ink/80 leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ol>

        <h2>記事制作プロセス</h2>
        <ol>
          <li><strong>市場データ収集</strong> — 公式買取業者・海外オークション・業界紙から日次で価格情報を取得</li>
          <li><strong>銘柄プロファイル整理</strong> — 蒸溜所・年代・希少度・流通状況を整理</li>
          <li><strong>編集会議で構成決定</strong> — 読者ニーズに即した切り口・FAQを設計</li>
          <li><strong>記事執筆</strong> — リサーチャー＋編集長による起草</li>
          <li><strong>ファクトチェック</strong> — 価格・スペック・法規制情報を独立検証</li>
          <li><strong>監修パートナー確認</strong> — 業界実務に即した記述になっているかを最終確認</li>
          <li><strong>公開</strong> — 最終更新日を明記して公開</li>
          <li><strong>定期見直し</strong> — 市場変動に応じて随時更新</li>
        </ol>

        <h2>データソース</h2>
        <p>PeatBidが参照する主なデータソース:</p>
        <ul>
          <li><strong>海外オークション</strong> — Sotheby's、Bonhams、Whisky Auctioneer、Just Whisky Auctions、Whisky Hammer</li>
          <li><strong>国内買取業者</strong> — 大黒屋、JOYLAB、ウイスキー王国、リカスタ、キャビンリカー</li>
          <li><strong>公式メーカー情報</strong> — サントリー、ニッカ、ベンチャーウイスキー</li>
          <li><strong>業界統計</strong> — Knight Frank Luxury Investment Index、Rare Whisky 101 等</li>
          <li><strong>政府・公的機関</strong> — 国税庁、消費者庁、警察庁（古物営業法）</li>
        </ul>

        <h2>お問い合わせ</h2>
        <p>
          記事内容の誤り、訂正リクエスト、業者からの掲載・送客契約のご相談など、
          編集部へのお問い合わせは <Link href="/about/" className="text-burgundy underline">運営者情報ページ</Link> よりご連絡ください。
        </p>

        <h2>関連情報</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
          <Link href="/methodology/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
            <span className="text-xs text-amber-dark font-bold">編集ポリシー</span>
            <p className="text-sm font-bold mt-1">価格データ収集方法・信頼性ガイドライン</p>
          </Link>
          <Link href="/track-record/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
            <span className="text-xs text-amber-dark font-bold">サイト実績</span>
            <p className="text-sm font-bold mt-1">累計実績・統計データ</p>
          </Link>
          <Link href="/about/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
            <span className="text-xs text-amber-dark font-bold">運営者情報</span>
            <p className="text-sm font-bold mt-1">運営会社・お問い合わせ</p>
          </Link>
          <Link href="/privacy-policy/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
            <span className="text-xs text-amber-dark font-bold">プライバシー</span>
            <p className="text-sm font-bold mt-1">プライバシーポリシー</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
