from schem_lib import *

def opamp_at(s, pt, flip=False, label=''):
    """Op amp with its '+' input at pt. returns (plus, minus, out)."""
    p = e.Opamp().right()
    if flip: p = p.flip()
    p = p.anchor('in2').at(pt); s.d += p
    return A(p, 'in2'), A(p, 'in1'), A(p, 'out')

def opamp_basics():    # Fig 3.61, netlist opamp-basics-fig3.61
    s = Sch()
    # non-inverting x10 (top): + on top (flipped symbol)
    P, N, O = opamp_at(s, (6, 10), flip=True)
    s.W((0, P[1]), P); s.VS((0, P[1]), (0, 7), 'Vin', 'left'); s.gnd((0, 7))
    s.W(N, (4, N[1])); s.dot((4, N[1]))
    s.R((4, N[1]), (4, 5.2), 'Rg1\n1k', 'left'); s.gnd((4, 5.2))
    s.W(O, (11.5, O[1])); s.dot((10.5, O[1]))
    s.W((10.5, O[1]), (10.5, N[1]-2.2)); s.W((10.5, N[1]-2.2), (9.1, N[1]-2.2))
    s.R((9.1, N[1]-2.2), (4, N[1]-2.2), 'Rf1\n9k', 'up'); s.W((4, N[1]-2.2), (4, N[1]))
    s.text((11.6, O[1]), 'o1'); s.text((0, 11.6), '非反相放大（增益 10）')
    # inverting x10 (bottom): - on top (normal symbol)
    P2, N2, O2 = opamp_at(s, (6, 0.2))
    s.W(P2, (4.2, P2[1])); s.gnd((4.2, P2[1]-.0)) if False else None
    s.W(P2, (4.2, P2[1]), (4.2, -1.2)); s.gnd((4.2, -1.2))
    s.R((0.5, N2[1]), (3.5, N2[1]), 'Rin2\n1k', 'up'); s.W((3.5, N2[1]), N2) if False else s.W((3.5, N2[1]), N2)
    s.VS((0.5, N2[1]), (0.5, -1.2), 'Vin', 'left') if False else None
    s.W((0.5, N2[1]), (-1.8, N2[1])); s.VS((-1.8, N2[1]), (-1.8, -1.2), 'Vin', 'left'); s.gnd((-1.8, -1.2))
    s.dot((3.5, N2[1]))
    s.W((3.5, N2[1]), (3.5, N2[1]+2.2), (5.2, N2[1]+2.2)) if False else None
    s.W(O2, (11.5, O2[1])); s.dot((10.5, O2[1]))
    s.W((10.5, O2[1]), (10.5, N2[1]+2.2), (9.1, N2[1]+2.2))
    s.R((9.1, N2[1]+2.2), (3.5, N2[1]+2.2), 'Rf2\n10k', 'up'); s.W((3.5, N2[1]+2.2), (3.5, N2[1]))
    s.text((11.6, O2[1]), 'o2'); s.text((-1.8, 4.2), '反相放大（增益 −10）')
    return s.svg()

def lm317():           # Fig 7.27, netlist lm317-fig7.27
    s = Sch()
    I = e.Ic(pins=[e.IcPin(name='IN', side='left', anchorname='IN'), e.IcPin(name='OUT', side='right', anchorname='OUT'),
                   e.IcPin(name='ADJ', side='bottom', anchorname='ADJ')], size=(4, 2.4)).right().at((6, 4)); s.d += I; s.text((7.6, 6.9), 'LM317')
    IN, OUT, ADJ = A(I, 'IN'), A(I, 'OUT'), A(I, 'ADJ')
    s.W((0, IN[1]), IN); s.V((0, IN[1]), (0, 0), 'Vin\n0→18 V', 'left'); s.gnd((0, 0))
    s.W(OUT, (13, OUT[1])); s.dot((12, OUT[1]))
    # R1 out->adj , R2 adj->gnd
    s.R((12, OUT[1]), (12, 2.4), 'R1\n240', 'right') if False else None
    s.W((12, OUT[1]), (12, ADJ[1]-.0)) if False else None
    s.W(ADJ, (ADJ[0], 1.2)); s.dot((ADJ[0], 1.2))
    s.R((ADJ[0], 1.2), (ADJ[0], -2.4), 'R2\n1.2k', 'left'); s.gnd((ADJ[0], -2.4))
    s.dot((ADJ[0], 1.2)); s.W((ADJ[0], 1.2), (12, 1.2)) if False else None
    s.R((12, OUT[1]), (12, 1.2), 'R1\n240', 'left'); s.W((12, 1.2), (ADJ[0], 1.2))
    s.C((15, OUT[1]), (15, -2.4), 'Cout\n10µ', 'right') if False else None
    s.W((13, OUT[1]), (16, OUT[1])); s.dot((16, OUT[1]))
    s.C((16, OUT[1]), (16, -2.4), 'Cout\n10µ', 'right'); s.gnd((16, -2.4))
    s.W((16, OUT[1]), (19, OUT[1])); s.dot((19, OUT[1]))
    s.R((19, OUT[1]), (19, -2.4), 'Rl\n50', 'right'); s.gnd((19, -2.4))
    s.text((6.2, 6.2), '輸出 Vout ≈ 1.25·(1+R2/R1) = 7.56 V', 'left') if False else None
    return s.svg()

def zener():           # Fig 3.20B, netlist zener-reg-fig3.20
    s = Sch()
    s.V((0, 4), (0, 0), 'Vin\n12 V', 'left'); s.gnd((0, 0))
    s.R((0, 4), (5, 4), 'Rs\n470', 'up'); s.dot((5, 4))
    s.Z((5, 0), (5, 4), 'Dz\n5.1 V', 'left') if False else s.Z((5, 0), (5, 4), 'Dz\n5.1 V', 'right')
    s.gnd((5, 0))
    s.W((5, 4), (9, 4)); s.dot((9, 4)); s.I((9, 0), (9, 4), 'Il\n5 mA', 'right'); s.gnd((9, 0))
    s.W((9, 4), (11, 4)); s.text((11.1, 4), 'out')
    return s.svg()

def doubler():         # Fig 7.10, netlist doubler-fig7.10
    s = Sch()
    s.VS((0, 4), (0, 0), 'Vac\n17 Vpk\n60 Hz', 'left'); s.gnd((0, 0))
    s.C((0, 4), (5, 4), 'C1\n2200µ', 'up'); s.dot((5, 4))
    s.D((5, 0), (5, 4), 'D1', 'left'); s.gnd((5, 0))
    s.D((5, 4), (10, 4), 'D2', 'up'); s.dot((10, 4))
    s.C((10, 4), (10, 0), 'C2\n2200µ', 'left'); s.gnd((10, 0))
    s.W((10, 4), (13.5, 4)); s.dot((13.5, 4)); s.R((13.5, 4), (13.5, 0), 'Rl\n300', 'right'); s.gnd((13.5, 0))
    s.W((13.5, 4), (15.5, 4)); s.text((15.6, 4), 'Vo ≈ 31 V')
    return s.svg()

def lpf80():           # Fig 11.95, netlist lpf-80m-fig11.95
    s = Sch(); y, g = 4, 0
    s.VS((0, y), (0, g), 'Vin', 'left'); s.gnd((0, g))
    s.R((0, y), (3.5, y), 'Rs\n50', 'up')
    s.dot((6, y)); s.W((3.5, y), (6, y)); s.C((6, y), (6, g), 'C1\n1300p', 'left'); s.gnd((6, g))
    # series L2 || C2
    s.W((6, y), (7, y), (7, y+1.8), (8.2, y+1.8)); s.L((8.2, y+1.8), (12.2, y+1.8), 'L2 1.5µ', 'up')
    s.W((12.2, y+1.8), (13.4, y+1.8), (13.4, y)); s.W((7, y), (7, y-1.8), (8.2, y-1.8)) if False else None
    s.W((7, y), (7, y-1.8), (8.2, y-1.8)); s.C((8.2, y-1.8), (12.2, y-1.8), 'C2 180p', 'down'); s.W((12.2, y-1.8), (13.4, y-1.8), (13.4, y))
    s.W((13.4, y), (14.4, y)); s.dot((7, y), (13.4, y)); s.dot((14.4, y))
    s.C((14.4, y), (14.4, g), 'C3\n2400p', 'left'); s.gnd((14.4, g))
    x = 14.4
    s.W((x, y), (x+1, y), (x+1, y+1.8), (x+2.2, y+1.8)); s.L((x+2.2, y+1.8), (x+6.2, y+1.8), 'L4 1.3µ', 'up')
    s.W((x+6.2, y+1.8), (x+7.4, y+1.8), (x+7.4, y)); s.W((x+1, y), (x+1, y-1.8), (x+2.2, y-1.8)); s.C((x+2.2, y-1.8), (x+6.2, y-1.8), 'C4 390p', 'down'); s.W((x+6.2, y-1.8), (x+7.4, y-1.8), (x+7.4, y))
    s.dot((x+1, y), (x+7.4, y)); s.W((x+7.4, y), (x+8.4, y)); s.dot((x+8.4, y))
    s.C((x+8.4, y), (x+8.4, g), 'C5\n1100p', 'left'); s.gnd((x+8.4, g))
    s.W((x+8.4, y), (x+11.4, y)); s.dot((x+11.4, y)); s.R((x+11.4, y), (x+11.4, g), 'RL\n50', 'right'); s.gnd((x+11.4, g))
    return s.svg()

def wavetrap():        # Fig 11.92, netlist wavetrap-fig11.92
    s = Sch()
    s.VS((0, 4), (0, 0), 'Vin\n（天線）', 'left'); s.gnd((0, 0))
    s.R((0, 4), (4, 4), 'Rs\n50', 'up'); s.W((4, 4), (7, 4)); s.dot((7, 4))
    s.R((7, 4), (7, 0), 'RL\n50（接收機）', 'left'); s.gnd((7, 0))
    s.W((7, 4), (11, 4)); s.dot((11, 4))
    s.L((11, 4), (11, 0.5), 'L1 200µ', 'right') if False else None
    s.L((11, 4), (11, 1), 'L1\n200µ', 'right'); s.R((11, 1), (11, -2), 'Rl1\n2.5', 'right') if False else None
    s.R((11, 1), (11, -2), 'Rl1\n2.5', 'right'); s.C((11, -2), (11, -5), 'C1\n30–300p', 'right'); s.gnd((11, -5))
    s.gnd((7, 0))
    return s.svg()

def pimatch():         # Fig 5.58 style, netlist pi-match-fig5.58
    s = Sch()
    s.VS((0, 4), (0, 0), 'Vin', 'left'); s.gnd((0, 0))
    s.R((0, 4), (4, 4), 'Rs\n50', 'up'); s.W((4, 4), (6.5, 4)); s.dot((6.5, 4))
    s.C((6.5, 4), (6.5, 0), 'C1\n809p', 'left'); s.gnd((6.5, 0))
    s.L((6.5, 4), (12, 4), 'Ls\n1.53µ', 'up'); s.dot((12, 4))
    s.C((12, 4), (12, 0), 'C2\n448p', 'left'); s.gnd((12, 0))
    s.W((12, 4), (15, 4)); s.dot((15, 4)); s.R((15, 4), (15, 0), 'RL\n200', 'right'); s.gnd((15, 0))
    return s.svg()
