import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export const useMovieContext = () => useContext(MovieContext);

export const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [isListLoading, setIsListLoading] = useState(false);
  const [isMovieLoading, setIsMovieLoading] = useState(false);
  const [errListQuery, setErrListQuery] = useState("");
  const [errMovieQuery, setErrMovieQuery] = useState("");

  const handleSelectMovie = (id) => {
    if (selectedMovie && selectedMovie?.imdbID === id) {
      handleCloseMovie();
      return;
    }

    fetchMovieDetails(id);
  };

  const handleCloseMovie = () => {
    setSelectedMovie(null);
  };

  const handleAddWatchedMovie = (movie) => {
    setWatched((watchedMovies) => [...watchedMovies, movie]);
  };

  const handleDeleteWatchedMovie = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbId !== id));
  };

  const fetchMovies = async (query) => {
    if (query.length < 3) {
      setMovies([]);
      setErrListQuery("");
      return;
    }

    try {
      setErrListQuery(false);
      setIsListLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${
          import.meta.env.VITE_API_KEY
        }&s=${query}`
      );

      if (!res.ok) throw new Error("Something went wrong");

      const data = await res.json();

      if (data.Response === "False") throw new Error("Movie not found");

      setMovies(data.Search);
    } catch (err) {
      console.error(err.message);
      setErrListQuery(err.message);
    } finally {
      setIsListLoading(false);
    }
  };

  const fetchMovieDetails = async (selectedId) => {
    try {
      setErrMovieQuery(false);
      setIsMovieLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
      );

      if (!res.ok) throw new Error("Failed to fetch movie details");

      const data = await res.json();

      if (data.Response === "False") throw new Error("No Results");

      setSelectedMovie(data);
    } catch (err) {
      console.error(err.message);
      setErrMovieQuery(err.message);
    } finally {
      setIsMovieLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedMovie) return;

    document.title = `MOVIE | ${selectedMovie.Title}`;

    return () => {
      document.title = "usePopcorn";
    };
  }, [selectedMovie]);

  const value = {
    movies,
    watched,
    selectedMovie,
    errListQuery,
    errMovieQuery,
    isListLoading,
    isMovieLoading,
    fetchMovies,
    handleSelectMovie,
    handleCloseMovie,
    handleAddWatchedMovie,
    handleDeleteWatchedMovie,
  };
  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
