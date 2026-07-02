import { createContext, useContext } from "react";

// Shared Lucky Draw context. Kept in its own (component-free) file so
// Vite fast-refresh works and the hook can be imported anywhere.
export const LuckyDrawContext = createContext({
  active: false,
  openRegistration: () => {},
  openResults: () => {},
});

// Consumed by the floating launcher (in FloatingActions) so a single
// shared button can open the campaign modals.
export const useLuckyDraw = () => useContext(LuckyDrawContext);
