from schem_lib import *

def xfmr(s, at, rev=False):
    T = e.Transformer(t1=4, t2=4, core=True).right()
    if rev: T = T.reverse()
    T = T.at(at); s.d += T
    return {k: A(T, k) for k in ('p1', 'p2', 's1', 's2', 'tapS2')}

def dbm():             # Fig 10.22, netlist diode-dbm-fig10.22
    s = Sch(); cx = 12
    T1 = xfmr(s, (4, 0))
    # LO source (left)
    x0 = T1['p1'][0] - 3.6
    s.W(T1['p1'], (T1['p1'][0]-.8, T1['p1'][1])); s.R((x0+0, T1['p1'][1]), (T1['p1'][0]-.8, T1['p1'][1]), 'Rlo 50', 'up')
    s.VS((x0, T1['p1'][1]), (x0, T1['p1'][1]-3.4), 'LO\n10 MHz\n+7 dBm', 'left'); s.gnd((x0, T1['p1'][1]-3.4))
    s.W(T1['p2'], (T1['p2'][0], T1['p2'][1]-1)); s.gnd((T1['p2'][0], T1['p2'][1]-1))
    # diode ring
    Top, Rt, Bm, Lf = (cx, 3.4), (cx+3.4, 0), (cx, -3.4), (cx-3.4, 0)
    s.D(Top, Rt, 'D1', 'up'); s.D(Rt, Bm, 'D2', 'right'); s.D(Bm, Lf, 'D3', 'down'); s.D(Lf, Top, 'D4', 'left')
    s.dot(Top, Rt, Bm, Lf)
    # LO secondary -> Top / Bottom
    s1, s2, ct = T1['s1'], T1['s2'], T1['tapS2']
    s.W(s1, (s1[0]+1, s1[1]), (s1[0]+1, Top[1]), Top)
    s.W(s2, (s2[0]+1, s2[1]), (s2[0]+1, Bm[1]), Bm)
    # RF transformer (right, mirrored): secondary faces the ring
    T2 = xfmr(s, (cx+11, 0), rev=True)
    r1, r2, rct = T2['s1'], T2['s2'], T2['tapS2']
    s.W(r1, (r1[0]-1, r1[1]), (r1[0]-1, 1.9), (Rt[0]+1.2, 1.9), (Rt[0]+1.2, 0), Rt)
    s.W(r2, (r2[0]-1, r2[1]), (r2[0]-1, -5.2), (Lf[0]-1.4, -5.2), (Lf[0]-1.4, 0), Lf)
    # RF source (right)
    p1, p2 = T2['p1'], T2['p2']
    x1 = p1[0] + 3.6
    s.W(p1, (p1[0]+.8, p1[1])); s.R((p1[0]+.8, p1[1]), (x1, p1[1]), 'Rrf 50', 'up')
    s.VS((x1, p1[1]), (x1, p1[1]-3.4), 'RF\n9 MHz\n−20 dBm', 'right'); s.gnd((x1, p1[1]-3.4))
    s.W(p2, (p2[0], p2[1]-1)); s.gnd((p2[0], p2[1]-1))
    # IF taken between the two centre taps
    yif = -7.4
    s.W(ct, (ct[0]+.5, ct[1]), (ct[0]+.5, yif)); s.W(rct, (rct[0]-.5, rct[1]), (rct[0]-.5, yif))
    s.R((ct[0]+.5, yif), (rct[0]-.5, yif), 'Rif 50（中頻 IF 1 MHz）', 'down')
    s.dot((ct[0]+.5, yif), (rct[0]-.5, yif)) if False else None
    s.text(ct[0]+.7, ct[1]+.3, 'ct') if False else None
    return s.svg()
