import { useMovieContext } from "./MovieContext";

const Numresults = () => {
  const { movies } = useMovieContext();

  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};

export default Numresults;
