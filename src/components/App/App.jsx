import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';

function App() {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);

  const headerPaths = location.pathname === '/'
    || location.pathname === '/movies'
    || location.pathname === '/saved-movies'
    || location.pathname === '/profile';

  const footerPaths = location.pathname === '/'
    || location.pathname === '/movies'
    || location.pathname === '/saved-movies';

  function login(e) {
    e.preventDefault();
    setLoggedIn(true);
    location.pathname = '/';
  }

  function logout(e) {
    e.preventDefault();
    setLoggedIn(false);
    location.pathname = '/';
  }

  return (
    <div className="App">
      {headerPaths && <Header loggedIn={loggedIn} />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile logout={logout} />} />
        <Route path="/signin" element={<Login login={login} />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {footerPaths && <Footer />}
    </div>
  );
}

export default App;
