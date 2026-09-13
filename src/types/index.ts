export type DeviceKind = "phone" | "laptop" | "watch" | "tablet";

export interface PhoneSpec {
  id: string;
  kind: "phone";
  brand: string;
  name: string;
  year: number;
  chipset: string;
  siliconVendor: "Qualcomm" | "Apple" | "MediaTek" | "Google" | "Samsung";
  ramGb: number;
  storageGb: number;
  display: string;
  peakNits: number;
  batteryMah: number;
  batteryChemistry: string;
  chargeWatts: number;
  ipRating: string;
  periscope: boolean;
  mainSensor: string;
  telephoto: string;
  ultrawide: string;
  widthMm: number;
  heightMm: number;
  thicknessMm: number;
  weightG: number;
  speakerLufs: number;
  antutuV10: number;
  geekbench6Multi: number;
  webHours: number;
  videoHours: number;
  charge0to100Min: number;
  highlights: string[];
}

export interface LaptopSpec {
  id: string;
  kind: "laptop";
  brand: string;
  name: string;
  year: number;
  cpu: string;
  gpu: string;
  gpuTgpW: number;
  npuTops: number;
  ramGb: number;
  storageGb: number;
  display: string;
  peakNits: number;
  batteryWh: number;
  enduranceHours: number;
  weightKg: number;
  thicknessMm: number;
  highlights: string[];
}

export interface WatchSpec {
  id: string;
  kind: "watch";
  brand: string;
  name: string;
  year: number;
  display: string;
  peakNits: number;
  caseMm: number;
  thicknessMm: number;
  batteryDays: number;
  water: string;
  gnss: string;
  sensors: string;
  chipset: string;
  highlights: string[];
}

export interface TabletSpec {
  id: string;
  kind: "tablet";
  brand: string;
  name: string;
  year: number;
  chipset: string;
  display: string;
  peakNits: number;
  batteryWh: number;
  thicknessMm: number;
  weightG: number;
  ramGb: number;
  highlights: string[];
}

export interface NewsArticle {
  id: string;
  title: string;
  category: "Mobile Phones" | "Laptops & PCs" | "Smartwatches" | "Tablets" | "Silicon & NPUs" | "Lab Tests";
  date: string;
  excerpt: string;
  metrics: string[];
  body: string[];
}

export interface UserAccount {
  id: string;
  email: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  websiteUrl: string;
  role: "member" | "admin";
  favorites: string[];
}

export interface OpticsShot {
  id: string;
  scene: "Low light" | "Portrait" | "10x telephoto";
  leftLabel: string;
  rightLabel: string;
  leftNote: string;
  rightNote: string;
}
