import { useState } from "react";
import { ArrowDown, ExternalLink } from "lucide-react";

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

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative blobs */}
      <div className="absolute top-24 left-1/4 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-32 right-1/4 w-60 h-60 bg-purple-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

      {/* Avatar */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-indigo-100 ring-offset-2">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1506863530036-1efeddceb993?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="absolute bottom-0 right-0 w-5 h-5 bg-green-400 rounded-full border-2 border-white" />
      </div>

      {/* Text */}
      <p className="text-indigo-600 mb-3 tracking-widest uppercase" style={{ fontSize: 12, fontWeight: 600 }}>
        Creative · Designer · Photographer
      </p>
      <h1 className="text-gray-900 mb-4 max-w-2xl" style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.1 }}>
        Hi, I'm <span className="text-indigo-500">Alex</span>.<br />I create things worth seeing.
      </h1>
      <p className="text-gray-500 max-w-xl mb-8" style={{ fontSize: 17, lineHeight: 1.7 }}>
        I'm a visual artist and writer based in Tokyo. I capture moments, craft design, and share stories through my work and articles.
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        <button
          onClick={() => onNavigate("portfolio")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3 rounded-xl transition-colors"
          style={{ fontWeight: 600, fontSize: 15 }}
        >
          View My Works
        </button>
        <button
          onClick={() => onNavigate("blog")}
          className="bg-white border border-gray-200 hover:border-indigo-300 text-gray-700 hover:text-indigo-600 px-7 py-3 rounded-xl transition-colors"
          style={{ fontWeight: 600, fontSize: 15 }}
        >
          Read Articles
        </button>
      </div>

      {/* Socials */}
      <div className="flex gap-5 text-gray-400">
        <a href="#" className="hover:text-gray-700 transition-colors text-sm" style={{ fontWeight: 500 }}>GitHub</a>
        <a href="#" className="hover:text-gray-700 transition-colors text-sm" style={{ fontWeight: 500 }}>Twitter</a>
        <a href="#" className="hover:text-gray-700 transition-colors text-sm" style={{ fontWeight: 500 }}>Instagram</a>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => onNavigate("portfolio")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-indigo-500 transition-colors animate-bounce"
      >
        <ArrowDown size={22} />
      </button>
    </section>
  );
}