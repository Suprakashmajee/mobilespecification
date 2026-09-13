import type { NewsArticle, OpticsShot } from "../types";

export const news: NewsArticle[] = [
  {
    id: "lunar-vs-m4",
    title: "Lunar Lake vs M4 Max vs Snapdragon X Elite: NPU and idle silicon lab",
    category: "Silicon & NPUs",
    date: "2026-09-04",
    excerpt:
      "Core Ultra 200V NPU4 hits 48 TOPS. We measured Lion Cove / Skymont idle, Xe2 Battlemage iGPU, and 20-hour web endurance against M4 Max and X Elite.",
    metrics: ["48 TOPS NPU4", "Xe2 Battlemage", "20h+ web"],
    body: [
      "Intel Core Ultra 200V (Lunar Lake) packages memory on-package and moves the NPU to 48 TOPS. In our lab, on-device transcription and image diffusion stay on the NPU while Lion Cove P-cores sleep.",
      "Apple M4 Max still leads sustained GPU and video encode. Snapdragon X Elite Oryon cores win fanless chassis idle. Choose by workload: NPU agents (Lunar Lake), content creation (M4 Max), or silent thin-and-light (X Elite).",
    ],
  },
  {
    id: "dive-watches",
    title: "Fenix 8, Galaxy Watch Ultra, and Apple Watch Ultra: dive sensors compared",
    category: "Smartwatches",
    date: "2026-08-28",
    excerpt:
      "EN13319 40m gauges, dual-frequency GNSS, Exynos W1000 apnea detection, and Pixel Watch 3 Loss of Pulse dispatch.",
    metrics: ["EN13319 40m", "Multi-Band GNSS", "3nm W1000"],
    body: [
      "Garmin Fenix 8 AMOLED adds a true dive computer with freedive and scuba gauges. Galaxy Watch Ultra’s 3nm Exynos W1000 BioActive stack now flags sleep apnea patterns overnight.",
      "Apple Watch Ultra 2 remains the brightest 3000-nit dive companion. Pixel Watch 3’s Loss of Pulse loop can dispatch emergency contacts when no pulse is detected after a fall.",
    ],
  },
  {
    id: "tandem-oled",
    title: "iPad Pro M4 tandem OLED vs Tab S10 Ultra: luminance and chassis",
    category: "Tablets",
    date: "2026-08-12",
    excerpt:
      "1,000-nit full-screen tandem OLED, 5.1mm chassis, AG coatings, and Dimensity 9300+ all-big-core tablet silicon.",
    metrics: ["1000-nit FSDL", "5.1mm", "Dimensity 9300+"],
    body: [
      "iPad Pro M4 tandem OLED holds 1,000 nits full-screen in our HDR window. The 5.1mm unibody is the thinnest Apple tablet chassis we have measured.",
      "Galaxy Tab S10 Ultra trades a sliver of thinness for a larger 14.6-inch canvas and MediaTek’s all-big-core 9300+. Anti-reflective glass cuts office glare better than glossy tandem OLED without nano-texture.",
    ],
  },
  {
    id: "phone-optics-26",
    title: "2026 flagship optics: 4K computational RAW and 200MP periscopes",
    category: "Mobile Phones",
    date: "2026-09-08",
    excerpt:
      "On-device SLMs, 200MP 1/1.4\" Zeiss floating periscopes, and 6,000mAh Silicon-Carbon packs.",
    metrics: ["4K cRAW", "200MP 1/1.4\"", "6,000mAh Si-C"],
    body: [
      "Vivo X200 Pro’s 200MP 1/1.4-inch Zeiss floating periscope still leads 10x detail in our blind shootout. Silicon-Carbon 6,000mAh packs on OnePlus 13 and Xiaomi 15 Pro stretch web endurance past 19 hours.",
      "On-device small language models now run agentic camera modes: scene ranking, RAW denoise, and thermal throttling hints without a cloud round-trip.",
    ],
  },
  {
    id: "iphone18-week",
    title: "Apple September cycle: A19 Pro thermal notes from the lab",
    category: "Lab Tests",
    date: "2026-09-11",
    excerpt:
      "Vapor chamber iPhone 17 Pro Max samples held Geekbench 6 multi longer than A18 Pro. We logged skin temperature after 30-minute 4K60.",
    metrics: ["A19 Pro", "vapor chamber", "4K60 skin temp"],
    body: [
      "A19 Pro with a vapor chamber delayed the first thermal throttle by roughly four minutes versus A18 Pro in a 23°C room. Speaker LUFS remained more consistent under load.",
      "This is a specification lab note, not a buy guide with street prices. Compare silicon, thermals, and optics on mobilespecific — never budget sliders.",
    ],
  },
  {
    id: "copilot-pcs",
    title: "Copilot+ PCs in 2026: 40+ TOPS is now the floor",
    category: "Laptops & PCs",
    date: "2026-07-30",
    excerpt:
      "NPU TOPS, not GPU TGP, now gates local recall and live captions on Lunar Lake and X Elite notebooks.",
    metrics: ["40+ TOPS floor", "NPU4", "Oryon"],
    body: [
      "Microsoft’s Copilot+ gate moved with the hardware. 40 TOPS is the practical floor for local recall indexes. Arc 140V and Adreno X1 remain the iGPU split: Battlemage wins raster, Adreno wins decode efficiency.",
    ],
  },
];

export const opticsShots: OpticsShot[] = [
  {
    id: "lowlight",
    scene: "Low light",
    leftLabel: "X200 Pro LYT-818",
    rightLabel: "Pixel 9 Pro XL G4",
    leftNote: "Larger well depth, less chroma crawl at ISO 3200.",
    rightNote: "Cleaner faces, slightly softer brick texture.",
  },
  {
    id: "portrait",
    scene: "Portrait",
    leftLabel: "iPhone 16 Pro Max",
    rightLabel: "Galaxy S25 Ultra",
    leftNote: "Hair-edge matting holds flyaways.",
    rightNote: "Warmer skin, more aggressive background blur.",
  },
  {
    id: "tele10",
    scene: "10x telephoto",
    leftLabel: "X200 Pro 200MP peri",
    rightLabel: "S25 Ultra 5x peri",
    leftNote: "Signage serifs remain readable at 10x.",
    rightNote: "Crop from 5x is cleaner than digital 10x rivals without 200MP.",
  },
];
