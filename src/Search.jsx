import { useEffect, useState } from "react";
import { useDebounce, useMovieContext } from "./MovieContext";

const Search = () => {
  const { fetchMovies, handleCloseMovie } = useMovieContext();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    handleCloseMovie();

    if (debouncedQuery) fetchMovies(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default Search;
