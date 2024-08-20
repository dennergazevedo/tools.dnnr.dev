import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: {
      'Accept': "application/json",
      'Content-Type': "application/json"
  },
});