export interface LocalArticle { id: string; title: string; excerpt: string; content: string; tags: string[]; coverImage: string; date: string; }
export const STORAGE_KEY = 'konoha.local-articles.v1';
export function safeImage(value: string) { try { const url = new URL(value); return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : ''; } catch { return ''; } }
export function readArticles(): LocalArticle[] {
  const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  if (!Array.isArray(value) || !value.every(a => a && ['id','title','excerpt','content','coverImage','date'].every(k => typeof a[k] === 'string') && Array.isArray(a.tags) && a.tags.every((tag: unknown) => typeof tag === 'string'))) throw new Error('Invalid saved articles');
  return value;
}
export function saveArticles(articles: LocalArticle[]) {localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));}
export function textElement<K extends keyof HTMLElementTagNameMap>(tag: K, text: string, className = '') { const element = document.createElement(tag); element.textContent = text; element.className = className; return element; }
