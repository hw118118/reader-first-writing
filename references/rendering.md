# Render a figure for its document

The writing skill chooses whether a figure helps, its reader question, the section where it belongs, and its caption. Use this module to produce the artwork. If the user names a drawing skill, application or output format, pass it the same reader question, verified inputs, required labels and exceptions, language, available width and target format. Keep the returned image in the agreed section and check it there. If the requested tool is unavailable, explain the constraint before substituting a tool the user required.

**Default.** Use editable Vega-Lite for quantitative views, DOT for directed code paths and dependencies. Start with the [rate chart](../assets/figures/attendance.vl.json) or [code flow](../assets/figures/check-in.dot) when applicable. Run the CLI below from the installed skill directory. Node 22.12+ and a one-time dependency install are required for this backend. Author local inputs with inline values, fonts available to the reader and no remote image dependencies. Keep the input and finished SVG together. For unsupported formats, use a capable local tool to export the required PNG/PDF, then inspect the export. If packages or a shell are unavailable, the built-in workflow can still draw a simple figure as local SVG or semantic HTML/CSS with direct labels. A client that cannot create or preview an image should identify the delivered format accurately.

```sh
(cd scripts/figures && npm ci --ignore-scripts)
node scripts/figures/render.mjs assets/figures/attendance.vl.json attendance.svg
node scripts/figures/render.mjs assets/figures/check-in.dot check-in.svg
```

**Choose the drawing grammar from the document.** A management brief about attendance needs a shared scale, denominators and a modest claim beside the chart. A code walkthrough about one branch needs the actual entry function, the tested condition, and visible results. A detailed design about multiple workers often needs ordered messages, transaction boundaries and what happens when a reply is lost. For that case use a sequence diagram (local SVG or a user-selected renderer such as Mermaid). A dependency graph answers who uses whom; its edges alone establish no timing. Keep code symbols verbatim and distinguish implemented, proposed and unknown behavior. Source comments and debug logs are evidence only for what they actually say. Trace one ordinary and one exceptional path in the source before drawing. Place a long subflow beside its failure handling when that is where the reader needs it.

**Style for the page.** Match the surrounding typography and alignment. Use a quiet base palette, with emphasis only for a meaningful comparison or hazard. For dense branches use direct labels, spacing, and a focused subfigure before shrinking text. Let the surrounding document supply the figure title and text alternative. Check that the embedded result and the nearby prose agree even when someone reads just one of them.

The module uses [Vega-Lite encodings](https://vega.github.io/vega-lite/docs/encoding.html) and [Graphviz layered layouts](https://graphviz.org/docs/layouts/dot/) via [Viz.js](https://viz-js.com/api/). [Mermaid sequence diagrams](https://mermaid.js.org/syntax/sequenceDiagram.html) are a useful alternative when participants and messages matter more than call structure.
