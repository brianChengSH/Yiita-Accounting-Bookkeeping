"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import {
  branchApplicationProcess,
  businessTypeRows,
  companyApplicationProcess,
  companyDocumentRows,
  establishmentSteps,
  foreignBranchRows,
  foreignCompanyRows,
  foreignCurrencySteps,
  foreignSetupStepsEn,
  foreignSetupStepsZh,
  gptFaqEn,
  gptFaqZh,
  limitedCompanySteps,
  officeApplicationProcess,
  registrationGroupsEn,
  registrationGroupsZh,
  startupSteps,
  taxPlanningEn,
  taxPlanningZh,
  type ArticleSection,
  type ContentGroup,
  type DetailedStep,
} from "./original-content";

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

function Header({ path, english }: { path: string; english: boolean }) {
  const [open, setOpen] = useState(false);
  const chineseOnlyRoutes = ["/關於", "/副本-people", "/service-schedule", "/careers", "/news", "/pricing"];
  const languageHref = english
    ? path.replace(/^\/en(?=\/|$)/, "") || "/"
    : path === "/"
      ? "/en"
      : chineseOnlyRoutes.includes(path) ? "/en" : `/en${path}`;
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
  function renderCell(cell: string) {
    if (cell === "名稱預查輔助查詢") {
      return <a className="textLink" href="https://serv.gcis.nat.gov.tw/pub/cmpy/nameSearchListAction.do" target="_blank" rel="noreferrer">{cell} ↗</a>;
    }
    if (cell === "營業項目輔助查詢") {
      return <a className="textLink" href="https://gcis.nat.gov.tw/cod/searchAction.do?method=search" target="_blank" rel="noreferrer">{cell} ↗</a>;
    }
    return cell;
  }

  return (
    <div className="tableWrap">
      <table>
        <thead><tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{renderCell(cell)}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function ContentGroups({ groups }: { groups: ContentGroup[] }) {
  return (
    <section className="contentGroups">
      {groups.map((group, index) => (
        <article key={group.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h2>{group.title}</h2>
          <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
      ))}
    </section>
  );
}

function DetailedFlow({ steps }: { steps: DetailedStep[] }) {
  return (
    <section className="timeline detailedTimeline">
      {steps.map((step, index) => (
        <article key={`${step.number}-${step.title}-${index}`}>
          <span>{step.number}</span>
          <div><h2>{step.title}</h2>{step.copy && <p>{step.copy}</p>}</div>
        </article>
      ))}
    </section>
  );
}

function ArticleSections({ sections }: { sections: ArticleSection[] }) {
  return (
    <section className="longArticles">
      {sections.map((section, index) => (
        <article key={section.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
          </div>
        </article>
      ))}
    </section>
  );
}

function FaqList({ english }: { english: boolean }) {
  const faq = english ? gptFaqEn : gptFaqZh;
  return (
    <section className="faqSection">
      <h2>{english ? "Top 10 FAQ" : "Top 10 常見問與答"}</h2>
      <div className="faqList">
        {faq.map(([question, answer], index) => (
          <details key={question} open={index === 0}>
            <summary><span>{index + 1} /</span>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Home({ english = false }: { english?: boolean }) {
  return (
    <>
      <section className="hero" style={{ backgroundImage: `url(${sitePath("/images/hero-cloud-gate.avif")})` }} aria-label={english ? "Yiita introduction" : "乙達介紹"}>
        <div className="heroPanel">
          <p className="eyebrow">YIITA ACCOUNTING</p>
          <h1>{english ? "Your Devoted Financial Partner" : "您專業負責的財務夥伴"}</h1>
          {!english && <h2>記帳 會計 報稅 內帳 外帳</h2>}
          <p>{english ? "Regardless of your inquiries pertaining to finance, accounting, or taxation, our expert team is readily available to offer guidance and deliver optimal solutions tailored to your needs." : "無論您有任何關於財務、會計或稅務方面的問題，乙達記帳士事務所將竭誠協助，為您提供最佳解決方案。"}</p>
          <a className="button outline" href={sitePath(english ? "/en/contact-us" : "/contact-us")}>{english ? "Contact Us" : "聯絡乙達"}</a>
        </div>
      </section>

      <section className="serviceCards" aria-label={english ? "Our services" : "主要服務"}>
        {[
          ["/images/service-registration.avif", english ? "Business Registration" : "工商登記", english ? "Handling Company Registration, Business Registration, and More." : "辦理公司登記、行號登記等業務", english ? "/en/registeration-services" : "/registeration-services"],
          ["/images/service-bookkeeping.avif", english ? "Bookkeeping Services." : "記帳服務", english ? "asily Solve Accounting, Taxation, and Other Brain-Teasers." : "輕鬆就能解決記帳、報稅等傷透腦筋的事物", english ? "/en/services" : "/services"],
          ["/images/service-contact.avif", english ? "Request for a quote." : "詢問報價", english ? "Immediate Inquiry to Yiita to Solve Your Current Issues." : "立即詢問乙達，解決您腦中目前的問題", english ? "/en/contact-us" : "/contact-us"],
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
          <h3>{english ? "Customers from 15+ countries (continuously growing)" : "15+ 國家之客戶（持續成長中）"}</h3>
          <p>{english ? "We are an experienced accounting & bookkeeping firm with a rich history of serving small and medium-sized foreign businesses from over 15 different countries. We offer comprehensive accounting and financial services, and our distinctive feature is our fluent English communication capability. We are well-equipped to meet the diverse needs of foreign clients, ensuring the smooth operation of your financial affairs." : "我們是一家擁有豐富外商經驗的會計事務所，為來自超過 15 個國家的外商中小企業提供全面的會計和財務服務。以流利的英文溝通能力為特色，我們能夠滿足外商客戶的多樣需求，確保您的財務運營順利無阻。"}</p>
        </div>
        <img src={sitePath("/images/foreign-business.avif")} alt={english ? "Professional office building" : "超過 15 個國家的外商中小企業服務"} />
      </section>

      <section className="split feature reverse">
        <img src={sitePath("/images/accounting-solutions.avif")} alt={english ? "Accounting professional at work" : "客製化的會計解決方案"} />
        <div className="featureCopy">
          <span className="eyebrow">TAILORED SUPPORT</span>
          <h2>{english ? "Customized Accounting Solutions" : "客製化的會計解決方案"}</h2>
          <h3>{english ? "Meeting Your Financial Needs" : "滿足您的財務需求"}</h3>
          <p>{english ? "We offer customized accounting solutions tailored to your specific requirements, providing you with the best accounting support. If you are interested in our services, please feel free to inquire about a quote, and we will be dedicated to providing you with competitive pricing and exceptional professional service." : "我們提供客製化的會計解決方案，根據您的需求，為您提供最佳的會計支援。如果您對我們的服務感興趣，歡迎詢問報價，我們將竭誠為您提供最具競爭力的價格和卓越的專業服務。"}</p>
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
        <p>{english ? "Entrusting accounting and tax matters to Yiita Accounting & Bookkeeping Service is the most time-efficient, effortless, and cost-effective method, easily resolving the burdensome tasks of bookkeeping and tax filing." : "將會計、稅務等作業，委託乙達記帳士處理是最省時省力省成本的方法，輕鬆解決記帳、報稅等讓人傷透腦筋的事務。"}</p>
      </PageIntro>
      <section className="stepsGrid">
        {serviceSteps.map(([number, text]) => <article className="stepCard" key={number}><span>{number}</span><p>{english ? translateService(number) : text}</p></article>)}
        <article className="stepCard other"><span>{english ? "07" : "其他"}</span><p>{english ? "Contact Yiita Accounting & Booking Service" : "洽詢乙達記帳士事務所"}</p></article>
      </section>
      <Cta english={english} />
    </>
  );
}

function translateService(number: string) {
  return ({
    "01": "Purchase and Ship Latest Invoices",
    "02": "Timely Voucher Organization and Accounting",
    "03": "Monthly VAT Filing Before 15th",
    "04": "Annual Provisional Income Tax Filing in Sep.",
    "05": "Withholding Tax Report Completion in Jan.",
    "06": "Annual Income Tax Filing in May",
  } as Record<string, string>)[number];
}

function Registration({ english = false }: { english?: boolean }) {
  return (
    <>
      <PageIntro eyebrow="BUSINESS REGISTRATION" title={english ? "Business Registration Services" : "登記業務項目"}><p>{english ? "Handling business registration and related tasks requires specialized knowledge of relevant laws and regulations. If even a minor part of the application process is not properly executed, government officials will immediately require resubmission or additional documents, leading to unnecessary time wastage. Therefore, entrusting your business registration and related tasks to Yiita Accounting and Bookkeeping Firm ensures all your registration needs are efficiently met without any hassle." : "辦理工商登記等業務，需具備相關法令等專業知識外，在申辦過程中如有一小部份沒做好，公家機關的人員將會立即退、補件，讓您添加了不必要的時間浪費，所以工商相關登記業務交給乙達記帳士事務所，讓您不費吹飛之力即可辦好所有相關登記。"}</p></PageIntro>
      <ContentGroups groups={english ? registrationGroupsEn : registrationGroupsZh} />
      <Cta english={english} />
    </>
  );
}

function CompanyDocuments({ english = false }: { english?: boolean }) {
  return (
    <>
      <PageIntro eyebrow="DOCUMENT CHECKLIST" title={english ? "Documents required for company establishment" : "公司設立應備文件"}><p>{english ? "In the process of establishing a company, the preparation of documents cannot be taken lightly at all. A single mistake in any step can delay the entire registration process. But don't worry, with the professional assistance of Yiita Accounting & Bookkeeping Service, we will constantly remind you of the necessary documents, ensuring that you don't miss the best opportunity to start your business." : "在公司成立的道路上，文件準備可一點也不馬虎。只要有一個環節出差錯，就像是在等紅綠燈一樣，會延誤整個登記的時間。但別擔心，有了乙達記帳士事務所的專業協助，我們會隨時提醒您所需的文件，確保您不會錯過創業的最佳時機。讓我們一起攜手，讓您的事業高飛不止，事業蒸蒸日上！我們是一間專業的記帳士事務所，專門為中小企業提供公司成立、記賬報稅等服務。無論您是新創公司還是已經經營的企業，我們都能夠提供豐富的經驗和專業知識，幫助您順利處理各項財務事務。讓我們成為您的財務夥伴，一起寫下成功的故事！"}</p></PageIntro>
      <section className="contentSection"><h2>應備文件</h2><DataTable headers={["文件名稱", "公司", "行號", "備註"]} rows={companyDocumentRows} /><p className="callout">全部預估所需時間：公司 20 工作天 、行號 12 工作天</p></section>
      <Cta english={english} />
    </>
  );
}

function BusinessTypes({ english = false }: { english?: boolean }) {
  return (
    <>
      <PageIntro eyebrow="CHOOSE YOUR STRUCTURE" title={english ? "Differences Between Company and Sole Proprietorship" : "公司與行號差異"}><p>{english ? "Before establishing a company, entrepreneurs must first decide on the type of business entity to adopt (sole proprietorship or company). Both companies and sole proprietorships are considered \"business entities,\" but they differ in legal requirements, capital requirements, and other aspects. Therefore, it is essential to have a correct understanding of these differences to establish a solid foundation for registration and application, ensuring a smooth start to the entrepreneurial journey." : "在踏上創業之路之前，決定公司的形式（行號或公司）是必要的一步。雖然這兩者統稱為「商業」，但在法律規定和資本額等方面存在著不同之處。因此，在正式啟動登記申請之前，必須充分了解這些差異，這樣您的創業之旅才能風和日麗，一帆風順。讓我們協助您了解並選擇最適合您業務需求的公司形式，確保您的創業之路順風順水！無論是行號還是公司，我們都有豐富的經驗，可以為您提供專業的指導和支持。讓我們一起開啟成功的創業之旅！"}</p></PageIntro>
      <section className="contentSection wide"><DataTable headers={["比較項目", "行號", "有限公司", "股份有限公司"]} rows={businessTypeRows} /></section>
      <Cta english={english} />
    </>
  );
}

function ForeignComparison({ english = false }: { english?: boolean }) {
  return (
    <>
      <PageIntro eyebrow="FOREIGN INVESTMENT" title={english ? "Foreign Investment Comparison" : "外資設立比較"}><p>{english ? "Compare and analyze various investment options for overseas Chinese and foreign investors, including Mainland Chinese investors. Explore different choices for establishing a business entity in Taiwan, such as company incorporation and sole proprietorship, and gain insights into relevant regulations, capital requirements, and best practices. Contact Yiita Accounting & Bookkeeping Service to receive assistance" : "華僑和外國投資者（包括陸資）的各種投資方式進行比較和分析。探索外資設立台灣企業的不同選項，包括公司成立、行號設立等，並了解相關法規、資本要求以及最佳實踐。聯絡乙達記帳士事務所，讓我們協助您做出明智的商業決策，開創成功的企業之路。"}</p></PageIntro>
      <section className="contentSection wide">
        <h2>{english ? "Limited company and company limited by shares" : "有限公司與股份有限公司"}</h2>
        <DataTable headers={["比較項目", "有限公司", "股份有限公司"]} rows={foreignCompanyRows} />
        <p className="processLine"><b>(股份)有限公司申辦流程：</b><br />{companyApplicationProcess}<br /><strong>合計約30個工作天</strong></p>
        <h2>{english ? "Taiwan branch and representative office" : "台灣分公司與辦事處"}</h2>
        <DataTable headers={["比較項目", "台灣分公司", "辦事處"]} rows={foreignBranchRows} />
        <p className="processLine"><b>台灣分公司申辦流程：</b><br />{branchApplicationProcess}<br /><strong>合計約28個工作天</strong></p>
        <p className="processLine"><b>辦事處申辦流程：</b><br />{officeApplicationProcess}<br /><strong>合計約11個工作天</strong></p>
      </section>
      <Cta english={english} />
    </>
  );
}

function Startup({ english = false }: { english?: boolean }) {
  return (
    <>
      <PageIntro eyebrow="START YOUR BUSINESS" title={english ? "Startup Registration" : "新創公司登記"}><p>{english ? "Yiita Accounting & Bookkeeping Service is your reliable partner for a successful startup. We specialize in handling company registration, accounting, taxation, and more for small and medium-sized enterprises, ensuring a smoother journey on your entrepreneurial path. Discover our professional services today and establish a solid foundation for your new startup." : "乙達記帳士事務所是您成功創業的得力夥伴。我們專業處理中小企業的公司設立、記帳、報稅等事務，讓您的創業之路更加順暢。立即了解我們的專業服務，為您的新創公司打下穩固的基礎。"}</p></PageIntro>
      <section className="flowHeading"><span className="eyebrow">PROCESS 01</span><h2>新創公司登記流程</h2></section>
      <DetailedFlow steps={startupSteps} />
      <section className="flowHeading"><span className="eyebrow">PROCESS 02</span><h2>有限公司設立作業流程</h2></section>
      <DetailedFlow steps={limitedCompanySteps} />
      <Cta english={english} />
    </>
  );
}

function RegistrationProcess({ english = false }: { english?: boolean }) {
  return (
    <>
      <PageIntro eyebrow="INCORPORATION" title={english ? "Establishment Process in 6 Steps" : "設立流程 6 步驟"}><p>{english ? "When entrepreneurs apply for business registration, they need to clearly understand the location, required documents, fees, and time for each stage of the process. By mastering the following 6 simple steps, the complicated business registration will be easily resolved. If you still feel confused, do not hesitate to contact Yiita Accounting & Bookkeeping Service, we will assist you wholeheartedly! On the road to entrepreneurship, we are your reliable financial partner." : "創業者在申辦營業登記時，需要明確了解每個階段的辦理地點、所需文件、費用和時間。只要掌握以下 6 個簡單步驟，繁瑣的營業登記將輕鬆解決。如果您仍感困惑，別猶豫，歡迎聯絡乙達記帳士事務所，我們將竭誠協助您！在創業的道路上，我們是您可靠的財務夥伴。"}</p></PageIntro>
      <DetailedFlow steps={establishmentSteps} />
      <Cta english={english} />
    </>
  );
}

function ForeignProcess({ english = false }: { english?: boolean }) {
  return (
    <>
      <PageIntro eyebrow="FOREIGN COMPANY SETUP" title={english ? "Foreign Investment in Establishing a Company in Taiwan" : "外資來台設立公司流程"}><p>{english ? "Want to know the complete process of foreign investment in establishing a company in Taiwan? Don't worry, we provide a comprehensive guide to the foreign company establishment process, including required documents, application steps, timelines, and costs. Let us assist you in achieving your business goals in Taiwan seamlessly." : "想知道外資來台設立公司的完整流程嗎？不用擔心，我們提供詳盡的外資設立公司流程指南，包括所需文件、申辦步驟、時間與費用等資訊。讓我們協助您順利實現在台灣的業務目標。"}</p></PageIntro>
      <section className="flowHeading"><span className="eyebrow">PROCESS 01</span><h2>{english ? "Process for Foreign Investment and Foreigners Starting a Company in Taiwan" : "外資來台設立、外國人開公司流程"}</h2></section>
      <DetailedFlow steps={english ? foreignSetupStepsEn : foreignSetupStepsZh} />
      <section className="flowHeading"><span className="eyebrow">PROCESS 02</span><h2>{english ? "Application Process (Foreign Currency Investment)" : "申請流程(外幣投資)"}</h2></section>
      <DetailedFlow steps={foreignCurrencySteps} />
      <Cta english={english} />
    </>
  );
}

function TaxPlanning({ english = false }: { english?: boolean }) {
  return (
    <>
      <PageIntro eyebrow="TAX STRATEGY" title={english ? "Tax Planning" : "稅務規劃"} />
      <ArticleSections sections={english ? taxPlanningEn : taxPlanningZh} />
      <Cta english={english} />
    </>
  );
}

function Gpts({ english = false }: { english?: boolean }) {
  return (
    <>
      <PageIntro eyebrow="AI × ACCOUNTING" title={english ? "GPTs Q&A" : "GPTs 問與答"}><p>{english ? "At Yiita Accounting & Bookkeeping Service, we innovatively integrate the latest GPT technology to enhance our accounting consultation services. Not only do we offer common Q&A, but our system can also instantly respond to your doubts about complex issues in accounting and taxation. Through this advanced technology, you can easily obtain customized, precise professional advice. If you encounter any access difficulties, please contact our professional team immediately, and Yiita Accounting & Bookkeeping Service will provide you with more in-depth, personalized assistance!" : "在乙達記帳士事務所，我們創新地融合了最新的GPT技術來提升會計諮詢服務。不僅提供常見的問答，我們的系統更能即時回應您對會計、稅務等複雜問題的疑惑。透過這項先進技術，您可以輕鬆獲得定制化、精準的專業建議。若遇到任何存取困難，請即刻聯繫我們的專業團隊，乙達記帳士事務所將為您提供更深入、個人化的協助！"}</p></PageIntro>
      <section className="gptServices">
        <a className="gptCard" href="https://chat.openai.com/g/g-u1HB3T24K" target="_blank" rel="noreferrer"><div className="gptMark">Y</div><div><span className="eyebrow">CUSTOM GPT</span><h2>{english ? "GPTs - Taiwan Accounting Assistant" : "台灣會計小幫手 (Taiwan Accounting Assistant)"}</h2><h3>{english ? "Efficient, reliable accounting advice" : "輕鬆獲得可靠的會計問與答，助你在財務管理上更加得心應手"}</h3><p>{english ? "(Only available for ChatGPT Plus and Enterprise users)" : "Efficient, reliable accounting advice"}</p></div></a>
        <a className="gptCard" href={sitePath(english ? "/en/contact-us" : "/contact-us")}><div className="gptMark">Y</div><div><span className="eyebrow">YIITA TEAM</span><h2>{english ? "Contact Yiita Accounting & Bookkeeping Service" : "乙達記帳士事務所 專人"}</h2><h3>{english ? "Through specialists who are warmer and more professional than AI, we immediately activate and assist with your business." : "透過比 AI 更具溫度及專業的專人，立即啟動及協助您的事業"}</h3></div></a>
      </section>
      <FaqList english={english} />
      <Cta english={english} />
    </>
  );
}

function Contact({ english = false }: { english?: boolean }) {
  return (
    <>
      <PageIntro eyebrow="LET'S TALK" title={english ? "Contact Yiita" : "聯絡乙達"}><p>{english ? "Contact Us - We look forward to hearing your needs and providing professional internal bookkeeping services for your small and medium-sized enterprise. If you have any questions about finance, accounting, or taxation, our team is dedicated to assisting you and offering the best solutions. Please fill out the form below or contact us to start our collaboration, helping you achieve financial success and business growth." : "聯繫我們 - 我們期待聆聽您的需求，並為您的中小企業提供專業的內部記帳服務。無論您有任何關於財務、會計或稅務方面的問題，我們的團隊將竭誠協助，為您提供最佳解決方案。請填寫下面的表格或聯絡我們，讓我們開始合作，協助您實現財務成功和業務增長。"}</p></PageIntro>
      <section className="contactLayout"><div className="contactDetails"><h2>{english ? "Other Contact Methods" : "其他聯繫方式"}</h2><dl><div><dt>{english ? "Phone" : "電話"}</dt><dd><a href="tel:+886282214008">02-8221-4008</a></dd></div><div><dt>{english ? "Address" : "地址"}</dt><dd>{english ? "No. 22-2, Lane 30, Xinsheng Street, Zhonghe District, New Taipei City 235" : "235 新北市中和區新生街 30 巷 22-2 號"}</dd></div><div><dt>Email</dt><dd><a href="mailto:info@yiita.com">info@yiita.com</a></dd></div></dl><div className="qrGrid"><a href="https://line.me/ti/p/CE4oZqQlch" target="_blank" rel="noreferrer"><img src={sitePath("/images/line-qr.avif")} alt="Yiita LINE QR code" /><b>LINE</b></a><a href="https://wa.me/message/YOP4EOVNXQJAC1" target="_blank" rel="noreferrer"><img src={sitePath("/images/whatsapp-qr.avif")} alt="Yiita WhatsApp QR code" /><b>WhatsApp</b></a></div></div><ContactForm english={english} /></section>
    </>
  );
}

function Pricing() {
  return <PageIntro eyebrow="PRICING" title="服務收費" />;
}

function ServiceSchedule() {
  return <PageIntro eyebrow="SCHEDULE" title="服務時程" />;
}

function PeoplePage() {
  return (
    <>
      <PageIntro eyebrow="PEOPLE" title="People"><p>I&apos;m a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you.</p></PageIntro>
      <section className="peopleGrid"><article><img src={sitePath("/images/original-partner.jpg")} alt="Partner" /><h2>Partners</h2></article><article><img src={sitePath("/images/original-associate.jpg")} alt="Associate" /><h2>Associates</h2></article></section>
    </>
  );
}

function Careers() {
  const sections = [
    ["Associates", "I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you."],
    ["Law Students / Summer Interns", "I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. I’m a great place for you to tell a story and let your users know a little more about you. Feel free to drag and drop me anywhere you like on your page."],
    ["Paralegals / Staff", "I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to tell a story and let your users know a little more about you. I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font."],
  ];
  return (
    <>
      <PageIntro eyebrow="CAREERS" title="Careers"><p>Your Legal Career Starts Here</p><p>I&apos;m a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. I’m a great place for you to tell a story and let your users know a little more about you.</p></PageIntro>
      <img className="careerHero" src={sitePath("/images/original-careers.jpg")} alt="Careers" />
      <section className="careerGrid">{sections.map(([title, copy]) => <article key={title}><h2>{title}</h2><p>{copy}</p><a className="textLink" href="http://www.wix.com/templateslp/links" target="_blank" rel="noreferrer">LEARN MORE &gt;&gt;</a></article>)}</section>
    </>
  );
}

function News() {
  return <><PageIntro eyebrow="K&R BLOG" title="News & Articles" /><section className="emptyState"><span>All Posts</span><h2>此語言尚未有已發佈之文章</h2><p>文章發佈後將於此處顯示。</p></section></>;
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
    case "/registeration-process": page = <RegistrationProcess english={english} />; break;
    case "/foreign-invest-comparison": page = <ForeignComparison english={english} />; break;
    case "/startup-register": page = <Startup english={english} />; break;
    case "/foreign-register-process": page = <ForeignProcess english={english} />; break;
    case "/tax-planning": page = <TaxPlanning english={english} />; break;
    case "/accounting-gpts": page = <Gpts english={english} />; break;
    case "/contact-us": page = <Contact english={english} />; break;
    case "/pricing": page = english ? <NotFound english /> : <Pricing />; break;
    case "/service-schedule": page = english ? <NotFound english /> : <ServiceSchedule />; break;
    case "/關於": page = english ? <NotFound english /> : <PeoplePage />; break;
    case "/副本-people": page = english ? <NotFound english /> : <PeoplePage />; break;
    case "/careers": page = english ? <NotFound english /> : <Careers />; break;
    case "/news": page = english ? <NotFound english /> : <News />; break;
    default: page = <NotFound english={english} />;
  }

  return <div className="siteShell"><Header path={path} english={english} /><main>{page}</main><Footer english={english} /><a className="floatingContact" href={sitePath(english ? "/en/contact-us" : "/contact-us")}>{english ? "Talk to Yiita" : "立即展開交談"}</a></div>;
}
