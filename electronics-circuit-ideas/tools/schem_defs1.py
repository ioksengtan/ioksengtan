from schem_lib import *

def ce_amp():          # Fig 3.44, netlist ce-amp-fig3.44
    s = Sch(); top, bot = 9, 0
    B = (8, 4.5)
    Q = place(s, e.BjtNpn, 'base', B, 'Q1\n2N3904', 'right')
    C, E = A(Q, 'collector'), A(Q, 'emitter')
    s.R((C[0], top), C, 'Rc\n4.7k', 'right')
    s.W((2, top), (C[0], top)); s.vdd((2, top), '+12 V'); s.dot((6, top))
    s.R((6, top), (6, B[1]), 'R1\n82k', 'left'); s.R((6, B[1]), (6, bot), 'R2\n15k', 'left'); s.gnd((6, bot)); s.dot((6, B[1]))
    s.W((6, B[1]), B)
    s.C((0, B[1]), (6, B[1]), 'Cin\n10µ', 'up'); s.VS((0, B[1]), (0, bot), 'Vin', 'left'); s.gnd((0, bot))
    s.R(E, (E[0], bot), 'Re\n1k', 'right'); s.gnd((E[0], bot)); s.dot((E[0], 1.3))
    s.W((E[0], 1.3), (E[0]-2.4, 1.3)); s.CP((E[0]-2.4, 1.3), (E[0]-2.4, bot), 'Ce\n100µ', 'left'); s.gnd((E[0]-2.4, bot))
    s.dot(C); s.C(C, (C[0]+4.5, C[1]), 'Cout\n10µ', 'up'); x = C[0]+4.5
    s.R((x, C[1]), (x, bot), 'RL\n10k', 'right'); s.gnd((x, bot)); s.dot((x, C[1])); s.W((x, C[1]), (x+1.8, C[1])); s.text((x+1.9, C[1]), 'out')
    return s.svg()

def jfet_cs():         # Fig 3.51, netlist jfet-cs-fig3.51
    s = Sch(); top, bot = 9, 0
    J = place(s, e.JFetN, 'gate', (8, 4.5), 'J1\n2N5486', 'right', loc2=None) if False else place_rev(s, e.JFetN, 'gate', (8, 4.5), 'J1\n2N5486')
    D, S_, G = A(J, 'drain'), A(J, 'source'), A(J, 'gate')
    s.R((D[0], top), D, 'Rd\n2.2k', 'right'); s.W((3, top), (D[0], top)); s.vdd((3, top), '+12 V')
    s.C((0, G[1]), (4.5, G[1]), 'Cin\n100n', 'up'); s.W((4.5, G[1]), G); s.dot((4.5, G[1]))
    s.R((4.5, G[1]), (4.5, bot), 'Rg\n1M', 'left'); s.gnd((4.5, bot))
    s.VS((0, G[1]), (0, bot), 'Vin', 'left'); s.gnd((0, bot))
    s.R(S_, (S_[0], bot), 'Rs\n1.5k', 'right'); s.gnd((S_[0], bot)); s.dot((S_[0], 1.2))
    s.W((S_[0], 1.2), (S_[0]-2.4, 1.2)); s.CP((S_[0]-2.4, 1.2), (S_[0]-2.4, bot), 'Cs\n100µ', 'left'); s.gnd((S_[0]-2.4, bot))
    s.dot(D); s.C(D, (D[0]+4.5, D[1]), 'Cout\n100n', 'up'); x = D[0]+4.5
    s.R((x, D[1]), (x, bot), 'RL\n100k', 'right'); s.gnd((x, bot)); s.dot((x, D[1])); s.W((x, D[1]), (x+1.8, D[1])); s.text((x+1.9, D[1]), 'out')
    return s.svg()

