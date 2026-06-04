import  { useState } from "react";
import type { EquityResults } from "./ResultsSection";

interface Props {
  homeValue: number;
  mortgage: number;
  savings: number;
  results: EquityResults;
}

export default function MathExplanation({ homeValue, mortgage, savings, results }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const formatCurrency = (val: number) => new Intl.NumberFormat("en-NZ").format(val);
  const bufferAmt = homeValue * 0.2;
  const depositPctStr = results.depositRequirementPercentage.toFixed(0);

  return (
    <>
      {/* ========== MOBILE ========== */}
      <div className="md:hidden">

        {/* Accordion header */}
        <div
          className={`bg-white rounded-[20px] p-5 shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-gray-100 cursor-pointer transition-all ${isOpen ? "mb-4" : "mb-5"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-bold text-[16px] mb-0.5" style={{ color: "var(--theme-text-primary)" }}>How it's calculated</h4>
              <p className="text-[13px]" style={{ color: "var(--theme-text-secondary)" }}>The maths, in plain English</p>
            </div>
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              style={{ color: "var(--theme-text-primary)" }}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Expanded steps */}
        {isOpen && (
          <div className="space-y-4 mb-6">
            {/* Step 1 */}
            <div className="bg-white rounded-[20px] p-5 shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-gray-100">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-7 h-7 rounded-full text-white flex items-center justify-center font-bold text-[13px] shrink-0"
                  style={{ background: "var(--theme-text-primary)" }}>1</div>
                <div>
                  <h4 className="font-bold text-[15px]" style={{ color: "var(--theme-text-primary)" }}>Total equity</h4>
                  <p className="text-[12px] font-bold mt-0.5 tracking-wide" style={{ color: "var(--theme-text-secondary)" }}>(Home − Mortgage) + Savings</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-[13px]" style={{ color: "var(--theme-text-secondary)" }}>
                <div className="flex justify-between py-2 border-b border-gray-200/70"><span>Home value</span><span>${formatCurrency(homeValue)}</span></div>
                <div className="flex justify-between py-2 border-b border-gray-200/70"><span>− Mortgage</span><span>${formatCurrency(mortgage)}</span></div>
                <div className="flex justify-between py-2 border-b border-gray-200/70"><span>+ Savings</span><span>${formatCurrency(savings)}</span></div>
                <div className="flex justify-between pt-3 pb-1 font-bold text-[14px]" style={{ color: "var(--theme-text-primary)" }}>
                  <span>Equity</span><span>${formatCurrency(results.totalEquity)}</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-[20px] p-5 shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-gray-100">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-7 h-7 rounded-full text-white flex items-center justify-center font-bold text-[13px] shrink-0"
                  style={{ background: "var(--theme-text-primary)" }}>2</div>
                <div>
                  <h4 className="font-bold text-[15px]" style={{ color: "var(--theme-text-primary)" }}>Bank's 20% buffer</h4>
                  <p className="text-[12px] font-bold mt-0.5 tracking-wide" style={{ color: "var(--theme-text-secondary)" }}>Home × 20%</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-[13px] mb-3" style={{ color: "var(--theme-text-secondary)" }}>
                <div className="flex justify-between py-2 border-b border-gray-200/70"><span>Home value</span><span>${formatCurrency(homeValue)}</span></div>
                <div className="flex justify-between py-2 border-b border-gray-200/70"><span>× 20%</span><span>0.20</span></div>
                <div className="flex justify-between pt-3 pb-1 font-bold text-[14px]" style={{ color: "var(--theme-text-primary)" }}>
                  <span>Protected buffer</span><span>${formatCurrency(bufferAmt)}</span>
                </div>
              </div>
              <p className="text-[12px] px-1" style={{ color: "var(--theme-text-secondary)" }}>Stays in your home — untouchable</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-[20px] p-5 shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-gray-100">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[13px] shrink-0"
                  style={{ background: "color-mix(in srgb, var(--theme-highlight) 15%, white)", color: "var(--theme-highlight)" }}>3</div>
                <div>
                  <h4 className="font-bold text-[15px]" style={{ color: "var(--theme-text-primary)" }}>Useable equity</h4>
                  <p className="text-[12px] font-bold mt-0.5 tracking-wide" style={{ color: "var(--theme-text-secondary)" }}>(Home × 80% − Mortgage) + Savings</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-[13px]" style={{ color: "var(--theme-text-secondary)" }}>
                <div className="flex justify-between py-2 border-b border-gray-200/70"><span>80% of home</span><span>${formatCurrency(homeValue * 0.8)}</span></div>
                <div className="flex justify-between py-2 border-b border-gray-200/70"><span>− Mortgage</span><span>${formatCurrency(mortgage)}</span></div>
                <div className="flex justify-between py-2 border-b border-gray-200/70"><span>Useable home eq.</span><span>${formatCurrency(Math.max(0, (homeValue * 0.8) - mortgage))}</span></div>
                <div className="flex justify-between py-2 border-b border-gray-200/70"><span>+ Savings</span><span>${formatCurrency(savings)}</span></div>
                <div className="flex justify-between pt-3 pb-1 font-bold text-[14px]" style={{ color: "var(--theme-highlight)" }}>
                  <span>Useable equity</span><span>${formatCurrency(results.useableEquity)}</span>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-[20px] p-5 shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-gray-100">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[13px] shrink-0"
                  style={{ background: "color-mix(in srgb, var(--theme-highlight) 15%, white)", color: "var(--theme-highlight)" }}>4</div>
                <div>
                  <h4 className="font-bold text-[15px]" style={{ color: "var(--theme-text-primary)" }}>Purchasing power</h4>
                  <p className="text-[12px] font-bold mt-0.5 tracking-wide" style={{ color: "var(--theme-text-secondary)" }}>Useable equity ÷ Deposit %</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-[13px]" style={{ color: "var(--theme-text-secondary)" }}>
                <div className="flex justify-between py-2 border-b border-gray-200/70"><span>Useable equity</span><span>${formatCurrency(results.useableEquity)}</span></div>
                <div className="flex justify-between py-2 border-b border-gray-200/70"><span>÷ Deposit ({depositPctStr}%)</span><span>{(results.depositRequirementPercentage / 100).toFixed(2)}</span></div>
                <div className="flex justify-between pt-3 pb-1 font-bold text-[14px]" style={{ color: "var(--theme-highlight)" }}>
                  <span>Indicative price</span><span>${formatCurrency(results.borrowingAbility)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info card */}
        <div className="text-white rounded-[20px] p-6 mb-6 shadow-md"
          style={{ background: "var(--theme-text-primary)" }}>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "var(--theme-highlight)" }}>Why these rules</p>
          <h4 className="text-[16px] font-bold mb-3 tracking-tight">RBNZ keeps lending stable</h4>
          <p className="text-[13px] text-gray-300 leading-relaxed">
            Banks must retain 20% equity in owner-occupied homes. Investment properties need bigger deposits (35% existing, 20% new build) under Reserve Bank rules.
          </p>
        </div>

        {/* Legal footer */}
        <p className="text-[11px] leading-relaxed text-center px-2" style={{ color: "var(--theme-text-secondary)" }}>
          Figures are indicative only and don't constitute lending advice. Lender criteria, serviceability and LVR settings vary. Talk to an adviser for advice tailored to you.
        </p>
      </div>

      {/* ========== DESKTOP ========== */}
      <div className="hidden md:block mt-20">
        <div className="mb-8">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "var(--theme-text-secondary)" }}>
            — How it's calculated
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight" style={{ color: "var(--theme-text-primary)" }}>
            The maths, in plain English.
          </h2>
          <p className="text-[15px] mb-8 max-w-2xl leading-relaxed" style={{ color: "var(--theme-text-secondary)" }}>
            Nothing magic happens behind the scenes — just the same lending rules your bank uses. Here's exactly what we do with your three inputs, step by step, using your numbers.
          </p>
        </div>

        {/* Input summary row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Home Value", value: homeValue, note: "What it would sell for today" },
            { label: "Mortgage Owing", value: mortgage, note: "Balance on your existing loan" },
            { label: "Savings", value: savings, note: "Cash toward the next deposit" },
          ].map(({ label, value, note }) => (
            <div key={label} className="bg-white p-5 rounded-[16px] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1.5">{label}</p>
              <p className="text-xl font-bold text-gray-900">${formatCurrency(value)}</p>
              <p className="text-[11px] text-gray-400 mt-1">{note}</p>
            </div>
          ))}
        </div>

        {/* Step cards */}
        <div className="grid grid-cols-2 gap-6 mb-10">

          {/* Step 1 */}
          <div className="bg-white p-8 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm shrink-0"
                style={{ background: "var(--theme-text-primary)" }}>1</div>
              <div>
                <h4 className="font-bold text-lg text-gray-900 tracking-tight">Your total equity</h4>
                <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed">Equity is simply the share of your home you actually own, plus any savings you can put on the table.</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-[13px] font-medium text-gray-800 mb-6 border border-gray-100/50">
              <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase block mb-1.5">Formula</span>
              (Home value - Mortgage) + Savings
            </div>
            <div className="space-y-3.5 text-[14px]">
              <div className="flex justify-between"><span className="text-gray-500">Home value</span><span className="font-semibold text-gray-900">${formatCurrency(homeValue)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Less: mortgage owing</span><span className="font-semibold text-gray-900">- ${formatCurrency(mortgage)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Plus: savings</span><span className="font-semibold text-gray-900">+ ${formatCurrency(savings)}</span></div>
              <div className="h-px bg-gray-100 w-full my-2" />
              <div className="flex justify-between font-bold text-base"><span className="text-gray-900">Total equity</span><span className="text-gray-900">${formatCurrency(results.totalEquity)}</span></div>
              <p className="text-[11px] text-gray-400 mt-1 text-right">Money you've already built</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm shrink-0"
                style={{ background: "var(--theme-text-primary)" }}>2</div>
              <div>
                <h4 className="font-bold text-lg text-gray-900 tracking-tight">The bank's 20% buffer</h4>
                <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed">Banks require you to retain at least 20% equity in your own home. That portion is locked away — it cannot be used to secure another property.</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-[13px] font-medium text-gray-800 mb-6 border border-gray-100/50">
              <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase block mb-1.5">Formula</span>
              Home value × 20%
            </div>
            <div className="space-y-3.5 text-[14px]">
              <div className="flex justify-between"><span className="text-gray-500">Home value</span><span className="font-semibold text-gray-900">${formatCurrency(homeValue)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">× 20% retained equity</span><span className="font-semibold text-gray-900">× 0.20</span></div>
              <div className="h-px bg-gray-100 w-full my-2" />
              <div className="flex justify-between font-bold text-base"><span className="text-gray-900">Protected buffer</span><span className="text-gray-900">${formatCurrency(bufferAmt)}</span></div>
              <p className="text-[11px] text-gray-400 mt-1 text-right">Stays in your home, untouchable</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                style={{ background: "color-mix(in srgb, var(--theme-highlight) 15%, white)", color: "var(--theme-highlight)" }}>3</div>
              <div>
                <h4 className="font-bold text-lg text-gray-900 tracking-tight">Your useable equity</h4>
                <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed">Anything above the 20% buffer — plus your savings — is what the bank will actually let you put toward another property.</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-[13px] font-medium text-gray-800 mb-6 border border-gray-100/50">
              <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase block mb-1.5">Formula</span>
              (Home value × 80% - Mortgage) + Savings
            </div>
            <div className="space-y-3.5 text-[14px]">
              <div className="flex justify-between"><span className="text-gray-500">80% of home value</span><span className="font-semibold text-gray-900">${formatCurrency(homeValue * 0.8)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Less: mortgage owing</span><span className="font-semibold text-gray-900">- ${formatCurrency(mortgage)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Useable home equity</span><span className="font-semibold text-gray-900">${formatCurrency(Math.max(0, (homeValue * 0.8) - mortgage))}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Plus: savings</span><span className="font-semibold text-gray-900">+ ${formatCurrency(savings)}</span></div>
              <div className="h-px bg-gray-100 w-full my-2" />
              <div className="flex justify-between font-bold text-base">
                <span className="text-gray-900">Useable equity</span>
                <span style={{ color: "var(--theme-highlight)" }}>${formatCurrency(results.useableEquity)}</span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1 text-right">What you can deploy</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-8 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                style={{ background: "color-mix(in srgb, var(--theme-highlight) 15%, white)", color: "var(--theme-highlight)" }}>4</div>
              <div>
                <h4 className="font-bold text-lg text-gray-900 tracking-tight">Indicative purchasing power</h4>
                <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed">Your useable equity becomes the deposit on your next property. We divide it by the deposit % required for that type of purchase.</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-[13px] font-medium text-gray-800 mb-6 border border-gray-100/50">
              <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase block mb-1.5">Formula</span>
              Useable equity ÷ Deposit % required
            </div>
            <div className="space-y-3.5 text-[14px]">
              <div className="flex justify-between"><span className="text-gray-500">Useable equity (deposit)</span><span className="font-semibold text-gray-900">${formatCurrency(results.useableEquity)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">÷ Deposit required</span><span className="font-semibold text-gray-900">÷ {(results.depositRequirementPercentage / 100).toFixed(2)}</span></div>
              <div className="h-px bg-gray-100 w-full my-2" />
              <div className="flex justify-between font-bold text-base">
                <span className="text-gray-900">Indicative purchase price</span>
                <span style={{ color: "var(--theme-highlight)" }}>${formatCurrency(results.borrowingAbility)}</span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1 text-right">What you could realistically target</p>
            </div>
          </div>
        </div>

        {/* Footer info cards */}
        <div className="rounded-[24px] p-10 grid grid-cols-3 gap-6 shadow-xl text-white"
          style={{ background: "var(--theme-text-primary)" }}>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "var(--theme-highlight)" }}>Why 20%?</p>
            <h4 className="text-lg font-bold mb-3 tracking-tight">The Reserve Bank's rules</h4>
            <p className="text-[13px] text-gray-300 leading-relaxed">
              The RBNZ uses loan-to-value (LVR) restrictions to keep the system stable. Owner-occupiers must typically keep 20% equity in their home before borrowing against it.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "var(--theme-highlight)" }}>Why Deposit % Varies</p>
            <h4 className="text-lg font-bold mb-3 tracking-tight">Risk weighting by use</h4>
            <p className="text-[13px] text-gray-300 leading-relaxed">
              Banks ask for larger deposits on existing investment properties (35%) than on new builds or owner-occupied second homes (20%) — new builds are exempt under RBNZ rules to support housing supply.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "var(--theme-highlight)" }}>What This Doesn't Cover</p>
            <h4 className="text-lg font-bold mb-3 tracking-tight">Serviceability still applies</h4>
            <p className="text-[13px] text-gray-300 leading-relaxed">
              Having the deposit is half the story. The bank also tests whether your income comfortably services the new loan at a stress-tested interest rate. That's where a Staircase adviser can model your specific position.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}