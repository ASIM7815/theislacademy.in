"use client";
import { useEffect } from "react";

export default function ScrollManager() {
  useEffect(() => {
    // Prevent auto-scroll on page load
    if (typeof window !== "undefined") {
      // Scroll to top on mount
      window.scrollTo(0, 0);
      
      // Prevent hash-based scrolling
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
  }, []);

  return null;
}
