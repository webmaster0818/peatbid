import type { Metadata } from "next";
import Link from "next/link";
import { pageOpenGraph } from "@/lib/og";

const PAGE_TITLE = "PeatBid編集部について（記事の作成体制）";
const PAGE_DESC =
  "PeatBid（ピートビッド）の記事は PeatBid編集部が作成しています。個人の著者名・外部の監修者は置いていません。相場データの集め方と、業者情報の確認方法を記載しています。";
const PAGE_URL = "https://peatbid.com/author/";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph({ type: "article", title: PAGE_TITLE, description: PAGE_DESC, url: PAGE_URL }),
};

const WORKS = [
  {
    title: "ヤフオクの落札データの集計（毎週月曜）",
    body: "ヤフオクの落札結果から、銘柄ごとに過去180日の落札価格を取得し、外れ値（第1・第3四分位から四分位範囲の1.5倍を超えて離れた値）を除いた中央値と件数を集計しています。各ページの相場欄には、取得日とサンプル数（n）を記載しています。",
  },
  {
    title: "買取店の掲示価格の確認",
    body: "買取店が自社サイトに公開している参考買取価格は、PeatBid編集部が各店のページを開いて確認した値だけを掲載し、確認日と店舗側の更新日を記載しています。",
  },
  {
    title: "店舗・対応エリアの照合",
    body: "都道府県別ページの業者表は、各社公式の店舗一覧・店舗ページと照合しています。県内に店舗が無いことを公式で確認した業者は、表から外しています。",
  },
];

export default function AuthorPage() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PeatBid編集部",
    url: "https://peatbid.com/author/",
    description: PAGE_DESC,
    parentOrganization: {
      "@type": "Organization",
      name: "PeatBid",
      url: "https://peatbid.com",
    },
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
          <li className="breadcrumb-sep" />
          <li><Link href="/editorial/" className="hover:text-amber-dark transition-colors">編集部紹介</Link></li>
          <li className="breadcrumb-sep" />
          <li><span className="text-foreground">記事の作成体制</span></li>
        </ol>
      </nav>

      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2">PeatBid編集部について</h1>
      <p className="text-warm-gray text-sm mb-8">最終更新: 2026年11月3日</p>

      <section className="prose max-w-none">
        <p className="mb-6">
          PeatBid の記事は、運営者である <strong>PeatBid編集部</strong> が作成しています。
          個人の著者名は掲載していません。また、外部の監修者（ウイスキー業界の専門家・買取業者等）による監修は受けていません。
        </p>

        <h2 className="font-display text-2xl font-bold mt-10 mb-4">編集部が行っていること</h2>
        <div className="space-y-4 mb-10 not-prose">
          {WORKS.map((w) => (
            <div key={w.title} className="bg-white border border-warm-border rounded-2xl p-6">
              <h3 className="font-display text-lg font-bold mb-2">{w.title}</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">{w.body}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl font-bold mt-10 mb-4">誤りのご連絡</h2>
        <p>
          記事内の価格・店舗情報などに誤りがありましたら、<Link href="/contact/" className="text-amber-dark hover:text-burgundy underline">お問い合わせフォーム</Link>からご連絡ください。公式の情報で確認のうえ訂正します。
        </p>

        <h2 className="font-display text-2xl font-bold mt-10 mb-4">関連ページ</h2>
        <ul>
          <li><Link href="/editorial/" className="text-amber-dark hover:text-burgundy underline">編集部紹介・編集ポリシー</Link></li>
          <li><Link href="/methodology/" className="text-amber-dark hover:text-burgundy underline">評価方法・データ源</Link></li>
        </ul>
      </section>
    </div>
  );
}
