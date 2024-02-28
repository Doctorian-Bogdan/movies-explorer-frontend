import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {
  const location = useLocation();

  return (
    <header className={`${location.pathname === '/' ? 'header_landing' : 'header'}`}>
      <div className="app__section-container header__container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="логотип" />
        </Link>
        <nav className="header__navigation">
          {loggedIn ? <Navigation /> : (
            <div className="header__links">
              <Link to="/signup" className="header__link">Регистрация</Link>
              <Link to="/signin" className="header__link header__link_type_login">Войти</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
