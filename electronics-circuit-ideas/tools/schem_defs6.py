from schem_lib import *
from schem_defs2 import opamp_at

def lpf54():           # Fig 11.101, netlist lpf-1p8-54-fig11.101
    s = Sch(); y, g = 4, 0
    s.VS((0, y), (0, g), 'Vin', 'left'); s.gnd((0, g))
    s.R((0, y), (3.5, y), 'Rs\n50', 'up'); s.W((3.5, y), (4.5, y))
    s.L((4.5, y), (9.5, y), 'L1\n178.9n', 'up'); s.W((9.5, y), (11, y)); s.dot((11, y))
    s.C((11, y), (11, g), 'C1\n74.1p', 'left'); s.gnd((11, g))
    s.W((11, y), (11, y+1.8), (12.2, y+1.8)); s.L((12.2, y+1.8), (17.2, y+1.8), 'L2\n235.88n', 'up'); s.W((17.2, y+1.8), (18.4, y+1.8), (18.4, y))
    s.W((11, y), (11, y-1.8), (12.2, y-1.8)); s.C((12.2, y-1.8), (17.2, y-1.8), 'C3\n10.7p', 'down'); s.W((17.2, y-1.8), (18.4, y-1.8), (18.4, y))
    s.dot((18.4, y)); s.W((18.4, y), (19.9, y)); s.dot((19.9, y)); s.C((19.9, y), (19.9, g), 'C2\n74.1p', 'left'); s.gnd((19.9, g))
    s.L((19.9, y), (24.9, y), 'L3\n178.9n', 'up'); s.W((24.9, y), (26.4, y)); s.dot((26.4, y))
    s.R((26.4, y), (26.4, g), 'RL\n50', 'right'); s.gnd((26.4, g)); s.W((26.4, y), (28, y)); s.text((28.1, y), 'out')
    return s.svg()

def diplexer():        # Fig 11.97, netlist diplexer-fig11.97
    s = Sch(); yi, yl, yh = 5.5, 9, 2
    s.VS((0, yi), (0, 0), 'Vs', 'left'); s.gnd((0, 0))
    s.R((0, yi), (3.5, yi), 'Rs\n50', 'up'); s.W((3.5, yi), (5, yi)); s.dot((5, yi))
    s.W((5, yi), (5, yl)); s.W((5, yi), (5, yh))
    # low-pass: L1 C1 L2 C2 L3 then load
    s.L((5, yl), (9.5, yl), 'L1\n2.29µ', 'up'); s.W((9.5, yl), (11, yl)); s.dot((11, yl))
    s.C((11, yl), (11, yl-2.3), 'C1\n1.06n', 'left'); s.gnd((11, yl-2.3))
    s.L((11, yl), (15.5, yl), 'L2\n2.59µ', 'up'); s.W((15.5, yl), (17, yl)); s.dot((17, yl))
    s.C((17, yl), (17, yl-2.3), 'C2\n832p', 'left'); s.gnd((17, yl-2.3))
    s.L((17, yl), (21.5, yl), 'L3\n0.955µ', 'up'); s.W((21.5, yl), (23, yl)); s.dot((23, yl))
    s.R((23, yl), (23, yl-2.3), 'Rlp\n50', 'right'); s.gnd((23, yl-2.3)); s.W((23, yl), (25, yl)); s.text((25.1, yl), 'LP out')
    # high-pass: C1 L1 C2 L2 C3 then load
    s.C((5, yh), (9.5, yh), 'C1\n372p', 'up'); s.W((9.5, yh), (11, yh)); s.dot((11, yh))
    s.L((11, yh), (11, yh-2), 'L1\n0.80µ', 'left'); s.gnd((11, yh-2))
    s.C((11, yh), (15.5, yh), 'C2\n325p', 'up'); s.W((15.5, yh), (17, yh)); s.dot((17, yh))
    s.L((17, yh), (17, yh-2), 'L2\n1.03µ', 'left'); s.gnd((17, yh-2))
    s.C((17, yh), (21.5, yh), 'C3\n893p', 'up'); s.W((21.5, yh), (23, yh)); s.dot((23, yh))
    s.R((23, yh), (23, yh-2), 'Rhp\n50', 'right'); s.gnd((23, yh-2)); s.W((23, yh), (25, yh)); s.text((25.1, yh), 'HP out')
    return s.svg()

def clipper():         # Fig 13.29, netlist speech-clipper-fig13.29
    s = Sch(); y = 6
    s.VS((0, y), (0, 2.5), 'Vin', 'left'); s.gnd((0, 2.5))
    s.dot((2, y)); s.W((0, y), (2, y)); s.R((2, y), (2, 2.5), 'Rcl\n100k', 'left'); s.gnd((2, 2.5))
    s.C((2, y), (6.5, y), 'Cin\n1µ', 'up'); s.W((6.5, y), (9, y)); s.dot((9, y))
    s.R((9, y), (9, 2.5), 'Rb2\n330k', 'left'); s.gnd((9, 2.5))
    s.R((9, y), (9, 10), 'Rb1\n330k', 'left'); s.dot((9, 10))
    s.W((9, 10), (7.4, 10)); s.dot((7.4, 10)); s.C((7.4, 10), (7.4, 8.4), 'Cdec\n100µ', 'left'); s.gnd((7.4, 8.4))
    s.R((9, 10), (13.5, 10), 'Rdec\n1k', 'up'); s.W((13.5, 10), (14.5, 10)); s.vdd((14.5, 10), '+12 V')
    P, N, O = opamp_at(s, (13, y), flip=True)
    s.W((9, y), P)
    s.W(N, (11.2, N[1])); s.dot((11.2, N[1])); s.W((11.2, N[1]), (11.2, 3.9)); s.dot((11.2, 3.9))
    s.R((11.2, 3.9), (11.2, 1.0), 'Rg\n10k', 'left'); s.C((11.2, 1.0), (11.2, -2), 'Cg\n10µ', 'left'); s.gnd((11.2, -2))
    s.W(O, (17.5, O[1])); s.dot((17.5, O[1])); s.W((17.5, O[1]), (17.5, 3.9)); s.W((17.5, 3.9), (16.5, 3.9))
    s.R((16.5, 3.9), (12.7, 3.9), 'Rf\n100k', 'up'); s.W((12.7, 3.9), (11.2, 3.9))
    oy = O[1]
    s.W((17.5, oy), (18.5, oy)); s.R((18.5, oy), (22.5, oy), 'Ro\n10k', 'up'); s.C((22.5, oy), (26.5, oy), 'Co\n10µ', 'up')
    s.W((26.5, oy), (28, oy)); s.dot((28, oy))
    # clipping diodes: two series diodes each way, plus the output pot (Rout)
    s.D((28, oy), (28, oy-2.2), 'Db1', 'left'); s.D((28, oy-2.2), (28, oy-4.4), 'Db2', 'left'); s.gnd((28, oy-4.4))
    s.W((28, oy), (31, oy)); s.dot((31, oy)); s.D((31, oy-4.4), (31, oy-2.2), 'Da1', 'right'); s.D((31, oy-2.2), (31, oy), 'Da2', 'right'); s.gnd((31, oy-4.4))
    s.W((31, oy), (34, oy)); s.dot((34, oy)); s.R((34, oy), (34, oy-4.4), 'Rout\n100k', 'right'); s.gnd((34, oy-4.4))
    s.W((34, oy), (36, oy)); s.text((36.1, oy), 'out')
    return s.svg()

def crystal_radio():   # Fig 12.2, netlist crystal-radio-fig12.2
    s = Sch(); y = 4
    s.VS((0, y), (0, 0), 'AM 天線訊號', 'left'); s.gnd((0, 0))
    s.R((0, y), (3.5, y), 'Rant\n50', 'up'); s.C((3.5, y), (7, y), 'Cant\n100p', 'up'); s.W((7, y), (8.5, y)); s.dot((8.5, y))
    s.L((8.5, y), (8.5, 0), 'Lp 18.8µ', 'left'); s.gnd((8.5, 0))
    s.L((12, y), (12, 0), 'Ls\n230µ', 'right'); s.text((9.3, 0.5), 'K = 0.5')
    s.W((12, y), (15, y)); s.dot((15, y)); s.C((15, y), (15, 0), 'Ct\n110p', 'right'); s.W((12, 0), (15, 0)); s.dot((13.5, 0)); s.gnd((13.5, 0))
    s.D((15, y), (19.5, y), 'D1\n1N34', 'up'); s.W((19.5, y), (21, y)); s.dot((21, y))
    s.R((21, y), (21, 0), 'Rl\n20k', 'left'); s.gnd((21, 0))
    s.W((21, y), (24, y)); s.dot((24, y)); s.C((24, y), (24, 0), 'Cl\n10n', 'right'); s.gnd((24, 0))
    s.W((24, y), (26, y)); s.text((26.1, y), 'audio out')
    return s.svg()

def wheatstone():      # Fig 25.6 area, netlist wheatstone-fig25.6
    s = Sch(); t, b, m = 9, 1, 5
    s.V((0, t), (0, b), 'Vb\n5 V', 'left'); s.gnd((0, b))
    s.W((0, t), (12, t)); s.dot((4, t)); s.R((4, t), (4, m), 'R1\n1k', 'left'); s.dot((4, m))
    s.R((4, m), (4, b), 'Rs\n1k', 'left'); s.W((0, b), (12, b)); s.dot((4, b))
    s.R((12, t), (12, m), 'R2\n1k', 'right'); s.dot((12, m)); s.R((12, m), (12, b), 'Rx\n待測', 'right')
    s.R((4, m), (12, m), 'Rdet\n100k', 'up')
    s.text((6.2, 3.6), '偵測 Va − Vb')
    return s.svg()

def rf_fb():           # Fig 5.51/5.52, netlist rf-feedback-amp-fig5.51
    s = Sch(); top = 11.5; fy = 7.4
    s.VS((0, 4), (0, 0), 'Vs', 'left'); s.gnd((0, 0))
    s.R((0, 4), (3.2, 4), 'Rs\n50', 'up'); s.C((3.2, 4), (6.4, 4), 'Cin\n1n', 'up'); s.W((6.4, 4), (8, 4)); s.dot((8, 4))
    s.R((8, 4), (8, 0.5), 'Rb2\n4.7k', 'left'); s.gnd((8, 0.5))
    s.R((8, 4), (8, top), 'Rb1\n22k', 'left'); s.dot((8, fy))
    Q = place(s, e.BjtNpn, 'base', (13.5, 4), 'Q1\n2N3904', 'right', ofst=.3)
    s.W((8, 4), (13.5, 4))
    C, E = A(Q, 'collector'), A(Q, 'emitter'); x = C[0]
    s.W((8, top), (x, top)); s.dot((8, top)); s.vdd((x, top+1), '+12 V'); s.W((x, top+1), (x, top)); s.dot((x, top))
    s.R((x, top), (x, fy), 'Rc\n330', 'right'); s.dot((x, fy)); s.W((x, fy), C)
    s.R((x, fy), (x-3.4, fy), 'Rf\n680', 'up'); s.C((x-3.4, fy), (8, fy), 'Cfb\n1n', 'up')
    s.dot(C); s.W(C, (x+2, C[1])); s.C((x+2, C[1]), (x+6, C[1]), 'Cout\n1n', 'up'); s.W((x+6, C[1]), (x+7.5, C[1])); s.dot((x+7.5, C[1]))
    s.R((x+7.5, C[1]), (x+7.5, 0.5), 'Rl\n50', 'right'); s.gnd((x+7.5, 0.5)); s.W((x+7.5, C[1]), (x+9.5, C[1])); s.text((x+9.6, C[1]), 'out')
    s.R(E, (E[0], 1.9), 'Re1\n10', 'right'); s.dot((E[0], 1.9)); s.R((E[0], 1.9), (E[0], 0.1), 'Re2\n100', 'right'); s.gnd((E[0], 0.1))
    s.W((E[0], 1.9), (E[0]+1.8, 1.9)); s.C((E[0]+1.8, 1.9), (E[0]+1.8, 0.1), 'Ce\n100n', 'right'); s.gnd((E[0]+1.8, 0.1))
    return s.svg()
