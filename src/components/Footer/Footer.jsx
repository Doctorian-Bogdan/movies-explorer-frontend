import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="app__section-container footer__container">
        <p className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__info">
          <span className="footer__date">
            © 2024
          </span>
          <div className="footer__links">
            <a href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer" className="footer__link">
              Яндекс.Практикум
            </a>
            <a href="https://github.com/Doctorian-Bogdan" target="_blank" rel="noreferrer" className="footer__link">
              Github
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
