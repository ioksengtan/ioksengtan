#!/usr/bin/env python3
"""Build data/bom.json: a bill of materials per validated circuit, parsed from circuit.cir + tb.cir.
Each row carries a Taiwan-sourcing judgement and the reason for it. These are my judgements from
typical parts availability, NOT live stock or price checks. Run: python3 tools/make_bom.py"""
import json, math, pathlib, re, sys
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from spice_lib import combined, root

E24 = [1.0,1.1,1.2,1.3,1.5,1.6,1.8,2.0,2.2,2.4,2.7,3.0,3.3,3.6,3.9,4.3,4.7,5.1,5.6,6.2,6.8,7.5,8.2,9.1]
SUF = {'f':1e-15,'p':1e-12,'n':1e-9,'u':1e-6,'µ':1e-6,'m':1e-3,'k':1e3,'meg':1e6,'g':1e9}
def val(s):
    s = s.strip('{}').lower()
    m = re.match(r'^([\d.]+)(meg|[fpnuµmkg])?', s)
    return float(m.group(1)) * SUF.get(m.group(2) or '', 1) if m else None
def eng(v, unit):
    if unit == 'F' and 1e-6 <= v < 0.1: return f'{v*1e6:g}µF'
    for p, m in ((1e-12,'p'),(1e-9,'n'),(1e-6,'µ'),(1e-3,'m'),(1,''),(1e3,'k'),(1e6,'M')):
        if v < p*1000 or m == 'M': return f'{v/p:g}{m}{unit}'
def e24(v):
    d = 10 ** math.floor(math.log10(v)); best = min(E24, key=lambda x: abs(math.log(x*d/v)))
    return best*d, (best*d/v-1)*100

# ---- active / special parts: model or ref -> (part, spec, level, why)
SEMI = {
 'D1N4148': ('1N4148（小訊號二極體）', 'DO-35', '易', '最常見的通用二極體，電料行幾乎都有散裝。'),
 'D1N4002': ('1N4002（整流二極體 1 A）', 'DO-41', '易', '最常見的整流二極體，散裝一包就有。'),
 'DSCH_BUCK': ('1N5819（蕭特基 1 A／40 V）', 'DO-41', '易', '常見的蕭特基二極體，電料行與光華都有。'),
 'DSCH_DBM': ('1N5711／BAT43／HSMS-2820 等蕭特基（需配對 4 顆）', 'DO-35', '中', '環形混頻器要 4 顆特性一致的蕭特基；1N5711 等較少見，通常要挑料或向網路商店買，並自己配對。'),
 'DZ5V1': ('5.1 V 稽納二極體（1N5231B 或 1N751）', 'DO-35 0.5 W', '易', '5.1 V 稽納是標準值，通用料。'),
 'Q2N3904': ('2N3904（NPN）', 'TO-92', '易', '最常見的小訊號 NPN，電料行必備。'),
 'J2N5486': ('J310／MPF102／2N5486（N 通道 JFET）', 'TO-92', '中', '2N5486 已停產，常見替代 J310、MPF102、2N5457 要看店家有沒有；JFET 沒有 BJT 那麼普遍。'),
}
NOTE_OPA = ('LM741／TL071／LM358 等通用運算放大器', 'DIP-8', '易', '模擬用的是 741 等級的單極點模型；實作用 LM741、TL071、LM358 都是電料行常見料。')
SPECIAL = {  # folder -> {ref: (part, spec, level, why, qty_note)}  and 'skip' / 'extra'
 'ce-amp-fig3.44': {},
 'psu-13v8-fig7.69': {
   'skip': ['Rsec','Rsec2','D1','D2','D3','D4'],
   'extra': [
    (['T1'], '電源變壓器 110 V → 16–20 Vac / 5 A（約 100 VA）', 1, 'EI 型或環形', '中', '二次側 16–20 Vac、5 A 不是貨架上的常見規格，電料行通常要現貨挑近似規格（如 18 V 5 A）或請繞線行訂製；訂製要等時間。'),
    (['U1'], '橋式整流器 10 A / 100 V 以上（或 4 顆 1N5400 系列）', 1, 'KBPC / GBJ', '易', '10 A 橋堆是常見料。netlist 用 1N4002 當替身，5 A 負載實際要用大電流橋堆。'),
    (['U2'], 'LM338T（TO-220）或 LM338K（TO-3）', 1, 'TO-220 / TO-3', '中', 'TO-3 的 LM338K 較少見；TO-220 的 LM338T 較容易買到，但 5 A 要搭大散熱片，通常需自備。'),
    (['RL'], '假負載 2.76 Ω / ≥100 W（測試用，不屬於電源本體）', 1, '鋁殼功率電阻', '難', '100 W 以上的低阻值功率電阻不是常見規格，可用汽車燈泡或電爐線組合湊。'),
   ]},
 'lpf-80m-fig11.95': {'skip': ['L2','L4'], 'extra': [(['L2','L4'], '自繞電感 1.5 µH 與 1.3 µH（T50-2 或 T68-2 磁環）', 2, '鐵粉芯環形', '中', '非標準值，要自己繞；磁環在無線電零件商或網路商店較容易，電料行不一定有。')]},
 'diode-dbm-fig10.22': {'skip': ['Rg1','Rg2','Rg3','Rg4'], 'extra': [
    (['T1','T2'], '寬頻變壓器 1:1 中心抽頭（雙線並繞於 FT37-43 等鐵氧體環）', 2, '自繞', '中', '要自己繞，磁環與漆包線在電料行不一定有，但網路上不難買。')]},
 'wavetrap-fig11.92': {'skip': ['L1','C1','Rl1'], 'extra': [
    (['L1'], '鐵氧體棒（天線棒）繞 200 µH', 1, '自繞', '中', '天線棒與漆包線要找，圈數需用電感計校準；成品調諧線圈較少見。'),
    (['C1'], '可變電容 30–300 pF（polyvaricon／空氣可變電容）', 1, 'AM 收音機用', '中', '原型是 AM 收音機用的 polyvaricon，現在新品很少；可改用固定電容並聯 5–60 pF 微調電容，調諧範圍相近，所以列為中而不是難。')]},
 'buck-fig7.30': {'skip': ['L1','S1'], 'extra': [
    (['S1'], 'N 通道 MOSFET + 閘極驅動（如 IRF540N + 驅動），或直接用現成降壓模組', 1, 'TO-220', '易', 'netlist 的 S1 是理想開關；實作要用 MOSFET 並加驅動。高側開關需要浮動驅動，初學建議直接用降壓模組（LM2596 等）。'),
    (['L1'], '100 µH / ≥2 A 功率電感', 1, '徑向或 SMD', '易', '100 µH 功率電感是標準值，常見。')]},
 'photodiode-tia-fig3.28': {'skip': ['Cd'], 'extra': [(['D'], 'PIN 光電二極體（如 BPW34）', 1, '5 mm', '中', 'BPW34 在網路商店與光華較容易買到；電料行不一定有。')]},
 'wien-osc-fig25.20': {},
 'comparator-hyst-fig3.68': {'extra': [(['U1'], 'LM393／LM311（比較器）', 1, 'DIP-8', '易', 'netlist 是行為模型；實作用通用比較器，LM393 很常見。注意開集極輸出要加上拉電阻。')]},
}
SIMONLY = {
 'precision-rect-fig3.71': ['Rfb 1 Ω：只是為了模擬收斂，實作以導線取代'],
 'photodiode-tia-fig3.28': ['Cd 20 pF：光電二極體本身的接面電容，不用另外買'],
 'psu-13v8-fig7.69': ['Rsec、Rsec2 0.1 Ω：變壓器繞組電阻（我的假設），非零件'],
 'diode-dbm-fig10.22': ['Rg1–Rg4 1 MΩ：為了模擬收斂加的對地電阻，非零件'],
 'wavetrap-fig11.92': ['Rl1 2.5 Ω：電感損耗（Q≈80 的等效串聯電阻），非另外的電阻'],
 'buck-fig7.30': ['Vpwm：100 kHz、D=0.5 的方波，用函數產生器或 555／PWM 晶片產生'],
}
RULES_NOTES = {  # circuit-level sourcing justification (shown in the page)
 'ce-amp-fig3.44': ('易', '全部是 E 系列電阻、電容與一顆 2N3904，電料行通用料；沒有特殊零件。'),
 'jfet-cs-fig3.51': ('中', '被動件都是標準值；難點在 JFET：2N5486 已停產，可用 J310、MPF102、2N5457 代替，但電料行不一定有貨，要先確認。'),
 'opamp-basics-fig3.61': ('易', '只有一顆通用運放與 E 系列電阻，LM741、TL071 都是標準料。'),
 'lm317-fig7.27': ('易', 'LM317T 是電料行與光華的常備料，電阻皆標準值。'),
 'zener-reg-fig3.20': ('易', '5.1 V 稽納與 470 Ω 電阻都是通用料。'),
 'doubler-fig7.10': ('易', '1N4002 與 2200 µF 電解電容都是常見料；要注意電容耐壓（本電路約 35 V，選 50 V）。輸入需 12 Vac 變壓器。'),
 'lpf-80m-fig11.95': ('中', '電容是 180p、390p、1100p、1300p、2400p 等非標準值，需用標準值並聯湊或用可調電容；電感 1.5 µH、1.3 µH 要自繞磁環，並用電感計校準，所以不是買了就能用。'),
 'wavetrap-fig11.92': ('中', '核心是可變電容（polyvaricon 30–300 pF）與天線棒線圈，這兩樣在電料行不一定有，要找舊收音機零件或網路商店；其餘是通用電阻。'),
 'pi-match-fig5.58': ('中', '電容 809p、448p 不是標準值，要用近似值或並聯湊；1.53 µH 不是標準色碼電感值，要自繞並用電感計校準。零件都不特殊也不貴，但需要動手調值，所以是中。'),
 'comparator-hyst-fig3.68': ('易', 'LM393 或 LM311 加兩顆 E 系列電阻，通用料。'),
 'photodiode-tia-fig3.28': ('中', '運放（TL071 類 JFET 輸入）易買；光電二極體 BPW34 在光華較容易，電料行不一定有；1 MΩ 電阻建議用 1% 金屬皮膜。'),
 'precision-rect-fig3.71': ('易', '一顆運放加一顆 1N4148 與 10 kΩ 電阻，全部是通用料。'),
 'colpitts-fig9.12': ('易', '2N3904、E 系列電阻與小電容（220p、5p 為標準值）；2.2 µH 電感可買色碼電感，成品很常見。'),
 'am-detector-fig8.3': ('易', '1N4148、10 nF 與 10 µF 電容、通用電阻，全為標準料。'),
 'sallen-key-fig3.69': ('易', '22.5 nF 與 11.25 nF 不是標準值，要用 22 nF 與 10 nF 並聯 1.2 nF 等湊，或改用標準值重算截止頻率；運放與電阻皆通用。'),
 'wien-osc-fig25.20': ('易', 'LM741/TL071、E 系列電阻與電容；15.9 kΩ 要用 15 k + 0.9 k 串聯湊或可變電阻調。書中的燈泡穩幅件在本例以二極體替代。'),
 'buck-fig7.30': ('易', '電感、電容、1N5819 與 MOSFET 都是常見料；真正的難點是高側開關的驅動電路，建議直接用現成降壓模組。'),
 'psu-13v8-fig7.69': ('中', '難點在變壓器（16–20 Vac / 5 A 非貨架規格）、LM338（TO-3 版少見，TO-220 版可買）與 10000 µF 大電容、大散熱片；其餘是通用料。書中保護電路（MC3423 過壓保護）尚未列入。'),
 'diode-dbm-fig10.22': ('中', '4 顆要配對的蕭特基二極體與自繞的寬頻變壓器是難點；其餘被動件都是標準值。'),
}

def parse(folder):
    txt = combined(folder)
    txt = re.sub(r'(?ims)^\.control.*?^\.endc[ \t]*$', '', txt)
    txt = re.sub(r'(?is)\.subckt.*?\.ends', '', txt)
    rows, models = [], {}
    for ln in txt.splitlines()[1:]:
        ln = ln.strip()
        if not ln or ln[0] in '*;':
            continue
        t = ln.split()
        k = t[0][0].upper()
        if k in 'RCL' and len(t) >= 4: rows.append((k, t[0], t[3]))
        elif k == 'D' and len(t) >= 4: rows.append(('D', t[0], t[3]))
        elif k == 'Q' and len(t) >= 5: rows.append(('Q', t[0], t[4]))
        elif k == 'J' and len(t) >= 5: rows.append(('J', t[0], t[4]))
        elif k == 'X': rows.append(('X', t[0], t[-1]))
    return rows

def passive(kind, vals, folder):
    v = val(vals) if vals else None
    if v is None: return None
    if kind == 'R':
        if v is None: return None
        return (f'電阻 {eng(v,"Ω")}', '1/4 W 金屬皮膜 1%', '易', '標準 E 系列電阻，電料行散裝。' if abs(e24(v)[1]) < 1 else f'不在 E24 標準值上，最接近 {eng(e24(v)[0],"Ω")}（{e24(v)[1]:+.1f}%），或用兩顆並聯／串聯湊。')
    if kind == 'C':
        q, err = e24(v); ok = abs(err) < 1
        if v >= 100e-6:
            big = v >= 4700e-6
            return (f'電解電容 {eng(v,"F")}', '鋁電解，耐壓選電路最高電壓的 1.5–2 倍', '中' if big else '易', ('大容量電解電容（4700 µF 以上）電料行不一定有現貨，常要訂或用數個並聯。' if big else '常見值。'))
        if v >= 1e-6: return (f'電容 {eng(v,"F")}', '電解或 MLCC／薄膜', '易' if ok else '中', '標準值。' if ok else f'非標準值，最接近 {eng(q,"F")}（{err:+.1f}%）。')
        if v >= 10e-9: return (f'電容 {eng(v,"F")}', '薄膜或 X7R 陶瓷', '易' if ok else '中', '標準值。' if ok else f'非標準值，最接近 {eng(q,"F")}（{err:+.1f}%），或用兩顆並聯湊。')
        ok = ok or (v < 10e-12 and abs(v*1e12 - round(v*1e12)) < 1e-9)
        return (f'電容 {eng(v,"F")}', 'C0G／NP0 陶瓷（射頻用）', '易' if ok else '中', '標準值。' if ok else f'非標準值，最接近 {eng(q,"F")}（{err:+.1f}%），或用並聯／串聯湊。')
    if kind == 'L':
        q, err = e24(v)
        std = abs(err) < 1 and 1e-6 <= v <= 1e-3
        return (f'電感 {eng(v,"H")}', '色碼電感' if std else '自繞（磁環）', '易' if std else '中', '標準值色碼電感，電料行常見。' if std else f'非標準值（最接近 {eng(q,"H")}），需自繞並用電感計校準。')
    return None

def build(folder):
    OV = {('doubler-fig7.10','Rl'): '300', ('zener-reg-fig3.20','Rs'): '470', ('lm317-fig7.27','R1'): '240', ('lm317-fig7.27','R2'): '1.2k', ('photodiode-tia-fig3.28','Rf'): '1Meg', ('comparator-hyst-fig3.68','Rfb'): '100k', ('comparator-hyst-fig3.68','Rg'): '10k'}
    rows = [(k, r, OV.get((folder, r), v)) for k, r, v in parse(folder)]; sp = SPECIAL.get(folder, {}); skip = set(sp.get('skip', []))
    grp = {}
    for kind, ref, v in rows:
        if ref in skip: continue
        key = (kind, v if kind in 'RCL' else ('DSCH_BUCK' if v == 'DSCH' and folder == 'buck-fig7.30' else 'DSCH_DBM' if v == 'DSCH' else v))
        grp.setdefault(key, []).append(ref)
    out = []; sim_only = []
    for (kind, v), refs in grp.items():
        if kind in 'RCL':
            if folder == 'diode-dbm-fig10.22' and kind == 'L': continue
            if folder == 'psu-13v8-fig7.69' and refs == ['Rl']: continue
            if folder == 'wavetrap-fig11.92' and refs == ['L1']: pass
            r = passive(kind, v, folder)
            if r is None: sim_only.append(', '.join(refs)); continue
            out.append(dict(refs=refs, part=r[0], qty=len(refs), spec=r[1], level=r[2], why=r[3]))
        elif kind in 'DQJ':
            m = SEMI.get(v)
            if m is None: sim_only.append(', '.join(refs)); continue
            out.append(dict(refs=refs, part=m[0], qty=len(refs), spec=m[1], level=m[2], why=m[3]))
        elif kind == 'X':
            m = NOTE_OPA; out.append(dict(refs=refs, part=m[0], qty=len(refs), spec=m[1], level=m[2], why=m[3]))
    for ex in sp.get('extra', []):
        out.append(dict(refs=ex[0], part=ex[1], qty=ex[2], spec=ex[3], level=ex[4], why=ex[5]))
    tbrefs = {l.split()[0] for l in (root/'spice'/folder/'tb.cir').read_text().splitlines() if l.strip() and l[0] not in '*.' and len(l.split()) > 3}
    for r in out: r['fixture'] = (all(x in tbrefs for x in r['refs']) and r['refs'][0] not in ('T1','T2')) or '測試用' in r['part']
    sim_only += SIMONLY.get(folder, [])
    rank = {'易': 0, '中': 1, '難': 2}
    agg = [r['level'] if not (r['part'].startswith(('電容', '電阻')) and r['level'] == '中') else '易' for r in out if not r['fixture']]
    lvl = max(agg, key=rank.get); why = RULES_NOTES[folder][1]
    return dict(rows=out, sim_only=sim_only, level=lvl, reason=why)

res = {}
for d in sorted((root/'spice').iterdir()):
    if not (d/'tb.cir').exists() or d.name == 'wip' or d.name == 'zener-reg-fig3.20' and False: continue
    res[d.name] = build(d.name)
    print(d.name, len(res[d.name]['rows']), 'rows', res[d.name]['level'])
(root/'data/bom.json').write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding='utf-8')
