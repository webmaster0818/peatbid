import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "PeatBid（ピートビッド）のプライバシーポリシーです。個人情報の取得項目・利用目的・第三者提供・Cookie・お問い合わせ窓口について定めています。",
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
          PeatBid（ピートビッド、以下「当サイト」）は、利用者の個人情報の保護を最重要事項と位置付け、本プライバシーポリシーに基づき適切に取り扱います。
        </p>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">1. 事業者情報</h2>
          <p>
            運営: PeatBid編集部<br />
            サイトURL: https://peatbid.com<br />
            お問い合わせ: サイト内のお問い合わせフォームよりご連絡ください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">2. 個人情報の定義</h2>
          <p>
            本ポリシーにおける「個人情報」とは、氏名、メールアドレス、その他特定の個人を識別できる情報を指します。当サイトは、お問い合わせフォームへの入力・買取業者への送客・各種フォームの利用等の際に、これらの情報を取得することがあります。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">3. 個人情報の取得方法</h2>
          <p>
            利用者がお問い合わせフォーム、各種申込フォーム、メール等を通じて自発的に送信した情報を取得します。Cookie・アクセスログ等を通じた間接的な情報取得については「7. Cookie・アクセス解析」をご参照ください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">4. 個人情報の利用目的</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>提携買取業者への問い合わせ・査定申込の取り次ぎ</li>
            <li>お問い合わせ・ご相談への対応および情報提供</li>
            <li>メール配信および配信確認</li>
            <li>サイト利用状況の調査・分析</li>
            <li>サービス改良および新規サービス開発</li>
            <li>不正利用調査および不正行為防止</li>
            <li>統計データ・分析データの作成（個人を特定できない形式に加工した上で利用）</li>
            <li>広告配信および商品情報の配信</li>
            <li>運営上のトラブル解決</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">5. 第三者提供</h2>
          <p className="mb-3">
            当サイトは、法令に基づく場合を除き、本人の同意なく個人情報を第三者に提供しません。
          </p>
          <p>
            ただし、利用者が買取業者への査定依頼・送客を希望した場合、提携買取業者に対して、申込内容（連絡先・買取希望ボトル情報等）を提供します。提供先業者における個人情報の取扱いは、各業者のプライバシーポリシーに従います。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">6. 個人情報の保管・廃棄</h2>
          <p>
            取得した個人情報は、利用目的に必要な期間に限り保管し、目的達成後は適切に廃棄または削除します。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">7. Cookie・アクセス解析</h2>
          <p className="mb-3">
            当サイトは、Google アナリティクス・Microsoft Clarity 等のアクセス解析ツールを使用する場合があります。これらのツールはCookieを使用してトラフィックデータを匿名で収集し、個人を特定するものではありません。
          </p>
          <p>
            Cookieの使用を希望されない場合は、ブラウザの設定により無効化できます。ただしCookie無効化により、一部機能が利用できなくなる可能性があります。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">8. 広告配信</h2>
          <p>
            当サイトは、第三者配信の広告サービス（アフィリエイトプログラムを含む）を利用しています。配信事業者は、利用者の興味に基づいた広告を表示するためにCookieを使用することがあります。利用者は、各配信事業者のオプトアウトページから配信停止を選択できます。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">9. 安全管理措置</h2>
          <p>
            当サイトは、個人情報への不正アクセス・紛失・破壊・改ざん・漏洩を防止するため、SSL/TLSによる通信暗号化、アクセス権限管理、定期的なセキュリティ点検等の合理的な安全管理措置を講じます。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">10. 個人情報の開示・訂正・削除</h2>
          <p>
            利用者本人から個人情報の開示・訂正・削除のご請求があった場合、本人確認のうえ、合理的な期間内に対応します。お問い合わせフォームよりご連絡ください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">11. お問い合わせ窓口</h2>
          <p>
            個人情報の取扱いに関するお問い合わせは、当サイト内のお問い合わせフォームよりご連絡ください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">12. 本ポリシーの変更</h2>
          <p>
            当サイトは、法令の変更・サービス内容の変更等に応じて本ポリシーを変更することがあります。変更後の内容はサイト上で公表した時点から効力を生じます。
          </p>
        </section>

        <p className="text-xs text-warm-gray pt-4 border-t border-warm-border">
          制定日: 2026年5月<br />
          最終更新日: 2026年6月3日
        </p>
      </div>
    </div>
  );
}
