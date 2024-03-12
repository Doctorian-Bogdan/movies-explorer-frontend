import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { setMovieDuration } from '../../utils/constants';

function MoviesCard({
  movieData,
  handleSaveMovie,
  savedId,
  handleDeleteMovie,
}) {
  const location = useLocation();

  const [isMovieSaved, setIsMovieSaved] = useState(false);

  function saveMovie() {
    setIsMovieSaved(handleSaveMovie(movieData));
  }

  function deleteMovie() {
    setIsMovieSaved(handleDeleteMovie(savedId));
  }

  function deleteSavedMovie() {
    handleDeleteMovie(movieData._id);
  }

  useEffect(() => {
    if (savedId) {
      setIsMovieSaved(true);
    }
  }, [savedId]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {location.pathname === '/movies' && (
        <li className="movies-card__item">
          <a className="movies-card__link" href={movieData.trailerLink} target="_blank" rel="noreferrer">
            <img
              className="movies-card__image"
              src={`https://api.nomoreparties.co${movieData.image.url}`}
              alt={`постер к фильму ${movieData.nameRU}`}
            />
          </a>
          <div className="movies-card__container">
            <div className="movies-card__text">
              <h2 className="movies-card__title">
                {movieData.nameRU}
              </h2>
              <p className="movies-card__duration">
                {setMovieDuration(movieData)}
              </p>
            </div>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className={`movies-card__button ${isMovieSaved ? 'movies-card__button_active' : ''}`}
              onClick={isMovieSaved ? deleteMovie : saveMovie}
            />
          </div>
        </li>
      )}
      {location.pathname === '/saved-movies' && (
        <li className="movies-card__item">
          <a className="movies-card__link" href={movieData.trailerLink} target="_blank" rel="noreferrer">
            <img
              className="movies-card__image"
              src={movieData.image}
              alt={`постер к фильму ${movieData.nameRU}`}
            />
          </a>
          <div className="movies-card__container">
            <div className="movies-card__text">
              <h2 className="movies-card__title">
                {movieData.nameRU}
              </h2>
              <p className="movies-card__duration">
                {setMovieDuration(movieData)}
              </p>
            </div>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="movies-card__button_delete"
              onClick={deleteSavedMovie}
            />
          </div>
        </li>
      )}
    </>
  );
}

export default MoviesCard;
