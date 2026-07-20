"use client";

import React from "react";
import { motion } from "framer-motion";

export function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  // Cubic bezier easing for a premium, buttery-smooth reveal curve
  const revealTransition = { duration: 1.6, ease: [0.25, 1, 0.5, 1] as const };

  return (
    <div className={`relative inline-flex items-center select-none ${className}`}>
      {/* Outer wrapper to manage overflow and clipping */}
      <div className="relative overflow-hidden rounded-sm py-1 px-2">

        {/* Shimmer sweep effect running alongside the disclosure edge */}
        <motion.div
          initial={{ left: "-60%" }}
          animate={{ left: "160%" }}
          transition={revealTransition}
          className="absolute inset-y-0 w-[40%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none z-10"
        />

        {/* The Disclosing Logo Image using clipPath */}
        <motion.img
          src="https://video.clicentrix.com/Public/logo.png"
          alt="CapSurge Logo"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={revealTransition}
          className={`h-16 md:h-24 w-auto object-contain transition-transform duration-300 hover:scale-[1.02] ${
            light ? "brightness-0 invert" : ""
          }`}
        />
      </div>
    </div>
  );
}
