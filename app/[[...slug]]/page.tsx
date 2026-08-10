import type { Metadata } from "next";
import { Site } from "../site";

const routes = [
  [], ["services"], ["registration-services"], ["registeration-services"], ["company-register-docs"],
  ["business-types"], ["foreign-invest-comparison"], ["startup-register"],
  ["registration-process"], ["registeration-process"], ["foreign-register-process"], ["tax-planning"],
  ["accounting-gpts"], ["contact-us"], ["news"], ["en"], ["en", "services"],
  ["en", "registration-services"], ["en", "registeration-services"], ["en", "company-register-docs"],
  ["en", "business-types"], ["en", "registration-process"], ["en", "registeration-process"],
  ["en", "foreign-invest-comparison"], ["en", "startup-register"],
  ["en", "foreign-register-process"], ["en", "tax-planning"],
  ["en", "accounting-gpts"], ["en", "contact-us"],
];

export const dynamicParams = false;

export function generateStaticParams() {
  return routes.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug = [] } = await params;
  const decodedSlug = slug.map((segment) => decodeURIComponent(segment));
  const path = `/${decodedSlug.join("/")}`.replace(/\/$/, "") || "/";
  const english = path === "/en" || path.startsWith("/en/");
  const names: Record<string, string> = {
    "/": "首頁", "/services": "服務內容", "/registration-services": "登記業務項目",
    "/company-register-docs": "公司設立應備文件", "/business-types": "公司與行號差異",
    "/foreign-invest-comparison": "外資設立比較", "/startup-register": "新創公司登記",
    "/registration-process": "設立流程 6 步驟", "/foreign-register-process": "外資來台設立流程",
    "/tax-planning": "稅務規劃", "/accounting-gpts": "GPTs 問與答", "/contact-us": "聯絡乙達",
    "/news": "News & Articles",
  };
  const englishNames: Record<string, string> = {
    "/": "Home", "/services": "Services", "/registration-services": "Registration Services",
    "/company-register-docs": "Incorporation Documents", "/business-types": "Business Types",
    "/registration-process": "Incorporation Process", "/foreign-invest-comparison": "Foreign Investment",
    "/startup-register": "Startup Registration", "/foreign-register-process": "Foreign Setup Process",
    "/tax-planning": "Tax Planning", "/accounting-gpts": "GPTs Q&A", "/contact-us": "Contact Yiita",
  };
  const route = english ? path.replace(/^\/en/, "") || "/" : path;
  const canonicalRoute = route === "/registeration-services"
    ? "/registration-services"
    : route === "/registeration-process"
      ? "/registration-process"
      : route;
  const title = english ? englishNames[canonicalRoute] || "Yiita Accounting" : names[canonicalRoute] || "乙達記帳士事務所";
  const localizedCanonical = english ? (canonicalRoute === "/" ? "/en" : "/en" + canonicalRoute) : canonicalRoute;
  const hasEnglishPage = Boolean(englishNames[canonicalRoute]);
  const languageAlternates = hasEnglishPage
    ? {
        "zh-Hant-TW": canonicalRoute,
        en: canonicalRoute === "/" ? "/en" : "/en" + canonicalRoute,
      }
    : { "zh-Hant-TW": canonicalRoute };
  const description = english
    ? "Company registration, bookkeeping, accounting and tax services in Taiwan, with fluent English support."
    : "乙達記帳士事務所提供公司登記、記帳、會計、報稅與外資來台設立服務。";
  const socialTitle = english
    ? (canonicalRoute === "/" ? "Yiita Accounting & Bookkeeping Service" : `${title} | Yiita Accounting & Bookkeeping Service`)
    : (canonicalRoute === "/" ? "乙達記帳士事務所" : `${title} | 乙達記帳士事務所`);
  return {
    title: { absolute: socialTitle },
    description,
    alternates: {
      canonical: localizedCanonical,
      languages: languageAlternates,
    },
    openGraph: {
      type: "website",
      locale: english ? "en_US" : "zh_TW",
      alternateLocale: english ? "zh_TW" : "en_US",
      siteName: english ? "Yiita Accounting & Bookkeeping Service" : "乙達記帳士事務所",
      title: socialTitle,
      description,
      images: [{ url: "/og.png", width: 1680, height: 945, alt: "乙達記帳士事務所 — Yiita Accounting & Bookkeeping Service" }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: ["/og.png"],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params;
  const decodedSlug = slug.map((segment) => decodeURIComponent(segment));
  const path = `/${decodedSlug.join("/")}`.replace(/\/$/, "") || "/";
  return <Site path={path} />;
}
