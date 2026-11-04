import type { JSX } from "react";
import { CogniSenseDiagram } from "./CogniSenseDiagram";
import { MarketDiagram } from "./MarketDiagram";
import { PortfolioDiagram } from "./PortfolioDiagram";

// Diagrams exist only for public projects. Confidential work uses SpecVisual (a domain map).
export const visuals: Record<"cognisense" | "market" | "portfolio", () => JSX.Element> = {
  cognisense: CogniSenseDiagram,
  market: MarketDiagram,
  portfolio: PortfolioDiagram,
};
