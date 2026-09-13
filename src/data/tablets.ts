import type { TabletSpec } from "../types";

export const tablets: TabletSpec[] = [
  {
    id: "ipadprom4",
    kind: "tablet",
    brand: "Apple",
    name: "iPad Pro 13 M4",
    year: 2025,
    chipset: "Apple M4",
    display: "13\" Tandem OLED 120Hz",
    peakNits: 1000,
    batteryWh: 38.99,
    thicknessMm: 5.1,
    weightG: 579,
    ramGb: 16,
    highlights: ["tandem OLED", "nano-texture option", "5.1mm chassis"],
  },
  {
    id: "tabs10u",
    kind: "tablet",
    brand: "Samsung",
    name: "Galaxy Tab S10 Ultra",
    year: 2025,
    chipset: "Dimensity 9300+",
    display: "14.6\" Dynamic AMOLED 2X",
    peakNits: 1000,
    batteryWh: 43.3,
    thicknessMm: 5.4,
    weightG: 718,
    ramGb: 12,
    highlights: ["all-big-core SoC", "S Pen", "anti-reflective coating"],
  },
];
