import searchIcon from "../../images/search-icon.svg";
import invertedSearchIcon from "../../images/inverted-search-icon.svg";
import { useState, useEffect } from "react";

function SearchForm({ filters, handleChangeFilters, isEmptyStorage }) {
  const [searchValue, setSearchValue] = useState(filters.search);
  const [isShorts, setIsShorts] = useState(filters.isShorts);

  const handleChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };
  const handleChangeToggleBtn = (e) => {
    setIsShorts(!isShorts);
  };

  useEffect(() => {
    if (isEmptyStorage) {
      handleChangeFilters({
        ...filters,
        isShorts,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShorts, isEmptyStorage]);

  const handleClickSearch = (e) => {
    e.preventDefault();

    handleChangeFilters({
      ...filters,
      search: searchValue,
    });
  };

  return (
    <div className="search-form">
      <form className="search-form__search-container">
        <img
          src={searchIcon}
          className="search-form__icon"
          alt="иконка поиск"
        />
        <input
          className="search-form__input"
          placeholder="Фильм"
          value={searchValue}
          onChange={handleChangeSearchValue}
          required
        />
        <button
          type="submit"
          className="search-form__btn hovered-item"
          onClick={handleClickSearch}
        >
          <img
            alt="иконка поиска"
            src={invertedSearchIcon}
            className="search-form__img"
          />
        </button>
      </form>
      <div className="search-form__toggle-container">
        <label className="search-form__switch">
          <input
            type="checkbox"
            checked={isShorts}
            onChange={handleChangeToggleBtn}
          />
          <span className="search-form__slider"></span>
        </label>
        <p className="search-form__filter-title">Короткометражки</p>
      </div>
    </div>
  );
}

export default SearchForm;
