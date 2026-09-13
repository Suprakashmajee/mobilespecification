import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentUser, loginUser, registerUser, setCurrentUser, updateUser } from "../lib/auth";
import { phones } from "../data/phones";
import { laptops } from "../data/laptops";
import { watches } from "../data/watches";

function emit() {
  window.dispatchEvent(new Event("mobilespecific-auth"));
}

export function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    try {
      if (mode === "signup") registerUser(email, password, name || email.split("@")[0]);
      else loginUser(email, password);
      emit();
      navigate("/account");
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div className="wrap section" style={{ maxWidth: 480 }}>
      <h1>{mode === "login" ? "Log in" : "Sign up"}</h1>
      <p className="lede">
        Accounts store locally in this browser and can sync to Hostinger MySQL after you import the SQL
        schema. Do not put hosting passwords in the website source.
      </p>
      <form className="card" onSubmit={submit}>
        {mode === "signup" && (
          <label>
            Display name
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        )}
        <label>
          Email
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p style={{ color: "var(--danger)" }}>{error}</p>}
        <button className="btn primary" type="submit">
          {mode === "login" ? "Log in" : "Create account"}
        </button>
        <button
          className="btn ghost"
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login" ? "Need an account? Sign up" : "Have an account? Log in"}
        </button>
        <p className="meta">Demo owner login: owner@mobilespecific.com / lab-owner</p>
      </form>
    </div>
  );
}

export function AccountPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(currentUser());

  useEffect(() => {
    if (!currentUser()) navigate("/auth");
  }, [navigate]);

  if (!user) {
    return null;
  }
  const catalog = [...phones, ...laptops, ...watches];
  const favs = catalog.filter((d) => user.favorites.includes(d.id));
  const api = import.meta.env.VITE_API_BASE;

  return (
    <div className="wrap section layout-2">
      <div className="card">
        <h1>{user.displayName}</h1>
        <p className="meta">{user.email} · {user.role}</p>
        <label>
          Display name
          <input
            defaultValue={user.displayName}
            onBlur={(e) => setUser(updateUser({ displayName: e.target.value }))}
          />
        </label>
        <label>
          Bio
          <textarea defaultValue={user.bio} onBlur={(e) => setUser(updateUser({ bio: e.target.value }))} />
        </label>
        <label>
          Website
          <input
            defaultValue={user.websiteUrl}
            onBlur={(e) => setUser(updateUser({ websiteUrl: e.target.value }))}
          />
        </label>
        <h3>Bookmarked specifications</h3>
        {favs.length === 0 && <p className="lede">No bookmarks yet.</p>}
        {favs.map((d) => (
          <div key={d.id}>
            {d.brand} {d.name}
          </div>
        ))}
        <button
          className="btn"
          type="button"
          onClick={() => {
            setCurrentUser(null);
            emit();
            navigate("/");
          }}
        >
          Log out
        </button>
      </div>
      <div className="card">
        <h3>
          <span className={`db-dot ${api ? "" : "off"}`} />
          Hostinger database
        </h3>
        <p>
          Schema file: <a href="/mobilespecific_hostinger_db.sql">mobilespecific_hostinger_db.sql</a>
        </p>
        <p>PHP API: upload <code>hostinger/api</code> next to your <code>public_html</code> build.</p>
        <p className="meta">
          {api
            ? `API base ${api}`
            : "VITE_API_BASE is empty — using browser storage until PHP/MySQL is connected."}
        </p>
        <p className="lede">
          Hosting control-panel passwords must never be committed. Rotate any password that was shared
          in chat.
        </p>
      </div>
    </div>
  );
}

export function AdvisorPage() {
  const [q, setQ] = useState("best silicon-carbon battery and periscope for night telephoto");
  const [out, setOut] = useState("");

  function advise() {
    const text = q.toLowerCase();
    const ranked = [...phones].sort((a, b) => {
      let s = 0;
      if (text.includes("battery") || text.includes("endurance")) s += b.webHours - a.webHours;
      if (text.includes("charge")) s += a.charge0to100Min - b.charge0to100Min;
      if (text.includes("nit") || text.includes("display")) s += b.peakNits - a.peakNits;
      if (text.includes("tele") || text.includes("periscope") || text.includes("zoom"))
        s += Number(b.periscope) - Number(a.periscope) + (b.mainSensor.includes("200") ? 1 : 0);
      if (text.includes("silicon") || text.includes("antutu") || text.includes("geekbench"))
        s += b.geekbench6Multi - a.geekbench6Multi;
      if (text.includes("google") || text.includes("pixel")) s += a.brand === "Google" ? 50 : 0;
      if (text.includes("apple")) s += a.brand === "Apple" ? 50 : 0;
      return s;
    });
    const top = ranked[0];
    const second = ranked[1];
    setOut(
      `Specification advisor (on-device fallback, no budget):\n\n` +
        `Primary: ${top.name} — ${top.chipset}, ${top.batteryMah} mAh ${top.batteryChemistry}, ${top.peakNits} nits, ${top.telephoto}. Web endurance ${top.webHours} h. AnTuTu ${top.antutuV10.toLocaleString()}.\n\n` +
        `Upgrade delta vs ${second.name}: ${top.webHours - second.webHours} h web, ${top.peakNits - second.peakNits} nits, ${top.geekbench6Multi - second.geekbench6Multi} GB6 multi, charge ${top.charge0to100Min - second.charge0to100Min} min (lower is faster).\n\n` +
        `No price or street-cost analysis is included.`,
    );
  }

  return (
    <div className="wrap section" style={{ maxWidth: 720 }}>
      <h1>AI hardware advisor</h1>
      <p className="lede">
        Personalized specification picks and upgrade deltas. Price and budget language is stripped.
        Connect Gemini later via your own API key; this build uses a responsive fallback ranker.
      </p>
      <textarea rows={4} value={q} onChange={(e) => setQ(e.target.value)} />
      <div style={{ marginTop: 10 }}>
        <button className="btn primary" type="button" onClick={advise}>
          Rank by specifications
        </button>
      </div>
      {out && (
        <pre className="card" style={{ whiteSpace: "pre-wrap", marginTop: 16 }}>
          {out}
        </pre>
      )}
    </div>
  );
}

export function HostingerPage() {
  return (
    <div className="wrap section news-body" style={{ maxWidth: 760 }}>
      <h1>Publish on Hostinger (mobilespecific.com)</h1>
      <p>
        This site is a static Vite build plus optional PHP/MySQL for accounts. Place AdSense client ID
        in <code>VITE_ADSENSE_CLIENT_ID</code> before building.
      </p>
      <ol>
        <li>
          In AdSense, add mobilespecific.com, then put your <code>ca-pub-…</code> in <code>.env</code>{" "}
          and the publisher number in <code>public/ads.txt</code>.
        </li>
        <li>
          Run <code>npm run build</code> and upload the <code>dist/</code> files to{" "}
          <code>public_html</code>. Include <code>dist/.htaccess</code> for SPA routes.
        </li>
        <li>
          In hPanel → MySQL, create a database and user. Import{" "}
          <code>public/mobilespecific_hostinger_db.sql</code>.
        </li>
        <li>
          Upload <code>hostinger/api</code> to <code>public_html/api</code> and edit{" "}
          <code>config.php</code> with database name, user, and password — on the server only, never in
          git.
        </li>
        <li>
          Rebuild with <code>VITE_API_BASE=https://mobilespecific.com/api</code>.
        </li>
      </ol>
      <p>
        Do not send Hostinger passwords to chat or commit them. If a password was shared already, change
        it in hPanel.
      </p>
    </div>
  );
}
