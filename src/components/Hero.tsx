"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const cards = [
  {
    images: ["/A1.jpg", "/slide1.jpg", "/slide4.jpg"],
    href: "#about",
    label: "Who We Are",
    shadowColor: "shadow-blue-500/30",
    glow: "from-blue-500/30 to-transparent",
    bgColor: '#1a2b4a',
  },
  {
    images: ["/A2.jpg", "/slide2.jpg", "/slide5.jpg"],
    href: "#about",
    label: "For Whom",
    shadowColor: "shadow-red-500/30",
    glow: "from-red-500/30 to-transparent",
    bgColor: '#4a1a1a',
  },
  {
    images: ["/A3.jpg", "/slide3.jpg", "/slide6.jpg"],
    href: "#register",
    label: "Where & When",
    shadowColor: "shadow-emerald-500/30",
    glow: "from-emerald-500/30 to-transparent",
    bgColor: '#1a4a2b',
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState([0, 0, 0]);

  useEffect(() => {
    const cardEls = containerRef.current?.querySelectorAll<HTMLElement>(".hero-card");
    if (!cardEls) return;

    const handlers: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

    cardEls.forEach((el) => {
      const move = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rx = ((rect.height / 2 - y) / rect.height) * 14;
        const ry = ((x - rect.width / 2) / rect.width) * 14;
        el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.03,1.03,1.03)`;
        const shine = el.querySelector<HTMLElement>(".card-shine");
        if (shine) {
          shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, transparent 65%)`;
          shine.style.opacity = "1";
        }
      };
      const leave = () => {
        el.style.transform = "";
        const shine = el.querySelector<HTMLElement>(".card-shine");
        if (shine) shine.style.opacity = "0";
      };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      handlers.push({ el, move, leave });
    });

    return () => handlers.forEach(({ el, move, leave }) => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    });
  }, []);

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => 
        prev.map((index, cardIndex) => (index + 1) % cards[cardIndex].images.length)
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0d1b2e 0%, #1a1a2e 40%, #0f3460 100%)" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }}
      />

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-[5%] w-80 h-80 bg-coral/15 rounded-full blur-[100px] animate-[hero-orb-1_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/4 right-[5%] w-96 h-96 bg-violet-500/10 rounded-full blur-[120px] animate-[hero-orb-2_10s_ease-in-out_infinite]" />

      {/* Cards */}
      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-10">
          {cards.map((card, i) => (
            <a
              key={card.label}
              href={card.href}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(card.href)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`hero-card group relative rounded-3xl overflow-hidden cursor-pointer block shadow-2xl ${card.shadowColor}`}
              style={{
                aspectRatio: "2/3",
                transformStyle: "preserve-3d",
                transition: "transform 0.35s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease",
                animation: `hero-card-in 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.18}s both`,
                backgroundColor: card.bgColor,
              }}
            >
              {/* Full bleed image with fade transition */}
              {card.images.map((img, imgIndex) => (
                <Image
                  key={img}
                  src={img}
                  alt={card.label}
                  fill
                  className={`object-contain transition-all duration-1000 group-hover:scale-105 ${
                    currentImageIndex[i] === imgIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  priority={i === 0 && imgIndex === 0}
                />
              ))}

              {/* Mouse-follow shine */}
              <div className="card-shine absolute inset-0 z-30 pointer-events-none rounded-3xl opacity-0 transition-opacity duration-300" />

              {/* Bottom hover CTA overlay */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-end justify-center pb-5">
                <span className="text-white text-sm font-semibold flex items-center gap-2 tracking-wide">
                  Learn more
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>

              {/* Top glow edge on hover */}
              <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${card.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20`} />
            </a>
          ))}
        </div>
      </div>


    </section>
  );
}
