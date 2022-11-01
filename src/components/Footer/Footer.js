import { Link, Route } from "react-router-dom";

function Footer() {
  const paths = ['/movies', '/saved-movies', '/']

  return (
    <Route exact path={paths}>
      <footer className='footer'>
        <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <div className='footer__container'>
          <p className='footer__copyright'>&copy; 2022</p>
          <div className='footer__links'>
            <Link 
              className='footer__link'
              to={{ pathname: 'https://practicum.yandex.ru/'}}
              target='_blank'>Яндекс.Практикум</Link>
            <Link
              className='footer__link'
              to={{ pathname: 'https://github.com/'}}
              target='_blank'>Github</Link>
          </div>
        </div>
      </footer>
    </Route>
  )
};

export default Footer;