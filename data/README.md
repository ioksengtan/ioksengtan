# 如何更新專案進度

頁面 `progress.html` 只讀 `data/projects-progress.json`，不需要改版面或重新建置。目標是手機（約 390px 寬）一個畫面看完所有專案，所以每張卡只放一行「最新」、一行「下一步」，其他都收進「詳情」。

1. 編輯 `data/projects-progress.json` 裡對應專案的欄位，並把 `updatedOn` 改成今天。
2. 存檔後推上 GitHub。等 Pages 更新再重新整理 `/progress.html`。
3. 本機預覽請在專案根目錄執行 `python3 -m http.server`。直接用檔案開啟時，瀏覽器通常會擋住 `fetch`。

## 欄位

| 欄位 | 說明 |
| --- | --- |
| `updatedOn` | 頁首「資料更新：」後面的日期，`YYYY-MM-DD`。 |
| `statusLabels` | 燈號的文字說明，通常不用改。 |
| `projects[].name` | 卡片標題。寫完整名稱，不要縮寫。 |
| `projects[].status` | `green`（正常推進）、`yellow`（等我決定）、`gray`（暫停或規劃中）。畫面順序：黃、綠、灰，同色依檔案順序。 |
| `projects[].latest.text` | 一行「最新上線」。太長會被截成「…」，完整標題可寫進詳情。 |
| `projects[].latest.url` | 「最新」的連結，必須是 `https://`。 |
| `projects[].next` | 一行「下一步」。 |
| `projects[].decision` | 要我決定的事。有填就會顯示「⚑ 待你決定」；不用決定就留空字串。 |
| `projects[].details.history` | 詳情裡的歷程，一句一項，新的放前面。預設收合。 |
| `projects[].details.links` | 詳情裡的其他連結，每項 `{ "label": "…", "url": "https://…" }`。 |

畫面文字請用繁體中文，名詞寫全名（例如寫「拉取請求」而不是縮寫）。

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

## 如何更新成長曲線

頁面 `growth.html` 只讀 `data/growth.json`。數字來自各公開倉庫的 git 歷史，不要手改這個檔。

1. 在這個倉庫的根目錄執行 `python3 scripts/build-growth.py`。
2. 腳本會列出 `ioksengtan` 的公開倉庫，淺層複製歷史後重算 `data/growth.json`。
3. 看終端機印出的三個總數。確認沒有不該公開的人名之後再提交。
4. 每週一 00:15（協調世界時）會由 GitHub Actions 自動重跑並提交。不需要另外設定密鑰；公開倉庫用預設的 `GITHUB_TOKEN` 就讀得到。若預設分支不允許動作直接推送，改手動執行上面的指令，再開拉取請求。

## 如何更新 BOM 零件庫

頁面 `bom.html` 只讀 `data/bom.json`。網頁上的修改只存在那個瀏覽器，要永久保存：在頁面按「匯出 JSON」，用下載的檔案覆蓋 `data/bom.json`，再推上 GitHub。

| 欄位 | 說明 |
| --- | --- |
| `parts[]` | 庫存零件：`id`、`name`、`sku`、`category`、`qty`、`unsure`（數量待確認）、`note`。 |
| `projects[].lines[]` | 專案用料。庫存的零件寫 `partId` 加 `qty`；庫存沒有的寫 `name` 加 `qty`。 |
