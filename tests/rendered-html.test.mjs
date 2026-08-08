import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../dist/client/", import.meta.url);
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const basePath = configuredBasePath === "/" ? "" : configuredBasePath.replace(/\/$/, "");
const expectedSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.yiita.com").replace(/\/$/, "");

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
  assert.ok(zh.includes(`src="${basePath}/_next/static/`));
  assert.ok(zh.includes(`${expectedSiteUrl}/og.png`));
});

test("exports all main service routes and brand assets", async () => {
  await Promise.all([
    "services.html",
    "registeration-services.html",
    "company-register-docs.html",
    "business-types.html",
    "foreign-invest-comparison.html",
    "foreign-register-process.html",
    "tax-planning.html",
    "accounting-gpts.html",
    "contact-us.html",
    "images/yiita-logo.avif",
    "images/line-qr.avif",
    "og.png",
    ".nojekyll",
  ].map((file) => access(new URL(file, root))));
});

test("contact page keeps direct, serverless contact options", async () => {
  const html = await readFile(new URL("contact-us.html", root), "utf8");
  assert.match(html, /02-8221-4008/);
  assert.match(html, /info@yiita\.com/);
  assert.match(html, /line\.me\/ti\/p\/CE4oZqQlch/);
  assert.match(html, /wa\.me\/message\/YOP4EOVNXQJAC1/);
});
