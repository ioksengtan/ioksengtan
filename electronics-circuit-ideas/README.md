# 電子點子庫（electronics-circuit-ideas）

從《The ARRL Handbook for Radio Communications 2011》（第 88 版）整理出的電路專案與電路積木，共 111 筆。每筆有功能說明、難度、章節／PDF 頁碼／圖號、SPICE 可行性、台灣取得難度與延伸點子。

- `index.html`：可搜尋、篩選的點子庫頁面（單一檔案，直接開啟即可）
- `data/circuits.json`、`data/circuits.csv`：全部資料，是頁面的資料來源
- `spice/`：已在 ngspice 42 驗證的 netlist 與 testbench，每個資料夾一個電路
- `spice/wip/`：未通過驗證的嘗試（目前是 VXO）
- `cards/`：52 張電子點子撲克牌（`index.html` 可線上翻閱，`deck-print.pdf` 為 A4 列印版，6 頁正面加 1 頁背面，牌面尺寸 63.5×88.9 mm）
- `tools/build_site.py`、`tools/build_deck.py`：由 `data/`、`spice/`、`cards/deck.json` 重建頁面

## 驗證過的 netlist

| 電路 | 資料夾 | 驗證結果 |
|---|---|---|
| 13.8 V 5 A 線性電源 | `psu-13v8-fig7.69` | 20 Vac 次級 5 A 滿載 13.80 V；16 Vac 次級掉到約 12.1 V |
| 80 m 低通濾波器 | `lpf-80m-fig11.95` | −3 dB 約 4.49 MHz，3.75 MHz 損耗 0.01 dB，7.5 MHz 以上約 58 dB |
| 廣播 wave trap | `wavetrap-fig11.92` | 陷波頻率與 1/(2π√LC) 相符（L 為假設值） |
| Pi 匹配網路 | `pi-match-fig5.58` | 50 Ω→200 Ω、7.1 MHz，失配損耗 0.002 dB |
| LM317 可調穩壓 | `lm317-fig7.27` | 7.56 V，與公式一致 |
| 全波倍壓器 | `doubler-fig7.10` | 約 31.1 V |
| 運放反相／非反相 | `opamp-basics-fig3.61` | 增益 20.0 dB，頻寬 99 kHz |
| 共射極放大器 | `ce-amp-fig3.44` | 增益 42.4 dB，Ic 約 1.28 mA |

元件值取自書中圖的只有 80 m 低通濾波器與 13.8 V 電源；其餘電路只採用書上的拓樸，元件值由我選定或計算，各 netlist 檔頭有註明。

## 注意

- 書中圖片受著作權保護，未放進 repo。請用章節、PDF 頁碼與圖號到原書查閱。
- 「SPICE 可行性」「台灣取得難度」是我依內容與經驗做的估計，沒有逐項查現貨。
- 專案的完整零件表多半在書附光碟。

## 執行 netlist

```
sudo apt install ngspice
cd spice/lpf-80m-fig11.95 && ngspice -b netlist.cir
```

## 撲克牌

四種花色是四個領域：♠ 電源與類比、♥ 振盪與混頻、♦ 濾波與匹配、♣ 收發與工具。每個花色 A 到 K 由易到難。只挑「SPICE 可行性為可或部分」且「台灣取得難度為易或中」的電路，所以真空管、微波、高壓都不在內。
