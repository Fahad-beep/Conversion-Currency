import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// Note the '../' path changes here
import { fetchSupportedCurrencies, fetchConversionRate, storage, type ConversionRecord } from '../utils';
import { History } from '../components/history';
import { ConverterCard } from '../components/convertercard';

export function Home() {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [amount, setAmount] = useState<number>(1);
  const [from, setFrom] = useState<string>("USD");
  const [to, setTo] = useState<string>("EUR");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<ConversionRecord[]>([]);
  const [date, setDate] = useState<string>(""); 
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    setHistory(storage.getHistory());
    const isDark = storage.getTheme();
    if (isDark) { setDarkMode(true); storage.setTheme(true); }
    fetchSupportedCurrencies().then(setCurrencies).catch(console.error);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    storage.setTheme(newMode);
  };

  const handleConvert = async () => {
    setLoading(true);
    try {
      const rate = await fetchConversionRate(date, from, to);
      const result = amount * rate;
      setConvertedAmount(result);
      const newRecord: ConversionRecord = { 
        id: Date.now(), date: new Date().toLocaleString(), 
        from, to, amount, result, 
        type: date ? `Historical (${date})` : "Live Rate" 
      };
      const updatedHistory = [newRecord, ...history].slice(0, 10);
      setHistory(updatedHistory);
      storage.saveHistory(updatedHistory);
    } catch (error) {
      const err = error as AxiosError;
      alert(err.response?.status === 429 ? "Limit Reached" : "Error connecting to backend");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-vh-100 vw-100 d-flex flex-column bg-body-tertiary transition-all overflow-auto">
      <div className="container d-flex flex-column py-4" style={{ maxWidth: '1200px' }}>
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 px-3">
          <h3 className="fw-bold mb-0">💱 TA Converter</h3>
          <button onClick={toggleTheme} className={`btn ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'} rounded-circle`} style={{ width: '45px', height: '45px' }}>
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <div className="row g-4 justify-content-center align-items-start">
          <ConverterCard 
            currencies={currencies} amount={amount} setAmount={setAmount}
            from={from} setFrom={setFrom} to={to} setTo={setTo}
            date={date} setDate={setDate} loading={loading}
            onConvert={handleConvert} convertedAmount={convertedAmount} darkMode={darkMode}
          />
          <History 
            history={history} 
            darkMode={darkMode} 
            onClear={() => { setHistory([]); storage.clearHistory(); }} 
          />
        </div>
      </div>
    </div>
  );
}