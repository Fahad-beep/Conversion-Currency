import axios from 'axios';

// --- Types ---
export interface ConversionRecord {
  id: number;
  date: string;
  from: string;
  to: string;
  amount: number;
  result: number;
  type: string;
}

interface ApiResponse {
  [key: string]: number | Record<string, number>;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000/api/currency";
export const fetchSupportedCurrencies = async (): Promise<string[]> => {
  try {
    const res = await axios.get(`${BACKEND_URL}/latest?base=USD`);
    
    if (res.data && res.data.data) {
      const keys = Object.keys(res.data.data as object);
      return ["USD", ...keys].sort();
    }
    return [];
  } catch (err) {
    console.error("API Error fetching list:", err);
    return ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY"];
  }
};

export const fetchConversionRate = async (date: string, from: string, to: string): Promise<number> => {
  const endpoint = date ? `${BACKEND_URL}/historical` : `${BACKEND_URL}/latest`;
  const params = date ? { date, base: from } : { base: from };

  const res = await axios.get(endpoint, { params });
  
  if (!res.data || !res.data.data) throw new Error("Invalid API response");

  const rates = res.data.data as ApiResponse;
  
  let rate: number | undefined;

  if (date) {
    const historicalData = rates[date] as Record<string, number>;
    rate = historicalData ? historicalData[to] : undefined;
  } else {
    rate = rates[to] as number;
  }

  if (rate === undefined) throw new Error(`Rate not found for ${to}`);
  
  return rate;
};

export const storage = {
  getHistory: (): ConversionRecord[] => {
    const saved = localStorage.getItem("conversionHistory");
    return saved ? (JSON.parse(saved) as ConversionRecord[]) : [];
  },
  
  saveHistory: (history: ConversionRecord[]) => {
    localStorage.setItem("conversionHistory", JSON.stringify(history));
  },

  clearHistory: () => {
    localStorage.removeItem("conversionHistory");
  },

  getTheme: (): boolean => {
    return localStorage.getItem("theme") === 'dark';
  },

  setTheme: (isDark: boolean) => {
    const themeString = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', themeString);
    localStorage.setItem("theme", themeString);
  }
};