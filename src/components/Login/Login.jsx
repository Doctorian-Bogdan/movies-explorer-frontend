import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validate } from 'email-validator';
import logo from '../../images/logo.svg';
import auth from '../../utils/Auth';

function Login({ setCurrentUser, setIsLoggedIn }) {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [submitErr, setSubmitErr] = useState('');
  const [isRequestSending, setIsRequestSending] = useState(false);

  const submitButtonStatus = emailValid && passwordValid;

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    setEmailValid(validate(e.target.value));
    if (!validate(e.target.value)) {
      setEmailErr('Невалидный E-mail');
    } else {
      setEmailErr('');
    }
    if (e.target.value === '') {
      setEmailErr('Заполните это поле');
    }
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
    setPasswordErr(e.target.validationMessage);
    setPasswordValid(e.target.validity.valid);
    if (e.target.value === '') {
      setPasswordErr('Заполните это поле');
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setIsRequestSending(true);
    auth.authorize(email, password)
      .then((res) => {
        setSubmitErr('');
        setEmail('');
        setPassword('');
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        setCurrentUser(res);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        if (err.includes('401')) {
          setSubmitErr('Введены неверный логин или пароль');
        } else {
          setSubmitErr('Что-то пошло не так');
        }
        setTimeout(() => {
          setSubmitErr('');
        }, 3000);
      })
      .finally(() => {
        setIsRequestSending(false);
      });
  }

  return (
    <main className="login">
      <section className="login__page">
        <Link to="/">
          <img className="login__logo" src={logo} alt="логотип" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form className="login__form" onSubmit={handleFormSubmit} noValidate name="login">
          <label htmlFor="email" className="login__label">
            E-mail
            <input
              className="login__input"
              onChange={handleChangeEmail}
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              required
            />
            <p className="login__input-error">{emailErr}</p>
          </label>
          <label htmlFor="password" className="login__label">
            Пароль
            <input
              className="login__input"
              onChange={handleChangePassword}
              type="password"
              name="password"
              id="password"
              placeholder="Пароль"
              minLength="6"
              maxLength="30"
              required
            />
            <p className="login__input-error">{passwordErr}</p>
          </label>
          <p className="login__submit-error">{submitErr}</p>
          <button className="login__button" type="submit" disabled={submitButtonStatus && !isRequestSending ? '' : true}>
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
