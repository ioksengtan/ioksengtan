#!/usr/bin/env python3
"""Hand-laid standard schematics (schemdraw) for the validated netlists -> data/schematics.json.
Component values are typed from the matching netlist; run tools/check_schematics.py to compare."""
import json, pathlib, re, sys
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import schem_defs1 as a, schem_defs2 as b, schem_defs3 as c, schem_defs4 as d, schem_defs5 as e5, schem_defs6 as e6, schem_defs7 as e7, schem_defs8 as e8
root = pathlib.Path(__file__).resolve().parent.parent
REG = {
 'ce-amp-fig3.44': a.ce_amp, 'jfet-cs-fig3.51': a.jfet_cs, 'opamp-basics-fig3.61': b.opamp_basics,
 'lm317-fig7.27': b.lm317, 'zener-reg-fig3.20': b.zener, 'doubler-fig7.10': b.doubler,
 'lpf-80m-fig11.95': b.lpf80, 'wavetrap-fig11.92': b.wavetrap, 'pi-match-fig5.58': b.pimatch,
 'comparator-hyst-fig3.68': c.comparator, 'photodiode-tia-fig3.28': c.tia, 'precision-rect-fig3.71': c.precision,
 'colpitts-fig9.12': c.colpitts, 'am-detector-fig8.3': c.amdet, 'sallen-key-fig3.69': c.sallen,
 'wien-osc-fig25.20': c.wien, 'buck-fig7.30': c.buck, 'psu-13v8-fig7.69': c.psu, 'diode-dbm-fig10.22': d.dbm,
 'xtal-ladder-fig11.11.1': e5.xtal_ladder, 'rf-probe-fig25.11': e5.rf_probe, 'varactor-tank-fig3.21': e5.varactor,
 'log-amp-fig3.73': e5.log_amp, 'mosfet-driver-fig3.57': e5.mosfet, 'mic-preamp-fig13.28': e5.mic,
 'freq-doubler-fig13.25': e5.doubler,
 'vertical-match-fig24.12': e8.vertical_match, 'microwatter-fig25.12': e8.microwatter, 'rf-sniffer-fig27.33': e8.rf_sniffer,
 'agc-rectifier-fig12.36b': e7.agc_rect, 'cw-shaper-fig13.36': e7.cw_shaper,

 'lpf-1p8-54-fig11.101': e6.lpf54, 'diplexer-fig11.97': e6.diplexer, 'speech-clipper-fig13.29': e6.clipper,
 'crystal-radio-fig12.2': e6.crystal_radio, 'wheatstone-fig25.6': e6.wheatstone, 'rf-feedback-amp-fig5.51': e6.rf_fb,
 'mfb-bandpass-fig12.49': e5.mfb,
}
NOTE = {
 'vertical-match-fig24.12': '圖中只畫電氣等效：同一個 T400A-2 環形電感（每圈² 40 nH 是我由書中「35 圈約 50 µH」推得）分成「接地端到饋入點」與「饋入點到天線」兩段；天線（Ca、Ra）是測試用的 43 ft 直立天線等效，電阻值是我的假設。實體以跳線選擇 160／80 m。',
 'microwatter-fig25.12': '元件值取自書中 Fig 25.12；CA3039 二極體以小訊號矽二極體模型代替（Is、接面電容是我的假設）；INA2128 以增益 418 的行為模型代替，偏移歸零電路（1/2 INA2128、R14）、電池與穩壓部分、量程開關 S1 未畫（圖中 Rsel 為最不靈敏的 3.9 kΩ 檔）。',
 'rf-sniffer-fig27.33': '元件值取自書中 Fig 27.33；741 與 LM386 為行為模型（LM386 以 C8 設定增益 200，未畫電源腳與 C8、C9、電源開關）；拾音線圈以電壓源加 100 Ω 代替，是我的假設；C2、C5 的接法是我依圖判讀（皆接地）。',
 'agc-rectifier-fig12.36b': '元件值取自書中 Fig 12.36(B)；1/4 ’084 運放以行為模型代替；書中未標出電源去耦電容（0.1 µF），這裡也未畫。',
 'cw-shaper-fig13.36': '只畫鍵控波形路徑（比較器 U2B → Sallen-Key 低通 → 位準轉換 U3A）；書中的 ADG202A 開關、CLC5523 增益放大器、U2A/U2C 的 12 ms 延遲電路未畫；LM339 開集極輸出在模擬中以開關代替，參考電壓 2.5 V 是我的假設。',
 'lpf-1p8-54-fig11.101': '元件值取自書中 Fig 11.101；實體的電感是銅管繞製，電容用鐵氟龍夾層銅板，圖中只畫電氣等效。',
 'diplexer-fig11.97': '圖上是把書中 Fig 11.97 的歸一化原型值，依書中公式換算成 50 Ω、fco 5.45 MHz（K＝1.005）後的值；電路相同，只是縮放。',
 'speech-clipper-fig13.29': '元件值取自書中 Fig 13.29；100k CLIP LEVEL 電位器設在最大（模擬中接成 Rcl）、回授電位器設在最大增益，前後的 300–3000 Hz 帶通濾波器未畫；TL081 為行為模型。',
 'crystal-radio-fig12.2': '元件值取自書中 Fig 12.2；耦合係數 K＝0.5、1N34 參數與天線等效（50 Ω＋100 pF）是我的假設；2000 Ω 耳機以 20 kΩ 負載代替（書中標示）。',
 'wheatstone-fig25.6': '書中只給原理，臂電阻值是我選的；Rx 在模擬中以 0.5–2 kΩ 掃描。',
 'rf-feedback-amp-fig5.51': '拓撲取自書中 Fig 5.51／5.52（集極—基極回授電阻加射極衰減）；元件值是我設計的，不是書中值。',
 'xtal-ladder-fig11.11.1': '晶體等效電路（Lm 23.4 mH、Cm 15 fF、Rm 20 Ω、Cp 4 pF）與 68 pF、300 Ω 都是我選的假設值；模擬的阻帶比實物深很多（理想化）。',
 'rf-probe-fig25.11': '蕭特基模型參數與 50 Ω 信號源內阻是我的假設，不是書中數值。',
 'varactor-tank-fig3.21': '這是我設計的調諧槽路示範，變容二極體 60 pF＠0 V、M＝0.5 為假設值；圖中只畫一組，模擬同時比較 1／3／6／10 V 四個偏壓。',
 'log-amp-fig3.73': '拓撲取自書中對數放大器概念，電阻值與運放模型為我的選擇。',
 'mosfet-driver-fig3.57': '電路為我設計的低側 MOSFET 驅動示範；模擬用 level-1 MOSFET，未計入閘極電容。',
 'mic-preamp-fig13.28': '拓撲為標準反相／非反相麥克風前級，元件值是我的選擇，不是書中圖上的值；偏壓以 Rb 接地簡化。',
 'freq-doubler-fig13.25': 'C 類倍頻器，槽路 1 µH ∥ 517 pF 諧振於 7 MHz；元件值為我的設計值。',
 'mfb-bandpass-fig12.49': '多重回授帶通，中心 1 kHz、Q≈5；元件值由我計算，不是書中圖上的值。',
 'psu-13v8-fig7.69': '未畫：MC3423 過壓保護、保險絲、電源濾波；LM338 在模擬中是行為模型；繞組電阻 Rsec（各 0.1 Ω，我的假設）未畫。',
 'comparator-hyst-fig3.68': '模擬用行為模型比較器（±5 V），此處以運算放大器符號表示。',
 'precision-rect-fig3.71': 'netlist 在 o 點到反相輸入之間有 1 Ω 電阻（為收斂），圖中省略。',
 'wavetrap-fig11.92': 'L1 的串聯電阻（Rl1 2.5 Ω）代表電感損耗；電容 C1 在模擬中取 300 pF。',
 'wien-osc-fig25.20': '書中用燈泡穩幅，這裡的反向並聯二極體是我的替代假設。',
 'diode-dbm-fig10.22': '變壓器在模擬中是耦合電感（K＝0.999）；兩個中心抽頭 ct、rct 之間取中頻；netlist 為收斂加的 4 個 1 MΩ 對地電阻未畫。',
 'am-detector-fig8.3': '輸入 AM 波在模擬中以行為源產生。',
 'opamp-basics-fig3.61': '模擬用 741 等級的單極點運放模型。',
}
out = {}
for k, f in REG.items():
    svg = f()
    w = float(re.search(r'viewBox="[-\d. ]+? [-\d. ]+? ([\d.]+) ', svg).group(1)) if re.search(r'viewBox="[-\d. ]+? [-\d. ]+? ([\d.]+) ', svg) else 600
    svg = svg.replace('class="sch"', f'class="sch" style="min-width:{int(w*0.8)}px"', 1)
    out[k] = dict(svg=svg, note=NOTE.get(k, ''))
    print(k, 'ok', len(svg)//1024, 'KB')
(root/'data/schematics.json').write_text(json.dumps(out, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
