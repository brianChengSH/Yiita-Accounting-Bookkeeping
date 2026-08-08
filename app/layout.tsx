import type { Metadata } from "next";
import "./globals.css";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.yiita.com")
  .replace(/^http:\/\/(?=(?:www\.)?yiita\.com(?:\/|$))/i, "https://")
  .replace(/\/$/, "");
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const basePath = configuredBasePath === "/" ? "" : configuredBasePath.replace(/\/$/, "");
const favicon32Url = `${basePath}/favicon-32.png`;
const favicon192Url = `${basePath}/favicon-192.png`;
const appleTouchIconUrl = `${basePath}/apple-touch-icon.png`;
const socialImageUrl = `${siteUrl}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "乙達記帳士事務所 | Yiita Accounting & Bookkeeping Service",
    template: "%s | 乙達記帳士事務所",
  },
  description: "乙達記帳士事務所提供公司登記、記帳、會計、報稅與外資來台設立服務，並提供流利英文溝通。",
  icons: {
    icon: [
      { url: favicon32Url, sizes: "32x32", type: "image/png" },
      { url: favicon192Url, sizes: "192x192", type: "image/png" },
    ],
    shortcut: favicon32Url,
    apple: [{ url: appleTouchIconUrl, sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    alternateLocale: "en_US",
    siteName: "乙達記帳士事務所",
    title: "乙達記帳士事務所",
    description: "您專業負責的財務夥伴 — 記帳、會計、報稅、公司登記與外資來台設立。",
    images: [{ url: socialImageUrl, width: 1680, height: 945, alt: "乙達記帳士事務所 — Yiita Accounting & Bookkeeping Service" }],
  },
  twitter: { card: "summary_large_image", title: "乙達記帳士事務所", description: "您專業負責的財務夥伴", images: [socialImageUrl] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
