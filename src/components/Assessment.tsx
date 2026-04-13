"use client";
import { useCounter } from "@/hooks/useCounter";
import { useInView } from "@/hooks/useInView";

const assessments = [
  { value: 20, label: "Participation & Attendance" },
  { value: 30, label: "Activities & Role Plays" },
  { value: 30, label: "Presentations" },
  { value: 20, label: "Final Reflection / Project" },
];

function CounterCard({ value, label, delay }: { value: number; label: string; delay: number }) {
  const { ref, count } = useCounter(value);

  return (
    <div
      className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span ref={ref} className="gradient-text text-6xl md:text-8xl font-extrabold block mb-3">
        {count}%
      </span>
      <p className="text-text-medium text-base font-medium leading-snug">{label}</p>
      {/* Progress bar */}
      <div className="mt-4 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${count > 0 ? value : 0}%`,
            background: "linear-gradient(135deg, #e94560, #f5a623)",
          }}
        />
      </div>
    </div>
  );
}

export default function Assessment() {
  const { ref: headRef, isVisible: headVisible } = useInView();

  return (
    <section className="bg-beige py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5">
        <div
          ref={headRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-coral text-sm font-semibold uppercase tracking-widest">
            Evaluation
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-text-dark mt-3 leading-tight">
            How You&apos;ll Be Evaluated
          </h2>
          <div className="w-16 h-1 bg-coral mx-auto mt-4 rounded-full" />
          <p className="text-text-medium mt-6 text-xl font-semibold">No Exams!</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {assessments.map((item, i) => (
            <CounterCard key={item.label} value={item.value} label={item.label} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
