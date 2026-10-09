import pathlib
root = pathlib.Path(__file__).resolve().parent.parent
def combined(folder):
    """circuit.cir + tb.cir as one flat deck (the .include line is replaced by the circuit text)."""
    d = root/'spice'/folder
    circ = (d/'circuit.cir').read_text()
    tb = (d/'tb.cir').read_text().splitlines()
    out = [tb[0]]
    for ln in tb[1:]:
        out.append(circ.rstrip() if ln.strip().lower().startswith('.include') else ln)
    return '\n'.join(out) + '\n'
