import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, 'output');
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

const pages = [
  { id: 'xhs-01', name: '01-cover',          w: 1080, h: 1440 },
  { id: 'xhs-02', name: '02-kpi-code',       w: 1080, h: 1440 },
  { id: 'xhs-03', name: '03-timeline',        w: 1080, h: 1440 },
  { id: 'xhs-04', name: '04-judgment',        w: 1080, h: 1440 },
  { id: 'xhs-05', name: '05-warning',         w: 1080, h: 1440 },
  { id: 'xhs-06', name: '06-conclusion',      w: 1080, h: 1440 },
  { id: 'wechat-21x9', name: '07-wechat-wide', w: 2100, h: 900 },
  { id: 'wechat-1x1', name: '08-wechat-square', w: 1080, h: 1080 },
];

const page = await browser.newPage({ viewport: { width: 2560, height: 1600 } });
await page.goto(`file:///${__dirname.replace(/\\/g, '/')}/index.html`, { waitUntil: 'networkidle', timeout: 60000 });

for (const p of pages) {
  const el = await page.locator(`#${p.id}`);
  await el.screenshot({ path: join(outDir, `${p.name}.png`), type: 'png' });
  console.log(`✓ ${p.name}.png  ${p.w}×${p.h}`);
}

await browser.close();
console.log('\nDone — all pages rendered.');
