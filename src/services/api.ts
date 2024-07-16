/* eslint-disable import/no-cycle */
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import axios from './interceptor';

const baseApiUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:4200' : '{{PROD_URL}}';

const axiosBaseQueryBuilder = (axiosObj: any) => {
  return (
      { baseUrl }: { baseUrl: string } = { baseUrl: '' }
    ): BaseQueryFn<
      {
        url: string;
        method: AxiosRequestConfig['method'];
        data?: AxiosRequestConfig['data'];
        params?: AxiosRequestConfig['params'];
      },
      unknown,
      unknown
    > =>
    async ({ url, method, data, params }) => {
      try {
        const result = await axiosObj({
          url: baseUrl + url,
          headers: {},
          method,
          data,
          params
        });
        return { data: result.data };
      } catch (axiosError) {
        const err = axiosError as AxiosError;

        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message
          }
        };
      }
    };
};

const axiosBaseQuery = axiosBaseQueryBuilder(axios);

export { axiosBaseQuery, baseApiUrl };
