"use client";
import { useInView } from "@/hooks/useInView";

const steps = [
  {
    num: 1,
    title: "Leadership Foundations",
    desc: "Discover your leadership style and civic responsibility",
  },
  {
    num: 2,
    title: "Communication Mastery",
    desc: "Build verbal & non-verbal communication confidence",
  },
  {
    num: 3,
    title: "Public Speaking Excellence",
    desc: "Master stage presence and confident expression",
  },
  {
    num: 4,
    title: "Entrepreneurial Thinking",
    desc: "Develop business awareness and innovative mindset",
  },
  {
    num: 5,
    title: "Financial Wisdom",
    desc: "Build money management and decision-making skills",
  },
  {
    num: 6,
    title: "Leadership in Action",
    desc: "Apply skills through real-world scenarios and teamwork",
  },
];

export default function Roadmap() {
  const { ref: headRef, isVisible: headVisible } = useInView();
  const { ref: timeRef, isVisible: timeVisible } = useInView(0.05);

  return (
    <section
      id="roadmap"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto px-5">
        <div
          ref={headRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-coral text-sm font-semibold uppercase tracking-widest">
            Timeline
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3">
            Your Learning Journey
          </h2>
          <div className="w-16 h-1 bg-coral mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline */}
        <div ref={timeRef} className="relative">
          {/* Center line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/20 md:-translate-x-px" />

          <div className="flex flex-col gap-10 md:gap-14">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={step.num}
                  className={`relative flex items-start transition-all duration-600 ${
                    timeVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  {/* Mobile layout: always left */}
                  <div className="md:hidden flex items-start gap-5 pl-2">
                    <div className="relative z-10 w-10 h-10 rounded-full bg-coral flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg shadow-coral/30">
                      {step.num}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white mb-1">
                        {step.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Desktop layout: alternating */}
                  <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 w-full items-center">
                    <div className={`${isLeft ? "text-right" : ""}`}>
                      {isLeft && (
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                          <h3 className="font-bold text-lg text-white mb-1">
                            {step.title}
                          </h3>
                          <p className="text-white/60 text-sm leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      )}
                    </div>
                    {/* Center dot */}
                    <div className="relative z-10 w-12 h-12 rounded-full bg-coral flex items-center justify-center text-white font-bold shadow-lg shadow-coral/30">
                      {step.num}
                    </div>
                    <div className={`${!isLeft ? "" : ""}`}>
                      {!isLeft && (
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                          <h3 className="font-bold text-lg text-white mb-1">
                            {step.title}
                          </h3>
                          <p className="text-white/60 text-sm leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
