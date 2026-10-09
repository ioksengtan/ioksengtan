#!/usr/bin/env python3
"""Parse each validated netlist and draw an auto-laid-out *connection diagram*
(components = boxes, nets = dots, ground = symbols) -> data/graphs.json (inline SVG strings).
It is NOT a standard schematic: the layout is automatic. Needs networkx. Run: python3 tools/make_graphs.py"""
import json, pathlib, re, html
import networkx as nx

root = pathlib.Path(__file__).resolve().parent.parent
PINS = {'R': 2, 'C': 2, 'L': 2, 'V': 2, 'I': 2, 'D': 2, 'B': 2, 'Q': 3, 'J': 3, 'E': 4, 'S': 4}
PINNAME = {'Q': 'CBE', 'J': 'DGS', 'D': 'AK', 'E': '+-PN', 'S': '+-PN', 'V': '+-', 'I': '+-'}
GND = {'0', 'gnd'}

def parse(text):
    text = re.sub(r'(?ims)^\.control.*?^\.endc[ \t]*$', '', text)
    els, sub, insub = [], {}, False
    lines = []
    for ln in text.splitlines():
        ln = ln.strip()
        if lines and ln.startswith('+'): lines[-1] += ' ' + ln[1:]
        else: lines.append(ln)
    for ln in lines[1:]:                      # first line is the title
        if not ln or ln[0] in '*;': continue
        low = ln.lower()
        if low.startswith('.subckt'): insub = True; continue
        if low.startswith('.ends'): insub = False; continue
        if insub or ln[0] == '.': continue
        tok = re.sub(r'\{[^}]*\}', lambda m: m.group(0).replace(' ', ''), ln).split()
        k = tok[0][0].upper()
        if k == 'K': continue
        if k == 'X':
            sm = [i for i, t in enumerate(tok) if i > 0 and not t.startswith('(')][-1]
            els.append(dict(name=tok[0], kind='X', nets=tok[1:sm], label=tok[sm])); continue
        if k not in PINS: continue
        n = PINS[k]; nets = [t.lower() for t in tok[1:1+n]]
        rest = ' '.join(tok[1+n:])
        if k == 'B': val = ''
        elif k in 'RCL': val = tok[1+n] if len(tok) > 1+n else ''
        elif k in 'VI': val = ' '.join(tok[1+n:1+n+2])[:14]
        else: val = tok[1+n] if len(tok) > 1+n and not tok[1+n].startswith('IC') else ''
        ctrl = sorted(set(m.lower() for m in re.findall(r'v\(([A-Za-z_]\w*)\)', rest))) if k == 'B' else []
        els.append(dict(name=tok[0], kind=k, nets=nets, label=val, ctrl=ctrl))
    return els

def draw(els):
    G = nx.Graph()
    for e in els:
        G.add_node(('e', e['name']))
        for n in e.get('ctrl', []):
            if n not in GND: G.add_edge(('e', e['name']), ('n', n))
        for n in e['nets']:
            if n.lower() in GND: continue
            G.add_edge(('e', e['name']), ('n', n))
    if len(G) == 0: return None
    # a net touching only one element is a dead end: still drawn, but pulls nothing
    pos = nx.kamada_kawai_layout(G, scale=1.0) if len(G) > 2 else nx.circular_layout(G)
    xs = [p[0] for p in pos.values()]; ys = [p[1] for p in pos.values()]
    W, H, M = 800, 500, 70
    def X(v): return M + (v-min(xs))/(max(xs)-min(xs) or 1)*(W-2*M)
    def Y(v): return M + (v-min(ys))/(max(ys)-min(ys) or 1)*(H-2*M)
    P = {k: [X(v[0]), Y(v[1])] for k, v in pos.items()}
    keys = list(P)
    for _ in range(120):                      # push overlapping labels apart
        moved = False
        for i in range(len(keys)):
            for j in range(i+1, len(keys)):
                a, b = P[keys[i]], P[keys[j]]
                dx, dy = b[0]-a[0], b[1]-a[1]
                need = 74 if keys[i][0] == keys[j][0] == 'e' else 40
                if abs(dx) < need and abs(dy) < 34:
                    d = (dx*dx+dy*dy)**.5 or 1
                    ux, uy = (dx/d, dy/d) if d > 1e-6 else (1, 0)
                    a[0] -= ux*3; a[1] -= uy*3; b[0] += ux*3; b[1] += uy*3; moved = True
        for v in P.values():
            v[0] = min(W-M+20, max(M-20, v[0])); v[1] = min(H-50, max(26, v[1]))
        if not moved: break
    out = [f'<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg" role="img" class="cg">']
    for e in els:
        a = P.get(('e', e['name']))
        for n in e.get('ctrl', []):
            if ('n', n) in P:
                b = P[('n', n)]
                out.append(f'<line class="w dz" x1="{a[0]:.0f}" y1="{a[1]:.0f}" x2="{b[0]:.0f}" y2="{b[1]:.0f}"/>')
        for i, n in enumerate(e['nets']):
            pn = (PINNAME.get(e['kind'], '') + '  ')[i] if e['kind'] in PINNAME and e['kind'] in 'QJDE' else ''
            if n in GND:
                x, y = a; out.append(f'<path class="w" d="M{x:.0f} {y+12:.0f}V{y+26:.0f}M{x-8:.0f} {y+26:.0f}H{x+8:.0f}M{x-5:.0f} {y+30:.0f}H{x+5:.0f}M{x-2:.0f} {y+34:.0f}H{x+2:.0f}" transform="translate({(i-(len(e["nets"])-1)/2)*14:.0f} 0)"/>')
                continue
            b = P[('n', n)]
            out.append(f'<line class="w" x1="{a[0]:.0f}" y1="{a[1]:.0f}" x2="{b[0]:.0f}" y2="{b[1]:.0f}"/>')
            if pn.strip():
                mx, my = a[0]*0.72+b[0]*0.28, a[1]*0.72+b[1]*0.28
                out.append(f'<text class="pn" x="{mx:.0f}" y="{my-3:.0f}">{html.escape(pn)}</text>')
    for k, (x, y) in P.items():
        if k[0] == 'n':
            out.append(f'<circle class="nd" cx="{x:.0f}" cy="{y:.0f}" r="3.5"/><text class="nn" x="{x+6:.0f}" y="{y-6:.0f}">{html.escape(k[1])}</text>')
    byname = {e['name']: e for e in els}
    for k, (x, y) in P.items():
        if k[0] == 'e':
            e = byname[k[1]]; t1 = e['name']; t2 = e['label']
            w = max(len(t1), len(t2))*6.6 + 14
            out.append(f'<g class="el k{e["kind"]}"><rect x="{x-w/2:.0f}" y="{y-14:.0f}" width="{w:.0f}" height="28" rx="5"/>'
                       f'<text x="{x:.0f}" y="{y-2:.0f}" class="t1">{html.escape(t1)}</text><text x="{x:.0f}" y="{y+10:.0f}" class="t2">{html.escape(t2)}</text></g>')
    out.append('</svg>')
    return ''.join(out)

def main():
    res = {}
    for d in sorted((root/'spice').iterdir()):
        f = d/'netlist.cir'
        if not f.exists() or d.name == 'wip': continue
        els = parse(f.read_text())
        svg = draw(els)
        if svg: res[d.name] = dict(svg=svg, n=len(els))
        print(d.name, len(els), 'elements')
    (root/'data/graphs.json').write_text(json.dumps(res, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
main()
