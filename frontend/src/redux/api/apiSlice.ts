import { BASE_URL } from "../constants";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ 
    baseUrl: BASE_URL,
    credentials: 'include',
})

export const apiSlice = createApi({
    baseQuery, 
    endpoints: () => ({})
})