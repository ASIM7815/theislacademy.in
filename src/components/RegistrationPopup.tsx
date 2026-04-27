"use client";
import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { GraduationCap, Calendar, CheckCircle, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function RegistrationPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  void submitted;

  useEffect(() => {
    const event = new CustomEvent('registration-popup-change', { detail: { isOpen } });
    window.dispatchEvent(event);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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
            source: "popup",
          },
        ]);

      if (supabaseError) {
        console.error("Supabase error:", supabaseError);
        setError("Failed to save registration. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Open WhatsApp
      const message = `Hi ISL Academy, I'd like to register for the program.%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AEducation: ${encodeURIComponent(education)}`;
      window.open(`https://wa.me/918897860944?text=${message}`, "_blank");
      
      e.currentTarget.reset();
      setIsOpen(false);
      setSubmitted(true);
    } catch (err) {
      console.error("Error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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

          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="mb-6">
              <span className="text-coral text-xs font-semibold uppercase tracking-widest">
                Join Us
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-text-dark mt-2 mb-3 leading-tight">
                Register Now
              </h2>
              <div className="w-12 h-1 bg-coral rounded-full mb-3" />
              <p className="text-text-medium text-sm leading-relaxed">
                Take the first step towards building your leadership skills,
                business acumen, and communication confidence.
              </p>
            </div>

            {/* Info items */}
            <div className="flex flex-col gap-2 mb-6">
              {([
                { icon: GraduationCap, text: "Open to Intermediate, Undergraduate & Foundation students" },
                { icon: Calendar, text: "Year-round program from June to March" },
                { icon: CheckCircle, text: "100% activity-based — no traditional exams" },
              ] as { icon: LucideIcon; text: string }[]).map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <span className="w-7 h-7 flex items-center justify-center bg-coral/10 rounded-lg flex-shrink-0">
                    <item.icon className="w-3.5 h-3.5 text-coral" strokeWidth={1.5} />
                  </span>
                  <span className="text-text-medium text-xs">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-4 text-xs">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label
                  htmlFor="popup-name"
                  className="block text-xs font-medium text-text-dark mb-1.5"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="popup-name"
                  name="name"
                  required
                  placeholder="Enter your full name"
                  className="w-full px-3 py-2.5 rounded-xl bg-beige border border-gray-200 text-text-dark text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="popup-email"
                  className="block text-xs font-medium text-text-dark mb-1.5"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="popup-email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="w-full px-3 py-2.5 rounded-xl bg-beige border border-gray-200 text-text-dark text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="popup-phone"
                  className="block text-xs font-medium text-text-dark mb-1.5"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="popup-phone"
                  name="phone"
                  required
                  placeholder="Enter your phone number"
                  className="w-full px-3 py-2.5 rounded-xl bg-beige border border-gray-200 text-text-dark text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="popup-educationLevel"
                  className="block text-xs font-medium text-text-dark mb-1.5"
                >
                  Education Level
                </label>
                <select
                  id="popup-educationLevel"
                  name="educationLevel"
                  required
                  className="w-full px-3 py-2.5 rounded-xl bg-beige border border-gray-200 text-text-dark text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all appearance-none"
                >
                  <option value="">Select your education level</option>
                  <option value="10th">10th</option>
                  <option value="Intermediate/Diploma/12th">Intermediate/Diploma/12th</option>
                  <option value="Graduation">Graduation</option>
                  <option value="Post Graduation">Post Graduation</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="popup-educationStatus"
                  className="block text-xs font-medium text-text-dark mb-1.5"
                >
                  Education Status
                </label>
                <select
                  id="popup-educationStatus"
                  name="educationStatus"
                  required
                  className="w-full px-3 py-2.5 rounded-xl bg-beige border border-gray-200 text-text-dark text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all appearance-none"
                >
                  <option value="">Select your education status</option>
                  <option value="Pursuing">Pursuing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-coral hover:bg-coral-dark text-white py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-coral/30 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Register Now"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
