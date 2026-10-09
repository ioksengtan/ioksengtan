# 電子點子庫（electronics-circuit-ideas）

從《The ARRL Handbook for Radio Communications 2011》（第 88 版）整理出的電路專案與電路積木，共 111 筆。每筆有功能說明、難度、章節／PDF 頁碼／圖號、SPICE 可行性、台灣取得難度與延伸點子。

- `index.html`：可搜尋、篩選的點子庫頁面（單一檔案，直接開啟即可）
- `data/circuits.json`、`data/circuits.csv`：全部資料，是頁面的資料來源
- `spice/`：已在 ngspice 42 驗證的電路，每個資料夾一個電路：`circuit.cir`（純電路）＋ `tb.cir`（激勵、負載、分析與量測，以 `.include circuit.cir` 引入）
- `spice/wip/`：未通過驗證的嘗試（目前是 VXO）
- `cards/`：52 張電子點子撲克牌（`index.html` 可線上翻閱，`deck-print.pdf` 為 A4 列印版，6 頁正面加 1 頁背面，牌面尺寸 63.5×88.9 mm）
- `data/plots.json`、`data/graphs.json`：每個已驗證電路的模擬波形與自動產生的連接圖（由 `tools/make_plots.py`、`tools/make_graphs.py` 產生）
- `tools/make_plots.py`、`tools/make_graphs.py`：重跑 ngspice 取得波形、由 netlist 畫連接圖
- `data/bom.json`：18 個已驗證電路的 BOM 與取得難度逐項理由（`tools/make_bom.py`；是依常見程度的判斷，不是現貨或價格查詢）
- `data/schematics.json`：手工排版的標準電路圖（schemdraw，`tools/make_schematics.py`，`tools/check_schematics.py` 檢查元件值是否與 netlist 一致）
- `tools/build_site.py`、`tools/build_deck.py`：由 `data/`、`spice/`、`cards/deck.json` 重建頁面

## 驗證過的 netlist

| 電路 | 資料夾 | 驗證結果 |
|---|---|---|
| 13.8 V 5 A 線性電源 | `psu-13v8-fig7.69` | 20 Vac 次級 5 A 滿載 13.80 V；16 Vac 次級只有 12.70 V（漣波 0.85 Vp-p） |
| 80 m 低通濾波器 | `lpf-80m-fig11.95` | −3 dB 約 4.49 MHz，3.75 MHz 損耗 0.01 dB，7.5 MHz 以上約 58 dB |
| 廣播 wave trap | `wavetrap-fig11.92` | 陷波頻率與 1/(2π√LC) 相符（L 為假設值） |
| Pi 匹配網路 | `pi-match-fig5.58` | 50 Ω→200 Ω、7.1 MHz，失配損耗 0.002 dB |
| LM317 可調穩壓 | `lm317-fig7.27` | 7.56 V，與公式一致 |
| 全波倍壓器 | `doubler-fig7.10` | 約 31.1 V |
| 運放反相／非反相 | `opamp-basics-fig3.61` | 增益 20.0 dB，頻寬 99 kHz |
| 共射極放大器 | `ce-amp-fig3.44` | 增益 42.4 dB，Ic 約 1.28 mA |
| Zener 並聯穩壓 | `zener-reg-fig3.20` | 負載 0.5→10 mA：5.23→5.13 V |
| 施密特觸發器 | `comparator-hyst-fig3.68` | 門檻 −0.47／+0.47 V（理論 ±0.4545） |
| 光電二極體跨阻放大 | `photodiode-tia-fig3.28` | 120 dBΩ，−3 dB 約 100 kHz |
| 精密半波整流 | `precision-rect-fig3.71` | 100 mV 輸入 → 100.0 mV 輸出 |
| Colpitts 振盪器 | `colpitts-fig9.12` | 10.02 MHz（理論 10.2） |
| AM 包絡偵測 | `am-detector-fig8.3` | 還原音訊約 0.81 Vp-p |
| Sallen-Key 低通 | `sallen-key-fig3.69` | fc 1000.3 Hz（理論 1000.7） |
| Wien 電橋振盪器 | `wien-osc-fig25.20` | 990 Hz（理論 1 kHz），二極體穩幅為我的假設 |
| 降壓轉換器 | `buck-fig7.30` | 12 V→5.78 V，漣波 4 mVp-p |
| JFET 共源放大 | `jfet-cs-fig3.51` | 中頻增益 14.7 dB |
| 二極體環形 DBM | `diode-dbm-fig10.22` | 1 MHz／19 MHz 中頻各約 12 mV 峰值（轉換損耗約 −8 dB 量級，粗估） |

元件值取自書中圖的只有 80 m 低通濾波器與 13.8 V 電源；其餘電路只採用書上的拓樸，元件值由我選定或計算，各 netlist 檔頭有註明。

## 注意

- 書中圖片受著作權保護，未放進 repo。請用章節、PDF 頁碼與圖號到原書查閱。
- 「SPICE 可行性」「台灣取得難度」是我依內容與經驗做的估計，沒有逐項查現貨。
- 專案的完整零件表多半在書附光碟。

## 執行 netlist

```
sudo apt install ngspice
cd spice/lpf-80m-fig11.95 && ngspice -b tb.cir
```

## 撲克牌

四種花色是四個領域：♠ 電源與類比、♥ 振盪與混頻、♦ 濾波與匹配、♣ 收發與工具。每個花色 A 到 K 由易到難。只挑「SPICE 可行性為可或部分」且「台灣取得難度為易或中」的電路，所以真空管、微波、高壓都不在內。

## 網頁互動

點任一張卡片會開啟詳細視窗：總覽、模擬結果（ngspice 實跑的波形／頻率響應，可指著看數值）、電路圖（標準符號）、連接圖（由 netlist 自動排版，僅供對照）、circuit.cir 與 tb.cir 及複製鈕。網址加 `#c17` 可直接開啟第 17 筆。
