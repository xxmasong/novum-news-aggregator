import axios from "axios";

export const BASE_URL = import.meta.env.VITE_URL_BACKEND;
export const BEARER_TOKEN = 'bearer_token';

export const getBearerToken = () => localStorage.getItem(BEARER_TOKEN) || "";
export const setBearerToken = (token: string) => localStorage.setItem(BEARER_TOKEN, token);
export const clearBearerToken = () => localStorage.removeItem(BEARER_TOKEN);

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Accept',
    'Access-Control-Allow-Credentials': false,
    'X-Requested-With': 'XMLHttpRequest',
  },
  // withCredentials: false,
});

const requestHeader = (headers?: any) => {
  const access_token =  getBearerToken();
  if (access_token) {
    if (headers) {
      headers["Authorization"] = `Bearer ${access_token}`;
    } else {
      return {"Authorization" : `Bearer ${access_token}`};
    }
  }

  return headers;
}

const apiRequest = async(method: string, url: string, data?: any, headers?: any) => {
  try {
    const request = {
      'method': method,
      'url': url,
      'headers': headers,
      'params': method === 'GET' ? data : null,
      'data': method !== 'GET' ? data : null,
    };
    const response = await apiClient(request);
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const get = async (url: string, params?: any, headers?: any) => {
  return await apiRequest(
    'GET', url, params, requestHeader(headers)
  );
};

export const post = async (url: string, data?: any, headers?: any) => {
  return await apiRequest(
    'POST', url, data, requestHeader(headers)
  );
};

export const patch = async (url: string, data?: any, headers?: any) => {
  return await apiRequest(
    'PATCH', url, data, requestHeader(headers)
  );
};

export const put = async (url: string, data?: any, headers?: any) => {
  return await apiRequest(
    'PUT', url, data, requestHeader(headers)
  );
};

export const destroy = async (url: string, data?: any, headers?: any) => {
  return await apiRequest(
    'DELETE', url, data, requestHeader(headers)
  );
};

export default apiClient;
