import type { Metadata } from "next";
import { Site } from "../site";

const routes = [
  [], ["services"], ["registeration-services"], ["company-register-docs"],
  ["business-types"], ["foreign-invest-comparison"], ["startup-register"],
  ["foreign-register-process"], ["tax-planning"], ["accounting-gpts"],
  ["contact-us"], ["pricing"], ["en"], ["en", "services"],
  ["en", "foreign-register-process"], ["en", "contact-us"],
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
  const route = english ? path.replace(/^\/en/, "") || "/" : path;
  const title = english
    ? route === "/" ? "Home" : route === "/services" ? "Services" : route === "/contact-us" ? "Contact Yiita" : "Foreign Setup Process"
    : names[route] || "乙達記帳士事務所";
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
