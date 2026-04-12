"use client";
import { useState, useEffect, useRef } from "react";

const slides = [
  {
    img: "/1.jpg",
    label: "ISL Business Leadership & Training Academy",
    heading1: "LEARN BUSINESS.",
    heading2: "BUILD BUSINESS.",
    body: "Empowering students with essential business, leadership, and communication skills for a future-ready career.",
    quote: "",
    showCtas: true,
  },
  {
    img: "/2.jpg",
    label: "Leadership Development",
    heading1: "",
    heading2: "",
    body: "",
    quote: "\"Leaders are not born — they are built through knowledge, courage, and relentless practice.\"",
    showCtas: false,
  },
  {
    img: "/3.jpg",
    label: "Entrepreneurship & Innovation",
    heading1: "",
    heading2: "",
    body: "",
    quote: "\"The future belongs to those who dare to think differently and act boldly today.\"",
    showCtas: false,
  },
  {
    img: "/4.jpg",
    label: "Communication & Confidence",
    heading1: "",
    heading2: "",
    body: "",
    quote: "\"Your voice is your most powerful business tool — learn to use it with impact.\"",
    showCtas: false,
  },
];

const DURATION = 5000; // ms per slide

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (index: number) => {
    if (animating || index === current) return;
    setAnimating(true);
    setTextVisible(false);
    setTimeout(() => {
      setCurrent(index);
      setTextVisible(true);
      setTimeout(() => setAnimating(false), 800);
    }, 600);
  };

  const next = () => goTo((current + 1) % slides.length);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, DURATION);
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const slide = slides[current];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image slides — cross-fade */}
      {slides.map((s, i) => (
        <div
          key={s.img}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${s.img})`,
            opacity: i === current ? 1 : 0,
            zIndex: 0,
          }}
        />
      ))}

      {/* Dark overlay so text is always readable */}
      <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(135deg, rgba(26,26,46,0.80) 0%, rgba(22,33,62,0.65) 60%, rgba(15,52,96,0.55) 100%)" }} />

      {/* Dot grid */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }}
      />

      {/* ── TEXT CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 py-32 md:py-0 w-full">
        <div className="max-w-3xl">

          {/* Label pill */}
          <div
            className="inline-block mb-6"
            style={{ opacity: textVisible ? 1 : 0, transform: textVisible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}
          >
            <span className="bg-white/10 backdrop-blur-sm text-white/80 text-xs font-medium px-4 py-2 rounded-full border border-white/10 tracking-widest uppercase">
              {slide.label}
            </span>
          </div>

          {/* Slide 1: main brand heading */}
          {slide.showCtas && (
            <>
              <h1
                style={{ opacity: textVisible ? 1 : 0, transform: textVisible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s" }}
                className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6"
              >
                {slide.heading1}
                <br />
                <span className="gradient-text">{slide.heading2}</span>
              </h1>
              <p
                style={{ opacity: textVisible ? 1 : 0, transform: textVisible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s" }}
                className="text-white/75 text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
              >
                {slide.body}
              </p>
              <div
                style={{ opacity: textVisible ? 1 : 0, transform: textVisible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s" }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#register"
                  onClick={(e) => { e.preventDefault(); document.querySelector("#register")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="bg-coral hover:bg-coral-dark text-white px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-200 hover:shadow-xl hover:shadow-coral/30 hover:-translate-y-0.5"
                >
                  Register Now
                </a>
                <a
                  href="#about"
                  onClick={(e) => { e.preventDefault(); document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="border-2 border-white/30 text-white px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-200 hover:bg-white/10 hover:border-white/50"
                >
                  Explore Program
                </a>
              </div>
            </>
          )}

          {/* Slides 2-4: full-width quote */}
          {!slide.showCtas && slide.quote && (
            <p
              style={{ opacity: textVisible ? 1 : 0, transform: textVisible ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s" }}
              className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight max-w-4xl"
            >
              {slide.quote}
            </p>
          )}
        </div>
      </div>

      {/* ── CONTROLS ── */}
      {/* Progress bar */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => { goTo(i); resetTimer(); }}
            className="relative h-1 rounded-full overflow-hidden transition-all duration-300"
            style={{ width: i === current ? 48 : 24, background: "rgba(255,255,255,0.3)" }}
          >
            {i === current && (
              <span
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: "#e94560", animation: `slideProgress ${DURATION}ms linear forwards` }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Arrow buttons */}
      <button
        aria-label="Previous slide"
        onClick={() => { goTo((current - 1 + slides.length) % slides.length); resetTimer(); }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        aria-label="Next slide"
        onClick={() => { goTo((current + 1) % slides.length); resetTimer(); }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-beige to-transparent z-10" />
    </section>
  );
}
