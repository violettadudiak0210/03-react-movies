import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieModal from "../MovieModal/MovieModal";

import styles from "./App.module.css";

export default function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    
    const handleSelectMovie = (movie: Movie) => setSelectedMovie(movie);

    const closeModal = () => setSelectedMovie(null);

    const handleSearch = async (query: string) => {
        setMovies([]);
        setIsError(false);
        setIsLoading(true);
        
        try {
            const data = await fetchMovies(query);
            if (data.results.length == 0) {
                throw new Error("Please enter your search query.");
            }
            setMovies([...data.results]);
        }
        catch (error) {
            toast.error(`${error}`);
            setIsError(true);
        }
        finally {
            setIsLoading(false);
        }
    };
    return (
        <div className={styles.app}>
           <Toaster position="top-center" reverseOrder={false} />
            <SearchBar onSubmit={handleSearch} />

            {isLoading && <Loader />}
            {isError && <ErrorMessage />}

            {movies.length > 0 && (
                <MovieGrid movies={movies} onSelect={handleSelectMovie} />
            )}
      {selectedMovie !== null && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
        </div>
    )
}