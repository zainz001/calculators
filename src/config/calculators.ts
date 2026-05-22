import EquityAndLeverageCalculator from "../components/EquityCalculator/EquityAndLeverageCalculator";
import CapitalGrowthCalculator from "../components/EquityCalculator/Captialgrowthcalculator";
import PropertyInvestmentCalculator from "../components/EquityCalculator/interestcalculator";

// 1. Map paths to both their Title AND their React Component
export const CALCULATOR_ROUTES = {
  "equity-leverage": {
    title: "Equity and Leverage Calculator",
    Component: EquityAndLeverageCalculator,
  },
  "capital-growth": {
    title: "Capital Growth Calculator",
    Component: CapitalGrowthCalculator,
  },
  "property-investment": {
    title: "Property Investment Calculator",
    Component: PropertyInvestmentCalculator,
  },
} as const;

// 2. Export strict types based on the object keys
export type CalculatorId = keyof typeof CALCULATOR_ROUTES;

// 3. Define the fallback
export const DEFAULT_CALCULATOR: CalculatorId = "equity-leverage";