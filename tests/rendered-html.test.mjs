import assert from "node:assert/strict";
import { access, readdir, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../dist/client/", import.meta.url);
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const basePath = configuredBasePath === "/" ? "" : configuredBasePath.replace(/\/$/, "");
const expectedSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.yiita.com")
  .replace(/^http:\/\/(?=(?:www\.)?yiita\.com(?:\/|$))/i, "https://")
  .replace(/\/$/, "");
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
  assert.doesNotMatch(zh, /service-(?:registration|bookkeeping|contact)\.avif/);
  assert.match(zh, /class="serviceLink">了解更多/);
  assert.match(en, /class="serviceLink">Learn more/);
});

test("keeps the floating contact action compactable without changing its accessible name", async () => {
  const [home, contact] = await Promise.all([
    readFile(new URL("index.html", root), "utf8"),
    readFile(new URL("contact-us.html", root), "utf8"),
  ]);
  assert.match(home, /class="floatingContact"[^>]*aria-label="立即展開交談"/);
  assert.match(home, /class="floatingContactCompact" aria-hidden="true">聯絡/);
  assert.doesNotMatch(contact, /class="floatingContact"/);
});

test("keeps framework assets at the deployment artifact root", async () => {
  const html = await readFile(new URL("index.html", root), "utf8");
  assert.ok(html.includes(`href="${expectedAssetPrefix}/_next/static/`));
  assert.doesNotMatch(html, /http:\/\/(?:www\.)?yiita\.com/i);
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
    "services.html", "registration-services.html", "registeration-services.html", "company-register-docs.html",
    "business-types.html", "registration-process.html", "registeration-process.html", "foreign-invest-comparison.html",
    "startup-register.html", "foreign-register-process.html", "tax-planning.html",
    "accounting-gpts.html", "contact-us.html", "news.html",
    "en.html", "en/services.html", "en/registration-services.html", "en/registeration-services.html",
    "en/company-register-docs.html", "en/business-types.html",
    "en/registration-process.html", "en/registeration-process.html", "en/foreign-invest-comparison.html",
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
  assert.match(html, /檢查並選擇寄送方式/);
  assert.match(html, /<button class="button solid" type="button">檢查並選擇寄送方式<\/button>/);
  assert.match(html, /完成檢查並選擇 Email 寄送方式前，不會送出任何內容/);
  assert.match(html, /開啟 Email App/);
  assert.match(html, /使用 Gmail/);
  assert.match(html, /使用 Outlook/);
  assert.match(html, /複製 Email 內容/);
  assert.match(html, /maxLength|maxlength/);
  assert.match(html, /class="emailOptions" hidden="" tabindex="-1"/);
  assert.equal((html.match(/aria-disabled="true" tabindex="-1"/g) || []).length, 3);
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

test("comparison pages offer a decision-first path before the full tables", async () => {
  const [businessZh, businessEn, foreignZh, foreignEn, documentsZh] = await Promise.all([
    readFile(new URL("business-types.html", root), "utf8"),
    readFile(new URL("en/business-types.html", root), "utf8"),
    readFile(new URL("foreign-invest-comparison.html", root), "utf8"),
    readFile(new URL("en/foreign-invest-comparison.html", root), "utf8"),
    readFile(new URL("company-register-docs.html", root), "utf8"),
  ]);

  assert.match(businessZh, /href="#business-structure-guide"/);
  assert.match(businessZh, /id="business-structure-guide"/);
  assert.match(businessZh, /先從你的情況開始/);
  assert.match(businessEn, /Start with your situation/);
  assert.match(foreignZh, /href="#foreign-setup-guide"/);
  assert.match(foreignZh, /先確認在台灣要進行的活動/);
  assert.match(foreignEn, /Start with the role you need in Taiwan/);
  assert.ok(businessZh.indexOf("business-structure-guide") < businessZh.indexOf("business-types-table"));
  assert.ok(foreignZh.indexOf("foreign-setup-guide") < foreignZh.indexOf("foreign-company-table"));

  for (const html of [businessZh, foreignZh, documentsZh]) {
    assert.match(html, /在手機上可左右滑動，查看完整比較/);
  }
  for (const html of [businessEn, foreignEn]) {
    assert.match(html, /On mobile, scroll sideways to compare every column/);
  }
  assert.match(businessZh, /id="business-types-table"[^>]*tabindex="0"[^>]*aria-describedby="business-types-table-scroll-hint"/);
  assert.match(foreignEn, /id="foreign-company-table"[^>]*tabindex="0"[^>]*aria-describedby="foreign-company-table-scroll-hint"/);
});

test("compiled table styles cover every viewport where the tables overflow", async () => {
  const cssDirectory = new URL("_next/static/css/", root);
  const cssFiles = (await readdir(cssDirectory)).filter((file) => file.endsWith(".css"));
  const css = (await Promise.all(cssFiles.map((file) => readFile(new URL(file, cssDirectory), "utf8")))).join("\n");
  assert.match(css, /@media \(max-width:720px\)/);
  assert.match(css, /tableScrollHint[^}]*position:static/);
  assert.match(css, /tableWrap th:first-child[^}]*position:sticky/);
});

test("Chinese pages preserve the original long-form content", async () => {
  const expectedMarkers = {
    "services.html": ["代購並寄送新一期發票", "洽詢乙達記帳士事務所"],
    "registration-services.html": ["菸類輸入業", "特定寵物服務業", "勞健保投保單位成立"],
    "company-register-docs.html": ["名稱預查輔助查詢", "一般預估時間：公司 20 個工作天"],
    "business-types.html": ["負責人限制出境金額", "盈餘分配", "未分配盈餘原則上加徵 5%"],
    "registration-process.html": ["設立流程 6 步驟", "雇用員工勞健保"],
    "startup-register.html": ["有限公司設立作業流程", "會計師資本額查核簽證委託書"],
    "foreign-register-process.html": ["外國人統一證號基資表", "法人代表指派書"],
    "tax-planning.html": ["包稅制", "交際費限額提高", "盈虧可互抵"],
    "accounting-gpts.html": ["Top 10 常見問與答", "什麼是二代健保費及其計算方式", "乙達記帳士事務所 專人"],
    "contact-us.html": ["協助您實現財務成功和業務增長"],
    "news.html": ["News &amp; Articles", "此語言尚未有已發佈之文章"],
  };

  for (const [file, markers] of Object.entries(expectedMarkers)) {
    const html = await readFile(artifactUrl(file), "utf8");
    for (const marker of markers) assert.ok(html.includes(marker), `${file} is missing: ${marker}`);
  }
});

test("English pages contain complete English decision content", async () => {
  const expectedMarkers = {
    "en.html": ["Regardless of your inquiries pertaining to finance", "Customers from 15+ countries", "Talk to Yiita about the questions"],
    "en/services.html": ["Purchase and Ship Latest Invoices", "Contact Yiita Accounting &amp; Bookkeeping Service"],
    "en/registration-services.html": ["Tobacco Import Business", "Specific Pet Services", "Establishment of Labor and Health Insurance Coverage Unit"],
    "en/company-register-docs.html": ["Documents required for company establishment", "Company name availability search"],
    "en/business-types.html": ["Differences Between Company and Sole Proprietorship", "Earnings distribution"],
    "en/registration-process.html": ["Establishment Process in 6 Steps", "Arrange labor and health insurance for employees"],
    "en/foreign-invest-comparison.html": ["Foreign Investment Comparison", "May open a securities investment account", "Development and limitations"],
    "en/startup-register.html": ["Startup Registration", "Limited company formation process"],
    "en/foreign-register-process.html": ["Application Process (Foreign Currency Investment)", "Taiwan identification-number record"],
    "en/tax-planning.html": ["Document-Based Review", "Accountant-Certified Filing", "Increased entertainment expense limit"],
    "en/accounting-gpts.html": ["Top 10 FAQ", "What is Property Transaction Income Tax?", "Only available for ChatGPT Plus"],
    "en/contact-us.html": ["helping you achieve financial success and business growth"],
  };

  for (const [file, markers] of Object.entries(expectedMarkers)) {
    const html = await readFile(artifactUrl(file), "utf8");
    for (const marker of markers) assert.ok(html.includes(marker), `${file} is missing: ${marker}`);
    assert.doesNotMatch(html, /名稱預查|比較項目|營業稅稅率|外國人統一證號基資表/);
  }
});

test("does not publish unfinished template routes", async () => {
  for (const file of [
    "pricing.html",
    "service-schedule.html",
    "careers.html",
    "%E9%97%9C%E6%96%BC.html",
    "%E5%89%AF%E6%9C%AC-people.html",
  ]) {
    await assert.rejects(access(artifactUrl(file)), `${file} should not be exported`);
  }
});

test("English pages expose an English content language and corrected current tax figures", async () => {
  const [en, comparison, startup] = await Promise.all([
    readFile(new URL("en.html", root), "utf8"),
    readFile(new URL("en/foreign-invest-comparison.html", root), "utf8"),
    readFile(new URL("en/startup-register.html", root), "utf8"),
  ]);
  assert.match(en, /<html lang="en"/);
  assert.match(en, /class="siteShell" lang="en"/);
  assert.match(en, /<meta property="og:locale" content="en_US"/);
  assert.match(en, /<meta property="og:title" content="Yiita Accounting &amp; Bookkeeping Service"/);
  assert.doesNotMatch(en, /<meta name="twitter:description" content="您專業負責的財務夥伴"/);
  assert.doesNotMatch(en, /asily Solve/);
  assert.match(comparison, /Profit-seeking enterprise income tax rate/);
  assert.match(comparison, />20%</);
  assert.match(comparison, />21% unless an applicable tax treaty/);
  assert.match(comparison, /Additional tax on undistributed earnings/);
  assert.match(comparison, />5%</);
  assert.equal((startup.match(/Pay in the subscribed capital/g) || []).length, 1);
});
