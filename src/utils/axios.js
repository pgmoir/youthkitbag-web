import axios from 'axios';
import { getHeaders } from './auth/getHeaders';
import { updateTokens } from './auth/updateTokens';

const customAxios = axios.create({
  baseURL: process.env.REACT_APP_YKBAPI,
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
