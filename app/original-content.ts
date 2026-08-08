export type ContentGroup = {
  title: string;
  items: string[];
};

export type DetailedStep = {
  number: string;
  title: string;
  copy?: string;
};

export type ArticleSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export const registrationGroupsZh: ContentGroup[] = [
  {
    title: "設立登記",
    items: ["行號登記設立", "有限公司登記設立", "股份有限公司登記設立", "分公司登記設立"],
  },
  {
    title: "特許登記",
    items: ["菸類輸入業", "酒類輸入業", "室內裝修業", "短期補習班業", "公益彩券代理業", "運動彩券代理業", "休閒農業", "冷凍空調工程業", "特定寵物服務業", "其他更多查詢..."],
  },
  {
    title: "變更登記",
    items: ["負責人變更", "股權變更", "公司名稱變更", "營業項目變更", "營業地址變更", "增加資本變更", "減少資本變更", "其他變更"],
  },
  {
    title: "其他項目",
    items: ["公司解散登記", "進出口廠商登記", "勞健保投保單位成立", "更多..."],
  },
];

export const registrationGroupsEn: ContentGroup[] = [
  {
    title: "Establishment Registration",
    items: ["Sole Proprietorship Registration and Establishment", "Limited Liability Company Registration and Establishment", "Corporation Registration and Establishment", "Branch Office Registration and Establishment"],
  },
  {
    title: "Franchise registration",
    items: ["Tobacco Import Business", "Alcohol Import Business", "Interior Decoration Business", "Short-term Tutoring Services", "Public Welfare Lottery Agency", "Sports Lottery Agency", "Leisure Agriculture", "Refrigeration and Air Conditioning Engineering", "Specific Pet Services", "For more inquiries..."],
  },
  {
    title: "Change of Registration",
    items: ["Change of Responsible Person", "Change of Shareholding", "Change of Company Name", "Change of Business Scope", "Change of Business Address", "Increase in Capital", "Reduction in Capital", "Other Amendments"],
  },
  {
    title: "Other Items",
    items: ["Company Dissolution Registration", "Import and Export Trader Registration", "Establishment of Labor and Health Insurance Coverage Unit"],
  },
];

export const companyDocumentRows = [
  ["1. 預查名稱 (2-3個)", "✓", "✓", "名稱預查輔助查詢"],
  ["2. 營業項目", "✓", "✓", "營業項目輔助查詢"],
  ["3. 負責人身份證影本", "✓", "✓", ""],
  ["4. 各股東身份證影本", "✓", "✓", ""],
  ["5. 公司名租賃契約影本或所有權人同意書影本2份", "✓", "✓", ""],
  ["6. 房屋稅單影本 或 建物所有權狀影本", "✓", "✓", ""],
  ["7. 會計師資本簽證應提供文件", "✓", "", ""],
  ["8. 存摺影本(封面影本、蓋章頁影本、金額頁影本)", "✓", "", ""],
  ["9. 存款餘額證明影本(證明至簽證日)", "✓", "", ""],
];

export const businessTypeRows = [
  ["公司名稱規定", "xx商店、xx小吃店\nxx商行、xx企業社\n(本縣市內不得重複)", "xx有限公司\nxx企業有限公司\n(全國不得重複)", "xx股份有限公司\nxx企業股份有限公司\n(全國不得重複)"],
  ["資本額", "不限\n※特殊行業有限制", "不限(建議不要低於10萬)\n※特殊行業有限制", "不限(建議不要低於10萬)\n※特殊行業有限制"],
  ["資金證明 / 資本額簽證", "小於25萬不要證明\n大於等於25萬需提供資金證明", "需會計師資本額簽證", "需會計師資本額簽證"],
  ["股東人數", "獨資1人\n合夥2人以上", "1人以上", "2人以上\n(但要有三個董事一個監察人)"],
  ["股東年齡 成年(滿18歲)", "成年", "董事(成年)\n負責人(成年)\n其餘(可未成年)", "董監事全部(成年)\n負責人(成年)\n股東 (可未成年)"],
  ["股權轉讓", "未限制\n獨資可變更為合夥\n合夥不得變更為獨資", "有限制\n股東過半數同意\n董事經股東表決權2/3以上同意", "未限制\n股東股權可自由轉讓"],
  ["設立文件及內容", "合夥契約書正本", "股東同意書正本\n1人任董事並為負責人", "開股東會、董事會\n董事長1人、董事2人以上、監察人1人以上"],
  ["股東責任", "無限清償責任", "以出資額為限", "以出資額為限"],
  ["負責人限制出境金額", "欠稅200萬元以上", "欠稅200萬元以上", "欠稅200萬元以上"],
  ["證明文件 營登已廢除", "商業登記核准函", "公司登記核准函", "公司登記核准函"],
  ["進出口登記", "經營進出口業務要辦理", "經營進出口業務要辦理", "經營進出口業務要辦理"],
  ["證明文件 營登已廢除", "商業登記核准函", "公司登記核准函", "公司登記核准函"],
  ["綜合所得稅 (股東)", "當年度盈餘直接併入\n資本主或合夥人綜合所得", "分配年度\n增加股東綜合所得", "分配年度\n增加股東綜合所得"],
  ["發票使用", "原則:要使用發票\n例外:小規模營業人可申請免用統一發票", "一定要使用發票", "一定要使用發票"],
  ["所得稅暫繳", "", "每年9月底前，依上年度已納稅額50%繳納", "每年9月底前，依上年度已納稅額50%繳納"],
  ["扣繳申報", "負扣繳義務", "負扣繳義務", "負扣繳義務"],
  ["營業稅稅率", "5%", "5%", "5%"],
  ["營利事業所得稅率", "20%", "20%", "20%"],
  ["盈餘分配", "當年盈餘要全部分配", "盈餘要分配，於次年6/30前決定分配金額\n未分配之盈餘需加徵10%", "盈餘要分配，於次年6/30前決定分配金額\n未分配之盈餘需加徵10%"],
  ["股東責任", "無限清償責任", "以出資額為限", "以出資額為限"],
];

export const foreignCompanyRows = [
  ["股東身份", "外國法人、自然人", "外國法人、自然人"],
  ["營業資格", "✓", "✓"],
  ["進出口資格", "✓", "✓"],
  ["法人資格", "✓", "✓"],
  ["股東人數", "自然人 1+\n法人 1+", "自然人 2+\n法人 1+"],
  ["人員", "董事 x 1\n投資登記代理人 x 1", "董事 x 3\n監察人 x 1\n投資登記代理人 x 1"],
  ["地址", "需符合商業規定", "需符合商業規定"],
  ["最低資本額", "無\n(50萬才可聘外籍經理人)", "無\n(50萬才可聘外籍經理人)"],
  ["公開發行股票", "⛌", "✓"],
  ["證券投資開戶", "✓", "✓"],
  ["申請外國人工作證", "經理、技術人員", "經理、技術人員"],
  ["統一發票", "✓", "✓"],
  ["營業稅稅率", "5%", "5%"],
  ["所得稅稅率", "17%", "17%"],
  ["非居住者(小於183天)盈餘分配扣繳稅率", "20%", "20%"],
  ["盈餘不分配加徵稅率", "10%", "10%"],
  ["設立時需認證的文件", "1.母公司執照\n2.投資代理人授權書", "1.母公司執照\n2.投資代理人授權書"],
  ["發展及限制", "不可以公開發行股票，需先改制為股份有限公司。\n可在台灣設立自屬的分公司。", "可以公開發行股票及上市上櫃。\n可在台灣設立自屬的分公司。"],
];

export const foreignBranchRows = [
  ["股東身份", "總公司為外國公司", "總公司為外國公司"],
  ["營業資格", "✓", "⛌"],
  ["出進口資格", "✓", "⛌"],
  ["法人資格", "⛌", "⛌"],
  ["股東人數", "⛌", "⛌"],
  ["人員", "代表人 x 1\n經理人 x 1", "代表人 x 1"],
  ["地址", "要符合商業規定的地址", "一般地址都可登記"],
  ["最低資本額", "無\n(外幣投資需確實從境外匯入台灣)", "無"],
  ["公開發行股票", "⛌", "⛌"],
  ["證券投資開戶", "⛌", "⛌"],
  ["申請外國人工作證", "經理、技術人員", "代表人"],
  ["統一發票", "有", "⛌"],
  ["營業稅稅率", "5%", "⛌"],
  ["所得稅稅率", "17%", "⛌"],
  ["非居住者(小於183天)盈餘分配扣繳稅率", "盈餘匯回不需扣繳", "⛌"],
  ["盈餘不分配加徵稅率", "不需加徵", "⛌"],
  ["設立時需認證的文件", "1.總公司執照\n2.總公司章程\n3.總公司董事會議事錄\n4.分公司代表人授權書\n5.分公司經理授權書", "1.總公司執照\n2.辦事處代表人授權書"],
];

export const companyApplicationProcess = "母公司執照，授權書認證 5天 ➡ 公司名稱審查 1天 ➡ 投資審查 5天 ➡ 銀行開戶(負責人親辦) 1天 ➡ 匯入股款 3天 ➡ 資金審查 5天 ➡ 地址簽約 0天 ➡ 公司登記 4天 ➡ 營業登記 5天 ➡ 負責人簽名(負責人親辦) 1天";
export const branchApplicationProcess = "母公司執照等文件認證 5天 ➡ 公司名稱審查 2天 ➡ 地址簽約 0天 ➡ 銀行開戶(代表人親辦) 1天 ➡ 公司登記 4天 ➡ 匯入營運資金 5天 ➡ 資金審查 5天 ➡ 營業登記 5天 ➡ 代表人簽名(代表人親辦) 1天";
export const officeApplicationProcess = "母公司執照，授權書認證 5天 ➡ 辦事處設立註冊 5天 ➡ 稅籍註冊 1天";

export const establishmentSteps: DetailedStep[] = [
  { number: "01", title: "公司行號比一比" },
  { number: "02", title: "為你的公司行號命名" },
  { number: "03", title: "正式登記公司行號" },
  { number: "04", title: "申請稅籍登記" },
  { number: "05", title: "雇用員工勞健保" },
  { number: "06", title: "聯繫乙達記帳士事務所" },
];

export const startupSteps: DetailedStep[] = [
  { number: "01", title: "諮詢乙達記帳士事務所", copy: "我們將竭誠為您服務" },
  { number: "02", title: "委託乙達申辦公司登記", copy: "諮詢服務費：為設立費用一半，公司設立完成將全數折抵設立費用。" },
  { number: "03", title: "進行公司設立登記", copy: "委託應備文件、乙達代辦內容" },
  { number: "04", title: "經濟部完成登記", copy: "取得統一編號，並支付尾款（折抵諮詢服務費後餘額），確認匯款後進行 5.1 和 5.a 流程。" },
  { number: "5.1", title: "申辦營業登記 (各地國稅局)" },
  { number: "5.a", title: "申辦出進口登記 (經濟部國貿局)" },
  { number: "5.2", title: "收到國稅局核准公文，負責人請至國稅局簽名" },
  { number: "5.b", title: "申辦出進口登記 (經濟部國貿局)" },
  { number: "5.3", title: "辦理購票證", copy: "委託記帳，乙達陪同並代購統一發票" },
  { number: "5.4", title: "公司登記完成，正式營業。" },
  { number: "06", title: "委託記帳", copy: "申報各期營業稅：1、3、5、7、9、11 月的 15 日前申報前 2 個月營業稅。設帳記錄用以申報年度營利事業所得稅。" },
  { number: "07", title: "委託會計師稅務簽證", copy: "年度稅務規劃" },
];

export const limitedCompanySteps: DetailedStep[] = [
  { number: "01", title: "名稱預查送件", copy: "委託人請準備：公司預定名稱 2-3 個、營業項目 2-10 項、負責人身分證影本。名稱預查輔助、營業項目查詢。" },
  { number: "02", title: "選定銀行開公司籌備戶", copy: "名稱預查核定書、私章（預定負責人）" },
  { number: "03", title: "繳足資本總額", copy: "股東匯錢進公司帳戶、會計師資本額查核報告" },
  { number: "04", title: "召開股東會議", copy: "訂立章程、選任董監事、董事願任同意書（簽名）、股東同意書（簽名）、會計師資本額查核簽證委託書（簽名）" },
  { number: "05", title: "確定公司登記地址", copy: "租賃契約、所有權人同意書、房屋稅單" },
];

export const foreignSetupStepsZh: DetailedStep[] = [
  { number: "01", title: "諮詢乙達記帳士事務所", copy: "我們將竭誠為您服務" },
  { number: "02", title: "委託乙達申辦公司登記，簽訂委託書並支付諮詢服務費。", copy: "諮詢服務費：為設立費用一半，公司設立完成將全數折抵設立費用。" },
  { number: "03", title: "進行外資來台公司設立", copy: "參考下方申請流程（外幣投資）。委託應備文件、乙達代辦內容。" },
  { number: "04", title: "經濟部完成登記", copy: "取得統一編號，並支付尾款（折抵諮詢服務費後餘額），確認匯款後進行 5.1 和 5.a 流程。可至銀行變更正式戶名：公司登記核准文件（正本）、公司章程（部份銀行要求提供）、銀行用大小章。" },
  { number: "5.1", title: "申辦營業登記 (各地國稅局)" },
  { number: "5.a", title: "申辦出進口登記 (經濟部國貿局)" },
  { number: "5.2", title: "收到國稅局核准公文，負責人請至國稅局簽名" },
  { number: "5.b", title: "申辦出進口登記 (經濟部國貿局)" },
  { number: "5.3", title: "辦理購票證", copy: "委託記帳，乙達陪同並代購統一發票" },
  { number: "5.4", title: "公司登記完成，正式營業。" },
  { number: "06", title: "委託記帳", copy: "申報各期營業稅：1、3、5、7、9、11 月的 15 日前申報前 2 個月營業稅。設帳記錄用以申報年度營利事業所得稅。" },
  { number: "07", title: "委託會計師稅務簽證", copy: "年度稅務規劃" },
];

export const foreignSetupStepsEn: DetailedStep[] = [
  { number: "01", title: "Consult with Yiita Accounting & Bookkeeping", copy: "We are dedicated to serving you with utmost commitment." },
  { number: "02", title: "Delegate Yiita for company registration", copy: "Consultation Service Fee: Half of the establishment fee, which will be fully credited against the establishment cost upon completion of the company setup." },
  { number: "03", title: "Establishing a Foreign-Invested Company in Taiwan", copy: "Refer to the Application Process Below (Foreign Currency Investment). Documents to Prepare, Services Handled by Yiita." },
  { number: "04", title: "Completion of Registration with the Ministry of Economic Affairs", copy: "Obtain the Unified Business Number and pay the final payment (after deducting consultation fees). Proceed with steps 5.1 and 5.a after confirming the payment." },
  { number: "5.1", title: "Apply for Business Registration (Local National Taxation Bureaus)" },
  { number: "5.a", title: "Apply for Import and Export Registration (Bureau of Foreign Trade, Ministry of Economic Affairs)" },
  { number: "5.2", title: "Get approval from the National Taxation Bureau; responsible person signs." },
  { number: "5.b", title: "Apply for Import and Export Registration (Bureau of Foreign Trade, Ministry of Economic Affairs)" },
  { number: "5.3", title: "Handle the Purchase of Invoice Certificates", copy: "Entrust bookkeeping services, with Yiita accompanying and procuring Uniform Invoices on behalf." },
  { number: "5.4", title: "Company registration is completed, officially commencing business operations." },
  { number: "06", title: "Entrust Bookkeeping", copy: "File bi-monthly business tax: Report the business tax for the previous two months before the 15th day of January, March, May, July, September, and November." },
  { number: "07", title: "Entrust an Accountant for Tax Certification" },
];

export const foreignCurrencySteps: DetailedStep[] = [
  { number: "01", title: "名稱預查送件", copy: "委託人請準備：公司預定名稱 2-3 個、營業項目 2-10 項、負責人身分證影本。名稱預查輔助、營業項目查詢。" },
  { number: "02", title: "投資申請(投審會)", copy: "代理人授權書（公、驗證）、法人資格證明（公、驗證）、外資資格聲明書（簽章）、自然人護照影本" },
  { number: "03", title: "開公司籌備戶(銀行)", copy: "名稱預查核定書、私章（預定負責人）、自然人護照（正本）、外國人統一證號基資表（正本）" },
  { number: "04", title: "匯入股款(銀行)", copy: "外國股東境外匯入公司籌備戶投資金額、國內股東匯入股款" },
  { number: "05", title: "資金審定(投審會)", copy: "投審會核准函、匯人匯款通知書（正本）、結匯水單（正本）、存摺影本" },
  { number: "06", title: "公司登記地址文件", copy: "租賃契約影本、所有權人同意書影本、房屋稅單影本" },
  { number: "06", title: "股東會相關文件", copy: "投審會核准公文影本、訂立章程、選任董監事、董事願任同意書（簽名）、股東同意書（簽名）、會計師資本額查核簽證委託書（簽名）、法人資格證明（公、驗證）、法人代表指派書（簽名）、自然人護照影本、會計師資本額查核報告" },
];

export const taxPlanningZh: ArticleSection[] = [
  {
    title: "書面審核",
    paragraphs: [
      "擴大書審申報制度又被稱為包稅制。簡單來說，選擇採用擴大書審報稅的企業，按照財政部訂定的擴大書審純益率計算營利所得繳納所得稅後，通常即可免除被查帳的困擾。",
      "擴大書審免查帳的好處，雖然吸引不少企業採用，但也不是所有的企業都可以使用擴大書審方式報稅。根據財政部的規定，適用擴大書審企業有幾個條件：",
      "應依規定設置帳簿記載並取得、給與及保存憑證，其帳載結算事項，並自行依法調整。調整後之純益率如高於擴大書審純益率，則應依原本較高之純益率申報繳納稅款，不可調低至擴大書審純益率。也就是說申報的純益率只能由低調高，不能由高調低。",
      "優點：符合書審資格的企業，若是獲利比財政部的標準低，只要願意按政府訂定的純益率計算並繳納所得稅，原則上就不再調帳查稅。",
      "缺點：企業的純益率若比政府訂的標準低或甚至虧損，仍要調整繳稅，也就是繳了不該繳的稅。此時應與會計師討論採取查帳申報的帳務規劃。",
    ],
    bullets: ["全年營業收入淨額及非營業收入合計在新臺幣 3,000 萬元以下之營利事業。", "年度結算申報書表齊全，依法調整純益率在擴大書審純益率以上，並按時繳稅。"],
  },
  {
    title: "查帳審核",
    paragraphs: [
      "所謂查帳審核是指國稅局採調閱營利事業之帳簿文據等有關資料，予以實地查核其申報書表來決定應繳納稅金。",
      "優點：在於自結報表賺多少錢就按此繳稅，不會有像書審申報多繳稅的情形。",
      "缺點：原則上一定是查帳來認定應繳稅金，故帳冊表簿文據的記載方式就必需經得起查，若經不起查就會被核定補繳稅款。",
      "所以此時記帳的費用也會相對提高。若不想國稅局直接來查帳，則可委託會計師簽證申報來降低直接被國稅局查帳的機率。",
    ],
  },
  {
    title: "會計師簽證申報",
    paragraphs: [
      "就是企業的帳冊文據先由會計師來查過，所以國稅局原則上也是書面審核。會計師主要係根據有關稅務法令及一般公認審計準則之規定查核簽證客戶之營利事業所得稅結算申報，及檢查有關交易記錄與會計處理是否符合稅法規定，以核定課稅所得額，並代理申報。",
      "此項稅務簽證查核報告書，可提供給國稅局，並使客戶避免因不瞭解稅法而導致逃漏稅款甚或多繳不該繳的稅；會計師會在法令許可範圍內，提供合理稅負規劃之建議。",
      "稅法特別針對會計師簽證申報訂有下列獎勵：",
    ],
    bullets: ["交際費限額提高：費用列支增加約 3 成，可直接減輕稅負。", "盈虧可互抵：企業前 10 年各期虧損，可先自本年度所得額中扣除；前提是虧損年度及扣除年度都有委託會計師查核簽證。", "降低被查帳的風險：國稅局僅就會計師查核簽證報告書書面審核，公司被國稅局直接調帳查核機率較低。"],
  },
];

export const taxPlanningEn: ArticleSection[] = [
  {
    title: "Document-Based Review",
    paragraphs: [
      "The expanded document-based reporting system, also known as the \"lump-sum tax system,\" allows businesses to calculate their profit tax based on the expanded document-based profit margin set by the Ministry of Finance. Generally, this exempts them from the hassle of audit inspections.",
      "Advantages: Businesses that qualify for document-based reporting and have profits lower than the standard set by the Ministry of Finance can simply calculate and pay their income tax based on the government-set profit margin to avoid audit inspections.",
      "Disadvantages: Businesses with actual profit margins lower than or even at a loss compared to the government standard still need to adjust their taxes upwards. In such cases, businesses should consult with an accountant to consider opting for audit-based reporting for better financial planning.",
      "Eligibility criteria set by the Ministry of Finance for businesses to apply the expanded document-based system include:",
      "In essence, the reported profit margin can only be adjusted upwards, not downwards. Businesses eligible for document-based reporting are not subject to further tax audits if they are willing to calculate and pay income tax based on the government-set profit rate, even if their actual profits are lower than the ministry's standard.",
    ],
    bullets: ["Total annual business and non-business income below NT$30 million.", "Annual settlement reports with complete documentation, adjusting the net profit margin above the expanded document-based rate, and timely tax payment.", "Properly maintained books of accounts and supporting documents, with self-adjustments according to law."],
  },
  {
    title: "Audit Inspection",
    paragraphs: [
      "An audit inspection refers to the National Taxation Bureau's process of examining a profit-making business's accounting books, documents, and other relevant data to determine the tax payable based on their filed returns.",
      "Advantages: Taxes are paid based on the self-compiled financial statements, which means there's no overpayment of taxes as might occur with document-based audits.",
      "Disadvantages: The tax payable is determined primarily through an audit, so the accounting records must withstand scrutiny. If they do not, additional taxes may be assessed.",
      "Therefore, the cost of bookkeeping may increase. To reduce the risk of direct tax audits, one can opt for an accountant-certified filing, which lessens the likelihood of being directly audited by the tax authorities.",
    ],
  },
  {
    title: "Accountant-Certified Filing",
    paragraphs: [
      "Accounting records and documents of a business are initially reviewed by an accountant. Accountants audit and certify clients' profit-seeking enterprise income tax settlement reports according to relevant tax laws and generally accepted auditing standards. They examine whether the related transactions and accounting treatments comply with tax regulations to determine the taxable income and represent the client in filing tax returns.",
      "This tax audit report can be provided to the National Taxation Bureau, helping clients avoid tax evasion or overpayment due to unfamiliarity with tax laws. Within the legal framework, accountants offer advice for reasonable tax burden planning.",
      "The tax law specifically provides the following incentives for accountant-certified filings:",
    ],
    bullets: ["Increased entertainment expense limit: Approximately a 30% increase in deductible expenses, directly reducing the tax burden.", "Loss offsetting: Losses in any of the first 10 years of a business can be deducted from the current year's income, provided that the accountant audited those loss years and the deduction year.", "Reduced risk of audit: The National Taxation Bureau primarily conducts written reviews based on the accountant’s audit report, reducing the likelihood of direct audits and the risk of additional tax payments."],
  },
];

export const gptFaqZh = [
  ["甚麼是營利事業所得稅？", "營利事業所得稅是對公司或個體營業者在一定期間內，從事商業、工業、農業、專業或其他營利活動所得淨利的課稅。"],
  ["如何計算營利事業的應納稅所得額？", "應納稅所得額是以營利事業的總收入扣除免稅所得、各項允許扣除的支出及損失後的餘額。"],
  ["個人所得稅的稅率是多少？", "個人所得稅的稅率是依據累進稅率制度計算，根據所得範圍分為數檔，稅率從5%到45%不等。"],
  ["何謂增值稅及其稅率？", "增值稅是對貨物或勞務銷售價格所加徵的稅，台灣的增值稅稅率為5%。"],
  ["什麼是二代健保費及其計算方式？", "二代健保費是指除了健保費外，對個人年所得超過一定門檻的部分加徵的健保補充保費，計算方式是將超過門檻的所得乘以補充保費率。"],
  ["營業稅和營利事業所得稅有何不同？", "營業稅是對銷售貨物或勞務的營業額徵收的稅，而營利事業所得稅則是對營利事業的淨利徵收的稅。"],
  ["如何申報個人綜合所得稅？", "個人綜合所得稅需透過填寫綜合所得稅申報書，並於每年的申報期間內提交至稅務機關，可選擇紙本或線上申報。"],
  ["什麼是財產交易所得稅？", "財產交易所得稅是對於買賣房地產、股票等財產所產生的交易利益徵收的稅。"],
  ["營業外收入如何課稅？", "營業外收入如利息、租金、股利等，需根據其性質納入個人或營利事業的所得中，並依相關稅法規定課稅。"],
  ["如何辦理公司設立時的稅務登記？", "公司設立後，需向主管稅務機關申請稅務登記，包括營業稅、營利事業所得稅等，並獲取統一編號。"],
];

export const gptFaqEn = [
  ["What is Profit-seeking Enterprise Income Tax?", "Profit-seeking Enterprise Income Tax is a tax imposed on the net profits earned by companies or individual business operators from commercial, industrial, agricultural, professional, or other profit-making activities within a certain period."],
  ["How is the taxable income of a profit-seeking enterprise calculated?", "The taxable income is calculated as the total income of the profit-seeking enterprise minus exempt income, allowable deductions of expenses, and losses."],
  ["What are the tax rates for Individual Income Tax?", "The tax rates for Individual Income Tax are based on a progressive tax system, ranging from 5% to 45% depending on the income bracket."],
  ["What is Value-Added Tax and its rate?", "Value-Added Tax (VAT) is a tax imposed on the selling price of goods or services, with a standard rate of 5% in Taiwan."],
  ["What is the second-generation National Health Insurance (NHI) premium and how is it calculated?", "The second-generation NHI premium refers to a supplementary premium levied on individuals whose annual income exceeds a certain threshold, calculated by applying the supplementary premium rate to the income exceeding the threshold."],
  ["How do Business Tax and Profit-seeking Enterprise Income Tax differ?", "Business Tax is levied on the business turnover from the sale of goods or services, whereas Profit-seeking Enterprise Income Tax is levied on the net profits of a profit-seeking enterprise."],
  ["How to file Individual Comprehensive Income Tax?", "Individual Comprehensive Income Tax must be declared using the Comprehensive Income Tax Return Form and submitted to the tax authorities within the annual filing period, either in paper form or online."],
  ["What is Property Transaction Income Tax?", "Property Transaction Income Tax is imposed on the gains from transactions of properties such as real estate and stocks."],
  ["How is non-operating income taxed?", "Non-operating income, such as interest, rent, and dividends, must be included in the individual or profit-seeking enterprise's income according to its nature and taxed according to relevant tax laws."],
  ["How to handle tax registration when establishing a company?", "After establishing a company, tax registration with the competent tax authority is required, including for Business Tax, Profit-seeking Enterprise Income Tax, etc., to obtain a Unified Business Number."],
];
