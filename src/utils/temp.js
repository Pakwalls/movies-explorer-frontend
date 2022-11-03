// Для работы со всеми  карточками
export const saveMoviesToStorage = (data) => {
  localStorage.setItem('movies', JSON.stringify(data))
}

export const saveMoviesFilter = ({ isShort, searchValue }) => {
  localStorage.setItem('moviesFilter', JSON.stringify({ isShort, searchValue }))
}

// Для работы с сохранеными карточками
export const saveSavedMoviesToStorage = (data) => {
  localStorage.setItem('savedMovies', JSON.stringify(data))
}

export const saveSavedMoviesFilter = ({ isShort, searchValue }) => {
  localStorage.setItem('savedMoviesFilter', JSON.stringify({ isShort, searchValue }))
}

/**
 * @param {string} key ключ для взятия значения из localStorage, должен быть эквивалентен movies || moviesFilter || savedMovies || savedMoviesFilter
*/
export const getLocalStorageValue = (key) => {
  return JSON.parse(localStorage.getItem(key))
}

