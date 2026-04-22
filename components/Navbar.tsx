"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Book Now", href: "#booking" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/95 backdrop-blur-lg border-b border-yellow-600/10 py-3 shadow-2xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a href="#" className="flex flex-col leading-none group">
          <span
            className="text-2xl font-black tracking-widest uppercase"
            style={{
              fontFamily: "var(--font-playfair)",
              background: "linear-gradient(135deg, #C9A84C 0%, #F5D98B 50%, #9A7A2E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            NEXUS
          </span>
          <span
            className="text-[9px] tracking-[6px] text-yellow-200/30 uppercase mt-0.5 group-hover:text-yellow-500/60 transition-colors duration-300"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            BARBER LOUNGE
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.label === "Book Now" ? (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="inline-flex items-center gap-2 px-5 py-2 border border-yellow-600/60 text-yellow-500 hover:bg-yellow-600 hover:text-black text-xs tracking-widest uppercase font-semibold transition-all duration-300"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  ✦ Book Now
                </a>
              </li>
            ) : (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-yellow-100/50 hover:text-yellow-500 text-xs tracking-widest uppercase font-medium transition-colors duration-300 relative group"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-yellow-500 group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            )
          )}
        </ul>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-yellow-500 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-px bg-yellow-500 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-yellow-500 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-500 ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-black/98 border-t border-yellow-600/10 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-xs tracking-widest uppercase font-medium transition-colors duration-300 ${
                link.label === "Book Now"
                  ? "text-yellow-500 border border-yellow-600/40 px-4 py-2 text-center"
                  : "text-yellow-100/50 hover:text-yellow-500"
              }`}
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
