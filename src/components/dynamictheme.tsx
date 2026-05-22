import React, { useEffect, useState } from "react";

type ThemeVars = Record<`--${string}`, string>;

const BRAND_PRESETS: Record<string, ThemeVars> = {
  opes: {
    "--theme-left-bg": "#F8FAFC",
    "--theme-right-bg": "#EFF6FF",
    "--theme-text-primary": "#0F172A",
    "--theme-text-secondary": "#475569",
    "--theme-highlight": "#0052CC",
    "--theme-border": "#E2E8F0",
    "--theme-button": "#0052CC",
    "--theme-button-hover": "#0040A0",
  },

  staircase: {
    // 👇 The fix: A subtle off-white background so the white cards actually stand out 👇
    "--theme-left-bg": "#F4F6F8", /* A very soft, modern light gray for the main page */
    "--theme-right-bg": "#FFFFFF", /* Pure white specifically for the results card */

    // 👇 Keeping your sharp text and brand colors 👇
    "--theme-text-primary": "#0A2540", /* Deep navy blue for headings */
    "--theme-text-secondary": "#4B5563", /* Dark gray for standard text */
    "--theme-highlight": "#7AA23E", /* Staircase Green */
    "--theme-border": "#E5E7EB", /* Soft gray for borders */
    "--theme-button": "#7AA23E",
    "--theme-button-hover": "#658A32",
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