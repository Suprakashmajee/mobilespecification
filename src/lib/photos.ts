import type { DeviceKind } from "../types";

const P = "/devices";

export function photoFor(kind: DeviceKind, name: string, extra = ""): string {
  const q = `${name} ${extra}`.toLowerCase();
  if (kind === "watch") {
    if (q.includes("fenix") || q.includes("ultra") || q.includes("garmin")) return `${P}/photo_watch_rugged.png`;
    return `${P}/photo_watch_round.png`;
  }
  if (kind === "tablet") return `${P}/photo_tablet.png`;
  if (kind === "phone") {
    if (q.includes("rog")) return `${P}/photo_phone_gaming.png`;
    if (q.includes("pixel") || q.includes("xperia") || q.includes("edge")) return `${P}/photo_phone_compact.png`;
    return `${P}/photo_phone_flagship.png`;
  }
  if (q.includes("macbook pro")) return `${P}/photo_macbook_pro.png`;
  if (q.includes("macbook air") || q.includes("m5")) return `${P}/photo_macbook_air.png`;
  if (q.includes("strix g18") || q.includes("18 ")) return `${P}/photo_rog_18.png`;
  if (q.includes("chromebook") || q.includes("chrome")) return `${P}/photo_chromebook.png`;
  if (q.includes("aspire 3") || q.includes("a311") || q.includes("11.6")) return `${P}/photo_small_11.png`;
  if (q.includes("flip") || q.includes("x360") || q.includes("2-in-1") || q.includes("yoga")) return `${P}/photo_2in1.png`;
  if (
    q.includes("thinkpad") ||
    q.includes("probook") ||
    q.includes("p14") ||
    q.includes("e14") ||
    q.includes("l14")
  )
    return `${P}/photo_thinkpad.png`;
  if (
    q.includes("oled") ||
    q.includes("zenbook") ||
    q.includes("galaxy book") ||
    q.includes("xps") ||
    q.includes("spectre") ||
    q.includes("omnibook ultra") ||
    q.includes("swift")
  )
    return `${P}/photo_oled_ultrabook.png`;
  if (
    q.includes("rog") ||
    q.includes("tuf") ||
    q.includes("victus") ||
    q.includes("nitro") ||
    q.includes("blade") ||
    q.includes("zephyrus") ||
    q.includes("rtx") ||
    q.includes("gaming") ||
    q.includes("cyborg")
  )
    return `${P}/photo_gaming_laptop.png`;
  return `${P}/photo_office_15.png`;
}
