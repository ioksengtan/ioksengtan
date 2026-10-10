from schem_lib import *
from schem_defs2 import opamp_at

def agc_rect():        # Fig 12.36B, netlist agc-rectifier-fig12.36b
    s = Sch()
    s.VS((0, 6), (0, 2.5), 'Vin', 'left'); s.gnd((0, 2.5))
    P1, N1, O1 = opamp_at(s, (3, 6))
    s.W((0, 6), P1)
    s.W(N1, (N1[0]-1, N1[1]), (N1[0]-1, N1[1]+1.6), (O1[0]+1, N1[1]+1.6), (O1[0], O1[1]) ) if False else None
    s.W(N1, (N1[0]-0.8, N1[1]), (N1[0]-0.8, N1[1]+1.8), (O1[0]+1.2, N1[1]+1.8), (O1[0]+1.2, O1[1])); s.W(O1, (O1[0]+1.2, O1[1])); s.dot((O1[0]+1.2, O1[1]))
    bx = O1[0]+1.2; by = O1[1]
    # inverter U2 below
    P2, N2, O2 = opamp_at(s, (bx+3.2, -3.5))
    s.W(P2, (P2[0]-1, P2[1])); s.gnd((P2[0]-1, P2[1]))
    s.W((bx, by), (bx, N2[1])); s.R((bx, N2[1]), (bx+2.2, N2[1]), 'Ri\n10k', 'up'); s.W((bx+2.2, N2[1]), N2) if False else None
    s.W((bx+2.2, N2[1]), N2); s.dot((bx+2.2, N2[1]))
    s.W((bx+2.2, N2[1]), (bx+2.2, N2[1]+1.6), (O2[0]+1.2, N2[1]+1.6)); s.R((bx+2.2, N2[1]+1.6), (O2[0]+1.2, N2[1]+1.6), 'Rfi\n10k', 'up') if False else None
    s.W(O2, (O2[0]+1.2, O2[1])); s.dot((O2[0]+1.2, O2[1]))
    s.W((O2[0]+1.2, O2[1]), (O2[0]+1.2, N2[1]+1.6))
    s.R((bx+2.2, N2[1]+1.6), (O2[0]+1.2, N2[1]+1.6), 'Rfi 10k', 'up')
    # diodes into node x
    xx = O2[0]+4.5
    s.W((bx, by), (bx+1, by)); s.D((bx+1, by), (xx-1, by), 'D1\n1N914', 'up'); s.W((xx-1, by), (xx, by)); s.dot((xx, by))
    s.W((O2[0]+1.2, O2[1]), (O2[0]+2.2, O2[1])); s.D((O2[0]+2.2, O2[1]), (xx, O2[1]), 'D2\n1N914', 'up') if False else None
    s.W((O2[0]+1.2, O2[1]), (O2[0]+1.8, O2[1])); s.D((O2[0]+1.8, O2[1]), (xx-1.0, O2[1]), 'D2 1N914', 'up'); s.W((xx-1.0, O2[1]), (xx, O2[1]), (xx, by))
    # filter
    s.R((xx, by), (xx+3.4, by), 'Rs\n470', 'up'); s.W((xx+3.4, by), (xx+4.6, by)); s.dot((xx+4.6, by))
    s.R((xx+4.6, by), (xx+4.6, 2.5), 'Rd\n2.7M', 'left'); s.gnd((xx+4.6, 2.5))
    s.W((xx+4.6, by), (xx+7.2, by)); s.dot((xx+7.2, by)); s.C((xx+7.2, by), (xx+7.2, 2.5), 'Cd\n0.1µ', 'right'); s.gnd((xx+7.2, 2.5))
    # output stage
    x3 = xx+9
    P3, N3, O3 = opamp_at(s, (x3, by))
    s.W((xx+7.2, by), P3)
    Q = place(s, e.BjtNpn, 'base', (O3[0]+1.4, O3[1]), 'Qf\n2N2222A', 'right', ofst=.3)
    s.W(O3, (O3[0]+1.4, O3[1]))
    C, E = A(Q, 'collector'), A(Q, 'emitter')
    s.W(C, (C[0], C[1]+1.2)); s.vdd((C[0], C[1]+1.2), '+12 V')
    s.W(N3, (N3[0]-0.8, N3[1]), (N3[0]-0.8, N3[1]+2.4), (E[0]+1.6, N3[1]+2.4), (E[0]+1.6, E[1]), E); s.dot((E[0]+1.6, E[1]))
    s.R((E[0]+1.6, E[1]), (E[0]+1.6, E[1]-3.2), 'Rpd\n2.2k', 'right'); s.text((E[0]+0.7, E[1]-3.7), '−12 V')
    s.W((E[0]+1.6, E[1]), (E[0]+4.6, E[1])) if False else None
    s.R((E[0]+1.6, E[1]), (E[0]+5.6, E[1]), 'Ro1\n1k', 'up'); s.W((E[0]+5.6, E[1]), (E[0]+7, E[1])); s.dot((E[0]+7, E[1]))
    s.C((E[0]+7, E[1]), (E[0]+7, E[1]-3.2), 'Cagc\n0.1µ', 'right'); s.gnd((E[0]+7, E[1]-3.2)); s.W((E[0]+7, E[1]), (E[0]+9, E[1])); s.text((E[0]+9.1, E[1]), 'AGC out')
    return s.svg()

def cw_shaper():       # Fig 13.36, netlist cw-shaper-fig13.36
    s = Sch(); y = 6
    s.V((0, y), (0, 2), 'Key', 'left'); s.gnd((0, 2))
    P, N, O = opamp_at(s, (4, y), flip=True)
    s.W((0, y), P)
    s.text((1.7, N[1]-1.0), 'Vref 2.5 V'); s.W(N, (N[0]-1, N[1]))
    # pull-up and switch (open collector)
    s.W(O, (O[0]+2, O[1])); s.dot((O[0]+2, O[1])); cx = O[0]+2; cy = O[1]
    s.W((cx, cy), (cx, cy+2.2)); s.R((cx, cy+2.2), (cx, cy+4.6), 'Rpu\n4.7k', 'left'); s.vdd((cx, cy+4.6), '+5 V')
    s.W((cx, cy), (cx+1.4, cy)); s.D((cx+1.4, cy), (cx+5.4, cy), 'D1\n1N917', 'up'); s.W((cx+5.4, cy), (cx+6.4, cy)); s.dot((cx+6.4, cy))
    s.R((cx+6.4, cy), (cx+6.4, cy-3.2), 'Rd\n10k', 'right'); s.gnd((cx+6.4, cy-3.2))
    s.W((cx+6.4, cy), (cx+8, cy)); s.dot((cx+8, cy)); s.C((cx+8, cy), (cx+8, cy-3.2), 'Cd\n0.47µ', 'right'); s.gnd((cx+8, cy-3.2))
    # sallen-key
    x0 = cx+8
    s.R((x0, cy), (x0+3.6, cy), 'R1\n15k', 'up'); s.W((x0+3.6, cy), (x0+4.6, cy)); s.dot((x0+4.6, cy))
    s.R((x0+4.6, cy), (x0+8.2, cy), 'R2\n15k', 'up'); s.W((x0+8.2, cy), (x0+9.2, cy)); s.dot((x0+9.2, cy))
    s.C((x0+9.2, cy), (x0+9.2, cy-3.2), 'Cg\n0.1µ', 'right'); s.gnd((x0+9.2, cy-3.2))
    P2, N2, O2 = opamp_at(s, (x0+11.2, cy))
    s.W((x0+9.2, cy), P2)
    s.W(N2, (N2[0]-0.8, N2[1]), (N2[0]-0.8, N2[1]+2.2), (O2[0]+1.2, N2[1]+2.2), (O2[0]+1.2, O2[1])); s.W(O2, (O2[0]+1.2, O2[1])); s.dot((O2[0]+1.2, O2[1]))
    s.W((x0+4.6, cy), (x0+4.6, cy+3.6), (O2[0]+1.2, cy+3.6)); s.C((x0+4.6, cy+3.6), (O2[0]+1.2, cy+3.6), 'Cfb\n0.33µ', 'up') if False else None
    s.C((x0+6.2, cy+3.6), (x0+10.2, cy+3.6), 'Cfb\n0.33µ', 'up')
    s.W((x0+4.6, cy+3.6), (x0+6.2, cy+3.6)); s.W((x0+10.2, cy+3.6), (O2[0]+1.2, cy+3.6), (O2[0]+1.2, O2[1]))
    fx = O2[0]+1.2
    s.W((fx, cy), (fx+1.4, cy)); s.R((fx+1.4, cy), (fx+5, cy), 'Rdiv1\n2.7k', 'up'); s.W((fx+5, cy), (fx+6.2, cy)); s.dot((fx+6.2, cy))
    s.R((fx+6.2, cy), (fx+6.2, cy-3.2), 'Rdiv2\n560', 'right'); s.gnd((fx+6.2, cy-3.2))
    P3, N3, O3 = opamp_at(s, (fx+9, cy))
    s.W((fx+6.2, cy), P3)
    nx = N3[0]-0.8; ty = N3[1]+2.2
    s.W(N3, (nx, N3[1])); s.dot((nx, N3[1]))
    s.W((nx, N3[1]), (nx, ty)); s.R((nx, ty), (O3[0]+1.2, ty), 'Rfa\n10k', 'up')
    s.W(O3, (O3[0]+1.2, O3[1])); s.dot((O3[0]+1.2, O3[1])); s.W((O3[0]+1.2, O3[1]), (O3[0]+1.2, ty))
    s.R((nx, N3[1]), (nx, N3[1]-3.2), 'Rm\n120k', 'right'); s.text((nx-0.6, N3[1]-4.2), '−5 V')
    s.W((O3[0]+1.2, O3[1]), (O3[0]+3, O3[1])); s.text((O3[0]+3.1, O3[1]), 'Vgain')
    return s.svg()
