import { readArticles, safeImage, textElement } from './storage';
const root = document.querySelector<HTMLElement>('#local-article')!;
const status = document.querySelector<HTMLElement>('#article-status')!;
try {
  const id = new URLSearchParams(location.search).get('id');
  const article = readArticles().find(item => item.id === id);
  if (!article) {root.querySelector('h1')!.textContent='Article not found'; status.textContent='This article may have been deleted or saved in another browser.';}
  else {document.title=article.title+' — Alex';root.querySelector('h1')!.textContent=article.title;status.textContent=new Date(article.date).toLocaleDateString('en-US');article.tags.forEach(tag=>root.querySelector('.tags')!.append(textElement('span',tag)));const src=safeImage(article.coverImage);if(src){const image=document.createElement('img');image.src=src;image.alt=article.title;image.className='article-hero';root.querySelector('.prose')!.before(image);}root.querySelector('.prose')!.textContent=article.content;}
} catch {status.textContent='Could not load this article. Browser storage may be unavailable or damaged.';}
