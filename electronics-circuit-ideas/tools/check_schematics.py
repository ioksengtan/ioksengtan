#!/usr/bin/env python3
"""Sanity check: every R/C/L in a netlist should appear in its schematic with the same value (normalised)."""
import json, pathlib, re, sys
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from spice_lib import combined
root = pathlib.Path(__file__).resolve().parent.parent
S = json.loads((root/'data/schematics.json').read_text(encoding='utf-8'))
def norm(v):
    v = v.strip().replace('{', '').replace('}', '')
    v = v.replace('Meg', 'M').replace('µ', 'u').replace('Ω', '').replace(' ', '')
    return v.lower()
bad = 0
for k, d in S.items():
    nl = combined(k)
    nl = re.sub(r'(?ims)^\.control.*?^\.endc', '', nl); nl = re.sub(r'(?is)\.subckt.*?\.ends', '', nl)
    texts = re.findall(r'>([^<>]+)</t(?:span|ext)>', d['svg'])
    blob = ' | '.join(norm(t) for t in texts)
    for ln in nl.splitlines():
        t = ln.split()
        if len(t) < 4 or t[0][0].upper() not in 'RCL' or ln.startswith('*'): continue
        name, val = t[0], t[3]
        if val.startswith('IC') or '=' in val: continue
        if name.lower() not in [norm(x) for x in texts] and not any(norm(x).startswith(name.lower()) for x in texts):
            print(f'{k}: {name} 不在圖上'); bad += 1; continue
        if norm(val) not in blob and not re.search(r'param', val):
            print(f'{k}: {name} 值 {val} 在圖上找不到'); bad += 1
print('完成，差異', bad)
