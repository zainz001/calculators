import React from "react";

interface Props {
  homeValue: number;
  setHomeValue: (val: number) => void;
  mortgage: number;
  setMortgage: (val: number) => void;
  savings: number;
  setSavings: (val: number) => void;
  propertyType: string;
  setPropertyType: (val: string) => void;
}

interface RangeInputProps {
  label: string;
  value: number;
  setValue: (val: number) => void;
  min: number;
  max: number;
  hintRight?: string;
}

export default function InputSection({
  homeValue, setHomeValue, mortgage, setMortgage,
  savings, setSavings, propertyType, setPropertyType,
}: Props) {
  const formatCurrency = (val: number) => new Intl.NumberFormat("en-NZ").format(val);
  const formatKM = (num: number) => {
    if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(1).replace(".0", "")}M`;
    if (num >= 1_000) return `$${(num / 1_000).toFixed(0)}k`;
    return `$${num}`;
  };

  const RangeInput = ({ label, value, setValue, min, max, hintRight }: RangeInputProps) => (
    <div className="mb-8 md:mb-7">
      {/* Desktop label row */}
      <div className="hidden md:flex justify-between items-center mb-3">
        <label className="text-[14px] font-bold" style={{ color: "var(--theme-text-primary)" }}>{label}</label>
        {hintRight && (
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider"
            style={{ color: "var(--theme-highlight)", background: "color-mix(in srgb, var(--theme-highlight) 10%, white)" }}
          >
            {hintRight}
          </span>
        )}
      </div>

      {/* Mobile label + input row */}
      <div className="md:hidden flex justify-between items-center mb-3">
        <label className="text-[14px] font-bold" style={{ color: "var(--theme-text-primary)" }}>{label}</label>
        <div className="relative w-[130px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-[13px]"
            style={{ color: "var(--theme-text-secondary)" }}>NZ$</span>
          <input
            type="text"
            value={formatCurrency(value)}
            onChange={(e) => setValue(parseInt(e.target.value.replace(/,/g, "")) || 0)}
            className="w-full pl-10 pr-3 py-1.5 bg-white border border-gray-200 rounded-lg text-right font-bold text-[15px] focus:outline-none shadow-sm"
            style={{ color: "var(--theme-text-primary)" }}
          />
        </div>
      </div>

      {/* Desktop input */}
      <div className="hidden md:block relative mb-4">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-sm">NZ$</span>
        <input
          type="text"
          value={formatCurrency(value)}
          onChange={(e) => setValue(parseInt(e.target.value.replace(/,/g, "")) || 0)}
          className="w-full pl-14 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 font-bold text-lg text-gray-900 transition-all shadow-sm"
          style={{ "--tw-ring-color": "color-mix(in srgb, var(--theme-highlight) 50%, transparent)" } as React.CSSProperties}
        />
      </div>

      {/* Slider */}
      <div className="relative mt-2 md:mt-0">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-sm"
          style={{ accentColor: "var(--theme-highlight)" }}
        />
      </div>

      {/* Legends */}
      <div className="md:hidden flex justify-between text-[11px] font-medium mt-2"
        style={{ color: "var(--theme-text-secondary)" }}>
        <span>{formatKM(min)}</span>
        <span>{formatKM(max)}</span>
      </div>
      <div className="hidden md:flex justify-between text-[11px] font-medium text-gray-400 mt-2">
        <span>${formatCurrency(min)}</span>
        <span>${formatCurrency(max)}</span>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-[16px] md:text-xl tracking-tight"
          style={{ color: "var(--theme-text-primary)" }}>Your details</h3>
        <span
          className="md:hidden text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider"
          style={{ color: "var(--theme-highlight)", background: "color-mix(in srgb, var(--theme-highlight) 10%, white)" }}
        >NZD</span>
      </div>

      <RangeInput label="Your home's value" value={homeValue} setValue={setHomeValue} min={200000} max={3500000} hintRight="Indicative - NZD" />
      <RangeInput label="Remaining mortgage" value={mortgage} setValue={setMortgage} min={0} max={3500000} />
      <RangeInput label="Savings available" value={savings} setValue={setSavings} min={0} max={1500000} />

      {/* Property type toggles */}
      <div className="mt-8 md:mb-6">
        <label className="text-[14px] font-bold block mb-3"
          style={{ color: "var(--theme-text-primary)" }}>What are you buying?</label>
        <div className="flex bg-gray-100 p-1.5 md:p-1 rounded-[12px] md:rounded-xl gap-1 md:gap-0">
          {["New build", "Holiday home", "Existing"].map((type) => {
            const key = type.toLowerCase().replace(" ", "_");
            const isActive = propertyType === key;
            return (
              <button
                key={key}
                onClick={() => setPropertyType(key)}
                className="flex-1 py-2 md:py-2.5 text-[13px] font-bold rounded-[8px] md:rounded-lg transition-all"
                style={
                  isActive
                    ? { background: "var(--theme-text-primary)", color: "#fff" }
                    : { color: "var(--theme-text-secondary)", background: "transparent" }
                }
              >
                {type.replace(" home", "")}
              </button>
            );
          })}
        </div>
        <p className="md:hidden text-[12px] mt-3" style={{ color: "var(--theme-text-secondary)" }}>
          Requires{" "}
          <strong style={{ color: "var(--theme-text-primary)" }}>
            {propertyType === "new_build" ? "20%" : "35%"} deposit
          </strong>
          {propertyType === "new_build" && " · RBNZ new-build exemption"}
        </p>
        <p className="hidden md:block text-[12px] text-gray-500 mt-3 font-medium">
          {propertyType === "new_build" ? "20% deposit RBNZ new build exemption." : "Standard deposit rules apply."}
        </p>
      </div>

      {/* Desktop footer note */}
      <div className="hidden md:flex pt-5 border-t border-gray-100 items-start gap-3 mt-6">
        <svg className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--theme-highlight)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <p className="text-[13px] text-gray-500 leading-relaxed">
          Banks typically require you to keep <strong className="text-gray-900">20% equity</strong> in your own home.
          Anything above that — plus savings — is what we call your{" "}
          <strong style={{ color: "var(--theme-highlight)" }}>useable equity</strong>.
        </p>
      </div>
    </div>
  );
}