import { useMovieContext } from "./MovieContext";

const ErrorMessage = () => {
  const { errListQuery, errMovieQuery } = useMovieContext();
  return (
    <p className="error">
      <span>⛔</span> {errListQuery || errMovieQuery}
    </p>
  );
};

export default ErrorMessage;
