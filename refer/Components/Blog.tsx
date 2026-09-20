import { useState } from "react";
import { Clock, Tag, ArrowRight, Trash2 } from "lucide-react";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  coverImage?: string;
  date: string;
  readTime: number;
}

interface BlogProps {
  articles: Article[];
  onReadArticle: (article: Article) => void;
  onDeleteArticle: (id: string) => void;
  onNavigate: (page: string) => void;
}

function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string }) {
  const [didError, setDidError] = useState(false);
  const { src, alt, style, className, ...rest } = props;
  return didError ? (
    <div className={`inline-block bg-gray-100 text-center align-middle ${className ?? ""}`} style={style}>
      <div className="flex items-center justify-center w-full h-full">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==" alt="Error" data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={() => setDidError(true)} />
  );
}

export function Blog({ articles, onReadArticle, onDeleteArticle, onNavigate }: BlogProps) {
  const [activeTag, setActiveTag] = useState<string>("All");

  const allTags = ["All", ...Array.from(new Set(articles.flatMap((a) => a.tags)))];

  const filtered =
    activeTag === "All" ? articles : articles.filter((a) => a.tags.includes(activeTag));

  return (
    <section className="min-h-screen bg-gray-50 pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-indigo-500 uppercase tracking-widest mb-2" style={{ fontSize: 12, fontWeight: 600 }}>
            Blog
          </p>
          <h2 className="text-gray-900 mb-4" style={{ fontSize: 40, fontWeight: 800 }}>
            Articles & Thoughts
          </h2>
          <p className="text-gray-500 max-w-lg" style={{ fontSize: 16 }}>
            I write about creativity, design process, travel, and the stories behind my work.
          </p>
        </div>

        {/* Tags */}
        {allTags.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                  activeTag === tag
                    ? "bg-indigo-600 text-white"
                    : "bg-white border border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600"
                }`}
                style={{ fontWeight: activeTag === tag ? 600 : 400 }}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Articles */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">✍️</div>
            <p className="text-gray-400 mb-6" style={{ fontSize: 18 }}>No articles yet. Start writing!</p>
            <button
              onClick={() => onNavigate("editor")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition-colors"
              style={{ fontWeight: 600 }}
            >
              Write Your First Article
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {/* Featured first article */}
            {filtered[0] && (
              <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                {filtered[0].coverImage && (
                  <div className="h-64 overflow-hidden">
                    <ImageWithFallback
                      src={filtered[0].coverImage}
                      alt={filtered[0].title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-8">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    {filtered[0].tags.map((tag) => (
                      <span key={tag} className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs" style={{ fontWeight: 600 }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3
                    className="text-gray-900 mb-3 cursor-pointer hover:text-indigo-600 transition-colors"
                    style={{ fontSize: 26, fontWeight: 800 }}
                    onClick={() => onReadArticle(filtered[0])}
                  >
                    {filtered[0].title}
                  </h3>
                  <p className="text-gray-500 mb-4" style={{ fontSize: 15, lineHeight: 1.7 }}>
                    {filtered[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-gray-400 text-sm">
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {filtered[0].readTime} min read
                      </span>
                      <span>{filtered[0].date}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onReadArticle(filtered[0])}
                        className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 text-sm transition-colors"
                        style={{ fontWeight: 600 }}
                      >
                        Read <ArrowRight size={14} />
                      </button>
                      <button
                        onClick={() => onDeleteArticle(filtered[0].id)}
                        className="text-red-400 hover:text-red-600 p-1 transition-colors ml-2"
                        title="Delete article"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Rest of articles */}
            <div className="grid md:grid-cols-2 gap-6">
              {filtered.slice(1).map((article) => (
                <div
                  key={article.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                >
                  {article.coverImage && (
                    <div className="h-44 overflow-hidden">
                      <ImageWithFallback
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {article.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="bg-indigo-50 text-indigo-600 px-2.5 py-0.5 rounded-full text-xs" style={{ fontWeight: 600 }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3
                      className="text-gray-900 mb-2 cursor-pointer hover:text-indigo-600 transition-colors"
                      style={{ fontSize: 18, fontWeight: 700 }}
                      onClick={() => onReadArticle(article)}
                    >
                      {article.title}
                    </h3>
                    <p className="text-gray-500 mb-4 line-clamp-2" style={{ fontSize: 14, lineHeight: 1.6 }}>
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-gray-400 text-xs">
                        <span className="flex items-center gap-1"><Clock size={12} />{article.readTime} min</span>
                        <span>{article.date}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() => onReadArticle(article)}
                          className="text-indigo-600 hover:text-indigo-800 text-xs transition-colors flex items-center gap-1"
                          style={{ fontWeight: 600 }}
                        >
                          Read <ArrowRight size={12} />
                        </button>
                        <button
                          onClick={() => onDeleteArticle(article.id)}
                          className="text-red-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
