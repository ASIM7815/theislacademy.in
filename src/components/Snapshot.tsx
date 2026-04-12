"use client";
import { useInView } from "@/hooks/useInView";

const snapItems = [
  {
    highlight: "Ages 16+",
    text: "The ISL Academy offers an integrated learning track designed for students aged 16 and above, covering essential business and leadership skills.",
  },
  {
    highlight: "Activity-Based",
    text: "Our approach is entirely activity-based with real-world learning. There are no traditional exams — just practical, hands-on growth.",
  },
  {
    highlight: "9 Key Areas",
    text: "The program structure covers 9 key areas of personal and professional development, from communication to entrepreneurship.",
  },
  {
    highlight: "June to March",
    text: "A progressive learning path from June to March, building skills incrementally through each phase of the academic year.",
  },
];

export default function Snapshot() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      }}
    >
      {/* Decorative elements */}
      <div
        className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #e94560 0%, transparent 70%)",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-10 right-20 w-80 h-80 rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #f5a623 0%, transparent 70%)",
          animation: "float-slow 8s ease-in-out infinite",
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-5 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-coral text-sm font-semibold uppercase tracking-widest">
            Overview
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3">
            Snapshot
          </h2>
          <div className="w-16 h-1 bg-coral mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {snapItems.map((item, i) => (
            <div
              key={item.highlight}
              className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-600 hover:bg-white/10 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span className="inline-block gradient-text font-bold text-lg mb-3">
                {item.highlight}
              </span>
              <p className="text-white/70 leading-relaxed text-sm md:text-base">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
