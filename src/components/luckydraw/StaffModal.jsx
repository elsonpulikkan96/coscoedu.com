import { createPortal } from "react-dom";

function downloadCSV(entries) {
  if (!entries.length) { window.alert("No entries to download yet."); return; }
  const head = "LotNumber,Name,Age,Phone,Email,Country,Course,Time\n";
  const rows = entries
    .map((e) => [e.lot, e.name, e.age, e.phone, e.email, e.country, e.course, e.time]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([head + rows], { type: "text/csv" }));
  a.download = `cosco-luckydraw-entries-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}

export default function StaffModal({ entries, onClose, onClear }) {
  return createPortal(
    <div className="ld-overlay" role="dialog" aria-modal="true"
      aria-label="Staff registrations panel" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="ld-modal ld-staff">
        <button className="ld-close" aria-label="Close" onClick={onClose}>×</button>
        <div className="ld-ticket">
          <div className="ld-ticket-head">
            <div className="ld-brand">STAFF · ENTRIES</div>
            <div className="ld-route">{entries.length} registered</div>
          </div>
          <div className="ld-body">
            <p className="ld-sub">
              Registrations saved on this device (browser storage). Download the CSV regularly and keep a
              backup — clearing browser data removes them.
            </p>
            <table>
              <thead>
                <tr><th>Lot</th><th>Name</th><th>Age</th><th>Phone</th><th>Email</th><th>Country</th><th>Course</th></tr>
              </thead>
              <tbody>
                {entries.length ? (
                  entries.map((e) => (
                    <tr key={e.lot}>
                      <td>{e.lot}</td><td>{e.name}</td><td>{e.age}</td><td>{e.phone}</td>
                      <td>{e.email}</td><td>{e.country}</td><td>{e.course}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={7} className="ld-staff-empty">No entries yet</td></tr>
                )}
              </tbody>
            </table>
            <button className="ld-cta" onClick={() => downloadCSV(entries)}>Download entries (CSV)</button>
            <button className="ld-btn2" onClick={() => {
              if (window.confirm("Delete all entries on this device? Download the CSV first!")) onClear();
            }}>Clear all entries</button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
