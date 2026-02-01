interface ConverterProps {
  currencies: string[];
  amount: number;
  setAmount: (val: number) => void;
  from: string;
  setFrom: (val: string) => void;
  to: string;
  setTo: (val: string) => void;
  date: string;
  setDate: (val: string) => void;
  loading: boolean;
  onConvert: () => void;
  convertedAmount: number | null;
  darkMode: boolean;
}

export function ConverterCard({
  currencies, amount, setAmount, from, setFrom, to, setTo, date, setDate, loading, onConvert, convertedAmount, darkMode
}: ConverterProps) {
  return (
    <div className="col-lg-6 order-1 order-lg-2 d-flex justify-content-center">
      <div className="card border-0 rounded-4 w-100"
        style={{ maxWidth: '550px', boxShadow: darkMode ? '0 20px 60px rgba(0, 0, 0, 0.8)' : '0 20px 60px rgba(0, 0, 0, 0.4)' }}>
        <div className="card-body p-4">
          <div className="mb-3">
            <label className="form-label text-muted small fw-bold text-uppercase">Amount</label>
            <div className="input-group input-group-lg">
              <span className={`input-group-text bg-transparent border-end-0 fw-bold ${darkMode ? 'text-white border-secondary' : 'text-dark'}`}>$</span>

              <input
                type="number"
                className={`form-control form-control-lg fw-bold ${darkMode ? 'bg-dark text-white border-secondary' : 'bg-light text-dark'}`}
                placeholder="0"
                value={amount === 0 ? '' : amount}
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  const val = e.target.value;
                  setAmount(val === '' ? 0 : parseFloat(val));
                }}
                style={{
                  fontSize: '1.5rem',
                  colorScheme: darkMode ? 'dark' : 'light'
                }}
              />
            </div>
          </div>
          <div className="row g-3 mb-3">
            <div className="col-6">
              <label className="form-label text-muted small fw-bold text-uppercase">From</label>
              <select className="form-select form-select-lg fw-bold" value={from} onChange={(e) => setFrom(e.target.value)}>
                {currencies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-6">
              <label className="form-label text-muted small fw-bold text-uppercase">To</label>
              <select className="form-select form-select-lg fw-bold" value={to} onChange={(e) => setTo(e.target.value)}>
                {currencies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label text-muted small fw-bold text-uppercase d-flex justify-content-between">
              <span>Date (Optional)</span>
              {date && <span className="text-primary" style={{cursor: 'pointer'}} onClick={() => setDate("")}>Clear</span>}
            </label>
            
            {/* FIX HERE: Added style={{ colorScheme: ... }} and dynamic classes */}
            <input 
              type="date" 
              className={`form-control form-control-lg ${darkMode ? 'bg-dark text-white border-secondary' : 'bg-white text-dark'}`}
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              max={new Date().toISOString().split("T")[0]} 
              style={{ colorScheme: darkMode ? 'dark' : 'light' }}
            />
          
          </div>
          <button onClick={() => void onConvert()} disabled={loading} className="btn btn-primary w-100 btn-lg rounded-3 fw-bold py-2 mb-3 shadow-sm">
            {loading ? <div className="spinner-border spinner-border-sm text-light" role="status" /> : "Convert Currency"}
          </button>
          {convertedAmount !== null && (
            <div className={`alert ${darkMode ? 'alert-dark border-secondary' : 'alert-success border-success'} text-center rounded-3 mb-0 py-2`}>
              <div className="display-6 fw-bold my-1">{convertedAmount.toFixed(2)} <span className="fs-4">{to}</span></div>
              <div className="small text-muted">1 {from} = {(convertedAmount / amount).toFixed(4)} {to}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}