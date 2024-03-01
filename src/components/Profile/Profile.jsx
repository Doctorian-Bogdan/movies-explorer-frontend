import React from 'react';

function Profile({ logout }) {
  return (
    <main>
      <section className="profile">
        <h1 className="profile__greeting">Привет, Богдан!</h1>
        <form className="profile__form" onSubmit={logout}>
          <label htmlFor="name" className="profile__container">
            <p className="profile__title">Имя</p>
            <input
              className="profile__input"
              type="text"
              name="name"
              id="name"
              placeholder="Имя"
              minLength="2"
              maxLength="30"
              required
            />
          </label>

          <label htmlFor="email" className="profile__container">
            <p className="profile__title">E-mail</p>
            <input
              className="profile__input"
              type="email"
              name="email"
              id="email"
              placeholder="pochta@yandex.ru"
              required
            />
          </label>

          <div className="profile__buttons">
            <button className="profile__edit-button" type="button">
              Редактировать
            </button>
            <button className="profile__exit-button" type="submit">
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Profile;
