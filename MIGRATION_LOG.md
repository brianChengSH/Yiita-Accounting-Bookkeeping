# Yiita 網站與 DNS 搬遷紀錄

## 基本資料

- 網站：乙達記帳士事務所
- 正式網域：`yiita.com`
- 正式網址：<https://www.yiita.com/>
- GitHub repository：<https://github.com/brianChengSH/Yiita-Accounting-Bookkeeping>
- 網站主機：GitHub Pages
- 網域註冊商與 DNS：GoDaddy
- 電子郵件：Zoho Mail
- 原網站與原 DNS 平台：Wix
- 時區：新加坡時間（SGT，UTC+8）
- 紀錄完成時間：2026-08-10 20:40:08 SGT

> 說明：Git 提交時間取自 repository，可精確到秒。Wix、GoDaddy、GitHub 與 Zoho 控制台未提供本次操作的完整時間匯出，因此相關事件依日期及實際操作順序記錄，時間欄標示為「未記錄」，不推測不存在的分鐘數。

## 最終架構

| 功能 | 最終服務 | 說明 |
|---|---|---|
| 網域註冊與續約 | GoDaddy | `yiita.com` 保留自動續約 |
| DNS | GoDaddy | 權威 nameserver 為 `ns35.domaincontrol.com`、`ns36.domaincontrol.com` |
| 靜態網站 | GitHub Pages | 由 `main` branch 的 GitHub Actions workflow 發佈 |
| 正式網址 | `https://www.yiita.com/` | HTTPS 強制開啟 |
| 電子郵件 | Zoho Mail | MX、SPF、DKIM 已驗證 |
| Wix | 已脫鉤 | 網域已移除，網站方案自動續訂已關閉 |

## 時間軸

### 2026-08-08：第一階段——建立並發佈靜態網站

| 時間（SGT） | 事件 | 結果／依據 |
|---|---|---|
| 15:56:53 | 建立 Yiita 靜態網站 | Git commit `fe96c4d`：`Build static Yiita website` |
| 16:04:50 | 支援 GitHub Pages 預設網址 | Git commit `a0695db` |
| 16:17:00 | 修正 GitHub Pages asset path | Git commit `a7a7a95` |
| 16:24:41 | 改善網站 Email 開啟方式 | Git commit `72ee0a1` |
| 17:48:29 | 恢復英文導覽與 GPT 頁面 | Git commit `5115cfa` |
| 19:16:39 | 恢復原網站 favicon／網站圖示 | Git commit `135e24f` |
| 19:49:56 | 補回靜態版本遺漏的原網站頁面內容 | Git commit `17e5215` |
| 19:55:46 | 補回完整稅務規劃內容 | Git commit `8f9b67c` |
| 23:43:11 | 修正 custom domain 使用 HTTPS 時的 asset URL | Git commit `b5846ab` |
| 未記錄 | Repository 設為 `main` 並推送至 GitHub | Repository：`brianChengSH/Yiita-Accounting-Bookkeeping` |
| 未記錄 | 設定 GitHub Actions 發佈 GitHub Pages | Workflow：`Deploy Yiita to GitHub Pages` |
| 未記錄 | GitHub Pages custom domain 設為 `www.yiita.com` | DNS check 成功；Enforce HTTPS 開啟 |

### 2026-08-09：第二階段——將 DNS 從 Wix 搬到 GoDaddy

| 時間（SGT） | 事件 | 結果／依據 |
|---|---|---|
| 未記錄 | 備份並核對 Wix 權威 DNS | 同時查詢 `ns12.wixdns.net` 與 `ns13.wixdns.net`，保存網站及 Zoho 記錄 |
| 未記錄 | 在 Wix 補齊 Zoho Mail 記錄 | MX、SPF、DKIM 經 Zoho 管理後台驗證成功 |
| 未記錄 | GoDaddy nameserver 從 Wix 改為 GoDaddy 預設值 | 改為 `ns35.domaincontrol.com`、`ns36.domaincontrol.com` |
| 未記錄 | 發現並移除 GoDaddy 預設停放設定 | 原 A 記錄為 GoDaddy Parked；`www` 原先指向 apex |
| 未記錄 | 建立 GitHub Pages DNS 記錄 | 新增 4 筆 A，並將 `www` CNAME 指向 `brianchengsh.github.io` |
| 未記錄 | 建立 Zoho MX 記錄 | `mx.zoho.com`、`mx2.zoho.com`、`mx3.zoho.com` |
| 未記錄 | 建立 Zoho SPF 與 DKIM | Zoho 後台 MX、SPF、DKIM 全部顯示綠色／Verified |
| 未記錄 | 刪除 GoDaddy 自動新增的 `_dmarc` | 該記錄使用 `p=quarantine` 並將報告寄至 `onsecureserver.net`，並非原有 Zoho 設定 |
| 未記錄 | 驗證全球公共 DNS | 1.1.1.1 與 8.8.8.8 均解析到 GoDaddy、GitHub Pages 與 Zoho |
| 未記錄 | 驗證四種網站網址 | HTTP 自動轉 HTTPS；apex 自動轉 `https://www.yiita.com/`；正式網站回傳 HTTP 200 |
| 未記錄 | 實際測試 Zoho 寄信與收信 | 寄出與回覆皆成功 |

### 2026-08-10：第三階段——與 Wix 完全脫鉤及最終確認

| 時間（SGT） | 事件 | 結果／依據 |
|---|---|---|
| 未記錄 | 24 小時後再次驗證 DNS、網站與郵件 | GitHub Pages、HTTPS、Zoho MX／SPF／DKIM 全部正常 |
| 未記錄 | 從 Wix 移除 `yiita.com` | Wix 網域頁不再連結 `yiita.com`；不影響 GoDaddy DNS 或 Zoho Mail |
| 未記錄 | 核對 Wix 網站方案 | 「進階方案（核心）」顯示自動續訂關閉；頁面日期為 2026-11-04 |
| 未記錄 | 核對 GoDaddy 網域續約 | GoDaddy 顯示 `Renews on Apr 21, 2027`；當時顯示續約費 SG$29.99／年 |
| 未記錄 | Wix 移除後再次驗證網站 | `https://www.yiita.com/` 回傳 HTTP 200，其他網址正確重新導向 |
| 未記錄 | Wix 移除後再次驗證 Zoho | 公開 MX、SPF、DKIM 正確；實際收發信再次成功 |

## 最終 DNS 記錄

TTL 均為 1 小時；GoDaddy 管理的 NS、SOA 與 `_domainconnect` 系統記錄保留不動。

### GitHub Pages

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `brianchengsh.github.io` |

### Zoho Mail

| Type | Name | Priority | Value |
|---|---|---:|---|
| MX | `@` | 10 | `mx.zoho.com` |
| MX | `@` | 20 | `mx2.zoho.com` |
| MX | `@` | 50 | `mx3.zoho.com` |
| TXT | `@` | — | `v=spf1 include:zohomail.com ~all` |
| TXT | `zmail._domainkey` | — | DKIM public key（見下方） |

DKIM public key：

```text
v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDkbt3ORd+Ec5AnOeiQVEy79ACbhUE1ApqjZc1y1uaWOnMi5jG1ZG+hZML6Tp7MkLB/IKZw+tzTkqXhl3OkUjph5KIxDuyFEDjNjXL2Wq0w9m585AeZ3uG9QGA0EsqKsNPO6mCcelQlv4SffrogDdE0XbArAg3QgkBH9zlG+GOeUwIDAQAB
```

### 未設定項目

- DMARC：目前未設定；可日後先以 `p=none` 觀察報告，再逐步提高政策。
- BIMI：目前未設定；通常需先完成具執行力的 DMARC 政策。

## 最終驗證清單

- [x] GoDaddy 為權威 DNS
- [x] `yiita.com` 四筆 GitHub Pages A 記錄正確
- [x] `www.yiita.com` CNAME 正確
- [x] `http://yiita.com/` 正確重新導向
- [x] `https://yiita.com/` 正確重新導向
- [x] `http://www.yiita.com/` 正確重新導向
- [x] `https://www.yiita.com/` 回傳 HTTP 200
- [x] GitHub Pages Enforce HTTPS 開啟
- [x] Zoho MX 驗證成功
- [x] Zoho SPF 驗證成功
- [x] Zoho DKIM 驗證成功
- [x] Zoho 寄信成功
- [x] Zoho 收信成功
- [x] `yiita.com` 已從 Wix 移除
- [x] Wix 網站方案自動續訂已關閉
- [x] GoDaddy 網域保留續約

## 後續維護注意事項

1. 不要刪除或改動上述 GitHub Pages A／CNAME 記錄，除非 GitHub 官方指示更新。
2. 不要刪除 Zoho MX、SPF 或 DKIM，否則可能影響郵件收發或寄件信譽。
3. 定期確認 GoDaddy 付款方式有效，避免 `yiita.com` 到期。
4. Wix 方案頁已顯示自動續訂關閉；接近 2026-11-04 時可再確認沒有產生新帳單。
5. 網站內容更新後，推送至 `main` branch，GitHub Actions 會重新發佈 GitHub Pages。
6. 若日後設定 DMARC，先採監控政策並確認 SPF／DKIM alignment，再逐步改為 quarantine 或 reject。
