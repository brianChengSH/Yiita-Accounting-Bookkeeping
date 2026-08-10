---
name: "乙達記帳士事務所"
description: "以沉穩、精準、親和的跨境商務會客室，承接中英文會計與公司登記服務。"
colors:
  business-charcoal: "#30302f"
  ink: "#1b1b1a"
  warm-paper: "#f4f1ea"
  quiet-champagne-gold: "#b29a66"
  contact-cyan: "#009eb8"
  dividing-line: "#d8d2c7"
  muted-copy: "#686761"
  pure-white: "#ffffff"
typography:
  display:
    fontFamily: "Arial, Noto Sans TC, PingFang TC, Microsoft JhengHei, sans-serif"
    fontSize: "clamp(38px, 6vw, 64px)"
    fontWeight: 400
    lineHeight: 1.18
    letterSpacing: "0.03em"
  headline:
    fontFamily: "Arial, Noto Sans TC, PingFang TC, Microsoft JhengHei, sans-serif"
    fontSize: "clamp(28px, 4vw, 44px)"
    fontWeight: 400
    lineHeight: 1.25
  title:
    fontFamily: "Arial, Noto Sans TC, PingFang TC, Microsoft JhengHei, sans-serif"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: 1.7
  body:
    fontFamily: "Arial, Noto Sans TC, PingFang TC, Microsoft JhengHei, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Arial, Noto Sans TC, PingFang TC, Microsoft JhengHei, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.7
    letterSpacing: "0.2em"
rounded:
  none: "0"
  circle: "50%"
spacing:
  xs: "5px"
  sm: "10px"
  md: "15px"
  lg: "18px"
  xl: "30px"
  2xl: "34px"
  section: "70px"
components:
  button-solid:
    backgroundColor: "{colors.business-charcoal}"
    textColor: "{colors.pure-white}"
    rounded: "{rounded.none}"
    padding: "0 26px"
    height: "46px"
  button-secondary:
    backgroundColor: "{colors.pure-white}"
    textColor: "{colors.business-charcoal}"
    rounded: "{rounded.none}"
    padding: "0 26px"
    height: "46px"
  button-light:
    backgroundColor: "{colors.pure-white}"
    textColor: "{colors.business-charcoal}"
    rounded: "{rounded.none}"
    padding: "0 26px"
    height: "46px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.pure-white}"
    rounded: "{rounded.none}"
    padding: "0 26px"
    height: "46px"
  text-field:
    backgroundColor: "{colors.pure-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "11px 12px"
  content-card:
    backgroundColor: "{colors.pure-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "34px"
  navigation-bar:
    backgroundColor: "{colors.business-charcoal}"
    textColor: "{colors.pure-white}"
    rounded: "{rounded.none}"
    height: "45px"
---

# Design System: 乙達記帳士事務所

## Overview

**Creative North Star: "跨境商務會客室"**

乙達的視覺系統像一間可靠的跨境商務會客室：深色導覽與清楚的資訊結構建立專業秩序，暖紙色表面和低調金色則讓嚴肅的會計主題保有人情味。它不是傳統政府網站式的行政公文，也不使用可愛插畫來淡化專業，而是用平靜、直接的方式協助不同語言與背景的訪客做出下一步決定。

整體氣質沉穩、精準、親和。大面積中性色、方正元件與克制陰影提供可信度；攝影、品牌 Logo 和少量金色保留質感；青藍色只在需要立即聯絡的行動上提高辨識度。畫面維持適中的資訊密度，既能承載流程與比較表，也不讓商務內容顯得擁擠。

**Key Characteristics:**

- 炭黑、暖紙白與純白構成穩定的專業基底。
- 低調香檳金標示眉題、步驟與重要邊線，不作大面積裝飾。
- 聯絡青藍專屬於高可見度的聯絡行動。
- 方正、無圓角的元件建立精準與秩序；圓形只用於旗幟、流程節點與識別標記。
- 中英文共用同一套結構、層級與互動語言。

## Colors

色彩以中性、低彩度的商務基底為主，金色提供節制的質感，青藍負責清楚而直接的聯絡行動。

### Primary

- **低調香檳金：** 用於眉題、流程數字、步驟標記、重要左側邊線與少量文字連結；它負責提示與質感，而不是覆蓋大面積表面。

### Secondary

- **聯絡青藍：** 保留給固定聯絡入口等需要立即被看見的行動，不與一般內容層級競爭。

### Neutral

- **商務炭黑：** 導覽、頁尾、主要按鈕、表格標頭與深色行動區的權威底色。
- **正文墨色：** 預設正文和標題顏色，維持高可讀性而不採用生硬純黑。
- **暖紙白：** 頁首介紹、功能敘述、表單區與提示區的柔和分層表面。
- **純白：** 主要頁面底色、欄位、卡片與反白文字。
- **安靜灰字：** 次要說明、描述文字與輔助標籤。
- **柔和分隔線：** 表格、卡片與清單的細邊界，提供結構但不形成厚重框架。

### Named Rules

**The Rare Gold Rule.** 金色只應出現在少量、可解釋的提示位置；稀少本身就是質感來源。

**The Contact Cyan Rule.** 青藍只代表高優先聯絡行動，不得散落成一般裝飾色。

## Typography

**Display Font:** Arial，後備為 Noto Sans TC、PingFang TC、Microsoft JhengHei 與系統 sans-serif

**Body Font:** Arial，後備為 Noto Sans TC、PingFang TC、Microsoft JhengHei 與系統 sans-serif

**Numeral Accent Font:** Georgia，僅用於流程數字與少量識別標記

**Character:** 中英文都採清楚、中性、低戲劇性的無襯線字體，透過字級、留白、較輕標題字重與加寬字距建立商務層級。Georgia 只為流程數字加入一點傳統專業感，不成為正文或標題字體。

### Hierarchy

- **Display：** 大型頁面標題，使用正常字重與略寬字距，讓長中文與英文標題保持呼吸感。
- **Headline：** 首頁功能敘述與主要區段標題；比例明顯但不使用粗黑字壓迫內容。
- **Title：** 卡片、表單選項與服務項目標題，以中等字重建立掃讀節點。
- **Body：** 全站正文使用寬鬆行高，適合中英文服務說明、流程和法規性資訊。
- **Label：** 全大寫英文眉題、欄位標籤和微型分類訊號，透過粗體與寬字距形成小而清楚的層級。

### Named Rules

**The Weight Without Ornament Rule.** 專業感來自清楚層級、留白與一致字重，不靠裝飾字體或過度粗黑標題。

## Layout

桌面內容以置中的有限寬度容器為主：主要最大寬度為 1170px，資訊密集頁面依內容使用 1220px、1040px、1000px、900px 或 860px。首頁以三欄服務卡、左右等分的影像／文字區、雙欄表單和橫向行動區建立節奏；資訊頁則以置中標題區、表格、卡片格線和垂直流程呈現。

主要內容區段通常以 70px 左右的垂直間距分隔；卡片內距集中在 30–38px，欄間距依版面重量介於 18–80px。容器左右至少保留 20px 左右的安全空間，避免內容貼近視窗邊緣。

在 900px 以下，導覽改為垂直展開，雙欄影像／文字與表單改為單欄，三欄資訊格改為兩欄。在 640px 以下，所有主要卡片格與流程格改為單欄、表單欄位與寄信選項堆疊，首頁影像區滿寬，CTA 和頁尾改為垂直排列。寬表格保留水平捲動，不壓縮到無法閱讀。

**The Bounded Reading Rule.** 商務內容永遠置於可閱讀的有限寬度中；只有手機首頁的影像敘事區可以刻意滿寬。

## Elevation & Depth

系統採「克制的分層感」。大部分表面保持平坦，以炭黑、暖紙白、白色和細邊線區分層級；陰影只用於需要浮在內容之上的導覽、下拉選單、行動選單和固定聯絡入口。輸入焦點以金色半透明外框提示，不靠大範圍光暈。

### Shadow Vocabulary

- **黏附導覽陰影** (`0 2px 12px #0002`)：讓置頂導覽在捲動時與內容分離。
- **下拉選單陰影** (`0 16px 28px #0004`)：標示選單暫時浮於頁面之上。
- **行動選單陰影** (`0 14px 28px #0005`)：在窄螢幕展開導覽時提供更清楚的覆層關係。
- **浮動聯絡陰影** (`0 7px 20px #0003`)：維持固定聯絡按鈕在頁面內容之上的可見度。
- **欄位焦點環** (`0 0 0 2px #b29a6633`)：在不改變版面尺寸的情況下提供輸入焦點。

### Named Rules

**The Lift Only On Intent Rule.** 陰影只服務覆層、黏附或焦點狀態；靜態內容卡片保持平坦。

## Shapes

方正是預設語言：按鈕、欄位、卡片、表格、提示區與影像／文字模組均不使用圓角，透過直線、細框與清楚對齊傳達精準。圓形是有意義的例外，只用於語言旗幟、時間軸步驟、GPT 識別標記和 Logo 本身已有的圓形符號。

重要提示可使用左側金色粗邊線，資料區塊使用細灰線；不得把每一層容器都包進圓角卡片。

**The Square Default Rule.** 新元件預設為直角；只有具有識別、序列或狀態意義的元素才能使用完整圓形。

## Components

### Buttons

- **Shape:** 方正直角，最小高度 46px，水平內距 26px，使用細邊框和略寬字距。
- **Primary:** 商務炭黑底配純白文字，用於送出、開啟服務和關鍵前進動作。
- **Secondary:** 純白底、炭黑文字與中性灰邊框，用於同一群組中的替代寄信方式。
- **Light:** 純白底配炭黑文字，專用於深色 CTA 區。
- **Outline:** 透明底與白色邊框，專用於影像上的深色 Hero 面板。
- **Hover / Focus:** 可互動按鈕在滑鼠懸停時上移 2px；鍵盤焦點必須保有清楚輪廓，不得只依賴位移。

### Cards / Containers

- **Corner Style:** 直角。
- **Background:** 以純白或暖紙白區分內容角色，避免任意新增彩色卡片。
- **Shadow Strategy:** 靜態卡片無陰影，依靠細邊線、色塊或 1px 格線形成群組。
- **Border:** 資訊卡與表格使用柔和分隔線；流程卡可使用上方金色粗線。
- **Internal Padding:** 一般為 30–38px；小型服務入口可更緊湊。

### Inputs / Fields

- **Style:** 純白底、直角、1px 中性灰邊線，內距 11px 12px，字體繼承正文。
- **Focus:** 邊線轉為暖棕金，外加窄幅半透明金色焦點環。
- **Error / Disabled:** 現有寄信選項的停用狀態降低透明度並取消指標事件；尚未建立獨立錯誤色系，不得自行以大面積紅色取代既有語言。

### Navigation

頂部導覽以商務炭黑為底，14px 文字和小幅字距維持緊湊秩序；hover、active 與展開狀態使用更深底色和較亮金色文字。語言切換採淺色獨立區塊和圓形旗幟。900px 以下改為全寬選單按鈕與垂直清單，下拉內容嵌入同一深色面板。

### Process and Data Patterns

流程以 Georgia 數字、金色提示與直線連結建立次序；比較資料使用炭黑表頭、白色／暖灰交錯列與水平捲動容器。重要補充說明使用暖紙白底和左側金線，不以警告紅色製造不必要的緊張感。

### Floating Contact

固定聯絡入口是唯一可持續使用聯絡青藍實心底的元件。它固定於右下角、保持高對比並使用克制陰影；手機版縮小內距但不隱藏。

## Do's and Don'ts

### Do:

- **Do** 使用炭黑、暖紙白、純白和細灰線建立主要結構，再以少量金色提示重點。
- **Do** 保持中英文頁面相同的層級、元件行為與響應式規則。
- **Do** 使用現有 Logo、商務攝影和真實服務內容承載品牌可信度。
- **Do** 讓資訊表格、流程與聯絡方式在手機上仍可閱讀和操作。
- **Do** 保留 `prefers-reduced-motion`，並讓關鍵互動可在沒有動態效果時理解。

### Don't:

- **Don't** 把網站做成密集、僵硬、以公文格式為主的傳統政府網站。
- **Don't** 使用可愛插畫、吉祥物或童趣圓角削弱專業服務定位。
- **Don't** 大面積使用金色、青藍或其他高彩度顏色；每個強色必須有固定角色。
- **Don't** 為靜態卡片加入無目的陰影、漸層玻璃或浮誇發光效果。
- **Don't** 任意新增字體、圓角尺度或不一致的卡片樣式。
