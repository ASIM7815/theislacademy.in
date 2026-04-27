"use client";
import { useState } from "react";
import Link from "next/link";
import { MessageCircle, X } from "lucide-react";

export default function FloatingChatButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href="/faq">
      <div
        className="fixed bottom-6 right-6 z-50 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Tooltip */}
        <div
          className={`absolute bottom-full right-0 mb-3 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <div className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-xl whitespace-nowrap text-sm font-medium">
            Have questions? Chat with us! 💬
            <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
          </div>
        </div>

        {/* Button */}
        <button
          className="bg-gradient-to-r from-coral to-coral-dark text-white rounded-full p-4 shadow-2xl hover:shadow-coral/50 transition-all duration-300 hover:scale-110 animate-pulse hover:animate-none"
          aria-label="Open chat"
        >
          <MessageCircle className="w-7 h-7" />
        </button>

        {/* Notification Badge */}
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
          !
        </span>
      </div>
    </Link>
  );
}
