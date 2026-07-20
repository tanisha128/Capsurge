"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Coins, Cpu, ShieldCheck, TrendingUp } from "lucide-react";

const SERVICES = [
  {
    title: "Corporate Finance Advisory",
    tagline: "Strategic financial leadership.",
    description:
      "Strategic financial leadership without the full-time cost. We embed ourselves into your business as your CFO - planning, reporting, and decision-making included.",
    features: [
      "Cash Flow Forecasting",
      "Board & Investor Reporting",
      "Operational Finance",
      "Strategic Budgeting",
    ],
    iconName: "TrendingUp",
    gradient: "from-blue-600/10 via-indigo-600/5 to-purple-600/5",
    accentBorder: "border-blue-500/30",
    glowColor: "rgba(59, 130, 246, 0.15)",
  },
  {
    title: "AI-Enabled Finance Automation",
    tagline: "Intelligent, scalable workflows.",
    description:
      "We identify manual, time-consuming finance processes and replace them with intelligent, scalable automation - from reconciliation to reporting.",
    features: [
      "AP/AR Automation",
      "Automated Reconciliation",
      "Data Unification",
      "Real-time Dashboards",
    ],
    iconName: "Cpu",
    gradient: "from-amber-600/10 via-orange-600/5 to-yellow-600/5",
    accentBorder: "border-secondary/30",
    glowColor: "rgba(245, 158, 11, 0.15)",
  },
  {
    title: "Capital Raise & M&A Advisory",
    tagline: "End-to-end fundraising support.",
    description:
      "From deal structuring and valuation to investor outreach and closure, we manage the end-to-end fundraising journey so founders can focus on building.",
    features: [
      "Deal Structuring",
      "Valuation Modeling",
      "Investor Outreach",
      "Due Diligence Support",
    ],
    iconName: "Coins",
    gradient: "from-emerald-600/10 via-teal-600/5 to-cyan-600/5",
    accentBorder: "border-emerald-500/30",
    glowColor: "rgba(16, 185, 129, 0.15)",
  },
  {
    title: "Financial Planning & Valuation",
    tagline: "Confidential, accurate numbers.",
    description:
      "Scenario-based financial models, business plans, and valuation frameworks that give leadership and investors full confidence in the numbers.",
    features: [
      "Scenario Modeling",
      "Business Planning",
      "Valuation Frameworks",
      "Investor Presentations",
    ],
    iconName: "BarChart3",
    gradient: "from-purple-600/10 via-pink-600/5 to-indigo-600/5",
    accentBorder: "border-purple-500/30",
    glowColor: "rgba(168, 85, 247, 0.15)",
  },
  {
    title: "Financial Controls & Governance",
    tagline: "Strengthen stakeholder confidence.",
    description:
      "Robust internal controls, KPI dashboards, and reporting frameworks that reduce risk, improve compliance, and strengthen stakeholder confidence.",
    features: [
      "Audit Readiness",
      "Compliance Frameworks",
      "KPI Dashboards",
      "Stakeholder Reporting",
    ],
    iconName: "ShieldCheck",
    gradient: "from-rose-600/10 via-pink-600/5 to-red-600/5",
    accentBorder: "border-rose-500/30",
    glowColor: "rgba(244, 63, 94, 0.15)",
  },
  {
    title: "AI-Powered Technology & Automation",
    tagline: "Smarter software. Intelligent automation.",
    description:
      "Leverage advanced AI and modern software solutions to automate workflows, optimize business operations, and accelerate digital transformation with intelligent, scalable technology.",
    features: [
      "Artificial Intelligence",
      "Workflow Automation",
      "Smart Software",
      "Digital Transformation",
    ],
    iconName: "Cpu",
    gradient: "from-fuchsia-600/10 via-purple-600/5 to-pink-600/5",
    accentBorder: "border-fuchsia-500/30",
    glowColor: "rgba(217, 70, 239, 0.15)",
  },
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % SERVICES.length);
    }, 7000);
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
      case "TrendingUp":
        return <TrendingUp className={className} />;
      case "Cpu":
        return <Cpu className={className} />;
      case "Coins":
        return <Coins className={className} />;
      case "BarChart3":
        return <BarChart3 className={className} />;
      case "ShieldCheck":
        return <ShieldCheck className={className} />;
      default:
        return <TrendingUp className={className} />;
    }
  };

  return (
    <div className="relative w-full overflow-hidden py-6 md:py-8">
      <div
        className="flex w-full items-center justify-center px-4 py-4 md:px-6"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative flex min-h-[520px] w-full max-w-[1220px] items-center justify-center md:min-h-[560px]">
          {SERVICES.map((service, index) => {
            let offset = index - activeIndex;
            if (offset < -1) offset += SERVICES.length;
            if (offset > 1) offset -= SERVICES.length;

            const isVisible = Math.abs(offset) <= 1;
            const isActive = index === activeIndex;
            const isPrev = offset === -1;
            const isNext = offset === 1;
            const baseOffset = isMobile ? 136 : 360;
            const hiddenOffset = isMobile ? 280 : 720;

            let xOffset = 0;
            if (isPrev) xOffset = -baseOffset;
            else if (isNext) xOffset = baseOffset;
            else if (!isVisible) xOffset = offset < 0 ? -hiddenOffset : hiddenOffset;

            const scaleVal = isActive ? 1 : isMobile ? 0.84 : 0.86;
            const opacityVal = isActive ? 1 : isVisible ? 0.46 : 0;

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
                  pointerEvents: isVisible ? "auto" : "none",
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 30,
                  mass: 1,
                }}
                onClick={() => {
                  if (!isActive) setActiveIndex(index);
                }}
                style={{
                  boxShadow: isActive ? `0 24px 48px -18px ${service.glowColor}` : "none",
                }}
                className={`absolute flex h-[470px] w-[92vw] max-w-[760px] cursor-pointer select-none flex-col overflow-hidden rounded-[28px] border p-6 backdrop-blur-xl transition-all duration-500 md:h-[500px] md:p-8 ${isActive
                  ? `${service.accentBorder} bg-gradient-to-br ${service.gradient}`
                  : "border-white/8 bg-white/[0.04] hover:border-white/16"
                  }`}
              >
                {isActive && (
                  <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/10 blur-3xl" />
                )}

                <div className="relative flex h-full flex-col">
                  <div className="mb-6 flex items-center gap-5">
                    <div
                      className={`flex shrink-0 items-center justify-center rounded-2xl p-4 transition-all duration-300 md:p-5 ${isActive ? "bg-white/12 text-white" : "bg-white/10 text-white/80"
                        }`}
                    >
                      {renderIcon(service.iconName, "h-10 w-10 md:h-12 md:w-12")}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black leading-tight text-white md:text-4xl">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm font-semibold text-secondary md:text-base">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  {isActive ? (
                    <>

                      <div className="mt-20 grid gap-4 md:grid-cols-2">
                        {service.features.map((feature, fIndex) => (
                          <div
                            key={fIndex}
                            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/10 px-5 py-4"
                          >
                            <div className="h-3 w-3 rounded-full bg-secondary" />
                            <span className="font-sans text-base font-semibold text-white/92 md:text-lg">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>


                    </>
                  ) : (
                    <div className="mt-auto max-w-[28ch] pt-6 text-sm leading-6 text-white/60">
                      {service.description}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 md:mt-6">
        {SERVICES.map((service, index) => (
          <button
            key={service.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${service.title}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-9 bg-secondary" : "w-2.5 bg-white/25 hover:bg-white/45"
              }`}
          />
        ))}
      </div>
    </div>
  );
}
