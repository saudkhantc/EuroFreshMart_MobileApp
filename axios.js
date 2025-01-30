import axios from 'axios';
import { config } from './config';

export const getAuthConfig = (
  accessToken,
  contentType = 'application/json',
) => {
  const config = {
    headers: {
      'Content-Type': contentType,
    },
  };
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
};
export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});