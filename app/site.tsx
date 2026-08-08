"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const basePath = configuredBasePath === "/" ? "" : configuredBasePath.replace(/\/$/, "");

function sitePath(path: string) {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (path === "/") return basePath || "/";
  return `${basePath}${path}`;
}

const registrationLinks = [
  ["登記業務項目", "/registeration-services"],
  ["公司設立應備文件", "/company-register-docs"],
  ["公司與行號差異", "/business-types"],
  ["外資設立比較", "/foreign-invest-comparison"],
  ["新創公司登記", "/startup-register"],
  ["外資來台設立流程", "/foreign-register-process"],
];

const serviceLinks = [
  ["服務內容", "/services"],
  ["稅務規劃", "/tax-planning"],
];

const englishRegistrationLinks = [
  ["Registration Services", "/en/registeration-services"],
  ["Incorporation Documents", "/en/company-register-docs"],
  ["Business Types", "/en/business-types"],
  ["Incorporation Process", "/en/registeration-process"],
  ["Foreign Investment", "/en/foreign-invest-comparison"],
  ["Startup Registration", "/en/startup-register"],
  ["Foreign Setup Process", "/en/foreign-register-process"],
];

const englishServiceLinks = [
  ["Tax Planning", "/en/tax-planning"],
  ["Services", "/en/services"],
];

const serviceSteps = [
  ["01", "代購並寄送新一期發票"],
  ["02", "按時憑證整理、登錄記帳（配合營業稅每期登帳）"],
  ["03", "單月 15 日前完成每期營業稅申報"],
  ["04", "每年 9 月完成當年度之營利事業所得稅暫繳申報"],
  ["05", "每年 1 月完成上一年度薪資、租金、執行業務者等扣繳申報"],
  ["06", "每年 5 月完成上一年度營所稅申報"],
];

const companyDocs = [
  ["預查名稱（2–3 個）", "✓", "✓"],
  ["營業項目", "✓", "✓"],
  ["負責人身份證影本", "✓", "✓"],
  ["各股東身份證影本", "✓", "✓"],
  ["公司名租賃契約影本或所有權人同意書影本 2 份", "✓", "✓"],
  ["房屋稅單影本或建物所有權狀影本", "✓", "✓"],
  ["會計師資本簽證應提供文件", "✓", "—"],
  ["存摺影本（封面、蓋章頁、金額頁）", "✓", "—"],
  ["存款餘額證明影本（證明至簽證日）", "✓", "—"],
];

const englishCompanyDocs = [
  ["Proposed company names (2–3)", "✓", "✓"],
  ["Business scope and activities", "✓", "✓"],
  ["Copy of the responsible person's ID", "✓", "✓"],
  ["Copies of each shareholder's ID", "✓", "✓"],
  ["Lease agreement or two owner consent forms", "✓", "✓"],
  ["Property tax statement or building ownership certificate", "✓", "✓"],
  ["Documents for CPA capital verification", "✓", "—"],
  ["Bankbook copy (cover, seal and deposit pages)", "✓", "—"],
  ["Bank balance certificate through the verification date", "✓", "—"],
];

const businessRows = [
  ["公司名稱", "商店、商行、企業社（縣市內不得重複）", "有限公司、企業有限公司（全國不得重複）", "股份有限公司（全國不得重複）"],
  ["資本額", "不限；特殊行業另有限制", "不限，建議不低於 10 萬", "不限，建議不低於 10 萬"],
  ["資本額簽證", "25 萬以下免證明；以上須資金證明", "需會計師資本額簽證", "需會計師資本額簽證"],
  ["股東人數", "獨資 1 人；合夥 2 人以上", "1 人以上", "2 人以上，另需董事與監察人"],
  ["股權轉讓", "獨資可變更合夥；合夥不得變更獨資", "須股東過半數同意", "股權可自由轉讓"],
  ["股東責任", "無限清償責任", "以出資額為限", "以出資額為限"],
  ["進出口登記", "經營進出口業務須辦理", "經營進出口業務須辦理", "經營進出口業務須辦理"],
];

const englishBusinessRows = [
  ["Business name", "Shop, firm or enterprise; unique within the city or county", "Limited company; unique nationwide", "Company limited by shares; unique nationwide"],
  ["Capital", "No general minimum; regulated industries may differ", "No general minimum; at least NT$100,000 is recommended", "No general minimum; at least NT$100,000 is recommended"],
  ["Capital verification", "Proof of funds required above NT$250,000", "CPA capital verification required", "CPA capital verification required"],
  ["Owners / shareholders", "One for a sole proprietorship; two or more for a partnership", "One or more", "Two or more, plus directors and a supervisor"],
  ["Ownership transfer", "A sole proprietorship may become a partnership", "Requires approval by a majority of shareholders", "Shares are generally transferable"],
  ["Liability", "Unlimited liability", "Limited to the amount invested", "Limited to the amount invested"],
  ["Import / export registration", "Required when conducting import or export business", "Required when conducting import or export business", "Required when conducting import or export business"],
];

const foreignCompanyRows = [
  ["股東身份", "外國法人、自然人", "外國法人、自然人"],
  ["營業／進出口／法人資格", "✓", "✓"],
  ["股東人數", "自然人 1+；法人 1+", "自然人 2+；法人 1+"],
  ["人員", "董事 1、投資登記代理人 1", "董事 3、監察人 1、投資登記代理人 1"],
  ["地址", "需符合商業規定", "需符合商業規定"],
  ["最低資本額", "無（50 萬才可聘外籍經理人）", "無（50 萬才可聘外籍經理人）"],
  ["公開發行股票", "✕", "✓"],
  ["申請外國人工作證", "經理、技術人員", "經理、技術人員"],
  ["統一發票", "✓", "✓"],
];

const englishForeignCompanyRows = [
  ["Investor identity", "Foreign legal entity or individual", "Foreign legal entity or individual"],
  ["Business / import-export / legal status", "✓", "✓"],
  ["Shareholders", "One or more individuals; one or more legal entities", "Two or more individuals; one or more legal entities"],
  ["Required personnel", "One director and one investment agent", "Three directors, one supervisor and one investment agent"],
  ["Registered address", "Must comply with business-use rules", "Must comply with business-use rules"],
  ["Minimum capital", "None; NT$500,000 is required to employ a foreign manager", "None; NT$500,000 is required to employ a foreign manager"],
  ["Public share offering", "✕", "✓"],
  ["Foreign work permits", "Manager or technical personnel", "Manager or technical personnel"],
  ["Uniform Invoices", "✓", "✓"],
];

const foreignBranchRows = [
  ["股東身份", "總公司為外國公司", "總公司為外國公司"],
  ["營業資格", "✓", "✕"],
  ["出進口資格", "✓", "✕"],
  ["法人資格", "✕", "✕"],
  ["人員", "代表人 1、經理人 1", "代表人 1"],
  ["地址", "須符合商業規定", "一般地址即可登記"],
  ["最低資本額", "無；外幣投資須由境外匯入", "無"],
  ["申請外國人工作證", "經理、技術人員", "代表人"],
  ["統一發票", "✓", "✕"],
];

const englishForeignBranchRows = [
  ["Parent company", "Foreign company", "Foreign company"],
  ["Business eligibility", "✓", "✕"],
  ["Import / export eligibility", "✓", "✕"],
  ["Separate legal personality", "✕", "✕"],
  ["Required personnel", "One representative and one manager", "One representative"],
  ["Registered address", "Must comply with business-use rules", "A general address may be used"],
  ["Minimum capital", "None; foreign-currency investment must be remitted from overseas", "None"],
  ["Foreign work permits", "Manager or technical personnel", "Representative"],
  ["Uniform Invoices", "✓", "✕"],
];

const foreignSteps = [
  ["01", "諮詢乙達記帳士事務所", "我們將竭誠為您服務，先確認投資人身份、營業項目與預計時程。"],
  ["02", "委託乙達申辦公司登記", "簽訂委託書並支付諮詢服務費；公司設立完成後可全數折抵設立費用。"],
  ["03", "進行外資來台公司設立", "準備投資申請、名稱預查、銀行籌備戶及相關公驗證文件。"],
  ["04", "經濟部完成登記", "取得統一編號並確認尾款後，接續辦理營業與進出口登記。"],
  ["05", "國稅局與購票證", "取得核准公文、負責人簽名，並由乙達陪同辦理購票證。"],
  ["06", "委託記帳", "按期申報營業稅、設帳記錄，並辦理年度營利事業所得稅申報。"],
  ["07", "會計師稅務簽證", "依企業需求進行年度稅務規劃與簽證申報。"],
];

function Header({ path, english }: { path: string; english: boolean }) {
  const [open, setOpen] = useState(false);
  const languageHref = english
    ? path === "/en/registeration-process"
      ? "/registeration-services"
      : path.replace(/^\/en(?=\/|$)/, "") || "/"
    : path === "/"
      ? "/en"
      : `/en${path}`;
  const englishRegistrationActive = englishRegistrationLinks.some(([, href]) => path === href);
  const englishServiceActive = englishServiceLinks.some(([, href]) => path === href);

  return (
    <>
      <nav className="topbar" aria-label={english ? "Primary navigation" : "主要導覽"}>
        <button className="menuButton" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="site-menu">
          <span />
          <span />
          <span />
          <b>{english ? "Menu" : "選單"}</b>
        </button>
        <div id="site-menu" className={`navInner ${open ? "isOpen" : ""}`}>
          <a className={path === (english ? "/en" : "/") ? "active" : ""} href={sitePath(english ? "/en" : "/")}>
            {english ? "Home" : "首頁"}
          </a>
          {english ? (
            <>
              <details className="navGroup englishNavGroup">
                <summary className={englishRegistrationActive ? "active" : ""}>Company Registration</summary>
                <div className="dropdown">
                  {englishRegistrationLinks.map(([label, href]) => (
                    <a href={sitePath(href)} key={href}>{label}</a>
                  ))}
                </div>
              </details>
              <details className="navGroup englishNavGroup">
                <summary className={englishServiceActive ? "active" : ""}>Accounting Services</summary>
                <div className="dropdown">
                  {englishServiceLinks.map(([label, href]) => (
                    <a href={sitePath(href)} key={href}>{label}</a>
                  ))}
                </div>
              </details>
              <a className={path === "/en/accounting-gpts" ? "active" : ""} href={sitePath("/en/accounting-gpts")}>GPTs Q&amp;A</a>
              <a className={path === "/en/contact-us" ? "active" : ""} href={sitePath("/en/contact-us")}>Contact Yiita</a>
            </>
          ) : (
            <>
              <details className="navGroup">
                <summary>公司登記介紹</summary>
                <div className="dropdown">
                  {registrationLinks.map(([label, href]) => (
                    <a href={sitePath(href)} key={href}>{label}</a>
                  ))}
                </div>
              </details>
              <details className="navGroup">
                <summary>記帳服務</summary>
                <div className="dropdown">
                  {serviceLinks.map(([label, href]) => (
                    <a href={sitePath(href)} key={href}>{label}</a>
                  ))}
                </div>
              </details>
              <a href={sitePath("/accounting-gpts")}>GPTs 問與答</a>
              <a href={sitePath("/contact-us")}>聯絡乙達</a>
            </>
          )}
          <a className="language" href={sitePath(languageHref)} aria-label={english ? "切換至中文" : "Switch to English"}>
            <img src={sitePath(english ? "/images/flag-tw.png" : "/images/flag-us.png")} alt="" />
            {english ? "中文" : "English"}
          </a>
        </div>
      </nav>
      <header className="brandHeader">
        <a href={sitePath(english ? "/en" : "/")} aria-label={english ? "Yiita home" : "乙達首頁"}>
          <img src={sitePath("/images/yiita-logo.avif")} alt="乙達記帳士事務所 — Yiita Accounting & Bookkeeping Service" />
        </a>
      </header>
    </>
  );
}

function Footer({ english }: { english: boolean }) {
  return (
    <footer>
      <div>
        <strong>{english ? "Yiita Accounting & Bookkeeping Service" : "乙達記帳士事務所"}</strong>
        <p>{english ? "No. 22-2, Lane 30, Xinsheng Street, Zhonghe District, New Taipei City 235" : "235 新北市中和區新生街 30 巷 22-2 號"}</p>
      </div>
      <div className="footerLinks">
        <a href="tel:+886282214008">TEL: 02-8221-4008</a>
        <a href="mailto:info@yiita.com">info@yiita.com</a>
      </div>
      <small>Copyright © 2023–2026 YIITA ALL RIGHTS RESERVED.</small>
    </footer>
  );
}

type EmailDraft = {
  copyText: string;
  gmailUrl: string;
  mailtoUrl: string;
  outlookUrl: string;
};

function buildEmailDraft(data: FormData, english: boolean): EmailDraft {
  const recipient = "info@yiita.com";
  const name = String(data.get("name") || "");
  const phone = String(data.get("phone") || "");
  const email = String(data.get("email") || "");
  const topic = String(data.get("topic") || "");
  const message = String(data.get("message") || "");
  const subject = topic || (english ? "Website enquiry" : "網站諮詢");
  const body = english
    ? `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\n${message}`
    : `姓名：${name}\n電話：${phone}\nEmail：${email}\n\n${message}`;
  const encodedRecipient = encodeURIComponent(recipient);
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  return {
    copyText: `${english ? "To" : "收件人"}：${recipient}\n${english ? "Subject" : "主旨"}：${subject}\n\n${body}`,
    gmailUrl: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedRecipient}&su=${encodedSubject}&body=${encodedBody}`,
    mailtoUrl: `mailto:${recipient}?subject=${encodedSubject}&body=${encodedBody}`,
    outlookUrl: `https://outlook.office.com/mail/deeplink/compose?to=${encodedRecipient}&subject=${encodedSubject}&body=${encodedBody}`,
  };
}

function ContactForm({ english = false }: { english?: boolean }) {
  const [draft, setDraft] = useState<EmailDraft | null>(null);
  const [copyStatus, setCopyStatus] = useState("");

  function prepareMail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDraft(buildEmailDraft(new FormData(event.currentTarget), english));
    setCopyStatus("");
  }

  async function copyEmail() {
    if (!draft) return;
    let copied = false;

    try {
      await navigator.clipboard.writeText(draft.copyText);
      copied = true;
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = draft.copyText;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      copied = document.execCommand("copy");
      textarea.remove();
    }

    setCopyStatus(copied
      ? (english ? "Email content copied." : "Email 內容已複製。")
      : (english ? "Copy failed. Please select the text manually." : "無法自動複製，請改用 Gmail 或 Outlook。"));
  }

  return (
    <form className="contactForm" onSubmit={prepareMail}>
      <div className="fieldRow">
        <label>{english ? "Name" : "姓名"}<input required name="name" autoComplete="name" /></label>
        <label>{english ? "Phone" : "電話"}<input name="phone" autoComplete="tel" /></label>
      </div>
      <label>Email<input required name="email" type="email" autoComplete="email" /></label>
      <label>{english ? "Subject" : "標題"}<input name="topic" placeholder={english ? "Quote enquiry or other question" : "詢問報價、詢問其他事項"} /></label>
      <label>{english ? "How can we help?" : "請留下您的需求"}<textarea required name="message" rows={6} /></label>
      <button className="button solid" type="submit">{english ? "Choose how to send" : "準備寄信方式"}</button>
      <p className="formNote">{english ? "Nothing is stored on this website. You can use Gmail, Outlook, your device email app, or copy the message." : "本網站不會儲存您填寫的資料；可使用 Gmail、Outlook、裝置 Email 或複製內容。"}</p>
      <section className="emailOptions" hidden={!draft} aria-live="polite" aria-label={english ? "Email sending options" : "寄信方式"}>
        <h3>{english ? "Your email draft is ready" : "Email 草稿已準備好"}</h3>
        <p>{english ? "Choose a method below. If your device email app does not open, use Gmail, Outlook or copy the content." : "請選擇寄信方式；若裝置 Email 無法開啟，請改用 Gmail、Outlook 或複製內容。"}</p>
        <div className="emailActionGrid">
          <a className="button solid" href={draft?.gmailUrl || "#"} target="_blank" rel="noreferrer" aria-disabled={!draft} tabIndex={draft ? 0 : -1}>{english ? "Use Gmail" : "使用 Gmail"}</a>
          <a className="button secondary" href={draft?.outlookUrl || "#"} target="_blank" rel="noreferrer" aria-disabled={!draft} tabIndex={draft ? 0 : -1}>{english ? "Use Outlook" : "使用 Outlook"}</a>
          <a className="button secondary" href={draft?.mailtoUrl || "#"} aria-disabled={!draft} tabIndex={draft ? 0 : -1}>{english ? "Use device email" : "使用裝置 Email"}</a>
          <button className="button secondary" type="button" disabled={!draft} onClick={copyEmail}>{english ? "Copy email content" : "複製 Email 內容"}</button>
        </div>
        {copyStatus && <p className="copyStatus">{copyStatus}</p>}
      </section>
    </form>
  );
}

function PageIntro({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <section className="pageIntro">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1>{title}</h1>
      {children && <div className="introText">{children}</div>}
    </section>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="tableWrap">
      <table>
        <thead><tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function Home({ english = false }: { english?: boolean }) {
  return (
    <>
      <section className="hero" style={{ backgroundImage: `url(${sitePath("/images/hero-cloud-gate.avif")})` }} aria-label={english ? "Yiita introduction" : "乙達介紹"}>
        <div className="heroPanel">
          <p className="eyebrow">YIITA ACCOUNTING</p>
          <h1>{english ? "Your Devoted Financial Partner" : "您專業負責的財務夥伴"}</h1>
          {!english && <h2>記帳　會計　報稅　內帳　外帳</h2>}
          <p>{english ? "Regardless of your inquiries about finance, accounting, or taxation, our expert team is ready to guide you and deliver solutions tailored to your needs." : "無論您有任何關於財務、會計或稅務方面的問題，乙達記帳士事務所將竭誠協助，為您提供最佳解決方案。"}</p>
          <a className="button outline" href={sitePath(english ? "/en/contact-us" : "/contact-us")}>{english ? "Contact Us" : "聯絡乙達"}</a>
        </div>
      </section>

      <section className="serviceCards" aria-label={english ? "Our services" : "主要服務"}>
        {[
          ["/images/service-registration.avif", english ? "Company Registration" : "工商登記", english ? "Company, branch and foreign investment registration." : "辦理公司登記、行號登記等業務", english ? "/en/foreign-register-process" : "/registeration-services"],
          ["/images/service-bookkeeping.avif", english ? "Bookkeeping" : "記帳服務", english ? "Bookkeeping and tax filing made straightforward." : "輕鬆解決記帳、報稅等傷透腦筋的事務", english ? "/en/services" : "/services"],
          ["/images/service-contact.avif", english ? "Request a Quote" : "詢問報價", english ? "Tell Yiita what you need and receive professional guidance." : "立即詢問乙達，解決您腦中目前的問題", english ? "/en/contact-us" : "/contact-us"],
        ].map(([image, title, copy, href]) => (
          <a className="serviceCard" href={sitePath(href)} key={title}>
            <img src={sitePath(image)} alt="" />
            <h3>{title}</h3>
            <p>{copy}</p>
            <span>{english ? "Learn more" : "了解更多"} →</span>
          </a>
        ))}
      </section>

      <section className="split feature">
        <div className="featureCopy">
          <span className="eyebrow">15+ COUNTRIES</span>
          <h2>{english ? "Rich experience in foreign business accounting" : "豐富外商會計經驗"}</h2>
          <h3>{english ? "Clients from more than 15 countries — and growing" : "15+ 國家之客戶（持續成長中）"}</h3>
          <p>{english ? "We serve small and medium-sized foreign businesses from more than 15 countries with comprehensive accounting and financial services. Fluent English communication helps us meet diverse needs and keep your financial operations running smoothly." : "我們是一家擁有豐富外商經驗的會計事務所，為來自超過 15 個國家的外商中小企業提供全面的會計和財務服務。以流利的英文溝通能力為特色，我們能夠滿足外商客戶的多樣需求，確保您的財務運營順利無阻。"}</p>
        </div>
        <img src={sitePath("/images/foreign-business.avif")} alt={english ? "Professional office building" : "超過 15 個國家的外商中小企業服務"} />
      </section>

      <section className="split feature reverse">
        <img src={sitePath("/images/accounting-solutions.avif")} alt={english ? "Accounting professional at work" : "客製化的會計解決方案"} />
        <div className="featureCopy">
          <span className="eyebrow">TAILORED SUPPORT</span>
          <h2>{english ? "Customized Accounting Solutions" : "客製化的會計解決方案"}</h2>
          <h3>{english ? "Meeting Your Financial Needs" : "滿足您的財務需求"}</h3>
          <p>{english ? "We offer accounting solutions tailored to your specific requirements. Ask us for a quote and we will provide competitive pricing with exceptional professional service." : "我們提供客製化的會計解決方案，根據您的需求，為您提供最佳的會計支援。如果您對我們的服務感興趣，歡迎詢問報價，我們將竭誠為您提供最具競爭力的價格和卓越的專業服務。"}</p>
        </div>
      </section>

      <section className="formSection" id="quote">
        <div><span className="eyebrow">CONTACT</span><h2>{english ? "Request a Quote" : "詢問報價"}</h2><p>{english ? "Let us know what your business needs. Your message opens in your email app, so the static website does not need a costly server." : "告訴我們您的需求。填寫內容會在您的 Email 中開啟，不需昂貴的網站後端。"}</p></div>
        <ContactForm english={english} />
      </section>
    </>
  );
}

function Services({ english = false }: { english?: boolean }) {
  return (
    <>
      <PageIntro eyebrow="ACCOUNTING & TAX" title={english ? "Services" : "服務內容"}>
        <p>{english ? "Entrusting accounting and tax matters to Yiita is the most time-efficient, effortless and cost-effective method — resolving the burden of bookkeeping and tax filing." : "將會計、稅務等作業，委託乙達記帳士處理是最省時、省力、省成本的方法，輕鬆解決記帳、報稅等讓人傷透腦筋的事務。"}</p>
      </PageIntro>
      <section className="stepsGrid">
        {serviceSteps.map(([number, text]) => <article className="stepCard" key={number}><span>{number}</span><p>{english ? translateService(number) : text}</p></article>)}
        <article className="stepCard other"><span>+</span><p>{english ? "Other accounting and tax matters — contact Yiita." : "其他事項，歡迎洽詢乙達記帳士事務所。"}</p></article>
      </section>
      <Cta english={english} />
    </>
  );
}

function translateService(number: string) {
  return ({
    "01": "Purchase and deliver the next batch of Uniform Invoices.",
    "02": "Organize vouchers and record transactions on schedule.",
    "03": "Complete bi-monthly business tax filing by the 15th.",
    "04": "Complete provisional profit-seeking enterprise income tax filing in September.",
    "05": "Complete annual withholding filings for salary, rent and professional services in January.",
    "06": "Complete annual profit-seeking enterprise income tax filing in May.",
  } as Record<string, string>)[number];
}

function Registration({ english = false }: { english?: boolean }) {
  const items = english
    ? ["Company and business registration", "Registration changes", "Foreign investment in Taiwan", "Branches and representative offices", "Import / export registration", "Tax registration and Uniform Invoice setup"]
    : ["公司與行號設立", "變更登記", "外資來台投資", "分公司與辦事處", "進出口登記", "營業登記與購票證"];
  return (
    <>
      <PageIntro eyebrow="BUSINESS REGISTRATION" title={english ? "Registration Services" : "登記業務項目"}><p>{english ? "Business registration requires careful knowledge of Taiwan's rules and documentation. Yiita helps you confirm the requirements, avoid preventable corrections and complete each registration with confidence." : "辦理工商登記等業務，除了需具備相關法令的專業知識，任何小環節遺漏都可能造成退、補件。將工商登記交給乙達記帳士事務所，省下不必要的時間，安心完成相關登記。"}</p></PageIntro>
      <section className="tileGrid">
        {items.map((item, i) => <article key={item}><b>{String(i + 1).padStart(2, "0")}</b><h2>{item}</h2><p>{english ? "Yiita confirms the required documents, application steps and expected timeline." : "由乙達協助確認應備文件、申辦流程與預估時程。"}</p></article>)}
      </section>
      <Cta english={english} />
    </>
  );
}

function CompanyDocuments({ english = false }: { english?: boolean }) {
  return (
    <>
      <PageIntro eyebrow="DOCUMENT CHECKLIST" title={english ? "Incorporation Documents" : "公司設立應備文件"}><p>{english ? "Preparing the right documents is the first step toward establishing a business. Yiita keeps your checklist clear, reduces correction requests and helps your registration stay on schedule." : "文件準備是公司成立的重要起點。乙達會隨時提醒您所需文件，減少補件與等待，讓創業進度按計畫前進。"}</p></PageIntro>
      <section className="contentSection"><DataTable headers={english ? ["Document", "Company", "Business"] : ["文件名稱", "公司", "行號"]} rows={english ? englishCompanyDocs : companyDocs} /><p className="callout">{english ? "Estimated total time: approximately 20 working days for a company and 12 working days for a business registration." : "全部預估所需時間：公司約 20 個工作天、行號約 12 個工作天。"}</p></section>
      <Cta english={english} />
    </>
  );
}

function BusinessTypes({ english = false }: { english?: boolean }) {
  return (
    <>
      <PageIntro eyebrow="CHOOSE YOUR STRUCTURE" title={english ? "Business Types" : "公司與行號差異"}><p>{english ? "Before filing an application, compare how a business, limited company and company limited by shares differ in capital, ownership, liability and procedure." : "正式提出登記申請前，先理解行號、有限公司與股份有限公司在責任、資本、股東與程序上的差異，才能選擇最符合業務需求的組織形式。"}</p></PageIntro>
      <section className="contentSection wide"><DataTable headers={english ? ["Comparison", "Business", "Limited company", "Company limited by shares"] : ["比較項目", "行號", "有限公司", "股份有限公司"]} rows={english ? englishBusinessRows : businessRows} /></section>
      <Cta english={english} />
    </>
  );
}

function ForeignComparison({ english = false }: { english?: boolean }) {
  return (
    <>
      <PageIntro eyebrow="FOREIGN INVESTMENT" title={english ? "Foreign Investment" : "外資設立比較"}><p>{english ? "Compare the main structures available to foreign investors in Taiwan, including eligibility, personnel, capital and typical application timelines." : "比較華僑與外國投資者在台灣設立企業的不同選項，包含組織形式、營業資格、人員與申辦時程，協助您做出合適的商業決策。"}</p></PageIntro>
      <section className="contentSection wide"><h2>{english ? "Limited company and company limited by shares" : "有限公司與股份有限公司"}</h2><DataTable headers={english ? ["Comparison", "Limited company", "Company limited by shares"] : ["比較項目", "有限公司", "股份有限公司"]} rows={english ? englishForeignCompanyRows : foreignCompanyRows} /><p className="processLine">{english ? <><b>Typical sequence:</b> document authentication → name review → investment review → bank account → capital remittance → capital review → company registration → tax registration; approximately 30 working days.</> : <><b>預估流程：</b>文件認證 → 名稱審查 → 投資審查 → 銀行開戶 → 匯入股款 → 資金審查 → 公司登記 → 營業登記，約 30 個工作天。</>}</p><h2>{english ? "Taiwan branch and representative office" : "台灣分公司與辦事處"}</h2><DataTable headers={english ? ["Comparison", "Taiwan branch", "Representative office"] : ["比較項目", "台灣分公司", "辦事處"]} rows={english ? englishForeignBranchRows : foreignBranchRows} /><p className="processLine">{english ? "A Taiwan branch generally takes about 28 working days and a representative office about 11. Actual timing depends on the case and authority review." : "台灣分公司約 28 個工作天；辦事處約 11 個工作天。實際時程依個案與主管機關審查為準。"}</p></section>
      <Cta english={english} />
    </>
  );
}

function Startup({ english = false }: { english?: boolean }) {
  const steps = english
    ? ["Choose the business structure", "Confirm the name and activities", "Prepare the address and documents", "Complete capital verification", "Complete company and tax registration", "Begin operations and bookkeeping"]
    : ["確認公司形式", "名稱與營業項目", "準備地址與文件", "資本額簽證", "完成公司及稅籍登記", "開始營運與記帳"];
  return (
    <>
      <PageIntro eyebrow="START YOUR BUSINESS" title={english ? "Startup Registration" : "新創公司登記"}><p>{english ? "Yiita supports small and medium-sized businesses with incorporation, bookkeeping and tax filing, giving a new company a clear and dependable start." : "乙達記帳士事務所是您成功創業的得力夥伴。我們專業處理中小企業的公司設立、記帳、報稅等事務，讓您的創業之路更加順暢，為新公司打下穩固基礎。"}</p></PageIntro>
      <section className="startupFlow">{steps.map((step, i) => <article key={step}><span>{i + 1}</span><h2>{step}</h2></article>)}</section>
      <Cta english={english} />
    </>
  );
}

function RegistrationProcess() {
  const steps = [
    ["01", "Confirm the company structure", "Choose the legal structure, shareholders, responsible person and intended business activities."],
    ["02", "Reserve the company name", "Prepare several name options and submit the name and business-scope reservation."],
    ["03", "Prepare the address and documents", "Confirm that the registered address is suitable and assemble the shareholder and property documents."],
    ["04", "Open the preparatory bank account", "Deposit the capital and obtain the bank records required for capital verification."],
    ["05", "Complete incorporation registration", "Submit the verified documents and receive the company's Unified Business Number."],
    ["06", "Complete tax registration", "Finish tax-office approval and set up Uniform Invoice purchasing and ongoing bookkeeping."],
  ];
  return (
    <>
      <PageIntro eyebrow="INCORPORATION" title="Incorporation Process"><p>A practical overview of the principal steps for establishing a company in Taiwan. Yiita coordinates the documents and sequence so each stage can proceed smoothly.</p></PageIntro>
      <section className="timeline">{steps.map(([number, title, copy]) => <article key={number}><span>{number}</span><div><h2>{title}</h2><p>{copy}</p></div></article>)}</section>
      <Cta english />
    </>
  );
}

function ForeignProcess({ english = false }: { english?: boolean }) {
  return (
    <>
      <PageIntro eyebrow="FOREIGN COMPANY SETUP" title={english ? "Foreign Investment in Establishing a Company in Taiwan" : "外資來台設立公司流程"}><p>{english ? "A clear guide to the documents, application steps and timeline required for a foreign company or foreign individual to establish a business in Taiwan." : "想知道外資來台設立公司的完整流程嗎？我們提供所需文件、申辦步驟與時程指引，協助您順利實現在台灣的業務目標。"}</p></PageIntro>
      <section className="timeline">{foreignSteps.map(([number, title, copy]) => <article key={number}><span>{number}</span><div><h2>{english ? foreignStepEnglish[number] : title}</h2><p>{english ? foreignCopyEnglish[number] : copy}</p></div></article>)}</section>
      <section className="contentSection"><h2>{english ? "Core foreign-currency investment sequence" : "外幣投資申請核心流程"}</h2><div className="processPills">{(english ? ["Name reservation", "Investment application", "Preparatory bank account", "Capital remittance", "Capital review", "Address documents", "Corporate documents"] : ["名稱預查", "投資申請", "開公司籌備戶", "匯入股款", "資金審定", "公司登記地址文件", "股東會相關文件"]).map((item, i) => <span key={item}>{i + 1}. {item}</span>)}</div></section>
      <Cta english={english} />
    </>
  );
}

const foreignStepEnglish: Record<string, string> = {"01":"Consult with Yiita","02":"Delegate company registration to Yiita","03":"Establish the foreign-invested company","04":"Complete Ministry of Economic Affairs registration","05":"Tax office approval and invoice certificates","06":"Entrust bookkeeping","07":"CPA tax certification and planning"};
const foreignCopyEnglish: Record<string, string> = {"01":"Confirm investor identity, business items and the expected timeline.","02":"Sign the engagement and prepare the required documents.","03":"Complete investment review, name reservation and the preparatory bank account.","04":"Receive the Unified Business Number and proceed to tax and import/export registration.","05":"Complete the responsible-person signature and Uniform Invoice setup.","06":"File bi-monthly business tax and maintain records for annual income tax.","07":"Plan annual tax matters and certification according to business needs."};

function TaxPlanning({ english = false }: { english?: boolean }) {
  const articles = english ? [
    ["Expanded paper review", "Taxable income is calculated using the standard profit rate published by the Ministry of Finance when the business qualifies and files complete returns on time.", ["Generally available when annual operating and non-operating revenue does not exceed NT$30 million.", "The declared profit rate may be adjusted upward, but not downward.", "Tax may still be due under the standard rate when actual profit is lower or the business records a loss."]],
    ["Tax authority audit", "The tax authority reviews the company's books, vouchers and returns and determines tax according to the underlying records.", ["Tax is based on the company's actual self-assessed income.", "Books, vouchers and accounting records must be complete and supportable.", "The higher accounting standard may increase bookkeeping work and cost."]],
    ["CPA-certified tax return", "A CPA reviews the books under tax law and auditing standards before the return is filed, helping reduce omissions and unnecessary tax payments.", ["A higher entertainment-expense limit may apply.", "Qualifying losses from the preceding ten years may offset current-year income.", "The likelihood of a direct tax-authority audit may be reduced."]],
  ] : [
    ["書面審核", "擴大書審申報制度依財政部訂定的純益率計算所得稅，符合條件且書表齊全、按時繳稅者，通常可降低被調帳的機會。", ["一般適用於全年營業及非營業收入合計在新臺幣 3,000 萬元以下的營利事業。", "申報純益率只能由低調高，不能由高調低。", "若實際獲利低於標準或虧損，仍可能需依標準繳稅。"]],
    ["查帳審核", "國稅局調閱企業帳簿、憑證與申報書表，以實際資料核定應納稅額。", ["優點：依自結報表的實際所得繳稅。", "帳冊、憑證與記載方式必須完整且經得起查核。", "帳務要求提高，記帳費用也可能相對增加。"]],
    ["會計師簽證申報", "企業帳冊先由會計師依稅法與審計準則查核簽證，再向國稅局申報，可協助避免因不熟悉法令而漏稅或多繳稅款。", ["交際費限額提高。", "符合條件者，前 10 年虧損可與本年度所得互抵。", "降低國稅局直接調帳查核的機率。"]],
  ];
  return (
    <>
      <PageIntro eyebrow="TAX STRATEGY" title={english ? "Tax Planning" : "稅務規劃"}><p>{english ? "Each filing method has different conditions, costs and risks. Yiita helps your business choose an accounting and filing approach that reflects its actual operations." : "不同申報方式有不同的條件、成本與風險。乙達協助企業依實際營運情況選擇適合的帳務與申報規劃。"}</p></PageIntro>
      <section className="articleGrid">
        {articles.map(([title, copy, bullets], index) => <article key={String(title)}><span>{String(index + 1).padStart(2, "0")}</span><h2>{String(title)}</h2><p>{String(copy)}</p><ul>{(bullets as string[]).map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></article>)}
      </section>
      <Cta english={english} />
    </>
  );
}

function Gpts({ english = false }: { english?: boolean }) {
  return (
    <>
      <PageIntro eyebrow="AI × ACCOUNTING" title={english ? "GPTs Q&A" : "GPTs 問與答"}><p>{english ? "At Yiita Accounting & Bookkeeping Service, we integrate GPT technology into our accounting consultation services to help you understand common questions about accounting, taxation and company registration. For advice that depends on your specific circumstances, please contact our professional team." : "乙達將最新 GPT 技術融入會計諮詢，讓您更快速理解常見的會計、稅務與公司登記問題。涉及個案判斷時，仍建議直接聯繫專業團隊。"}</p></PageIntro>
      <section className="gptCard"><div className="gptMark">Y</div><div><span className="eyebrow">CUSTOM GPT</span><h2>{english ? "Taiwan Accounting Assistant" : "台灣會計小幫手"}</h2><h3>{english ? "Efficient, reliable accounting guidance" : "Taiwan Accounting Assistant"}</h3><p>{english ? "Get clear answers to common Taiwan accounting and tax questions, then contact Yiita whenever your situation requires professional review." : "輕鬆獲得可靠的會計問與答，助你在財務管理上更加得心應手。"}</p><a className="button solid" href="https://chat.openai.com/g/g-u1HB3T24K" target="_blank" rel="noreferrer">{english ? "Open Taiwan Accounting Assistant ↗" : "開啟台灣會計小幫手 ↗"}</a></div></section>
      <Cta english={english} />
    </>
  );
}

function Contact({ english = false }: { english?: boolean }) {
  return (
    <>
      <PageIntro eyebrow="LET'S TALK" title={english ? "Contact Yiita" : "聯絡乙達"}><p>{english ? "We look forward to hearing your needs and providing professional bookkeeping, accounting and tax services for your business." : "我們期待聆聽您的需求，為中小企業提供專業的記帳服務。無論您有任何財務、會計或稅務問題，乙達團隊都將竭誠協助。"}</p></PageIntro>
      <section className="contactLayout"><div className="contactDetails"><h2>{english ? "Other Contact Methods" : "其他聯繫方式"}</h2><dl><div><dt>{english ? "Phone" : "電話"}</dt><dd><a href="tel:+886282214008">02-8221-4008</a></dd></div><div><dt>{english ? "Address" : "地址"}</dt><dd>{english ? "No. 22-2, Lane 30, Xinsheng Street, Zhonghe District, New Taipei City 235" : "235 新北市中和區新生街 30 巷 22-2 號"}</dd></div><div><dt>Email</dt><dd><a href="mailto:info@yiita.com">info@yiita.com</a></dd></div></dl><div className="qrGrid"><a href="https://line.me/ti/p/CE4oZqQlch" target="_blank" rel="noreferrer"><img src={sitePath("/images/line-qr.avif")} alt="Yiita LINE QR code" /><b>LINE</b></a><a href="https://wa.me/message/YOP4EOVNXQJAC1" target="_blank" rel="noreferrer"><img src={sitePath("/images/whatsapp-qr.avif")} alt="Yiita WhatsApp QR code" /><b>WhatsApp</b></a></div></div><ContactForm english={english} /></section>
    </>
  );
}

function Pricing() {
  return <><PageIntro eyebrow="PRICING" title="服務收費"><p>每家企業的交易量、營業項目與申報需求不同。乙達會在了解您的實際情況後，提供清楚且合適的報價。</p></PageIntro><Cta /></>;
}

function Cta({ english = false }: { english?: boolean }) {
  return <section className="cta"><div><span className="eyebrow">YIITA</span><h2>{english ? "Ready to set up or simplify your accounting?" : "準備好開始設立公司，或讓記帳更輕鬆嗎？"}</h2></div><a className="button light" href={sitePath(english ? "/en/contact-us" : "/contact-us")}>{english ? "Contact Yiita" : "聯絡乙達"}</a></section>;
}

function NotFound({ english }: { english: boolean }) {
  return <section className="notFound"><span>404</span><h1>{english ? "Page not found" : "找不到這個頁面"}</h1><a className="button solid" href={sitePath(english ? "/en" : "/")}>{english ? "Back home" : "回到首頁"}</a></section>;
}

export function Site({ path }: { path: string }) {
  const english = path === "/en" || path.startsWith("/en/");
  const route = english ? path.replace(/^\/en/, "") || "/" : path;

  useEffect(() => {
    document.documentElement.lang = english ? "en" : "zh-Hant";
  }, [english]);

  let page: ReactNode;
  switch (route) {
    case "/": page = <Home english={english} />; break;
    case "/services": page = <Services english={english} />; break;
    case "/registeration-services": page = <Registration english={english} />; break;
    case "/company-register-docs": page = <CompanyDocuments english={english} />; break;
    case "/business-types": page = <BusinessTypes english={english} />; break;
    case "/registeration-process": page = english ? <RegistrationProcess /> : <NotFound english={false} />; break;
    case "/foreign-invest-comparison": page = <ForeignComparison english={english} />; break;
    case "/startup-register": page = <Startup english={english} />; break;
    case "/foreign-register-process": page = <ForeignProcess english={english} />; break;
    case "/tax-planning": page = <TaxPlanning english={english} />; break;
    case "/accounting-gpts": page = <Gpts english={english} />; break;
    case "/contact-us": page = <Contact english={english} />; break;
    case "/pricing": page = <Pricing />; break;
    default: page = <NotFound english={english} />;
  }

  return <div className="siteShell"><Header path={path} english={english} /><main>{page}</main><Footer english={english} /><a className="floatingContact" href={sitePath(english ? "/en/contact-us" : "/contact-us")}>{english ? "Talk to Yiita" : "立即展開交談"}</a></div>;
}
