import React from "react";

interface Props {
  homeValue: number;
  mortgage: number;
  savings: number;
  useableEquity: number;
}

export default function WealthBar({ homeValue, mortgage, savings, useableEquity }: Props) {
  const formatCurrency = (val: number) => new Intl.NumberFormat("en-NZ").format(val);

  const totalWealth = homeValue + savings;
  const protectedBuffer = homeValue * 0.2;

  const mortgagePct = (mortgage / totalWealth) * 100;
  const bufferPct = (protectedBuffer / totalWealth) * 100;
  const useablePct = (useableEquity / totalWealth) * 100;
  const savingsPct = savings > 0 ? (savings / totalWealth) * 100 : 0;

  return (
    <div className="bg-white p-5 md:p-8 rounded-[20px] md:rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
      <div className="flex justify-between items-end mb-4">
        <h3 className="font-bold text-[14px] md:text-[18px] tracking-tight"
          style={{ color: "var(--theme-text-primary)" }}>Where your wealth sits</h3>
        <span className="text-[11px] md:text-[12px] font-medium" style={{ color: "var(--theme-text-secondary)" }}>
          <span className="hidden md:inline">Total position</span>{" "}
          <strong style={{ color: "var(--theme-text-primary)" }}>${formatCurrency(totalWealth)}</strong>
        </span>
      </div>

      {/* Stacked bar */}
      <div className="flex w-full h-11 md:h-10 rounded-xl overflow-hidden mb-5 md:mb-6 shadow-inner border border-gray-100">
        {mortgagePct > 0 && (
          <div style={{ width: `${mortgagePct}%`, background: "var(--theme-text-primary)" }} />
        )}
        {bufferPct > 0 && (
          <div style={{ width: `${bufferPct}%`, background: "color-mix(in srgb, var(--theme-text-primary) 55%, white)" }} />
        )}
        {useablePct > 0 && (
          <div style={{ width: `${useablePct}%`, background: "var(--theme-highlight)" }} />
        )}
        {savingsPct > 0 && (
          <div style={{ width: `${savingsPct}%`, background: "color-mix(in srgb, var(--theme-highlight) 65%, white)" }} />
        )}
      </div>

      {/* Mobile legend */}
      <div className="md:hidden flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px]"
        style={{ color: "var(--theme-text-secondary)" }}>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--theme-text-primary)" }} /> Mortgage
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "color-mix(in srgb, var(--theme-text-primary) 55%, white)" }} /> 20% buffer
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--theme-highlight)" }} /> Useable equity
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "color-mix(in srgb, var(--theme-highlight) 65%, white)" }} /> Savings
        </div>
      </div>

      {/* Desktop legend */}
      <div className="hidden md:grid grid-cols-4 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 text-[10px] uppercase tracking-widest font-bold"
            style={{ color: "var(--theme-text-secondary)" }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--theme-text-primary)" }} /> Mortgage
          </div>
          <p className="font-bold text-gray-900 text-[15px] mb-0.5">${formatCurrency(mortgage)}</p>
          <p className="text-gray-400 text-[11px] font-medium">{mortgagePct.toFixed(0)}%</p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1.5 text-[10px] uppercase tracking-widest font-bold"
            style={{ color: "var(--theme-text-secondary)" }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "color-mix(in srgb, var(--theme-text-primary) 55%, white)" }} /> Protected Buffer
          </div>
          <p className="font-bold text-gray-900 text-[15px] mb-0.5">${formatCurrency(protectedBuffer)}</p>
          <p className="text-gray-400 text-[11px] font-medium">{bufferPct.toFixed(0)}%</p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1.5 text-[10px] uppercase tracking-widest font-bold"
            style={{ color: "var(--theme-highlight)" }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--theme-highlight)" }} /> Useable Equity
          </div>
          <p className="font-bold text-gray-900 text-[15px] mb-0.5">${formatCurrency(useableEquity)}</p>
          <p className="text-gray-400 text-[11px] font-medium">{useablePct.toFixed(0)}%</p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1.5 text-[10px] uppercase tracking-widest font-bold"
            style={{ color: "color-mix(in srgb, var(--theme-highlight) 75%, black)" }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "color-mix(in srgb, var(--theme-highlight) 65%, white)" }} /> Savings
          </div>
          <p className="font-bold text-gray-900 text-[15px] mb-0.5">${formatCurrency(savings)}</p>
          <p className="text-gray-400 text-[11px] font-medium">{savingsPct.toFixed(0)}%</p>
        </div>
      </div>
    </div>
  );
}