import WatchedMovie from "./WatchedMovie";

const WatchedMoviesList = ({ watched, onRemoveWatchedMovie }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbId}
          movie={movie}
          onRemoveWatchedMovie={onRemoveWatchedMovie}
        />
      ))}
    </ul>
  );
};

export default WatchedMoviesList;
