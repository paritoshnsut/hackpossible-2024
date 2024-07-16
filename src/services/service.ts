import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery, baseApiUrl } from './api';

export const apis = createApi({
  reducerPath: 'apis',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://whispering-falls-89690-7597f8f3ebb3.herokuapp.com/api'
  }),
  endpoints: (builder) => ({
    getReadings: builder.query({
      query: () => ({
        url: '/v1/reading',
        method: 'GET'
      })
    }),
    getReadingById: builder.query({
      query: (id) => ({
        url: `/v1/reading/${id}/10`,
        method: 'GET'
      })
    }),
    getAlertsByDays: builder.query({
      query: () => ({
        url: `/v1/reading/alerts/5`,
        method: 'GET'
      })
    }),
    getMeanMedianByDays: builder.query({
      query: () => ({
        url: `/v1/reading/mean/5`,
        method: 'GET'
      })
    })
  })
});

export const { endpoints, useGetReadingsQuery, useGetReadingByIdQuery , useGetAlertsByDaysQuery , useGetMeanMedianByDaysQuery } = apis;
