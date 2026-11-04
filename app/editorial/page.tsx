import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "編集部紹介",
  description: "PeatBid（ピートビッド）編集部の運営体制・編集方針・データの集め方をご案内します。買取相場・銘柄情報・売却時の注意点を掲載しています。",
};

const policies = [
  {
    title: "事実に基づく情報提供",
    body: "価格情報は、買取店が自社サイトに公開している掲示価格と、ヤフオクの落札結果を当サイトで集計した中央値にもとづいて掲載します。いずれも確認日または取得日を併記します。",
  },
  {
    title: "中立性の維持",
    body: "PeatBidはアフィリエイト広告（PR）を含むメディアですが、紹介料の有無で業者ランキング・評価が変わることはありません。すべての業者は、編集部独自の5項目基準で評価しています。",
  },
  {
    title: "鮮度の確保",
    body: "ヤフオクの相場データは毎週月曜に更新します。買取店の掲示価格は、月替わりを目安に再確認します。各記事には最終更新日を明記しています。",
  },
  {
    title: "透明性の確保",
    body: "アフィリエイト関係、データ源、評価基準を公開しています。読者が情報の信頼性をご自身で判断できるよう、判断材料の提供を重視しています。",
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
      <p className="text-warm-gray text-sm mb-8">最終更新: 2026年11月4日</p>

      <section className="prose">
        <p>
          PeatBid（ピートビッド）は、ウイスキー買取の比較・解説に特化した情報メディアです。
          ウイスキーの売却を検討されている方に、相場データ・買取店の掲示価格・売却時の注意点をご案内することを目的としています。
        </p>

        <h2>編集部の体制</h2>
        <p>
          PeatBidは組織として運営しており、記事は<strong>PeatBid編集部</strong>の名義で作成・公開しています。
          個人の著者名や役職は掲載しておりません。また、外部の専門家による監修は受けておりません。
          編集部が行っている作業は、<Link href="/author/" className="text-burgundy underline">記事の作成体制</Link>のページでもご説明しています。
        </p>

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
          <li><strong>相場データの集計</strong> — ヤフオクの落札結果から、銘柄ごとに過去180日の落札価格を取得し、外れ値を除いた中央値と件数を毎週月曜に集計します</li>
          <li><strong>掲示価格の確認</strong> — 買取店が自社サイトに公開している参考買取価格を各店のページで確認し、確認日と店舗側の更新日を併記します</li>
          <li><strong>店舗・業者情報の照合</strong> — 店舗の所在地や買取方法を、各社公式の店舗一覧・店舗ページ・会社概要と照合します</li>
          <li><strong>記事の作成・更新</strong> — 確認した情報をもとに、売却を検討されている方の疑問に沿って構成します</li>
          <li><strong>公開前の点検</strong> — 内部リンク切れやページ情報の不備を、書き出したページ全体に対して機械的に点検します</li>
          <li><strong>公開</strong> — 最終更新日を明記して公開します</li>
          <li><strong>見直し</strong> — 相場データを毎週更新します。誤りのご連絡をいただいた場合は、公式の情報で確認のうえ訂正します</li>
        </ol>

        <h2>データソース</h2>
        <p>PeatBidが参照している主なデータソースは、以下のとおりです。</p>
        <ul>
          <li><strong>ヤフオクの落札結果</strong> — 相場（中央値）の集計に使用しています</li>
          <li><strong>買取店の公式サイト</strong> — LINXAS、大黒屋、ストックラボ、リカスタ、ファイブニーズ等が公開している参考買取価格を、確認日とともに掲載しています</li>
          <li><strong>各社公式の店舗情報</strong> — 店舗一覧・店舗ページ・会社概要を、業者情報の照合に使用しています</li>
          <li><strong>メーカー公式情報</strong> — サントリー、ニッカ等の公式サイトを、銘柄情報の参照先としています</li>
          <li><strong>海外オークションの結果</strong> — 相場の集計には使用していません。一部の記事で、落札額と出典を確認できた結果のみ、出典URLとともに掲載しています</li>
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
