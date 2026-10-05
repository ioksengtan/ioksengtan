# Bot Crossing 專案拆解

更新日期：2026-09-19  
專案：[Station-Sciences/bot-crossing](https://github.com/Station-Sciences/bot-crossing)  
研究版本：`1.0.0`（repository 於研究當下的版本）

## 一句話判斷

Bot Crossing 是一個把本機 coding-agent 工作階段變成 3D 殖民地的唯讀監控器。每個 repository 是一塊領地、每個 thread 是一個 bot 與建築、sub-agent 是外出跑腿的小 bot。它真正解決的問題不是「讓 AI 看起來可愛」，而是讓使用者一眼找到：誰正在工作、誰失敗了、誰正在等我，以及工作散落在哪些工具中。

## 它實際做什麼

Bot Crossing 讀取電腦上各 coding-agent 工具留下的本機 session／transcript，再統一轉換成殖民地畫面。研究當下 README 列出的支援包含：

- Claude Code
- Codex（desktop、VS Code、CLI）
- OpenCode
- Antigravity CLI
- Cursor
- Hermes
- Kilo Code

它不建立或執行 agent，也不修改這些工具的工作內容。畫面只是現有工作的觀察層；點擊 bot 時，才透過各工具的 deep link 或 CLI 將 thread 交回原本的應用程式。

## 資訊如何映射成世界

| 殖民地中的東西 | 實際代表 |
| --- | --- |
| 一個 hex zone | 一個 repository／工作目錄 |
| 一個 bot 與建築 | 一個 agent thread／session |
| 沒有自己建築的小 bot | 該 thread 目前啟動的 sub-agent |
| 建築完成度 | transcript 大小的對數尺度 |
| 鷹架 | session 正在執行 |
| bot 敲打建築 | thread 正在工作 |
| bot 舉起 `?` | 有新內容或正在等待使用者 |
| bot 紅眼、低頭及 `!` | 執行出錯 |
| 跳躍與彩帶 | PR 已合併 |
| 睡覺 | 三天沒有活動 |
| bot 走回太空船 | thread 被封存 |

這套映射比 Agents Office 更忠實：它不是用角色扮演表達工作，而是將真實 session metadata 轉成遊戲狀態。

## 核心流程

```text
定期掃描各 harness 的本機資料
    ↓
每個 adapter 轉成統一 Thread 格式
    ↓
合併、去重並推導 running / unread / error / subagents
    ↓
依 project 分組，套用已保存的區域位置
    ↓
前端用 Three.js 呈現世界和 bot 行為
    ↓
使用者點擊 bot
    ↓
deep link 或 terminal 將 thread 在原工具中打開
```

## 技術架構

### 前端

- Vite 加 Three.js，沒有大型 UI framework。
- 地形、天空、水面、氣候、日夜循環、角色、建築、尋路與碰撞多為自行實作。
- bot 使用導航網格、A* 和 path smoothing 繞過建築；另有逐步碰撞與角色分離，避免穿牆或疊在一起。
- 針對手機提供底部 sheet、觸控縮放和平移，並預設較低畫質。

### 本機服務

- Node.js 22.13+。
- API 整合在 Vite dev server；正式版以小型 Node server 提供 build 和 API。
- 預設只綁定 `127.0.0.1`。
- 除 loopback 限制外，狀態變更請求還檢查 Host 與 Origin，降低 DNS rebinding 和 CSRF 風險。
- 讀取各 agent 工具的 session store、JSONL transcript 或 SQLite 資料庫；以 mtime 與檔案大小做 cache，避免重複解析大型 transcript。

### Harness adapter

每個工具由 `server/harnesses/` 下的一個 adapter 負責。主要介面只有：

- `detect()`：這台電腦是否安裝或使用該工具。
- `scanThreads()`：回傳標準化的 `Thread[]`。
- `openThread(ref)`：產生 deep link 或 CLI command。
- `newSession(dir)`：在指定目錄開新 session。
- 選用的 `diagnostic()`：解釋為何偵測到工具卻讀不到資料。

標準 Thread 包含 id、title、project、路徑、worktree、branch、model、activity time、running、unread、error、archived、transcript size、subagents 和不透明的 `ref`。這層抽象是整個專案最值得借鑑的工程設計。

### 寫入原則

- 唯一主動寫入的是自己的 `data/colony.json`，用來保存版面、隱藏和 Bot Crossing 內部的封存狀態。
- 不修改其他 agent harness 的 transcript 或 session record。
- 打開 thread 是唯一允許啟動外部 command 的地方；其他掃描工作不啟動 subprocess。
- 專案曾嘗試直接修改 Claude session 的封存旗標，但因桌面 app 會用記憶中的舊狀態覆寫，最後明確改回唯讀設計。

## 最值得參考的設計

### 1. 觀察層和執行層完全分開

Bot Crossing 不成為另一套 agent 平台，而是觀察既有工具。這避免複製登入、模型、權限、context 和 tool orchestration，也讓使用者可以繼續在最適合的工具中工作。

可套用到我們的做法：Idea dashboard 可以讀 Git repository、Codex tasks 與 Markdown 狀態，但不要一開始就負責執行所有工作。

### 2. 只突出真正需要注意的狀態

只有 errored、running、merged 和 unread 等少數狀態會出現徽章；大量安靜 thread 不會滿頭符號。這是一個很好的注意力設計：dashboard 的責任不是證明自己有很多資料，而是幫人找到下一個需要處理的地方。

### 3. 穩定空間形成記憶

repository zone 一旦放置便盡量保持原位；新增 thread 只擴張鄰近格子，不重新洗牌整張地圖。使用者能逐漸記住「某個專案在左上方」，形成類似實體桌面的空間記憶。

這點可轉成非 3D 介面：分類、專案或點子應保持穩定位置，不要每次依最新更新重新大幅排序。

### 4. Adapter 是兼容性的正確邊界

每個 agent 工具的檔案格式、狀態推導和開啟方式都不相同，但前端只認標準 Thread。新增工具應只增加 adapter，不修改 scanner 或 UI。這種 anti-corruption layer 讓快速變動的外部格式不污染核心產品。

### 5. 用行為表達狀態，而不只是換顏色

工作中的 bot 施工、錯誤時垂頭、等待時舉牌、完成時慶祝。狀態透過姿勢、動作和物件同時表達，比單純紅黃綠更易辨識，也較適合色覺差異的使用者。

### 6. 建築保留「工作累積感」

transcript 越大，建築越完整。雖然它不等於真實進度，但可以讓完成的工作在世界裡留下痕跡。這比做完就從 queue 消失更能建立成就感和長期視覺記憶。

### 7. 用 deep link 把人送回正確工具

dashboard 不試圖重做完整對話介面。它負責發現與導航，真正回覆或修改時則打開原始 thread。這是範圍控制做得很好的地方。

## 需要小心的限制

### 1. Transcript 大小不等於完成度

長對話可能只是來回失敗，短對話也可能一次完成。建築高度適合作為「投入量」或「歷史量」，不應被命名為進度百分比。

### 2. 狀態多半是推導而非正式 API

不同 harness 對 running、unread、error 的資料品質不同。有些可由 lifecycle event 判斷，有些只能靠檔案時間與最近紀錄猜測；工具一更新本機格式，adapter 就可能失效。

### 3. 唯讀仍涉及隱私

雖然沒有資料上傳，服務仍會讀取 title、prompt、路徑、branch、model 和 transcript metadata。應清楚說明讀取範圍、避免將內容寫入 log，並維持 localhost、Origin 驗證和最小解析原則。

### 4. 3D 會帶來龐大非核心成本

世界生成、shader、水面、天氣、鏡頭、尋路、碰撞、手機效能和資產管線佔了大量程式碼。若主要目標只是 attention triage，2D 地圖或卡片看板會更快驗證需求。

### 5. 各工具能力不對稱

有些 harness 能準確開啟 thread、知道是否 unread 或抓到 sub-agent；有些只能顯示基本 session。統一 UI 必須誠實表達「未知」，不能把缺資料當作 false。

### 6. 維護承諾有限

作者明確表示專案以現況發布，不能保證持續維護。好消息是採 MIT License，允許修改、發行與商業使用，但若依賴它，最好預期自行維護 adapter。

## 與 Agents Office 的差異

| 面向 | Agents Office | Bot Crossing |
| --- | --- | --- |
| 主要用途 | 建立、分派並執行商務 agent 工作 | 觀察既有 coding-agent sessions |
| 是否呼叫模型 | 會，每個任務、路由和團隊均會 | 不會 |
| agent 來源 | 系統內固定角色 | 本機各工具中真實存在的 threads |
| 資料來源 | Brain、skills、feedback、tasks | harness session store 與 transcripts |
| 外部工具 | MCP／瀏覽器，由 agent 操作 | deep link／CLI，只用於回到原 thread |
| 主要隱喻 | 一間 AI 公司 | 一個持續成長的殖民地 |
| 核心價值 | orchestration、知識與核准 | awareness、attention 與 navigation |
| 授權 | PolyForm Noncommercial | MIT |
| 主要風險 | 成本、權限、角色過多 | 格式易變、狀態推導、3D 維護成本 |

兩者並不是競品。Agents Office 是 control plane；Bot Crossing 是 observability plane。理想產品甚至可以同時具有兩者，但應先把觀察與執行的權限邊界分開。

## 對 Idea repository 可衍生的點子

### A. Idea Crossing：每個點子是一個小島

- 分類是群島，點子是島上的建築。
- 研究資料越多，建築不是越「完成」，而是越「有脈絡」。
- 等待決策的點子舉 `?`，研究矛盾顯示 `!`，正在做 prototype 顯示施工。
- 點擊後直接開啟 repository 裡的 Markdown，而不是在地圖內重做編輯器。

### B. Attention Radar：只回答「現在需要我看哪裡」

整合本機 Codex tasks 與 idea Markdown，顯示：

- 等待回覆或核准。
- 執行失敗。
- 有新研究結果尚未閱讀。
- 長期擱置但仍有明確 next action。

這可能比完整的 3D Idea Garden 更有實際價值，也能先用簡單列表完成。

### C. Universal Work Adapter

定義一個通用的本機工作項目格式：

```text
id, source, project, title, status, needsAttention,
lastActivityAt, progressSignal, openTarget, metadata
```

先支援 GitHub repository 中的 Markdown 點子與 Codex tasks；以後再加入其他來源。核心 UI 不知道來源的儲存格式，只呼叫 adapter。

### D. Stable Idea Map

即使點子更新，位置也保持不動；只有分類改變時才搬家。新點子從各分類中心向外生長。這能保留 Bot Crossing 最強的空間記憶，而不必複製複雜的殖民地模擬。

### E. Activity Residue

研究或實驗完成後留下可見痕跡，例如來源數、prototype、重要決策和最後一次修正，而不是只留一個 `done` 標籤。歷史累積會讓使用者看到自己的思考世界逐漸形成。

## 建議採用順序

1. 先建立 `WorkItem`／`IdeaItem` adapter schema。
2. 從 repository Markdown 讀取 status、next action、updated、sources。
3. 加入 Codex task adapter，只做唯讀聚合與「開啟原 task」。
4. 先做 2D attention list：Waiting、Failed、Active、Dormant。
5. 驗證確實能減少遺忘與切換成本後，再做穩定的空間地圖。
6. 最後才加入角色動畫、環境與遊戲化累積。

## 最終評價

Bot Crossing 的核心洞見比它的視覺外觀更好：當 AI 工作散落在多個工具與 thread，人需要的不是另一個聊天框，而是一個安靜、可信任的全局視圖。它最值得借鑑的是：

1. 觀察與執行分離。
2. 以 adapter 統一多個快速變動的 agent 工具。
3. 只突出需要人介入的狀態。
4. 用穩定空間建立長期記憶。
5. 將使用者送回原始工具，而不是吞掉整個工作流程。

對我們來說，下一步最值得做的是 `Attention Radar + Universal Work Adapter`，比直接打造 3D 世界更容易驗證，也能成為日後 Idea Garden 的可靠資料層。

## 主要來源

- [Bot Crossing README](https://github.com/Station-Sciences/bot-crossing)
- [Harness adapter interface](https://github.com/Station-Sciences/bot-crossing/blob/main/server/harnesses/README.md)
- [Design decisions](https://github.com/Station-Sciences/bot-crossing/blob/main/DECISIONS.md)
- [Server source](https://github.com/Station-Sciences/bot-crossing/tree/main/server)
- [MIT License](https://github.com/Station-Sciences/bot-crossing/blob/main/LICENSE)

