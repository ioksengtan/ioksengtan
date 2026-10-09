#!/usr/bin/env python3
"""Rebuild index.html from data/circuits.json (+ spice/*/netlist.cir). Run from this folder: python3 tools/build_site.py"""
import json, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
rows = json.loads((root/'data/circuits.json').read_text(encoding='utf-8'))
plots = json.loads((root/'data/plots.json').read_text(encoding='utf-8'))
graphs = json.loads((root/'data/graphs.json').read_text(encoding='utf-8'))
for r in rows:
    key = r['netlist'].split('/')[1] if r.get('netlist') else None
    r['plots'] = plots.get(key); r['graph'] = graphs[key]['svg'] if key in graphs else None
    r['netlist_text'] = (root/r['netlist']).read_text(encoding='utf-8') if r.get('netlist') else ''
tpl = (root/'tools/template.html').read_text(encoding='utf-8')
(root/'index.html').write_text(tpl.replace('__DATA__', json.dumps(rows, ensure_ascii=False)), encoding='utf-8')
print(len(rows), 'entries ->', root/'index.html')
