import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// another api for news - bingnews  

const cryptoNewsApiHeaders ={
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': 'fa58d7cfddmshafbd78efef0d81bp1ec46fjsn597b10fc231f',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
  }

  const baseUrl = "https://bing-news-search1.p.rapidapi.com";

  const createRequest = (url) => ({ url, headers: cryptoNewsApiHeaders });
  
  export const cryptoNewsApi = createApi({
    reducerPath: "cryptoNewsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
      getCryptoNews: builder.query({
        query: ({ newsCategory, count }) =>
          createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
      }),
    }),
  });
  
  export const { useGetCryptoNewsQuery } = cryptoNewsApi;