import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function Navigation() {
  const location = useLocation();

  return (
    <nav className="header-nav">
      <div className="header-nav__block">
        <Link
          className={`header-nav__link ${
            location.pathname === '/movies'
              ? 'header-nav__link_active'
              : ''
          }`}
          to="/movies"
        >
          Фильмы
        </Link>
        <Link
          className={`header-nav__link ${
            location.pathname === '/saved-movies'
              ? 'header-nav__link_active'
              : ''
          }`}
          to="/saved-movies"
        >
          Сохранённые фильмы
        </Link>
      </div>
      <div className="header-nav__block">
        <Link
          className={`header-nav__link ${
            location.pathname === '/profile'
              ? 'header-nav__link_active'
              : ''
          }`}
          to="/profile"
        >
          Аккаунт
        </Link>
        <Link
          className={`header-nav__button ${
            location.pathname !== '/'
              ? 'header-nav__button_black'
              : ''
          }`}
          to="/profile"
        />
      </div>
      <BurgerMenu />
    </nav>
  );
}

export default Navigation;
