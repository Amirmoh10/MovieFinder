import React from "react";
import MovieCard from "./MovieCard";
import PropTypes from "prop-types";

function MoviesList({ filteredMovies }) {
  return (
    <div className="overflow-auto my-3">
      {filteredMovies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </div>
  );
}

export default MoviesList;

MovieCard.propTypes = {
  movie: PropTypes.object,
};
