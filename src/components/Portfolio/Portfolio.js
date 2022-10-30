import { Link } from "react-router-dom";
import pointer from '../../images/pointer.svg';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <Link to={{ pathname: 'https://pakwalls.github.io/how-to-learn/' }} target='_blank' className='portfolio__link'>
            <p className='portfolio__name'>Статичный сайт</p>
            <img alt='ссылка' src={pointer} className='portfolio__link-img'/>
          </Link>
        </li>
        <li className='portfolio__item'>
          <Link to={{ pathname: 'https://pakwalls.github.io/russian-travel/' }} target='_blank' className='portfolio__link'>
            <p className='portfolio__name'>Адаптивный сайт</p>
            <img alt='ссылка' src={pointer} className='portfolio__link-img'/>
          </Link>
        </li>
        <li className='portfolio__item'>
          <Link to={{ pathname: 'https://pakwalls.github.io/mesto/' }} target='_blank' className='portfolio__link'>
            <p className='portfolio__name'>Одностраничное приложение</p>
            <img alt='ссылка' src={pointer} className='portfolio__link-img'/>
          </Link>
        </li>
      </ul>
    </section>
  )
};

export default Portfolio;