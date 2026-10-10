# Muse Gadgets：自製能跟 Meta Muse 溝通的硬體

更新日期：2026-10-09  
靈感來源：使用者貼上的社群新聞文字（出處未附）；另以搜尋摘要查證，來源見文末  
官方儲存庫：[facebookincubator/muse-gadget-sdk](https://github.com/facebookincubator/muse-gadget-sdk)（2026-10-10 已 clone 讀過 README、esp32 與 linux 說明；未讀 gadgets.muse.ai 條款頁）  
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
- 注意事項：程式碼雖開源，但要連上 Muse 必須使用 Meta 發放的 token，Meta 可以收回；Meta 也提醒開發者風險自負。報導另稱 token 條款限制每個 token 最多 50 台設備、不得用在販售的設備，這點我尚未在條款頁確認（repo README 只說要先閱讀 Gadget SDK Terms）。
- Muse 目前在美國上線，台灣能否使用 Muse 與 token 尚未查證。

## 讀過官方 repo 後確認的事實（2026-10-10，commit 812c46f）

- 結構：`esp32/`（ESP-IDF v6.0.1 韌體）、`linux/`（Python SDK，Raspberry Pi 等）、`skills/`（社群貢獻的裝置技能，Markdown only）。授權 Apache 2.0（Jollybot 頭像與兩個第三方檔案例外）。
- 每台設備都要 SDK token（gadgets.muse.ai 帳號內產生）才能配對，包含自己用的；配對經 iOS／Android 的 Muse App：設定、裝置、開啟 Developer mode，再找 `MuseGadget` 開頭的裝置。ESP32 上要按板上按鈕確認配對，連線採加密 session；README 明說社群設備沒有廠商驗證，要在可信任的網路上設定。
- **ESP32 韌體本身就包含完整功能，不只是顯示介面。** 部分板子（如 Waveshare 圓形 AMOLED 1.75、M5Stack StickS3、ESP32-S3-BOX-3）已有動畫頭像、按鍵說話（push-to-talk）、設定畫面與圖片顯示，燒錄後就能用；只有狀態燈的板子則以燈號顯示連線狀態。
- 電子紙：支援 Seeed reTerminal E1001（7.5 吋黑白）、E1002（7.3 吋六色）與 Waveshare 1.54 吋電子紙，目前是「狀態加圖片」顯示，是否能做成晨報機要再看。
- **Linux 端：Muse 反過來能對你的機器下指令。** 內建 `system.run`（執行 shell 指令）、`file.read`、`file.write`、`device.health`；Muse 的權限等同安裝時選的帳號，若該帳號有 sudo，Muse 也有。程式端可用 `musegadget send-user-msg "…"` 主動傳訊息給 Muse；新增指令改 `linux/src/musegadget/executor.py`。
- 官方推薦用 Meta 的 Muse Code（其他讀 `AGENTS.md` 的 coding agent 也可）幫忙編譯與燒錄。
- `skills/` 內有社群寫的智慧家庭裝置技能（Hue、Sonos、Roomba、印表機等），可貼進 Muse 對話使用。需搭配 Muse Home Link。

### 對前面說明的修正

我先前推測「硬體只是接收指令的顯示介面、你要寫指令解析」，實際上：連線、加密、頭像與語音介面都由 SDK 韌體處理，使用者通常只需選板子、設 token、燒錄。想做自訂的事（例如晨報機版面、新指令）才需要改韌體或 `executor.py`。

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
