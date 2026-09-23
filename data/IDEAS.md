# 靈感生態缸

`ideas.html` 是獨立靜態頁面，首頁與既有導覽都有入口。不需要建置、套件或 API 金鑰，可直接開啟，也可隨網站部署。

## 資料

`data/ideas.js` 收錄 2026-09-22 的 12 篇 idea 筆記及一個本機熱炒遊戲原型。不是自動同步，也不是 AI 即時生成。

- `groups`：三個依內容整理的主題群。
- `seeds`：顯示名稱、分群索引、來源路徑、點子摘要。新增時附加到陣列尾端；若重排，必須同步修改 `recipes` 的索引。
- `recipes`：兩個索引由小到大串接的鍵；內容依序是標題、碰撞提案、最小實驗。未指定的配對以摘要組合產生提示。
- 原始筆記連到 `ioksengtan/idea` 的 `main`。熱炒原型尚未出現在該遠端分支，保留來源名稱而不產生無效連結。

## 生長紀錄

使用 `localStorage` 的 `ioksengtan.idea-terrarium.v1`，以來源路徑保存選擇和不重複配對。同一配對的正反順序只吸收一次。存檔损壞、移除的點子或禁止儲存不會阻止互動。紀錄只屬於此瀏覽器，不會送到伺服器或回寫 GitHub。

## 檢查

使用靜態伺服器開啟 `ideas.html`，檢查選擇、餵養、重複配對、同一點子禁止配對、重新載入後保留紀錄，以及窄螢幕和鍵盤操作。原始首頁及導覽使用既有網站樣式；新頁面使用獨立 `css/ideas.css`，不影響舊頁樣式。

`tests/ideas.test.cjs` 是開發用的瀏覽器驗證，需要 Node.js、可解析的 `playwright` 套件與 Microsoft Edge。執行 `node tests/ideas.test.cjs`；可用 `BROWSER_CHANNEL=chrome` 改用 Chrome（PowerShell 請以 `$env:BROWSER_CHANNEL='chrome'` 設定）。測試暫時啟動 127.0.0.1:4188，結束後關閉，截圖寫入系統暫存目錄。網站本身不需要 Playwright。
