# 乙達記帳士事務所靜態網站

這是 [yiita.com](https://www.yiita.com/) 的靜態版本，保留中文／英文首頁、公司登記、記帳、稅務規劃、GPT 問與答與聯絡頁面。

## 網站特性

- 完整靜態輸出，不需要資料庫或長期運作的網站伺服器
- 手機、平板與桌面版自適應
- 聯絡表單以訪客自己的 Email 應用程式寄送，不保存訪客資料
- 保留 LINE、WhatsApp、電話與 Email 聯絡方式
- 內建 GitHub Pages 自動發佈流程
- 自訂網域設定為 `www.yiita.com`

## GitHub Pages 發佈

將這個資料夾作為 GitHub repository 根目錄推送到 `main` branch，然後在 GitHub repository 的 **Settings → Pages → Build and deployment** 選擇 **GitHub Actions**。之後每次推送到 `main` 都會自動更新網站。

切換正式網域前，請先在 GitHub Pages 設定 `www.yiita.com`，再依 GitHub 顯示的 DNS 指引修改目前網域設定，以免網站中斷。

## 本機預覽

需要 Node.js 22 或更新版本：

```bash
npm ci
npm run dev
```

產生靜態網站：

```bash
npm run build
```

靜態輸出位於 `dist/client`。
