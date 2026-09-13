import { Link, useParams } from "react-router-dom";
import { AdSenseUnit } from "../components/AdSenseUnit";
import { phones } from "../data/phones";
import { laptops } from "../data/laptops";
import { watches } from "../data/watches";
import { tablets } from "../data/tablets";
import { currentUser, toggleFavorite } from "../lib/auth";
import { useMemo, useState } from "react";

export function PhoneCatalog() {
  const [vendor, setVendor] = useState("all");
  const [ip, setIp] = useState("all");
  const [peri, setPeri] = useState("all");
  const [minMah, setMinMah] = useState(0);
  const list = phones.filter((p) => {
    if (vendor !== "all" && p.siliconVendor !== vendor) return false;
    if (ip !== "all" && !p.ipRating.includes(ip)) return false;
    if (peri === "yes" && !p.periscope) return false;
    if (peri === "no" && p.periscope) return false;
    if (p.batteryMah < minMah) return false;
    return true;
  });

  return (
    <div className="wrap section">
      <h1>Phone specifications</h1>
      <p className="lede">Filter by silicon family, IP rating, periscope optics, and battery capacity. No prices.</p>
      <div className="filters">
        <select value={vendor} onChange={(e) => setVendor(e.target.value)}>
          <option value="all">Any silicon vendor</option>
          <option>Qualcomm</option>
          <option>Apple</option>
          <option>MediaTek</option>
          <option>Google</option>
          <option>Samsung</option>
        </select>
        <select value={ip} onChange={(e) => setIp(e.target.value)}>
          <option value="all">Any IP rating</option>
          <option value="IP68">IP68</option>
          <option value="IP69">IP69</option>
          <option value="IP54">IP54</option>
        </select>
        <select value={peri} onChange={(e) => setPeri(e.target.value)}>
          <option value="all">Periscope any</option>
          <option value="yes">Periscope yes</option>
          <option value="no">Periscope no</option>
        </select>
        <label style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--muted)" }}>
          Min battery mAh
          <input type="number" value={minMah || ""} onChange={(e) => setMinMah(Number(e.target.value) || 0)} />
        </label>
      </div>
      <div className="grid cards">
        {list.flatMap((p, i) => {
          const card = (
            <Link className="card" key={p.id} to={`/phones/${p.id}`}>
              <div className="device-art">
                <div className="phone-shape" />
              </div>
              <div className="meta">
                {p.siliconVendor} · {p.ramGb} GB RAM · {p.storageGb} GB
              </div>
              <h3>{p.name}</h3>
              <div>
                {p.peakNits} nits · {p.mainSensor}
              </div>
              <span className="badge">{p.batteryChemistry}</span>
            </Link>
          );
          if (i === 4) {
            return [<AdSenseUnit key="ad-infeed" format="infeed" slot="6666666666" />, card];
          }
          return [card];
        })}
      </div>
    </div>
  );
}

function FavoriteButton({ id }: { id: string }) {
  const [on, setOn] = useState(() => currentUser()?.favorites.includes(id) ?? false);
  return (
    <button
      className="btn"
      type="button"
      onClick={() => {
        try {
          const u = toggleFavorite(id);
          setOn(u.favorites.includes(id));
          window.dispatchEvent(new Event("mobilespecific-auth"));
        } catch (err) {
          alert((err as Error).message);
        }
      }}
    >
      {on ? "Bookmarked" : "Bookmark spec"}
    </button>
  );
}

export function PhoneDetails() {
  const { id } = useParams();
  const p = phones.find((x) => x.id === id);
  if (!p) return <div className="wrap section">Device not in the lab catalog.</div>;
  return (
    <div className="wrap section layout-2">
      <div className="grid">
        <div className="card">
          <div className="kicker">{p.brand}</div>
          <h1>{p.name}</h1>
          <p>
            {p.chipset} · {p.display} · peak {p.peakNits} nits
          </p>
          <FavoriteButton id={p.id} />
        </div>
        <div className="table-wrap">
          <table>
            <tbody>
              {(
                [
                  ["Chipset", p.chipset],
                  ["RAM / storage", `${p.ramGb} GB / ${p.storageGb} GB`],
                  ["Display", p.display],
                  ["Peak luminance", `${p.peakNits} nits`],
                  ["Battery", `${p.batteryMah} mAh · ${p.batteryChemistry}`],
                  ["Charge", `${p.chargeWatts} W · 0–100% ${p.charge0to100Min} min`],
                  ["Ingress", p.ipRating],
                  ["Main", p.mainSensor],
                  ["Telephoto", p.telephoto],
                  ["Ultrawide", p.ultrawide],
                  ["Chassis", `${p.heightMm} × ${p.widthMm} × ${p.thicknessMm} mm · ${p.weightG} g`],
                  ["Speakers", `${p.speakerLufs} LUFS`],
                  ["AnTuTu v10", p.antutuV10.toLocaleString()],
                  ["Geekbench 6 multi", p.geekbench6Multi.toLocaleString()],
                  ["Web / video endurance", `${p.webHours} h / ${p.videoHours} h`],
                ] as const
              ).map(([k, v]) => (
                <tr key={k}>
                  <th>{k}</th>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <aside className="grid">
        <AdSenseUnit format="rectangle" slot="7777777777" />
        <div className="card">
          <h3>Lab notes</h3>
          <ul>
            {p.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

export function SimpleCatalog({
  kind,
}: {
  kind: "laptops" | "watches" | "tablets";
}) {
  const items =
    kind === "laptops" ? laptops : kind === "watches" ? watches : tablets;
  return (
    <div className="wrap section">
      <h1>{kind[0].toUpperCase() + kind.slice(1)} specifications</h1>
      <div className="grid cards">
        {items.map((p) => (
          <Link className="card" key={p.id} to={`/${kind}/${p.id}`}>
            <div className="device-art">
              <div className={kind === "laptops" ? "laptop-shape" : kind === "watches" ? "watch-shape" : "phone-shape"} />
            </div>
            <div className="meta">{p.brand}</div>
            <h3>{p.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function GenericDetails({ kind }: { kind: "laptops" | "watches" | "tablets" }) {
  const { id } = useParams();
  const item =
    kind === "laptops"
      ? laptops.find((x) => x.id === id)
      : kind === "watches"
        ? watches.find((x) => x.id === id)
        : tablets.find((x) => x.id === id);
  if (!item) return <div className="wrap section">Not found.</div>;
  const rows = Object.entries(item).filter(([k]) => k !== "id" && k !== "kind" && k !== "highlights");
  return (
    <div className="wrap section layout-2">
      <div className="card">
        <h1>{item.name}</h1>
        <div className="table-wrap" style={{ marginTop: 12 }}>
          <table>
            <tbody>
              {rows.map(([k, v]) => (
                <tr key={k}>
                  <th>{k}</th>
                  <td>{Array.isArray(v) ? v.join(", ") : String(v)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AdSenseUnit format="rectangle" slot="8888888888" />
    </div>
  );
}

export function ComparePage() {
  const [ids, setIds] = useState<string[]>(["s25u", "ip16pm", "op13"]);
  const selected = useMemo(() => phones.filter((p) => ids.includes(p.id)), [ids]);
  const keys: { label: string; get: (p: (typeof phones)[0]) => number | string; higher?: boolean }[] = [
    { label: "Peak nits", get: (p) => p.peakNits, higher: true },
    { label: "Battery mAh", get: (p) => p.batteryMah, higher: true },
    { label: "Silicon-Carbon", get: (p) => (p.batteryChemistry.includes("Silicon") ? "Yes" : "No") },
    { label: "AnTuTu v10", get: (p) => p.antutuV10, higher: true },
    { label: "GB6 multi", get: (p) => p.geekbench6Multi, higher: true },
    { label: "Web hours", get: (p) => p.webHours, higher: true },
    { label: "0–100 min", get: (p) => p.charge0to100Min, higher: false },
    { label: "RAM GB", get: (p) => p.ramGb, higher: true },
    { label: "Main sensor", get: (p) => p.mainSensor },
    { label: "Periscope", get: (p) => (p.periscope ? "Yes" : "No") },
  ];

  function winner(row: (typeof keys)[0]) {
    if (row.higher === undefined) return null;
    const nums = selected.map((p) => Number(row.get(p)));
    const best = row.higher ? Math.max(...nums) : Math.min(...nums);
    return best;
  }

  return (
    <div className="wrap section">
      <h1>Compare arena</h1>
      <p className="lede">Hardware differences highlight automatically. Category winners get a badge. No prices.</p>
      <div className="filters">
        {phones.map((p) => (
          <label key={p.id} style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={ids.includes(p.id)}
              onChange={() =>
                setIds((cur) =>
                  cur.includes(p.id) ? cur.filter((x) => x !== p.id) : [...cur, p.id].slice(0, 4),
                )
              }
            />
            {p.name}
          </label>
        ))}
      </div>
      <AdSenseUnit format="leaderboard" slot="9999999999" />
      <div className="table-wrap" style={{ marginTop: 16 }}>
        <table>
          <thead>
            <tr>
              <th>Specification</th>
              {selected.map((p) => (
                <th key={p.id}>{p.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {keys.map((row) => {
              const best = winner(row);
              const values = selected.map((p) => row.get(p));
              const unique = new Set(values.map(String)).size > 1;
              return (
                <tr key={row.label}>
                  <th>{row.label}</th>
                  {selected.map((p) => {
                    const val = row.get(p);
                    const isWin = best !== null && Number(val) === best;
                    return (
                      <td key={p.id} className={`${unique ? "diff" : ""} ${isWin ? "win" : ""}`}>
                        {String(val)}
                        {isWin ? " · winner" : ""}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
