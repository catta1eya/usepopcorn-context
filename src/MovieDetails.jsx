import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import StarRating from "./StarRating";
import { useMovieContext } from "./MovieContext";
import { useEffect, useState } from "react";

const MovieDetails = () => {
  const [userRating, setUserRating] = useState(null);

  const {
    selectedMovie,
    handleCloseMovie,
    handleAddWatchedMovie,
    watched,
    isMovieLoading,
    errMovieQuery,
  } = useMovieContext();

  const isWatched = watched
    .map((movie) => movie.imdbId)
    .includes(selectedMovie.imdbId);

  const watchedRating = watched.find(
    (movie) => movie.imdbId === selectedMovie.imdbId
  )?.userRating;

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = selectedMovie;

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbId: selectedMovie.imdbId,
      title,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };

    handleAddWatchedMovie(newWatchedMovie);
    handleCloseMovie();
  };

  useEffect(() => {
    const callback = (e) => {
      if (e.code === "Escape") handleCloseMovie();
    };

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [handleCloseMovie]);

  return (
    <div className="details">
      {isMovieLoading && <Loader />}
      {errMovieQuery && <ErrorMessage />}
      {!isMovieLoading && !errMovieQuery && (
        <>
          <header>
            <button className="btn-back" onClick={handleCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} • {runtime}
              </p>
              <p>{genre}</p>
              <p>⭐ {imdbRating} IMDb rating</p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You rated this movie {watchedRating} ⭐</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
