import React from 'react';
import { useLocation } from 'react-router-dom';
import { movies, savedMovies } from '../../utils/moviesData';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
  const location = useLocation();

  return (
    <section className="movies-cards">
      <div className="app__section-container">
        <ul className="movies-cards__list">
          {location.pathname === '/movies'
            ? movies.map((movie) => <MoviesCard key={movie._id} movie={movie} />)
            : savedMovies.map((movie) => <MoviesCard key={movie._id} movie={movie} />)}
        </ul>
        <button type="button" className="movies-cards__button">
          Ещё
        </button>
      </div>
    </section>
  );
}

export default MoviesCardList;
