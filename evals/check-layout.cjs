// Optional maintainer test. Loads Playwright from the environment running the test.
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const {join} = require('node:path');
const {pathToFileURL} = require('node:url');
const assert = require('node:assert/strict');

async function run() {
  const browser = await chromium.launch({executablePath: process.env.CHROME_PATH || undefined});
  try {
    for (const width of [360, 900]) {
      for (const file of ['intake.html', ...['attendance', 'handover'].flatMap(
        topic => ['previous', 'current'].map(rev => 'samples/' + topic + '-' + rev + '.html'))]) {
        const page = await browser.newPage({viewport: {width, height: 800}, offline: true});
        const requests = [];
        page.on('request', req => { if (/^https?:/.test(req.url())) requests.push(req.url()); });
        await page.goto(pathToFileURL(join(__dirname, file)).href);
        const box = await page.evaluate(async () => {
          await document.fonts.ready;
          const figure = document.querySelector('figure, svg');
          return {width: document.documentElement.scrollWidth, figureWidth: figure?.getBoundingClientRect().width};
        });
        assert.deepEqual(requests, [], file + ' depends on the network');
        assert.ok(box.figureWidth > 0, file + ' has no visible figure');
        if (file === 'intake.html' && width === 360) assert.ok(box.width > width, 'broken input no longer exercises overflow');
        if (file !== 'intake.html') assert.ok(box.width <= width, file + ' overflows the page');
        console.log(width, file, box.width);
        await page.close();
      }
    }
  } finally { await browser.close(); }
}
run().catch(error => {console.error(error); process.exitCode = 1;});
