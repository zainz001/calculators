import "./App.css";
import { useCalculatorRoute } from "./hooks/useCalculatorRoute";
import CalculatorLayout from "./components/Layout/CalculatorLayout";

export default function App() {
  const { activeConfig } = useCalculatorRoute();
  
 const { title, Component } = activeConfig;

  return (
    <CalculatorLayout title={title}>
      <Component />
    </CalculatorLayout>
  );
}