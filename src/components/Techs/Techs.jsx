import React from 'react';

function Techs() {
  return (
    <section className="techs" id="techs">
      <div className="app__section-container techs__container">
        <h2 className="app__section-contents">
          Технологии
        </h2>
        <div className="techs__wrapper">
          <h3 className="app__section-title techs__title">
            7 технологий
          </h3>
          <p className="app__section-text techs__text">
            На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
          </p>
          <ul className="techs__list">
            <li className="techs__list-item">
              HTML
            </li>
            <li className="techs__list-item">
              CSS
            </li>
            <li className="techs__list-item">
              JS
            </li>
            <li className="techs__list-item">
              React
            </li>
            <li className="techs__list-item">
              Git
            </li>
            <li className="techs__list-item">
              Express.js
            </li>
            <li className="techs__list-item">
              mongoDB
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Techs;
