"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import ServiceCard from "@/components/ServiceCard";
import BookingForm from "@/components/BookingForm";

const SERVICES = [
  {
    name: "Haircut",
    price: "₹599",
    description: "Precision cut tailored to your face shape, styled to perfection by our master barbers.",
    icon: "✂️",
    duration: "45 min",
  },
  {
    name: "Beard Styling",
    price: "₹399",
    description: "Shape, trim, and define your beard with hot towel and premium grooming products.",
    icon: "🪒",
    duration: "30 min",
  },
  {
    name: "Hair + Beard",
    price: "₹799",
    description: "The complete gentleman experience — full haircut and beard styling in one session.",
    icon: "💈",
    duration: "75 min",
  },
  {
    name: "Facial",
    price: "₹899",
    description: "Luxury deep-cleansing facial using premium skincare. Rejuvenate and refresh your skin.",
    icon: "✨",
    duration: "60 min",
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export default function Home() {
  const [selectedService, setSelectedService] = useState("");

  const scrollToBooking = (svcName?: string) => {
    if (svcName) setSelectedService(svcName);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#0D0D0D] overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden pattern-bg"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.07) 0%, #0D0D0D 65%)" }}
      >
        {/* Barber pole accent left */}
        <div className="absolute left-0 top-0 bottom-0 w-1 barber-pole opacity-30 hidden lg:block" />
        {/* Barber pole accent right */}
        <div className="absolute right-0 top-0 bottom-0 w-1 barber-pole opacity-30 hidden lg:block" />

        {/* Large decorative scissors */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[500px] opacity-[0.018] select-none pointer-events-none"
          style={{ zIndex: 0, lineHeight: 1 }}
        >
          ✂
        </div>

        {/* Decorative circles */}
        <div className="absolute top-32 right-16 w-64 h-64 rounded-full border border-yellow-800/10 animate-float hidden lg:block" />
        <div className="absolute top-40 right-24 w-40 h-40 rounded-full border border-yellow-700/8 animate-float hidden lg:block" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-32 left-16 w-48 h-48 rounded-full border border-yellow-800/10 animate-float hidden lg:block" style={{ animationDelay: "4s" }} />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-3 px-5 py-2 border border-yellow-700/30 text-yellow-600/80 text-[10px] tracking-[5px] uppercase font-medium mb-10"
            style={{ fontFamily: "var(--font-outfit)", borderRadius: "2px" }}
          >
            <span className="w-6 h-px bg-yellow-700/50" />
            Premium Barbershop · Jhotwara, Jaipur
            <span className="w-6 h-px bg-yellow-700/50" />
          </div>

          {/* Main headline */}
          <h1
            className="font-black mb-6 leading-none"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white/90 mb-2">
              NEXUS
            </span>
            <span
              className="block text-shimmer text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Barber Lounge
            </span>
          </h1>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 my-8">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-700/60" />
            <span className="text-yellow-600/60 text-xs tracking-widest">✦</span>
            <span className="text-xs tracking-[6px] uppercase text-yellow-100/30" style={{ fontFamily: "var(--font-outfit)" }}>
              Where Style Meets Precision
            </span>
            <span className="text-yellow-600/60 text-xs tracking-widest">✦</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-700/60" />
          </div>

          {/* Subtext */}
          <p
            className="text-yellow-100/40 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light"
            style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}
          >
            Experience world-class grooming in an ambiance built for the modern gentleman.
            Premium cuts, expert styling, unmatched precision.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollToBooking()}
              className="group px-10 py-4 text-black text-sm tracking-widest uppercase font-bold transition-all duration-400 hover:shadow-2xl hover:-translate-y-1 btn-press"
              style={{
                fontFamily: "var(--font-outfit)",
                background: "linear-gradient(135deg, #C9A84C 0%, #F5D98B 50%, #9A7A2E 100%)",
                borderRadius: "2px",
                boxShadow: "0 10px 40px rgba(201,168,76,0.25)",
              }}
            >
              ✦ Book Appointment
            </button>
            <a
              href="#services"
              className="px-10 py-4 border border-yellow-700/40 text-yellow-100/60 hover:text-yellow-400 hover:border-yellow-600/60 text-sm tracking-widest uppercase font-medium transition-all duration-300"
              style={{ fontFamily: "var(--font-outfit)", borderRadius: "2px" }}
            >
              View Services
            </a>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { num: "5★", label: "Rated" },
              { num: "1000+", label: "Happy Clients" },
              { num: "4+", label: "Expert Barbers" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <p
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    background: "linear-gradient(135deg, #C9A84C, #F5D98B)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {num}
                </p>
                <p className="text-[10px] tracking-widest uppercase text-yellow-100/30 mt-1" style={{ fontFamily: "var(--font-outfit)" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[9px] tracking-[5px] uppercase text-yellow-400" style={{ fontFamily: "var(--font-outfit)" }}>Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-yellow-600 to-transparent animate-bounce" />
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────────── */}
      <section id="services" className="py-28 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <RevealSection className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-yellow-800/30 text-yellow-600/60 text-[9px] tracking-[5px] uppercase mb-6" style={{ fontFamily: "var(--font-outfit)" }}>
              Our Expertise
            </div>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Premium{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #C9A84C, #F5D98B)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Services
              </span>
            </h2>
            <p
              className="text-yellow-100/40 text-lg max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}
            >
              Each service crafted with precision and passion, using only the finest products.
            </p>
          </RevealSection>

          <RevealSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SERVICES.map((svc) => (
                <ServiceCard
                  key={svc.name}
                  {...svc}
                  isSelected={selectedService === svc.name}
                  onClick={() => scrollToBooking(svc.name)}
                />
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── BOOKING ───────────────────────────────────────────────────────── */}
      <section
        id="booking"
        className="py-28 px-4 relative"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)" }}
      >
        {/* Corner accents */}
        <div className="absolute top-16 left-8 w-24 h-24 border-l border-t border-yellow-700/20 hidden md:block" />
        <div className="absolute top-16 right-8 w-24 h-24 border-r border-t border-yellow-700/20 hidden md:block" />
        <div className="absolute bottom-16 left-8 w-24 h-24 border-l border-b border-yellow-700/20 hidden md:block" />
        <div className="absolute bottom-16 right-8 w-24 h-24 border-r border-b border-yellow-700/20 hidden md:block" />

        <div className="max-w-2xl mx-auto">
          <RevealSection className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-yellow-800/30 text-yellow-600/60 text-[9px] tracking-[5px] uppercase mb-6" style={{ fontFamily: "var(--font-outfit)" }}>
              Reserve Your Spot
            </div>
            <h2
              className="text-4xl sm:text-5xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Book{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #C9A84C, #F5D98B)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontStyle: "italic",
                }}
              >
                Appointment
              </span>
            </h2>
            <p
              className="text-yellow-100/40 text-base"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Fill in your details and confirm via WhatsApp. Takes less than a minute.
            </p>
          </RevealSection>

          <RevealSection>
            <BookingForm />
          </RevealSection>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────────── */}
      <section id="about" className="py-28 px-4 border-t border-yellow-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              {/* Visual collage panel */}
              <div className="relative">
                <div
                  className="w-full aspect-square max-w-md mx-auto lg:mx-0 border border-yellow-800/20 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #1A1A1A 0%, #0D0D0D 100%)",
                    borderRadius: "2px",
                  }}
                >
                  {/* Inner glow */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)" }}
                  />
                  <div className="text-center relative z-10">
                    <div className="text-9xl mb-4 animate-float">💈</div>
                    <p
                      className="text-xs tracking-[6px] uppercase text-yellow-600/50"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      Est. Jhotwara, Jaipur
                    </p>
                  </div>
                  {/* Corner lines */}
                  <div className="absolute top-6 left-6 w-12 h-12 border-l border-t border-yellow-700/30" />
                  <div className="absolute top-6 right-6 w-12 h-12 border-r border-t border-yellow-700/30" />
                  <div className="absolute bottom-6 left-6 w-12 h-12 border-l border-b border-yellow-700/30" />
                  <div className="absolute bottom-6 right-6 w-12 h-12 border-r border-b border-yellow-700/30" />
                </div>
                {/* Floating badge */}
                <div
                  className="absolute -bottom-4 -right-4 md:right-4 border border-yellow-700/30 px-6 py-4 text-center gold-glow"
                  style={{ background: "linear-gradient(135deg, #1a1a1a, #0d0d0d)", borderRadius: "2px", minWidth: "130px" }}
                >
                  <p
                    className="text-3xl font-black"
                    style={{
                      fontFamily: "var(--font-playfair)",
                      background: "linear-gradient(135deg, #C9A84C, #F5D98B)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    4+
                  </p>
                  <p className="text-[9px] tracking-widest uppercase text-yellow-100/30 mt-1" style={{ fontFamily: "var(--font-outfit)" }}>
                    Expert Barbers
                  </p>
                </div>
              </div>
            </RevealSection>

            <RevealSection>
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-yellow-800/30 text-yellow-600/60 text-[9px] tracking-[5px] uppercase" style={{ fontFamily: "var(--font-outfit)" }}>
                  Our Story
                </div>

                <h2
                  className="text-4xl sm:text-5xl font-bold text-white/90 leading-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  More Than Just a{" "}
                  <span
                    style={{
                      background: "linear-gradient(135deg, #C9A84C, #F5D98B)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontStyle: "italic",
                    }}
                  >
                    Haircut
                  </span>
                </h2>

                <p
                  className="text-yellow-100/50 text-lg leading-relaxed"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  At Nexus Barber Lounge, we believe grooming is a ritual. Every visit is a transformation — 
                  a moment to relax, refresh, and leave looking your absolute best.
                </p>
                <p
                  className="text-yellow-100/40 leading-relaxed"
                  style={{ fontFamily: "var(--font-outfit)", fontSize: "14px" }}
                >
                  Located in the heart of Jhotwara, Jaipur, our team of skilled barbers brings years of 
                  expertise in modern and classic cuts. We use premium products and stay updated with 
                  the latest trends so you always walk out in style.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  {[
                    { icon: "⭐", text: "Premium products only" },
                    { icon: "🕐", text: "Open 9 AM – 7 PM daily" },
                    { icon: "📍", text: "Jhotwara, Jaipur" },
                    { icon: "💬", text: "WhatsApp booking" },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-center gap-3">
                      <span className="text-xl">{icon}</span>
                      <span className="text-xs text-yellow-100/40 font-medium" style={{ fontFamily: "var(--font-outfit)" }}>{text}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => scrollToBooking()}
                  className="px-8 py-3 text-black text-xs tracking-widest uppercase font-bold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    background: "linear-gradient(135deg, #C9A84C 0%, #F5D98B 50%, #9A7A2E 100%)",
                    borderRadius: "2px",
                  }}
                >
                  Book Your Visit →
                </button>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-yellow-900/20">
        <div className="max-w-6xl mx-auto">
          <RevealSection className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold text-white/80"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The Nexus{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #C9A84C, #F5D98B)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Experience
              </span>
            </h2>
          </RevealSection>

          <RevealSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "✂️",
                  title: "Master Barbers",
                  desc: "Our team has years of training in precision cutting, classic shaves, and modern styles.",
                },
                {
                  icon: "🌿",
                  title: "Premium Products",
                  desc: "We use only top-grade grooming products that protect and nourish your hair and skin.",
                },
                {
                  icon: "⏰",
                  title: "No Long Waits",
                  desc: "Book your slot in advance and walk in at your time. We respect your schedule.",
                },
                {
                  icon: "💧",
                  title: "Hygienic Standards",
                  desc: "Freshly sterilised tools for every client. Clean, safe, premium environment.",
                },
                {
                  icon: "👑",
                  title: "Luxury Ambiance",
                  desc: "Relax in a sophisticated space designed to make every visit an experience.",
                },
                {
                  icon: "💬",
                  title: "WhatsApp Booking",
                  desc: "Simple, fast, zero-hassle booking directly on WhatsApp. Confirmation in seconds.",
                },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="p-6 border border-yellow-900/20 bg-white/[0.02] hover:border-yellow-700/30 hover:bg-yellow-900/5 transition-all duration-300 group"
                  style={{ borderRadius: "2px" }}
                >
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
                  <h3 className="text-base font-semibold text-yellow-100/80 mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                    {title}
                  </h3>
                  <p className="text-xs text-yellow-100/35 leading-relaxed" style={{ fontFamily: "var(--font-outfit)" }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-28 px-4 border-t border-yellow-900/20 relative overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.06) 0%, transparent 70%)" }}
      >
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-yellow-800/30 text-yellow-600/60 text-[9px] tracking-[5px] uppercase mb-6" style={{ fontFamily: "var(--font-outfit)" }}>
              Find Us
            </div>
            <h2
              className="text-4xl sm:text-5xl font-bold text-white/90"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Visit{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #C9A84C, #F5D98B)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontStyle: "italic",
                }}
              >
                Us
              </span>
            </h2>
          </RevealSection>

          <RevealSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: "📍",
                  title: "Location",
                  lines: ["Nexus Barber Lounge", "Jhotwara, Jaipur", "Rajasthan, India"],
                },
                {
                  icon: "🕐",
                  title: "Hours",
                  lines: ["Monday – Saturday", "9:00 AM – 7:00 PM", "Sunday: 10:00 AM – 5:00 PM"],
                },
                {
                  icon: "📞",
                  title: "Contact",
                  lines: ["+91 9376838329", "WhatsApp preferred", "Instant confirmation"],
                },
              ].map(({ icon, title, lines }) => (
                <div
                  key={title}
                  className="p-8 border border-yellow-800/20 bg-white/[0.02] text-center"
                  style={{ borderRadius: "2px" }}
                >
                  <div className="text-4xl mb-4">{icon}</div>
                  <h3
                    className="text-sm font-semibold text-yellow-100/60 mb-3 tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {title}
                  </h3>
                  {lines.map((line) => (
                    <p key={line} className="text-sm text-yellow-100/40 leading-7" style={{ fontFamily: "var(--font-outfit)" }}>
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </RevealSection>

          {/* WhatsApp CTA banner */}
          <RevealSection>
            <div
              className="border border-yellow-700/20 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 gold-glow"
              style={{
                background: "linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(13,13,13,0.98) 100%)",
                borderRadius: "2px",
              }}
            >
              <div>
                <h3
                  className="text-2xl md:text-3xl font-bold text-white/90 mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Ready for a Fresh Look?
                </h3>
                <p className="text-yellow-100/40 text-sm" style={{ fontFamily: "var(--font-outfit)" }}>
                  Book instantly on WhatsApp or use our booking form above.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <a
                  href="https://wa.me/916376530417"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-btn inline-flex items-center gap-3 px-8 py-4 text-white font-semibold text-sm tracking-wider uppercase"
                  style={{ fontFamily: "var(--font-outfit)", borderRadius: "2px" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Us
                </a>
                <button
                  onClick={() => scrollToBooking()}
                  className="inline-flex items-center gap-2 px-8 py-4 border border-yellow-600/40 text-yellow-500 hover:bg-yellow-900/10 text-sm tracking-widest uppercase font-medium transition-all duration-300"
                  style={{ fontFamily: "var(--font-outfit)", borderRadius: "2px" }}
                >
                  Book Online
                </button>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="border-t border-yellow-900/20 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span
                className="text-xl font-black tracking-widest uppercase block"
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
              <span className="text-[9px] tracking-[6px] uppercase text-yellow-100/20" style={{ fontFamily: "var(--font-outfit)" }}>
                BARBER LOUNGE
              </span>
            </div>

            <div className="flex items-center gap-6">
              {["Services", "Book Now", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "")}`}
                  className="text-[10px] tracking-widest uppercase text-yellow-100/25 hover:text-yellow-600 transition-colors duration-300"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="text-center md:text-right">
              <p className="text-[10px] text-yellow-100/20" style={{ fontFamily: "var(--font-outfit)" }}>
                © {new Date().getFullYear()} Nexus Barber Lounge
              </p>
              <p className="text-[10px] text-yellow-100/15 mt-1" style={{ fontFamily: "var(--font-outfit)" }}>
                Jhotwara, Jaipur, Rajasthan
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
