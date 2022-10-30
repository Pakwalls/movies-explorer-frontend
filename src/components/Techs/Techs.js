import { Link } from "react-router-dom";

function Techs() {
  return (
    <section className='techs' id='techs'>
      <h2 className='section-title'>Технологии</h2>
      <p className='techs__title'>7 технологий</p>
      <p className='techs__subtitle'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <nav className='techs__nav'>
        <ul className='techs__links'>
          <li className='techs__container hovered-item'>
            <Link
              className='techs__link'
              to={{ pathname: 'https://developer.mozilla.org/ru/docs/Learn/Getting_started_with_the_web/HTML_basics'}}
              target='_blank'>HTML</Link>
          </li>
          <li className='techs__container hovered-item'>
            <Link
              className='techs__link'
              to={{ pathname: 'https://developer.mozilla.org/ru/docs/Learn/Getting_started_with_the_web/CSS_basics'}}
              target='_blank'>CSS</Link>
          </li>
          <li className='techs__container  hovered-item'>
            <Link
              className='techs__link'
              to={{ pathname: 'https://developer.mozilla.org/ru/docs/Web/JavaScript'}}
              target='_blank'>JS</Link>
          </li>
          <li className='techs__container hovered-item'>
            <Link
              className='techs__link'
              to={{ pathname: 'https://ru.reactjs.org/'}}
              target='_blank'>React</Link>
          </li>
          <li className='techs__container hovered-item'>
            <Link
              className='techs__link'
              to={{ pathname: 'https://github.com/'}}
              target='_blank'>Git</Link>
          </li>
          <li className='techs__container hovered-item'>
            <Link
              className='techs__link'
              to={{ pathname: 'https://expressjs.com/'}}
              target='_blank'>Express.js</Link>
          </li>
          <li className='techs__container hovered-item'>
            <Link
              className='techs__link'
              to={{ pathname: 'https://www.mongodb.com/'}}
              target='_blank'>mongoDB</Link>
          </li>
        </ul>
      </nav>
    </section>
  )
};

export default Techs;
