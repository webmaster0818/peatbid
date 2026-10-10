import type { Metadata } from "next";

// OGP の共通定義（2026-10-10）
// Next.js はページ側で openGraph を書くと layout の openGraph を「丸ごと」置き換える
// （images / siteName / locale は継承されない）。ページで openGraph を持つときは必ず
// pageOpenGraph() 経由にして、共通項目が欠落しないようにすること。

export const SITE_NAME = "PeatBid";
export const SITE_TAGLINE = "ウイスキー買取の最高入札比較";

// 全ページ共通のOG画像（scripts/make-og.py で生成。画像に数字・件数は入れない）
export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} | ${SITE_TAGLINE}`,
};

type OpenGraph = NonNullable<Metadata["openGraph"]>;

// url: "./" は alternates.canonical と同じ解決関数（metadataBase＋ページのパス）で
// 自URLになる＝og:url と canonical が常に一致する。
export function pageOpenGraph(overrides: Partial<OpenGraph> = {}): OpenGraph {
  return {
    type: "website",
    locale: "ja_JP",
    siteName: SITE_NAME,
    url: "./",
    images: [OG_IMAGE],
    ...overrides,
  } as OpenGraph;
}
