import axios from 'axios';
import { API_TOKEN } from '../Storage/StorageKey';
import { baseUrl } from './apiConstants';
import StorageManager from '../Storage/StorageManager';


const request = async (config, isTokenNeeded = true) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (isTokenNeeded) {
    const authToken = await StorageManager.get(API_TOKEN);
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }
  }

  const client = axios.create({
    baseURL: baseUrl,
    headers: headers,
    withCredentials: true,
  });

  const onSuccess = response => response.data;
  const onFailure = error => Promise.reject(error);

  return client(config).then(onSuccess).catch(onFailure);
};

export default request;
