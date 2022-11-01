import searchIcon from '../../images/search-icon.svg'
import invertedSearchIcon from '../../images/inverted-search-icon.svg'
import { useState } from "react";

function SearchForm({ filters, handleChangeFilters }) {
  const [searchValue, setSearchValue] = useState('')
  const handleChangeSearchValue = (e) => {
    setSearchValue(e.target.value)
  }

  const handleChangeToggleBtn = () => {
    handleChangeFilters({
      ...filters,
      isShorts: !filters.isShorts
    })
  }

  const handleClickSearch = (e) => {
    e.preventDefault();

    handleChangeFilters({
      ...filters,
      search: searchValue
    })
  }
  
  return (
    <div className='search-form'>
      <form className="search-form__search-container">
        <img src={searchIcon} className="search-form__icon" alt="иконка поиск" />
        <input className="search-form__input" placeholder='Фильм' value={searchValue} onChange={handleChangeSearchValue} required/>
        <button type='submit' className="search-form__btn hovered-item" onClick={handleClickSearch}>
          <img alt="иконка поиска" src={invertedSearchIcon} className="search-form__img" />
        </button>
      </form>
      <div className="search-form__toggle-container">
        <label className="search-form__switch" >
          <input type="checkbox" value={filters.isShorts} onClick={handleChangeToggleBtn} />
          <span className="search-form__slider"></span>
        </label>
        <p className="search-form__filter-title">Короткометражки</p>
      </div>
    </div>
  )
}

export default SearchForm;