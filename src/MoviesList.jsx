import Movie from "./Movie";
import { useMovieContext } from "./MovieContext";

const MoviesList = () => {
  const { movies } = useMovieContext();

  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
};

export default MoviesList;
