import { useState } from 'react';

// Keys for localStorage
const TOKEN_KEY = 'user';
const TOKEN_TIME_KEY = 'user_time';
const EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

type User = {
  email: string;
  phone: string;
  freeTrialStartDate: string;
  subscriptionType: string;
  name: string;
  id: string;
};

type Data = {
  jwt: string;
  user: User;
};

const useAuthToken = () => {
  const [token, setToken] = useState<Data | null>(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedTime = localStorage.getItem(TOKEN_TIME_KEY);

    // Treat missing timestamp as expired
    if (!storedToken || !storedTime) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(TOKEN_TIME_KEY);
      return null;
    }

    const age = Date.now() - Number(storedTime);
    if (age > EXPIRY_MS) {
      // Token expired → clear it
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(TOKEN_TIME_KEY);
      return null;
    }

    return JSON.parse(storedToken) as Data;
  });

  const setAuthToken = (newToken: Data | null) => {
    setToken(newToken);

    if (newToken) {
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
      localStorage.setItem(TOKEN_TIME_KEY, Date.now().toString());
    } else {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(TOKEN_TIME_KEY);
    }
  };

  return { token, setAuthToken };
};

export default useAuthToken;
