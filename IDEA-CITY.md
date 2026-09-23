# 靈感城市

`ideas.html` 是唯讀的 repo 視覺化。開啟頁面先顯示部署快照，再從公開的 `ioksengtan/idea` main 分支讀取最新 commit、檔案清單與 Markdown。所有筆記使用同一 commit。重新整理頁面即可同步；沒有背景推播或新增點子表單。

連線失敗、API 限流或同步超過 15 秒時，保留部署快照並顯示狀態。任何一份下載失敗都不會用不完整資料取代城市。

一般 Markdown 筆記會變成建築；隱藏目錄、依賴目錄及 README/AGENTS/LICENSE/CHANGELOG/CONTRIBUTING 等說明文件不納入。已指定的 `hot-stir-fry/README.md` 是例外。

標題取自 H1，摘要優先取「點子／核心概念／專案概述／概念／簡介／目標」段落。內容以純文字呈現，不執行筆記 HTML。特製模型依 source path 對應。新筆記依主題選用感知、工坊、餐飲、運算或創作基本模型；這是規則分類，不是 AI 生成。高度差異是造型，不代表完成度。數量滑桿是示意，不是歷史資料。

更新離線快照：`node scripts/build-ideas.cjs ../idea origin/main`（先 fetch 來源 clone）。

測試：安裝 Playwright 後執行 `node tests/city.test.cjs`。預設使用 Edge，可用 `BROWSER_CHANNEL` 指定瀏覽器。

桌面支援游標中心滾輪縮放、拖曳與點選；手機支援單指拖曳與雙指縮放。資訊卡位於地圖內，Escape 或關閉按鈕可關閉，鍵盤可用建築下拉清單探索。
