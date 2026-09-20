import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Portfolio } from "./components/Portfolio";
import { Blog } from "./components/Blog";
import type { Article } from "./components/Blog";
import { ArticleEditor } from "./components/ArticleEditor";
import { ArticleDetail } from "./components/ArticleDetail";
import { About } from "./components/About";

type Page = "home" | "portfolio" | "blog" | "editor" | "article" | "about";

const SAMPLE_ARTICLES: Article[] = [
  {
    id: "sample-1",
    title: "Finding Light in the Ordinary",
    excerpt: "Photography isn't about capturing what's extraordinary — it's about revealing the extraordinary hidden inside the ordinary. Here's what I've learned after six years behind the lens.",
    content: `Photography isn't about capturing what's extraordinary — it's about revealing the extraordinary hidden inside the ordinary.

I remember the first time I realized this. I was walking home from the train station after a long day, tired and not thinking about anything in particular, when the late afternoon light hit the surface of a puddle on the sidewalk and reflected the entire city skyline in miniature.

I almost walked past it. But I stopped.

That photograph, taken on a phone in five seconds, became one of my most-liked images. Not because of technical skill. Not because of expensive equipment. Because I paused when something ordinary transformed into something worth seeing.

After six years of photography, I've come to believe that the most important skill isn't understanding f-stops or focal lengths — it's learning how to pay attention.

We move through the world at speed. We're trained to filter out the familiar. But the photographer's job is to unlearn that filtering, to look at a shadow, a reflection, a face, a texture, and ask: what is this, really?

Light is the medium. Attention is the practice. Curiosity is the engine.

Next time you're walking somewhere familiar, try this: slow down by 30%. Look at the light. Look at the edges of things. Look at where two surfaces meet. Give yourself permission to be interested in something small.

The extraordinary is already there. You just have to stop long enough to find it.`,
    tags: ["Photography", "Creativity"],
    coverImage: "https://images.unsplash.com/photo-1623577284502-d65cdc6ba0b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    date: "September 15, 2026",
    readTime: 3,
  },
  {
    id: "sample-2",
    title: "The Design Process I Actually Use",
    excerpt: "Every designer has a different process. After years of client work and personal projects, here's the honest, unglamorous version of how I approach design problems.",
    content: `Every designer has a different process. After years of client work and personal projects, here's the honest, unglamorous version of how I approach design problems.

Step 1 is almost always: sit with discomfort. 

Good design doesn't start with ideas — it starts with questions. What problem are we actually solving? Who is this for? What does success look like? What are we willing to sacrifice to get there?

I write these down. Not in a fancy notebook. Usually in a text file with no formatting. The act of writing forces clarity.

Step 2 is research, which for me means looking at things that have nothing to do with the project. If I'm designing a restaurant identity, I'll spend time looking at architecture photography, vintage textiles, botanical illustrations. The goal isn't to copy — it's to expand the vocabulary of possible solutions.

Step 3 is drawing by hand. I know digital tools are faster. But my hand is connected to my brain in a different way than a trackpad. Sketching lets me think without committing.

Step 4 is the messy middle: dozens of directions, most of them wrong, a few of them interesting. This is where most people want to quit. This is actually where the work is.

Step 5 is editing ruthlessly. Not everything that works can stay. The best solution is usually the simplest one you were afraid to try.

Design is mostly the process of failing your way toward something good. Anyone who shows you only the final polished result is hiding the real story.`,
    tags: ["Design", "Process"],
    coverImage: "https://images.unsplash.com/photo-1554793000-245d3a3c2a51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    date: "August 28, 2026",
    readTime: 4,
  },
];

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [articles, setArticles] = useState<Article[]>(SAMPLE_ARTICLES);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  function navigate(p: string) {
    setPage(p as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleReadArticle(article: Article) {
    setActiveArticle(article);
    setPage("article");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handlePublish(article: Article) {
    setArticles((prev) => [article, ...prev]);
  }

  function handleDeleteArticle(id: string) {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        currentPage={page}
        onNavigate={navigate}
      />

      {page === "home" && <Hero onNavigate={navigate} />}
      {page === "portfolio" && <Portfolio />}
      {page === "blog" && (
        <Blog
          articles={articles}
          onReadArticle={handleReadArticle}
          onDeleteArticle={handleDeleteArticle}
          onNavigate={navigate}
        />
      )}
      {page === "editor" && (
        <ArticleEditor
          onPublish={(article) => {
            handlePublish(article);
            navigate("blog");
          }}
          onBack={() => navigate("blog")}
        />
      )}
      {page === "article" && activeArticle && (
        <ArticleDetail
          article={activeArticle}
          onBack={() => navigate("blog")}
        />
      )}
      {page === "about" && <About onNavigate={navigate} />}
    </div>
  );
}
