import React from 'react';
import portfolio from '../../images/portfolio.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="app__section-container portfolio__container">
        <h2 className="portfolio__contents">
          Портфолио
        </h2>
        <ul className="portfolio__links">
          <li className="portfolio__list-item">
            <a
              href="https://github.com/Doctorian-Bogdan/how-to-learn"
              target="_blank"
              rel="noreferrer"
              className="portfolio__link"
            >
              Статичный сайт
              <img src={portfolio} alt="стрелочка белого цвета" className="portfolio__icon" />
            </a>
          </li>
          <li className="portfolio__list-item">
            <a
              href="https://github.com/Doctorian-Bogdan/russian-travel"
              target="_blank"
              rel="noreferrer"
              className="portfolio__link"
            >
              Адаптивный сайт
              <img src={portfolio} alt="стрелочка белого цвета" className="portfolio__icon" />
            </a>
          </li>
          <li className="portfolio__list-item">
            <a
              href="https://github.com/Doctorian-Bogdan/react-mesto-api-full-gha"
              target="_blank"
              rel="noreferrer"
              className="portfolio__link"
            >
              Одностраничное приложение
              <img src={portfolio} alt="стрелочка белого цвета" className="portfolio__icon" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
