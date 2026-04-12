"use client";
import { useState, FormEvent } from "react";
import { useInView } from "@/hooks/useInView";

export default function Registration() {
  const { ref, isVisible } = useInView(0.1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Registration data:", data);
    setSubmitted(true);
    e.currentTarget.reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="register" className="bg-white py-20 md:py-28 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-coral/5 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gold/5 pointer-events-none" />

      <div ref={ref} className="max-w-6xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side: Info */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-coral text-sm font-semibold uppercase tracking-widest">
              Join Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mt-3 mb-6">
              Register Now
            </h2>
            <div className="w-16 h-1 bg-coral rounded-full mb-6" />
            <p className="text-text-medium leading-relaxed mb-8">
              Take the first step towards building your leadership skills,
              business acumen, and communication confidence. Fill out the form
              to reserve your spot in our transformative program.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { icon: "🎓", text: "Open to Intermediate, Undergraduate & Foundation students" },
                { icon: "📅", text: "Year-round program from June to March" },
                { icon: "✅", text: "100% activity-based — no traditional exams" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center bg-coral/10 rounded-lg text-base">
                    {item.icon}
                  </span>
                  <span className="text-text-medium text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side: Form */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-beige rounded-2xl p-8 md:p-10 border border-gray-100">
              {submitted && (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-6 text-sm font-medium">
                  Thank you for registering! We will contact you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-text-dark mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-text-dark text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-text-dark mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-text-dark text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-text-dark mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-text-dark text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="education"
                    className="block text-sm font-medium text-text-dark mb-2"
                  >
                    Education Level
                  </label>
                  <select
                    id="education"
                    name="education"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-text-dark text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all appearance-none"
                  >
                    <option value="">Select your education level</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="foundation">Foundation Program</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-text-dark mb-2"
                  >
                    Why do you want to join? (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Tell us about your goals..."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-text-dark text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-coral hover:bg-coral-dark text-white py-3.5 rounded-xl font-semibold text-base transition-all duration-200 hover:shadow-lg hover:shadow-coral/30 mt-2"
                >
                  Submit Registration
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
