// ──────────────────────────────────────────────────────────────
// Lead capture → Supabase (admin app reads these rows).
// Uses a plain fetch to Supabase's REST API so we add NO heavy
// dependency to the public site. If the env vars aren't set, every
// call is a graceful no-op and the site behaves exactly as before.
//   VITE_SUPABASE_URL       – https://<ref>.supabase.co
//   VITE_SUPABASE_ANON_KEY  – publishable key (safe in the browser; RLS-protected)
// ──────────────────────────────────────────────────────────────
const URL = import.meta.env.VITE_SUPABASE_URL;
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const leadsEnabled = () => Boolean(URL && KEY);

async function insert(table, row) {
  if (!leadsEnabled()) return { ok: false, skipped: true };
  try {
    const res = await fetch(`${URL}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: KEY,
        Authorization: `Bearer ${KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });
    if (!res.ok) {
      const error = await res.text();
      if (import.meta.env.DEV) console.error(`[leads] ${table} insert failed:`, error);
      return { ok: false, status: res.status, error };
    }
    return { ok: true, status: res.status };
  } catch (err) {
    if (import.meta.env.DEV) console.error(`[leads] ${table} network error:`, err);
    return { ok: false, error: String(err) };
  }
}

export const submitEnquiry = (row) => insert("enquiries", row);
export const submitLuckyDrawEntry = (row) => insert("lucky_draw_entries", row);
