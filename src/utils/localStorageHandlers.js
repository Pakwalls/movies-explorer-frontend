// Для работы со всеми  карточками
export const saveMoviesToStorage = (data) => {
  localStorage.setItem("movies", JSON.stringify(data));
};

export const saveMoviesFilter = ({ search, isShorts }) => {
  localStorage.setItem("moviesFilter", JSON.stringify({ search, isShorts }));
};

// Для работы с сохранеными карточками
export const saveSavedMoviesToStorage = (data) => {
  localStorage.setItem("savedMovies", JSON.stringify(data));
};

export const saveSavedMoviesFilter = ({ isShort, searchValue }) => {
  localStorage.setItem(
    "savedMoviesFilter",
    JSON.stringify({ isShort, searchValue }),
  );
};

/**
 * @param {string} key ключ для взятия значения из localStorage, должен быть эквивалентен movies || moviesFilter || savedMovies || savedMoviesFilter
 */
export const getLocalStorageValue = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
};
