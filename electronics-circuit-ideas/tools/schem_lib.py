"""Small helpers on top of schemdraw: place parts between explicit grid points."""
import re
import schemdraw, schemdraw.elements as e
schemdraw.use('svg'); schemdraw.svgconfig.text = 'text'

def side(a, b, want):
    """schemdraw label loc for a part drawn a->b so the label lands on screen side `want`."""
    dx, dy = b[0]-a[0], b[1]-a[1]
    if abs(dx) >= abs(dy):
        up = 'top' if dx >= 0 else 'bottom'
        return up if want in ('up', 'top') else ('bottom' if up == 'top' else 'top')
    left = 'top' if dy >= 0 else 'bottom'          # vertical part: 'top' is the left side when drawn upward
    if want == 'left': return left
    return 'bottom' if left == 'top' else 'top'

class Sch:
    def __init__(self, unit=2.4, fs=11):
        self.d = schemdraw.Drawing(show=False)
        self.d.config(unit=unit, fontsize=fs, inches_per_unit=0.5)
    def part(self, cls, a, b, label='', want='up', **kw):
        p = cls(**kw).endpoints(a, b)
        if label: p = p.label(label, loc=side(a, b, want))
        self.d += p; return p
    def R(self, a, b, label='', want='up'): return self.part(e.Resistor, a, b, label, want)
    def C(self, a, b, label='', want='up'): return self.part(e.Capacitor, a, b, label, want)
    def CP(self, a, b, label='', want='up'): return self.part(e.Capacitor, a, b, label, want, polar=True)
    def L(self, a, b, label='', want='up'): return self.part(e.Inductor, a, b, label, want)
    def D(self, a, b, label='', want='up'): return self.part(e.Diode, a, b, label, want)
    def Z(self, a, b, label='', want='up'): return self.part(e.Zener, a, b, label, want)
    def V(self, a, b, label='', want='left'): return self.part(e.SourceV, a, b, label, want)
    def VS(self, a, b, label='', want='left'): return self.part(e.SourceSin, a, b, label, want)
    def I(self, a, b, label='', want='left'): return self.part(e.SourceI, a, b, label, want)
    def W(self, *pts):
        for p, q in zip(pts, pts[1:]): self.d += e.Line().endpoints(p, q)
    def dot(self, *pts):
        for p in pts: self.d += e.Dot().at(p)
    def gnd(self, p): self.d += e.Ground().at(p)
    def vdd(self, p, label=''): self.d += e.Vdd().at(p).label(label, loc='top')
    def text(self, p, s, ha='left'): self.d += e.Label().at(p).label(s, halign=ha, fontsize=10)
    def svg(self):
        s = self.d.get_imagedata('svg').decode()
        s = re.sub(r'height="[^"]*pt" width="[^"]*pt"', 'width="100%"', s, 1)
        s = s.replace('stroke:black', 'stroke:currentColor').replace('fill:black', 'fill:currentColor')
        s = s.replace('fill="black"', 'fill="currentColor"').replace('stroke="black"', 'stroke="currentColor"')
        s = s.replace('fill:white', 'fill:var(--panel)').replace('<svg ', '<svg class="sch" ', 1)
        return s

def A(el, name): return tuple(el.absanchors[name])
def place(s, cls, anchor, pt, label='', loc='right', ofst=.2, **kw):
    p = cls(**kw).right()
    if label: p = p.label(label, loc=loc, ofst=ofst)
    p = p.anchor(anchor).at(pt)
    s.d += p; return p

def place_rev(s, cls, anchor, pt, label='', loc='right', ofst=.2, **kw):
    p = cls(**kw).right().reverse()
    if label: p = p.label(label, loc=loc, ofst=ofst)
    p = p.anchor(anchor).at(pt)
    s.d += p; return p
