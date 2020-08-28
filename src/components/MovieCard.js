import React, { useContext } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import moviesContext from "../moviesContext";

function MovieCard({ movie }) {
  const selectMovie = useContext(moviesContext);

  function onChange(event) {
    selectMovie(event.target.checked ? movie : null);
  }

  return movie.poster_path ? (
    <div className="max-w-sm  overflow-hidden  mt-3 mb-6 rounded-lg shadow-2xl">
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt="404"
        className="  w-full object-cover "
      />
      <div className="py-2 bg-white text-black font-semibold flex justify-evenly items-center">
        <div className=" flex flex-col justify-center items-center  ">
          <span className="sm:text-xs" role="img" aria-label="Star">
            ⭐️
          </span>
          <p className="sm:text-xs">{movie.vote_average}</p>
        </div>
        <span className=" flex flex-col justify-center items-center  ">
          <p className="sm:text-xs">Vote </p>
          <p className="sm:text-xs">{movie.vote_count} </p>
        </span>
        <Checkbox color="default" onChange={onChange} />
      </div>
    </div>
  ) : null;
}

export default MovieCard;
