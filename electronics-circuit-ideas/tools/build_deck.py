#!/usr/bin/env python3
"""Build cards/index.html (screen) and cards/print.html (A4, 3x3, 63.5x88.9 mm) from cards/deck.json + data/circuits.json."""
import json, pathlib, html
root = pathlib.Path(__file__).resolve().parent.parent
deck = json.loads((root/'cards/deck.json').read_text(encoding='utf-8'))
R = {r['id']: r for r in json.loads((root/'data/circuits.json').read_text(encoding='utf-8'))}
SUIT = {'S':('♠','電源與類比','ink'),'H':('♥','振盪與混頻','red'),'D':('♦','濾波與匹配','red'),'C':('♣','收發與工具','ink')}
G = {  # 48x48 line glyphs, drawn for this deck
 'opamp':'<path d="M10 8v32l28-16z"/><path d="M2 18h8M2 30h8M38 24h8"/><path d="M14 18h6M17 15v6M14 30h6"/>',
 'diode':'<path d="M2 24h14M32 24h14M16 12v24l16-12z"/><path d="M32 12v24"/>',
 'coil':'<path d="M2 32h6c0-12 8-12 8 0c0-12 8-12 8 0c0-12 8-12 8 0c0-12 8-12 8 0h6"/>',
 'xtal':'<path d="M2 24h14M32 24h14M16 12v24M32 12v24"/><rect x="21" y="14" width="6" height="20"/>',
 'transistor':'<circle cx="26" cy="24" r="16"/><path d="M2 24h14M16 14v20M16 28l16 10M16 20l16-10"/><path d="M28 34l4 4-6 1z" fill="currentColor"/>',
 'filter':'<path d="M2 24h8c0-8 8-8 8 0M18 24h12M30 24c0-8 8-8 8 0h8"/><path d="M10 24v14M18 24v14M30 24v14M38 24v14M6 38h36"/>',
 'antenna':'<path d="M24 44V14M24 14l-12-8M24 14l12-8M24 22l-8-5M24 22l8-5"/><path d="M14 44h20"/>',
 'ic':'<rect x="12" y="8" width="24" height="32"/><path d="M6 14h6M6 22h6M6 30h6M36 14h6M36 22h6M36 30h6"/><path d="M20 8c0 4 8 4 8 0"/>',
 'supply':'<path d="M2 24h8M38 24h8"/><rect x="10" y="12" width="28" height="24"/><path d="M16 26c3-8 5 8 8 0s5 8 8 0"/>',
 'scope':'<rect x="6" y="8" width="36" height="28"/><path d="M10 24c4-10 8 10 12 0s8 10 12 0"/><path d="M14 42h20"/>',
 'key':'<path d="M4 34h40M10 34v-6M38 34v-6"/><path d="M8 24l30-8"/><circle cx="40" cy="15" r="3"/>',
}
def chip(label, val):
    c = {'可':'ok','易':'ok','入門':'ok','部分':'mid','中':'mid','中階':'mid','難':'hard','進階':'hard'}[val]
    return f'<span class="chip {c}"><i>{label}</i>{val}</span>'
def card(d, detail=True):
    r = R[d['id']]; s = SUIT[d['suit']]
    nl = '<span class="nl">netlist</span>' if r['netlist'] else ''
    return f'''<article class="card {s[2]}" data-suit="{d['suit']}" data-id="{d['id']}" tabindex="0" aria-label="{s[0]}{d['rank']} {html.escape(d['title'])}">
<div class="idx tl"><b>{d['rank']}</b><span>{s[0]}</span></div><div class="idx br"><b>{d['rank']}</b><span>{s[0]}</span></div>
<div class="face"><svg class="glyph" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{G[d['glyph']]}</svg>
<h3>{html.escape(d['title'])}</h3><p>{html.escape(d['line'])}</p><div class="parts">{html.escape(d['parts'])}</div></div>
<div class="foot"><div class="chips">{chip('難度',r['level'])}{chip('SPICE',r['spice'])}{chip('取得',r['tw_sourcing'])}</div>
<div class="src">Ch{r['chapter']} · PDF p.{r['pdf_page']} {nl}</div></div></article>'''
CSS = '''
:root{--paper:#f8f7f2;--ink:#1d2a2c;--red:#b3402a;--grid:#e3e6df;--ok:#2f7a52;--mid:#9a6f12;--hard:#a53a3a;--felt:#173a34;--felt2:#0f2a26}
*{box-sizing:border-box}
.card{position:relative;width:63.5mm;height:88.9mm;background:var(--paper);color:var(--ink);border-radius:3.2mm;border:.3mm solid #c9ccc2;overflow:hidden;font-family:"Noto Sans TC","Noto Sans CJK TC",system-ui,sans-serif;background-image:linear-gradient(var(--grid) .2mm,transparent .2mm),linear-gradient(90deg,var(--grid) .2mm,transparent .2mm);background-size:4mm 4mm;display:flex;flex-direction:column;break-inside:avoid}
.card.red{--ink:#7d2b1c;color:var(--red)}.card.red h3,.card.red p,.card.red .parts,.card.red .src{color:#2a1f1c}
.idx{position:absolute;display:flex;flex-direction:column;align-items:center;line-height:1;font-weight:700}
.idx b{font-size:6.2mm}.idx span{font-size:5.2mm;margin-top:.4mm}
.tl{left:2.6mm;top:2.4mm}.br{right:2.6mm;bottom:2.4mm;transform:rotate(180deg)}
.face{margin:6.5mm 8mm 0;flex:1;display:flex;flex-direction:column;align-items:center;text-align:center;gap:1.6mm;padding-top:2mm}
.glyph{width:15mm;height:15mm;color:var(--ink)}
.card.red .glyph{color:var(--red)}
h3{margin:1mm 0 0;font-size:4.5mm;line-height:1.25;color:var(--ink)}
.face p{margin:0;font-size:3mm;line-height:1.5;color:#33403f}
.parts{margin-top:auto;font-size:2.6mm;line-height:1.4;border-top:.25mm dashed #aab1a8;padding-top:1.6mm;width:100%;color:#46514f}
.foot{margin:0 10mm 3mm 10mm;display:flex;flex-direction:column;gap:1.2mm;align-items:center}
.chips{display:flex;gap:1mm;flex-wrap:nowrap}
.chip{font-size:2.3mm;line-height:1;padding:.8mm 1.4mm;border-radius:1mm;border:.25mm solid;white-space:nowrap}
.chip i{font-style:normal;opacity:.65;margin-right:.6mm}
.chip.ok{color:var(--ok)}.chip.mid{color:var(--mid)}.chip.hard{color:var(--hard)}
.src{font-size:2.2mm;color:#5d6866;font-family:ui-monospace,Menlo,monospace}.nl{border:.2mm solid currentColor;border-radius:.8mm;padding:0 .8mm;margin-left:1mm}
'''
SCREEN = '''<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>電子點子撲克牌</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap">
<style>%s
body{margin:0;background:radial-gradient(circle at 50%% 0,var(--felt),var(--felt2));color:#e9f1ec;font-family:"Noto Sans TC","Noto Sans CJK TC",system-ui,sans-serif;min-height:100vh}
.wrap{max-width:1180px;margin:0 auto;padding:28px clamp(16px,4vw,40px) 60px}
h1{margin:0;font-size:clamp(24px,5vw,34px)}.sub{margin:6px 0 18px;color:#a9c4ba;max-width:62ch;line-height:1.7}
.tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:22px}
.tabs button{font:inherit;padding:7px 14px;border-radius:999px;border:1px solid #4d7a6d;background:transparent;color:#e9f1ec;cursor:pointer}
.tabs button[aria-pressed=true]{background:#e9f1ec;color:#12312b}
.tabs button:focus-visible,.card:focus-visible{outline:3px solid #f0b46a;outline-offset:3px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,63.5mm);gap:18px;justify-content:center}
.card{cursor:pointer;box-shadow:0 .6mm 2mm #0007;transition:transform .15s}.card:hover{transform:translateY(-3px)}
dialog{max-width:min(560px,92vw);border:0;border-radius:8px;padding:22px;background:#f8f7f2;color:#1d2a2c;line-height:1.7;font-size:15px}
dialog::backdrop{background:#000a}dialog h2{margin:0 0 4px;font-size:20px}dialog .meta{color:#5d6866;font-size:13px;margin-bottom:10px}
dialog pre{background:#eceee8;padding:10px;overflow:auto;max-height:240px;font-size:12px;line-height:1.5}
dialog button{font:inherit;padding:6px 14px;border:1px solid #1d2a2c;background:#fff;border-radius:4px;cursor:pointer;margin-top:10px}
@media print{body{background:#fff}}
</style></head><body><div class="wrap">
<h1>電子點子撲克牌</h1>
<p class="sub">從 ARRL Handbook 2011 挑出 52 個零件在台灣買得到、也能用 SPICE 模擬的經典電路。四種花色是四個領域，A 最容易，K 最難。點牌看細節，右下角標有 netlist 的牌附已驗證的模擬檔。</p>
<div class="tabs" id="tabs"></div><div class="grid" id="grid">%s</div></div>
<dialog id="dlg"><h2 id="dt"></h2><div class="meta" id="dm"></div><p id="dd"></p><p id="di"></p><div id="dn"></div><button id="dc">關閉</button></dialog>
<script>
const R=%s;const SU={S:'♠ 電源與類比',H:'♥ 振盪與混頻',D:'♦ 濾波與匹配',C:'♣ 收發與工具'};
let cur='';const tabs=document.getElementById('tabs');
function tabsRender(){tabs.innerHTML='';[['','全部 52 張'],...Object.entries(SU)].forEach(([k,v])=>{const b=document.createElement('button');b.textContent=v;b.setAttribute('aria-pressed',String(cur===k));b.onclick=()=>{cur=k;tabsRender();document.querySelectorAll('.card').forEach(c=>c.hidden=cur&&c.dataset.suit!==cur)};tabs.appendChild(b)})}
tabsRender();
const dlg=document.getElementById('dlg');
function open(c){const r=R[c.dataset.id];document.getElementById('dt').textContent=r.name;document.getElementById('dm').textContent=r.category+' · '+r.level+' · 第 '+r.chapter+' 章 · PDF p.'+r.pdf_page+' · Fig '+r.figures;document.getElementById('dd').textContent=r.description+(r.note?'（'+r.note+'）':'');document.getElementById('di').textContent='點子：'+r.idea;
const n=document.getElementById('dn');n.innerHTML='';if(r.netlist){const d=document.createElement('div');d.textContent='模擬結果：'+r.sim_result;const p=document.createElement('pre');p.textContent=r.netlist_text;n.append(d,p)}
dlg.showModal()}
document.getElementById('grid').addEventListener('click',e=>{const c=e.target.closest('.card');if(c)open(c)});
document.getElementById('grid').addEventListener('keydown',e=>{if(e.key==='Enter'){const c=e.target.closest('.card');if(c)open(c)}});
document.getElementById('dc').onclick=()=>dlg.close();dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});
</script></body></html>'''
PRINT = '''<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><title>電子點子撲克牌 列印版</title><style>%s
@page{size:A4;margin:0}body{margin:0;background:#fff}
.sheet{width:210mm;height:297mm;padding:%smm 0 0 %smm;display:grid;grid-template-columns:repeat(3,63.5mm);grid-auto-rows:88.9mm;break-after:page}
.sheet .card{border-radius:0;border:.15mm solid #999;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.back{background:linear-gradient(135deg,#173a34,#0f2a26);color:#e9f1ec;border-radius:0;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:3mm;border:.15mm solid #999;font-family:"Noto Sans TC","Noto Sans CJK TC",sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.back svg{width:22mm;height:22mm}.back b{font-size:5.5mm;letter-spacing:.5mm}.back small{font-size:2.8mm;opacity:.7}
</style></head><body>%s</body></html>'''
cards = [card(d) for d in deck]
data = {str(k): dict(v, netlist_text=(root/v['netlist']).read_text(encoding='utf-8') if v.get('netlist') else '') for k, v in R.items()}
(root/'cards/index.html').write_text(SCREEN % (CSS, ''.join(cards), json.dumps(data, ensure_ascii=False)), encoding='utf-8')
# print: margins centre 3x3 on A4: width 190.5 -> side 9.75 ; height 266.7 -> top 15.15
sheets = ''
for i in range(0, 52, 9):
    sheets += '<section class="sheet">' + ''.join(cards[i:i+9]) + '</section>'
back = '<div class="back"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">%s</svg><b>電子點子</b><small>ARRL Handbook 2011</small></div>' % G['opamp']
sheets += '<section class="sheet">' + back*9 + '</section>'
(root/'cards/print.html').write_text(PRINT % (CSS, 15.15, 9.75, sheets), encoding='utf-8')
print(len(cards), 'cards')
