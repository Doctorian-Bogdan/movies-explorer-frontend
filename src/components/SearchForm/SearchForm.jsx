import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__form app__section-container">
        <div className="search-form__field">
          <input type="text" className="search-form__input" placeholder="Фильм" required />
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button type="submit" className="search-form__button" />
        </div>
        <FilterCheckbox />
      </form>
    </section>
  );
}

export default SearchForm;
