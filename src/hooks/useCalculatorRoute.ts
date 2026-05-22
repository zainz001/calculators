import { useState, useEffect } from "react";
import { CALCULATOR_ROUTES, type CalculatorId, DEFAULT_CALCULATOR } from "../config/calculators";

export function useCalculatorRoute() {
  const [activeId, setActiveId] = useState<CalculatorId>(DEFAULT_CALCULATOR);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const calcParam = params.get("calc") as CalculatorId;

    if (calcParam && calcParam in CALCULATOR_ROUTES) {
      setActiveId(calcParam);
    }
  }, []);

  return {
    activeId,
    activeConfig: CALCULATOR_ROUTES[activeId],
  };
}