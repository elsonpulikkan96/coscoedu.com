import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Confetti from "./Confetti";
import { RESULTS_DATE, RESULTS_DATE_LABEL, WINNERS, resultsAreLive } from "../../config/luckydraw";

const LOT_RE = /^[A-Z]{2,4}-\d{3,5}$/;

function remaining() {
  let ms = Math.max(0, RESULTS_DATE.getTime() - Date.now());
  const d = Math.floor(ms / 864e5); ms -= d * 864e5;
  const h = Math.floor(ms / 36e5); ms -= h * 36e5;
  const m = Math.floor(ms / 6e4); ms -= m * 6e4;
  const s = Math.floor(ms / 1e3);
  return { d, h, m, s };
}

export default function ResultsModal({ onClose }) {
  const [live, setLive] = useState(resultsAreLive());
  const [cd, setCd] = useState(remaining());
  const [lot, setLot] = useState("");
  const [lotError, setLotError] = useState(false);
  const [result, setResult] = useState(null); // { win, prize, lot }

  // Live countdown until results go live.
  useEffect(() => {
    if (live) return;
    const id = setInterval(() => {
      if (resultsAreLive()) { setLive(true); clearInterval(id); }
      else setCd(remaining());
    }, 1000);
    return () => clearInterval(id);
  }, [live]);

  function check() {
    const value = lot.trim().toUpperCase().replace(/\s/g, "");
    if (!LOT_RE.test(value)) { setLotError(true); setResult(null); return; }
    setLotError(false);
    const prize = WINNERS[value];
    setResult(prize ? { win: true, prize, lot: value } : { win: false, lot: value });
  }

  return createPortal(
    <div className="ld-overlay" data-lenis-prevent role="dialog" aria-modal="true"
      aria-label="Check Lucky Draw results" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="ld-modal">
        <button className="ld-close" aria-label="Close" onClick={onClose}>×</button>
        <div className="ld-ticket">
          <div className="ld-ticket-head">
            <div className="ld-brand">RESULTS</div>
            <div className="ld-route">MEGA LUCKY DRAW</div>
          </div>

          {!live ? (
            /* Before results date — countdown */
            <div className="ld-body">
              <div className="ld-eyebrow">Draw closes soon</div>
              <h2 className="ld-title">Winners announced {RESULTS_DATE_LABEL}</h2>
              <p className="ld-sub">Come back here with your lot number. Winners also get an email from Cosco.</p>
              <div className="ld-countdown">
                <div><b>{cd.d}</b><small>days</small></div>
                <div><b>{cd.h}</b><small>hours</small></div>
                <div><b>{cd.m}</b><small>mins</small></div>
                <div><b>{cd.s}</b><small>secs</small></div>
              </div>
            </div>
          ) : (
            /* On/after results date — lookup */
            <div className="ld-body">
              <div className="ld-eyebrow">Results are live 🎉</div>
              <h2 className="ld-title">Check your lot number</h2>
              <div className={`ld-field${lotError ? " ld-invalid" : ""}`}>
                <label htmlFor="ld-lot">Lot number</label>
                <input id="ld-lot" type="text" maxLength={12} style={{ textTransform: "uppercase" }}
                  placeholder="e.g. KTM-4821" value={lot}
                  onChange={(e) => setLot(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && check()} />
                {lotError && <div className="ld-err">Enter your lot number (e.g. KTM-4821).</div>}
              </div>
              <button className="ld-cta" onClick={check}>Check result</button>

              {result && (
                <div className={`ld-notice ${result.win ? "ld-win" : "ld-lose"}`} style={{ marginTop: 14 }}>
                  {result.win ? (
                    <>🎉 <b>Congratulations!</b> Lot <b>{result.lot}</b> has won: <b>{result.prize}</b>
                    <br />Check your email for claim instructions, or call the Cosco office.</>
                  ) : (
                    <>Lot <b>{result.lot}</b> didn't win this time — but your study-abroad journey still
                    starts here. Book a <b>free counselling session</b> with Cosco!</>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="ld-perf" />
          <div className="ld-foot">
            <div className="ld-barcode" aria-hidden="true" />
            <div className="ld-code">COSCOEDU.COM</div>
          </div>
        </div>
        {result?.win && <Confetti />}
      </div>
    </div>,
    document.body
  );
}
