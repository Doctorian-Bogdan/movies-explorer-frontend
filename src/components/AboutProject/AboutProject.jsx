import React from 'react';

function AboutProject() {
  return (
    <section className="aboutproject" id="aboutproject">
      <div className="app__section-container aboutproject__container">
        <h2 className="app__section-contents">
          О проекте
        </h2>
        <div className="aboutproject__wrapper">
          <div className="aboutproject__column">
            <h3 className="aboutproject__subtitle">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="app__section-text aboutproject__text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="aboutproject__column">
            <h3 className="aboutproject__subtitle">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="app__section-text aboutproject__text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно
              было соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="aboutproject__progressline">
          <div className="aboutproject__backend">
            <div className="aboutproject__shortline">
              1 неделя
            </div>
            <div className="aboutproject__caption">
              Back-end
            </div>
          </div>
          <div className="aboutproject__frontend">
            <div className="aboutproject__longline">
              4 недели
            </div>
            <div className="aboutproject__caption">
              Front-end
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
