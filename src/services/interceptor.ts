import axios from 'axios';
import type { AxiosError, AxiosResponse } from 'axios';

// Adding api timeout as 10sec, check if we need to change this
const customAxios = axios.create({
  timeout: 60000
});

customAxios.defaults.headers.common['x-browser-time-zone'] =
  Intl.DateTimeFormat().resolvedOptions().timeZone;

const onResponse = (response: AxiosResponse): AxiosResponse => response;

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  const message =
    error?.response?.data?.errors?.join(',') ||
    error?.response?.data?.errorMessage ||
    error.message;

  console.log(message);

  return Promise.reject(error);
};

customAxios.interceptors.response.use(onResponse, onResponseError);

export default customAxios;
