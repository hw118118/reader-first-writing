import {readFile, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {parse, View} from 'vega';
import {compile} from 'vega-lite';
import {instance} from '@viz-js/viz';

async function render(input, output) {
  if (!input || !output?.endsWith('.svg') || resolve(input) === resolve(output)) {
    throw new Error('Usage: node render.mjs <chart.vl.json | flow.dot> <figure.svg>');
  }
  const source = await readFile(input, 'utf8');
  let svg;
  if (input.endsWith('.vl.json')) {
    const spec = compile(JSON.parse(source), {config: {
      font: 'sans-serif', background: 'white', view: {stroke: null},
      axis: {labelFontSize: 13, titleFontSize: 14, domain: false, tickColor: '#cad3d1', gridColor: '#e4eae9'},
      range: {category: ['#266b62', '#355b82', '#916327', '#82586e']}
    }}).spec;
    // Figure sources travel with the document. Reject unresolved data references.
    const view = new View(parse(spec), {renderer: 'none'});
    view.loader().load = async uri => { throw new Error('Use inline data instead of ' + uri); };
    // Vega can log a loader failure and render an empty view, so check the compiled data first.
    function checkData(node) {
      if (!node || typeof node !== 'object') return;
      if (Array.isArray(node.data) && node.data.some(d => d && Object.hasOwn(d, 'url'))) {
        throw new Error('Inline the source values before rendering');
      }
      Object.values(node).forEach(checkData);
    }
    try {
      checkData(spec);
      svg = await view.toSVG();
    } finally { view.finalize(); }
  } else if (input.endsWith('.dot')) {
    const viz = await instance();
    svg = viz.renderString(source, {format: 'svg', engine: 'dot', graphAttributes: {
      bgcolor: 'white', pad: '0.12', nodesep: '0.25', ranksep: '0.35'
    }, nodeAttributes: {shape: 'box', fontname: 'sans-serif', fontsize: '14', color: '#96aca7',
      fontcolor: '#1d3833', margin: '0.14,0.08'}, edgeAttributes: {
      fontname: 'sans-serif', fontsize: '13', fontcolor: '#314e48', color: '#58736c', arrowsize: '0.7'
    }});
  } else { throw new Error('Supported inputs end in .vl.json or .dot'); }
  await writeFile(output, svg);
}
render(...process.argv.slice(2)).catch(error => { console.error(error.message); process.exitCode = 1; });
