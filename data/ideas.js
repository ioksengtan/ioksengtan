/* Generated from b1156fb5794ce60e070e5716714f28808c1cb999; run node scripts/build-ideas.cjs <idea-clone>. */
window.IDEA_SNAPSHOT = [
  {
    "source": "AI/卡片大小本地大模型電腦選型.md",
    "title": "卡片大小本地大模型電腦選型",
    "category": "AI",
    "summary": "「卡片大小」和「能跑大模型」需要先定義：信用卡約為 85.6 × 54 mm，但開發板加上散熱、電源、儲存和外殼後通常都會超過這個尺寸。在這個體積內，實際合理的目標是本機執行 1–8B 參數的量化模型，而不是桌機等級的 30B、70B 模型。",
    "more": "推薦順序：\n\n1. Jetson Orin Nano Super 8GB：7–8B、VLM、相機 AI 和成熟 GPU 生態的首選。\n2. Orange Pi 5 Pro 16GB：尺寸最接近卡片、記憶體夠大，適合低成本 ARM 本機 LLM。\n3. Khadas Edge2 16GB：更精緻緊湊的 RK3588S 選擇，官方提供 NPU LLM 安裝流程。\n4. Raspberry Pi 5 16GB：最好上手、社群最大，但 LLM 主要靠 CPU，速度不是強項。\n5. LattePanda Mu 16GB：需要 x86／Windows 軟體時選擇，但必須搭配 carrier board。\n6. LattePanda Mu Ultra 16GB：體積小且 AI 能力高，但電源、散熱、carrier 與成本都更接近迷你 PC 專案。\n\n模型範圍不是硬性上限；context 長度、KV cache、量化方式、runtime 和是否將部分運算 offload 到 GPU／NPU 都會改變結果。「能載入」也不等於互動速度好用。",
    "model": 0,
    "theme": "ai",
    "url": "https://github.com/ioksengtan/idea/blob/main/AI/%E5%8D%A1%E7%89%87%E5%A4%A7%E5%B0%8F%E6%9C%AC%E5%9C%B0%E5%A4%A7%E6%A8%A1%E5%9E%8B%E9%9B%BB%E8%85%A6%E9%81%B8%E5%9E%8B.md"
  },
  {
    "source": "Maker/M5Stack研究.md",
    "title": "M5Stack 研究筆記",
    "category": "Maker",
    "summary": "M5Stack 是一套以 ESP32 系列晶片為主的模組化開發生態，把螢幕、按鍵、電池、感測器、外殼與擴充介面整合成可直接使用的產品，適合快速完成 IoT、智慧家庭、互動裝置、隨身工具與 AI 語音介面的原型。",
    "more": "- 一般 ESP32 板通常需要自行配螢幕、電池、感測器、接線和外殼；M5Stack 多數產品已整合這些零件。\n- 周邊依形態分為可堆疊模組、Grove 接頭的 Unit，以及針對 Stick、Atom 等系列設計的配件。\n- 同時支援低程式門檻的 UiFlow2、一般 Maker 常用的 Arduino／PlatformIO，以及較底層的 ESP-IDF。\n- M5Unified 提供跨多款控制器的統一 API，處理螢幕、觸控、按鍵、喇叭、麥克風等內建硬體，降低更換型號的成本。\n\n- ESP32-S3，雙核心 240 MHz、16 MB Flash、8 MB PSRAM。\n- 2 吋 320 × 240 觸控螢幕，另有相機、距離／環境光感測、IMU、磁力計、RTC、microSD、雙麥克風與喇叭。\n- 適合做帶 UI、語音、影像或感測功能的完整桌面原型。\n- 優點是一次取得大部分常用硬體；缺點是若只是做單一感測節點，成本與體積都可能過高。\n\n- 體積很小，適合藏進成品；Lite 適合無螢幕節點，帶螢幕版本適合顯示簡單狀態。\n- 可搭配 Atom 專用 RS485、CAN、繼電器、馬達、PoE、GPS 等底座或配件。\n- 適合智慧家庭按鈕、感測器、設備控制與分散式 IoT 節點。",
    "model": 1,
    "theme": "sensing",
    "url": "https://github.com/ioksengtan/idea/blob/main/Maker/M5Stack%E7%A0%94%E7%A9%B6.md"
  },
  {
    "source": "Maker/今日鳥訪客電子紙畫框.md",
    "title": "今日鳥訪客電子紙畫框",
    "category": "Maker",
    "summary": "在窗邊放置麥克風，以鳥叫聲辨識附近出現的鳥種，再把「今天聽到的鳥」排成自然圖鑑／花鳥畫風格的拼貼，顯示在客廳的彩色電子紙畫框上。",
    "more": "它不是另一個充滿數字的環境監測器，而是把不可見的聲音資料轉化成每天都不同的居家藝術品：人經過畫框時，可以知道今天有哪些鳥曾經來到生活周遭。",
    "model": 2,
    "theme": "sensing",
    "url": "https://github.com/ioksengtan/idea/blob/main/Maker/%E4%BB%8A%E6%97%A5%E9%B3%A5%E8%A8%AA%E5%AE%A2%E9%9B%BB%E5%AD%90%E7%B4%99%E7%95%AB%E6%A1%86.md"
  },
  {
    "source": "Maker/ESP32超音波掃描避障車.md",
    "title": "ESP32 超音波掃描避障車",
    "category": "Maker",
    "summary": "製作一台以 ESP32 為控制核心的四輪自主小車，在車頭將超音波距離感測器安裝於微型 servo 上。感測器可以像頭部一樣左右轉動，量測不同方向的距離，再決定前進、停止、倒車或轉向。",
    "more": "相較於在車頭固定一顆距離感測器，旋轉掃描能用較少感測器取得左、中、右三個方向的資訊，也讓機器人的判斷過程容易被人看懂。",
    "model": 3,
    "theme": "sensing",
    "url": "https://github.com/ioksengtan/idea/blob/main/Maker/ESP32%E8%B6%85%E9%9F%B3%E6%B3%A2%E6%8E%83%E6%8F%8F%E9%81%BF%E9%9A%9C%E8%BB%8A.md"
  },
  {
    "source": "Maker/3D列印迷你RC車模組化底盤.md",
    "title": "3D 列印迷你 RC 車模組化底盤",
    "category": "Maker",
    "summary": "設計一套主要零件皆可 3D 列印的迷你 RC 車底盤，使用常見的微型直流減速馬達、SG90 類 servo、金屬軸與小輪胎。底盤不要以膠水永久組裝，而是在受力和需要反覆拆裝的位置使用金屬螺牙嵌件、螺絲與可替換模組。",
    "more": "這個點子的價值不只是一台小車，而是一個可快速更換馬達、轉向機構、軸距和車體的實驗平台。",
    "model": 4,
    "theme": "maker",
    "url": "https://github.com/ioksengtan/idea/blob/main/Maker/3D%E5%88%97%E5%8D%B0%E8%BF%B7%E4%BD%A0RC%E8%BB%8A%E6%A8%A1%E7%B5%84%E5%8C%96%E5%BA%95%E7%9B%A4.md"
  },
  {
    "source": "Maker/桌上型縮景越野場.md",
    "title": "桌上型縮景越野場",
    "category": "Maker",
    "summary": "製作一座可以實際駕駛迷你遙控車的「大自然縮景」。它不是固定的模型展示，而是一個可遊玩的微型戶外世界：沙灘、叢林、溪谷、泥地、岩場與木橋都能成為路線的一部分。",
    "more": "每位顧客可以：\n\n- 帶自己的迷你 RC 車進場。\n- 現場租車或試駕不同車型。\n- 自由探索地形，不一定要競速。\n- 參加計時、越障、尋寶或團隊救援任務。\n- 拍攝像真實戶外越野旅行的低視角影片。",
    "model": 5,
    "theme": "maker",
    "url": "https://github.com/ioksengtan/idea/blob/main/Maker/%E6%A1%8C%E4%B8%8A%E5%9E%8B%E7%B8%AE%E6%99%AF%E8%B6%8A%E9%87%8E%E5%A0%B4.md"
  },
  {
    "source": "Maker/韓屋迷你氛圍燈.md",
    "title": "韓屋迷你氛圍燈",
    "category": "Maker",
    "summary": "以現成圓形 LED puck light／櫥櫃燈作為光源與電源模組，外面套上一座 3D 列印的韓屋或東亞傳統建築模型，製作成可拆卸、免配線的桌上氛圍燈。",
    "more": "燈具本身負責發光、開關、充電或更換電池；3D 列印件只負責造型、固定與擴散光線。這種分工能大幅降低電子設計門檻，也方便更換建築外觀。",
    "model": 6,
    "theme": "maker",
    "url": "https://github.com/ioksengtan/idea/blob/main/Maker/%E9%9F%93%E5%B1%8B%E8%BF%B7%E4%BD%A0%E6%B0%9B%E5%9C%8D%E7%87%88.md"
  },
  {
    "source": "hot-stir-fry/README.md",
    "title": "熱炒開店啦！ v0.3",
    "category": "hot-stir-fry",
    "summary": "單人 2D 俯視角熱炒店原型，使用原生 Canvas、JavaScript 與 CSS。所有場景與料理插圖均為原創 Canvas／SVG 繪圖，不依賴外部素材、套件或網路服務。",
    "more": "- 統一描邊、投影與材質：不鏽鋼檯面、木砧板、食材籃、保冷箱、飯鍋與陶瓷餐盤。\n- 增加條紋遮雨棚、燈籠、招牌、黑板菜單、抽油煙罩、磁磚、排水槽及門口盆栽。\n- 外側用餐區有三張圓桌、紅塑膠椅及營業時入座的客人；裝飾不改變廚房碰撞與操作動線。\n- 重繪主廚帽、圍裙、表情、面向、步伐與拿盤姿勢。\n- 按住 F 切料會出現菜刀動作；成功翻炒會拋鍋與拋料；熟菜冒蒸氣、焦鍋冒煙，出餐有送到對應桌次的動畫。\n- 四道菜在菜單上使用獨立 SVG 插圖；場景中的餐點以同一套色彩與造型繪製。\n- 暫停會停止效果時間；重玩或切換關卡會清空動畫。所有效果只反映遊戲狀態，不影響計分。\n\n直接以桌面瀏覽器開啟 index.html 即可遊玩，無需安裝套件。\n\n也可在本資料夾執行：",
    "model": 7,
    "theme": "food",
    "url": "https://github.com/ioksengtan/idea/blob/main/hot-stir-fry/README.md"
  },
  {
    "source": "Maker/機械肢體.md",
    "title": "機械肢體",
    "category": "Maker",
    "summary": "目前收斂方向不是「做一隻義肢」，而是 手可玩、可展示的「能變換的機械敘事物件」：同一具骨架，透過可換關節／外殼／模組，換出不同地區、章節或能力。",
    "more": "「機械肢體」在這裡比較像隱喻：\n\n- 肢體＝共用骨架與關節邏輯\n- 換肢／換殼＝換敘事面、換地區、換功能\n- 尺度＝桌上、教室、紀念物，不是工廠產線或醫療義肢\n\n- Flexagon comic（cywhitling）：翻折換分鏡，故事藏在幾何裡\n- Sunrise from Blinds（avisualwhisper）：紙房間＋百葉窗拉動機構，滑動背景換日出／城市景",
    "model": 8,
    "theme": "maker",
    "url": "https://github.com/ioksengtan/idea/blob/main/Maker/%E6%A9%9F%E6%A2%B0%E8%82%A2%E9%AB%94.md"
  },
  {
    "source": "Design/互動式咖啡店手繪平面圖.md",
    "title": "互動式咖啡店手繪平面圖",
    "category": "Design",
    "summary": "以手繪黑白線稿製作咖啡店俯視平面圖，但不只是靜態空間示意：門可以逐步打開、菜單可以展開、植物可以澆水、洗手台可以出現使用狀態、蛋糕可以被取走。使用者在手機上點擊場景中的物件，就能看到短動畫或狀態變化。",
    "more": "這是一種介於以下形式之間的作品：\n\n- 室內空間提案。\n- 手繪資訊圖。\n- 互動式繪本。\n- Point-and-click 小遊戲。\n- 品牌網站或社群宣傳內容。",
    "model": 9,
    "theme": "food",
    "url": "https://github.com/ioksengtan/idea/blob/main/Design/%E4%BA%92%E5%8B%95%E5%BC%8F%E5%92%96%E5%95%A1%E5%BA%97%E6%89%8B%E7%B9%AA%E5%B9%B3%E9%9D%A2%E5%9C%96.md"
  },
  {
    "source": "Maker/可程式化電子活動識別證.md",
    "title": "可程式化電子活動識別證",
    "category": "Maker",
    "summary": "把活動識別證從一次性的姓名卡，變成一台可程式化、可互動、活動結束後仍能繼續使用的掌上開發裝置。它同時可以是：",
    "more": "- 姓名與個人資料展示。\n- 議程、場地與通知工具。\n- 與其他參加者互動的社交裝置。\n- 尋寶、闖關與遊戲平台。\n- 工作坊教材與 hackathon 開發板。\n- 活動結束後帶回家的紀念品。\n\n照片裡上半部仍保留紙本姓名牌與 QR code，下半部是彩色螢幕裝置。這種混合設計很好：入場與身份識別不必依賴電子系統，電子 badge 則專注在互動和可玩性。",
    "model": 10,
    "theme": "creative",
    "url": "https://github.com/ioksengtan/idea/blob/main/Maker/%E5%8F%AF%E7%A8%8B%E5%BC%8F%E5%8C%96%E9%9B%BB%E5%AD%90%E6%B4%BB%E5%8B%95%E8%AD%98%E5%88%A5%E8%AD%89.md"
  },
  {
    "source": "AI/Agents Office 專案拆解.md",
    "title": "Agents Office 專案拆解",
    "category": "AI",
    "summary": "Agents Office 表面上是一座 3D AI 辦公室，真正的產品價值卻是把看不見的 agent 工作流程，轉成使用者能理解、監督和修正的「組織營運介面」。最值得參考的是任務狀態、權限、知識、學習與協作如何被具象化，而不是照抄辦公室造型。",
    "more": "使用者提供的畫面是一個經過客製化的實例，標題為 Blackwood Workforce，可看到：\n\n- 不同部門被畫成獨立工作島，例如 Talent Marketing、Candidate Hub、Placements & Temps、Compliance、Client Desk、Pay & Bill。\n- 每個島同時呈現 agent 數量、任務量及目前狀態。\n- 中央的 Brain 將各部門連在一起，暗示共用知識庫，而不是彼此完全隔離的聊天機器人。\n- 左側是所選部門／主管及對話，右側是跨部門 Task Status；空間視圖負責「現在誰在做什麼」。\n- agent 站起、移動、交件等動畫其實是一種狀態提示，讓背景工作不像黑箱。\n\n這個客製化招募公司版本也說明：同一套固定空間可以換名稱、職責、工具和資料，包裝成特定產業的「AI 公司」。",
    "model": 11,
    "theme": "ai",
    "url": "https://github.com/ioksengtan/idea/blob/main/AI/Agents%20Office%20%E5%B0%88%E6%A1%88%E6%8B%86%E8%A7%A3.md"
  },
  {
    "source": "AI/Bot Crossing 專案拆解.md",
    "title": "Bot Crossing 專案拆解",
    "category": "AI",
    "summary": "Bot Crossing 是一個把本機 coding-agent 工作階段變成 3D 殖民地的唯讀監控器。每個 repository 是一塊領地、每個 thread 是一個 bot 與建築、sub-agent 是外出跑腿的小 bot。它真正解決的問題不是「讓 AI 看起來可愛」，而是讓使用者一眼找到：誰正在工作、誰失敗了、誰正在等我，以及工作散落在哪些工具中。",
    "more": "Bot Crossing 讀取電腦上各 coding-agent 工具留下的本機 session／transcript，再統一轉換成殖民地畫面。研究當下 README 列出的支援包含：\n\n- Claude Code\n- Codex（desktop、VS Code、CLI）\n- OpenCode\n- Antigravity CLI\n- Cursor\n- Hermes\n- Kilo Code\n\n它不建立或執行 agent，也不修改這些工具的工作內容。畫面只是現有工作的觀察層；點擊 bot 時，才透過各工具的 deep link 或 CLI 將 thread 交回原本的應用程式。",
    "model": 12,
    "theme": "ai",
    "url": "https://github.com/ioksengtan/idea/blob/main/AI/Bot%20Crossing%20%E5%B0%88%E6%A1%88%E6%8B%86%E8%A7%A3.md"
  }
];
