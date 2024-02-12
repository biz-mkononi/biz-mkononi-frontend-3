import { useState } from 'react';

// Replace with your preferred key
const TOKEN_KEY = 'user';
type User ={
  email:string;
  phone:string;
  freeTrialStartDate:string;
  subscriptionType:string;
  name:string;
}
type Data = {
  jwt: string;
  user:User;

};

const useAuthToken = () => {
  // State to store the token
  const [token, setToken] = useState<Data | null>(() => {
    // Get the initial token value from localStorage
    const storedToken = localStorage.getItem(TOKEN_KEY);
    return storedToken ? JSON.parse(storedToken) : null;
  });

  // Function to set the token in state and localStorage
  const setAuthToken = (newToken: Data | null) => {
    setToken(newToken);

    // Store the token in localStorage
    if (newToken) {
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
    } else {
      // Remove the token from localStorage if null
      localStorage.removeItem(TOKEN_KEY);
    }
  };

  return { token, setAuthToken };
};

export default useAuthToken;
