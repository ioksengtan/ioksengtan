#!/usr/bin/env python3
"""Rebuild index.html from data/circuits.json (+ spice/*/netlist.cir). Run from this folder: python3 tools/build_site.py"""
import json, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
rows = json.loads((root/'data/circuits.json').read_text(encoding='utf-8'))
for r in rows:
    r['netlist_text'] = (root/r['netlist']).read_text(encoding='utf-8') if r.get('netlist') else ''
tpl = (root/'tools/template.html').read_text(encoding='utf-8')
(root/'index.html').write_text(tpl.replace('__DATA__', json.dumps(rows, ensure_ascii=False)), encoding='utf-8')
print(len(rows), 'entries ->', root/'index.html')
