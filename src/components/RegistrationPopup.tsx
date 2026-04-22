"use client";
import { useState, useEffect, FormEvent } from "react";
import { GraduationCap, Calendar, CheckCircle, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export default function RegistrationPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  void submitted;

  useEffect(() => {
    // Auto-scroll to core-modules section on page load
    const timer = setTimeout(() => {
      const coreModulesSection = document.getElementById("core-modules");
      if (coreModulesSection) {
        coreModulesSection.scrollIntoView({ behavior: "smooth" });
      }
      // Show popup after scroll
      setTimeout(() => {
        setIsOpen(true);
      }, 800);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const education = formData.get("education") as string;
    const message = `Hi ISL Academy, I'd like to register for the program.%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AEducation: ${encodeURIComponent(education)}`;
    window.open(`https://wa.me/918897860944?text=${message}`, "_blank");
    e.currentTarget.reset();
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
      />

      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto transform transition-all duration-300 scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="mb-8">
              <span className="text-coral text-sm font-semibold uppercase tracking-widest">
                Join Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark mt-3 mb-4 leading-tight">
                Register Now
              </h2>
              <div className="w-16 h-1 bg-coral rounded-full mb-4" />
              <p className="text-text-medium text-base leading-relaxed">
                Take the first step towards building your leadership skills,
                business acumen, and communication confidence.
              </p>
            </div>

            {/* Info items */}
            <div className="flex flex-col gap-3 mb-8">
              {([
                { icon: GraduationCap, text: "Open to Intermediate, Undergraduate & Foundation students" },
                { icon: Calendar, text: "Year-round program from June to March" },
                { icon: CheckCircle, text: "100% activity-based — no traditional exams" },
              ] as { icon: LucideIcon; text: string }[]).map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center bg-coral/10 rounded-lg flex-shrink-0">
                    <item.icon className="w-4 h-4 text-coral" strokeWidth={1.5} />
                  </span>
                  <span className="text-text-medium text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="popup-name"
                  className="block text-sm font-medium text-text-dark mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="popup-name"
                  name="name"
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-xl bg-beige border border-gray-200 text-text-dark text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="popup-email"
                  className="block text-sm font-medium text-text-dark mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="popup-email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl bg-beige border border-gray-200 text-text-dark text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="popup-phone"
                  className="block text-sm font-medium text-text-dark mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="popup-phone"
                  name="phone"
                  required
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 rounded-xl bg-beige border border-gray-200 text-text-dark text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="popup-education"
                  className="block text-sm font-medium text-text-dark mb-2"
                >
                  Education Level
                </label>
                <select
                  id="popup-education"
                  name="education"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-beige border border-gray-200 text-text-dark text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all appearance-none"
                >
                  <option value="">Select your education level</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="foundation">Foundation Program</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-coral hover:bg-coral-dark text-white py-3.5 rounded-xl font-semibold text-base transition-all duration-200 hover:shadow-lg hover:shadow-coral/30 mt-2"
              >
                Register Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
