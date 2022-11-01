import { useState } from "react";
import { NavLink } from "react-router-dom";
import AccountBtn from "../AccountBtn/AccountBtn";
import burgerLogo from '../../images/burger-logo.svg'
import burgerCloseLogo from '../../images/burger-close-logo.svg'

function Burger({ LoggedIn }) {
const [isOpen, setIsOpen] = useState(false);

function handleClick() {
  setIsOpen(!isOpen);
};

  return (
    <>
      {!isOpen?
        <button type='button' className={`burger__${LoggedIn ? "open-btn" : "hidden-btn"}`} onClick={handleClick}>
          <img alt='логотип бургера' src={burgerLogo}/>
        </button>
        : 
        <div className={`burger${isOpen ? ' burger_opened' : ''}`}>
          <button className="burger__close-btn" onClick={handleClick}><img alt='логотип бургера' src={burgerCloseLogo}></img></button>
          <nav className="burger__nav">
            <NavLink to='/' className="burger__link" activeClassName="burger__link_active" onClick={handleClick}>
              Главная
            </NavLink>
            <NavLink to='/movies' className="burger__link" activeClassName="burger__link_active" onClick={handleClick}>
              Фильмы
            </NavLink>
            <NavLink to='/saved-movies' className="burger__link" activeClassName="burger__link_active" onClick={handleClick}>
              Сохранённые фильмы
            </NavLink>
            <div className="burger__acc-container" onClick={handleClick}>
              <AccountBtn />
            </div>
          </nav>
        </div>
      }
    </>
  )
}

export default Burger;