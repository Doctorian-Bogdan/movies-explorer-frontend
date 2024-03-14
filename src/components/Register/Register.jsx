import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validate } from 'email-validator';
import logo from '../../images/logo.svg';
import { regName } from '../../utils/constants';
import auth from '../../utils/Auth';
import MainApi from '../../utils/MainApi';

function Register({ setIsLoggedIn, setCurrentUser }) {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [nameValid, setNameValid] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);

  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [emailValid, setEmailValid] = useState(false);

  const [isSubmitOk, setIsSubmitOk] = useState(false);
  const [isRequestSending, setIsRequestSending] = useState(false);
  const [submitErr, setSubmitErr] = useState('');

  function handleChangeName(e) {
    setName(e.target.value);
    setNameValid(regName.test(e.target.value));
    if (e.target.value.length === 1) {
      setNameErr('Текст должен быть не короче 2 симв. Длина текста сейчас: 1 символ.');
    }
    if (e.target.value.length > 1 && !regName.test(e.target.value)) {
      setNameErr('Поле \'Имя\' может содержать только латиницу, кириллицу, пробел или дефис');
    }

    if (e.target.value.length > 1 && regName.test(e.target.value)) {
      setNameErr('');
    }

    if (e.target.value === '') {
      setNameErr('Заполните это поле');
    }
  }

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
    auth.register(name, email, password)
      .then(() => {
        setIsSubmitOk(true);
        setSubmitErr('Вы успешно зарегестрировались! Сейчас вы будете автоматически авторизованы.');
        auth.authorize(email, password).then((res) => {
          setSubmitErr('');
          setName('');
          setEmail('');
          setPassword('');
          localStorage.setItem('jwt', res.token);
          setIsLoggedIn(true);
          MainApi.getUserInfo().then((user) => setCurrentUser(user));
          navigate('/movies', { replace: true });
        });
      })
      .catch((err) => {
        setIsSubmitOk(false);
        if (err.includes('409')) {
          setSubmitErr('Пользователь с таким e-mail уже существует');
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

  const submitButtonStatus = nameValid && emailValid && passwordValid;

  return (
    <main className="register">
      <section className="register__page">
        <Link to="/">
          <img className="register__logo" src={logo} alt="Логотип" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form className="register__form" onSubmit={handleFormSubmit} noValidate name="register">
          <label htmlFor="name" className="register__label">
            Имя
            <input
              className="register__input"
              onChange={handleChangeName}
              type="text"
              name="name"
              id="name"
              placeholder="Имя"
              minLength="2"
              maxLength="30"
              required
            />
            <p className="register__input-error">{nameErr}</p>
          </label>
          <label htmlFor="email" className="register__label">
            E-mail
            <input
              className="register__input"
              onChange={handleChangeEmail}
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              required
            />
            <p className="register__input-error">{emailErr}</p>
          </label>
          <label htmlFor="password" className="register__label">
            Пароль
            <input
              className="register__input"
              onChange={handleChangePassword}
              type="password"
              name="password"
              id="password"
              placeholder="Пароль"
              minLength="6"
              maxLength="30"
              required
            />
            <p className="register__input-error">{passwordErr}</p>
          </label>
          <p className={`register__submit-error ${isSubmitOk ? 'register__submit-error_ok' : ''}`}>
            {submitErr}
          </p>
          <button className="register__button" type="submit" disabled={submitButtonStatus && !isRequestSending ? '' : true}>
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
