# 如何更新專案進度

頁面 `progress.html` 只讀 `data/projects-progress.json`，不需要改版面或重新建置。

1. 編輯 `data/projects-progress.json` 裡對應專案的欄位。
2. 存檔後推上 GitHub。若網站已開 GitHub Pages，等 Pages 更新再重新整理 `/progress.html`。
3. 本機預覽請用靜態伺服器（見下方）。直接用檔案開啟時，瀏覽器通常會擋住 `fetch`，頁面會顯示讀取失敗。

## 欄位

| 欄位 | 說明 |
| --- | --- |
| `name` | 卡片標題。專案顯示名稱用繁體中文較自然；repo 名稱維持英文即可。 |
| `blurb` | 一兩句話說明這個專案在做什麼。 |
| `phase` | `planning`（規劃中）、`building`（製作中）、`shipping`（上線推進）、`paused`（暫停）。 |
| `progress` | 0–100 的整數。這是給人一眼比較用的估計，不是分析數據。 |
| `progressKind` | 維持 `seed`，頁面會標成「種子估計」。若你已改成自己核定的數字，可改成 `manual`，標籤會改成「手動填寫」。 |
| `progressBasis` | 這個百分比為什麼是這個數字。種子值請寫清楚依據，避免看起來像流量統計。 |
| `nextMilestone` | 下一步。若 repo 沒有公開里程碑，請在文字裡註明是種子填寫。 |
| `lastUpdated` | 你認定的最近更新日，`YYYY-MM-DD`。 |
| `repo` | GitHub 網址。IlhaHometown 對應公開倉是 `https://github.com/ioksengtan/IlhaHometown`。 |
| `live` | 選填。沒有公開網站就刪掉這個欄位。 |

`seedDisclaimer` 與 `generatedFromPublicReposOn` 會顯示在頁首。改完內容後，把日期改成你更新的那天。

目前六筆的百分比都是 2026-09-23 依公開 README 與近期 commit 填的起點，請直接改成你要追蹤的數字。
