import { useState } from "react";
import {
  Mail,
  MapPin,
  Camera,
  Pen,
  Film,
  Palette,
} from "lucide-react";

function ImageWithFallback(
  props: React.ImgHTMLAttributes<HTMLImageElement> & {
    src: string;
    alt: string;
  },
) {
  const [didError, setDidError] = useState(false);
  const { src, alt, style, className, ...rest } = props;
  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ""}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNiAxOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=="
          alt="Error"
          data-original-url={src}
        />
      </div>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      {...rest}
      onError={() => setDidError(true)}
    />
  );
}

interface AboutProps {
  onNavigate: (page: string) => void;
}

const skills = [
  {
    icon: Camera,
    label: "Photography",
    desc: "Street, landscape, portrait",
  },
  {
    icon: Palette,
    label: "Design",
    desc: "Visual identity, UI, print",
  },
  {
    icon: Film,
    label: "Video",
    desc: "Short films, documentary",
  },
  {
    icon: Pen,
    label: "Writing",
    desc: "Essays, stories, criticism",
  },
];

export function About({ onNavigate }: AboutProps) {
  return (
    <section className="min-h-screen bg-white pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: Image + info */}
          <div>
            <div className="relative mb-8">
              <div className="w-full aspect-[4/5] overflow-hidden rounded-3xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1738676524296-364cf18900a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                  alt="Alex at work"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-indigo-600 text-white rounded-2xl px-5 py-3">
                <p
                  className="text-2xl"
                  style={{ fontWeight: 800 }}
                >
                  6+
                </p>
                <p
                  className="text-indigo-200 text-xs"
                  style={{ fontWeight: 500 }}
                >
                  Years of experience
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin size={16} className="text-indigo-500" />
                <span className="text-sm">Tokyo, Japan</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Mail size={16} className="text-indigo-500" />
                <a
                  href="mailto:alex@example.com"
                  className="text-sm hover:text-indigo-600 transition-colors"
                >
                  alex@example.com
                </a>
              </div>
            </div>
          </div>

          {/* Right: Bio */}
          <div>
            <p
              className="text-indigo-500 uppercase tracking-widest mb-3"
              style={{ fontSize: 12, fontWeight: 600 }}
            >
              About Me
            </p>
            <h2
              className="text-gray-900 mb-6"
              style={{
                fontSize: 38,
                fontWeight: 800,
                lineHeight: 1.2,
              }}
            >
              A creative mind living between frames & words.
            </h2>
            <div
              className="text-gray-600 space-y-4"
              style={{ fontSize: 16, lineHeight: 1.8 }}
            >
              <p>
                I'm Alex, a visual artist and writer based in
                Tokyo. My work spans photography, graphic
                design, short film, and written essays — all
                connected by a deep curiosity about beauty in
                everyday life.
              </p>
              <p>
                I started with film photography in my early
                twenties and gradually expanded into digital
                design and video. Each medium teaches me
                something different about how we see and
                communicate.
              </p>
              <p>
                This site is my personal space — a place to
                share the work I'm proud of and the ideas I'm
                exploring.
              </p>
            </div>

            {/* Skills */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {skills.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="bg-gray-50 rounded-2xl p-4 flex items-start gap-3"
                >
                  <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon
                      size={16}
                      className="text-indigo-600"
                    />
                  </div>
                  <div>
                    <p
                      className="text-gray-900 text-sm"
                      style={{ fontWeight: 700 }}
                    >
                      {label}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => onNavigate("portfolio")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition-colors text-sm"
                style={{ fontWeight: 600 }}
              >
                View Works
              </button>
              <button
                onClick={() => onNavigate("editor")}
                className="border border-gray-200 hover:border-indigo-300 text-gray-700 hover:text-indigo-600 px-6 py-3 rounded-xl transition-colors text-sm"
                style={{ fontWeight: 600 }}
              >
                Read Articles
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}