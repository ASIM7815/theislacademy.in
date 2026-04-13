"use client";
import { useInView } from "@/hooks/useInView";
import { MapPin, Clock, Phone, Building2 } from "lucide-react";

export default function Location() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-5">

        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-coral text-sm font-semibold uppercase tracking-widest">
            Campus
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark mt-3 leading-tight">
            Visit Us <span className="gradient-text">In Person</span>
          </h2>
          <div className="w-16 h-1 bg-coral mx-auto mt-4 rounded-full" />
          <p className="text-text-medium text-base md:text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Attend full-time campus sessions at{" "}
            <span className="font-semibold text-text-dark">ISL Engineering College</span>,
            Hyderabad — where learning meets ambition.
          </p>
        </div>

        {/* Map + Info Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">

          {/* Map — takes 2 cols */}
          <div
            className={`lg:col-span-2 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 h-[420px] w-full">
              <iframe
                title="ISL Engineering College, Hyderabad"
                src="https://www.google.com/maps?q=ISL+Engineering+College,+Hyderabad,+Telangana&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Info Cards */}
          <div
            className={`flex flex-col gap-5 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Campus Name */}
            <div className="bg-beige rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 flex items-center justify-center bg-coral/10 rounded-xl">
                  <Building2 className="w-5 h-5 text-coral" strokeWidth={1.5} />
                </div>
                <h4 className="font-bold text-text-dark text-base">Campus</h4>
              </div>
              <p className="text-text-dark font-semibold text-base leading-snug">
                ISL Engineering College
              </p>
              <p className="text-text-medium text-sm mt-1">Hyderabad, Telangana</p>
            </div>

            {/* Address */}
            <div className="bg-beige rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 flex items-center justify-center bg-coral/10 rounded-xl">
                  <MapPin className="w-5 h-5 text-coral" strokeWidth={1.5} />
                </div>
                <h4 className="font-bold text-text-dark text-base">Address</h4>
              </div>
              <p className="text-text-medium text-sm leading-relaxed">
                ISL Engineering College,<br />
                Hyderabad, Telangana, India
              </p>
              <a
                href="https://maps.google.com/?q=ISL+Engineering+College+Hyderabad"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-coral text-sm font-semibold hover:underline"
              >
                Get Directions →
              </a>
            </div>

            {/* Hours */}
            <div className="bg-beige rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 flex items-center justify-center bg-coral/10 rounded-xl">
                  <Clock className="w-5 h-5 text-coral" strokeWidth={1.5} />
                </div>
                <h4 className="font-bold text-text-dark text-base">Programme Duration</h4>
              </div>
              <p className="text-text-medium text-sm leading-relaxed">
                Full-time campus sessions<br />
                <span className="font-semibold text-text-dark">June — March</span><br />
                Activity-based · No Exams
              </p>
            </div>

            {/* CTA */}
            <a
              href="#register"
              onClick={(e) => { e.preventDefault(); document.querySelector("#register")?.scrollIntoView({ behavior: "smooth" }); }}
              className="flex items-center justify-center gap-2 bg-coral hover:bg-coral-dark text-white px-6 py-4 rounded-2xl font-semibold text-base transition-all duration-200 hover:shadow-xl hover:shadow-coral/30 hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4" strokeWidth={2} />
              Reserve Your Seat
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
