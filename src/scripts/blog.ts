import { readArticles, saveArticles, safeImage, textElement } from './storage';
const filters = document.querySelector<HTMLElement>('#blog-filters')!;
const published = [...document.querySelectorAll<HTMLElement>('#article-grid .article-card')];
const local = document.querySelector<HTMLElement>('#local-articles')!;
let activeTag = 'All';
function filter() {
  const cards = [...published, ...(local?.querySelectorAll<HTMLElement>('.article-card') ?? [])];
  let count = 0;
  cards.forEach(card => { card.hidden = activeTag !== 'All' && !JSON.parse(card.dataset.tags!).includes(activeTag); card.classList.remove('featured'); if (!card.hidden) count++; });
  published.find(card => !card.hidden)?.classList.add('featured');
  filters.querySelectorAll<HTMLElement>('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.tag === activeTag)));
  document.querySelector<HTMLElement>('#blog-empty')!.hidden = count !== 0;
  document.querySelector('#article-count')!.textContent = `${count} articles`;
}
function renderLocal() {
  try {
    const articles = readArticles();
    local.replaceChildren();
    document.querySelector<HTMLElement>('#local-section')!.hidden = articles.length === 0;
    const tags = new Set(published.flatMap(card => JSON.parse(card.dataset.tags!) as string[]));
    articles.forEach(article => {
      article.tags.forEach(tag => tags.add(tag));
      const card = textElement('article', '', 'article-card'); card.dataset.tags = JSON.stringify(article.tags);
      const href = `/article/?id=${encodeURIComponent(article.id)}`;
      const src = safeImage(article.coverImage);
      if (src) { const cover = textElement('a', '', 'card-cover'); cover.href = href; const image = document.createElement('img'); image.src = src; image.alt = article.title; image.loading = 'lazy'; cover.append(image); card.append(cover); }
      const body = textElement('div', '', 'card-body'); const tagsEl = textElement('div', '', 'tags'); article.tags.forEach(tag => tagsEl.append(textElement('span', tag))); body.append(tagsEl);
      const title = textElement('h2', ''); const link = textElement('a', article.title); link.href = href; title.append(link); body.append(title, textElement('p', article.excerpt));
      const meta = textElement('div', '', 'card-meta'); const read = textElement('a', 'Read →'); read.href = href;
      const remove = textElement('button', 'Delete', 'danger'); remove.type = 'button'; remove.setAttribute('aria-label', `Delete local article: ${article.title}`);
      remove.addEventListener('click', () => {if (!confirm(`Delete “${article.title}” from this browser?`)) return; try {saveArticles(readArticles().filter(a => a.id !== article.id)); renderLocal();} catch {document.querySelector('#storage-status')!.textContent = 'Could not delete the article. Browser storage is unavailable.';}});
      meta.append(textElement('span', 'Local · ' + new Date(article.date).toLocaleDateString('en-US')), read, remove); body.append(meta); card.append(body); local.append(card);
    });
    if (activeTag !== 'All' && !tags.has(activeTag)) activeTag = 'All';
    filters.replaceChildren(...['All', ...tags].map(tag => {const button = textElement('button', tag); button.dataset.tag = tag; return button;}));
  } catch { document.querySelector('#storage-status')!.textContent = 'Local articles could not be loaded. Browser storage may be unavailable or damaged. Published articles are still available.'; }
  filter();
}
filters.addEventListener('click', event => {const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button[data-tag]'); if(button){activeTag = button.dataset.tag!; filter();}});
if (import.meta.env.DEV) {
  window.addEventListener('storage', renderLocal);
  renderLocal();
} else {
  filter();
}
