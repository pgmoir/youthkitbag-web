import axios from 'axios';
import { getHeaders } from './auth/getHeaders';
import { updateTokens } from './auth/updateTokens';

const customAxios = axios.create({
  baseURL: import.meta.env.VITE_YKBAPI,
});

console.log('YKAPI', import.meta.env.VITE_YKBAPI)

customAxios.interceptors.response.use((response) => {
  let { headers } = response;
  updateTokens(headers);
  return response;
});

customAxios.interceptors.request.use((config) => {
  config.headers = { ...getHeaders() };
  return config;
});

export default customAxios;
