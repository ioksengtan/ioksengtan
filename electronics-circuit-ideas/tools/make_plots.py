#!/usr/bin/env python3
"""Run each validated netlist in ngspice (on a temp copy, the .control block replaced) and
write data/plots.json with the waveforms / responses shown in the web page.
Run from anywhere: python3 tools/make_plots.py   (needs ngspice + numpy)"""
import json, pathlib, re, subprocess, tempfile
import numpy as np
import sys; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from spice_lib import combined

root = pathlib.Path(__file__).resolve().parent.parent
TRAN = 'tran'

def P(title, xl, yl, vecs, xlog=False, xwin=None, xs=1.0, kind='line', fft=None):
    return dict(title=title, xl=xl, yl=yl, vecs=vecs, xlog=xlog, xwin=xwin, xs=xs, kind=kind, fft=fft)

SPEC = {
 'psu-13v8-fig7.69': [([], [
    P('輸出電壓（滿載 5 A，0–0.6 s 啟動）', '時間 (s)', 'V', [('Vout', 'v(out)'), ('整流後 Vp', 'v(vp)')])])],
 'lpf-80m-fig11.95': [(['ac dec 200 0.5Meg 30Meg'], [
    P('80 m 低通濾波器頻率響應（插入損耗）', '頻率 (MHz)', 'dB', [('S21', 'vdb(n3)+6.0206')], xlog=True, xs=1e-6)])],
 'wavetrap-fig11.92': [(['ac dec 400 0.3Meg 3Meg'], [
    P('Wave trap 對天線端的衰減', '頻率 (MHz)', 'dB', [('v(a)', 'vdb(a)')], xlog=True, xs=1e-6)])],
 'pi-match-fig5.58': [(['ac lin 200 1Meg 20Meg'], [
    P('Pi 網路功率傳輸（50 Ω → 200 Ω）', '頻率 (MHz)', 'dB（0 dB＝完全匹配）', [('傳輸', 'vdb(b)')], xs=1e-6)])],
 'opamp-basics-fig3.61': [(['ac dec 20 10 1Meg'], [
    P('非反相與反相增益 10 倍的頻率響應', '頻率 (Hz)', 'dB', [('非反相', 'vdb(o1)'), ('反相', 'vdb(o2)')], xlog=True)])],
 'ce-amp-fig3.44': [(['ac dec 20 10 10Meg'], [
    P('共射極放大器頻率響應', '頻率 (Hz)', 'dB', [('vout/vin', 'vdb(out)')], xlog=True)])],
 'doubler-fig7.10': [([], [
    P('全波倍壓器：輸入與輸出', '時間 (s)', 'V', [('輸入', 'v(a)'), ('輸出', 'v(o)')])])],
 'lm317-fig7.27': [([], [
    P('LM317 行為模型：輸入斜坡與輸出', '時間 (ms)', 'V', [('Vin', 'v(vin)'), ('Vout', 'v(out)')], xs=1e3)])],
 'zener-reg-fig3.20': [
   (['dc Vin 10 16 0.25'], [P('線性調整率（負載 5 mA）', 'Vin (V)', 'Vout (V)', [('Vout', 'v(out)')])]),
   (['alter Vin = 12', 'dc Il 0.0005 0.01 0.0005'], [P('負載調整率（Vin 12 V）', '負載電流 (mA)', 'Vout (V)', [('Vout', 'v(out)')], xs=1e3)])],
 'comparator-hyst-fig3.68': [([], [
    P('施密特觸發器：輸入三角波與輸出', '時間 (ms)', 'V', [('輸入', 'v(in)'), ('輸出', 'v(out)')], xs=1e3),
    P('遲滯迴線（輸出 vs 輸入）', '輸入 (V)', '輸出 (V)', [('x', 'v(in)'), ('Vout', 'v(out)')], kind='xy')])],
 'photodiode-tia-fig3.28': [(['ac dec 20 10 1Meg'], [
    P('跨阻放大器增益（1 MΩ ＝ 120 dBΩ）', '頻率 (Hz)', 'dBΩ', [('Zt', 'vdb(out)')], xlog=True)])],
 'precision-rect-fig3.71': [([], [
    P('精密半波整流（輸入僅 100 mV）', '時間 (ms)', 'V', [('輸入', 'v(in)'), ('輸出', 'v(o)')], xs=1e3)])],
 'colpitts-fig9.12': [([], [
    P('Colpitts 起振過程', '時間 (µs)', 'V', [('集極 Vt', 'v(t)')], xs=1e6),
    P('穩態波形（19–20 µs 放大）', '時間 (µs)', 'V', [('Vt', 'v(t)'), ('輸出', 'v(out)')], xs=1e6, xwin=(19e-6, 20e-6))])],
 'am-detector-fig8.3': [([], [
    P('AM 載波（放大）', '時間 (ms)', 'V', [('AM 輸入', 'v(am)')], xs=1e3, xwin=(3.0e-3, 3.012e-3)),
    P('偵測器輸出與還原音訊', '時間 (ms)', 'V', [('包絡 v(o)', 'v(o)'), ('音訊 v(aud)', 'v(aud)')], xs=1e3)])],
 'sallen-key-fig3.69': [(['ac dec 50 10 100k'], [
    P('Sallen-Key 二階 Butterworth 低通', '頻率 (Hz)', 'dB', [('vout/vin', 'vdb(out)')], xlog=True)])],
 'wien-osc-fig25.20': [([], [
    P('Wien 振盪器起振', '時間 (ms)', 'V', [('輸出', 'v(o)')], xs=1e3),
    P('穩態波形（放大）', '時間 (ms)', 'V', [('輸出', 'v(o)')], xs=1e3, xwin=(0.380, 0.390))])],
 'buck-fig7.30': [([], [
    P('降壓轉換器輸出電壓', '時間 (ms)', 'V', [('Vout', 'v(o)')], xs=1e3),
    P('開關節點與電感電流（放大）', '時間 (µs)', 'V ／ A', [('v(sw)', 'v(sw)'), ('i(L1)', 'i(l1)')], xs=1e6, xwin=(11.0e-3, 11.03e-3))])],
 'jfet-cs-fig3.51': [(['ac dec 20 10 10Meg'], [
    P('JFET 共源放大器頻率響應', '頻率 (Hz)', 'dB', [('vout/vin', 'vdb(out)')], xlog=True)])],
 'diode-dbm-fig10.22': [([], [
    P('中頻輸出（放大）', '時間 (µs)', 'V', [('v(ct,rct)', 'v(ct,rct)')], xs=1e6, xwin=(10e-6, 11e-6)),
    P('中頻頻譜（LO 10 MHz，RF 9 MHz）', '頻率 (MHz)', '峰值 (mV)', [('v(ct,rct)', 'v(ct,rct)')], kind='fft', fft=(4e-6, 12e-6))])],
}

def decimate(x, y, n=700):
    if len(x) <= n: return x, y
    k = len(x)//(n//2)
    xs, ys = [], []
    for i in range(0, len(x), k):
        xx, yy = x[i:i+k], y[i:i+k]
        a, b = int(np.argmin(yy)), int(np.argmax(yy))
        for j in sorted({a, b}): xs.append(xx[j]); ys.append(yy[j])
    return np.array(xs), np.array(ys)

def rnd(a): return [float(f'{v:.5g}') for v in a]

def run(folder, ctl, plots):
    src = combined(folder)
    body = re.sub(r'(?ims)^\.control.*?^\.endc[ \t]*$', '', src)
    body = re.sub(r'(?im)^\.end[ \t]*$', '', body).rstrip()
    tmp = pathlib.Path(tempfile.mkdtemp())
    lines = ['.control', *(ctl or ['run'])]
    for i, p in enumerate(plots):
        for j, (_, e) in enumerate(p['vecs']): lines.append(f'let v{i}_{j} = {e}')
        lines.append(f'wrdata {tmp}/p{i}.txt ' + ' '.join(f'v{i}_{j}' for j in range(len(p['vecs']))))
    lines += ['.endc', '.end']
    (tmp/'n.cir').write_text(body + '\n' + '\n'.join(lines) + '\n')
    r = subprocess.run(['ngspice', '-b', str(tmp/'n.cir')], capture_output=True, text=True, timeout=300)
    out = []
    for i, p in enumerate(plots):
        f = tmp/f'p{i}.txt'
        if not f.exists(): raise SystemExit(f'{folder}: no data for plot {i}\n{r.stdout[-1500:]}{r.stderr[-800:]}')
        d = np.loadtxt(f, ndmin=2)
        t = d[:, 0]
        series = []
        if p['kind'] == 'xy':
            series.append(dict(name=p['vecs'][1][0], x=rnd(d[:, 1]), y=rnd(d[:, 3])))
        elif p['kind'] == 'fft':
            a, b = p['fft']; tt = np.arange(a, b, 1e-9)
            v = np.interp(tt, t, d[:, 1]); w = np.hanning(len(v))
            F = np.abs(np.fft.rfft(v*w))*2/np.sum(w)*1e3; fr = np.fft.rfftfreq(len(v), 1e-9)
            m = fr <= 25e6
            series.append(dict(name=p['vecs'][0][0], x=rnd(fr[m]*1e-6), y=rnd(F[m])))
        else:
            for j, (nm, _) in enumerate(p['vecs']):
                x, y = d[:, 2*j], d[:, 2*j+1]
                if p['xwin']:
                    m = (x >= p['xwin'][0]) & (x <= p['xwin'][1]); x, y = x[m], y[m]
                x, y = decimate(x, y)
                series.append(dict(name=nm, x=rnd(x*p['xs']), y=rnd(y)))
        out.append(dict(title=p['title'], xl=p['xl'], yl=p['yl'], xlog=p['xlog'], kind=p['kind'], series=series))
    return out

def main():
    res = {}
    for folder, runs in SPEC.items():
        res[folder] = sum((run(folder, ctl, pl) for ctl, pl in runs), [])
        print(folder, len(res[folder]), 'plots')
    (root/'data/plots.json').write_text(json.dumps(res, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    print('wrote data/plots.json', (root/'data/plots.json').stat().st_size//1024, 'KB')
main()
