import { useMovieContext } from "./MovieContext";
import WatchedMovie from "./WatchedMovie";

const WatchedMoviesList = () => {
  const { watched } = useMovieContext();
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbId} movie={movie} />
      ))}
    </ul>
  );
};

export default WatchedMoviesList;
