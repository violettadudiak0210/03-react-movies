import axios from "axios";
import type { Movie } from "../types/movie";

export interface MoviesHttpResponse {
  results: Movie[];
}

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const fetchMovies = async (
  query: string,
): Promise<MoviesHttpResponse> => {
  const response = await axios.get<MoviesHttpResponse>(
    'https://api.themoviedb.org/3/search/movie',
    {
      params: {
        api_key: API_KEY,
        query,
        language: 'en-US',
        include_adult: false,
      },
    },
  );

  return response.data;
};