"use client";
import { useInView } from "@/hooks/useInView";
import { Brain, MessageCircle, Mic, Lightbulb, Wallet, Target, Sparkles, Users, TrendingUp, Presentation } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const modules: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Brain,
    title: "Self, Society & Leadership",
    desc: "Building self-awareness, values, ethics, civic responsibility, leadership fundamentals, and strong leadership presence",
  },
  {
    icon: MessageCircle,
    title: "Communication Skills",
    desc: "Verbal and non-verbal communication, body language, listening, everyday and professional English",
  },
  {
    icon: Mic,
    title: "Public Speaking & Confidence",
    desc: "Overcome stage fear, deliver structured speeches, participate in group presentations",
  },
  {
    icon: Lightbulb,
    title: "Business Awareness & Entrepreneurship",
    desc: "Strategic thinking, decision-making, business fundamentals, ethics, idea-to-concept development",
  },
  {
    icon: Wallet,
    title: "Financial Literacy & Aptitude",
    desc: "Money management, saving and budgeting habits, logical thinking, real-life financial decision-making",
  },
  {
    icon: Target,
    title: "Advanced & Elective Learning",
    desc: "Strategic thinking, leadership presence, impact management, personal branding, professional presence",
  },
  {
    icon: Sparkles,
    title: "Idea Validation",
    desc: "Understanding the real problem, testing it with users, and refining the idea based on genuine feedback.",
  },
  {
    icon: Users,
    title: "Incubation / Mentorship",
    desc: "Guided support from experienced mentors to shape, strengthen, and confidently develop the idea.",
  },
  {
    icon: TrendingUp,
    title: "Business Model & Strategy (Core Area)",
    desc: "Designing a clear, sustainable, and scalable approach to revenue, growth, and market positioning.",
  },
  {
    icon: Presentation,
    title: "Investor Pitch / Fundraising",
    desc: "Presenting the idea with clarity, credibility, and vision to attract funding and strategic support.",
  },
];

export default function CoreModules() {
  const { ref: headRef, isVisible: headVisible } = useInView();
  const { ref: gridRef, isVisible: gridVisible } = useInView(0.05);

  return (
    <section id="core-modules" className="bg-white py-20 md:py-28 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-coral/5 pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-gold/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5">
        <div
          ref={headRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-coral text-sm font-semibold uppercase tracking-widest">
            Curriculum
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-text-dark mt-3 leading-tight">
            Core Modules
          </h2>
          <div className="w-16 h-1 bg-coral mx-auto mt-4 rounded-full" />
          <p className="text-text-medium text-base md:text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Developing confident, capable, and future-ready individuals through
            personal growth, professional skills, and leadership training
          </p>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, i) => (
            <div
              key={mod.title}
              className={`group bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 relative overflow-hidden ${
                gridVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Coral left accent on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-coral scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center rounded-full" />

              <div className="w-14 h-14 flex items-center justify-center bg-navy/5 rounded-2xl mb-5 group-hover:bg-coral/10 transition-colors duration-300">
                <mod.icon className="w-7 h-7 text-coral" strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-xl text-text-dark mb-3 group-hover:text-coral transition-colors duration-300">
                {mod.title}
              </h3>
              <p className="text-text-medium text-base leading-relaxed">
                {mod.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
