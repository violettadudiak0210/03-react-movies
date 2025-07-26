import axios from "axios";
import type { Movie } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;

export interface MoviesHttpResponse {
  results: Movie[];
}

export const fetchMovies = async (
    query: string
): Promise<MoviesHttpResponse> => {
    const response = await axios.get<MoviesHttpResponse>(
        "https://api.themoviedb.org/3/search/movie",
      {
          params: { query },
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );
  return response.data;
}