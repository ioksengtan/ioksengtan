from schem_lib import *
from schem_defs2 import opamp_at

def xtal_ladder():     # netlist xtal-ladder-fig11.11.1
    s = Sch(); y, g = 4, 0
    s.VS((0, y), (0, g), 'Vin', 'left'); s.gnd((0, g))
    s.R((0, y), (4, y), 'Rs\n300', 'up'); s.W((4, y), (7, y)); s.dot((7, y))
    xs = [7, 13, 19, 25, 31]
    for i in range(4):
        s.part(e.Crystal, (xs[i], y), (xs[i+1], y), f'X{i+1}', 'up')
    for i, (x, nm) in enumerate(zip(xs[1:4], ('C1', 'C2', 'C3'))):
        s.dot((x, y)); s.C((x, y), (x, g), f'{nm}\n68p', 'left'); s.gnd((x, g))
    s.dot((31, y)); s.R((31, y), (31, g), 'Rl\n300', 'right'); s.gnd((31, g))
    s.W((31, y), (33, y)); s.text((33.1, y), 'out')
    return s.svg()

def rf_probe():        # netlist rf-probe-fig25.11
    s = Sch(); y, g = 4, 0
    s.VS((0, y), (0, g), 'RF\n（1 MHz，\n振幅 0→5 V）', 'left'); s.gnd((0, g))
    s.R((0, y), (4, y), 'Rs\n50', 'up'); s.W((4, y), (6, y)); s.text((4.8, y+0.9), '探棒 probe')
    s.D((6, y), (10.5, y), 'D1\n蕭特基', 'up'); s.W((10.5, y), (12, y)); s.dot((12, y))
    s.C((12, y), (12, g), 'Cl\n1n', 'left'); s.gnd((12, g))
    s.W((12, y), (15, y)); s.dot((15, y)); s.R((15, y), (15, g), 'Rdvm\n10M', 'right'); s.gnd((15, g))
    s.W((15, y), (17, y)); s.text((17.1, y), 'to DVM')
    return s.svg()

def varactor():        # netlist varactor-tank-fig3.21
    s = Sch(); y = 9
    s.V((0, y), (0, 0), 'Vtune\n1–10 V', 'left'); s.gnd((0, 0))
    s.R((0, y), (4.5, y), 'Rb\n100k', 'up'); s.W((4.5, y), (6, y)); s.dot((6, y))
    s.D((6, 0), (6, y), 'Dv\n變容二極體', 'right'); s.gnd((6, 0))
    s.C((6, y), (11, y), 'Cblk\n1n', 'up'); s.W((11, y), (12.5, y)); s.dot((12.5, y), (16, y), (19.5, y))
    s.W((12.5, y), (19.5, y))
    s.L((12.5, y), (12.5, 0), 'L1\n4.7µ', 'left'); s.C((16, y), (16, 0), 'Cf\n22p', 'right'); s.R((19.5, y), (19.5, 0), 'Rp\n15k', 'right')
    s.W((12.5, 0), (19.5, 0)); s.dot((16, 0)); s.gnd((16, 0))
    s.W((19.5, y), (23, y)); s.W((19.5, 0), (23, 0)); s.I((23, 0), (23, y), 'I1\n1 µA AC', 'right')
    s.text((12.7, y+0.9), 'out（諧振節點）')
    return s.svg()

def log_amp():         # netlist log-amp-fig3.73
    s = Sch()
    P, N, O = opamp_at(s, (9, 2))
    s.W(P, (7.4, P[1]), (7.4, -0.3)); s.gnd((7.4, -0.3))
    s.VS((0, N[1]), (0, -0.3), 'Vin\n10 mV→10 V', 'left'); s.gnd((0, -0.3))
    s.R((0, N[1]), (4.2, N[1]), 'R1\n100k', 'up'); s.W((4.2, N[1]), N); s.dot((6, N[1]))
    s.W((6, N[1]), (6, 6.3)); s.D((6, 6.3), (12.5, 6.3), 'D1\n1N4148', 'up'); s.W((12.5, 6.3), (13.5, 6.3), (13.5, O[1]))
    s.W(O, (15.5, O[1])); s.dot((13.5, O[1])); s.text((15.6, O[1]), 'out')
    return s.svg()

def mosfet():          # netlist mosfet-driver-fig3.57
    s = Sch(); top = 11
    M = place_rev(s, e.NFet, 'gate', (8, 3), 'M1\nNLOGIC', 'right', ofst=.3)
    D, S_, G = A(M, 'drain'), A(M, 'source'), A(M, 'gate')
    x = D[0]
    s.W((x-3, top), (x+3.2, top)); s.vdd((x-3, top), '+12 V'); s.dot((x, top))
    s.L((x, top), (x, 8), 'Lcoil\n100m', 'right'); s.R((x, 8), (x, 5), 'Rcoil\n240', 'right'); s.W((x, 5), D); s.dot((x, 5))
    s.W((x, 5), (x+3.2, 5)); s.D((x+3.2, 5), (x+3.2, top), 'D1\n飛輪', 'right'); s.W((x+3.2, top), (x, top))
    s.W(S_, (S_[0], 0)); s.gnd((S_[0], 0))
    s.W(G, (G[0]-1.6, G[1])); s.dot((G[0]-1.6, G[1])); s.R((G[0]-1.6, G[1]), (G[0]-1.6, 0), 'Rpd\n10k', 'left'); s.gnd((G[0]-1.6, 0))
    s.R((G[0]-5.2, G[1]), (G[0]-1.6, G[1]), 'Rg\n100', 'up'); s.W((G[0]-5.2, G[1]), (G[0]-6.4, G[1])); s.text((G[0]-8.6, G[1]-0.15), 'gate（0/5 V）')
    return s.svg()

def mic():             # netlist mic-preamp-fig13.98
    s = Sch()
    s.VS((0, 6), (0, 2.5), 'Vmic', 'left'); s.gnd((0, 2.5))
    s.R((0, 6), (4, 6), 'Rmic\n2.2k', 'up'); s.C((4, 6), (8.5, 6), 'Cin\n4.7µ', 'up'); s.W((8.5, 6), (10, 6)); s.dot((10, 6))
    s.R((10, 6), (10, 2.5), 'Rb\n100k', 'left'); s.gnd((10, 2.5))
    P, N, O = opamp_at(s, (13, 6), flip=True)
    s.W((10, 6), P)
    s.W(N, (11.2, N[1])); s.dot((11.2, N[1]))
    s.W((11.2, N[1]), (11.2, 3.9)); s.dot((11.2, 3.9)); s.W((11.2, 3.9), (11.2, 1.0)); s.dot((11.2, 1.0))
    s.R((11.2, 1.0), (11.2, -1.4), 'Rg\n1k', 'left'); s.C((11.2, -1.4), (11.2, -4.4), 'Cg\n4.7µ', 'left'); s.gnd((11.2, -4.4))
    s.W(O, (19.5, O[1])); s.dot((17.5, O[1])); s.W((17.5, O[1]), (17.5, 3.9)); s.dot((17.5, 3.9))
    s.W((17.5, 3.9), (16.5, 3.9)); s.R((16.5, 3.9), (12.7, 3.9), 'Rf\n47k', 'up'); s.W((12.7, 3.9), (11.2, 3.9))
    s.W((17.5, 3.9), (17.5, 1.0)); s.W((17.5, 1.0), (16.5, 1.0)); s.C((16.5, 1.0), (12.7, 1.0), 'Cf\n47p', 'down'); s.W((12.7, 1.0), (11.2, 1.0))
    s.text((19.6, O[1]), 'out')
    return s.svg()

def doubler():         # netlist freq-doubler-fig13.25
    s = Sch(); top = 10
    s.VS((0, 4), (0, 0), 'Vdrv\n3.5 MHz', 'left'); s.gnd((0, 0))
    s.R((0, 4), (3.6, 4), 'Rdrv\n50', 'up'); s.C((3.6, 4), (7.2, 4), 'Cin\n1n', 'up'); s.W((7.2, 4), (8.4, 4)); s.dot((8.4, 4))
    s.R((8.4, 4), (8.4, 0.3), 'Rb\n4.7k', 'left'); s.gnd((8.4, 0.3))
    Q = place(s, e.BjtNpn, 'base', (8.4, 4), 'Q1\n2N3904', 'right', ofst=.3)
    C, E = A(Q, 'collector'), A(Q, 'emitter')
    s.W(E, (E[0], 0.3)); s.gnd((E[0], 0.3))
    x = C[0]
    s.vdd((x, top+1.2), '+12 V'); s.W((x, top+1.2), (x, top)); s.W((x, top), (x+4.5, top)); s.dot((x, top))
    s.L((x, top), C, 'L1\n1µ', 'left'); s.W((x+4.5, top), (x+4.5, 8.5)) if False else None
    s.C((x+4.5, top), (x+4.5, C[1]), 'Ct\n517p', 'right'); s.W(C, (x+4.5, C[1])); s.dot((x, C[1])); s.dot((x+4.5, C[1]))
    s.W((x+4.5, C[1]), (x+7, C[1])); s.C((x+7, C[1]), (x+11, C[1]), 'Cout\n100p', 'up'); s.W((x+11, C[1]), (x+12.5, C[1])); s.dot((x+12.5, C[1]))
    s.R((x+12.5, C[1]), (x+12.5, 0.3), 'Rl\n1k', 'right'); s.gnd((x+12.5, 0.3)); s.W((x+12.5, C[1]), (x+14.5, C[1])); s.text((x+14.6, C[1]), 'out 7 MHz')
    return s.svg()

def mfb():             # netlist mfb-bandpass-fig12.49
    s = Sch()
    s.VS((0, 3.24), (0, -0.5), 'Vin', 'left'); s.gnd((0, -0.5))
    s.R((0, 3.24), (4, 3.24), 'R1\n39k', 'up'); s.W((4, 3.24), (5.5, 3.24)); s.dot((5.5, 3.24))
    s.R((5.5, 3.24), (5.5, -0.5), 'R3\n1.65k', 'left'); s.gnd((5.5, -0.5))
    P, N, O = opamp_at(s, (12, 2))
    s.W(P, (10.4, P[1]), (10.4, -0.5)); s.gnd((10.4, -0.5))
    s.C((5.5, 3.24), (9, 3.24), 'C1\n10n', 'up'); s.W((9, 3.24), N); s.dot((10.5, N[1]))
    s.W((10.5, N[1]), (10.5, 5.5)); s.dot((10.5, 5.5)) if False else None
    s.W(O, (17.5, O[1])); s.dot((15.5, O[1])); s.W((15.5, O[1]), (15.5, 7.8)); s.dot((15.5, 5.5))
    s.W((10.5, 5.5), (11.5, 5.5)); s.R((11.5, 5.5), (14.5, 5.5), 'R2\n160k', 'up') if False else s.R((11.5, 5.5), (14.5, 5.5), 'R2\n160k', 'down'); s.W((14.5, 5.5), (15.5, 5.5))
    s.W((5.5, 3.24), (5.5, 7.8)); s.dot((5.5, 3.24)); s.W((5.5, 7.8), (7, 7.8)); s.C((7, 7.8), (14, 7.8), 'C2\n10n', 'up'); s.W((14, 7.8), (15.5, 7.8))
    s.text((17.6, O[1]), 'out')
    return s.svg()
