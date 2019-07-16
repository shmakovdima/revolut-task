import axios from 'axios';

import { API_KEY } from '../constants';

const api = axios.create({
  baseURL: 'https://openexchangerates.org/api',
  timeout: 10000,
});

export const getCurrencyRate = () => api.get('/latest.json', { params: { app_id: API_KEY } });

export default api;
