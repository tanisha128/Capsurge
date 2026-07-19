"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Cpu, Coins, BarChart3, ShieldCheck } from "lucide-react";

const SERVICES = [
  {
    title: "Your Strategic CFO Office",
    tagline: "Strategic financial leadership.",
    description: "Strategic financial leadership without the full-time cost. We embed ourselves into your business as your CFO — planning, reporting, and decision-making included.",
    features: ["Cash Flow Forecasting", "Board & Investor Reporting", "Operational Finance", "Strategic Budgeting"],
    iconName: "TrendingUp",
    gradient: "from-blue-600/10 via-indigo-600/5 to-purple-600/5",
    accentBorder: "border-blue-500/30",
    glowColor: "rgba(59, 130, 246, 0.15)"
  },
  {
    title: "AI-Enabled Finance Automation",
    tagline: "Intelligent, scalable workflows.",
    description: "We identify manual, time-consuming finance processes and replace them with intelligent, scalable automation — from reconciliation to reporting.",
    features: ["AP/AR Automation", "Automated Reconciliation", "Data Unification", "Real-time Dashboards"],
    iconName: "Cpu",
    gradient: "from-amber-600/10 via-orange-600/5 to-yellow-600/5",
    accentBorder: "border-secondary/30",
    glowColor: "rgba(245, 158, 11, 0.15)"
  },
  {
    title: "Capital Raise & M&A Advisory",
    tagline: "End-to-end fundraising support.",
    description: "From deal structuring and valuation to investor outreach and closure, we manage the end-to-end fundraising journey so founders can focus on building.",
    features: ["Deal Structuring", "Valuation Modeling", "Investor Outreach", "Due Diligence Support"],
    iconName: "Coins",
    gradient: "from-emerald-600/10 via-teal-600/5 to-cyan-600/5",
    accentBorder: "border-emerald-500/30",
    glowColor: "rgba(16, 185, 129, 0.15)"
  },
  {
    title: "Financial Planning & Valuation",
    tagline: "Confidential, accurate numbers.",
    description: "Scenario-based financial models, business plans, and valuation frameworks that give leadership and investors full confidence in the numbers.",
    features: ["Scenario Modeling", "Business Planning", "Valuation Frameworks", "Investor Presentations"],
    iconName: "BarChart3",
    gradient: "from-purple-600/10 via-pink-600/5 to-indigo-600/5",
    accentBorder: "border-purple-500/30",
    glowColor: "rgba(168, 85, 247, 0.15)"
  },
  {
    title: "Financial Controls & Governance",
    tagline: "Strengthen stakeholder confidence.",
    description: "Robust internal controls, KPI dashboards, and reporting frameworks that reduce risk, improve compliance, and strengthen stakeholder confidence.",
    features: ["Audit Readiness", "Compliance Frameworks", "KPI Dashboards", "Stakeholder Reporting"],
    iconName: "ShieldCheck",
    gradient: "from-rose-600/10 via-pink-600/5 to-red-600/5",
    accentBorder: "border-rose-500/30",
    glowColor: "rgba(244, 63, 94, 0.15)"
  },
  {
    title: "Autonomous AI & Workflow Automation",
    tagline: "Intelligent operations 24/7.",
    description: "Deploy intelligent AI agents that bridge ecosystems, handling complex logic and high-volume tasks round the clock.",
    features: ["Lead Scoring", "Auto-Reconciliation", "Dynamic Orchestration", "Operational AI"],
    iconName: "Cpu",
    gradient: "from-fuchsia-600/10 via-purple-600/5 to-pink-600/5",
    accentBorder: "border-fuchsia-500/30",
    glowColor: "rgba(217, 70, 239, 0.15)"
  }
];

export function ServicesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-play interval
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % SERVICES.length);
    }, 4000); // changes slide every 4 seconds
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % SERVICES.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
  };

  const renderIcon = (name: string, className: string) => {
    switch (name) {
      case "TrendingUp": return <TrendingUp className={className} />;
      case "Cpu": return <Cpu className={className} />;
      case "Coins": return <Coins className={className} />;
      case "BarChart3": return <BarChart3 className={className} />;
      case "ShieldCheck": return <ShieldCheck className={className} />;
      default: return <TrendingUp className={className} />;
    }
  };

  return (
    <div className="w-full relative overflow-hidden py-8">
      {/* Cards Viewport Wrapper */}
      <div 
        className="w-full flex justify-center items-center py-6 px-4"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full max-w-4xl flex items-center justify-center min-h-[460px] md:min-h-[420px]">
            {SERVICES.map((service, index) => {
              // Calculate offset index relative to active slide
              let offset = index - activeIndex;
              if (offset < -1) offset += SERVICES.length;
              if (offset > 1) offset -= SERVICES.length;

              const isVisible = Math.abs(offset) <= 1;
              const isActive = index === activeIndex;
              const isPrev = offset === -1;
              const isNext = offset === 1;

              // Calculate positions: hidden cards are pushed further out
              const baseOffset = isMobile ? 140 : 320;
              const hiddenOffset = isMobile ? 280 : 640;
              
              let xOffset = 0;
              if (isPrev) xOffset = -baseOffset;
              else if (isNext) xOffset = baseOffset;
              else if (!isVisible) xOffset = offset < 0 ? -hiddenOffset : hiddenOffset;

              const scaleVal = isActive ? 1.0 : (isMobile ? 0.76 : 0.88);
              const opacityVal = isActive ? 1 : isVisible ? 0.45 : 0;

              return (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{
                    opacity: opacityVal,
                    scale: scaleVal,
                    x: xOffset,
                    zIndex: isActive ? 10 : isVisible ? 5 : 0,
                    filter: isActive ? "blur(0px)" : "blur(1.5px)",
                    pointerEvents: isVisible ? "auto" : "none"
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 1
                  }}
                  onClick={() => {
                    if (!isActive) setActiveIndex(index);
                  }}
                  style={{
                    boxShadow: isActive ? `0 20px 40px -15px ${service.glowColor}` : "none",
                  }}
                  className={`absolute w-[90vw] md:w-[480px] h-[430px] md:h-[400px] p-6 md:p-8 rounded-2xl cursor-pointer select-none border flex flex-col justify-between transition-all duration-500 bg-white/5 backdrop-blur-xl border-white/10 ${
                    isActive ? `border-secondary/60 bg-gradient-to-br ${service.gradient}` : "border-white/5 hover:border-white/20"
                  }`}
                >
                  {/* Content Group (Header, Description, Highlights) */}
                  <div className="flex flex-col flex-grow">
                    {/* Card Header */}
                    <div className="flex items-center gap-4 mb-4 md:mb-5">
                      <div className={`p-3 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isActive ? "bg-secondary text-white shadow-lg shadow-secondary/20" : "bg-white/10 text-white/80"
                      }`}>
                        {renderIcon(service.iconName, "w-6 h-6")}
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-extrabold tracking-tight text-white mb-0.5">
                          {service.title}
                        </h3>
                        <p className="text-[11px] md:text-xs text-secondary font-semibold font-sans">
                          {service.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Card Description */}
                    <p className="text-xs md:text-sm text-white/80 font-sans leading-relaxed mb-4 md:mb-5">
                      {service.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="grid grid-cols-1 gap-2 mt-auto">
                      {service.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
                          <span className="font-sans text-sm md:text-base font-medium text-white/90">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              );
            })}
        </div>
      </div>

      {/* CSS adjustments for stacking on small viewports */}
      <style jsx global>{`
        @media (max-width: 767px) {
          /* Shrink offset distances slightly on mobile so cards fit comfortably */
          .relative > div:first-child {
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </div>
  );
}
