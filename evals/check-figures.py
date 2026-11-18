"""After installing the renderer dependencies, run python3 evals/check-figures.py."""
from pathlib import Path
import json
import subprocess
import tempfile
import xml.etree.ElementTree as ET
import runpy

root = Path(__file__).resolve().parents[1]
assets = root / 'assets/figures'
cli = root / 'scripts/figures/render.mjs'
ns = {'s': 'http://www.w3.org/2000/svg'}


def draw(source, output):
    subprocess.run(['node', cli, source, output], check=True)
    return ET.parse(output).getroot()


with tempfile.TemporaryDirectory() as directory:
    tmp = Path(directory)
    chart = json.loads((assets / 'attendance.vl.json').read_text())
    chart['data']['values'][0]['attended'] = 3
    chart['data']['values'][0]['registered'] = 4
    source = tmp / 'trial.vl.json'
    source.write_text(json.dumps(chart))
    plot = draw(source, tmp / 'chart.svg')
    labels = [item.get('aria-label', '') for item in plot.iter()]
    assert any('75%' in label and '3 of 4' in label for label in labels)
    assert any('40%' in label and '16 of 40' in label for label in labels)

    graph = draw(assets / 'check-in.dot', tmp / 'flow.svg')
    edges = {edge.find('s:title', ns).text for edge in graph.findall(".//s:g[@class='edge']", ns)}
    assert edges == {'check->used', 'check->fresh', 'fresh->admit', 'fresh->wait'}
    check = runpy.run_path(str(root / 'evals/figures/check_in.py'))['check_in']
    def unexpected_write(_):
        raise AssertionError('duplicate ticket was saved')
    assert check(37, lambda _: True, unexpected_write) == 'supervisor'
    assert check(37, lambda _: False, lambda _: 'confirmed') == 'admit'
    assert check(37, lambda _: False, lambda _: None) == 'keep ID; check status'

    source.write_text(json.dumps(dict(chart, data={'url': 'missing.csv'})))
    old = (tmp / 'chart.svg').read_bytes()
    bad = subprocess.run(['node', cli, source, tmp / 'chart.svg'], capture_output=True)
    assert bad.returncode and (tmp / 'chart.svg').read_bytes() == old
print('Figure checks passed: changed rate and denominator, code branches, failed render.')
