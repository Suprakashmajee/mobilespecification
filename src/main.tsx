import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import {
  ComparePage,
  GenericDetails,
  PhoneCatalog,
  PhoneDetails,
  SimpleCatalog,
} from "./pages/CatalogPages";
import {
  BenchmarksPage,
  DimensionsPage,
  NewsArticle,
  NewsList,
  OpticsLab,
} from "./pages/LabPages";
import { AccountPage, AdvisorPage, AuthPage, HostingerPage } from "./pages/AccountPages";
import "./index.css";
import { ADSENSE_CLIENT, adsenseReady } from "./lib/adsense";

if (adsenseReady()) {
  const script = document.createElement("script");
  script.async = true;
  script.crossOrigin = "anonymous";
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(ADSENSE_CLIENT)}`;
  document.head.appendChild(script);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/phones" element={<PhoneCatalog />} />
          <Route path="/phones/:id" element={<PhoneDetails />} />
          <Route path="/laptops" element={<SimpleCatalog kind="laptops" />} />
          <Route path="/laptops/:id" element={<GenericDetails kind="laptops" />} />
          <Route path="/watches" element={<SimpleCatalog kind="watches" />} />
          <Route path="/watches/:id" element={<GenericDetails kind="watches" />} />
          <Route path="/tablets" element={<SimpleCatalog kind="tablets" />} />
          <Route path="/tablets/:id" element={<GenericDetails kind="tablets" />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/finder" element={<PhoneCatalog />} />
          <Route path="/optics" element={<OpticsLab />} />
          <Route path="/benchmarks" element={<BenchmarksPage />} />
          <Route path="/dimensions" element={<DimensionsPage />} />
          <Route path="/news" element={<NewsList />} />
          <Route path="/news/:id" element={<NewsArticle />} />
          <Route path="/advisor" element={<AdvisorPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/hostinger" element={<HostingerPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
