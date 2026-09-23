const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http'),path=require('node:path');
const source=require('../js/idea-source.js');
assert.equal(source.parse('Maker/new.md','# 新點子\n\n## 點子\n新摘要').summary,'新摘要');
assert.equal(source.parse('AI/new.md','# New AI\n\nOffline AI computer').theme,'ai');
assert(!source.eligible('README.md'));assert(!source.eligible('.git/info.md'));assert(source.eligible('Art/new.md'));
const root=path.resolve(__dirname,'..');
(async()=>{const server=http.createServer((req,res)=>{try{const p=path.join(root,decodeURIComponent(req.url.split('?')[0]));res.setHeader('Content-Type',p.endsWith('.js')?'text/javascript':p.endsWith('.css')?'text/css':'text/html');res.end(fs.readFileSync(p));}catch{res.statusCode=404;res.end();}});await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:process.env.BROWSER_CHANNEL||'msedge'});try{
const page=await browser.newPage({viewport:{width:1100,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.route('https://api.github.com/**',r=>r.abort());await page.goto('http://127.0.0.1:'+server.address().port+'/ideas.html');await page.waitForFunction(()=>document.querySelector('#source-status').textContent.includes('暫時'));
assert.equal(await page.locator('#iso-select option').count(),13);assert(await page.locator('.idea-card').isHidden());
for(let i=0;i<13;i++){await page.selectOption('#iso-select',String(i));assert(await page.locator('#idea-title').innerText());assert.equal(await page.locator('#idea-source a').count(),1);}
await page.click('#iso-all');await page.locator('canvas').hover({position:{x:430,y:250}});await page.mouse.wheel(0,-200);await page.waitForTimeout(100);assert(parseInt(await page.locator('#iso-zoom').innerText())>100);
await page.selectOption('#iso-select','2');await page.click('#idea-expand');assert(await page.locator('#idea-extra').isVisible());await page.click('#idea-close');assert(await page.locator('.idea-card').isHidden());
await page.setViewportSize({width:390,height:844});await page.selectOption('#iso-select','11');assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
const rects=await page.evaluate(()=>{const a=document.querySelector('.idea-card').getBoundingClientRect(),b=document.querySelector('.iso-scene').getBoundingClientRect();return a.bottom<=b.bottom&&a.top>=b.top;});assert(rects);
await page.unroute('https://api.github.com/**');await page.route('https://api.github.com/**',r=>r.fulfill({json:r.request().url().includes('/commits/')?{sha:'test12345'}:{tree:[{type:'blob',path:'Art/new.md'}]}}));await page.route('https://raw.githubusercontent.com/**',r=>r.fulfill({body:'# 新的創作\n\n這是一個新點子。'}));await page.reload();await page.waitForFunction(()=>document.querySelector('#source-status').textContent.includes('已同步'));
assert.equal(await page.locator('#iso-select option').count(),1);await page.selectOption('#iso-select','0');assert.equal(await page.locator('#idea-title').innerText(),'新的創作');assert.match(await page.locator('#iso-features').innerText(),/基本建築/);assert.equal(await page.locator('#iso-count').innerText(),'1');assert.deepEqual(errors,[]);console.log('PASS: extraction, offline snapshot, live add/remove, generic building, all 13 cards, wheel zoom and mobile overlay.');
}finally{await browser.close();await new Promise(r=>server.close(r));}})().catch(e=>{console.error(e);process.exitCode=1;});
