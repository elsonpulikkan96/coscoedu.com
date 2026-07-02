import { useCallback, useEffect, useState } from "react";
import RegistrationModal from "./RegistrationModal";
import ResultsModal from "./ResultsModal";
import StaffModal from "./StaffModal";
import { LuckyDrawContext } from "./context";
import {
  AUTO_OPEN_DELAY, LOT_PREFIX, STAFF_PIN, isCampaignActive, saveEntry,
} from "../../config/luckydraw";
import "./luckydraw.css";

const STORAGE_KEY = "cosco_luckydraw_entries";
const SEEN_KEY = "cosco_luckydraw_seen"; // per-session auto-open guard

function loadEntries() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

export function LuckyDrawProvider({ children }) {
  const [view, setView] = useState(null); // null | "reg" | "results" | "staff"
  const [entries, setEntries] = useState(loadEntries);
  const active = isCampaignActive();

  const persist = useCallback((next) => {
    setEntries(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* storage full / blocked */ }
  }, []);

  // Create an entry with a device-unique lot number. NOTE: on the live
  // site the backend should assign lot numbers so they're unique across
  // every device at the stall.
  const register = useCallback(async (data) => {
    const lots = new Set(entries.map((e) => e.lot));
    // 5-digit space (10000–99999) to cut collisions; capped retries so a
    // full local set can never spin the tab. Backend should still own the
    // authoritative lot number across devices.
    let lot;
    let tries = 0;
    do { lot = `${LOT_PREFIX}-${Math.floor(10000 + Math.random() * 90000)}`; tries += 1; }
    while (lots.has(lot) && tries < 50);
    const entry = { lot, ...data, time: new Date().toISOString() };
    // Save to Supabase FIRST. A duplicate phone or email (enforced by unique
    // indexes) returns HTTP 409, so we reject it before handing out a lot
    // number — this works across every device at the stall.
    const res = await saveEntry(entry);
    if (res && res.status === 409) return { duplicate: true };
    persist([...entries, entry]);
    return { entry };
  }, [entries, persist]);

  const clearEntries = useCallback(() => persist([]), [persist]);

  const openRegistration = useCallback(() => setView("reg"), []);
  const openResults = useCallback(() => setView("results"), []);
  const close = useCallback(() => setView(null), []);

  const openStaff = () => {
    const pin = window.prompt("Staff PIN:");
    if (pin == null) return;
    if (pin !== STAFF_PIN) { window.alert("Wrong PIN"); return; }
    setView("staff");
  };

  // Auto-open the registration popup once per session for new visitors.
  useEffect(() => {
    if (AUTO_OPEN_DELAY == null || !isCampaignActive()) return;
    try { if (sessionStorage.getItem(SEEN_KEY)) return; } catch { return; }
    const t = setTimeout(() => {
      setView((v) => v ?? "reg");
      try { sessionStorage.setItem(SEEN_KEY, "1"); } catch { /* ignore */ }
    }, AUTO_OPEN_DELAY);
    return () => clearTimeout(t);
  }, []);

  // While a modal is open: lock body scroll and close on Escape.
  useEffect(() => {
    if (!view) return;
    const onKey = (e) => { if (e.key === "Escape") setView(null); };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [view]);

  return (
    <LuckyDrawContext.Provider value={{ active, openRegistration, openResults }}>
      {children}
      {active && (
        <>
          <button className="ld-staff-link" onClick={openStaff}>staff</button>
          {view === "reg" && (
            <RegistrationModal entries={entries} onRegister={register} onClose={close}
              onResults={() => setView("results")} />
          )}
          {view === "results" && <ResultsModal onClose={close} />}
          {view === "staff" && <StaffModal entries={entries} onClose={close} onClear={clearEntries} />}
        </>
      )}
    </LuckyDrawContext.Provider>
  );
}
