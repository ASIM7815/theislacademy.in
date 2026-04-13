"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#core-modules", label: "Modules" },
  { href: "#entrepreneurship", label: "Pathways" },
  { href: "#register", label: "Register" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      setHidden(currentY > lastY && currentY > 100);
      lastY = currentY;

      const sections = document.querySelectorAll("section[id]");
      let current = "home";
      sections.forEach((section) => {
        const el = section as HTMLElement;
        const top = el.offsetTop - 120;
        if (currentY >= top) {
          current = el.id;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = (el as HTMLElement).offsetTop - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-[#0d1b2e] shadow-lg shadow-black/30 py-3"
          : "bg-[#0d1b2e]/80 backdrop-blur-md py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/LOGO-2.png"
            alt="ISL Academy"
            width={240}
            height={120}
            quality={100}
            className="object-contain h-20 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.slice(0, -1).map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`text-sm font-medium transition-colors duration-200 hover:text-coral ${
                activeSection === link.href.slice(1)
                  ? "text-coral"
                  : "text-white/90"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#register"
            onClick={(e) => handleClick(e, "#register")}
            className="bg-coral hover:bg-coral-dark text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-coral/30"
          >
            Register Now
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              mobileOpen
                ? "rotate-45 translate-y-2 bg-white"
                : "bg-white"
            }`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              mobileOpen
                ? "opacity-0"
                : "bg-white"
            }`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              mobileOpen
                ? "-rotate-45 -translate-y-2 bg-white"
                : "bg-white"
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-screen w-72 bg-white shadow-2xl z-50 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 pt-20 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`text-lg font-medium py-3 px-4 rounded-xl transition-colors ${
                activeSection === link.href.slice(1)
                  ? "text-coral bg-coral/5"
                  : "text-text-dark hover:bg-beige"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#register"
            onClick={(e) => handleClick(e, "#register")}
            className="mt-4 bg-coral text-white py-3 px-6 rounded-full text-center font-semibold hover:bg-coral-dark transition-colors"
          >
            Register Now
          </a>
        </div>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </nav>
  );
}
