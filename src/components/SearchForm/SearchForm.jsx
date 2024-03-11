import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesApi from '../../utils/MoviesApi';

function SearchForm({
  setIsLoaderOpen,
  searchCheckbox,
  setSearchCheckbox,
  setSearchInputMovieFilter,
  setApiMovies,
  apiMovies,
  searchInput,
  setSearchInput,
  searchInputSavedMovies,
  setSearchInputSavedMovies,
  setSearchInputSavedMoviesFilter,
  searchCheckboxSavedMovies,
  setSearchCheckboxSavedMovies,
}) {
  const location = useLocation();

  const [searchInputErr, setSearchInputErr] = useState('');
  const [searchInputErrSaveMovies, setSearchInputErrSaveMovies] = useState('');

  const [isRequestSending, setIsRequestSending] = useState(false);

  function handleChangeSearchInput(e) {
    if (location.pathname === '/movies') {
      setSearchInput(e.target.value);
      if (e.target.value.length > 0) {
        setSearchInputErr('');
      }
    } else {
      setSearchInputSavedMovies(e.target.value);
      if (e.target.value.length > 0) {
        setSearchInputErrSaveMovies('');
      }
    }
  }

  function handleChangeSearchCheckbox(e) {
    setSearchCheckbox(e.target.checked);
    localStorage.setItem('lastCheckbox', JSON.stringify(e.target.checked));
  }

  function handleChangeSearchCheckboxSaveMovies(e) {
    setSearchCheckboxSavedMovies(e.target.checked);
  }

  function handleFormSubmitSavedMovies(e) {
    e.preventDefault();
    if (searchInputSavedMovies === '') {
      setSearchInputErrSaveMovies('Нужно ввести ключевое слово');
      return;
    }
    setSearchInputSavedMoviesFilter(searchInputSavedMovies);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (searchInput === '') {
      setSearchInputErr('Нужно ввести ключевое слово');
      return;
    }
    if (apiMovies.length > 0) {
      setSearchInputMovieFilter(searchInput);
      localStorage.setItem('lastInput', searchInput);
      localStorage.setItem('lastCheckbox', searchCheckbox);
      return;
    }
    setIsRequestSending(true);
    setIsLoaderOpen(true);
    MoviesApi.getMovies()
      .then((res) => {
        setApiMovies(res);
        setSearchInputMovieFilter(searchInput);
        localStorage.setItem('lastInput', searchInput);
        localStorage.setItem('lastCheckbox', JSON.stringify(searchCheckbox));
        localStorage.setItem('movies', JSON.stringify(res));
      })
      .catch(() => {
        setSearchInputErr('Что-то пошло не так');
        setTimeout(() => {
          setSearchInputErr('');
        }, 3000);
      })
      .finally(() => {
        setIsLoaderOpen(false);
        setIsRequestSending(false);
      });
  }

  useEffect(() => {
    if (location.pathname !== '/saved-movies') {
      setSearchInputErrSaveMovies('');
    }

    if (location.pathname !== '/movies') {
      setSearchInputErr('');
    }
  }, [location.pathname]);

  return (
    <section className="search-form">
      <form
        className="search-form__form app__section-container"
        onSubmit={location.pathname === '/movies' ? handleFormSubmit : handleFormSubmitSavedMovies}
        noValidate
      >
        <div className="search-form__field">
          <input
            type="text"
            className="search-form__input"
            placeholder="Фильм"
            value={location.pathname === '/movies' ? searchInput : searchInputSavedMovies}
            onChange={handleChangeSearchInput}
            required
          />
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button type="submit" className="search-form__button" disabled={!isRequestSending ? '' : true} />
        </div>
        <p className="search-form__input-error">
          {location.pathname === '/movies' ? searchInputErr : searchInputErrSaveMovies}
        </p>
        <FilterCheckbox
          searchCheckbox={searchCheckbox}
          handleChangeSearchCheckbox={handleChangeSearchCheckbox}
          searchCheckboxSavedMovies={searchCheckboxSavedMovies}
          handleChangeSearchCheckboxSaveMovies={handleChangeSearchCheckboxSaveMovies}
        />
      </form>
    </section>
  );
}

export default SearchForm;
