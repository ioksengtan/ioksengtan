# Muse Gadgets：自製能跟 Meta Muse 溝通的硬體

更新日期：2026-10-09  
靈感來源：使用者貼上的社群新聞文字（出處未附）；另以搜尋摘要查證，來源見文末  
狀態：靈感庫／未選定落地方向  
紀錄者：Maker Idea

## 一句話

Meta 開源 Muse Gadgets 的 ESP32 韌體與 Linux SDK，讓人自製能跟 Muse AI 助理對話的小硬體，例如電子紙晨報機、圓形螢幕 AI 小夥伴。

## 貼文內容（使用者提供）

- Meta 開源 Muse Gadgets 韌體與 SDK，可自製電子紙晨報機、圓形螢幕 AI 小夥伴。
- Muse 是 Meta 的 AI 助理，9 月 8 日在美國上線，主打協助預訂旅行、填寫表單與代購物。
- Meta 超級智慧實驗室產品負責人 Nat Friedman 宣布開放 ESP32 韌體與 Linux SDK，讓人自製能跟 Muse 溝通的硬體。
- 他的原話是「副業警報」。

## 搜尋摘要的補充（未直接讀原始頁面）

- 多篇報導指出專案公布於 2026 年 10 月 2 日前後，Friedman 在 X 上宣布。這與貼文提到的 Muse 上線日期（9 月 8 日）是兩件事，我沒有自行核實 Muse 上線日。
- 內容：ESP32 Device SDK 與韌體、給 Raspberry Pi 與其他 Linux 電腦用的 Linux Device SDK，程式碼採 Apache 2.0 授權。
- 起步方式：到 gadgets.muse.ai 取得 API token，再依 GitHub 儲存庫開發。
- 另有名為 Muse Home Link 的 USB-C 轉接器，報導稱限量 5,000 個，免費提供給 Muse 訂閱者（細節各報導略有出入）。
- 注意事項：程式碼雖開源，但要連上 Muse 必須使用 Meta 發放的 token，Meta 可以收回；Meta 也提醒開發者風險自負。
- Muse 目前在美國上線，台灣能否使用 Muse 與 token 尚未查證。

## 想擴充的方向（建議）

- 電子紙晨報機：電子紙螢幕每天早上顯示 Muse 整理的行程、天氣與待辦（可與清單中「今日鳥訪客電子紙畫框」「舊 Kindle 電子紙打字機」共用電子紙硬體）。
- 圓形螢幕 AI 小夥伴：把第 37 號圓形螢幕虛擬寵物球、第 59 號 Deskimon 接上 Muse，表情隨對話變化。
- 低成本桌面小夥伴：第 74 號五美元桌面小夥伴與第 72 號 OLED 表情鑰匙圈都用 XIAO ESP32 系列，可評估能否沿用。
- Linux 端：用舊 Raspberry Pi 做成會執行指令或串接 Home Assistant 的 Muse 小幫手。
- 風險評估：依賴 Meta 的 token 與服務，產品化或教學使用前需確認使用條款，並準備離線備援方案。

## 相關點子

- 第 37 號圓形螢幕虛擬寵物球、第 59 號 Deskimon 模組化桌面表情機器人。
- 第 72 號 OLED 表情鑰匙圈、第 74 號五美元桌面小夥伴。
- 「今日鳥訪客電子紙畫框」「舊 Kindle 電子紙打字機」：電子紙方向。

## 來源（搜尋結果，未逐一開啟）

- [Meta Open-Sources Muse Gadgets (AI Weekly)](https://aiweekly.co/alerts/meta-open-sources-muse-gadgets-ships-5000-home-link-dongles)
- [Meta opens Muse to ESP32 gadgets (Runtime Wire)](https://runtimewire.com/article/meta-muse-gadgets-open-source-hardware-sdk)
- [Meta Open Sources Muse Gadgets (OfficeChai)](https://officechai.com/ai/meta-open-sources-muse-gadgets-lets-developers-build-their-own-hardware-for-its-ai-agent/)
