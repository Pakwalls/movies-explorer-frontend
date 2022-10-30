import { NavLink } from "react-router-dom";


function Navigation() {

  return (
    <div className="navigation">
      <NavLink to='/movies' activeClassName="navigation__link_active" className='navigation__link'>
        Фильмы
      </NavLink>
      <NavLink to='/saved-movies' activeClassName="navigation__link_active" className='navigation__link'>
        Сохранённые фильмы
      </NavLink>
    </div>
  )
}

export default Navigation;