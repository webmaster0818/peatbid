import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "PeatBid（ピートビッド）のプライバシーポリシーです。個人情報の取り扱いについてご案内します。",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
      <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
          <li className="breadcrumb-sep" />
          <li><span className="text-foreground">プライバシーポリシー</span></li>
        </ol>
      </nav>

      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-8">プライバシーポリシー</h1>

      <div className="space-y-8 text-sm leading-relaxed">
        <p>
          PeatBid（ピートビッド、以下「当サイト」）は、利用者の個人情報の保護に努めます。以下に当サイトの個人情報の取り扱いに関するポリシーを定めます。
        </p>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">1. 個人情報の収集</h2>
          <p>
            当サイトでは、お問い合わせの際にお名前・メールアドレスなどの個人情報をお伺いすることがあります。これらの情報は、お問い合わせへの対応およびサービス向上のために利用し、それ以外の目的では使用いたしません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">2. アクセス解析ツール</h2>
          <p className="mb-3">
            当サイトでは、Googleアナリティクスなどのアクセス解析ツールを使用する場合があります。これらのツールはトラフィックデータの収集のためにCookieを使用しています。
          </p>
          <p>
            トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieの使用を希望しない場合は、ブラウザの設定で拒否できます。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">3. 広告について</h2>
          <p>
            当サイトは、第三者配信の広告サービス（アフィリエイトプログラム）を利用しています。広告配信事業者は、利用者の興味に基づいた広告を表示するためにCookieを使用することがあります。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">4. 個人情報の第三者提供</h2>
          <p>
            当サイトは、法令に基づく場合を除き、利用者の個人情報を第三者に提供することはありません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">5. 免責事項</h2>
          <p className="mb-3">
            当サイトに掲載されている情報の正確性には万全を期しておりますが、情報の正確性・完全性・最新性を保証するものではありません。
          </p>
          <p>
            当サイトの情報を利用して発生した損害について、当サイトは一切の責任を負いません。ウイスキーの買取価格はオークション相場や需給により日々変動するため、最新の査定額は各買取業者にお問い合わせください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">6. プライバシーポリシーの変更</h2>
          <p>
            当サイトは、必要に応じてプライバシーポリシーを変更することがあります。変更後のポリシーは、当ページに掲載した時点で効力を生じるものとします。
          </p>
        </section>

        <p className="text-warm-gray text-xs pt-4 border-t border-warm-border">
          制定日：2026年5月11日
        </p>
      </div>
    </div>
  );
}
