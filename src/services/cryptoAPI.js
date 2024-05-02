import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key' : 'fa58d7cfddmshafbd78efef0d81bp1ec46fjsn597b10fc231f',
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';
const createRequest = (url) => ({url, headers: cryptoApiHeaders});


// Function to create API
export const cryptoAPI = createApi      ({
    reducerPath: 'cryptoAPI',
    baseQuery : fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({  
// query to get list of all coins        
        getCryptos : builder.query({
            // query: (count) => createRequest('/coins'),
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),

        
// query for getting specific coin details        
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
        }),
    })
});

// Exporting the API
export const {
    useGetCryptosQuery,useGetCryptoDetailsQuery
} = cryptoAPI; 


// const options = {
//     method: 'GET',
//     url: 'https://coinranking1.p.rapidapi.com/coins',
//     params: {
//       referenceCurrencyUuid: 'yhjMzLPhuIDl',
//       timePeriod: '24h',
//       'tiers[0]': '1',
//       orderBy: 'marketCap',
//       orderDirection: 'desc',
//       limit: '50',
//       offset: '0'
//     },
//     headers: {
//       'X-RapidAPI-Key': 'fa58d7cfddmshafbd78efef0d81bp1ec46fjsn597b10fc231f',
//       'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
//     }
//   };
  