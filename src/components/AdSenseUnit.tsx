import { useEffect } from "react";
import { ADSENSE_CLIENT, adCopy, adsenseReady, type AdFormat } from "../lib/adsense";

export function AdSenseUnit({
  format,
  slot,
}: {
  format: AdFormat;
  slot: string;
}) {
  useEffect(() => {
    if (!adsenseReady()) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* AdSense may already have filled this slot */
    }
  }, [slot]);

  if (adsenseReady()) {
    return (
      <div className="ad-slot" data-size={format}>
        <span className="ad-label">Advertisement</span>
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", minHeight: format === "anchor" ? 50 : 90 }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return (
    <div className="ad-slot" data-size={format} aria-label="Advertisement space">
      <span className="ad-label">Advertisement</span>
      <div className="ad-copy">
        Google AdSense space · {adCopy[format]}
        <div style={{ marginTop: 6, fontFamily: "var(--mono)", fontSize: 11 }}>slot {slot}</div>
      </div>
    </div>
  );
}
