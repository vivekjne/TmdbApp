// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PopularMovie } from "../types/PopularMovie.type";
import Constants from "expo-constants";
import { MovieDetail } from "../types/MovieDetail.type";
import { CreditResponse } from "../types/Credits.type";
// Define a service using a base URL and expected endpoints

const apiKey = Constants.expoConfig?.extra.apiKey;
export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${Constants.expoConfig?.extra.apiBaseUrl}/${Constants.expoConfig?.extra.apiVersion}`,
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query<PopularMovie, number>({
      query: (page) =>
        `movie/popular?api_key=${Constants.expoConfig?.extra.apiKey}&language=en-US&page=${page}`,
    }),

    getMovieDetail: builder.query<MovieDetail, number>({
      query: (movieId) =>
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`,
    }),

    getMovieCredits: builder.query<CreditResponse, number>({
      query: (movieId) =>
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPopularMoviesQuery,
  useGetMovieDetailQuery,
  useGetMovieCreditsQuery,
} = tmdbApi;
