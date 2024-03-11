import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import { itemWidth, numberOfDisplayedMovies } from '../../utils/constants';

function MoviesCardList({
  windowWidth,
  foundMovies,
  showedMovies,
  setShowedMovies,
  handleSaveMovie,
  savedMovies,
  handleDeleteMovie,
  shownSavedMovies,
}) {
  const location = useLocation();

  const [filmsCount, setFilmsCount] = React.useState(3);

  function getMoreMovies() {
    setShowedMovies([
      ...showedMovies,
      ...foundMovies.slice(showedMovies.length, showedMovies.length + filmsCount),
    ]);
  }

  useEffect(() => {
    function showMovies({ display, add }) {
      return [setShowedMovies(foundMovies.slice(0, display)), setFilmsCount(add)];
    }

    if (itemWidth.threeColumns < windowWidth) {
      showMovies(numberOfDisplayedMovies.pcScreen);
    }
    if (itemWidth.twoColumns < windowWidth && windowWidth <= itemWidth.threeColumns) {
      showMovies(numberOfDisplayedMovies.tabletScreen);
    }
    if (windowWidth <= itemWidth.twoColumns) {
      showMovies(numberOfDisplayedMovies.mobileScreen);
    }
  }, [foundMovies, setShowedMovies, windowWidth]);

  return (
    <section className="movies-cards">
      <div className="app__section-container movies-cards__container">
        {location.pathname === '/movies' && (
          <>
            <ul className="movies-cards__list">
              {showedMovies.map((movieData) => {
                let savedId;
                savedMovies.forEach((savedMovie) => {
                  if (savedMovie.movieId === movieData.id) {
                    savedId = savedMovie._id;
                  }
                });
                return (
                  <MoviesCard
                    key={movieData.id}
                    movieData={movieData}
                    handleSaveMovie={handleSaveMovie}
                    savedId={savedId}
                    handleDeleteMovie={handleDeleteMovie}
                  />
                );
              })}
            </ul>
            {!(foundMovies.length === showedMovies.length) && (
              <button type="button" className="movies-cards__button" onClick={getMoreMovies}>
                Ещё
              </button>
            )}
          </>
        )}
        {location.pathname === '/saved-movies' && (
        <ul className="movies-cards__list">
          {shownSavedMovies.map((movieData) => (
            <MoviesCard
              key={movieData._id}
              movieData={movieData}
              handleDeleteMovie={handleDeleteMovie}
            />
          ))}
        </ul>
        )}
      </div>
    </section>
  );
}

export default MoviesCardList;
