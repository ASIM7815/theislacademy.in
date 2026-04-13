"use client";
import { useInView } from "@/hooks/useInView";

export default function MissionStatement() {
  const { ref, isVisible } = useInView(0.15);

  return (
    <section
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0d1b2e 0%, #1a1a2e 60%, #0f3460 100%)" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-coral/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gold/8 rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        {/* Label */}
        <div
          className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <span className="inline-block text-coral text-xs font-bold uppercase tracking-[0.3em] mb-6 border border-coral/30 px-4 py-1.5 rounded-full bg-coral/10">
            Mission
          </span>
        </div>

        {/* Big heading */}
        <h2
          className={`text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-extrabold leading-none tracking-tight mb-8 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.55) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Our Mission
        </h2>

        {/* Divider line */}
        <div
          className={`mx-auto mb-10 h-[2px] w-24 rounded-full bg-gradient-to-r from-coral to-gold transition-all duration-700 delay-200 ${isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`}
        />

        {/* Body text */}
        <p
          className={`text-2xl sm:text-3xl md:text-4xl font-semibold text-white/80 leading-snug max-w-3xl mx-auto transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          To foster early entrepreneurial thinking, shaping{" "}
          <span className="text-coral font-extrabold">innovators</span>,{" "}
          <span className="text-gold font-extrabold">job creators</span>, and{" "}
          <span className="text-white font-extrabold">future leaders</span>.
        </p>
      </div>
    </section>
  );
}
