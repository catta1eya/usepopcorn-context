import { useEffect, useState } from "react";
import { useMovieContext } from "./MovieContext";

const Search = () => {
  const { fetchMovies } = useMovieContext();
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchMovies(query);
  }, [query]);

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
