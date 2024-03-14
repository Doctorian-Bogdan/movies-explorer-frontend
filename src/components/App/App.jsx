import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import MainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);

  const location = useLocation();

  const headerPaths = location.pathname === '/'
    || location.pathname === '/movies'
    || location.pathname === '/saved-movies'
    || location.pathname === '/profile';

  const footerPaths = location.pathname === '/'
    || location.pathname === '/movies'
    || location.pathname === '/saved-movies';

  useEffect(() => {
    setIsLoading(true);
    MainApi.getUserInfo()
      .then((res) => {
        setIsLoggedIn(true);
        setIsLoading(false);
        setCurrentUser(res);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    function handleWindowResizeTimeout() {
      setTimeout(() => {
        setWindowWidth(document.documentElement.clientWidth);
      }, '500');
    }

    window.addEventListener('resize', handleWindowResizeTimeout);
    return () => {
      window.removeEventListener('resize', handleWindowResizeTimeout);
    };
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {headerPaths && <Header isLoggedIn={isLoggedIn} />}
        <Routes>
          {!isLoading && (
            <>
              <Route path="/" element={<Main />} />
              <Route
                path="/movies"
                element={(
                  <ProtectedRoute
                    element={<Movies windowWidth={windowWidth} />}
                    isLoggedIn={isLoggedIn}
                  />
                )}
              />
              <Route
                path="/saved-movies"
                element={(
                  <ProtectedRoute
                    element={<Movies windowWidth={windowWidth} />}
                    isLoggedIn={isLoggedIn}
                  />
                )}
              />

              {!isLoggedIn && <Route path="/signin" element={<Login setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />} />}
              {!isLoggedIn && <Route path="/signup" element={<Register setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />} />}
              <Route
                path="/profile"
                element={(
                  <ProtectedRoute
                    /* eslint-disable-next-line max-len */
                    element={<Profile setCurrentUser={setCurrentUser} setIsLoggedIn={setIsLoggedIn} />}
                    isLoggedIn={isLoggedIn}
                  />
                )}
              />
              <Route path="*" element={<NotFound />} />
            </>
          )}
        </Routes>
        {footerPaths && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
