import { useState } from "react";
import { Play, X, ZoomIn } from "lucide-react";

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

type WorkType = "image" | "video";
type Category = "All" | "Photography" | "Design" | "Video";

interface Work {
  id: string;
  type: WorkType;
  title: string;
  category: string;
  src: string;
  videoUrl?: string;
  span?: "wide" | "tall" | "normal";
}

const WORKS: Work[] = [
  {
    id: "w1",
    type: "image",
    title: "Urban Pulse",
    category: "Photography",
    src: "https://images.unsplash.com/photo-1543872084-c7bd3822856f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    span: "wide",
  },
  {
    id: "w2",
    type: "image",
    title: "Mountain Silence",
    category: "Photography",
    src: "https://images.unsplash.com/photo-1576068036336-328de1be1f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    span: "tall",
  },
  {
    id: "w3",
    type: "image",
    title: "Studio Light",
    category: "Design",
    src: "https://images.unsplash.com/photo-1738676524296-364cf18900a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    span: "normal",
  },
  {
    id: "w4",
    type: "image",
    title: "Digital Dreams",
    category: "Design",
    src: "https://images.unsplash.com/photo-1663275162414-64dba99065a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    span: "normal",
  },
  {
    id: "w5",
    type: "video",
    title: "Coastal Meditation",
    category: "Video",
    src: "https://images.unsplash.com/photo-1647962431451-d0fdaf1cf21c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    span: "wide",
  },
  {
    id: "w6",
    type: "image",
    title: "Lines & Form",
    category: "Design",
    src: "https://images.unsplash.com/photo-1554793000-245d3a3c2a51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    span: "normal",
  },
  {
    id: "w7",
    type: "image",
    title: "Creative Process",
    category: "Photography",
    src: "https://images.unsplash.com/photo-1623577284502-d65cdc6ba0b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    span: "normal",
  },
  {
    id: "w8",
    type: "image",
    title: "Flavors",
    category: "Photography",
    src: "https://images.unsplash.com/photo-1676471926534-d5c9771909fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    span: "normal",
  },
];

const CATEGORIES: Category[] = ["All", "Photography", "Design", "Video"];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<Work | null>(null);

  const filtered = WORKS.filter(
    (w) => activeCategory === "All" || w.category === activeCategory
  );

  return (
    <section className="min-h-screen bg-white pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-indigo-500 uppercase tracking-widest mb-2" style={{ fontSize: 12, fontWeight: 600 }}>
            Portfolio
          </p>
          <h2 className="text-gray-900 mb-4" style={{ fontSize: 40, fontWeight: 800 }}>
            My Works
          </h2>
          <p className="text-gray-500 max-w-lg" style={{ fontSize: 16 }}>
            A collection of photography, design, and video projects I'm proud of.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm transition-all ${
                activeCategory === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              style={{ fontWeight: activeCategory === cat ? 600 : 400 }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[240px]">
          {filtered.map((work) => (
            <div
              key={work.id}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group bg-gray-100 ${
                work.span === "wide" ? "col-span-2" : work.span === "tall" ? "row-span-2" : ""
              }`}
              onClick={() => setLightbox(work)}
            >
              <ImageWithFallback
                src={work.src}
                alt={work.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <p className="text-white/70 text-xs mb-1" style={{ fontWeight: 500 }}>
                  {work.category}
                </p>
                <p className="text-white" style={{ fontWeight: 700, fontSize: 16 }}>
                  {work.title}
                </p>
              </div>
              {/* Type badge */}
              {work.type === "video" && (
                <div className="absolute top-3 left-3 bg-black/60 text-white rounded-full p-2">
                  <Play size={14} fill="white" />
                </div>
              )}
              <div className="absolute top-3 right-3 bg-black/40 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 text-white/70 hover:text-white"
            onClick={() => setLightbox(null)}
          >
            <X size={28} />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            {lightbox.type === "video" && lightbox.videoUrl ? (
              <video
                src={lightbox.videoUrl}
                controls
                autoPlay
                className="w-full rounded-xl max-h-[80vh] object-contain"
              />
            ) : (
              <ImageWithFallback
                src={lightbox.src.replace("w=800", "w=1200")}
                alt={lightbox.title}
                className="w-full rounded-xl max-h-[80vh] object-contain"
              />
            )}
            <div className="mt-4 text-center">
              <p className="text-white/60 text-sm mb-1">{lightbox.category}</p>
              <p className="text-white" style={{ fontWeight: 700, fontSize: 20 }}>
                {lightbox.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
