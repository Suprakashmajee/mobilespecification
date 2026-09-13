import { photoFor } from "../lib/photos";
import type { DeviceKind } from "../types";

export function DevicePhoto({
  kind,
  name,
  extra = "",
  hero = false,
}: {
  kind: DeviceKind;
  name: string;
  extra?: string;
  hero?: boolean;
}) {
  return (
    <div className={`device-art${hero ? " hero" : ""}`}>
      <img src={photoFor(kind, name, extra)} alt={`${name} studio photo`} />
    </div>
  );
}
