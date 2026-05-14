import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: true,
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const SITE_NAME = "PeatBid";
const SITE_NAME_JA = "ピートビッド";
const SITE_TAGLINE = "ウイスキー買取の最高入札比較";
const SITE_URL = "https://peatbid.com";
const SITE_DESCRIPTION =
  "PeatBid（ピートビッド）はウイスキーの買取相場・最高入札を比較するガイドサイトです。山崎・響・白州・マッカランなど主要銘柄の最新買取相場、希少ボトルの査定ポイント、信頼できる買取業者を徹底比較。コレクター・相続・断捨離まで、あなたのウイスキーを最も高く売る方法が見つかります。";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
};

function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: SITE_NAME_JA,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: SITE_NAME_JA,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

const navLinks = [
  { href: "/articles/whisky-kaitori-souba/", label: "買取相場" },
  { href: "/articles/whisky-takaku-uru/", label: "高く売るコツ" },
  { href: "/articles/yamazaki-kaitori/", label: "山崎買取" },
  { href: "/articles/hibiki-kaitori/", label: "響買取" },
];

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-peat/95 backdrop-blur border-b border-amber/30">
      <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-2xl font-semibold text-amber tracking-wide flex items-center gap-2"
        >
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-amber/15 border border-amber/40 text-amber font-bold text-sm">
            Pb
          </span>
          <span>PeatBid</span>
        </Link>
        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-cream/80">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-amber transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* Mobile hamburger */}
        <details className="md:hidden relative group">
          <summary className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-cream/10 transition-colors list-none">
            <svg
              className="w-6 h-6 text-cream"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-label="メニューを開く"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </summary>
          <div className="absolute right-0 mt-2 w-52 bg-peat border border-amber/30 rounded-lg shadow-lg py-2 z-50">
            <Link
              href="/"
              className="block px-4 py-2 text-sm text-cream/80 hover:text-amber hover:bg-cream/5 transition-colors"
            >
              ホーム
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-sm text-cream/80 hover:text-amber hover:bg-cream/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </details>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-peat text-cream/90 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-display text-2xl font-semibold mb-2 text-amber">
              {SITE_NAME}
            </p>
            <p className="text-sm text-cream/70 leading-relaxed">
              ウイスキー買取の最高入札比較。
              <br />
              あなたの一本に、最高の値段を。
            </p>
          </div>
          <div>
            <p className="font-bold text-sm mb-3 text-amber">記事カテゴリ</p>
            <ul className="space-y-2 text-sm text-cream/70">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-bold text-sm mb-3 text-amber">サイト情報</p>
            <ul className="space-y-2 text-sm text-cream/70">
              <li>
                <Link
                  href="/about/"
                  className="hover:text-cream transition-colors"
                >
                  運営者情報
                </Link>
              </li>
              <li>
                <Link
                  href="/editorial/"
                  className="hover:text-cream transition-colors"
                >
                  編集部紹介
                </Link>
              </li>
              <li>
                <Link
                  href="/methodology/"
                  className="hover:text-cream transition-colors"
                >
                  編集ポリシー
                </Link>
              </li>
              <li>
                <Link
                  href="/track-record/"
                  className="hover:text-cream transition-colors"
                >
                  サイト実績
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy/"
                  className="hover:text-cream transition-colors"
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service/"
                  className="hover:text-cream transition-colors"
                >
                  利用規約
                </Link>
              </li>
              <li>
                <Link
                  href="/faq/"
                  className="hover:text-cream transition-colors"
                >
                  よくある質問
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-amber/20 mt-8 pt-6 text-center text-xs text-cream/50">
          <p>&copy; 2026 {SITE_NAME} All rights reserved.</p>
          <p className="mt-1">
            ※当サイトはアフィリエイト広告（PR）を利用しています。
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${cormorant.variable} h-full antialiased`}
    >
      <head>
        <meta
          httpEquiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-parchment text-ink">
        <>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </>
      </body>
    </html>
  );
}
