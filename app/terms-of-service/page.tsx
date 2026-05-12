import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "利用規約",
  description: "PeatBid（ピートビッド）の利用規約です。当サイトのご利用にあたっての注意事項をご案内します。",
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
      <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
          <li className="breadcrumb-sep" />
          <li><span className="text-foreground">利用規約</span></li>
        </ol>
      </nav>

      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-8">利用規約</h1>

      <div className="space-y-8 text-sm leading-relaxed">
        <p>
          この利用規約（以下「本規約」）は、PeatBid（ピートビッド、以下「当サイト」）の利用条件を定めるものです。当サイトをご利用いただく際は、本規約に同意したものとみなします。
        </p>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第1条（適用）</h2>
          <p>
            本規約は、当サイトを利用するすべての方（以下「利用者」）に適用されます。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第2条（コンテンツについて）</h2>
          <p className="mb-3">
            当サイトに掲載されている記事・画像・データなどのコンテンツ（以下「コンテンツ」）の著作権は、当サイトまたは正当な権利を有する第三者に帰属します。
          </p>
          <p>
            利用者は、私的利用の範囲を超えて、コンテンツを複製・転載・改変・再配布することはできません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第3条（当サイトの位置付け）</h2>
          <p className="mb-3">
            当サイトはウイスキー買取業者の比較・紹介を行う情報メディアであり、当サイト自身が買取業者として査定や買取契約の当事者となるものではありません。
          </p>
          <p>
            実際の買取査定および買取契約は、利用者と各買取業者との間で直接行われます。査定額の決定・買取の成否について、当サイトは責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第4条（免責事項）</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>当サイトの情報は、各買取業者の公式情報・オークション相場・編集部の調査に基づいていますが、正確性・完全性・最新性を保証するものではありません。</li>
            <li>当サイトの情報を参考にしたことで発生した損害について、当サイトは一切の責任を負いません。</li>
            <li>ウイスキーの買取価格はオークション相場・需給により日々変動するため、当サイトに掲載された相場は参考値です。実際の買取価格は各業者にお問い合わせください。</li>
            <li>当サイトからリンクしている外部サイトの内容について、当サイトは一切の責任を負いません。</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第5条（広告・アフィリエイト）</h2>
          <p>
            当サイトは、アフィリエイトプログラム（PR）に参加しており、記事内のリンクを通じてサービスにお申し込みいただいた場合、紹介報酬が発生することがあります。これは利用者に追加の費用が発生するものではありません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第6条（年齢制限）</h2>
          <p>
            ウイスキーは酒類であるため、20歳未満の方の購入・販売はできません。当サイトの掲載業者は、20歳以上の方のみを取引対象としています。利用者は、買取を依頼する際に年齢確認書類の提示が必要となる場合があります。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第7条（禁止事項）</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>当サイトのコンテンツの無断転載・複製</li>
            <li>当サイトの運営を妨害する行為</li>
            <li>盗品・偽造品など違法に取得した物品の買取依頼を当サイト経由で行うこと</li>
            <li>その他、当サイトが不適切と判断する行為</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第8条（規約の変更）</h2>
          <p>
            当サイトは、必要に応じて本規約を変更することがあります。変更後の規約は、当ページに掲載した時点で効力を生じるものとします。
          </p>
        </section>

        <p className="text-warm-gray text-xs pt-4 border-t border-warm-border">
          制定日：2026年5月11日
        </p>
      </div>
    </div>
  );
}
