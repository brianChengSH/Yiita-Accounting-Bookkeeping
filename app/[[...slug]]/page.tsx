import type { Metadata } from "next";
import { Site } from "../site";

const routes = [
  [], ["services"], ["registeration-services"], ["company-register-docs"],
  ["business-types"], ["foreign-invest-comparison"], ["startup-register"],
  ["foreign-register-process"], ["tax-planning"], ["accounting-gpts"],
  ["contact-us"], ["pricing"], ["en"], ["en", "services"],
  ["en", "registeration-services"], ["en", "company-register-docs"],
  ["en", "business-types"], ["en", "registeration-process"],
  ["en", "foreign-invest-comparison"], ["en", "startup-register"],
  ["en", "foreign-register-process"], ["en", "tax-planning"],
  ["en", "accounting-gpts"], ["en", "contact-us"],
];

export function generateStaticParams() {
  return routes.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug = [] } = await params;
  const path = `/${slug.join("/")}`.replace(/\/$/, "") || "/";
  const english = path === "/en" || path.startsWith("/en/");
  const names: Record<string, string> = {
    "/": "首頁", "/services": "服務內容", "/registeration-services": "登記業務項目",
    "/company-register-docs": "公司設立應備文件", "/business-types": "公司與行號差異",
    "/foreign-invest-comparison": "外資設立比較", "/startup-register": "新創公司登記",
    "/foreign-register-process": "外資來台設立流程", "/tax-planning": "稅務規劃",
    "/accounting-gpts": "GPTs 問與答", "/contact-us": "聯絡乙達", "/pricing": "服務收費",
  };
  const englishNames: Record<string, string> = {
    "/": "Home", "/services": "Services", "/registeration-services": "Registration Services",
    "/company-register-docs": "Incorporation Documents", "/business-types": "Business Types",
    "/registeration-process": "Incorporation Process", "/foreign-invest-comparison": "Foreign Investment",
    "/startup-register": "Startup Registration", "/foreign-register-process": "Foreign Setup Process",
    "/tax-planning": "Tax Planning", "/accounting-gpts": "GPTs Q&A", "/contact-us": "Contact Yiita",
  };
  const route = english ? path.replace(/^\/en/, "") || "/" : path;
  const title = english ? englishNames[route] || "Yiita Accounting" : names[route] || "乙達記帳士事務所";
  return {
    title,
    description: english
      ? "Company registration, bookkeeping, accounting and tax services in Taiwan, with fluent English support."
      : "乙達記帳士事務所提供公司登記、記帳、會計、報稅與外資來台設立服務。",
  };
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params;
  const path = `/${slug.join("/")}`.replace(/\/$/, "") || "/";
  return <Site path={path} />;
}
