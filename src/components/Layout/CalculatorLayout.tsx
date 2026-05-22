import type { ReactNode } from "react";
import CalculatorThemeWrapper from "../dynamictheme";

interface CalculatorLayoutProps {
  title: string;
  children: ReactNode;
}

export default function CalculatorLayout({ title, children }: CalculatorLayoutProps) {
  return (
    <CalculatorThemeWrapper defaultBrand="opes">
      <div className="app-container w-full min-w-0 px-0 sm:px-4 md:px-8 lg:px-16 py-4 md:py-10 max-w-6xl mx-auto">
        
        {/* HEADER */}
        <header className="mb-4 md:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full px-2 sm:px-0">
          <h2 className="text-[20px] md:text-[24px] font-bold text-[#0052CC] w-full sm:w-auto break-words">
            {title}
          </h2>
        </header>

        {/* CONTENT */}
        <main className="w-full min-w-0">
          {children}
        </main>

      </div>
    </CalculatorThemeWrapper>
  );
}