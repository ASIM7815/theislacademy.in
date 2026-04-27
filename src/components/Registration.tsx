"use client";
import { useState, FormEvent } from "react";
import { useInView } from "@/hooks/useInView";
import { GraduationCap, Calendar, CheckCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Registration() {
  const { ref, isVisible } = useInView(0.1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  void submitted;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const educationLevel = formData.get("educationLevel") as string;
    const educationStatus = formData.get("educationStatus") as string;
    const education = `${educationLevel} - ${educationStatus}`;
    const message = formData.get("message") as string;

    try {
      // Save to Supabase
      const { error: supabaseError } = await supabase
        .from("registrations")
        .insert([
          {
            name,
            email,
            phone,
            education,
            message: message || null,
            source: "landing_page",
          },
        ]);

      if (supabaseError) {
        console.error("Supabase error:", supabaseError);
        setError("Failed to save registration. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Open WhatsApp
      const whatsappMessage = `Hi ISL Academy, I'd like to register for the program.%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AEducation: ${encodeURIComponent(education)}`;
      window.open(`https://wa.me/918897860944?text=${whatsappMessage}`, "_blank");
      
      e.currentTarget.reset();
      setSubmitted(true);
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error("Error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-text-dark mt-3 mb-6 leading-tight">
              Register Now
            </h2>
            <div className="w-16 h-1 bg-coral rounded-full mb-6" />
            <p className="text-text-medium text-base md:text-lg leading-relaxed mb-8">
              Take the first step towards building your leadership skills,
              business acumen, and communication confidence. Fill out the form
              to reserve your spot in our transformative program.
            </p>

            <div className="flex flex-col gap-4">
              {([
                { icon: GraduationCap, text: "Open to Intermediate, Undergraduate & Foundation students" },
                { icon: Calendar, text: "Year-round program from June to March" },
                { icon: CheckCircle, text: "100% activity-based — no traditional exams" },
              ] as { icon: LucideIcon; text: string }[]).map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center bg-coral/10 rounded-lg">
                    <item.icon className="w-4 h-4 text-coral" strokeWidth={1.5} />
                  </span>
                  <span className="text-text-medium text-base">{item.text}</span>
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

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-sm">
                  {error}
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
                    htmlFor="educationLevel"
                    className="block text-sm font-medium text-text-dark mb-2"
                  >
                    Education Level
                  </label>
                  <select
                    id="educationLevel"
                    name="educationLevel"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-text-dark text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all appearance-none"
                  >
                    <option value="">Select your education level</option>
                    <option value="10th">10th</option>
                    <option value="Intermediate/Diploma/12th">Intermediate/Diploma/12th</option>
                    <option value="Graduation">Graduation</option>
                    <option value="Post Graduation">Post Graduation</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="educationStatus"
                    className="block text-sm font-medium text-text-dark mb-2"
                  >
                    Education Status
                  </label>
                  <select
                    id="educationStatus"
                    name="educationStatus"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-text-dark text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all appearance-none"
                  >
                    <option value="">Select your education status</option>
                    <option value="Pursuing">Pursuing</option>
                    <option value="Completed">Completed</option>
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
                  disabled={isSubmitting}
                  className="w-full bg-coral hover:bg-coral-dark text-white py-3.5 rounded-xl font-semibold text-base transition-all duration-200 hover:shadow-lg hover:shadow-coral/30 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Register Now"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
