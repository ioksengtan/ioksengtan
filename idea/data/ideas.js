/* Generated from ec4e3552b904aba6927705c95e18498879ee89ab; run node idea/scripts/build-ideas.cjs from the site root. */
window.IDEA_SNAPSHOT = [
  {
    "source": "Maker/M5Stack研究.md",
    "title": "M5Stack 研究筆記",
    "category": "Maker",
    "summary": "M5Stack 是一套以 ESP32 系列晶片為主的模組化開發生態，把螢幕、按鍵、電池、感測器、外殼與擴充介面整合成可直接使用的產品，適合快速完成 IoT、智慧家庭、互動裝置、隨身工具與 AI 語音介面的原型。",
    "more": "- 一般 ESP32 板通常需要自行配螢幕、電池、感測器、接線和外殼；M5Stack 多數產品已整合這些零件。\n- 周邊依形態分為可堆疊模組、Grove 接頭的 Unit，以及針對 Stick、Atom 等系列設計的配件。\n- 同時支援低程式門檻的 UiFlow2、一般 Maker 常用的 Arduino／PlatformIO，以及較底層的 ESP-IDF。\n- M5Unified 提供跨多款控制器的統一 API，處理螢幕、觸控、按鍵、喇叭、麥克風等內建硬體，降低更換型號的成本。\n\n- ESP32-S3，雙核心 240 MHz、16 MB Flash、8 MB PSRAM。\n- 2 吋 320 × 240 觸控螢幕，另有相機、距離／環境光感測、IMU、磁力計、RTC、microSD、雙麥克風與喇叭。\n- 適合做帶 UI、語音、影像或感測功能的完整桌面原型。\n- 優點是一次取得大部分常用硬體；缺點是若只是做單一感測節點，成本與體積都可能過高。\n\n- 體積很小，適合藏進成品；Lite 適合無螢幕節點，帶螢幕版本適合顯示簡單狀態。\n- 可搭配 Atom 專用 RS485、CAN、繼電器、馬達、PoE、GPS 等底座或配件。\n- 適合智慧家庭按鈕、感測器、設備控制與分散式 IoT 節點。",
    "model": 1,
    "theme": "sensing",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Maker/M5Stack%E7%A0%94%E7%A9%B6.md",
    "addedAt": "2026-09-18"
  },
  {
    "source": "Maker/機械肢體.md",
    "title": "機械肢體",
    "category": "Maker",
    "summary": "目前收斂方向不是「做一隻義肢」，而是 手可玩、可展示的「能變換的機械敘事物件」：同一具骨架，透過可換關節／外殼／模組，換出不同地區、章節或能力。",
    "more": "「機械肢體」在這裡比較像隱喻：\n\n- 肢體＝共用骨架與關節邏輯\n- 換肢／換殼＝換敘事面、換地區、換功能\n- 尺度＝桌上、教室、紀念物，不是工廠產線或醫療義肢\n\n- Flexagon comic（cywhitling）：翻折換分鏡，故事藏在幾何裡\n- Sunrise from Blinds（avisualwhisper）：紙房間＋百葉窗拉動機構，滑動背景換日出／城市景",
    "model": 8,
    "theme": "maker",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Maker/%E6%A9%9F%E6%A2%B0%E8%82%A2%E9%AB%94.md",
    "addedAt": "2026-09-19"
  },
  {
    "source": "AI/Agents Office 專案拆解.md",
    "title": "Agents Office 專案拆解",
    "category": "AI",
    "summary": "Agents Office 表面上是一座 3D AI 辦公室，真正的產品價值卻是把看不見的 agent 工作流程，轉成使用者能理解、監督和修正的「組織營運介面」。最值得參考的是任務狀態、權限、知識、學習與協作如何被具象化，而不是照抄辦公室造型。",
    "more": "使用者提供的畫面是一個經過客製化的實例，標題為 Blackwood Workforce，可看到：\n\n- 不同部門被畫成獨立工作島，例如 Talent Marketing、Candidate Hub、Placements & Temps、Compliance、Client Desk、Pay & Bill。\n- 每個島同時呈現 agent 數量、任務量及目前狀態。\n- 中央的 Brain 將各部門連在一起，暗示共用知識庫，而不是彼此完全隔離的聊天機器人。\n- 左側是所選部門／主管及對話，右側是跨部門 Task Status；空間視圖負責「現在誰在做什麼」。\n- agent 站起、移動、交件等動畫其實是一種狀態提示，讓背景工作不像黑箱。\n\n這個客製化招募公司版本也說明：同一套固定空間可以換名稱、職責、工具和資料，包裝成特定產業的「AI 公司」。",
    "model": 11,
    "theme": "ai",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/AI/Agents%20Office%20%E5%B0%88%E6%A1%88%E6%8B%86%E8%A7%A3.md",
    "addedAt": "2026-09-19"
  },
  {
    "source": "AI/Bot Crossing 專案拆解.md",
    "title": "Bot Crossing 專案拆解",
    "category": "AI",
    "summary": "Bot Crossing 是一個把本機 coding-agent 工作階段變成 3D 殖民地的唯讀監控器。每個 repository 是一塊領地、每個 thread 是一個 bot 與建築、sub-agent 是外出跑腿的小 bot。它真正解決的問題不是「讓 AI 看起來可愛」，而是讓使用者一眼找到：誰正在工作、誰失敗了、誰正在等我，以及工作散落在哪些工具中。",
    "more": "Bot Crossing 讀取電腦上各 coding-agent 工具留下的本機 session／transcript，再統一轉換成殖民地畫面。研究當下 README 列出的支援包含：\n\n- Claude Code\n- Codex（desktop、VS Code、CLI）\n- OpenCode\n- Antigravity CLI\n- Cursor\n- Hermes\n- Kilo Code\n\n它不建立或執行 agent，也不修改這些工具的工作內容。畫面只是現有工作的觀察層；點擊 bot 時，才透過各工具的 deep link 或 CLI 將 thread 交回原本的應用程式。",
    "model": 12,
    "theme": "ai",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/AI/Bot%20Crossing%20%E5%B0%88%E6%A1%88%E6%8B%86%E8%A7%A3.md",
    "addedAt": "2026-09-19"
  },
  {
    "source": "AI/卡片大小本地大模型電腦選型.md",
    "title": "卡片大小本地大模型電腦選型",
    "category": "AI",
    "summary": "「卡片大小」和「能跑大模型」需要先定義：信用卡約為 85.6 × 54 mm，但開發板加上散熱、電源、儲存和外殼後通常都會超過這個尺寸。在這個體積內，實際合理的目標是本機執行 1–8B 參數的量化模型，而不是桌機等級的 30B、70B 模型。",
    "more": "推薦順序：\n\n1. Jetson Orin Nano Super 8GB：7–8B、VLM、相機 AI 和成熟 GPU 生態的首選。\n2. Orange Pi 5 Pro 16GB：尺寸最接近卡片、記憶體夠大，適合低成本 ARM 本機 LLM。\n3. Khadas Edge2 16GB：更精緻緊湊的 RK3588S 選擇，官方提供 NPU LLM 安裝流程。\n4. Raspberry Pi 5 16GB：最好上手、社群最大，但 LLM 主要靠 CPU，速度不是強項。\n5. LattePanda Mu 16GB：需要 x86／Windows 軟體時選擇，但必須搭配 carrier board。\n6. LattePanda Mu Ultra 16GB：體積小且 AI 能力高，但電源、散熱、carrier 與成本都更接近迷你 PC 專案。\n\n模型範圍不是硬性上限；context 長度、KV cache、量化方式、runtime 和是否將部分運算 offload 到 GPU／NPU 都會改變結果。「能載入」也不等於互動速度好用。",
    "model": 0,
    "theme": "ai",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/AI/%E5%8D%A1%E7%89%87%E5%A4%A7%E5%B0%8F%E6%9C%AC%E5%9C%B0%E5%A4%A7%E6%A8%A1%E5%9E%8B%E9%9B%BB%E8%85%A6%E9%81%B8%E5%9E%8B.md",
    "addedAt": "2026-09-20"
  },
  {
    "source": "Maker/今日鳥訪客電子紙畫框.md",
    "title": "今日鳥訪客電子紙畫框",
    "category": "Maker",
    "summary": "在窗邊放置麥克風，以鳥叫聲辨識附近出現的鳥種，再把「今天聽到的鳥」排成自然圖鑑／花鳥畫風格的拼貼，顯示在客廳的彩色電子紙畫框上。",
    "more": "它不是另一個充滿數字的環境監測器，而是把不可見的聲音資料轉化成每天都不同的居家藝術品：人經過畫框時，可以知道今天有哪些鳥曾經來到生活周遭。",
    "model": 2,
    "theme": "sensing",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Maker/%E4%BB%8A%E6%97%A5%E9%B3%A5%E8%A8%AA%E5%AE%A2%E9%9B%BB%E5%AD%90%E7%B4%99%E7%95%AB%E6%A1%86.md",
    "addedAt": "2026-09-20"
  },
  {
    "source": "Maker/ESP32超音波掃描避障車.md",
    "title": "ESP32 超音波掃描避障車",
    "category": "Maker",
    "summary": "製作一台以 ESP32 為控制核心的四輪自主小車，在車頭將超音波距離感測器安裝於微型 servo 上。感測器可以像頭部一樣左右轉動，量測不同方向的距離，再決定前進、停止、倒車或轉向。",
    "more": "相較於在車頭固定一顆距離感測器，旋轉掃描能用較少感測器取得左、中、右三個方向的資訊，也讓機器人的判斷過程容易被人看懂。",
    "model": 3,
    "theme": "sensing",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Maker/ESP32%E8%B6%85%E9%9F%B3%E6%B3%A2%E6%8E%83%E6%8F%8F%E9%81%BF%E9%9A%9C%E8%BB%8A.md",
    "addedAt": "2026-09-20"
  },
  {
    "source": "Maker/韓屋迷你氛圍燈.md",
    "title": "韓屋迷你氛圍燈",
    "category": "Maker",
    "summary": "以現成圓形 LED puck light／櫥櫃燈作為光源與電源模組，外面套上一座 3D 列印的韓屋或東亞傳統建築模型，製作成可拆卸、免配線的桌上氛圍燈。",
    "more": "燈具本身負責發光、開關、充電或更換電池；3D 列印件只負責造型、固定與擴散光線。這種分工能大幅降低電子設計門檻，也方便更換建築外觀。",
    "model": 6,
    "theme": "maker",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Maker/%E9%9F%93%E5%B1%8B%E8%BF%B7%E4%BD%A0%E6%B0%9B%E5%9C%8D%E7%87%88.md",
    "addedAt": "2026-09-20"
  },
  {
    "source": "Design/互動式咖啡店手繪平面圖.md",
    "title": "互動式咖啡店手繪平面圖",
    "category": "Design",
    "summary": "以手繪黑白線稿製作咖啡店俯視平面圖，但不只是靜態空間示意：門可以逐步打開、菜單可以展開、植物可以澆水、洗手台可以出現使用狀態、蛋糕可以被取走。使用者在手機上點擊場景中的物件，就能看到短動畫或狀態變化。",
    "more": "這是一種介於以下形式之間的作品：\n\n- 室內空間提案。\n- 手繪資訊圖。\n- 互動式繪本。\n- Point-and-click 小遊戲。\n- 品牌網站或社群宣傳內容。",
    "model": 9,
    "theme": "food",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Design/%E4%BA%92%E5%8B%95%E5%BC%8F%E5%92%96%E5%95%A1%E5%BA%97%E6%89%8B%E7%B9%AA%E5%B9%B3%E9%9D%A2%E5%9C%96.md",
    "addedAt": "2026-09-20"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "微縮尺寸全功能遙控車系列",
    "category": "靈感清單",
    "summary": "微縮尺寸全功能遙控車系列——Scania 卡車、Datsun 甩尾旅行車、DeskDigger 堆高機，走桌面把玩、解壓玩具與收藏路線。延伸研究：3D 列印迷你 RC 車模組化底盤、桌上型縮景越野場。",
    "more": "",
    "model": 4,
    "theme": "maker",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-06-1.jpg",
        "alt": "微縮全功能遙控車系列原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L17",
    "id": "靈感收集點子清單.md#%E5%BE%AE%E7%B8%AE%E5%B0%BA%E5%AF%B8%E5%85%A8%E5%8A%9F%E8%83%BD%E9%81%99%E6%8E%A7%E8%BB%8A%E7%B3%BB%E5%88%97",
    "ordinal": 6,
    "related": [
      {
        "source": "Maker/3D列印迷你RC車模組化底盤.md",
        "title": "3D 列印迷你 RC 車模組化底盤",
        "category": "Maker",
        "summary": "設計一套主要零件皆可 3D 列印的迷你 RC 車底盤，使用常見的微型直流減速馬達、SG90 類 servo、金屬軸與小輪胎。底盤不要以膠水永久組裝，而是在受力和需要反覆拆裝的位置使用金屬螺牙嵌件、螺絲與可替換模組。",
        "more": "這個點子的價值不只是一台小車，而是一個可快速更換馬達、轉向機構、軸距和車體的實驗平台。",
        "model": 4,
        "theme": "maker",
        "images": [],
        "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Maker/3D%E5%88%97%E5%8D%B0%E8%BF%B7%E4%BD%A0RC%E8%BB%8A%E6%A8%A1%E7%B5%84%E5%8C%96%E5%BA%95%E7%9B%A4.md"
      },
      {
        "source": "Maker/桌上型縮景越野場.md",
        "title": "桌上型縮景越野場",
        "category": "Maker",
        "summary": "製作一座可以實際駕駛迷你遙控車的「大自然縮景」。它不是固定的模型展示，而是一個可遊玩的微型戶外世界：沙灘、叢林、溪谷、泥地、岩場與木橋都能成為路線的一部分。",
        "more": "每位顧客可以：\n\n- 帶自己的迷你 RC 車進場。\n- 現場租車或試駕不同車型。\n- 自由探索地形，不一定要競速。\n- 參加計時、越障、尋寶或團隊救援任務。\n- 拍攝像真實戶外越野旅行的低視角影片。",
        "model": 5,
        "theme": "maker",
        "images": [],
        "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Maker/%E6%A1%8C%E4%B8%8A%E5%9E%8B%E7%B8%AE%E6%99%AF%E8%B6%8A%E9%87%8E%E5%A0%B4.md"
      }
    ],
    "addedAt": "2026-09-24"
  },
  {
    "source": "hot-stir-fry/README.md",
    "title": "熱炒開店啦！ v0.3",
    "category": "hot-stir-fry",
    "summary": "單人 2D 俯視角熱炒店原型，使用原生 Canvas、JavaScript 與 CSS。所有場景與料理插圖均為原創 Canvas／SVG 繪圖，不依賴外部素材、套件或網路服務。",
    "more": "- 統一描邊、投影與材質：不鏽鋼檯面、木砧板、食材籃、保冷箱、飯鍋與陶瓷餐盤。\n- 增加條紋遮雨棚、燈籠、招牌、黑板菜單、抽油煙罩、磁磚、排水槽及門口盆栽。\n- 外側用餐區有三張圓桌、紅塑膠椅及營業時入座的客人；裝飾不改變廚房碰撞與操作動線。\n- 重繪主廚帽、圍裙、表情、面向、步伐與拿盤姿勢。\n- 按住 F 切料會出現菜刀動作；成功翻炒會拋鍋與拋料；熟菜冒蒸氣、焦鍋冒煙，出餐有送到對應桌次的動畫。\n- 四道菜在菜單上使用獨立 SVG 插圖；場景中的餐點以同一套色彩與造型繪製。\n- 暫停會停止效果時間；重玩或切換關卡會清空動畫。所有效果只反映遊戲狀態，不影響計分。\n\n直接以桌面瀏覽器開啟 index.html 即可遊玩，無需安裝套件。\n\n也可在本資料夾執行：",
    "model": 7,
    "theme": "food",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/hot-stir-fry/README.md",
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "可切換顯示狀態的徽章式小螢幕",
    "category": "靈感清單",
    "summary": "可切換顯示狀態的徽章式小螢幕——別針款，可切換「正能量」、「工作勿擾」等狀態圖案。延伸研究：可程式化電子活動識別證。",
    "more": "",
    "model": 10,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-05-1.jpg",
        "alt": "狀態徽章螢幕原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L15",
    "id": "靈感收集點子清單.md#%E5%8F%AF%E5%88%87%E6%8F%9B%E9%A1%AF%E7%A4%BA%E7%8B%80%E6%85%8B%E7%9A%84%E5%BE%BD%E7%AB%A0%E5%BC%8F%E5%B0%8F%E8%9E%A2%E5%B9%95",
    "ordinal": 5,
    "related": [
      {
        "source": "Maker/可程式化電子活動識別證.md",
        "title": "可程式化電子活動識別證",
        "category": "Maker",
        "summary": "把活動識別證從一次性的姓名卡，變成一台可程式化、可互動、活動結束後仍能繼續使用的掌上開發裝置。它同時可以是：",
        "more": "- 姓名與個人資料展示。\n- 議程、場地與通知工具。\n- 與其他參加者互動的社交裝置。\n- 尋寶、闖關與遊戲平台。\n- 工作坊教材與 hackathon 開發板。\n- 活動結束後帶回家的紀念品。\n\n照片裡上半部仍保留紙本姓名牌與 QR code，下半部是彩色螢幕裝置。這種混合設計很好：入場與身份識別不必依賴電子系統，電子 badge 則專注在互動和可玩性。",
        "model": 10,
        "theme": "creative",
        "images": [],
        "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Maker/%E5%8F%AF%E7%A8%8B%E5%BC%8F%E5%8C%96%E9%9B%BB%E5%AD%90%E6%B4%BB%E5%8B%95%E8%AD%98%E5%88%A5%E8%AD%89.md"
      }
    ],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "雙手拉線控制傾斜迷宮遊戲機",
    "category": "靈感清單",
    "summary": "雙手拉線控制傾斜迷宮遊戲機——兩個旋鈕各控一條鋼索傾斜迷宮板，讓球穿過不規則洞落入底部目標孔。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-01-1.jpg",
        "alt": "雙手迷宮機原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L7",
    "id": "靈感收集點子清單.md#%E9%9B%99%E6%89%8B%E6%8B%89%E7%B7%9A%E6%8E%A7%E5%88%B6%E5%82%BE%E6%96%9C%E8%BF%B7%E5%AE%AE%E9%81%8A%E6%88%B2%E6%A9%9F",
    "ordinal": 1,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "公車到站時間鑰匙圈",
    "category": "靈感清單",
    "summary": "公車到站時間鑰匙圈——小螢幕即時顯示對面站牌各路線到站分鐘數。",
    "more": "",
    "model": -1,
    "theme": "maker",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-02-1.jpg",
        "alt": "公車到站鑰匙圈原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L9",
    "id": "靈感收集點子清單.md#%E5%85%AC%E8%BB%8A%E5%88%B0%E7%AB%99%E6%99%82%E9%96%93%E9%91%B0%E5%8C%99%E5%9C%88",
    "ordinal": 2,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "紙藝／手繪拼貼 Game Boy 造型卡套",
    "category": "靈感清單",
    "summary": "紙藝／手繪拼貼 Game Boy 造型卡套——復古掌機外型做成卡片收納夾。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-03-1.jpg",
        "alt": "Game Boy 造型卡套原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L11",
    "id": "靈感收集點子清單.md#%E7%B4%99%E8%97%9D%EF%BC%8F%E6%89%8B%E7%B9%AA%E6%8B%BC%E8%B2%BC%20Game%20Boy%20%E9%80%A0%E5%9E%8B%E5%8D%A1%E5%A5%97",
    "ordinal": 3,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "九九乘法自我驗證卡盒",
    "category": "靈感清單",
    "summary": "九九乘法自我驗證卡盒——翻牌題目加插棒對答案孔的自我檢查機制。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-04-1.jpg",
        "alt": "九九乘法驗證卡盒原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L13",
    "id": "靈感收集點子清單.md#%E4%B9%9D%E4%B9%9D%E4%B9%98%E6%B3%95%E8%87%AA%E6%88%91%E9%A9%97%E8%AD%89%E5%8D%A1%E7%9B%92",
    "ordinal": 4,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "LED 酒瓶露營燈骨架",
    "category": "靈感清單",
    "summary": "LED 酒瓶露營燈骨架——空酒瓶套入馬燈造型骨架，瓶身變燈罩。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-07-1.jpg",
        "alt": "LED 酒瓶露營燈原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L19",
    "id": "靈感收集點子清單.md#LED%20%E9%85%92%E7%93%B6%E9%9C%B2%E7%87%9F%E7%87%88%E9%AA%A8%E6%9E%B6",
    "ordinal": 7,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "電子錶封鑄樂高人偶造型機器人玩偶",
    "category": "靈感清單",
    "summary": "電子錶封鑄樂高人偶造型機器人玩偶——手錶螢幕露出當顯示面。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-08-1.jpg",
        "alt": "電子錶封鑄機器人偶原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L21",
    "id": "靈感收集點子清單.md#%E9%9B%BB%E5%AD%90%E9%8C%B6%E5%B0%81%E9%91%84%E6%A8%82%E9%AB%98%E4%BA%BA%E5%81%B6%E9%80%A0%E5%9E%8B%E6%A9%9F%E5%99%A8%E4%BA%BA%E7%8E%A9%E5%81%B6",
    "ordinal": 8,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "手作虛構鈔票設計",
    "category": "靈感清單",
    "summary": "手作虛構鈔票設計——仿真鈔版面語言加浮雕質感工藝。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-09-1.jpg",
        "alt": "虛構鈔票設計原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L23",
    "id": "靈感收集點子清單.md#%E6%89%8B%E4%BD%9C%E8%99%9B%E6%A7%8B%E9%88%94%E7%A5%A8%E8%A8%AD%E8%A8%88",
    "ordinal": 9,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "平交道警示器聲光模型",
    "category": "靈感清單",
    "summary": "平交道警示器聲光模型——雜誌附錄玩具，高擬真機構包含燈光、音效與柵欄動作。",
    "more": "",
    "model": -1,
    "theme": "ai",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-10-1.jpg",
        "alt": "平交道警示器模型原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L25",
    "id": "靈感收集點子清單.md#%E5%B9%B3%E4%BA%A4%E9%81%93%E8%AD%A6%E7%A4%BA%E5%99%A8%E8%81%B2%E5%85%89%E6%A8%A1%E5%9E%8B",
    "ordinal": 10,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "60Hz 高更新率 E-Ink 電子紙驅動板改裝",
    "category": "靈感清單",
    "summary": "60Hz 高更新率 E-Ink 電子紙驅動板改裝——整合鍵盤／顯示器專案，另有磁吸自動對齊連接兩塊板子的防呆設計。",
    "more": "",
    "model": -1,
    "theme": "sensing",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-11-1.jpg",
        "alt": "60Hz E-Ink 驅動板改裝原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L27",
    "id": "靈感收集點子清單.md#60Hz%20%E9%AB%98%E6%9B%B4%E6%96%B0%E7%8E%87%20E-Ink%20%E9%9B%BB%E5%AD%90%E7%B4%99%E9%A9%85%E5%8B%95%E6%9D%BF%E6%94%B9%E8%A3%9D",
    "ordinal": 11,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "個人數位書架網站",
    "category": "靈感清單",
    "summary": "個人數位書架網站——書脊視覺陳列、分類篩選與推薦互動。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-12-1.jpg",
        "alt": "個人數位書架原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L29",
    "id": "靈感收集點子清單.md#%E5%80%8B%E4%BA%BA%E6%95%B8%E4%BD%8D%E6%9B%B8%E6%9E%B6%E7%B6%B2%E7%AB%99",
    "ordinal": 12,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "疊層山脈造型便利貼",
    "category": "靈感清單",
    "summary": "疊層山脈造型便利貼——錯題累積視覺化、遊戲化文具（KOKUYO Campus 系列）。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-13-1.jpg",
        "alt": "疊層山脈便利貼原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L31",
    "id": "靈感收集點子清單.md#%E7%96%8A%E5%B1%A4%E5%B1%B1%E8%84%88%E9%80%A0%E5%9E%8B%E4%BE%BF%E5%88%A9%E8%B2%BC",
    "ordinal": 13,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "三角造型爬行機器人玩具",
    "category": "靈感清單",
    "summary": "三角造型爬行機器人玩具——蜂巢鏤空機構加 LED 燈效（NIKOLA TOY Cyber Weng）。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-14-1.jpg",
        "alt": "三角形爬行機器人原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L33",
    "id": "靈感收集點子清單.md#%E4%B8%89%E8%A7%92%E9%80%A0%E5%9E%8B%E7%88%AC%E8%A1%8C%E6%A9%9F%E5%99%A8%E4%BA%BA%E7%8E%A9%E5%85%B7",
    "ordinal": 14,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "復刻歷史插畫的立體紙藝模型",
    "category": "靈感清單",
    "summary": "復刻歷史插畫的立體紙藝模型——訂閱制月更套件商業模式（Club de Papel，含帆船、天球儀等款式）。",
    "more": "",
    "model": -1,
    "theme": "ai",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-15-1.jpg",
        "alt": "紙藝天文模型系列原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L35",
    "id": "靈感收集點子清單.md#%E5%BE%A9%E5%88%BB%E6%AD%B7%E5%8F%B2%E6%8F%92%E7%95%AB%E7%9A%84%E7%AB%8B%E9%AB%94%E7%B4%99%E8%97%9D%E6%A8%A1%E5%9E%8B",
    "ordinal": 15,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "河流水系地鐵圖風格製圖",
    "category": "靈感清單",
    "summary": "河流水系地鐵圖風格製圖——地理資料轉譯為資訊圖表視覺語言。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-16-1.jpg",
        "alt": "河流水系地鐵圖原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L37",
    "id": "靈感收集點子清單.md#%E6%B2%B3%E6%B5%81%E6%B0%B4%E7%B3%BB%E5%9C%B0%E9%90%B5%E5%9C%96%E9%A2%A8%E6%A0%BC%E8%A3%BD%E5%9C%96",
    "ordinal": 16,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "圍棋規則移植地理地圖",
    "category": "靈感清單",
    "summary": "圍棋規則移植地理地圖——以真實城市地圖（如中國大陸）為背景，城市為節點、道路為連結，套用圍棋提子／氣的規則；可用兩色或三色代表陣營，三國武將包裝。詳見下方延伸筆記。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L39",
    "id": "靈感收集點子清單.md#%E5%9C%8D%E6%A3%8B%E8%A6%8F%E5%89%87%E7%A7%BB%E6%A4%8D%E5%9C%B0%E7%90%86%E5%9C%B0%E5%9C%96",
    "ordinal": 17,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "國旗地標配對翻牌遊戲",
    "category": "靈感清單",
    "summary": "國旗地標配對翻牌遊戲——依國家分類的知識型記憶配對。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-18-1.jpg",
        "alt": "國旗地標配對原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L40",
    "id": "靈感收集點子清單.md#%E5%9C%8B%E6%97%97%E5%9C%B0%E6%A8%99%E9%85%8D%E5%B0%8D%E7%BF%BB%E7%89%8C%E9%81%8A%E6%88%B2",
    "ordinal": 18,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "大型電玩街機縮尺組裝模型",
    "category": "靈感清單",
    "summary": "大型電玩街機縮尺組裝模型——精細還原機台細節的收藏模型套件（太鼓達人 1/12 模型）。",
    "more": "",
    "model": -1,
    "theme": "ai",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-19-1.jpg",
        "alt": "太鼓達人縮尺模型原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L42",
    "id": "靈感收集點子清單.md#%E5%A4%A7%E5%9E%8B%E9%9B%BB%E7%8E%A9%E8%A1%97%E6%A9%9F%E7%B8%AE%E5%B0%BA%E7%B5%84%E8%A3%9D%E6%A8%A1%E5%9E%8B",
    "ordinal": 19,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "模型框架式會員歡迎禮",
    "category": "靈感清單",
    "summary": "模型框架式會員歡迎禮——把實用小物包裝成注塑框架公仔，增加開箱儀式感。",
    "more": "",
    "model": -1,
    "theme": "ai",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-20-1.jpg",
        "alt": "模型框架式歡迎禮原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L44",
    "id": "靈感收集點子清單.md#%E6%A8%A1%E5%9E%8B%E6%A1%86%E6%9E%B6%E5%BC%8F%E6%9C%83%E5%93%A1%E6%AD%A1%E8%BF%8E%E7%A6%AE",
    "ordinal": 20,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "魔術方塊結構萬年曆",
    "category": "靈感清單",
    "summary": "魔術方塊結構萬年曆——轉動方塊組合顯示日期，兼具把玩性與實用性（Umbra Play Date）。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-21-1.jpg",
        "alt": "魔術方塊萬年曆原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L46",
    "id": "靈感收集點子清單.md#%E9%AD%94%E8%A1%93%E6%96%B9%E5%A1%8A%E7%B5%90%E6%A7%8B%E8%90%AC%E5%B9%B4%E6%9B%86",
    "ordinal": 21,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "落葉裁切拼貼漸層牆面藝術",
    "category": "靈感清單",
    "summary": "落葉裁切拼貼漸層牆面藝術——自然材料規則化裁切加色階漸層排列。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-22-1.jpg",
        "alt": "落葉拼貼漸層牆原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L48",
    "id": "靈感收集點子清單.md#%E8%90%BD%E8%91%89%E8%A3%81%E5%88%87%E6%8B%BC%E8%B2%BC%E6%BC%B8%E5%B1%A4%E7%89%86%E9%9D%A2%E8%97%9D%E8%A1%93",
    "ordinal": 22,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "滑蓋透視式精品禮盒包裝",
    "category": "靈感清單",
    "summary": "滑蓋透視式精品禮盒包裝——推拉開盒加玻璃視窗預覽內容物，強調開箱儀式感。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-23-1.jpg",
        "alt": "滑蓋透視精品禮盒原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L50",
    "id": "靈感收集點子清單.md#%E6%BB%91%E8%93%8B%E9%80%8F%E8%A6%96%E5%BC%8F%E7%B2%BE%E5%93%81%E7%A6%AE%E7%9B%92%E5%8C%85%E8%A3%9D",
    "ordinal": 23,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "免膠水透明壓克力立體拼圖",
    "category": "靈感清單",
    "summary": "免膠水透明壓克力立體拼圖——卡榫互鎖組裝加透光漸層擺飾效果。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-24-1.jpg",
        "alt": "免膠水壓克力立體拼圖原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L52",
    "id": "靈感收集點子清單.md#%E5%85%8D%E8%86%A0%E6%B0%B4%E9%80%8F%E6%98%8E%E5%A3%93%E5%85%8B%E5%8A%9B%E7%AB%8B%E9%AB%94%E6%8B%BC%E5%9C%96",
    "ordinal": 24,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "手動拉桿式復古列車資訊看板",
    "category": "靈感清單",
    "summary": "手動拉桿式復古列車資訊看板——機械翻牌顯示目的地加懷舊鐵道時鐘造型。",
    "more": "",
    "model": -1,
    "theme": "maker",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-25-1.jpg",
        "alt": "復古列車翻牌看板原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L54",
    "id": "靈感收集點子清單.md#%E6%89%8B%E5%8B%95%E6%8B%89%E6%A1%BF%E5%BC%8F%E5%BE%A9%E5%8F%A4%E5%88%97%E8%BB%8A%E8%B3%87%E8%A8%8A%E7%9C%8B%E6%9D%BF",
    "ordinal": 25,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "模組化 3D 列印牆面月曆",
    "category": "靈感清單",
    "summary": "模組化 3D 列印牆面月曆——活動式日期卡片加標籤分類，永久重複使用。",
    "more": "",
    "model": -1,
    "theme": "maker",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-26-1.jpg",
        "alt": "模組化牆面月曆原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L56",
    "id": "靈感收集點子清單.md#%E6%A8%A1%E7%B5%84%E5%8C%96%203D%20%E5%88%97%E5%8D%B0%E7%89%86%E9%9D%A2%E6%9C%88%E6%9B%86",
    "ordinal": 26,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "實體卡片序列式無螢幕程式教學玩具",
    "category": "靈感清單",
    "summary": "實體卡片序列式無螢幕程式教學玩具——卡片排列等於指令序列，機器人依序執行（toio 新版）。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-27-1.jpg",
        "alt": "無螢幕程式教學卡片原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L58",
    "id": "靈感收集點子清單.md#%E5%AF%A6%E9%AB%94%E5%8D%A1%E7%89%87%E5%BA%8F%E5%88%97%E5%BC%8F%E7%84%A1%E8%9E%A2%E5%B9%95%E7%A8%8B%E5%BC%8F%E6%95%99%E5%AD%B8%E7%8E%A9%E5%85%B7",
    "ordinal": 27,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "六角地形桌上高爾夫遊戲",
    "category": "靈感清單",
    "summary": "六角地形桌上高爾夫遊戲——SOURCE Golf（官網 adventuretogether.games，需搭配 SOURCE 地形套組，售價 US$34.99，多種主題環境）；DIY 方案可參考 Printables「Mini Mini Putt Putt」模組化零件（斜坡、彎道、管道連接件，用 BB 彈當高爾夫球）。",
    "more": "",
    "model": -1,
    "theme": "maker",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-28-1.jpg",
        "alt": "六角地形桌上高爾夫原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L60",
    "id": "靈感收集點子清單.md#%E5%85%AD%E8%A7%92%E5%9C%B0%E5%BD%A2%E6%A1%8C%E4%B8%8A%E9%AB%98%E7%88%BE%E5%A4%AB%E9%81%8A%E6%88%B2",
    "ordinal": 28,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "可旋轉調角度桌上迷你籃球機",
    "category": "靈感清單",
    "summary": "可旋轉調角度桌上迷你籃球機——蜂巢鏤空半球結構加多角度投籃機關。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-29-1.jpg",
        "alt": "旋轉角度迷你籃球機原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L62",
    "id": "靈感收集點子清單.md#%E5%8F%AF%E6%97%8B%E8%BD%89%E8%AA%BF%E8%A7%92%E5%BA%A6%E6%A1%8C%E4%B8%8A%E8%BF%B7%E4%BD%A0%E7%B1%83%E7%90%83%E6%A9%9F",
    "ordinal": 29,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "E-Ink 螢幕打字訓練裝置",
    "category": "靈感清單",
    "summary": "E-Ink 螢幕打字訓練裝置——inktype 介面加客製鍵盤，低干擾專注書寫／打字練習工具（compose.kb）。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-30-1.jpg",
        "alt": "E-Ink 打字訓練裝置原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L64",
    "id": "靈感收集點子清單.md#E-Ink%20%E8%9E%A2%E5%B9%95%E6%89%93%E5%AD%97%E8%A8%93%E7%B7%B4%E8%A3%9D%E7%BD%AE",
    "ordinal": 30,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "薛西弗斯推石計數器",
    "category": "靈感清單",
    "summary": "薛西弗斯推石計數器——實體裝置視覺化連續紀錄，怠惰時角色會倒退／墜落。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-31-1.jpg",
        "alt": "薛西弗斯推石計數器原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L66",
    "id": "靈感收集點子清單.md#%E8%96%9B%E8%A5%BF%E5%BC%97%E6%96%AF%E6%8E%A8%E7%9F%B3%E8%A8%88%E6%95%B8%E5%99%A8",
    "ordinal": 31,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "模組化 3D 列印桌遊收納系統",
    "category": "靈感清單",
    "summary": "模組化 3D 列印桌遊收納系統——可堆疊卡榫收納盒、轉盤計分器與翻頁計數器（Board Nerds Kickstarter 專案參考）。",
    "more": "",
    "model": -1,
    "theme": "maker",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L68",
    "id": "靈感收集點子清單.md#%E6%A8%A1%E7%B5%84%E5%8C%96%203D%20%E5%88%97%E5%8D%B0%E6%A1%8C%E9%81%8A%E6%94%B6%E7%B4%8D%E7%B3%BB%E7%B5%B1",
    "ordinal": 32,
    "related": [],
    "addedAt": "2026-09-24"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "六角地形路線紀念牌",
    "category": "靈感清單",
    "summary": "六角地形路線紀念牌——把個人跑步/健行的 GPS 軌跡，結合等高線浮雕做成六角壁掛牌，可拼成一整面足跡牆。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-33-1.jpg",
        "alt": "六角地形路線紀念牌原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L76",
    "id": "靈感收集點子清單.md#%E5%85%AD%E8%A7%92%E5%9C%B0%E5%BD%A2%E8%B7%AF%E7%B7%9A%E7%B4%80%E5%BF%B5%E7%89%8C",
    "ordinal": 39,
    "related": [],
    "addedAt": "2026-09-29"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "自製空氣曲棍球機器人",
    "category": "靈感清單",
    "summary": "自製空氣曲棍球機器人——（文字構想，尚無實拍圖） 視覺追蹤球的位置，自動防守、反擊的桌上型 AI 對手。",
    "more": "",
    "model": -1,
    "theme": "ai",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L78",
    "id": "靈感收集點子清單.md#%E8%87%AA%E8%A3%BD%E7%A9%BA%E6%B0%A3%E6%9B%B2%E6%A3%8D%E7%90%83%E6%A9%9F%E5%99%A8%E4%BA%BA",
    "ordinal": 40,
    "related": [],
    "addedAt": "2026-09-29"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "天才方塊 Genius Square",
    "category": "靈感清單",
    "summary": "天才方塊 Genius Square——62,208 種骰子隨機出題組合，經電腦窮舉驗證「保證都有解」的填格拼圖。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-35-1.jpg",
        "alt": "天才方塊 Genius Square原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L79",
    "id": "靈感收集點子清單.md#%E5%A4%A9%E6%89%8D%E6%96%B9%E5%A1%8A%20Genius%20Square",
    "ordinal": 41,
    "related": [],
    "addedAt": "2026-09-29"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "Maker 友善電子產品",
    "category": "靈感清單",
    "summary": "Maker 友善電子產品——（文字構想，尚無實拍圖） 核心賣點是「最小化自己 hack、能直接接上自己專案」的消費性電子商品。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L81",
    "id": "靈感收集點子清單.md#Maker%20%E5%8F%8B%E5%96%84%E9%9B%BB%E5%AD%90%E7%94%A2%E5%93%81",
    "ordinal": 42,
    "related": [],
    "addedAt": "2026-09-29"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "LOOPDOT 指尖點陣螢幕",
    "category": "靈感清單",
    "summary": "LOOPDOT 指尖點陣螢幕——（文字構想，尚無實拍圖） 掌上型 EDC 手電筒＋旋鈕＋52顆RGB點陣螢幕，可顯示動畫、內建小遊戲，機身約 40g。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L82",
    "id": "靈感收集點子清單.md#LOOPDOT%20%E6%8C%87%E5%B0%96%E9%BB%9E%E9%99%A3%E8%9E%A2%E5%B9%95",
    "ordinal": 43,
    "related": [],
    "addedAt": "2026-09-29"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "視覺長條計時器",
    "category": "靈感清單",
    "summary": "視覺長條計時器——（文字構想，尚無實拍圖） KING JIM 出品，彩色長條顯示＋數字時間雙重顯示的計時器，三段背光。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L83",
    "id": "靈感收集點子清單.md#%E8%A6%96%E8%A6%BA%E9%95%B7%E6%A2%9D%E8%A8%88%E6%99%82%E5%99%A8",
    "ordinal": 44,
    "related": [],
    "addedAt": "2026-09-29"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "登山概念計時器",
    "category": "靈感清單",
    "summary": "登山概念計時器——（文字構想，尚無實拍圖） 延伸自視覺長條計時器：倒數歸零時 Q 版登山者剛好爬上山頂；已決定實際做出來。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L84",
    "id": "靈感收集點子清單.md#%E7%99%BB%E5%B1%B1%E6%A6%82%E5%BF%B5%E8%A8%88%E6%99%82%E5%99%A8",
    "ordinal": 45,
    "related": [],
    "addedAt": "2026-09-29"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "Beepy＋即時飛機雷達",
    "category": "靈感清單",
    "summary": "Beepy＋即時飛機雷達——（文字構想，尚無實拍圖） 實體QWERTY鍵盤＋Sharp記憶體液晶螢幕，顯示接收到的ADS-B飛機即時位置、航班號、高度、速度。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L85",
    "id": "靈感收集點子清單.md#Beepy%EF%BC%8B%E5%8D%B3%E6%99%82%E9%A3%9B%E6%A9%9F%E9%9B%B7%E9%81%94",
    "ordinal": 46,
    "related": [],
    "addedAt": "2026-09-29"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "互動式日本旅遊地圖網站",
    "category": "靈感清單",
    "summary": "互動式日本旅遊地圖網站——以日本地圖為主視覺，可下鑽至都道府県與城市層級，依人氣景點、推薦飯店、機場、神社寺廟、城堡、自然景觀、博物館等圖層篩選標記點，點擊地標彈出圖文卡片，並提供精選景點橫向捲動清單，可作為地圖式行程蒐集／收藏工具的介面參考。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-41-1.jpg",
        "alt": "互動式日本地圖原始參考圖 1"
      },
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-41-2.jpg",
        "alt": "互動式日本地圖原始參考圖 2"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L86",
    "id": "靈感收集點子清單.md#%E4%BA%92%E5%8B%95%E5%BC%8F%E6%97%A5%E6%9C%AC%E6%97%85%E9%81%8A%E5%9C%B0%E5%9C%96%E7%B6%B2%E7%AB%99",
    "ordinal": 47,
    "related": [],
    "addedAt": "2026-09-30"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "Claude＋NotebookLM 求職面試準備工作流",
    "category": "靈感清單",
    "summary": "Claude＋NotebookLM 求職面試準備工作流——貼上「/notebooklm」指令請 Claude 建立面試專用 notebook，跑 Deep Research 蒐集應徵公司近 12 個月的策略動態、高層公開發言、財報、競品與 Glassdoor 評價，再請 NotebookLM Studio 產出 Briefing Doc、模擬面試 Quiz（每題錨定公司公開發言）與常見地雷 FAQ（依 Glassdoor 評價與議薪籌碼），最後排程每天早上自動掃描即將到來的面試（提前 7 天）並全自動跑完整套流程。來源：IG Reel artificial.corner。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-42-1.png",
        "alt": "Claude+NotebookLM 面試準備工作流原始參考圖 1"
      },
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-42-2.png",
        "alt": "Claude+NotebookLM 面試準備工作流原始參考圖 2"
      },
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-42-3.png",
        "alt": "Claude+NotebookLM 面試準備工作流原始參考圖 3"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L89",
    "id": "靈感收集點子清單.md#Claude%EF%BC%8BNotebookLM%20%E6%B1%82%E8%81%B7%E9%9D%A2%E8%A9%A6%E6%BA%96%E5%82%99%E5%B7%A5%E4%BD%9C%E6%B5%81",
    "ordinal": 48,
    "related": [],
    "addedAt": "2026-09-30"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "問答版俄羅斯方塊",
    "category": "靈感清單",
    "summary": "問答版俄羅斯方塊——（文字構想，尚無實拍圖） 沿用 Tetris 方塊造型持續往下掉落，但每個方塊代表一道問題（可能是單字題）；玩家必須選對該方塊對應的答案才能將它消除，答錯或不處理就會一直往上堆疊，堆到頂端即失敗。方塊消除後，上方方塊會因重力落下補上空隙，維持類似 Tetris 的堆疊消除節奏。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L93",
    "id": "靈感收集點子清單.md#%E5%95%8F%E7%AD%94%E7%89%88%E4%BF%84%E7%BE%85%E6%96%AF%E6%96%B9%E5%A1%8A",
    "ordinal": 49,
    "related": [],
    "addedAt": "2026-09-30"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "D10 機械骰子計數器",
    "category": "靈感清單",
    "summary": "D10 機械骰子計數器——轉動外殼上的紅色齒環，帶動內部一顆十面骰（D10）逐格翻轉到下一個數字面，用實體骰子取代電子顯示的掌上型機械計數器／道具骰。來源：IG Reel thepolyforge。",
    "more": "",
    "model": -1,
    "theme": "maker",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L94",
    "id": "靈感收集點子清單.md#D10%20%E6%A9%9F%E6%A2%B0%E9%AA%B0%E5%AD%90%E8%A8%88%E6%95%B8%E5%99%A8",
    "ordinal": 50,
    "related": [],
    "addedAt": "2026-09-30"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "Garmin 手錶按鍵操作模擬器",
    "category": "靈感清單",
    "summary": "Garmin 手錶按鍵操作模擬器——（文字構想，尚無實拍圖） 使用者反應每次拿起 Garmin 手錶常忘記要按哪顆鍵才能切換錶面／功能選單／小工具畫面。構想做一個網頁 UI，畫出手錶螢幕＋側邊實體按鍵（光線、上、下、返回、確認／開始等），依指定錶款讓使用者點按鍵模擬操作，螢幕即時顯示對應畫面變化，用互動方式記住「哪顆鍵做什麼」，可依不同 Garmin 型號切換按鍵配置與選單邏輯。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L95",
    "id": "靈感收集點子清單.md#Garmin%20%E6%89%8B%E9%8C%B6%E6%8C%89%E9%8D%B5%E6%93%8D%E4%BD%9C%E6%A8%A1%E6%93%AC%E5%99%A8",
    "ordinal": 51,
    "related": [],
    "addedAt": "2026-10-01"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "摺紙星形幾何立鐘",
    "category": "靈感清單",
    "summary": "摺紙星形幾何立鐘——黑色三角形摺板組成放射狀立體雕塑，下層摺面標示小時數字（1～12）、上層摺面標示分鐘刻度（05～55），各摺面上有細線似指針標出目前對應的時與分，呈現抽象雕塑化的類比時鐘。來源：IG sushiwatches。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-46-1.png",
        "alt": "摺紙星形幾何立鐘原始參考圖 1"
      },
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-46-2.png",
        "alt": "摺紙星形幾何立鐘原始參考圖 2"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L96",
    "id": "靈感收集點子清單.md#%E6%91%BA%E7%B4%99%E6%98%9F%E5%BD%A2%E5%B9%BE%E4%BD%95%E7%AB%8B%E9%90%98",
    "ordinal": 52,
    "related": [],
    "addedAt": "2026-10-01"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "LED 點陣飛機雷達看板",
    "category": "靈感清單",
    "summary": "LED 點陣飛機雷達看板——用 Raspberry Pi 驅動 FM6126A 驅動晶片的 RGB LED 點陣面板，即時顯示 ADS-B 接收到的飛機圖示、航班代號、速度、高度與方位角，彩色點陣呈現比 Beepy 的黑白 Sharp 記憶體液晶更醒目，可作為第 40 筆「Beepy＋即時飛機雷達」的另一種硬體呈現方案參考。留言區有人提到用 ESP32／RP2040 應該就足夠驅動，不一定需要 Raspberry Pi。來源：IG bytecadia。",
    "more": "",
    "model": -1,
    "theme": "maker",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-47-1.png",
        "alt": "LED 點陣飛機雷達看板原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L99",
    "id": "靈感收集點子清單.md#LED%20%E9%BB%9E%E9%99%A3%E9%A3%9B%E6%A9%9F%E9%9B%B7%E9%81%94%E7%9C%8B%E6%9D%BF",
    "ordinal": 53,
    "related": [],
    "addedAt": "2026-10-01"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "USB 隨身虛擬寵物顯示器",
    "category": "靈感清單",
    "summary": "USB 隨身虛擬寵物顯示器——LilyGo T-Display 造型的 ESP32 小螢幕直接做成 USB-A 隨身碟外型插入電腦，螢幕以像素風格顯示寵物（影片中是柴犬）所在場景；影片插了兩顆這樣的裝置，分別顯示室內房間與室外庭院場景，暗示寵物可以在不同裝置／畫面間移動，呈現「隨身帶著、插哪台電腦就能看牠在做什麼」的虛擬寵物概念。來源：IG repete（ESP32 experiments 系列）。",
    "more": "",
    "model": -1,
    "theme": "maker",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-48-1.png",
        "alt": "USB 隨身虛擬寵物顯示器原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L101",
    "id": "靈感收集點子清單.md#USB%20%E9%9A%A8%E8%BA%AB%E8%99%9B%E6%93%AC%E5%AF%B5%E7%89%A9%E9%A1%AF%E7%A4%BA%E5%99%A8",
    "ordinal": 54,
    "related": [],
    "addedAt": "2026-10-01"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "GitHub 當機冒煙道具盒",
    "category": "靈感清單",
    "summary": "GitHub 當機冒煙道具盒——黑色小音箱造型盒子，正面貼 GitHub 貓頭 Logo，內藏煙霧機從 Logo 下方噴出白煙，搭配文字哏「Is my GitHub having an outage day now」，吐槽服務當機；屬於迷因／道具類創作而非功能性產品，可作為品牌吉祥物＋實體煙霧效果互動裝置的素材參考。來源：IG rydercalmdown。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-49-1.png",
        "alt": "GitHub 當機冒煙道具盒原始參考圖 1"
      },
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-49-2.png",
        "alt": "GitHub 當機冒煙道具盒原始參考圖 2"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L103",
    "id": "靈感收集點子清單.md#GitHub%20%E7%95%B6%E6%A9%9F%E5%86%92%E7%85%99%E9%81%93%E5%85%B7%E7%9B%92",
    "ordinal": 55,
    "related": [],
    "addedAt": "2026-10-01"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "CNC 鋁合金一體式 Apple Watch 改裝殼",
    "category": "靈感清單",
    "summary": "CNC 鋁合金一體式 Apple Watch 改裝殼——把 Apple Watch 鑲進厚實的 CNC 鋁合金外殼，殼身下方加裝一顆類似 iPod Classic 滾輪的大型旋鈕／點擊滾輪，用來滾動瀏覽錶面上的 App 清單與內容，將觸控錶面與復古實體滾輪操作結合成類 iPod 造型的手持裝置。來源：IG kaelix898（G-Oussue Design Studio）。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L106",
    "id": "靈感收集點子清單.md#CNC%20%E9%8B%81%E5%90%88%E9%87%91%E4%B8%80%E9%AB%94%E5%BC%8F%20Apple%20Watch%20%E6%94%B9%E8%A3%9D%E6%AE%BC",
    "ordinal": 56,
    "related": [],
    "addedAt": "2026-10-01"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "舊 Kindle 電子紙打字機",
    "category": "靈感清單",
    "summary": "舊 Kindle 電子紙打字機——將越獄 Kindle Paperwhite、Raspberry Pi Zero 2 W 與熱感印表機整合，讓閱讀器變成低干擾輸入與即時紙本輸出的再生裝置。延伸研究：舊 Kindle 電子紙打字機。",
    "more": "",
    "model": -1,
    "theme": "sensing",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L69",
    "id": "靈感收集點子清單.md#%E8%88%8A%20Kindle%20%E9%9B%BB%E5%AD%90%E7%B4%99%E6%89%93%E5%AD%97%E6%A9%9F",
    "ordinal": 33,
    "related": [
      {
        "source": "Maker/舊Kindle電子紙打字機.md",
        "title": "舊 Kindle 電子紙打字機",
        "category": "Maker",
        "summary": "Roni Bandini 的開源專案 Kindle Typewriter，將越獄後的 Kindle Paperwhite 放進帶有熱感印表機的 3D 列印底座，讓原本用來閱讀文字的裝置轉變成輸入並印出文字的打字機。",
        "more": "- GitHub：\n- 完整製作說明：\n- 授權：MIT\n\n這不是把 USB 或藍牙鍵盤直接接到 Kindle，而是一個由兩台裝置分工的系統：\n\n1. Kindle Paperwhite 越獄後安裝 KUAL 與 kterm。\n2. Kindle 執行 Bash 寫成的極簡輸入介面。\n3. 使用者在 Kindle 上輸入文字；連續輸入兩個換行後，文字緩衝區透過 HTTP 傳送出去。\n4. 同一 Wi-Fi 網路上的 Raspberry Pi Zero 2 W 執行 Flask 服務。\n5. Raspberry Pi 經由 serial 控制熱感印表機，把文字立即印出。\n6. 系統會依紙張寬度換行，避免拆開單字，也會保存先前印出的文字。",
        "model": -1,
        "theme": "sensing",
        "images": [],
        "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Maker/%E8%88%8AKindle%E9%9B%BB%E5%AD%90%E7%B4%99%E6%89%93%E5%AD%97%E6%A9%9F.md"
      }
    ],
    "addedAt": "2026-10-02"
  },
  {
    "source": "Business/社群電子專案硬體套件平台.md",
    "title": "社群電子專案硬體套件平台",
    "category": "Business",
    "summary": "全點子庫的核心元件、周邊與 10／100／500／1,000 件採購折扣整理，另見：電子專案核心元件與批量採購分析。",
    "more": "社群影片已經解決「讓人想做」的問題，真正阻止人動手的是：\n\n- 不知道零件的正確名稱和版本。\n- 每個零件來自不同賣場，運費可能高於零件。\n- 螺絲、接頭、電池極性與尺寸容易買錯。\n- 買完仍需焊接、燒錄、校正和列印外殼。\n- 專案結束留下大量只用一次的散裝零件。\n\n因此可以賣的不是一袋元件，而是「把靈感變成第一次就能完成的路徑」。",
    "model": -1,
    "theme": "maker",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Business/%E7%A4%BE%E7%BE%A4%E9%9B%BB%E5%AD%90%E5%B0%88%E6%A1%88%E7%A1%AC%E9%AB%94%E5%A5%97%E4%BB%B6%E5%B9%B3%E5%8F%B0.md",
    "addedAt": "2026-10-03"
  },
  {
    "source": "Business/電子專案核心元件與批量採購分析.md",
    "title": "電子專案核心元件與批量採購分析",
    "category": "Business",
    "summary": "本報告盤點點子庫中需要主控、顯示、感測、燈光、馬達、無線通訊或電池的專案；純網站、紙藝、桌遊和完全手動機構不列入主要電子 BOM。機械鍵軸、LED 現成燈和 Apple Watch 改裝等邊界案例仍保留，因為它們代表「直接借用量產核心」的成本策略。",
    "more": "價格以 2026-10-03 可查到的官方售價與電子零件通路階梯價為基準，暫用 US$1 = NT$32.5 換算。表中價格未含台灣營業稅、國際運費、關稅、金流、來料檢驗、不良品、PCBA、燒錄、組裝、包裝和售後。\n\n「100／1,000 件價格」分成兩種：\n\n- 有公開階梯價者，直接使用通路數字。\n- 沒有公開階梯價的品牌板、通用模組和機構件，使用市場常見範圍做採購預算；正式下單前仍需向至少三家供應商取得同規格 RFQ 和樣品。",
    "model": -1,
    "theme": "sensing",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Business/%E9%9B%BB%E5%AD%90%E5%B0%88%E6%A1%88%E6%A0%B8%E5%BF%83%E5%85%83%E4%BB%B6%E8%88%87%E6%89%B9%E9%87%8F%E6%8E%A1%E8%B3%BC%E5%88%86%E6%9E%90.md",
    "addedAt": "2026-10-03"
  },
  {
    "source": "Design/蛋糕派對機關式回憶禮物盒.md",
    "title": "蛋糕派對機關式回憶禮物盒",
    "category": "Design",
    "summary": "台灣 CAPIES 手作禮物推出的《今天的主角就是你》蛋糕派對禮物盒。黑色立方盒外繫大型緞帶，掀蓋後四面側板向外展開，露出多個以咖啡廳、報紙、底片與蛋糕為主題的紙機關；中央保留一個 14 × 14 × 14 cm 的空間，可放雲朵夜燈、飾品、香水或送禮者自行準備的主禮物。",
    "more": "- 募資頁：\n- 官方網站：\n- Instagram：\n\n官方資料顯示此專案於 2026 年募資成功，單盒募資價 NT$1,780、預定售價 NT$2,300；搭配現成雲朵夜燈的方案為 NT$2,270、預定售價 NT$2,790。\n\n蛋糕插畫上有可抽出的切片或小卡，形成「切一塊蛋糕送給你」的動作。官方提供草莓、草莓巧克力、黑森林、綠葡萄、藍莓與杜拜巧克力六種插畫，以及生日／我愛你兩種主題字。",
    "model": -1,
    "theme": "food",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Design/%E8%9B%8B%E7%B3%95%E6%B4%BE%E5%B0%8D%E6%A9%9F%E9%97%9C%E5%BC%8F%E5%9B%9E%E6%86%B6%E7%A6%AE%E7%89%A9%E7%9B%92.md",
    "addedAt": "2026-10-03"
  },
  {
    "source": "Maker/3D列印文字投影燈.md",
    "title": "3D 列印文字投影燈",
    "category": "Maker",
    "summary": "Instagram 創作者 therabbix 展示一系列小型文字投影燈。燈具本體看似抽象的圓筒或球狀桌燈，點亮並朝向牆面後，外殼上的分散開孔會在牆上組成 LOVE YOU、FCK YOU 等完整文字。",
    "more": "- theLOVElamp：\n- theFUCKlamp：\n- 創作者作品頁：\n\n照片中的黃色 LOVE YOU 燈和黑色版本是不同文字外殼，不是同一盞燈按一下就在兩句話之間切換。中央按壓只負責開關光源。\n\n這個專案不是從零設計 LED 電路，而是改造現成的 IKEA KAPPLAKE USB LED 聚光燈：",
    "model": -1,
    "theme": "creative",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Maker/3D%E5%88%97%E5%8D%B0%E6%96%87%E5%AD%97%E6%8A%95%E5%BD%B1%E7%87%88.md",
    "addedAt": "2026-10-03"
  },
  {
    "source": "Maker/凸輪解碼機械七段顯示器.md",
    "title": "凸輪解碼機械七段顯示器",
    "category": "Maker",
    "summary": "Instagram 帳號 beker.david 展示一座小型機械七段顯示器。左側減速馬達帶動齒輪組，中間有多片並排旋轉的凸輪與彈簧／連桿，上方七片白色顯示片依序翻轉，循環顯示數字 0～9。",
    "more": "目前未找到足以確認作者原始 CAD、BOM 或控制方式的公開專案頁，因此以下以畫面可見機構和其他已公開的同類機械七段顯示器作為原理分析，不把其他作者的設計當成這台機器的確切規格。\n\n同類原理參考：\n\n- Greg Zumwalt 的雙凸輪機械七段顯示器：\n- Shinsaku Hiura 的單伺服桶形凸輪版本：",
    "model": -1,
    "theme": "maker",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Maker/%E5%87%B8%E8%BC%AA%E8%A7%A3%E7%A2%BC%E6%A9%9F%E6%A2%B0%E4%B8%83%E6%AE%B5%E9%A1%AF%E7%A4%BA%E5%99%A8.md",
    "addedAt": "2026-10-03"
  },
  {
    "source": "Maker/洞洞板鑰匙圈迷你掌機.md",
    "title": "洞洞板鑰匙圈迷你掌機",
    "category": "Maker",
    "summary": "Instagram 帳號 nooiseyboy 展示一台手掌大小的鑰匙圈遊戲機。正面是一塊小型單色 OLED，下方以洞洞板焊接按鍵和其他元件；畫面正在執行類似太空射擊／打磚塊的迷你遊戲，上方顯示關卡與生命值。",
    "more": "目前未找到作者公開的專案頁、BOM 或程式碼，因此無法從單張照片確認主控板、電池、充電方式與完整按鍵數量。以下是依外觀提出的可重現方案，不把推測當成原作規格。\n\n它不是把大型遊戲機盡量縮小，而是接受電子原型本來的樣子：\n\n- 洞洞板直接當結構和外觀。\n- OLED 模組的螺絲、排針和電路板全部外露。\n- 不花成本製作完整機殼。\n- 小遊戲針對有限解析度和按鍵重新設計。\n- 加上鑰匙圈後，它同時是玩具、電子飾品和 maker 身份物件。",
    "model": -1,
    "theme": "creative",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Maker/%E6%B4%9E%E6%B4%9E%E6%9D%BF%E9%91%B0%E5%8C%99%E5%9C%88%E8%BF%B7%E4%BD%A0%E6%8E%8C%E6%A9%9F.md",
    "addedAt": "2026-10-03"
  },
  {
    "source": "Maker/近期電子專案成本比較.md",
    "title": "近期電子專案成本比較",
    "category": "Maker",
    "summary": "估算日期：2026-10-03",
    "more": "- 金額以台幣計，採 US$1 ≈ NT$32 作為採購預算換算，而非即時匯率報價。\n- 「最低可動原型」以功能能驗證為準，不追求完整外殼、漂亮走線或長期可靠性。\n- 「照片級完整原型」包含電池、電源、接頭、線材、固定件與 3D 列印／透明板材等容易漏算的項目。\n- 不計開發工具、焊台、3D 印表機、人工與反覆失敗的時間；若委外列印、雷切或焊接，需另外加價。\n- 海外小量採購建議再保留 15～30% 運費、耗損與備料預算。\n\n假設已有一台可越獄的 Kindle。\n\n官方 Pi Zero 2 W 定價為 US$15；Seeed 的嵌入式熱感印表機單體為 US$45，這兩項已占最低材料費約 NT$1,920。實際在台灣零買、加上電源和運費後，抓 NT$2,500～4,000 才合理。",
    "model": -1,
    "theme": "creative",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Maker/%E8%BF%91%E6%9C%9F%E9%9B%BB%E5%AD%90%E5%B0%88%E6%A1%88%E6%88%90%E6%9C%AC%E6%AF%94%E8%BC%83.md",
    "addedAt": "2026-10-03"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "ESP-NOW 穿戴式距離感應器",
    "category": "靈感清單",
    "summary": "ESP-NOW 穿戴式距離感應器——兩塊帶彩色小螢幕的 ESP32-S3 開發板透過 ESP-NOW 互傳封包，以 RSSI 粗略顯示接近程度，可延伸成社交徽章、尋人遊戲與雙人配對裝置。延伸研究：ESP-NOW 穿戴式距離感應器。",
    "more": "",
    "model": -1,
    "theme": "maker",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L70",
    "id": "靈感收集點子清單.md#ESP-NOW%20%E7%A9%BF%E6%88%B4%E5%BC%8F%E8%B7%9D%E9%9B%A2%E6%84%9F%E6%87%89%E5%99%A8",
    "ordinal": 34,
    "related": [
      {
        "source": "Maker/ESP-NOW穿戴式距離感應器.md",
        "title": "ESP-NOW 穿戴式距離感應器",
        "category": "Maker",
        "summary": "社群影片使用兩塊帶彩色小螢幕的 LILYGO T-QT 開發板，讓兩台 ESP32 以 ESP-NOW 互相傳送資料，再用無線訊號強度呈現彼此接近或遠離的狀態。裝置可掛在衣服、背包或識別證上，螢幕以顏色與圖形即時回饋。",
        "more": "影片中的板子看起來是 LILYGO T-QT／T-QT Pro：\n\n- 主控為 ESP32-S3。\n- 0.85 吋彩色 LCD。\n- 解析度 128 × 128。\n- 兩個可程式按鍵。\n- T-QT Pro 支援鋰電池充電與放電。\n- 官方資料指出不同批次可能使用 4 MB Flash＋2 MB PSRAM，或 8 MB Flash、無 PSRAM的版本，購買與燒錄前要確認型號。\n\n參考資料：",
        "model": -1,
        "theme": "maker",
        "images": [],
        "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Maker/ESP-NOW%E7%A9%BF%E6%88%B4%E5%BC%8F%E8%B7%9D%E9%9B%A2%E6%84%9F%E6%87%89%E5%99%A8.md"
      }
    ],
    "addedAt": "2026-10-03"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "NFC 教室銀行金融素養系統",
    "category": "靈感清單",
    "summary": "NFC 教室銀行金融素養系統——為學生建立虛擬帳戶，將個人入口網址寫入彩色 NFC 卡，透過存款、消費、轉帳、儲蓄、貸款和投資模擬學習金融觀念。延伸研究：NFC 教室銀行金融素養系統。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L71",
    "id": "靈感收集點子清單.md#NFC%20%E6%95%99%E5%AE%A4%E9%8A%80%E8%A1%8C%E9%87%91%E8%9E%8D%E7%B4%A0%E9%A4%8A%E7%B3%BB%E7%B5%B1",
    "ordinal": 35,
    "related": [
      {
        "source": "Education/NFC教室銀行金融素養系統.md",
        "title": "NFC 教室銀行金融素養系統",
        "category": "Education",
        "summary": "把抽象的金融教育變成一個長期運作的班級經濟：",
        "more": "- 每位學生擁有虛擬帳戶與實體 NFC 卡。\n- 完成任務、值日、閱讀或團隊合作可獲得班級貨幣。\n- 學生可以儲蓄、消費、轉帳、投資或申請貸款。\n- 教師扮演央行、商店與稽核者，設計利率、物價和事件。\n- 所有交易都有時間與原因，課後可用真實資料討論預算、風險和機會成本。\n\n實體卡片本身不是重點；它把數位試算表變成可拿在手上、可刷卡、具有身份與儀式感的學習道具。",
        "model": -1,
        "theme": "creative",
        "images": [],
        "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Education/NFC%E6%95%99%E5%AE%A4%E9%8A%80%E8%A1%8C%E9%87%91%E8%9E%8D%E7%B4%A0%E9%A4%8A%E7%B3%BB%E7%B5%B1.md"
      }
    ],
    "addedAt": "2026-10-03"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "閉環控制桌上型智慧溫室",
    "category": "靈感清單",
    "summary": "閉環控制桌上型智慧溫室——以溫濕度、土壤含水量、光照與水位感測器判斷環境，再自動控制水泵、風扇和植物燈，並記錄動作後的結果持續調整。延伸研究：閉環控制桌上型智慧溫室。",
    "more": "",
    "model": -1,
    "theme": "sensing",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L72",
    "id": "靈感收集點子清單.md#%E9%96%89%E7%92%B0%E6%8E%A7%E5%88%B6%E6%A1%8C%E4%B8%8A%E5%9E%8B%E6%99%BA%E6%85%A7%E6%BA%AB%E5%AE%A4",
    "ordinal": 36,
    "related": [
      {
        "source": "Maker/閉環控制桌上型智慧溫室.md",
        "title": "閉環控制桌上型智慧溫室",
        "category": "Maker",
        "summary": "建立一座可以持續進行閉環控制的桌上型微型溫室：",
        "more": "1. Sense：讀取土壤含水量、空氣溫濕度、光照、水箱水位等資料。\n2. Decide：依作物、時段、門檻和安全條件判斷是否需要澆水、通風、補光或警示。\n3. Act：控制水泵、風扇、植物燈或通風口。\n4. Grow：記錄環境與生長結果，調整下一輪控制參數。\n\n真正有價值的部分不是「手機可以看到溫度」，而是系統能根據感測結果採取動作，再確認動作是否真的改善環境。",
        "model": -1,
        "theme": "creative",
        "images": [],
        "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Maker/%E9%96%89%E7%92%B0%E6%8E%A7%E5%88%B6%E6%A1%8C%E4%B8%8A%E5%9E%8B%E6%99%BA%E6%85%A7%E6%BA%AB%E5%AE%A4.md"
      }
    ],
    "addedAt": "2026-10-03"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "圓形螢幕虛擬寵物球",
    "category": "靈感清單",
    "summary": "圓形螢幕虛擬寵物球——將 Waveshare ESP32-S3 1.75 吋圓形 AMOLED 觸控模組裝入 3D 列印球形外殼，加入 RTC、聲音、microSD 素材和寵物生命週期；商用版本需改為原創角色與外殼。延伸研究：圓形螢幕虛擬寵物球。",
    "more": "",
    "model": -1,
    "theme": "sensing",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L73",
    "id": "靈感收集點子清單.md#%E5%9C%93%E5%BD%A2%E8%9E%A2%E5%B9%95%E8%99%9B%E6%93%AC%E5%AF%B5%E7%89%A9%E7%90%83",
    "ordinal": 37,
    "related": [
      {
        "source": "Maker/圓形螢幕虛擬寵物球.md",
        "title": "圓形螢幕虛擬寵物球",
        "category": "Maker",
        "summary": "社群影片展示 TamaPoke：將圓形 ESP32-S3 AMOLED 觸控模組裝進 3D 列印球形外殼，做成桌上型虛擬寵物。開機後可選擇角色，寵物會經歷孵化、照顧、成長、進化與告別。",
        "more": "- 開源程式：\n- 瀏覽器安裝器：\n- 3D 外殼頁面：\n\n專案使用 Waveshare ESP32-S3-Touch-AMOLED-1.75，不是一般圓形 LCD：\n\n- ESP32-S3 主控。\n- 1.75 吋圓形 AMOLED。\n- 466 × 466 解析度。\n- CO5300 顯示驅動器，QSPI 介面。\n- CST9217 電容觸控。\n- AXP2101 電源管理與電池支援。\n- PCF85063 RTC，關機後仍能追蹤時間。\n- microSD 卡槽，用來保存大量角色圖像。\n- ES8311 音訊編解碼器，可外接喇叭。\n- 六軸 IMU。\n- USB-C。",
        "model": -1,
        "theme": "maker",
        "images": [],
        "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Maker/%E5%9C%93%E5%BD%A2%E8%9E%A2%E5%B9%95%E8%99%9B%E6%93%AC%E5%AF%B5%E7%89%A9%E7%90%83.md"
      }
    ],
    "addedAt": "2026-10-03"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "單鍵掌上遊戲機",
    "category": "靈感清單",
    "summary": "單鍵掌上遊戲機——狹長螢幕搭配一顆拇指大型按鍵，以單擊、長按和放開控制跑酷、節奏或蓄力遊戲，適合單手與無障礙操作。延伸研究：單鍵掌上遊戲機。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-32-1.jpg",
        "alt": "模組化桌遊收納系統原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L74",
    "id": "靈感收集點子清單.md#%E5%96%AE%E9%8D%B5%E6%8E%8C%E4%B8%8A%E9%81%8A%E6%88%B2%E6%A9%9F",
    "ordinal": 38,
    "related": [
      {
        "source": "Maker/單鍵掌上遊戲機.md",
        "title": "單鍵掌上遊戲機",
        "category": "Maker",
        "summary": "把掌上遊戲縮減到一個清楚動作：玩家只需在正確時間按下按鍵。所有複雜度都放在關卡速度、障礙排列、蓄力、節奏和回饋，而不是增加更多控制器。",
        "more": "這種限制帶來幾個優點：\n\n- 不需學習方向鍵和按鍵配置，拿起來就能玩。\n- 可以真正單手操作，另一隻手能提東西、扶握或做其他事。\n- 大按鍵容易盲按，使用者不用一直看控制器位置。\n- 適合短時間反覆挑戰、排隊和桌面解壓。\n- 硬體少、外殼小，適合作為入門電子製作課程。",
        "model": -1,
        "theme": "creative",
        "images": [],
        "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Maker/%E5%96%AE%E9%8D%B5%E6%8E%8C%E4%B8%8A%E9%81%8A%E6%88%B2%E6%A9%9F.md"
      }
    ],
    "addedAt": "2026-10-03"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "社群電子專案硬體套件平台",
    "category": "靈感清單",
    "summary": "社群電子專案硬體套件平台——把社群影片裡「很想做、但不想逐項買料」的電子創作整理成一次到貨的主題套件，以透明 BOM 成本加固定策展／測試／分裝服務費收費；初期採預購成團與限量 drop，成熟後再加入共用電子核心、月度機構包和創作者分潤。",
    "more": "",
    "model": -1,
    "theme": "maker",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L107",
    "id": "靈感收集點子清單.md#%E7%A4%BE%E7%BE%A4%E9%9B%BB%E5%AD%90%E5%B0%88%E6%A1%88%E7%A1%AC%E9%AB%94%E5%A5%97%E4%BB%B6%E5%B9%B3%E5%8F%B0",
    "ordinal": 57,
    "related": [],
    "addedAt": "2026-10-03"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "3D 列印文字投影燈",
    "category": "靈感清單",
    "summary": "3D 列印文字投影燈——以 IKEA KAPPLAKE USB 按壓式 LED 聚光燈作為現成光源核心，拆除霧面擴散片後塞入具有精密文字開孔的圓筒／球形燈罩或路標式壁燈，按下中心即把 LOVE YOU、NO WAY 等隱藏訊息投射到牆上；同一光源可換不同文字與造型外殼，是「量產功能核心＋低量客製外殼」和 500 元套件的直接範例。來源：IG／Thangs therabbix 的投影燈系列。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L108",
    "id": "靈感收集點子清單.md#3D%20%E5%88%97%E5%8D%B0%E6%96%87%E5%AD%97%E6%8A%95%E5%BD%B1%E7%87%88",
    "ordinal": 58,
    "related": [],
    "addedAt": "2026-10-03"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "洞洞板鑰匙圈迷你掌機",
    "category": "靈感清單",
    "summary": "洞洞板鑰匙圈迷你掌機——小型單色 OLED、洞洞板、微控制器和少量按鍵直接裸露組裝成可玩的鑰匙圈，畫面可執行太空射擊等原創迷你遊戲；刻意省略射出或 3D 列印外殼，讓電路結構本身成為外觀，適合發展成 499 元級免焊／半焊接電子套件。來源：IG nooiseyboy。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L109",
    "id": "靈感收集點子清單.md#%E6%B4%9E%E6%B4%9E%E6%9D%BF%E9%91%B0%E5%8C%99%E5%9C%88%E8%BF%B7%E4%BD%A0%E6%8E%8C%E6%A9%9F",
    "ordinal": 59,
    "related": [],
    "addedAt": "2026-10-03"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "蛋糕派對機關式回憶禮物盒",
    "category": "靈感清單",
    "summary": "蛋糕派對機關式回憶禮物盒——14 × 14 × 14 cm 方盒打開後四面展開，整合蛋糕插卡、底片吊牌、翻翻手寫板與「今日頭條」報紙機關，可放入6張照片並在中央擺放夜燈或自備禮物；以標準化紙機關承載個人照片和手寫內容，兼具高級包裝、桌面敘事和半客製服務。來源：台灣 CAPIES／capiesmemory。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L110",
    "id": "靈感收集點子清單.md#%E8%9B%8B%E7%B3%95%E6%B4%BE%E5%B0%8D%E6%A9%9F%E9%97%9C%E5%BC%8F%E5%9B%9E%E6%86%B6%E7%A6%AE%E7%89%A9%E7%9B%92",
    "ordinal": 60,
    "related": [],
    "addedAt": "2026-10-03"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "凸輪解碼機械七段顯示器",
    "category": "靈感清單",
    "summary": "凸輪解碼機械七段顯示器——單一馬達驅動齒輪與多片疊層凸輪，凸輪依轉角分別推動七支連桿，讓反光顯示片翻轉組合出0～9；將原本由電子邏輯完成的七段數字解碼直接寫進凸輪輪廓，可作為機構教學模型、機械時鐘數字模組或慢速計數器。來源：IG beker.david。",
    "more": "",
    "model": -1,
    "theme": "maker",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L111",
    "id": "靈感收集點子清單.md#%E5%87%B8%E8%BC%AA%E8%A7%A3%E7%A2%BC%E6%A9%9F%E6%A2%B0%E4%B8%83%E6%AE%B5%E9%A1%AF%E7%A4%BA%E5%99%A8",
    "ordinal": 61,
    "related": [],
    "addedAt": "2026-10-03"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "Vento AI 實體原型平台",
    "category": "靈感清單",
    "summary": "Vento AI 實體原型平台——以一塊整合觸控螢幕、IMU、NeoPixel、馬達、旋鈕與遊戲按鍵的掛牌式 Lyra 示範板，配合 Vento 的 AI 建構與裝置連線平台，把同一硬體快速變成遊戲、樂器、互動名牌或自動化控制器；適合發展成「核心板買一次、每個專案包 NT$299～599」的套件模式。來源：IG protofy.xyzeng／protofy.xyz。詳見：Vento AI 實體原型平台。",
    "more": "",
    "model": -1,
    "theme": "maker",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L112",
    "id": "靈感收集點子清單.md#Vento%20AI%20%E5%AF%A6%E9%AB%94%E5%8E%9F%E5%9E%8B%E5%B9%B3%E5%8F%B0",
    "ordinal": 62,
    "related": [
      {
        "source": "Maker/Vento AI實體原型平台.md",
        "title": "Vento AI 實體原型平台",
        "category": "Maker",
        "summary": "Instagram 帳號 protofy.xyzeng／protofy.xyz 展示一塊掛牌式藍色開發板、Teenage Engineering Pocket Operator，以及先前記錄的透明互動活動識別證。畫面把 Vento 描述為連接 AI 與實體世界的工具。",
        "more": "官方網站對 Vento 的定位是：用自然語言建立能連接真實裝置的系統，並可透過 MQTT 或 HTTP 串接開發板、感測器、攝影機與致動器，再加入 agent、API、webhook 和控制介面。Protofy 則是開發 Vento 的產品／工程團隊。\n\n- Vento：\n- Protofy：\n\n藍色 PCB 右下角印有 Lyra。照片可辨識的元件包括：",
        "model": -1,
        "theme": "sensing",
        "images": [
          {
            "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-56-1.jpg",
            "alt": "Lyra 掛牌式整合開發板"
          },
          {
            "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-56-2.jpg",
            "alt": "Pocket Operator 的 PCB 即面板設計"
          },
          {
            "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-56-3.jpg",
            "alt": "工作桌上的 Lyra 與其他掌上裝置"
          },
          {
            "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-56-4.jpg",
            "alt": "Vento 連接 AI 與實體世界的定位"
          },
          {
            "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-56-5.jpg",
            "alt": "透明互動活動識別證案例"
          }
        ],
        "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Maker/Vento%20AI%E5%AF%A6%E9%AB%94%E5%8E%9F%E5%9E%8B%E5%B9%B3%E5%8F%B0.md"
      }
    ],
    "addedAt": "2026-10-03"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "四點驅動可變形液滴桌面",
    "category": "靈感清單",
    "summary": "四點驅動可變形液滴桌面——在極簡白色薄面下以四組氣動、拉索、振動或磁性致動改變局部坡度與張力，使表面的液滴／珠體緩慢移動、聚合並形成紋理；適合做成安靜的桌面動態藝術、物理資訊顯示器或表面張力教具。來源：IG christophher1992。詳見：四點驅動可變形液滴桌面。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L113",
    "id": "靈感收集點子清單.md#%E5%9B%9B%E9%BB%9E%E9%A9%85%E5%8B%95%E5%8F%AF%E8%AE%8A%E5%BD%A2%E6%B6%B2%E6%BB%B4%E6%A1%8C%E9%9D%A2",
    "ordinal": 63,
    "related": [
      {
        "source": "Maker/四點驅動可變形液滴桌面.md",
        "title": "四點驅動可變形液滴桌面",
        "category": "Maker",
        "summary": "Instagram 帳號 christophher1992 展示一座黑色方盒，上方覆蓋白色方形工作面。數顆透明／銀色液滴或珠體會在表面緩慢移動、彼此聚合，最後在中央形成一片有細密紋理的圓形區域。",
        "more": "影片沒有顯示作品名稱、材料、控制器或完整驅動機構；盒身只能辨識到類似 NIKOLATORY 的銘牌。因此以下將它記錄為一種可變形表面動態裝置，而不把材料直接判定成水、鐵磁流體、液態金屬或特定非牛頓流體。\n\n- 約正方形的白色上板／薄膜，中央有黑色定位點或開孔。\n- 四周可看到數個小孔或固定點。\n- 拆下上板後，背面有四個粉紅色接頭。\n- 四條透明軟管、拉索或導管從不同方向匯向中央黑色零件。\n- 工作面安裝在黑色箱體上，箱內應容納致動器、控制器和電源。\n\n透明線材看起來像軟管，但單張照片無法確認它傳遞的是氣壓、液壓、機械拉力或只是柔性連接。也看不到致動端，因此不能確定是泵、servo、線性致動器、偏心馬達或喇叭。",
        "model": -1,
        "theme": "creative",
        "images": [
          {
            "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-57-1.jpg",
            "alt": "方盒上的白色動態工作面"
          },
          {
            "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-57-2.jpg",
            "alt": "俯視多顆液滴或珠體"
          },
          {
            "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-57-3.jpg",
            "alt": "工作面背後的四點透明連接"
          },
          {
            "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-57-4.jpg",
            "alt": "中央形成具有細密紋理的圓形"
          }
        ],
        "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Maker/%E5%9B%9B%E9%BB%9E%E9%A9%85%E5%8B%95%E5%8F%AF%E8%AE%8A%E5%BD%A2%E6%B6%B2%E6%BB%B4%E6%A1%8C%E9%9D%A2.md"
      }
    ],
    "addedAt": "2026-10-03"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "機械鍵軸太空人換臉按壓玩具",
    "category": "靈感清單",
    "summary": "機械鍵軸太空人換臉按壓玩具——將標準機械鍵盤軸藏在 3D 列印太空人面罩後，按壓角色臉即可得到鍵軸的聲音、行程與回彈；骷髏、熊等臉板可像鍵帽一樣替換，是「廉價標準核心＋角色造型包」的低風險商品，完成品可落在 NT$199～399。來源：IG idmyron。詳見：機械鍵軸太空人換臉按壓玩具。",
    "more": "",
    "model": -1,
    "theme": "sensing",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L114",
    "id": "靈感收集點子清單.md#%E6%A9%9F%E6%A2%B0%E9%8D%B5%E8%BB%B8%E5%A4%AA%E7%A9%BA%E4%BA%BA%E6%8F%9B%E8%87%89%E6%8C%89%E5%A3%93%E7%8E%A9%E5%85%B7",
    "ordinal": 64,
    "related": [
      {
        "source": "Maker/機械鍵軸太空人換臉按壓玩具.md",
        "title": "機械鍵軸太空人換臉按壓玩具",
        "category": "Maker",
        "summary": "Instagram 作者 idmyron 展示一款名為 Astronaut in Space clicker 的 3D 列印按壓玩具，並表示模型可在其 Patreon、Thangs3D 與 Cults3D 取得。",
        "more": "外觀是一名站在圓形月球／星空背板前的小太空人；按壓面罩中的角色臉會壓動藏在背後的機械鍵盤軸，產生清脆回彈。照片同時出現骷髏臉和熊臉版本，顯示同一太空人身體可以更換角色面板。\n\n從組裝畫面可以看出核心是一顆標準十字軸心的機械鍵盤 switch：\n\n1. 方形 3D 列印座固定鍵軸。\n2. 角色臉或面罩背面設計十字插槽，直接套在軸心上。\n3. 按下面罩時，鍵軸提供約數毫米行程、段落感、聲音與自動回彈。\n4. 太空人身體遮住鍵軸，圓形背板同時提供握持面積和主題場景。\n5. 分色列印或分件組裝形成頭盔、制服、星星、月球與角色臉。",
        "model": -1,
        "theme": "maker",
        "images": [
          {
            "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-58-1.jpg",
            "alt": "機械鍵軸裝入 3D 列印固定座"
          },
          {
            "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-58-2.jpg",
            "alt": "骷髏臉太空人版本"
          },
          {
            "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-58-3.jpg",
            "alt": "熊臉太空人版本"
          },
          {
            "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-58-4.jpg",
            "alt": "完整太空人正面外觀"
          }
        ],
        "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Maker/%E6%A9%9F%E6%A2%B0%E9%8D%B5%E8%BB%B8%E5%A4%AA%E7%A9%BA%E4%BA%BA%E6%8F%9B%E8%87%89%E6%8C%89%E5%A3%93%E7%8E%A9%E5%85%B7.md"
      }
    ],
    "addedAt": "2026-10-03"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "Deskimon 模組化桌面表情機器人",
    "category": "靈感清單",
    "summary": "Deskimon 模組化桌面表情機器人——直接以 Waveshare ESP32-S3 1.75 吋圓形 AMOLED 整合板作為臉與控制核心，搭配選配電池和可互換的 3D 列印角色外殼；用表情動畫、觸摸、聲音與 IMU 反應營造生命感，不需馬達或客製 PCB，適合採「核心裝置 NT$1,990～2,990＋角色包 NT$299～599」模式。來源：IG creativichance／deskimons。詳見：Deskimon 模組化桌面表情機器人。",
    "more": "",
    "model": -1,
    "theme": "sensing",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L115",
    "id": "靈感收集點子清單.md#Deskimon%20%E6%A8%A1%E7%B5%84%E5%8C%96%E6%A1%8C%E9%9D%A2%E8%A1%A8%E6%83%85%E6%A9%9F%E5%99%A8%E4%BA%BA",
    "ordinal": 65,
    "related": [
      {
        "source": "Maker/Deskimon模組化桌面表情機器人.md",
        "title": "Deskimon 模組化桌面表情機器人",
        "category": "Maker",
        "summary": "Instagram 帳號 creativichance 與 deskimons 展示一系列圓形臉孔的桌面機器人。照片中的角色戴著黑色耳機、紅色身體，圓形 AMOLED 顯示黃色眼睛；拆開後可看到圓形整合板與一顆 3.7V 1000mAh LiPo 電池。",
        "more": "這個系列名為 Deskimon。官方把它定位成可自行製作的互動桌面機器人：一塊整合螢幕板、3D 列印身體與 Deskimon 軟體即可完成，不需焊接。\n\n- Deskimon 官方產品頁\n- Waveshare ESP32-S3 Touch AMOLED 1.75 官方頁\n- Waveshare 技術文件\n\nDeskimon 使用 Waveshare ESP32-S3-Touch-AMOLED-1.75：",
        "model": -1,
        "theme": "maker",
        "images": [
          {
            "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-59-1.jpg",
            "alt": "戴耳機的 Deskimon Neo"
          },
          {
            "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-59-2.jpg",
            "alt": "Deskimon 頭部內的整合板與鋰電池"
          }
        ],
        "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Maker/Deskimon%E6%A8%A1%E7%B5%84%E5%8C%96%E6%A1%8C%E9%9D%A2%E8%A1%A8%E6%83%85%E6%A9%9F%E5%99%A8%E4%BA%BA.md"
      }
    ],
    "addedAt": "2026-10-03"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "自行車雙輪自動翻頁鐘",
    "category": "靈感清單",
    "summary": "自行車雙輪自動翻頁鐘——讓自行車前後輪的黑色內圈分別顯示小時與分鐘，以自動翻頁／數字鼓的切換動作模擬車輪旋轉；官方完成品售價 US$49.90，核心不是圓形螢幕，而是兩組可靠同步的低速機械顯示模組。來源：NIKOLATOY Creative Bicycle Automatic Page Turning Clock。詳見：自行車雙輪自動翻頁鐘。",
    "more": "",
    "model": -1,
    "theme": "maker",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L116",
    "id": "靈感收集點子清單.md#%E8%87%AA%E8%A1%8C%E8%BB%8A%E9%9B%99%E8%BC%AA%E8%87%AA%E5%8B%95%E7%BF%BB%E9%A0%81%E9%90%98",
    "ordinal": 66,
    "related": [
      {
        "source": "Maker/自行車雙輪自動翻頁鐘.md",
        "title": "自行車雙輪自動翻頁鐘",
        "category": "Maker",
        "summary": "Instagram 帳號 nikolatoyofficial 展示一座自行車造型桌鐘：前後輪的黑色圓盤分別顯示小時與分鐘，外圈白色輪框、車架、座墊與把手共同形成完整自行車輪廓。",
        "more": "NIKOLATOY 官網名稱為 Creative Bicycle Automatic Page Turning Clock，零售價 US$49.90，查詢時為售罄狀態。官方頁面沒有提供尺寸、材質、電源、機芯或內部結構，因此以下只將它確認為自動翻頁鐘，不把黑色顯示區誤判為圓形 LCD。\n\n- NIKOLATOY 官方產品頁\n\n- 前輪顯示小時，照片中為 3 PM。\n- 後輪顯示分鐘，照片中為 38。\n- 黑色數字頁面位於白色輪框內，翻動本身就像輪子轉動。\n- 車架主要是固定、定位與敘事外殼，不必承擔真正騎乘結構的受力。\n- 黑色底座隱藏機芯、傳動、電源和兩輪間的連接。",
        "model": -1,
        "theme": "maker",
        "images": [
          {
            "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-60-1.jpg",
            "alt": "自行車雙輪自動翻頁鐘"
          }
        ],
        "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Maker/%E8%87%AA%E8%A1%8C%E8%BB%8A%E9%9B%99%E8%BC%AA%E8%87%AA%E5%8B%95%E7%BF%BB%E9%A0%81%E9%90%98.md"
      }
    ],
    "addedAt": "2026-10-03"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "可辨識棋子的智慧城市格盤",
    "category": "靈感清單",
    "summary": "可辨識棋子的智慧城市格盤——房屋與樹木棋子放入方格後，由霍爾感測、電阻接點、NFC 或攝影機辨識位置並即時計算城市分數；原始畫面可能只是 AI 概念渲染，因此以可實作的 3 × 3／5 × 5 感測棋盤重新定義，適合城市規劃與氣候教育。來源：IG retrotechlab。詳見：可辨識棋子的智慧城市格盤。",
    "more": "",
    "model": -1,
    "theme": "sensing",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-50-1.png",
        "alt": "CNC 鋁合金 Apple Watch 改裝殼原始參考圖"
      },
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-44-1.png",
        "alt": "D10 機械骰子計數器原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L117",
    "id": "靈感收集點子清單.md#%E5%8F%AF%E8%BE%A8%E8%AD%98%E6%A3%8B%E5%AD%90%E7%9A%84%E6%99%BA%E6%85%A7%E5%9F%8E%E5%B8%82%E6%A0%BC%E7%9B%A4",
    "ordinal": 67,
    "related": [
      {
        "source": "Maker/可辨識棋子的智慧城市格盤.md",
        "title": "可辨識棋子的智慧城市格盤",
        "category": "Maker",
        "summary": "Instagram 帳號 retrotechlab 展示一塊復古電子遊戲機風格的方格盤，玩家把橘色房屋和綠色樹木放進格子，機身前方有藍色數字顯示與 SELECT 按鍵，旁邊盒子似乎可收納棋子。",
        "more": "目前未找到可核對的產品名稱、規則、BOM、影片拆解或銷售頁面。畫面的材質、光線、字樣和部分結構帶有 AI 概念渲染特徵，因此不能確認它是實際可運作產品。以下只把它當成「智慧實體棋盤」的設計提案。\n\n棋盤本身知道每個格子放了什麼棋子，並立即更新分數、資源或城市狀態：\n\n- 房屋代表人口、收入或耗能。\n- 樹木代表環境、遮蔭或碳匯。\n- 鄰接與排列產生加分、扣分或連鎖效果。\n- 玩家不需要手動輸入座標，放下棋子就是操作。\n- 前方顯示器只呈現分數和回合，規則仍由實體物件承載。",
        "model": -1,
        "theme": "ai",
        "images": [
          {
            "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-61-1.jpg",
            "alt": "房屋與樹木棋子的智慧城市格盤概念"
          }
        ],
        "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Maker/%E5%8F%AF%E8%BE%A8%E8%AD%98%E6%A3%8B%E5%AD%90%E7%9A%84%E6%99%BA%E6%85%A7%E5%9F%8E%E5%B8%82%E6%A0%BC%E7%9B%A4.md"
      }
    ],
    "addedAt": "2026-10-03"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "雙人推撲克（暫名，正式名稱另取）",
    "category": "靈感清單",
    "summary": "雙人推撲克（暫名，正式名稱另取）——來源：Instagram 帳號 tna.929 與 dgdb6150 貼文（2026-08-29）。兩人各用同花色撲克牌 1 到 6 排一列，輪流擲骰子；點數可直接推對應的牌，或拆成不重複的小點數分推幾張（2 不能拆 1 和 1，4 不能拆 2 和 2，6 不能拆 3 和 3）；已到中間的牌不推；可把對方已到中間的牌推回去；擲到無牌可動就換人；誰六張先全到中間誰贏。適合做手機雙人網頁小遊戲，已交小遊戲製作專案經理放選題池。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L121",
    "id": "靈感收集點子清單.md#%E9%9B%99%E4%BA%BA%E6%8E%A8%E6%92%B2%E5%85%8B%EF%BC%88%E6%9A%AB%E5%90%8D%EF%BC%8C%E6%AD%A3%E5%BC%8F%E5%90%8D%E7%A8%B1%E5%8F%A6%E5%8F%96%EF%BC%89",
    "ordinal": 68,
    "related": [],
    "addedAt": "2026-10-04"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "拆開看骨架的收集玩具",
    "category": "靈感清單",
    "summary": "拆開看骨架的收集玩具——來源：Instagram 帳號 creanzacr（哥斯大黎加店家 Creanza）介紹 Half Toys：磁吸動物模型從中間打開，裡面是可拼成 3D 骨架的零件，分海洋、動物、恐龍、森林四個系列收集。可延伸方向：網頁上「打開動物、拼骨架、收集圖鑑」的小遊戲或互動學習頁（自己畫，不用原商品名與圖）。",
    "more": "",
    "model": -1,
    "theme": "ai",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L122",
    "id": "靈感收集點子清單.md#%E6%8B%86%E9%96%8B%E7%9C%8B%E9%AA%A8%E6%9E%B6%E7%9A%84%E6%94%B6%E9%9B%86%E7%8E%A9%E5%85%B7",
    "ordinal": 69,
    "related": [],
    "addedAt": "2026-10-04"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "終端機風天氣網頁",
    "category": "靈感清單",
    "summary": "終端機風天氣網頁——查天氣預報要像進入控制室讀情報：點陣圖示與等寬字體、細網格底圖、方塊組成的長條圖與高情報密度（精確氣溫、體感、風速、相對濕度、氣壓、月相、日出日落），分三個方向：日常天氣控制室（建議先做）、太空／地磁天氣、城市狀態終端。靈感來源：lay.the.designer 概念貼文。詳見：終端機風天氣網頁。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/Web/assets/terminal-weather-inspiration.png",
        "alt": "終端機風天氣網頁靈感截圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L123",
    "id": "靈感收集點子清單.md#%E7%B5%82%E7%AB%AF%E6%A9%9F%E9%A2%A8%E5%A4%A9%E6%B0%A3%E7%B6%B2%E9%A0%81",
    "ordinal": 70,
    "related": [
      {
        "source": "Web/終端機風天氣網頁.md",
        "title": "終端機風天氣網頁",
        "category": "Web",
        "summary": "查天氣預報要像進入控制室讀情報，而不是打開一般天氣應用程式。",
        "more": "- 點陣圖示與點陣／等寬字體\n- 細網格底圖\n- 方塊組成的長條圖（不要平滑進度條）\n- 情報密度偏高：精確到小數的氣溫、體感、風速、相對濕度、氣壓、月相、日出日落\n- 動畫克制：長條填滿、數字跳動即可\n\n最接近原圖左側。真正會天天開的網頁天氣。\n\n- 手機直式單頁優先\n- 頂列：城市／國家 · 精確氣溫\n- 主視覺：點陣天氣圖示＋大號氣溫\n- 側欄：體感、風速、相對濕度、氣壓\n- 時段列：少數幾個小時的圖示＋溫度\n- 區塊長條：溫度／濕度／氣壓／風／雲量／降雨機率\n- 底層細節：月出月落、月相、日出日落、晝夜長\n- 淺色日間／深色夜間可切換\n- 預設城市可設台北；第一版可用假資料跑通畫面",
        "model": -1,
        "theme": "creative",
        "images": [],
        "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Web/%E7%B5%82%E7%AB%AF%E6%A9%9F%E9%A2%A8%E5%A4%A9%E6%B0%A3%E7%B6%B2%E9%A0%81.md"
      }
    ],
    "addedAt": "2026-10-05"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "手寫信傳遞平台（即時地圖飛行視覺化）",
    "category": "靈感清單",
    "summary": "手寫信傳遞平台（即時地圖飛行視覺化）——在數位平台上傳送手寫信（觸控筆手寫或紙本拍照），信件以紙飛機形式依真實地理距離在地圖上飛行，寄件人可即時看到飛行軌跡、剩餘距離與預計抵達時間，抵達後收件人才能點開閱讀；賣的是「在路上」的儀式感，不是秒達聊天。靈感來源：harin.design「throw」概念。詳見：手寫信傳遞平台。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/Web/assets/throw-paper-plane.png",
        "alt": "手寫信傳遞平台紙飛機靈感截圖"
      },
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/Web/assets/throw-handwritten-letter.png",
        "alt": "手寫信傳遞平台手寫信靈感截圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L125",
    "id": "靈感收集點子清單.md#%E6%89%8B%E5%AF%AB%E4%BF%A1%E5%82%B3%E9%81%9E%E5%B9%B3%E5%8F%B0%EF%BC%88%E5%8D%B3%E6%99%82%E5%9C%B0%E5%9C%96%E9%A3%9B%E8%A1%8C%E8%A6%96%E8%A6%BA%E5%8C%96%EF%BC%89",
    "ordinal": 71,
    "related": [
      {
        "source": "Web/手寫信傳遞平台.md",
        "title": "手寫信傳遞平台",
        "category": "Web",
        "summary": "在數位平台上傳送手寫信，依真實地理距離飛行，並即時視覺化傳遞過程。賣的是「在路上」，不是秒達聊天。",
        "more": "1. 寫／拍：觸控筆手寫，或紙本拍照裁成信面\n2. 選收件人：地圖上的人／城市（寄件與收件位置要真實或近似真實）\n3. 扔出：紙飛機／信箋起飛\n4. 傳遞中（產品靈魂）：雙方（至少寄件人）能即時看到飛行軌跡、剩餘距離、預計抵達；速度依真實距離縮放，禁止瞬移\n5. 抵達：信落在對方地圖釘點，點開才讀內容\n\n不是氣泡對話。延遲是功能，視覺化飛行是舞台。安靜、慢、有儀式感。\n\n第一版先採「可玩快」：同城約數十秒、跨城數分鐘、跨洲最長約十到二十分鐘，方便展示與測試。  \n「浪漫慢」（跨洋一小時級）列為可調參數，第二版再開。",
        "model": -1,
        "theme": "creative",
        "images": [],
        "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Web/%E6%89%8B%E5%AF%AB%E4%BF%A1%E5%82%B3%E9%81%9E%E5%B9%B3%E5%8F%B0.md"
      }
    ],
    "addedAt": "2026-10-05"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "自建鐵道時間軸視覺（軌島方向）",
    "category": "靈感清單",
    "summary": "自建鐵道時間軸視覺（軌島方向）——在深色地圖上用同一條全域時間軸播放全台（或選定路網）列車位置，可播放／暫停、倍速、跟車，也可撥到非即時的歷史／模擬時刻並清楚標示；靈感站 railisland.tw 與其公開原始碼屬「原始碼公開但未授權再散布」，因此必須全新自建，不可複製或分支其程式、資產與品牌。詳見：軌島方向：鐵道時間軸視覺（自建）。",
    "more": "",
    "model": -1,
    "theme": "maker",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L128",
    "id": "靈感收集點子清單.md#%E8%87%AA%E5%BB%BA%E9%90%B5%E9%81%93%E6%99%82%E9%96%93%E8%BB%B8%E8%A6%96%E8%A6%BA%EF%BC%88%E8%BB%8C%E5%B3%B6%E6%96%B9%E5%90%91%EF%BC%89",
    "ordinal": 72,
    "related": [
      {
        "source": "Web/軌島時間軸視覺自建.md",
        "title": "軌島方向：鐵道時間軸視覺（自建）",
        "category": "Web",
        "summary": "在深色地圖上，用同一條時間軸播放全台（或選定路網）列車／運具位置，可跟車、可加速、可撥時鐘看「非即時」歷史／模擬時刻。",
        "more": "靈感站與倉庫是 source-available（原始碼公開），不是可自由改再發布的開源授權。授權要旨：未授權再散布、製作衍生作品或另行發布。\n\n因此：\n\n- 禁止：把 siriushsu/taiwan-rail-live clone／fork 當自己產品基底、改品牌上線、搬貼其程式／資產／品牌。\n- 允許：本機閱讀公開碼學習技法；自己開新倉庫、自己寫程式與介面，接自己合規取得的公開資料。\n- 產品名稱與視覺可「感覺相近」，但必須是全新實作，不得暗示官方關係或抄襲品牌。",
        "model": -1,
        "theme": "maker",
        "images": [],
        "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Web/%E8%BB%8C%E5%B3%B6%E6%99%82%E9%96%93%E8%BB%B8%E8%A6%96%E8%A6%BA%E8%87%AA%E5%BB%BA.md"
      }
    ],
    "addedAt": "2026-10-05"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "島線時鐘（island-line-clock）",
    "category": "靈感清單",
    "summary": "島線時鐘（island-line-clock）——第 66 筆的正式自建專案版：產品倉庫 ioksengtan/island-line-clock，深色地圖加全域時鐘驅動運具標記沿路線插值移動，可跟車、倍速並清楚標示非即時；對外中文名稱避開「軌道」「軌島」。詳見：island-line-clock：運具時間軸視覺（自建）。",
    "more": "",
    "model": -1,
    "theme": "maker",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/Web/assets/island-line-clock-inspiration.png",
        "alt": "島線時鐘靈感截圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L129",
    "id": "靈感收集點子清單.md#%E5%B3%B6%E7%B7%9A%E6%99%82%E9%90%98%EF%BC%88island-line-clock%EF%BC%89",
    "ordinal": 73,
    "related": [
      {
        "source": "Web/island-line-clock.md",
        "title": "island-line-clock：運具時間軸視覺（自建）",
        "category": "Web",
        "summary": "- 倉庫／對內代號：island-line-clock\n- 對外中文暫名：待專案專案經理提案（避開「軌道」「軌島」當品牌）\n- 靈感站名稱僅作來源標註，不作產品名",
        "more": "在深色地圖上，用同一條時間軸播放全台（或選定路網）運具位置，可跟車、可加速、可撥時鐘看「非即時」歷史／模擬時刻。\n\n靈感站與倉庫是 source-available（原始碼公開），不是可自由改再發布的開源授權。授權要旨：未授權再散布、製作衍生作品或另行發布。\n\n因此：",
        "model": -1,
        "theme": "maker",
        "images": [],
        "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Web/island-line-clock.md"
      }
    ],
    "addedAt": "2026-10-05"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "島線相框（island-line-frame）",
    "category": "靈感清單",
    "summary": "島線相框（island-line-frame）——把運具時間軸做成可上牆的居家相框畫面：以「畫作模式」長時間播放深色地圖上緩慢流動的路線與運具，操作控件極少或隱藏，預設安靜、低眩光；與島線時鐘分倉、分產品，倉庫 ioksengtan/island-line-frame。詳見：島線相框（island-line-frame）。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L131",
    "id": "靈感收集點子清單.md#%E5%B3%B6%E7%B7%9A%E7%9B%B8%E6%A1%86%EF%BC%88island-line-frame%EF%BC%89",
    "ordinal": 74,
    "related": [
      {
        "source": "Web/island-line-frame.md",
        "title": "島線相框（island-line-frame）",
        "category": "Web",
        "summary": "兩條「島線」產品線可共享「區域／班表」概念與自建技法，但 分倉、分產品。  \n靈感可對照 https://railisland.tw/ 與公開倉庫 siriushsu/taiwan-rail-live（source-available）：禁止 clone／fork／搬貼其程式、資產或品牌。",
        "more": "把運具時間軸做成可上牆的居家相框畫面：偏「畫作／擺設」模式，不是一般網頁操作台。\n\n1. 相框形態：直立／橫式螢幕或實體相框感外框；適合放客廳、書架、牆面\n2. 畫作模式：畫面以可長看為主——深色地圖、路線與運具緩慢流動；操作控件極少或隱藏\n3. 時間軸仍在：運具依時間在路線上移動；可選輕量時鐘／非即時標示，但不搶視覺主角\n4. 居家節奏：預設偏安靜、低對比眩光；可調亮／夜間\n\n- 單頁／全螢幕「相框畫面」為主（可之後嵌進簡單設定頁）\n- 路網可先對齊島線時鐘近程（例如臺鐵相關子集），但畫面與互動以「擺設」為準\n- 資料：公開班表／開放資料，合規自接；自寫圖層與動畫\n- 產品碼只進 island-line-frame",
        "model": -1,
        "theme": "ai",
        "images": [],
        "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/Web/island-line-frame.md"
      }
    ],
    "addedAt": "2026-10-05"
  },
  {
    "source": "靈感收集點子清單.md",
    "title": "極座標筆式繪圖機（Polar Pen Plotter）",
    "category": "靈感清單",
    "summary": "極座標筆式繪圖機（Polar Pen Plotter）——來源：Instagram Reels 帳號 algorigraph（\"I built this Polar Pen Plotter\"）。圓形旋轉平台搭配徑向滑軌：步進馬達轉動承載白紙的圓盤、另一軸沿半徑移動筆架，再加微型伺服馬達（SG90）控制抬筆／落筆，用 3D 列印外殼與齒圈、Arduino 以 USB 供電控制。畫面是由中心向外的同心螺旋線，以線條疏密呈現人臉肖像的明暗。可延伸成桌面擺件或「肖像螺旋畫」小機台。",
    "more": "",
    "model": -1,
    "theme": "creative",
    "images": [
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-69-1.png",
        "alt": "極座標筆式繪圖機畫圖初期原始參考圖"
      },
      {
        "src": "https://raw.githubusercontent.com/ioksengtan/ioksengtan/ec4e3552b904aba6927705c95e18498879ee89ab/idea/assets/idea-collection/idea-69-2.png",
        "alt": "極座標筆式繪圖機完成肖像原始參考圖"
      }
    ],
    "url": "https://github.com/ioksengtan/ioksengtan/blob/master/idea/%E9%9D%88%E6%84%9F%E6%94%B6%E9%9B%86%E9%BB%9E%E5%AD%90%E6%B8%85%E5%96%AE.md#L132",
    "id": "靈感收集點子清單.md#%E6%A5%B5%E5%BA%A7%E6%A8%99%E7%AD%86%E5%BC%8F%E7%B9%AA%E5%9C%96%E6%A9%9F%EF%BC%88Polar%20Pen%20Plotter%EF%BC%89",
    "ordinal": 75,
    "related": [],
    "addedAt": "2026-10-05"
  }
];
