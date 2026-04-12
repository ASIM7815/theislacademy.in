"use client";
import { useInView } from "@/hooks/useInView";

const pathways = [
  {
    num: "01",
    icon: "🧠",
    title: "Entrepreneurial Mindset",
    desc: "Developing entrepreneurial mindset and opportunity identification",
  },
  {
    num: "02",
    icon: "💡",
    title: "Pre-Incubation & Validation",
    desc: "Exploring ideas through pre-incubation and idea validation",
  },
  {
    num: "03",
    icon: "🏭",
    title: "Ecosystem Awareness",
    desc: "Introduction to incubation and start-up ecosystem",
  },
  {
    num: "04",
    icon: "💹",
    title: "Business Models & Revenue",
    desc: "Understanding value creation and business models",
  },
  {
    num: "05",
    icon: "💰",
    title: "Funding & Investor Awareness",
    desc: "Building confidence in engaging with financial ecosystems",
  },
  {
    num: "06",
    icon: "⚖️",
    title: "Responsible Entrepreneurship",
    desc: "Statutory awareness and responsible entrepreneurship",
  },
];

const tags = ["Labs", "Simulations", "Case Studies", "Group Tasks", "Field Visits"];

export default function Entrepreneurship() {
  const { ref: headRef, isVisible: headVisible } = useInView();
  const { ref: gridRef, isVisible: gridVisible } = useInView(0.05);
  const { ref: tagsRef, isVisible: tagsVisible } = useInView();

  return (
    <section
      id="entrepreneurship"
      className="bg-cream py-20 md:py-28 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5">
        <div
          ref={headRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-coral text-sm font-semibold uppercase tracking-widest">
            Pathways
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mt-3">
            Entrepreneurship Pathways
          </h2>
          <div className="w-16 h-1 bg-coral mx-auto mt-4 rounded-full" />
          <p className="text-text-medium mt-6 max-w-xl mx-auto">
            Nurture Potential &bull; Expand Thinking &bull; Recognize Opportunities
          </p>
        </div>

        {/* Intro card */}
        <div
          className={`bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 mb-10 max-w-3xl mx-auto text-center transition-all duration-700 ${
            headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <p className="text-text-medium leading-relaxed">
            Our entrepreneurship pathways guide students through a structured
            journey from mindset development to responsible business creation,
            equipping them with real-world skills at every stage.
          </p>
        </div>

        {/* Pathway Grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pathways.map((p, i) => (
            <div
              key={p.num}
              className={`group bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 ${
                gridVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="gradient-text text-3xl font-extrabold">{p.num}</span>
                <span className="w-10 h-10 flex items-center justify-center bg-navy/5 rounded-xl text-xl group-hover:bg-coral/10 transition-colors">
                  {p.icon}
                </span>
              </div>
              <h3 className="font-bold text-lg text-text-dark mb-2 group-hover:text-coral transition-colors">
                {p.title}
              </h3>
              <p className="text-text-medium text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Learning Experience Tags */}
        <div
          ref={tagsRef}
          className={`mt-14 text-center transition-all duration-700 ${
            tagsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h4 className="text-lg font-semibold text-text-dark mb-5">
            Learning Experience
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-navy text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-coral transition-colors duration-200 cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-text-medium text-sm mt-6 max-w-xl mx-auto leading-relaxed">
            Every pathway is driven by activity-based learning, ensuring students
            gain practical outcomes they can apply immediately.
          </p>
        </div>
      </div>
    </section>
  );
}
