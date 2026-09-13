import { photoFor } from "../lib/photos";
import type { DeviceKind } from "../types";

export function DevicePhoto({
  kind,
  name,
  extra = "",
  id = "",
  hero = false,
}: {
  kind: DeviceKind;
  name: string;
  extra?: string;
  id?: string;
  hero?: boolean;
}) {
  return (
    <div className={`device-art${hero ? " hero" : ""}`}>
      <img src={photoFor(kind, name, extra, id)} alt={`${name} product photo`} />
    </div>
  );
}
