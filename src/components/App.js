import React from "react";
import { useEffect, useReducer } from "react";
import MoviesList from "./MoviesList";
import moviesContext from "../moviesContext";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

const initialState = {
  typedInMovieTitle: "",
  submittedMovieTitle: "",
  movies: [],
  isLoading: false,
  isError: false,
  selectedMovie: null,
};

const ACTION = {
  TYPE_SEARCH: "TYPE_SEARCH",
  SUBMIT_SEARCH: "SUBMIT_SEARCH",
  FETCH_DATA: "FETCH_DATA",
  FETCH_DATA_SUCCESS: "FETCH_DATA_SUCCESS",
  FETCH_DATA_FAIL: "FETCH_DATA_FAIL",
  SELECT_MOVIE: "SELECT_MOVIE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.TYPE_SEARCH:
      return {
        ...state,
        typedInMovieTitle: action.value,
      };

    case ACTION.SUBMIT_SEARCH:
      return {
        ...state,
        submittedMovieTitle: state.typedInMovieTitle,
      };

    case ACTION.FETCH_DATA:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case ACTION.FETCH_DATA_SUCCESS:
      return {
        ...state,
        movies: action.value,
        isLoading: false,
        isError: false,
      };

    case ACTION.FETCH_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case ACTION.SELECT_MOVIE: {
      return {
        ...state,
        selectedMovie: action.value,
      };
    }

    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function onChange(event) {
    dispatch({
      type: ACTION.TYPE_SEARCH,
      value: event.target.value,
    });
  }

  function onSubmit(event) {
    event.preventDefault();
    dispatch({
      type: ACTION.SUBMIT_SEARCH,
    });
  }

  const API_Key = "16c66b0f7fd3c3447e7067ff07db3197";
  useEffect(() => {
    if (state.submittedMovieTitle) {
      const fetchData = async () => {
        dispatch({ type: "FETCH_DATA" });
        try {
          const result = await axios(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_Key}&query=${state.submittedMovieTitle}`
          );
          dispatch({
            type: ACTION.FETCH_DATA_SUCCESS,
            value: result.data.results,
          });
        } catch (error) {
          dispatch({ type: "FETCH_DATA_FAIL" });
        }
      };
      fetchData();
    }
  }, [state.submittedMovieTitle]);

  function selectMovie(movie) {
    dispatch({
      type: ACTION.SELECT_MOVIE,
      value: movie,
    });
  }

  const filteredMovies = !state.selectedMovie
    ? state.movies
    : [state.selectedMovie];

  return (
    <moviesContext.Provider value={selectMovie}>
      <div className="w-1/2 sm:auto md:auto lg:auto shadow-2xl h-screen mx-auto flex flex-col items-center">
        <div className="py-5">
          <span className="text-5xl font-light text-white  ">Movie</span>
          <span className="text-5xl font-light  py-2 px-2 text-red-600 ">
            Finder
          </span>
        </div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Search"
            className=" rounded shadow-2xl outline-none py-2 px-2"
            onChange={onChange}
          />
        </form>
        {state.isLoading ? (
          <CircularProgress color="secondary" />
        ) : state.isError ? (
          <p className="text-white shadow-xl mt-10 font-bold">
            Data failed to load
          </p>
        ) : (
          <MoviesList filteredMovies={filteredMovies} />
        )}
      </div>
    </moviesContext.Provider>
  );
}

export default App;
