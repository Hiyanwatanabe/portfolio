import type { JSX } from "react";
import { AutoInvoiceDiagram } from "./AutoInvoiceDiagram";
import { CogniSenseDiagram } from "./CogniSenseDiagram";
import { MarketDiagram } from "./MarketDiagram";
import { PortfolioDiagram } from "./PortfolioDiagram";
import { Tf4Diagram } from "./Tf4Diagram";

// Diagrams exist only for public projects (and TF4 / Auto-Invoice). Confidential work uses SpecVisual (a domain map).
export const visuals: Record<"tf4" | "autoinvoice" | "cognisense" | "market" | "portfolio", () => JSX.Element> = {
  tf4: Tf4Diagram,
  autoinvoice: AutoInvoiceDiagram,
  cognisense: CogniSenseDiagram,
  market: MarketDiagram,
  portfolio: PortfolioDiagram,
};
