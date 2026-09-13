import { Link } from "react-router-dom";
import { AdSenseUnit } from "../components/AdSenseUnit";
import { phones } from "../data/phones";
import { laptops } from "../data/laptops";
import { watches } from "../data/watches";
import { news } from "../data/news";

export function HomePage() {
  return (
    <div className="wrap">
      <section className="hero">
        <div className="kicker">Hardware lab · specification only</div>
        <h1>mobilespecific — phones, laptops, watches, tablets. Specs, not street prices.</h1>
        <p className="lede">
          Calibrated display nits, sensor optical formats, loudspeaker LUFS, Silicon-Carbon packs,
          NPU TOPS, and millimetric chassis. Compare hardware. Bookmark devices. AdSense inventory
          sits in reserved slots around the lab.
        </p>
        <div className="pills">
          <span className="pill">No price tags</span>
          <span className="pill">AdSense leaderboard / in-feed / sidebar / anchor</span>
          <span className="pill">Hostinger MySQL schema included</span>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link className="btn primary" to="/phones">
            Open phone catalog
          </Link>
          <Link className="btn" to="/compare">
            Compare arena
          </Link>
          <Link className="btn" to="/advisor">
            Spec advisor
          </Link>
        </div>
      </section>

      <AdSenseUnit format="leaderboard" slot="3333333333" />

      <section className="section">
        <h2>Flagship phones</h2>
        <div className="grid cards">
          {phones.slice(0, 6).map((p) => (
            <Link className="card" key={p.id} to={`/phones/${p.id}`}>
              <div className="device-art">
                <div className="phone-shape" />
              </div>
              <div className="meta">
                {p.brand} · {p.year}
              </div>
              <h3>{p.name}</h3>
              <div>
                {p.chipset} · {p.peakNits} nits · {p.batteryMah} mAh {p.batteryChemistry}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <AdSenseUnit format="infeed" slot="4444444444" />

      <section className="section layout-2">
        <div>
          <h2>Laptops & watches</h2>
          <div className="grid cards">
            {laptops.slice(0, 3).map((p) => (
              <Link className="card" key={p.id} to={`/laptops/${p.id}`}>
                <div className="device-art">
                  <div className="laptop-shape" />
                </div>
                <div className="meta">{p.cpu}</div>
                <h3>{p.name}</h3>
                <div>
                  {p.npuTops} TOPS NPU · {p.enduranceHours} h web
                </div>
              </Link>
            ))}
            {watches.slice(0, 3).map((p) => (
              <Link className="card" key={p.id} to={`/watches/${p.id}`}>
                <div className="device-art">
                  <div className="watch-shape" />
                </div>
                <div className="meta">{p.water}</div>
                <h3>{p.name}</h3>
                <div>
                  {p.peakNits} nits · {p.batteryDays} day battery
                </div>
              </Link>
            ))}
          </div>
        </div>
        <aside className="grid">
          <AdSenseUnit format="rectangle" slot="5555555555" />
          <div className="card">
            <h3>Editorial</h3>
            {news.slice(0, 4).map((n) => (
              <Link key={n.id} to={`/news/${n.id}`} style={{ display: "block", marginTop: 10 }}>
                <div className="meta">{n.category}</div>
                {n.title}
              </Link>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
