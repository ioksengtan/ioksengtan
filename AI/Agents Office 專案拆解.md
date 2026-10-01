# Agents Office 專案拆解

更新日期：2026-09-19  
專案：[ajsahni/agents-office](https://github.com/ajsahni/agents-office)  
研究版本：`3.2.1-beta.1`（repository 於研究當下的版本）

## 一句話判斷

Agents Office 表面上是一座 3D AI 辦公室，真正的產品價值卻是把看不見的 agent 工作流程，轉成使用者能理解、監督和修正的「組織營運介面」。最值得參考的是任務狀態、權限、知識、學習與協作如何被具象化，而不是照抄辦公室造型。

## 從展示畫面看到什麼

使用者提供的畫面是一個經過客製化的實例，標題為 `Blackwood Workforce`，可看到：

- 不同部門被畫成獨立工作島，例如 Talent Marketing、Candidate Hub、Placements & Temps、Compliance、Client Desk、Pay & Bill。
- 每個島同時呈現 agent 數量、任務量及目前狀態。
- 中央的 Brain 將各部門連在一起，暗示共用知識庫，而不是彼此完全隔離的聊天機器人。
- 左側是所選部門／主管及對話，右側是跨部門 Task Status；空間視圖負責「現在誰在做什麼」。
- agent 站起、移動、交件等動畫其實是一種狀態提示，讓背景工作不像黑箱。

這個客製化招募公司版本也說明：同一套固定空間可以換名稱、職責、工具和資料，包裝成特定產業的「AI 公司」。

## 使用流程

```text
使用者輸入任務
    ↓
指定部門，LLM 從部門內挑選 agent
    ↓
從 Brain 選出相關 Markdown 筆記
    ↓
組合角色、brief、skill、歷史修正和工具權限
    ↓
啟動一個獨立 Claude CLI 工作程序
    ↓
更新任務狀態、顯示 agent 活動與工具使用
    ↓
需要外部動作時等待人工核准
    ↓
成果寫回 Brain，成為可追蹤的 Markdown 筆記
```

若選擇 Team 模式，部門主管會先把工作拆成 2–4 個可平行的小任務，分別啟動 Claude session；全部完成後再由主管合併成最終交付物。

## 技術架構

### 前端

- 原生 JavaScript 加 Three.js，呈現等角視角 3D 場景。
- D3 Force 用於 Brain 的筆記關聯圖。
- esbuild 將畫面打包成一個大型 HTML；離線開啟時有 demo mode。
- 工作狀態主要透過 HTTP API 輪詢，任務頁約每 6 秒更新，並非 WebSocket 即時串流。

### 後端

- Node.js 20+ 的單一 HTTP server，沒有大型 Web framework。
- 預設透過本機 Claude Code CLI 的 `claude -p` 執行；也可使用 Anthropic SDK，但 SDK 模式沒有工具能力。
- 一個 agent 工作對應一個 child process；Team 模式同時執行多個 process，再增加一次主管整合呼叫。
- MCP connector 來自本機 `claude mcp list`；可依部門限制 connector。
- 明確禁用 Bash、檔案讀寫、搜尋與 sub-agent 工具，agent 只取得允許的 MCP、網頁及瀏覽器工具。

### 儲存

- `data/tasks.json`：任務與執行狀態。
- Brain：使用者指定的 Markdown 資料夾，也可直接指向 Obsidian vault。
- 完成結果：寫成附有 agent、部門、工具、模型及讀取來源等 metadata 的 Markdown。
- `feedback/<agent>.md`：從修改意見抽出的長期規則與單次修正。
- `skills/<name>/SKILL.md`：流程、格式、規則、範本與適用 agent。
- `routines.json`：排程工作；執行狀態另存，避免污染使用者設定。

### 固定與可變部分

- 固定：六個部門、35 個座位、主管位置及主要空間結構。
- 可變：公司名稱、Brain 路徑、agent 名稱、角色、工作內容、brief、模型、工具、skills。
- 這使客製化容易，但若實際團隊結構不是六部門，就需要修改程式而非只調設定。

## 最值得參考的設計

### 1. 將 agent 的狀態變成可掃讀的空間

空間不是裝飾，而是資訊架構：部門是 context boundary、座位是責任歸屬、中央 Brain 是共同記憶、走動與揮手表示狀態。使用者不用讀 log 就能知道哪裡忙碌、哪裡卡住。

可抽象成更簡單的 UI，不一定需要 3D：

- agent 卡片：idle / queued / working / waiting / done / failed。
- 清楚顯示目前讀了哪些資料、用了哪些工具。
- 需要人工決策時，讓 agent 主動「舉手」。
- 點擊 agent 後看到任務、上下文、輸出及修改歷史。

### 2. Brain 不只是 RAG，而是可檢查的工作記錄

每份結果都寫回 Markdown，並列出讀過的筆記與使用過的工具。這讓知識庫同時是輸入、輸出、稽核紀錄和組織記憶。資料屬於使用者，也能用 Obsidian、Git 或文字編輯器直接處理。

### 3. 把「職位」與「做事方法」分開

- Role／does：這個 agent 負責什麼。
- Brief：長期語氣、禁區與升級條件。
- Skill：特定工作的 SOP、輸出格式、規則與範例。
- Feedback：實際工作中學到的修正。

這種分層比一份超長 system prompt 更容易維護，也能清楚知道應修改哪一層。

### 4. 外部動作採兩階段核准

只讀型工作可以自動完成；涉及寄送、發布、付款、刪除或修改外部系統時，先產生草稿並進入 `WAITING ON APPROVAL`，核准後才執行。這是 agent 產品很重要的信任介面。

### 5. 修正會累積，但仍保持透明

使用者用 `revise:` 提出修正，系統判斷它是本次限定或長期規則，再寫進可編輯的 Markdown。使用者可查看、修改或刪除，而不是讓「記憶」藏在不可見的模型狀態。

### 6. 平行化必須有主管整合

Team 模式不是多開幾個 chat：主管先拆出可獨立工作的部分，每個人看到自己的責任與別人的題目，最後再由主管合併。這比直接把同一問題丟給多個模型更接近可靠的工作分工。

## 不宜直接照搬的地方

### 1. 35 個 agent 容易製造角色膨脹

很多工作其實只需要 3–5 種能力。固定 35 個座位視覺效果強，但可能增加選擇、維護、prompt 與模型路由成本。應由真實重複流程反推 agent，而不是先創造一間大公司。

### 2. 每次路由也是一次模型呼叫

即使任務已指定部門，系統仍用 Sonnet 選 agent、命名、列計畫及判斷是否需核准。簡單任務可先用規則或 embedding 分流，低信心時才交給 LLM。

### 3. Team 模式成本高且可能重複

一次 Team 任務包含規劃、多位 agent 執行和主管整合，至少數次模型呼叫。只適合真正可並行、需要多個視角的工作，不適合線性或很小的任務。

### 4. 關鍵判斷仍部分依賴模型

是否需要核准主要由路由模型輸出 `needs_ok`，另有文字規則作 fallback。更安全的設計應根據實際 tool action 分級，讓高風險工具在執行層強制攔截，而不只靠 prompt 判斷。

### 5. 本機檔案儲存適合個人，未必適合多人

JSON 同步寫入、單一 server、輪詢 UI 與本機 child process 都很適合 prototype；若多人共同使用，需要處理資料庫交易、身份權限、任務佇列、重試、鎖與即時事件。

### 6. 授權限制

專案採 **PolyForm Noncommercial 1.0.0**。可用於個人研究、實驗與非商業用途，但不能直接拿去販售、轉售或做成付費產品。可以研究它的產品概念與一般設計模式；若要商業化，應自行重新實作並另外確認法律界線。

## 可以衍生的點子

### A. Idea Garden：點子不是員工，而是會成長的植物

把這個 repository 視覺化成一座花園：

- 新點子是種子。
- 完成第一次研究後發芽。
- 補上使用者、問題與方案後長葉。
- 做出 prototype 後開花。
- 長期沒有活動的點子進入休眠，而不是被當作失敗。

agent 可以是園丁：研究員、反方、產品設計師、實作者，各自對點子留下可追蹤的養分。

### B. Idea Workshop：從收件匣到實驗的生產線

不用模擬一整間公司，只設五個工作站：

1. Inbox：捕捉原始點子。
2. Research：補資料與既有方案。
3. Challenge：找風險、反例與假設。
4. Shape：整理成使用情境和最小實驗。
5. Build：形成 prototype 任務。

視覺化重點是每個點子卡在哪一站、下一個決策是什麼，而不是有多少 agent。

### C. Personal Council：小型多視角顧問團

只保留四個角色：Explorer、Skeptic、Maker、Editor。需要深入研究時才並行工作，最後由 Editor 合併，成果直接寫回 GitHub。這能保留 Agents Office 的平行協作優點，同時避免 35 個 agent 的複雜度。

### D. Approval Inbox：專門管理 AI 等待人類的決策

建立一個跨工具的統一待核准清單：每張卡都顯示「將要做什麼、對誰、會改變什麼、能否復原、依據哪些資料」。它可以獨立於 3D UI，實用價值甚至可能高於整個虛擬辦公室。

### E. Decision Trace：把成果來源畫成路徑

每份輸出都保留：使用者原始要求 → 路由原因 → 讀取筆記 → 使用工具 → agent 草稿 → 人工修正 → 最終結果。這能讓 agent 的工作變得可解釋，也適合日後比較哪些流程真正有效。

## 建議我們採用的最小版本

先不要做 3D 辦公室，也不要建立大量角色。可先在 idea repository 上建立：

```text
Inbox → Researched → Challenged → Experiment → Archived
```

每個點子是一份 Markdown，front matter 包含：

- `status`
- `category`
- `created`
- `updated`
- `next_action`
- `agents_used`
- `sources`
- `decision_log`

第一階段只需要一個簡單 dashboard，能看到所有點子的階段、最近更新、下一步與卡點。等真的出現多個同時執行的背景 agent，再加入動態角色或 3D 空間；這樣視覺化會反映真實工作，而非先做出漂亮但空洞的場景。

## 相關產品：Munder Difflin（已上線、相同比喻的真實產品）

來源：[munderdiffl.in](https://munderdiffl.in/)（2026-10 版本 0.5.3，GitHub Trending #1、Product Hunt #5、8.2K GitHub stars、10 萬＋下載）。

這是一個已經商業化、公開上線的多代理人協作工具，核心比喻跟 Agents Office 幾乎一致——把多個 CLI coding agent（Claude Code、Codex、Gemini CLI、Copilot、Cursor、Grok 等十餘種）包裝成「一間辦公室」，角色直接借用影集《辦公室》（The Office）人名：

- **Michael**（orchestrator）接收使用者一句話指令，拆解成任務分派給不同「clone」（實際上是真實 CLI agent 的獨立執行個體），完成後互相交接，不需要使用者盯著每個終端機。
- 每個 clone 有自己的 inbox，任務板所有 clone 可讀；遇到需要人判斷的事項集中到一個「Ask me」收件匣。
- 設有 circuit breaker 防止失控燒錢，agent 當機後能在原資料夾重啟、工作進度不丟失。
- **記憶跨 session 留存**：可用白話直接問這個「辦公室」問題，答案來自它自己的歷史紀錄（ticket、memory log）。
- 0.5.3 新增「Stapler」——一個浮動圓形小工具，可語音聽寫（本機轉錄，定位為取代 Granola／Wispr Flow）、錄會議雙方語音、截圖、錄語音訊息，直接餵給 agent。
- **Local-first**：跑在使用者自己電腦上，驅動的是使用者原本就有訂閱的 CLI agent（用既有的小時額度，不另外計費 API），金鑰與程式碼不離開本機；可用 API key 串 GitHub／Linear／Telegram／webhook 喚醒 clone。
- **跨機器端對端加密**：不同機器上的 clone 互相通訊時，訊息在來源端簽署、用目的端金鑰封裝（X25519／XChaCha20／Ed25519），中繼伺服器無法解讀內容。
- 支援多專案：`File → New Floor` 開新樓層對應新專案。

### 跟 Agents Office 的落差

| 面向 | Agents Office（demo） | Munder Difflin（已上線產品） |
| --- | --- | --- |
| agent 本質 | 35 個固定角色，模型驅動的角色扮演 | 真實 CLI agent（Claude Code／Codex／Gemini CLI 等）的獨立執行個體 |
| 成本模式 | 每個任務、路由都另外呼叫模型 | 直接用使用者既有訂閱的小時額度，不二次計費 |
| 記憶 | Brain／skills／feedback／tasks（檔案結構） | 可直接問答的歷史記錄＋ticket／memory log |
| 協作安全 | 未特別著墨 | 多機器端對端加密通訊 |
| 周邊整合 | 無 | Stapler（語音聽寫、錄會議、截圖）、GitHub／Linear／Telegram／webhook 觸發 |
| 視覺化 | 3D 等角辦公室 | 以捲動式網頁敘事呈現（像一天的辦公室時間軸），產品本身是桌面 App 不是 3D 場景 |

最大的啟示是：**把「多 agent 協作」包裝成辦公室／員工比喻，已經被市場驗證是有效的產品敘事**，而且真正落地、讓人願意付費／下載的關鍵不是 3D 場景本身，而是「不用另外付模型費、本機優先、記憶跨 session、失控可煞車」這幾個務實問題解決得好不好。這進一步支持「最小版本」章節的判斷：先把點子狀態／核准佇列／記憶這些底層機制做對，視覺化（無論是 3D 辦公室還是捲動式敘事）都只是其中一種呈現方式。

### 垂直產業客製案例：招募仲介

來源：IG 貼文展示一個「Agents Office V3 — Blackwood Workforce」客製版本，作者留言稱「this is a custom-built... comment 'office' and I'll send the agents office repo」，確認同一套辦公室視覺模板已被改造成特定產業的客製部署，而非只是通用 demo。

這個版本把部門改成招募仲介的實際業務線：Candidate Hub、Talent Marketing、Placements & Temps、Client Desk、Compliance、Pay & Bill，各自顯示人數／任務量，旁邊一欄 Task Status 列出具體待辦（例如「Order checks on the eleven new candidates」「Manage the top CD on the staff department last year」）。功能清單直接對應真實招募工作：客製化獵頭、領域專家篩選（作者特別強調「no random AI logic for this」，暗示這塊用規則式邏輯而非純 LLM 判斷）、維護人才庫並保持資料更新、處理 FTE／派遣／特殊職缺的大部分行政作業、協助行銷（但坦承這塊目前只能「協助」，還做不到完全自動化）。

**這點證實了上面「落差表」的推論**：同一套「辦公室」視覺框架可以換皮套用到不同產業（通用版 vs 招募仲介版），代表這個比喻本身有一定的可複製性；但也印證了限制所在——連原作者都老實承認「行銷」這種判斷性高、少明確規則的任務還做不到自動化，只能算輔助，呼應 Agents Office 筆記中「關鍵判斷仍部分依賴模型」的提醒。

## 最終評價

Agents Office 最強的不是 AI 技術創新，而是把 agent orchestration 做成一套具有人類組織隱喻的產品介面。它證明了三件事：

1. 使用者需要看到 agent 的責任與狀態，不只看到聊天訊息。
2. 個人檔案可以同時充當知識庫、記憶與稽核軌跡。
3. 自動化越強，人工核准、修正記憶與工具透明度越重要。

對我們而言，最值得採用的是「點子狀態＋可見的下一步＋研究來源＋決策軌跡」，而不是複製 35 人的 3D 辦公室。

## 主要來源

- [Agents Office README](https://github.com/ajsahni/agents-office)
- [原始碼目錄](https://github.com/ajsahni/agents-office/tree/main/src)
- [Server implementation](https://github.com/ajsahni/agents-office/blob/main/serve.mjs)
- [Agent teams implementation](https://github.com/ajsahni/agents-office/blob/main/teams.mjs)
- [Munder Difflin 官網](https://munderdiffl.in/)（同比喻的已上線競品）
- [License](https://github.com/ajsahni/agents-office/blob/main/LICENSE)

