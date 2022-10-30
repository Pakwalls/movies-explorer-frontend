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
    <div className='searchForm'>
      <form className="searchForm__search-container">
        <img src={searchIcon} className="searchForm__icon" alt="иконка поиск" />
        <input className="searchForm__input" placeholder='Фильм' value={searchValue} onChange={handleChangeSearchValue} />
        <button type='submit' className="searchForm__btn hovered-item" onClick={handleClickSearch}>
          <img alt="иконка поиска" src={invertedSearchIcon} className="searchForm__img" />
        </button>
      </form>
      <div className="searchForm__toggle-container">
        <label className="searchForm__switch" >
          <input type="checkbox" value={filters.isShorts} onClick={handleChangeToggleBtn} />
          <span className="searchForm__slider"></span>
        </label>
        <p className="searchForm__filter-title">Короткометражки</p>
      </div>
    </div>
  )
}

export default SearchForm;