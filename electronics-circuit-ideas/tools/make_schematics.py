#!/usr/bin/env python3
"""Hand-laid standard schematics (schemdraw) for the validated netlists -> data/schematics.json.
Component values are typed from the matching netlist; run tools/check_schematics.py to compare."""
import json, pathlib, re, sys
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import schem_defs1 as a, schem_defs2 as b, schem_defs3 as c, schem_defs4 as d, schem_defs5 as e5
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
 'freq-doubler-fig13.25': e5.doubler, 'mfb-bandpass-fig12.49': e5.mfb,
}
NOTE = {
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
