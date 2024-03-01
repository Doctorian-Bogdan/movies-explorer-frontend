import React from 'react';

function NavTab() {
  return (
    <section className="navtab">
      <nav className="navtab__container">
        <a href="#aboutproject" className="navtab__link">
          О проекте
        </a>
        <a href="#techs" className="navtab__link">
          Технологии
        </a>
        <a href="#aboutme" className="navtab__link">
          Студент
        </a>
      </nav>
    </section>
  );
}

export default NavTab;
