"use client";
import { useInView } from "@/hooks/useInView";

const highlights = [
  { label: "Ages 16+", icon: "🎓" },
  { label: "9 Core Areas", icon: "📚" },
  { label: "Year-Round Program", icon: "📅" },
  { label: "No Exams", icon: "✅" },
  { label: "Activity-Based", icon: "🎯" },
  { label: "June to March", icon: "🗓️" },
];

export default function HighlightBar() {
  const { ref, isVisible } = useInView(0.2);

  return (
    <section className="bg-beige py-12">
      <div ref={ref} className="max-w-7xl mx-auto px-5">
        <p className="text-center text-text-medium text-sm font-medium mb-6 uppercase tracking-widest">
          Integrated Learning Track
        </p>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {highlights.map((item, i) => (
            <div
              key={item.label}
              className={`flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100 transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-semibold text-text-dark">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
