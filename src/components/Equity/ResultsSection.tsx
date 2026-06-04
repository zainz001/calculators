
export interface EquityResults {
  borrowingAbility: number;
  depositRequirementPercentage: number;
  totalEquity: number;
  useableEquity: number;
}

interface Props {
  results: EquityResults;
  propertyType: string;
}

export default function ResultsSection({ results, propertyType }: Props) {
  const formatCurrency = (val: number) => new Intl.NumberFormat("en-NZ").format(val);
  const formatKM = (num: number) => {
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}k`;
    return `$${num}`;
  };

  return (
    <div
      className="text-white px-5 md:p-8 pt-8 pb-14 md:pb-8 w-full rounded-none md:rounded-[24px] shadow-xl relative overflow-hidden"
      style={{ background: "var(--theme-text-primary)" }}
    >
      {/* Glow */}
      <div
        className="hidden md:block absolute top-0 right-0 w-64 h-64 opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"
        style={{ background: "var(--theme-highlight)" }}
      />

      <p
        className="text-[10px] md:text-[11px] font-bold tracking-widest md:tracking-[0.2em] uppercase mb-2 flex items-center gap-2 md:block"
        style={{ color: "var(--theme-highlight)" }}
      >
        <span
          className="md:hidden w-4 h-px"
          style={{ background: "var(--theme-highlight)" }}
        />
        Indicative Purchasing Power
      </p>

      <h2
        className="text-[44px] md:text-[64px] font-extrabold mb-1 md:mb-3 tracking-tight"
        style={{ color: "var(--theme-highlight)" }}
      >
        ${formatCurrency(results.borrowingAbility)}
      </h2>

      <p className="text-[12px] md:text-[13px] text-gray-300 mb-6 md:mb-10 font-medium">
        Based on a {results.depositRequirementPercentage}% deposit for a{" "}
        {propertyType.replace(/_/g, " ")} investment.
      </p>

      {/* Mobile stats */}
      <div className="md:hidden flex gap-2.5">
        <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Equity</p>
          <p className="text-[15px] font-bold text-white tracking-tight">{formatKM(results.totalEquity)}</p>
        </div>
        <div
          className="flex-1 rounded-xl p-3 border"
          style={{ background: "color-mix(in srgb, var(--theme-highlight) 15%, transparent)", borderColor: "color-mix(in srgb, var(--theme-highlight) 40%, transparent)" }}
        >
          <p className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: "var(--theme-highlight)" }}>Useable</p>
          <p className="text-[15px] font-bold tracking-tight" style={{ color: "var(--theme-highlight)" }}>{formatKM(results.useableEquity)}</p>
        </div>
        <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Deposit</p>
          <p className="text-[15px] font-bold text-white tracking-tight">{formatKM(results.useableEquity)}</p>
        </div>
      </div>

      {/* Desktop stats */}
      <div className="hidden md:grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1.5">Your Equity</p>
          <p className="text-xl font-bold text-white tracking-tight">${formatCurrency(results.totalEquity)}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest font-bold mb-1.5" style={{ color: "var(--theme-highlight)" }}>Useable Equity</p>
          <p className="text-xl font-bold tracking-tight" style={{ color: "var(--theme-highlight)" }}>${formatCurrency(results.useableEquity)}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1.5">Deposit Available</p>
          <p className="text-xl font-bold text-white tracking-tight">${formatCurrency(results.useableEquity)}</p>
        </div>
      </div>
    </div>
  );
}