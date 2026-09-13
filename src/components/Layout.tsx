import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AdSenseUnit } from "./AdSenseUnit";
import { currentUser } from "../lib/auth";
import { SITE_BUILD } from "../buildMeta";

const links = [
  ["/", "Lab"],
  ["/phones", "Phones"],
  ["/laptops", "Laptops"],
  ["/watches", "Watches"],
  ["/tablets", "Tablets"],
  ["/compare", "Compare"],
  ["/finder", "Finder"],
  ["/optics", "Optics lab"],
  ["/benchmarks", "Benchmarks"],
  ["/dimensions", "Pocket fit"],
  ["/news", "News"],
  ["/advisor", "Advisor"],
];

export function Layout() {
  const [user, setUser] = useState(currentUser());
  const [hideAnchor, setHideAnchor] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const sync = () => setUser(currentUser());
    window.addEventListener("mobilespecific-auth", sync);
    return () => window.removeEventListener("mobilespecific-auth", sync);
  }, []);

  return (
    <>
      <header className="nav">
        <div className="wrap nav-inner">
          <NavLink to="/" className="logo">
            <span className="logo-mark">ms</span>
            mobilespecific
          </NavLink>
          <nav className="nav-links">
            {links.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === "/"}>
                {label}
              </NavLink>
            ))}
            <button type="button" onClick={() => navigate(user ? "/account" : "/auth")}>
              {user ? user.displayName : "Log in"}
            </button>
          </nav>
        </div>
        <div className="wrap mobile-nav">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/"}>
              {label}
            </NavLink>
          ))}
          <NavLink to={user ? "/account" : "/auth"}>{user ? "Account" : "Log in"}</NavLink>
        </div>
      </header>

      <div className="wrap" style={{ paddingTop: 16 }}>
        <AdSenseUnit format="leaderboard" slot="1111111111" />
      </div>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="wrap">
          <strong>mobilespecific.com</strong> — specification-only hardware lab. No price tags, currency
          selectors, or budget sliders. AdSense spaces are reserved for publisher inventory after
          approval.
          <div style={{ marginTop: 10 }}>
            <NavLink to="/hostinger">Hostinger + MySQL setup</NavLink>
            {" · "}
            <NavLink to="/auth">Sign up</NavLink>
            {" · "}
            <a href="/ads.txt">ads.txt</a>
          </div>
          <div className="build-stamp">Build {SITE_BUILD} · amber copper palette</div>
        </div>
      </footer>

      {!hideAnchor && (
        <div className="sticky-ad">
          <div className="wrap">
            <AdSenseUnit format="anchor" slot="2222222222" />
            <button className="btn ghost" type="button" onClick={() => setHideAnchor(true)}>
              Dismiss
            </button>
          </div>
        </div>
      )}
    </>
  );
}
