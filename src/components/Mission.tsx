"use client";
import { useInView } from "@/hooks/useInView";

export default function Mission() {
  const { ref, isVisible } = useInView(0.2);

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #e94560 0%, #f5a623 100%)",
      }}
    >
      {/* Decorative overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div ref={ref} className="max-w-4xl mx-auto px-5 relative z-10 text-center">
        <span
          className={`inline-block text-white/80 text-xs font-bold uppercase tracking-[0.2em] mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          OUR MISSION
        </span>

        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-snug mb-8 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Our mission is to create a transformative learning environment that
          equips young minds with real world skills, global perspective, and
          holistic development.
        </h2>

        <div
          className={`inline-block bg-white/15 backdrop-blur-sm rounded-2xl px-8 py-5 border border-white/20 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-white font-semibold text-xl md:text-2xl italic">
            &ldquo;INDIANS NEED MORE JOB CREATORS AND FEWER JOB SEEKERS&rdquo;
          </p>
        </div>

        <div
          className={`mt-10 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <a
            href="#register"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#register")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-block bg-white text-coral font-semibold px-8 py-3.5 rounded-full hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
          >
            Register Now
          </a>
        </div>
      </div>
    </section>
  );
}
