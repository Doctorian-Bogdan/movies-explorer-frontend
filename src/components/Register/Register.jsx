import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Register() {
  return (
    <main className="register">
      <section className="register__page">
        <Link to="/">
          <img className="register__logo" src={logo} alt="Логотип" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form className="register__form">
          <label htmlFor="name" className="register__label">
            Имя
            <input
              className="register__input"
              type="text"
              name="name"
              id="name"
              placeholder="Имя"
              minLength="2"
              maxLength="30"
              required
            />
          </label>
          <label htmlFor="email" className="register__label">
            E-mail
            <input
              className="register__input"
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              required
            />
          </label>
          <label htmlFor="password" className="register__label">
            Пароль
            <input
              className="register__input"
              type="password"
              name="password"
              id="password"
              placeholder="Пароль"
              minLength="4"
              maxLength="30"
              required
            />
          </label>
          <button className="register__button" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <p className="register__text">
          Уже зарегистрированы?&nbsp;
          <Link className="register__link" to="/signin">
            Войти
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
