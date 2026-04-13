"use client";
import { useInView } from "@/hooks/useInView";
import { GraduationCap, BookOpen, Calendar, CheckCircle, Target, CalendarDays } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const highlights: { label: string; icon: LucideIcon }[] = [
  { label: "Ages 16+", icon: GraduationCap },
  { label: "9 Core Areas", icon: BookOpen },
  { label: "Year-Round Program", icon: Calendar },
  { label: "Activity-Based", icon: Target },
  { label: "June to March", icon: CalendarDays },
];

export default function HighlightBar() {
  const { ref, isVisible } = useInView(0.2);

  return (
    <section className="bg-[#0d1b2e] py-12">
      <div ref={ref} className="max-w-7xl mx-auto px-5">
        <p className="text-center text-white/50 text-sm font-medium mb-6 uppercase tracking-widest">
          Integrated Learning Track
        </p>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {highlights.map((item, i) => (
            <div
              key={item.label}
              className={`flex items-center gap-2 bg-white/[0.06] px-5 py-2.5 rounded-full border border-white/10 transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <item.icon className="w-5 h-5 text-coral" strokeWidth={1.5} />
              <span className="text-base font-semibold text-white/80">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
