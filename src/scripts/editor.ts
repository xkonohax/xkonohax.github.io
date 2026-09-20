import { readArticles, saveArticles, safeImage, type LocalArticle } from './storage';
const form = document.querySelector<HTMLFormElement>('#editor-form')!;
const status = document.querySelector<HTMLElement>('#editor-status')!;
const DRAFT_KEY = 'konoha.draft.v1';
function values() { const data = new FormData(form); return Object.fromEntries(['title','excerpt','tags','coverImage','content'].map(key => [key, String(data.get(key) || '').trim()])); }
function article(): LocalArticle | null {
  if (!form.reportValidity()) return null;
  const data = values();
  if (!data.title || !data.excerpt || !data.content) { status.textContent = 'Please enter a title, excerpt, and story.'; return null; }
  if (data.coverImage && !safeImage(data.coverImage)) { status.textContent = 'Use an HTTP or HTTPS image URL.'; return null; }
  return { ...data, id: crypto.randomUUID(), tags: [...new Set(data.tags.split(',').map(tag => tag.trim()).filter(Boolean))], date: new Date().toISOString() } as LocalArticle;
}
try {const draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null'); if(draft && typeof draft === 'object') for(const key of ['title','excerpt','tags','coverImage','content']) {const input=form.elements.namedItem(key) as HTMLInputElement; if(typeof draft[key] === 'string') input.value=draft[key];}} catch {status.textContent='Draft storage is unavailable. You can still export Markdown.';}
form.addEventListener('input', () => {try {localStorage.setItem(DRAFT_KEY, JSON.stringify(values())); status.textContent='Draft saved on this device.';} catch {status.textContent='Draft could not be saved. Export Markdown to keep your writing.';}});
form.addEventListener('submit', event => {event.preventDefault();const item=article();if(!item)return;try {saveArticles([item,...readArticles()]);}catch {status.textContent='Could not save the article. Export Markdown to keep your writing.';return;}try {localStorage.removeItem(DRAFT_KEY);}catch {}window.location.assign('/blog/');});
document.querySelector('#preview-button')!.addEventListener('click', () => {const data=values();const preview=document.querySelector<HTMLElement>('#editor-preview')!;preview.hidden=false;preview.querySelector('h2')!.textContent=data.title||'Untitled';preview.querySelector('p')!.textContent=data.content||'Your story will appear here.';});
document.querySelector('#export-button')!.addEventListener('click', () => {const item=article();if(!item)return;const markdown=['---',`title: ${JSON.stringify(item.title)}`,`description: ${JSON.stringify(item.excerpt)}`,`pubDate: ${JSON.stringify(item.date)}`,`tags: ${JSON.stringify(item.tags)}`,...(item.coverImage?[`coverImage: ${JSON.stringify(item.coverImage)}`]:[]),'---','',item.content,''].join('\n');const url=URL.createObjectURL(new Blob([markdown],{type:'text/markdown;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download=(item.title.replace(/[^\p{L}\p{N}-]+/gu,'-').slice(0,70)||'article')+'.md';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='Markdown exported. Add the file to src/content/blog/ and rebuild to publish.';});
