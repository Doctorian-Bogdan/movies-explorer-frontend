import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MainApi from '../../utils/MainApi';
import Search from '../../utils/Search';
import Preloader from '../Preloader/Preloader';

function Movies({ windowWidth }) {
  const location = useLocation();

  const [apiMovies, setApiMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [showedMovies, setShowedMovies] = useState([]);

  const [searchInput, setSearchInput] = useState('');
  const [searchInputMovieFilter, setSearchInputMovieFilter] = useState('');
  const [searchCheckbox, setSearchCheckbox] = useState(false);

  const [isMoviesNotFound, setIsMoviesNotFound] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);
  const [shownSavedMovies, setShownSavedMovies] = useState([]);

  const [searchInputSavedMovies, setSearchInputSavedMovies] = useState('');
  const [searchInputSavedMoviesFilter, setSearchInputSavedMoviesFilter] = useState('');
  const [searchCheckboxSavedMovies, setSearchCheckboxSavedMovies] = useState(false);

  const [isSavedMoviesNotFound, setIsSavedMoviesNotFound] = useState(false);
  const [isSavedMoviesNotAdded, setIsSavedMoviesNotAdded] = useState(false);

  const [isLoaderOpen, setIsLoaderOpen] = useState(false);

  function handleSaveMovie(movieData) {
    MainApi.saveMovie(movieData).then((res) => {
      setSavedMovies([...savedMovies, res]);
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteMovie(movieId) {
    MainApi.deleteMovie(movieId).then((deletedMovie) => {
      setSavedMovies((state) => state.filter((movie) => movie._id !== deletedMovie._id));
    })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    MainApi.getMovies()
      .then((res) => setSavedMovies(res))
      .catch((err) => console.log(err));

    const lastInput = localStorage.getItem('lastInput');
    const lastCheckbox = JSON.parse(localStorage.getItem('lastCheckbox'));
    const lastMovies = JSON.parse(localStorage.getItem('movies'));

    if (lastInput === null || lastCheckbox === null || lastMovies === null) {
      return;
    }

    setSearchInputMovieFilter(lastInput);
    setSearchInput(lastInput);
    setSearchCheckbox(lastCheckbox);
    setApiMovies(lastMovies);
  }, []);

  useEffect(() => {
    if (apiMovies.length > 0) {
      setActiveSearch(true);
    }
    // eslint-disable-next-line max-len
    const searchResult = apiMovies.filter((movie) => Search(movie, searchInputMovieFilter, searchCheckbox));

    if (searchResult.length === 0) {
      setIsMoviesNotFound(true);
    } else {
      setIsMoviesNotFound(false);
    }
    setFoundMovies(searchResult);
  }, [apiMovies, searchCheckbox, searchInputMovieFilter]);

  useEffect(() => {
    if (savedMovies.length === 0) {
      setIsSavedMoviesNotAdded(true);
    } else {
      setIsSavedMoviesNotAdded(false);
    }

    if (location.pathname !== '/saved-movies') {
      setSearchCheckboxSavedMovies(false);
      setSearchInputSavedMoviesFilter('');
      setSearchInputSavedMovies('');
    }

    // eslint-disable-next-line max-len
    const searchResult = savedMovies.filter((movie) => Search(movie, searchInputSavedMoviesFilter, searchCheckboxSavedMovies));

    if (searchResult.length === 0) {
      setIsSavedMoviesNotFound(true);
    } else {
      setIsSavedMoviesNotFound(false);
    }
    setShownSavedMovies(searchResult);
  }, [location.pathname, savedMovies, searchCheckboxSavedMovies, searchInputSavedMoviesFilter]);

  return (
    <div className="movies">
      <SearchForm
        setIsLoaderOpen={setIsLoaderOpen}
        searchCheckbox={searchCheckbox}
        setSearchCheckbox={setSearchCheckbox}
        setSearchInputMovieFilter={setSearchInputMovieFilter}
        setApiMovies={setApiMovies}
        apiMovies={apiMovies}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        searchInputSavedMovies={searchInputSavedMovies}
        setSearchInputSavedMovies={setSearchInputSavedMovies}
        setSearchInputSavedMoviesFilter={setSearchInputSavedMoviesFilter}
        searchCheckboxSavedMovies={searchCheckboxSavedMovies}
        setSearchCheckboxSavedMovies={setSearchCheckboxSavedMovies}
      />
      {location.pathname === '/movies' && foundMovies.length > 0 && (
      <MoviesCardList
        windowWidth={windowWidth}
        foundMovies={foundMovies}
        showedMovies={showedMovies}
        setShowedMovies={setShowedMovies}
        handleSaveMovie={handleSaveMovie}
        savedMovies={savedMovies}
        handleDeleteMovie={handleDeleteMovie}
      />
      )}
      {location.pathname === '/saved-movies' && (
        <MoviesCardList
          handleDeleteMovie={handleDeleteMovie}
          shownSavedMovies={shownSavedMovies}
        />
      )}
      {activeSearch && isMoviesNotFound && location.pathname === '/movies'
              && <p className="movies__error">Ничего не найдено!</p>}
      {!isSavedMoviesNotAdded && isSavedMoviesNotFound && location.pathname === '/saved-movies' && (
        <div className="movies__error-container">
          <p className="movies__error-message">По вашему запросу ничего не найдено</p>
        </div>
      )}
      {location.pathname === '/saved-movies' && isSavedMoviesNotAdded && (
        <div className="movies__error-container">
          <p className="movies__error-message">У вас пока нет сохраненных фильмов</p>
        </div>
      )}
      {isLoaderOpen && <Preloader />}
    </div>
  );
}

export default Movies;
