import { chromium } from 'file:///C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
try {
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:4321/admin/');await page.getByRole('button',{name:'登录',exact:true}).click();
 await page.getByRole('link',{name:'作品',exact:true}).click();await page.getByText('Works 作品展示',{exact:true}).click();
 await page.getByRole('button',{name:'新增作品',exact:true}).click();await page.getByLabel('作品名称',{exact:true}).last().fill('QA video upload');
 const type=page.getByLabel('媒体类型',{exact:true}).last();await type.fill('视频');await type.press('Enter');
 const category=page.getByLabel('分类',{exact:true}).last();await category.fill('视频');await category.press('Enter');
 await page.getByRole('button',{name:'选择图片',exact:true}).click();
 await page.locator('input[type=file]').setInputFiles({name:'works-qa.png',mimeType:'image/png',buffer:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jFioAAAAASUVORK5CYII=','base64')});
 await page.getByRole('button',{name:'选用已选中项目',exact:true}).click();
 const bytes=await page.evaluate(async()=>{const canvas=document.createElement('canvas');canvas.width=160;canvas.height=90;const ctx=canvas.getContext('2d');const stream=canvas.captureStream(10);const recorder=new MediaRecorder(stream,{mimeType:'video/webm'});const chunks=[];recorder.ondataavailable=e=>chunks.push(e.data);const done=new Promise(resolve=>recorder.onstop=async()=>resolve(Array.from(new Uint8Array(await new Blob(chunks).arrayBuffer()))));recorder.start();ctx.fillStyle='indigo';ctx.fillRect(0,0,160,90);await new Promise(r=>setTimeout(r,400));recorder.stop();stream.getTracks().forEach(t=>t.stop());return await done;});
 await page.getByRole('button',{name:'选择文件',exact:true}).click();
 await page.locator('input[type=file]').setInputFiles({name:'works-qa.webm',mimeType:'video/webm',buffer:Buffer.from(bytes)});
 await page.getByRole('button',{name:'选用已选中项目',exact:true}).click();
 await page.getByRole('button',{name:'发布',exact:true}).click();await page.getByText('立即发布',{exact:true}).click();
 await page.getByText('内容已保存',{exact:true}).waitFor({timeout:10000}).catch(async error=>{console.log(await page.locator('body').innerText());throw error;});
 const saved=JSON.parse(fs.readFileSync('src/data/works.json','utf8')).works.at(-1);assert.equal(saved.type,'video');assert.equal(saved.videoUrl,'/uploads/works-qa.webm');assert.equal(saved.src,'/uploads/works-qa.png');
 await page.goto('http://localhost:4321/portfolio/');await page.getByRole('button',{name:'Video',exact:true}).click();await page.getByRole('button',{name:'View QA video upload',exact:true}).click();await page.waitForFunction(()=>document.querySelector('dialog video')?.readyState>=2);assert.ok(await page.locator('dialog video').evaluate(v=>v.videoWidth>0));await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.querySelector('dialog video'));assert.equal(await page.locator('dialog video').count(),0);
 await page.getByRole('button',{name:'All',exact:true}).click();await page.getByRole('button',{name:'View Urban Pulse',exact:true}).click();assert.equal(await page.locator('dialog img').count(),1);await page.keyboard.press('Escape');
 await page.setViewportSize({width:390,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.deepEqual(errors,[]);
 console.log('PASS: Decap image and actual WebM upload; JSON persistence; category filter; video decodes; image dialog; Escape cleanup; mobile layout.');
} finally { await browser.close(); }
