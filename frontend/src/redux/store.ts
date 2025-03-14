import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import authSlice from './features/auth/authSlice.ts'
import moviesSlice from './features/movie/movieSlice.ts'
import { apiSlice } from './api/apiSlice.ts'

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
        movies: moviesSlice,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    // devtools: true
})

setupListeners(store.dispatch)

export default store