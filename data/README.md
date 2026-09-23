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

## 如何更新通勤入口

頁面 `commute.html` 只讀 `data/commute.json`。改連結、一句話或狀態不用動版面。

1. 編輯 `data/commute.json` 裡的項目。順序就是畫面上的順序。
2. 存檔後推上 GitHub。Pages 更新後重新整理 `/commute.html`。
3. 本機預覽請用靜態伺服器。直接用檔案開啟時，瀏覽器通常會擋住 `fetch`。

| 欄位 | 說明 |
| --- | --- |
| `sections` | 兩個區塊：`read`（讀）、`play`（玩）。`label` 是畫面上的大標。 |
| `items[].section` | `read` 或 `play`。 |
| `title` | 卡片標題。繁體中文；repo 名稱可以留英文。 |
| `why` | 一句話，為什麼適合（或不適合）通勤用。不要寫分數或推薦指數。 |
| `status` | `ready`（可自用）、`rough`（勉強可用）、`not-ready`（還沒準備好）。 |
| `note` | 這個狀態怎麼來的。查過的日期、HTTP 結果、已知限制寫在這裡。 |
| `url` | 選填。主要開啟連結，必須是 `https://`。沒有可開的網頁就拿掉這個欄位。 |
| `repo` | 選填。GitHub 網址，同樣必須是 `https://`。 |
| `checkedOn` | 你最後一次打開這些網址的日期，`YYYY-MM-DD`。 |

`ready` 只留給你親自確認過的公開 HTTPS 頁：網址有回應，而且手機上真的讀得了或玩得了。頁面打得開、但操作或版面還不適合手機，用 `rough`。沒有網站，或內容明顯還不能拿來通勤，用 `not-ready`。
