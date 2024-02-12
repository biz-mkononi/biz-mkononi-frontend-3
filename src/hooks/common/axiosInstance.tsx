const user = JSON.parse(localStorage.getItem('user')!);

import axios, { AxiosInstance } from 'axios';

const instance = () => {
  if (user) {
    return user.jwt;
  }
};

const baseURL = 'https://api-stage.mkononi.biz';
const reqInstance: AxiosInstance = axios.create({
  baseURL,
  // No 'Authorization' header for this instance
});

const reqInstance2: AxiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${instance()}`,
    'Content-Type': 'multipart/form-data',
  },
});

const reqInstance3: AxiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${instance()}`,
  },
});

export { reqInstance, reqInstance2,reqInstance3 };
