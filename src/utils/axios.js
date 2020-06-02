import axios from 'axios';
import { getHeaders } from './auth/getHeaders';
import { updateTokens } from './auth/updateTokens';

// https://github.com/axios/axios/issues/1383
const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

const customAxios = axios.create({
  baseURL: baseUrl,
});

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
