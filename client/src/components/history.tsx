import { type ConversionRecord } from '../utils';

interface HistoryProps {
  history: ConversionRecord[];
  darkMode: boolean;
  onClear: () => void;
}

export function History({ history, darkMode, onClear }: HistoryProps) {
  return (
    /* Change: Used col-12 for mobile to stack, and lg-6 for desktop side-by-side */
    <div className="col-12 col-lg-6 order-2 order-lg-1 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mb-3 px-2">
        <h5 className="fw-bold mb-0 text-muted text-uppercase small">Recent History</h5>
        {history.length > 0 && (
          <button onClick={onClear} className="btn btn-sm btn-link text-decoration-none text-danger fw-bold">
            Clear
          </button>
        )}
      </div>

      {/* Change: Added 'max-vh-50' on mobile to prevent infinite scrolling traps */}
      <div 
        className="overflow-auto w-100 p-2 shadow-sm rounded-3 bg-body" 
        style={{ 
          maxHeight: '400px', 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          boxShadow: darkMode ? '0 5px 15px rgba(0, 0, 0, 0.2)' : '0 5px 15px rgba(0, 0, 0, 0.05)'
        }}
      >
        <ul className="list-group list-group-flush">
          {history.length === 0 && <li className="list-group-item text-center text-muted py-5">No conversions yet.</li>}
          {history.map((h) => (
            <li key={h.id} className="list-group-item d-flex justify-content-between align-items-center py-3 px-0 border-bottom">
              <div className="ps-2">
                <div className="fw-bold" style={{ fontSize: '0.9rem' }}>
                  {h.from} <span className="text-muted mx-1">→</span> {h.to}
                </div>
                <div className="small text-muted">{h.amount} = {h.result.toFixed(2)}</div>
              </div>
              <div className="text-end pe-2">
                <span className={`badge ${h.type.includes('Historical') ? 'bg-warning text-dark' : 'bg-success'} mb-1`} style={{ fontSize: '0.65rem' }}>
                  {h.type.includes('Historical') ? 'HISTORICAL' : 'LIVE'}
                </span>
                <div className="text-muted" style={{ fontSize: '0.7rem' }}>{h.date.split(',')[0]}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}