# M5Stack 研究筆記

更新日期：2026-09-18

## 一句話結論

M5Stack 是一套以 ESP32 系列晶片為主的模組化開發生態，把螢幕、按鍵、電池、感測器、外殼與擴充介面整合成可直接使用的產品，適合快速完成 IoT、智慧家庭、互動裝置、隨身工具與 AI 語音介面的原型。

## 它與一般 ESP32 開發板的差異

- 一般 ESP32 板通常需要自行配螢幕、電池、感測器、接線和外殼；M5Stack 多數產品已整合這些零件。
- 周邊依形態分為可堆疊模組、Grove 接頭的 Unit，以及針對 Stick、Atom 等系列設計的配件。
- 同時支援低程式門檻的 UiFlow2、一般 Maker 常用的 Arduino／PlatformIO，以及較底層的 ESP-IDF。
- `M5Unified` 提供跨多款控制器的統一 API，處理螢幕、觸控、按鍵、喇叭、麥克風等內建硬體，降低更換型號的成本。

## 主要產品線

| 系列 | 特色 | 適合用途 |
| --- | --- | --- |
| Core | 螢幕、按鍵／觸控、音訊、電池與擴充整合度高 | 桌面控制器、資訊面板、智慧家庭中控、完整原型 |
| Stick | 細長小型，多含螢幕、IMU、紅外線等 | 穿戴、遙控器、隨身感測器 |
| Atom | 極小型，可嵌入裝置 | IoT 節點、按鈕、燈光、感測與小型控制器 |
| Cardputer | 小螢幕加實體鍵盤的掌上裝置 | 終端機、文字輸入、無線工具、行動控制器 |
| Stamp | 郵票大小的核心模組 | 自製 PCB、產品化與空間受限的嵌入式設計 |
| Paper | 電子紙、低耗電、畫面可長時間保留 | 標牌、日曆、狀態看板、慢速更新資訊 |

## 三個值得先看的選擇

### CoreS3：最完整的通用起點

- ESP32-S3，雙核心 240 MHz、16 MB Flash、8 MB PSRAM。
- 2 吋 320 × 240 觸控螢幕，另有相機、距離／環境光感測、IMU、磁力計、RTC、microSD、雙麥克風與喇叭。
- 適合做帶 UI、語音、影像或感測功能的完整桌面原型。
- 優點是一次取得大部分常用硬體；缺點是若只是做單一感測節點，成本與體積都可能過高。

### AtomS3／AtomS3 Lite：小型嵌入式節點

- 體積很小，適合藏進成品；Lite 適合無螢幕節點，帶螢幕版本適合顯示簡單狀態。
- 可搭配 Atom 專用 RS485、CAN、繼電器、馬達、PoE、GPS 等底座或配件。
- 適合智慧家庭按鈕、感測器、設備控制與分散式 IoT 節點。

### Cardputer：有實體輸入的可玩性最高

- ESP32-S3、56 鍵鍵盤、1.14 吋 TFT、麥克風、喇叭、紅外線、microSD、Grove 與電池。
- 適合製作掌上終端機、文字筆記器、智慧家庭遙控器、Wi-Fi／BLE 工具或離線小程式。
- 螢幕偏小，不適合複雜圖形介面，但鍵盤讓互動原型比一般開發板完整許多。

## 開發方式

1. **UiFlow2**：網頁版 Blockly 圖形化 IDE，可經 USB 或網路部署；適合快速驗證硬體與初學者。
2. **AIFlow**：用自然語言生成、部署及除錯 MicroPython 程式的新工具，適合快速試作，但正式專案仍應保留與審查產生的原始碼。
3. **Arduino IDE／PlatformIO**：生態成熟、範例多，適合大部分 Maker 專案。新專案可優先採用 `M5Unified` 與 `M5GFX`。
4. **ESP-IDF**：需要更精細的效能、電源管理、FreeRTOS 或產品化控制時使用。

## 值得發展的點子

- **桌面生活儀表板**：CoreS3 顯示天氣、行事曆、番茄鐘與 Home Assistant 狀態。
- **隨身靈感收集器**：Cardputer 離線記錄文字，連上 Wi-Fi 後同步到 GitHub 或其他筆記系統。
- **語音快速記錄器**：CoreS3 或 Atom Voice 收音，送到語音辨識服務後分類成 Idea repository 的 Markdown。
- **實體 Idea Inbox**：Atom 加按鈕、旋鈕或 NFC，快速標記「稍後研究」的物件或情境。
- **電子紙每日卡片**：Paper 顯示每日一個待發展點子，低耗電且不製造螢幕干擾。
- **家中環境節點**：Atom 加溫濕度、CO₂ 或空氣品質 Unit，將資料送進 Home Assistant。

## 建議的第一個實驗

如果目標是延伸這個 idea repository，最有特色的起點是 **Cardputer 隨身靈感收集器**：

1. 在 Cardputer 輸入一句點子。
2. 先以日期和分類存成 microSD 上的 Markdown 或 JSON。
3. 有 Wi-Fi 時呼叫一個受控的同步服務，由服務端寫入 repository 並建立 commit。
4. 裝置畫面顯示「本機已存」和「GitHub 已同步」兩種狀態，避免網路中斷造成誤判。

不建議把長期 GitHub token 直接硬編碼在裝置韌體；較安全的做法是讓裝置呼叫自有的小型 API，由伺服器或 GitHub App 負責最小權限的 repository 寫入。

## 待確認問題

- 想做的是單純研究／收藏，還是近期會購買硬體實作？
- 偏好有螢幕與鍵盤的獨立裝置，還是小型感測與自動化節點？
- 是否要和 Home Assistant、手機、GitHub 或語音服務整合？
- 專案是否需要電池供電、離線運作或長時間低功耗？

## 官方資料

- [M5Stack 入門與產品線](https://docs.m5stack.com/en/start)
- [M5Stack 生態介紹](https://docs.m5stack.com/en/learn/intro)
- [產品列表](https://docs.m5stack.com/en/products)
- [CoreS3 文件](https://docs.m5stack.com/en/core/CoreS3)
- [Cardputer 文件](https://docs.m5stack.com/en/core/Cardputer)
- [StickC Plus2 文件](https://docs.m5stack.com/en/core/M5StickC%20PLUS2)
- [UiFlow2 Web IDE](https://docs.m5stack.com/en/uiflow2/uiflow_web)
- [M5Unified 快速入門](https://docs.m5stack.com/en/arduino/m5unified/helloworld)

