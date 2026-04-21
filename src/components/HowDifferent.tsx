"use client";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import { CheckCircle } from "lucide-react";

const points = [
  {
    title: "Real Business Education",
    desc: "We teach practical business skills — not textbook theory. Students learn to think, plan, and execute like real entrepreneurs.",
  },
  {
    title: "Leadership at the Core",
    desc: "Every module is designed to build confident leaders who can communicate, inspire, and drive impact in any room.",
  },
  {
    title: "Activity-Based, No Exams",
    desc: "Forget rote learning. Our 100% activity-based curriculum means students grow through doing — presentations, role plays, and real projects.",
  },
  {
    title: "Future-Ready Skills",
    desc: "From financial literacy to public speaking and entrepreneurship — we equip students with skills schools simply don't teach.",
  },
  {
    title: "Year-Round Immersive Journey",
    desc: "A structured June-to-March programme that builds progressively, so every student finishes transformed — not just informed.",
  },
];

export default function HowDifferent() {
  const { ref: sectionRef, isVisible } = useInView(0.1);

  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — Image */}
          <div
            className={`relative transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Accent bar */}
            <div className="hidden lg:block absolute -left-4 top-8 bottom-8 w-1.5 bg-coral rounded-full" />

            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-navy/10 lg:ml-4 w-64 sm:w-72 md:w-80 lg:w-96 mx-auto lg:mx-0">
              <Image
                src="/stu1.png"
                alt="ISL Academy Student"
                width={400}
                height={500}
                className="w-full h-auto object-cover"
                priority
              />
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-lg">
                <p className="text-xs font-semibold text-coral uppercase tracking-widest mb-0.5">ISL Academy</p>
                <p className="text-text-dark font-bold text-sm">Learn Business. Build Business.</p>
              </div>
            </div>

            {/* Decorative dot grid */}
            <div
              className="absolute -bottom-8 -right-8 w-36 h-36 opacity-10 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, #e94560 1.5px, transparent 1.5px)",
                backgroundSize: "14px 14px",
              }}
            />
          </div>

          {/* RIGHT — Text */}
          <div
            className={`transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <span className="text-coral text-sm font-semibold uppercase tracking-widest">
              Our Edge
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark mt-3 mb-4 leading-tight">
              What <span className="gradient-text">Sets</span> Us Apart
            </h2>
            <div className="w-16 h-1 bg-coral rounded-full mb-6" />
            <p className="text-text-medium text-base md:text-lg leading-relaxed mb-8">
              At ISL Academy, we believe the future of business and leadership lies in the hands of young minds who dare to think differently. We don&apos;t just teach — we transform.
            </p>

            <div className="flex flex-col gap-5">
              {points.map((point, i) => (
                <div
                  key={point.title}
                  className={`flex items-start gap-4 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <div className="w-9 h-9 flex items-center justify-center bg-coral/10 rounded-xl shrink-0 mt-0.5">
                    <CheckCircle className="w-5 h-5 text-coral" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark text-base md:text-lg leading-snug">
                      {point.title}
                    </h4>
                    <p className="text-text-medium text-sm md:text-base leading-relaxed mt-1">
                      {point.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
