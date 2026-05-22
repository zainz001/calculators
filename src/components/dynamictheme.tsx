import React, { useEffect, useState } from "react";

type ThemeVars = Record<`--${string}`, string>;

const BRAND_PRESETS: Record<string, ThemeVars> = {
  opes: {
    "--theme-left-bg": "#F8F8F8",
    "--theme-right-bg": "#F1EEF9",
    "--theme-text-primary": "#23303B",
    "--theme-text-secondary": "#64748B",
    "--theme-highlight": "#5B3E96",
    "--theme-border": "#E2E8F0",
    "--theme-button": "#5B3E96",
    "--theme-button-hover": "#4a327a",
  },

  staircase: {
    "--theme-left-bg": "#F8FAFC",
    "--theme-right-bg": "#EFF6FF",
    "--theme-text-primary": "#0F172A",
    "--theme-text-secondary": "#475569",
    "--theme-highlight": "#0052CC",
    "--theme-border": "#E2E8F0",
    "--theme-button": "#0052CC",
    "--theme-button-hover": "#0040A0",
  },
};

type BrandKey = keyof typeof BRAND_PRESETS;

interface CalculatorThemeWrapperProps {
  defaultBrand?: BrandKey;
  children: React.ReactNode;
}

export default function CalculatorThemeWrapper({
  defaultBrand = "opes",
  children,
}: CalculatorThemeWrapperProps) {
  const [themeStyles, setThemeStyles] = useState<ThemeVars>(
    BRAND_PRESETS[defaultBrand]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const brand = params.get("brand");

    if (brand && brand in BRAND_PRESETS) {
      setThemeStyles(BRAND_PRESETS[brand as BrandKey]);
    }

    const highlight = params.get("highlight");

    if (highlight) {
      setThemeStyles((prev) => ({
        ...prev,
        "--theme-highlight": `#${highlight}`,
      }));
    }
  }, []);

  return (
    <div
      style={themeStyles as React.CSSProperties}
      className="w-full h-full"
    >
      {children}
    </div>
  );
}