export const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT_ID ?? "";

export function adsenseReady() {
  return Boolean(ADSENSE_CLIENT && ADSENSE_CLIENT.startsWith("ca-pub-") && !ADSENSE_CLIENT.includes("XXXX"));
}

export type AdFormat = "leaderboard" | "rectangle" | "infeed" | "anchor";

export const adCopy: Record<AdFormat, string> = {
  leaderboard: "Leaderboard — 728×90 / responsive. Replace VITE_ADSENSE_CLIENT_ID after AdSense approval.",
  rectangle: "Medium rectangle — 300×250 sidebar unit.",
  infeed: "In-feed native unit inside the specification catalog.",
  anchor: "Sticky anchor banner (non-intrusive). Dismiss stays local.",
};
