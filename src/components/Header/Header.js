import { Link, Route } from 'react-router-dom';
import AccountBtn from '../AccountBtn/AccountBtn.js';
import Burger from '../Burger/Burger.js';
import Logo from '../Logo/Logo.js'
import Navigation from '../Navigation/Navigation.js';

function Header({ isLoggedIn }) {
  const paths = ['/movies', '/saved-movies', '/profile', '/']
  
  return (
    <Route exact path={paths}>
      <header className={`header${isLoggedIn ? " header_authorized" : ''}`}>
        <Logo className='logo__img logo_type_padded'/>
        {isLoggedIn ?
        <>
          <Navigation />
          <AccountBtn />
          <Burger
            loggedIn={isLoggedIn}
          />
        </>
        :
        <nav className='header__user-tab'>
          <Link to='/signup' className='header__link'>
            Регистрация
          </Link>
          <Link to='/signin' className='header__login-btn hovered-item'>
            Войти
          </Link>
        </nav>
        }
      </header>
    </Route>
  )
}

export default Header;
