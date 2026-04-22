"use client";

interface ServiceCardProps {
  name: string;
  price: string;
  description: string;
  icon: string;
  duration: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function ServiceCard({
  name,
  price,
  description,
  icon,
  duration,
  isSelected = false,
  onClick,
}: ServiceCardProps) {
  return (
    <button
      onClick={onClick}
      className={`service-card group relative w-full text-left p-6 border transition-all duration-500 overflow-hidden ${
        isSelected
          ? "border-yellow-500 bg-yellow-900/10"
          : "border-yellow-800/20 bg-white/[0.02] hover:border-yellow-600/40 hover:bg-yellow-900/5"
      }`}
      style={{ borderRadius: "2px" }}
    >
      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-3 right-3 w-5 h-5 bg-yellow-500 flex items-center justify-center text-black text-xs font-bold">
          ✓
        </div>
      )}

      {/* Glow effect */}
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${
          isSelected ? "opacity-100" : "group-hover:opacity-100"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Top line accent */}
      <div
        className={`absolute top-0 left-0 h-px transition-all duration-500 ${
          isSelected ? "w-full bg-yellow-500" : "w-0 group-hover:w-full bg-yellow-700"
        }`}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div className="service-icon text-3xl mb-4 block">{icon}</div>

        {/* Name */}
        <h3
          className="text-lg font-semibold text-yellow-100 mb-1 group-hover:text-yellow-300 transition-colors duration-300"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {name}
        </h3>

        {/* Description */}
        <p
          className="text-xs text-yellow-100/40 mb-4 leading-relaxed"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {description}
        </p>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <span
            className="text-xl font-bold"
            style={{
              fontFamily: "var(--font-playfair)",
              background: "linear-gradient(135deg, #C9A84C, #F5D98B)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {price}
          </span>
          <span
            className="text-[10px] tracking-widest uppercase text-yellow-100/30"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            ⏱ {duration}
          </span>
        </div>
      </div>
    </button>
  );
}
