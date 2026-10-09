from schem_lib import *
from schem_defs2 import opamp_at

def comparator():      # Fig 3.68 (behavioural comparator), netlist comparator-hyst-fig3.68
    s = Sch()
    P, N, O = opamp_at(s, (6, 2))
    s.W((0, N[1]), N); s.VS((0, N[1]), (0, -0.5), 'Vin\n三角波', 'left'); s.gnd((0, -0.5))
    s.W(P, (3.5, P[1]), (3.5, 0.6)); s.dot((3.5, 0.6))
    s.R((3.5, 0.6), (3.5, -2.6), 'Rg\n10k', 'left'); s.gnd((3.5, -2.6))
    s.W(O, (10.5, O[1])); s.dot((10.5, O[1])); s.W((10.5, O[1]), (10.5, 0.6))
    s.R((10.5, 0.6), (6.4, 0.6), 'Rfb\n100k', 'up'); s.W((6.4, 0.6), (3.5, 0.6))
    s.W((10.5, O[1]), (13.5, O[1])); s.dot((13.5, O[1])); s.R((13.5, O[1]), (13.5, -0.4), 'Rl\n100k', 'right') if False else s.R((13.5, O[1]), (13.5, -1.4), 'Rl\n100k', 'right'); s.gnd((13.5, -1.4))
    s.W((13.5, O[1]), (15.5, O[1])); s.text((15.6, O[1]), 'out（±5 V）')
    s.text((0, 6.4), '（以行為模型比較器代替）')
    return s.svg()

def tia():             # Fig 3.28A, netlist photodiode-tia-fig3.28
    s = Sch()
    P, N, O = opamp_at(s, (7, 1.5))
    s.W(P, (5.2, P[1]), (5.2, -0.5)); s.gnd((5.2, -0.5))
    s.W(N, (3.6, N[1])); s.dot((3.6, N[1]))
    s.I((3.6, -0.5), (3.6, N[1]), 'Iph\n1 µA', 'left'); s.gnd((3.6, -0.5))
    s.W((3.6, N[1]), (1.2, N[1])); s.dot((1.2, N[1])); s.C((1.2, N[1]), (1.2, -0.5), 'Cd\n20p', 'left'); s.gnd((1.2, -0.5))
    s.W(O, (11.5, O[1])); s.dot((11.5, O[1])); s.W((11.5, O[1]), (11.5, 8.6)); s.W((3.6, N[1]), (3.6, 8.6))
    s.dot((11.5, 6.4)); s.dot((3.6, 6.4))
    s.W((11.5, 8.6), (10.6, 8.6)); s.R((10.6, 8.6), (4.5, 8.6), 'Rf\n1M', 'up'); s.W((4.5, 8.6), (3.6, 8.6))
    s.W((11.5, 6.4), (10.6, 6.4)); s.C((10.6, 6.4), (4.5, 6.4), 'Cf 2p', 'down'); s.W((4.5, 6.4), (3.6, 6.4))
    s.W((11.5, O[1]), (13.5, O[1])); s.text((13.6, O[1]), 'out')
    return s.svg()

def precision():       # Fig 3.71, netlist precision-rect-fig3.71
    s = Sch()
    P, N, O = opamp_at(s, (4, 8), flip=True)
    s.W((0, P[1]), P); s.VS((0, P[1]), (0, 4), 'Vin\n100 mV\n1 kHz', 'left'); s.gnd((0, 4))
    s.D(O, (10.5, O[1]), 'D1\n1N4148', 'up'); s.W((10.5, O[1]), (12, O[1])); s.dot((12, O[1]))
    s.W((12, O[1]), (12, 4.4), (2.2, 4.4), (2.2, N[1]), N)
    s.W((12, O[1]), (15, O[1])); s.dot((15, O[1])); s.R((15, O[1]), (15, 3.5), 'Rl\n10k', 'right'); s.gnd((15, 3.5))
    s.W((15, O[1]), (17, O[1])); s.text((17.1, O[1]), 'o')
    return s.svg()

def colpitts():        # Fig 9.12A, netlist colpitts-fig9.12
    s = Sch(); top, bus = 11.5, -1.5
    B = (8, 4.5)
    Q = place(s, e.BjtNpn, 'base', B, 'Q1\n2N3904', 'right', ofst=.35)
    C, E = A(Q, 'collector'), A(Q, 'emitter')
    s.W((2, top), (C[0], top)); s.vdd((2, top), '+12 V')
    s.R((C[0], top), (C[0], 8.2), 'Rc\n1k', 'right'); s.dot((C[0], 8.2))
    s.L((C[0], 8.2), C, 'L1\n2.2µ', 'right')
    s.W((C[0], 8.2), (6, 8.2)); s.C((6, 8.2), (6, bus), 'Cc\n10n', 'left')
    s.dot((4, top)); s.R((4, top), (4, 4.5), 'R1\n33k', 'left'); s.R((4, 4.5), (4, bus), 'R2\n10k', 'left'); s.dot((4, 4.5))
    s.W((4, 4.5), B); s.W((4, 4.5), (2.2, 4.5)); s.C((2.2, 4.5), (2.2, bus), 'Cb\n1n', 'left')
    s.W(E, (E[0], 1.8)); s.dot((E[0], 1.8)); s.R((E[0], 1.8), (E[0], bus), 'Re\n1k', 'right')
    s.dot(C); s.W(C, (12, C[1])); s.dot((12, C[1])); s.C((12, C[1]), (12, 1.8), 'C1\n220p', 'left'); s.dot((12, 1.8))
    s.W((12, 1.8), (E[0], 1.8)); s.C((12, 1.8), (12, bus), 'C2\n220p', 'right')
    s.W((12, C[1]), (13.5, C[1])); s.C((13.5, C[1]), (17.5, C[1]), 'Cout\n5p', 'up'); s.W((17.5, C[1]), (19, C[1])); s.dot((19, C[1]))
    s.R((19, C[1]), (19, bus), 'Rl\n1k', 'right'); s.W((19, C[1]), (21, C[1])); s.text((21.1, C[1]), 'out')
    s.W((2.2, bus), (19, bus)); s.gnd((10, bus))
    for x in (4, 6, E[0], 12): s.dot((x, bus))
    return s.svg()

def amdet():           # Fig 8.3, netlist am-detector-fig8.3
    s = Sch()
    s.VS((0, 4), (0, 0), 'AM 輸入\n1 MHz 載波\n1 kHz, m=0.5', 'left'); s.gnd((0, 0))
    s.R((0, 4), (4, 4), 'Rs\n50', 'up'); s.D((4, 4), (8.5, 4), 'D1\n1N4148', 'up'); s.W((8.5, 4), (10, 4)); s.dot((10, 4))
    s.C((10, 4), (10, 0), 'Cl\n10n', 'left'); s.gnd((10, 0))
    s.W((10, 4), (12.5, 4)); s.dot((12.5, 4)); s.R((12.5, 4), (12.5, 0), 'Rl\n10k', 'right'); s.gnd((12.5, 0))
    s.C((12.5, 4), (17, 4), 'Cc\n10µ', 'up'); s.dot((18.5, 4)); s.W((17, 4), (18.5, 4)); s.R((18.5, 4), (18.5, 0), 'Rla\n100k', 'right'); s.gnd((18.5, 0))
    s.W((18.5, 4), (20.5, 4)); s.text((20.6, 4), 'aud')
    return s.svg()

def sallen():          # Fig 3.69, netlist sallen-key-fig3.69
    s = Sch()
    s.VS((0, 6), (0, 2), 'Vin', 'left'); s.gnd((0, 2))
    s.R((0, 6), (4, 6), 'R1\n10k', 'up'); s.W((4, 6), (6, 6)); s.dot((6, 6))
    s.R((6, 6), (10, 6), 'R2\n10k', 'up'); s.dot((10, 6))
    P, N, O = opamp_at(s, (12, 3), flip=True)
    s.W((10, 6), (10, P[1]), P); s.dot((10, P[1])); s.C((10, P[1]), (10, -0.5), 'C2\n11.25n', 'left'); s.gnd((10, -0.5))
    s.W(O, (15.5, O[1])); s.dot((15.5, O[1])); s.W((15.5, O[1]), (15.5, 0.2), (10.8, 0.2), (10.8, N[1]), N)
    s.W((6, 6), (6, 8.5)); s.dot((6, 6)); s.C((7.5, 8.5), (14, 8.5), 'C1\n22.5n', 'up'); s.W((6, 8.5), (7.5, 8.5)); s.W((14, 8.5), (15.5, 8.5), (15.5, O[1]))
    s.W((15.5, O[1]), (17.5, O[1])); s.text((17.6, O[1]), 'out')
    return s.svg()

def wien():            # Fig 25.20 (after), netlist wien-osc-fig25.20
    s = Sch()
    P, N, O = opamp_at(s, (10, 8), flip=True)
    s.W(O, (15, O[1])); s.dot((15, O[1])); s.W((15, O[1]), (17, O[1])); s.text((17.1, O[1]), 'o')
    # positive feedback: series Rs1+Cs1 from o, parallel Rp1||Cp1 to gnd
    s.W((15, O[1]), (15, 11)); s.R((15, 11), (10.8, 11), 'Rs1\n15.9k', 'up'); s.C((9.6, 11), (6, 11), 'Cs1\n10n', 'up')
    s.W((10.8, 11), (9.6, 11)); s.W((6, 11), (4, 11), (4, P[1])); s.dot((4, P[1])); s.W((4, P[1]), P)
    s.R((4, P[1]), (4, 3), 'Rp1\n15.9k', 'left'); s.gnd((4, 3))
    s.W((4, P[1]), (2, P[1])); s.dot((4, P[1])); s.C((2, P[1]), (2, 3), 'Cp1\n10n', 'left'); s.gnd((2, 3))
    # negative feedback: Rf, Rd+D1/D2, Rg
    s.W(N, (8, N[1])); s.dot((8, N[1])); s.W((8, N[1]), (8, 2.9)); s.R((8, 2.9), (8, -0.6), 'Rg\n10k', 'left'); s.gnd((8, -0.6))
    s.W((15, O[1]), (15, 5.6)); s.dot((15, 5.6)); s.W((15, 5.6), (14.4, 5.6)); s.R((14.4, 5.6), (9.6, 5.6), 'Rf\n22k', 'up'); s.W((9.6, 5.6), (8, 5.6)); s.dot((8, 5.6))
    s.W((15, 5.6), (15, 4.3)); s.W((15, 4.3), (14.4, 4.3)); s.R((14.4, 4.3), (11.8, 4.3), 'Rd\n6.8k', 'up'); s.W((11.8, 4.3), (10.7, 4.3)); s.dot((10.7, 4.3))
    s.W((10.7, 4.3), (10.7, 4.9), (10.4, 4.9)) if False else None
    s.W((10.7, 4.3), (10.7, 4.9)); s.D((10.7, 4.9), (8, 4.9), 'D1', 'up'); s.W((10.7, 4.3), (10.7, 3.7)); s.D((8, 3.7), (10.7, 3.7), 'D2', 'down')
    s.dot((8, 4.9), (8, 3.7))
    return s.svg()

def buck():            # Fig 7.30, netlist buck-fig7.30
    s = Sch()
    s.V((0, 5), (0, 0), 'Vin\n12 V', 'left'); s.gnd((0, 0))
    s.part(e.Switch, (3, 5), (6.5, 5), 'S1', 'up') if False else s.part(e.Switch, (2.5, 5), (6.5, 5), 'S1（PWM 100 kHz, D=0.5）', 'up')
    s.W((0, 5), (2.5, 5)); s.W((6.5, 5), (8, 5)); s.dot((8, 5))
    s.D((8, 0), (8, 5), 'D1', 'left'); s.gnd((8, 0))
    s.L((8, 5), (13, 5), 'L1 100µ', 'up'); s.W((13, 5), (14.5, 5)); s.dot((14.5, 5))
    s.C((14.5, 5), (14.5, 0), 'Cout\n100µ', 'left'); s.gnd((14.5, 0))
    s.W((14.5, 5), (17.5, 5)); s.dot((17.5, 5)); s.R((17.5, 5), (17.5, 0), 'Rl\n6', 'right'); s.gnd((17.5, 0))
    s.W((17.5, 5), (19.5, 5)); s.text((19.6, 5), 'Vo ≈ 6 V')
    return s.svg()

def psu():             # Fig 7.69, netlist psu-13v8-fig7.69
    s = Sch(); bus = -6.5
    s.VS((0, -2), (0, 2), 'T1 次級\n16–20 Vac\n60 Hz', 'left')
    s.W((0, 2), (4, 2)); s.W((0, -2), (0, -4), (11.5, -4), (11.5, 2), (9, 2))
    A_, B_, P_, G_ = (4, 2), (9, 2), (6.5, 5), (6.5, -1)
    s.D(A_, P_, 'D1', 'up'); s.D(B_, P_, 'D4', 'up'); s.D(G_, A_, 'D2', 'down'); s.D(G_, B_, 'D3', 'down')
    s.dot(A_, B_, P_, G_)
    s.W(G_, (6.5, bus)); s.gnd((6.5, bus))
    s.W(P_, (13.5, 5)); s.dot((13.5, 5))
    s.C((13.5, 5), (13.5, bus), 'C1\n10000µ', 'left'); s.W((13.5, 5), (17, 5)); s.dot((17, 5)); s.R((17, 5), (17, bus), 'R1\n1k', 'right')
    I = e.Ic(pins=[e.IcPin(name='IN', side='left', anchorname='IN'), e.IcPin(name='OUT', side='right', anchorname='OUT'),
                   e.IcPin(name='ADJ', side='bottom', anchorname='ADJ')], size=(4, 2.4)).right().at((19.5, 3.8)); s.d += I
    s.text((20.9, 6.9), 'U2 LM338')
    IN, OUT, ADJ = A(I, 'IN'), A(I, 'OUT'), A(I, 'ADJ')
    s.W((17, 5), IN); s.W(OUT, (27.5, OUT[1])); s.dot((26, OUT[1]))
    s.W(ADJ, (ADJ[0], 2.2)); s.dot((ADJ[0], 2.2))
    s.R((26, OUT[1]), (26, 2.2), 'R3\n120', 'right'); s.W((26, 2.2), (ADJ[0], 2.2))
    s.R((ADJ[0], 2.2), (ADJ[0], -1.6), 'R2\n1k', 'left'); s.R((ADJ[0], -1.6), (ADJ[0], bus), 'R8\n205', 'left')
    s.W((ADJ[0], 2.2), (ADJ[0]-2.6, 2.2)); s.C((ADJ[0]-2.6, 2.2), (ADJ[0]-2.6, bus), 'C3\n10µ', 'left')
    s.W((27.5, OUT[1]), (29.5, OUT[1])); s.dot((29.5, OUT[1])); s.C((29.5, OUT[1]), (29.5, bus), 'C4\n1µ', 'right')
    s.W((29.5, OUT[1]), (33, OUT[1])); s.dot((33, OUT[1])); s.R((33, OUT[1]), (33, bus), 'Rl\n2.76', 'right')
    s.W((33, OUT[1]), (35.5, OUT[1])); s.text((35.6, OUT[1]), '+13.8 V')
    s.W((6.5, bus), (33, bus))
    return s.svg()
