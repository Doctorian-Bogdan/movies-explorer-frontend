import React from 'react';
import aboutme from '../../images/aboutme.jpg';

function AboutMe() {
  return (
    <section className="aboutme" id="aboutme">
      <div className="app__section-container aboutme__container">
        <h2 className="app__section-contents">
          Студент
        </h2>
        <div className="aboutme__wrapper">
          <div className="aboutme__resume">
            <div className="aboutme__resume-block">
              <h3 className="app__section-title aboutme__title">
                Богдан
              </h3>
              <p className="aboutme__subtitle">
                Фронтенд-разработчик, 19 лет
              </p>
              <p className="app__section-text aboutme__text">
                Я родился в городе Бишкек, сейчас живу в Воронеже, учусь в ВГУ на факультете
                компьютерных наук. Я люблю слушать музыку, ходить в тренажерный зал.
                Недавно начал кодить. Познакомился с разработкой в 2019 году.
              </p>
            </div>
            <div className="aboutme__resume-block">
              <a className="aboutme__link" href="https://github.com/Doctorian-Bogdan">
                Github
              </a>
            </div>
          </div>
          <div className="aboutme__resume-picture">
            <img src={aboutme} alt="фотография богдана исаченко" className="aboutme__picture" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
