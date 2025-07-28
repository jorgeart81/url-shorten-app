import axios, { type AxiosInstance } from 'axios';

import { env } from '@/config/env';
import { authInterceptor } from './authInterceptor';

const urlShortenApi: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true,
});

urlShortenApi.interceptors.request.use(authInterceptor);

export { urlShortenApi };
