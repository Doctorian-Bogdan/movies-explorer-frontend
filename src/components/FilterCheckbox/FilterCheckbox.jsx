import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__label" htmlFor="switcher">
        <input type="checkbox" id="switcher" className="filter-checkbox__input" />
        <p className="filter-checkbox__name">Короткометражки</p>
      </label>
    </div>
  );
}

export default FilterCheckbox;
