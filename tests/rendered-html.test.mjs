import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../dist/client/", import.meta.url);
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const basePath = configuredBasePath === "/" ? "" : configuredBasePath.replace(/\/$/, "");
const expectedSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.yiita.com").replace(/\/$/, "");
const expectedAssetPrefix = process.env.NEXT_PUBLIC_SITE_URL ? expectedSiteUrl : "";
const artifactUrl = (file) => new URL(file.replaceAll("%", "%25"), root);

test("exports the bilingual Yiita home pages", async () => {
  const [zh, en] = await Promise.all([
    readFile(new URL("index.html", root), "utf8"),
    readFile(new URL("en.html", root), "utf8"),
  ]);
  assert.match(zh, /您專業負責的財務夥伴/);
  assert.match(zh, /乙達記帳士事務所/);
  assert.match(en, /Your Devoted Financial Partner/);
  assert.match(en, /Yiita Accounting/);
  assert.doesNotMatch(zh, /codex-preview|react-loading-skeleton/i);
  assert.ok(zh.includes(`href="${basePath || "/"}`));
  assert.ok(zh.includes(`href="${basePath}/services"`));
  assert.ok(zh.includes(`src="${basePath}/images/yiita-logo.avif"`));
  assert.ok(zh.includes(`src="${expectedAssetPrefix}/_next/static/`));
  assert.ok(zh.includes(`${expectedSiteUrl}/og.png`));
});

test("keeps framework assets at the deployment artifact root", async () => {
  await access(new URL("_next/static/", root));
  if (basePath) {
    await assert.rejects(access(new URL(`${basePath.slice(1)}/_next/static/`, root)));
  }
});

test("exports the original Yiita browser and Apple icons", async () => {
  const html = await readFile(new URL("index.html", root), "utf8");
  assert.ok(html.includes(`href="${basePath}/favicon-32.png"`));
  assert.ok(html.includes(`href="${basePath}/favicon-192.png"`));
  assert.ok(html.includes(`href="${basePath}/apple-touch-icon.png"`));
  await Promise.all([
    "favicon-32.png",
    "favicon-192.png",
    "apple-touch-icon.png",
  ].map((file) => access(artifactUrl(file))));
});

test("exports all main service routes and brand assets", async () => {
  await Promise.all([
    "services.html", "registeration-services.html", "company-register-docs.html",
    "business-types.html", "registeration-process.html", "foreign-invest-comparison.html",
    "startup-register.html", "foreign-register-process.html", "tax-planning.html",
    "accounting-gpts.html", "contact-us.html", "pricing.html", "service-schedule.html",
    "%E9%97%9C%E6%96%BC.html", "%E5%89%AF%E6%9C%AC-people.html", "careers.html", "news.html",
    "關於.html", "關於/index.html", "副本-people.html", "副本-people/index.html",
    "en.html", "en/services.html", "en/registeration-services.html",
    "en/company-register-docs.html", "en/business-types.html",
    "en/registeration-process.html", "en/foreign-invest-comparison.html",
    "en/startup-register.html", "en/foreign-register-process.html",
    "en/tax-planning.html", "en/accounting-gpts.html", "en/contact-us.html",
    "images/yiita-logo.avif",
    "images/line-qr.avif",
    "images/original-partner.jpg",
    "images/original-associate.jpg",
    "images/original-careers.jpg",
    "og.png",
    ".nojekyll",
  ].map((file) => access(artifactUrl(file))));
});

test("contact page keeps direct, serverless contact options", async () => {
  const html = await readFile(new URL("contact-us.html", root), "utf8");
  assert.match(html, /02-8221-4008/);
  assert.match(html, /info@yiita\.com/);
  assert.match(html, /line\.me\/ti\/p\/CE4oZqQlch/);
  assert.match(html, /wa\.me\/message\/YOP4EOVNXQJAC1/);
});

test("contact form offers webmail and copy fallbacks", async () => {
  const html = await readFile(new URL("contact-us.html", root), "utf8");
  assert.match(html, /準備寄信方式/);
  assert.match(html, /使用 Gmail/);
  assert.match(html, /使用 Outlook/);
  assert.match(html, /使用裝置 Email/);
  assert.match(html, /複製 Email 內容/);
});

test("English navigation exposes both dropdowns and an English GPTs page", async () => {
  const en = await readFile(new URL("en.html", root), "utf8");
  assert.equal((en.match(/class="navGroup englishNavGroup"/g) || []).length, 2);
  assert.match(en, /Registration Services/);
  assert.match(en, /Incorporation Documents/);
  assert.match(en, /Business Types/);
  assert.match(en, /Foreign Setup Process/);
  assert.match(en, /Tax Planning/);
  assert.ok(en.includes(`href="${basePath}/en/accounting-gpts"`));

  const gpts = await readFile(new URL("en/accounting-gpts.html", root), "utf8");
  assert.match(gpts, /GPTs Q&amp;A/);
  assert.match(gpts, /At Yiita Accounting &amp; Bookkeeping Service/);
  assert.doesNotMatch(gpts, /GPTs 問與答|台灣會計小幫手/);
});

test("foreign investment comparison keeps the complete original table", async () => {
  const html = await readFile(new URL("foreign-invest-comparison.html", root), "utf8");
  for (const originalLabel of [
    "證券投資開戶",
    "營業稅稅率",
    "所得稅稅率",
    "非居住者(小於183天)盈餘分配扣繳稅率",
    "盈餘不分配加徵稅率",
    "設立時需認證的文件",
    "發展及限制",
  ]) {
    assert.match(html, new RegExp(originalLabel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("Chinese pages preserve the original long-form content", async () => {
  const expectedMarkers = {
    "services.html": ["代購並寄送新一期發票", "洽詢乙達記帳士事務所"],
    "registeration-services.html": ["菸類輸入業", "特定寵物服務業", "勞健保投保單位成立"],
    "company-register-docs.html": ["名稱預查輔助查詢", "全部預估所需時間：公司 20 工作天"],
    "business-types.html": ["負責人限制出境金額", "盈餘分配", "未分配之盈餘需加徵10%"],
    "registeration-process.html": ["設立流程 6 步驟", "雇用員工勞健保"],
    "startup-register.html": ["有限公司設立作業流程", "會計師資本額查核簽證委託書"],
    "foreign-register-process.html": ["外國人統一證號基資表", "法人代表指派書"],
    "tax-planning.html": ["包稅制", "交際費限額提高", "盈虧可互抵"],
    "accounting-gpts.html": ["Top 10 常見問與答", "什麼是二代健保費及其計算方式", "乙達記帳士事務所 專人"],
    "contact-us.html": ["協助您實現財務成功和業務增長"],
    "%E9%97%9C%E6%96%BC.html": ["People", "Partners", "Associates"],
    "%E5%89%AF%E6%9C%AC-people.html": ["People", "Partners", "Associates"],
    "careers.html": ["Your Legal Career Starts Here", "Law Students / Summer Interns", "Paralegals / Staff"],
    "service-schedule.html": ["服務時程"],
    "pricing.html": ["服務收費"],
    "news.html": ["News &amp; Articles", "此語言尚未有已發佈之文章"],
  };

  for (const [file, markers] of Object.entries(expectedMarkers)) {
    const html = await readFile(artifactUrl(file), "utf8");
    for (const marker of markers) assert.ok(html.includes(marker), `${file} is missing: ${marker}`);
  }
});

test("English pages preserve the original English copy and intentionally bilingual tables", async () => {
  const expectedMarkers = {
    "en.html": ["Regardless of your inquiries pertaining to finance", "Customers from 15+ countries", "Immediate Inquiry to Yiita"],
    "en/services.html": ["Purchase and Ship Latest Invoices", "Contact Yiita Accounting &amp; Booking Service"],
    "en/registeration-services.html": ["Tobacco Import Business", "Specific Pet Services", "Establishment of Labor and Health Insurance Coverage Unit"],
    "en/company-register-docs.html": ["Documents required for company establishment", "名稱預查輔助查詢"],
    "en/business-types.html": ["Differences Between Company and Sole Proprietorship", "盈餘分配"],
    "en/registeration-process.html": ["Establishment Process in 6 Steps", "雇用員工勞健保"],
    "en/foreign-invest-comparison.html": ["Foreign Investment Comparison", "證券投資開戶", "發展及限制"],
    "en/startup-register.html": ["Startup Registration", "有限公司設立作業流程"],
    "en/foreign-register-process.html": ["Application Process (Foreign Currency Investment)", "外國人統一證號基資表"],
    "en/tax-planning.html": ["Document-Based Review", "Accountant-Certified Filing", "Increased entertainment expense limit"],
    "en/accounting-gpts.html": ["Top 10 FAQ", "What is Property Transaction Income Tax?", "Only available for ChatGPT Plus"],
    "en/contact-us.html": ["helping you achieve financial success and business growth"],
  };

  for (const [file, markers] of Object.entries(expectedMarkers)) {
    const html = await readFile(artifactUrl(file), "utf8");
    for (const marker of markers) assert.ok(html.includes(marker), `${file} is missing: ${marker}`);
  }
});
