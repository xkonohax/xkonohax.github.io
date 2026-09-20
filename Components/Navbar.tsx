import { useState } from "react";
import { Menu, X, PenLine } from "lucide-react";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { id: "home", label: "Home" },
    { id: "portfolio", label: "Works" },
    { id: "blog", label: "Blog" },
    { id: "about", label: "About" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => onNavigate("home")}
          className="text-gray-900 tracking-tight hover:opacity-70 transition-opacity"
          style={{ fontWeight: 700, fontSize: 20 }}
        >
          Alex<span className="text-indigo-500">.</span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`transition-colors text-sm ${
                currentPage === link.id
                  ? "text-indigo-600"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              style={{ fontWeight: currentPage === link.id ? 600 : 400 }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onNavigate("editor")}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            style={{ fontWeight: 500 }}
          >
            <PenLine size={15} />
            Write
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => { onNavigate(link.id); setMenuOpen(false); }}
              className={`text-left text-sm ${
                currentPage === link.id ? "text-indigo-600" : "text-gray-600"
              }`}
              style={{ fontWeight: currentPage === link.id ? 600 : 400 }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { onNavigate("editor"); setMenuOpen(false); }}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm w-fit"
            style={{ fontWeight: 500 }}
          >
            <PenLine size={15} />
            Write
          </button>
        </div>
      )}
    </nav>
  );
}
