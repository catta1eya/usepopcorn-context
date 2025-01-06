import Navbar from "./Navbar";
import Main from "./main";
import Search from "./Search";
import Numresults from "./Numresults";
import Box from "./Box";
import MoviesList from "./MoviesList";
import WatchedMoviesList from "./WatchedMoviesList";
import WatchedSummary from "./WatchedSummary";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";
import { useMovieContext } from "./MovieContext";

const App = () => {
  const {
    selectedMovie,
    errListQuery,
    isListLoading,
    isMovieLoading,
    errMovieQuery,
  } = useMovieContext();

  return (
    <>
      <Navbar>
        <Search />
        <Numresults />
      </Navbar>
      <Main>
        <Box>
          {isListLoading && <Loader />}
          {!isListLoading && !errListQuery && <MoviesList />}
          {errListQuery && <ErrorMessage />}
        </Box>
        <Box>
          {isMovieLoading && <Loader />}
          {!isMovieLoading && !errMovieQuery && (
            <>
              {selectedMovie ? (
                <MovieDetails />
              ) : (
                <>
                  <WatchedSummary />
                  <WatchedMoviesList />
                </>
              )}
            </>
          )}
          {errMovieQuery && <ErrorMessage />}
        </Box>
      </Main>
    </>
  );
};

export default App;
