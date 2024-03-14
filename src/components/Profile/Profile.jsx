import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validate } from 'email-validator';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { regName } from '../../utils/constants';
import MainApi from '../../utils/MainApi';

function Profile({ setCurrentUser, setIsLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const [name, setName] = useState(currentUser.name);
  const [nameErr, setNameErr] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);

  const [email, setEmail] = useState(currentUser.email);
  const [emailErr, setEmailErr] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [submitErr, setSubmitErr] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [isEditingErrOk, setIsEditingErrOk] = useState(false);

  const [isRequestSending, setIsRequestSending] = useState(false);

  // eslint-disable-next-line max-len
  const submitButtonStatus = isNameValid && isEmailValid && ((name !== currentUser.name) || (email !== currentUser.email));

  function handleLogout() {
    setCurrentUser({});
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/', { replace: true });
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleChangeName(e) {
    setName(e.target.value);
    setIsNameValid(regName.test(e.target.value));
    if (e.target.value.length === 1) {
      setNameErr('Имя должно быть не короче 2 символов');
    }
    if (e.target.value.length > 1 && !regName.test(e.target.value)) {
      setNameErr(
        'Поле \'Имя\' может содержать только латиницу, кириллицу, пробел или дефис',
      );
    }

    if (e.target.value.length > 1 && regName.test(e.target.value)) {
      setNameErr('');
    }

    if (e.target.value === '') {
      setNameErr('Заполните поле \'Имя\'');
    }
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    setIsEmailValid(validate(e.target.value));
    if (!validate(e.target.value)) {
      setEmailErr('Невалидный E-mail');
    } else {
      setEmailErr('');
    }
    if (e.target.value === '') {
      setEmailErr('Заполните поле E-mail');
    }
  }

  function submitForm(e) {
    e.preventDefault();
    if (name === currentUser.name && email === currentUser.email) {
      setSubmitErr('');
      setIsEditing(false);
      return;
    }

    setIsRequestSending(true);
    MainApi.editUserInfo({ name, email })
      .then((res) => {
        setCurrentUser(res);
        setSubmitErr('Изменения прошли успешно!');
        setIsEditingErrOk(true);
        setIsEditing(false);
        setTimeout(() => {
          setSubmitErr('');
          setIsEditingErrOk(false);
        }, 3000);
      })
      .catch((err) => {
        if (err.includes('409')) {
          setSubmitErr('Пользователь с таким E-mail уже существует');
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

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);
  return (
    <main>
      <section className="profile">
        <h1 className="profile__greeting">
          Привет,
          {currentUser.name}
          !
        </h1>
        <form className="profile__form" noValidate onSubmit={submitForm}>
          <label htmlFor="name" className="profile__container">
            <p className="profile__title">Имя</p>
            {isEditing ? (
              <input
                className="profile__input"
                onChange={handleChangeName}
                value={name}
                type="text"
                name="name"
                id="name"
                placeholder="Имя"
                minLength="2"
                maxLength="30"
                required
              />
            ) : (
              <p className="profile__text">{currentUser.name}</p>
            )}
          </label>

          <label htmlFor="email" className="profile__container">
            <p className="profile__title">E-mail</p>
            {isEditing ? (
              <input
                className="profile__input"
                onChange={handleChangeEmail}
                value={email}
                type="email"
                name="email"
                id="email"
                placeholder="E-mail"
                required
              />
            ) : (
              <p className="profile__text">{currentUser.email}</p>
            )}
          </label>

          <p
            className={`profile__form-error ${
              isEditingErrOk ? 'profile__form-error_color' : ''
            }`}
          >
            {submitErr}
            {nameErr}
            <br />
            {emailErr}
          </p>

          {isEditing && (
            <div className="profile__submit-button-wrapper">
              <button
                disabled={submitButtonStatus && !isRequestSending ? '' : true}
                type="submit"
                className="profile__save-button"
              >
                Сохранить
              </button>
            </div>
          )}

          {!isEditing && (
            <div className="profile__buttons">
              <button className="profile__edit-button" type="button" onClick={handleEdit}>
                Редактировать
              </button>
              <button className="profile__exit-button" type="button" onClick={handleLogout}>
                Выйти из аккаунта
              </button>
            </div>
          )}
        </form>
      </section>
    </main>
  );
}

export default Profile;
