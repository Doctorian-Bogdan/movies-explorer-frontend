import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profile from '../../images/profile.svg';

function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  function handleOpenMenu() {
    setIsOpen(!isOpen);
  }
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!isOpen ? (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button
          className="burger-menu__button"
          type="button"
          onClick={handleOpenMenu}
        />
      ) : (
        <div className="burger-menu__container">
          <nav className="burger-menu__wrapper">
            <ul className="burger-menu__links">
              <li className="burger-menu__list__item">
                <Link
                  className={`burger-menu__link ${
                    location.pathname === '/'
                      ? 'burger-menu__link_active'
                      : ''
                  }`}
                  to="/"
                >
                  Главная
                </Link>
              </li>
              <li className="burger-menu__list__item">
                <Link
                  className={`burger-menu__link ${
                    location.pathname === '/movies'
                      ? 'burger-menu__link_active'
                      : ''
                  }`}
                  to="/movies"
                >
                  Фильмы
                </Link>
              </li>
              <li className="burger-menu__list__item">
                <Link
                  className={`burger-menu__link ${
                    location.pathname === '/saved-movies'
                      ? 'burger-menu__link_active'
                      : ''
                  }`}
                  to="/saved-movies"
                >
                  Сохранённые фильмы
                </Link>
              </li>
            </ul>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              className="burger-menu__close-button"
              type="button"
              onClick={handleOpenMenu}
            />

            <Link to="/profile" className="burger-menu__link_profile">
              <span className="burger-menu__link_text">Аккаунт</span>
              <div className="burger-menu__link_profile-img">
                <img src={profile} alt="иконка профиля" />
              </div>
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

export default BurgerMenu;
