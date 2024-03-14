import React from 'react';
import './FilterCheckbox.css';
import { useLocation } from 'react-router-dom';

function FilterCheckbox({
  searchCheckbox,
  handleChangeSearchCheckbox,
  searchCheckboxSavedMovies,
  handleChangeSearchCheckboxSaveMovies,
}) {
  const location = useLocation();

  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__label" htmlFor="switcher">
        {location.pathname === '/movies' && (
          <input
            checked={searchCheckbox ? true : ''}
            onChange={handleChangeSearchCheckbox}
            className="filter-checkbox__input"
            type="checkbox"
            id="switcher"
          />
        )}
        {location.pathname === '/saved-movies' && (
          <input
            checked={searchCheckboxSavedMovies ? true : ''}
            onChange={handleChangeSearchCheckboxSaveMovies}
            className="filter-checkbox__input"
            type="checkbox"
            id="switcher"
          />
        )}
        <p className="filter-checkbox__name">Короткометражки</p>
      </label>
    </div>
  );
}

export default FilterCheckbox;
