import React from 'react';

function MoviesCard({ movie }) {
  return (
    <li className="movies-card__item">
      <img className="movies-card__image" src={movie.thumbnail} alt={`постер к фильму ${movie.name}`} />
      <div className="movies-card__container">
        <div className="movies-card__text">
          <h2 className="movies-card__title">
            {movie.name}
          </h2>
          <p className="movies-card__duration">
            1ч 47м
          </p>
        </div>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button type="button" className="movies-card__button" />
      </div>
    </li>
  );
}

export default MoviesCard;
