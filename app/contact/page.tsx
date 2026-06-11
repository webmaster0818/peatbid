import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ｜広告出稿・掲載・提携のご相談",
  description:
    "PeatBidへのお問い合わせ窓口です。広告出稿・タイアップ、相互リンク・記事掲載、買取業者様の掲載希望、記事内容へのご指摘などを受け付けています。",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
      <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
        <ol className="flex items-center gap-1">
          <li>
            <Link href="/" className="hover:text-amber-dark transition-colors">
              ホーム
            </Link>
          </li>
          <li className="breadcrumb-sep" />
          <li>
            <span className="text-foreground">お問い合わせ</span>
          </li>
        </ol>
      </nav>

      <article className="prose">
        <h1 className="font-display text-3xl md:text-4xl font-semibold mb-4 !border-none !pb-0 !mt-0">
          お問い合わせ
        </h1>
        <p>
          PeatBidへのお問い合わせはこちらのフォームからお願いいたします。内容を確認のうえ、通常2〜3営業日以内に編集部よりメールでご返信いたします。
        </p>
        <ul className="text-sm">
          <li>広告出稿・タイアップのご相談（媒体資料のご請求を含む）</li>
          <li>相互リンク・記事掲載・コンテンツ提携のご相談</li>
          <li>買取業者様の掲載希望</li>
          <li>記事内容に関するご指摘・修正依頼</li>
        </ul>
        <p className="text-xs text-warm-gray">
          ※営業目的の自動送信・無関係な勧誘はご遠慮ください。いただいた個人情報は
          <Link href="/privacy-policy/">プライバシーポリシー</Link>
          に基づき、お問い合わせへの対応のみに使用します。
        </p>

        <div className="mt-8">
          <ContactForm />
        </div>
      </article>
    </div>
  );
}
