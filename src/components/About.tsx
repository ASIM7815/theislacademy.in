"use client";
import { useInView } from "@/hooks/useInView";
import { Users } from "lucide-react";

const whoCanJoin = [
  {
    badge: "Intermediate",
    desc: "Students pursuing their intermediate education",
  },
  {
    badge: "Undergraduate",
    desc: "College students looking to enhance business skills",
  },
  {
    badge: "Foundation",
    desc: "Students in foundation programs seeking leadership training",
  },
];

export default function About() {
  const { ref: headRef, isVisible: headVisible } = useInView();
  const { ref: card1Ref, isVisible: card1Visible } = useInView();

  return (
    <section id="about" className="bg-beige py-20 md:py-28 relative overflow-hidden">
      {/* Decorative blob */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #e9456020 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-5">
        {/* Section Header */}
        <div
          ref={headRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-coral text-sm font-semibold uppercase tracking-widest">
            Discover
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-text-dark mt-3 leading-tight">
            About the Program
          </h2>
          <div className="w-16 h-1 bg-coral mx-auto mt-4 rounded-full" />
        </div>

        {/* Cards Grid */}
        <div className="flex justify-center">
          {/* Who Can Join */}
          <div
            ref={card1Ref}
            className={`bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 transition-all duration-700 max-w-2xl w-full ${
              card1Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Users className="w-8 h-8 text-coral" strokeWidth={1.5} />
              <h3 className="text-3xl font-bold text-text-dark">Who Can Join</h3>
            </div>
            <div className="flex flex-col gap-4">
              {whoCanJoin.map((item) => (
                <div
                  key={item.badge}
                  className="flex items-start gap-4 p-4 rounded-xl bg-beige hover:bg-cream transition-colors"
                >
                  <span className="bg-coral/10 text-coral text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap mt-0.5">
                    {item.badge}
                  </span>
                  <p className="text-text-medium text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
