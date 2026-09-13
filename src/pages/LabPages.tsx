import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { news, opticsShots } from "../data/news";
import { phones } from "../data/phones";
import { AdSenseUnit } from "../components/AdSenseUnit";

export function NewsList() {
  const [cat, setCat] = useState("all");
  const list = news.filter((n) => cat === "all" || n.category === cat);
  const cats = ["all", ...new Set(news.map((n) => n.category))];
  return (
    <div className="wrap section">
      <h1>Lab news & community notes</h1>
      <div className="filters">
        {cats.map((c) => (
          <button key={c} className="btn" type="button" onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>
      <div className="grid cards">
        {list.map((n) => (
          <Link className="card news-body" key={n.id} to={`/news/${n.id}`}>
            <div className="meta">
              {n.category} · {n.date}
            </div>
            <h3>{n.title}</h3>
            <p>{n.excerpt}</p>
            <div className="metrics">
              {n.metrics.map((m) => (
                <span className="metric" key={m}>
                  {m}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function NewsArticle() {
  const { id } = useParams();
  const n = news.find((x) => x.id === id);
  if (!n) return <div className="wrap section">Article not found.</div>;
  return (
    <div className="wrap section layout-2">
      <article className="card news-body">
        <div className="kicker">{n.category}</div>
        <h1>{n.title}</h1>
        <div className="meta">{n.date}</div>
        <div className="metrics" style={{ margin: "12px 0" }}>
          {n.metrics.map((m) => (
            <span className="metric" key={m}>
              {m}
            </span>
          ))}
        </div>
        {n.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </article>
      <AdSenseUnit format="rectangle" slot="1010101010" />
    </div>
  );
}

export function OpticsLab() {
  const [shot, setShot] = useState(opticsShots[0]);
  const [pos, setPos] = useState(50);
  return (
    <div className="wrap section">
      <h1>Optics & blind shootout</h1>
      <p className="lede">
        Dual-pane slider for sharpness, chromatic aberration, and denoise. Scenes: low light, portrait,
        10x telephoto.
      </p>
      <div className="filters">
        {opticsShots.map((s) => (
          <button key={s.id} className="btn" type="button" onClick={() => setShot(s)}>
            {s.scene}
          </button>
        ))}
      </div>
      <div className="slider">
        <div className="pane left">
          <div style={{ padding: 20 }}>
            <strong>{shot.leftLabel}</strong>
            <p>{shot.leftNote}</p>
          </div>
        </div>
        <div className="pane right" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          <div style={{ padding: 20 }}>
            <strong>{shot.rightLabel}</strong>
            <p>{shot.rightNote}</p>
          </div>
        </div>
        <div className="handle" style={{ left: `${pos}%` }} />
        <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} />
      </div>
    </div>
  );
}

export function BenchmarksPage() {
  const rows = [...phones].sort((a, b) => b.antutuV10 - a.antutuV10);
  return (
    <div className="wrap section">
      <h1>Battery & silicon leaderboards</h1>
      <AdSenseUnit format="infeed" slot="1212121212" />
      <div className="table-wrap" style={{ marginTop: 16 }}>
        <table>
          <thead>
            <tr>
              <th>Device</th>
              <th>AnTuTu v10</th>
              <th>Geekbench 6 multi</th>
              <th>Web h</th>
              <th>Video h</th>
              <th>0–100 min</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.antutuV10.toLocaleString()}</td>
                <td>{p.geekbench6Multi.toLocaleString()}</td>
                <td>{p.webHours}</td>
                <td>{p.videoHours}</td>
                <td>{p.charge0to100Min}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DimensionsPage() {
  const [id, setId] = useState(phones[0].id);
  const p = phones.find((x) => x.id === id)!;
  const scale = 2.2;
  return (
    <div className="wrap section">
      <h1>Proportional chassis & pocket fit</h1>
      <p className="lede">Millimetric 1:2.2 on-screen scale with ISO/IEC 7810 ID-1 card overlay (85.6 × 53.98 mm).</p>
      <select value={id} onChange={(e) => setId(e.target.value)}>
        {phones.map((x) => (
          <option key={x.id} value={x.id}>
            {x.name}
          </option>
        ))}
      </select>
      <div className="chassis" style={{ marginTop: 16 }}>
        <div>
          <div className="meta">Front</div>
          <div
            style={{
              width: p.widthMm * scale,
              height: p.heightMm * scale,
              borderRadius: 18,
              border: "3px solid #ff8a3d",
              background: "#1a100e",
            }}
          />
        </div>
        <div>
          <div className="meta">Side</div>
          <div
            style={{
              width: p.thicknessMm * scale,
              height: p.heightMm * scale,
              borderRadius: 6,
              border: "3px solid #ffd166",
              background: "#281714",
            }}
          />
        </div>
        <div>
          <div className="meta">ISO ID-1 reference</div>
          <div
            className="iso-card"
            style={{ width: 85.6 * scale, height: 53.98 * scale }}
          >
            credit-card size
          </div>
          <div className="meta" style={{ marginTop: 8 }}>
            {p.heightMm} × {p.widthMm} × {p.thicknessMm} mm · {p.weightG} g
          </div>
        </div>
      </div>
    </div>
  );
}
