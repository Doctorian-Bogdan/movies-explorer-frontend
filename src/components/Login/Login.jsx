import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Login({ login }) {
  return (
    <main className="login">
      <section className="login__page">
        <Link to="/">
          <img className="login__logo" src={logo} alt="логотип" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form className="login__form" onSubmit={login}>
          <label htmlFor="email" className="login__label">
            E-mail
            <input
              className="login__input"
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              required
            />
          </label>
          <label htmlFor="password" className="login__label">
            Пароль
            <input
              className="login__input"
              type="password"
              name="password"
              id="password"
              placeholder="Пароль"
              minLength="4"
              maxLength="30"
              required
            />
          </label>
          <button className="login__button" type="submit">
            Войти
          </button>
        </form>
        <p className="login__text">
          Ещё не зарегистрированы?&nbsp;

          <Link className="login__link" to="/signup">
            Регистрация
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
