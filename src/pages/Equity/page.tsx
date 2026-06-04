import React, { useState } from "react";
import { calculateEquityAndBorrowing } from "../../helpers/equityHelper";
import InputSection from "../../components/Equity/InputSection";
import ResultsSection from "../../components/Equity/ResultsSection";
import WealthBar from "../../components/Equity/WealthBar";
import MathExplanation from "../../components/Equity/MathExplanation";

export default function EquityCalculatorPage() {
  const [homeValue, setHomeValue] = useState(800000);
  const [mortgage, setMortgage] = useState(500000);
  const [savings, setSavings] = useState(0);
  const [propertyType, setPropertyType] = useState("new_build");

  const results = calculateEquityAndBorrowing({
    homeValue,
    mortgage,
    savings,
    propertyType: propertyType === "existing" ? "existing" : "new_build",
  });

  return (
    <div
      className="font-sans min-h-screen relative pb-32 md:pb-20 md:py-10"
      style={{ background: "var(--theme-left-bg)", color: "var(--theme-text-primary)" }}
    >
      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden pt-12 pb-4 px-5 max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <svg className="w-5 h-5" style={{ color: "var(--theme-text-primary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <svg className="w-6 h-6" style={{ color: "var(--theme-text-primary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
        </div>
        <h1 className="text-[34px] font-extrabold tracking-tight leading-none mb-4"
          style={{ color: "var(--theme-text-primary)" }}>
          Equity Calculator
        </h1>
      </div>

      <div className="max-w-[1200px] mx-auto md:px-4 sm:px-6 lg:px-8">

        {/* --- DESKTOP HEADER --- */}
        <div className="hidden md:block mb-10 text-center md:text-left">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3"
            style={{ color: "var(--theme-text-secondary)" }}>
            — Equity & Leverage Calculator
          </p>
          <h1 className="text-4xl md:text-[44px] font-extrabold mb-4 leading-tight tracking-tight"
            style={{ color: "var(--theme-text-primary)" }}>
            See what your home could help <br className="hidden md:block" />
            you <span style={{ color: "var(--theme-highlight)" }}>buy next.</span>
          </h1>
          <p className="max-w-2xl text-[15px] leading-relaxed md:text-base"
            style={{ color: "var(--theme-text-secondary)" }}>
            Enter the value of your home, your mortgage, and any savings. We'll show
            your useable equity and an indicative purchasing power based on standard
            NZ bank lending criteria.
          </p>
        </div>

        {/* --- MOBILE HERO TEXT --- */}
        <div className="md:hidden bg-white px-5 pt-8 pb-10">
          <p className="text-[10px] font-bold tracking-widest uppercase mb-3 flex items-center gap-2"
            style={{ color: "var(--theme-highlight)" }}>
            <span className="w-6 h-px" style={{ background: "var(--theme-highlight)" }} />
            Equity & Leverage Calculator
          </p>
          <h2 className="text-[28px] font-bold leading-[1.2] mb-4 tracking-tight"
            style={{ color: "var(--theme-text-primary)" }}>
            See what your home could help you{" "}
            <span style={{ color: "var(--theme-highlight)" }}>buy next.</span>
          </h2>
          <p className="text-[14px] leading-relaxed"
            style={{ color: "var(--theme-text-secondary)" }}>
            Enter the value of your home, your mortgage, and any savings. We'll show
            your useable equity and an indicative purchasing power based on standard
            NZ bank lending criteria.
          </p>
        </div>

        {/* --- MAIN GRID & LAYOUT --- */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-0 md:gap-6 lg:gap-8 mb-0 md:mb-16">

          {/* Column 1: Results & Visualization */}
          <div className="order-1 md:order-2 lg:col-span-7 flex flex-col gap-0 md:gap-6">
            <ResultsSection results={results} propertyType={propertyType} />

            <div className="px-5 md:px-0 -mt-6 md:mt-0 relative z-10 md:z-auto">
              <WealthBar
                homeValue={homeValue}
                mortgage={mortgage}
                savings={savings}
                useableEquity={results.useableEquity}
              />
            </div>

            {/* Desktop CTA Card */}
            <div
              className="hidden md:flex p-8 rounded-[24px] text-white flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg"
              style={{ background: "var(--theme-button)" }}
            >
              <div className="max-w-md">
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2 text-white/80">Next Step</p>
                <h3 className="text-2xl font-bold mb-2 tracking-tight">Turn these numbers into a plan.</h3>
                <p className="text-sm text-white/90 leading-relaxed">
                  Book a free, no-obligation chat with a Staircase adviser. We'll walk through your numbers, structure, and what's realistically next.
                </p>
              </div>
              <button
                className="bg-white px-6 py-3.5 rounded-xl font-bold text-sm whitespace-nowrap hover:bg-gray-50 transition-colors shadow-sm"
                style={{ color: "var(--theme-text-primary)" }}
              >
                Book a free consultation →
              </button>
            </div>
          </div>

          {/* Column 2: Inputs */}
          <div className="order-2 md:order-1 lg:col-span-5 px-5 md:px-0 mt-6 md:mt-0">
            <div className="bg-white p-6 md:p-8 rounded-[20px] md:rounded-[24px] shadow-[0_2px_15px_rgba(0,0,0,0.03)] md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 md:border-gray-100/50">
              <InputSection
                homeValue={homeValue}
                setHomeValue={setHomeValue}
                mortgage={mortgage}
                setMortgage={setMortgage}
                savings={savings}
                setSavings={setSavings}
                propertyType={propertyType}
                setPropertyType={setPropertyType}
              />
            </div>
          </div>
        </div>

        {/* --- BOTTOM MATH SECTION --- */}
        <div className="px-5 md:px-0 mt-6 md:mt-0">
          <MathExplanation
            homeValue={homeValue}
            mortgage={mortgage}
            savings={savings}
            results={results}
          />
        </div>

        {/* Desktop Legal Footer */}
        <p className="hidden md:block text-[11px] mt-8 max-w-4xl leading-relaxed"
          style={{ color: "var(--theme-text-secondary)" }}>
          Figures are indicative only and do not constitute lending or financial advice. Lender criteria,
          serviceability, deposit requirements and the Reserve Bank's LVR settings change over time and vary
          by lender. Speak with a Staircase Financial Adviser for advice tailored to your situation.
        </p>
      </div>

      {/* --- MOBILE STICKY CTA --- */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 p-5 z-50 flex justify-center pointer-events-none"
        style={{ background: `linear-gradient(to top, var(--theme-left-bg), var(--theme-left-bg), transparent)` }}
      >
        <div className="w-full max-w-xl pointer-events-auto">
          <button
            className="w-full text-white py-4 rounded-2xl font-bold text-[16px] flex items-center justify-center gap-2"
            style={{ background: "var(--theme-button)" }}
          >
            Book a free consultation
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}