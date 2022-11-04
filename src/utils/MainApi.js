import { DATABASE_URL } from "./constants";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json()
    .then((data) => {
      return Promise.reject({
        message: `Получена ошибка, код: ${res.status}, описание: ${data.message}`,
        status: res.status
      })
    })
};

const headers = {
  "Content-Type": "application/json"
};

// ------------------------------------------------------------создание пользователя
export const createUser = ({ name, email, password }) => {
  return fetch(`${DATABASE_URL}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify(
      {
        name,
        password,
        email,
      })
  })
    .then(res => checkResponse(res))
};

// ------------------------------------------------------------логин пользователя
export const authorizeUser = ({ email, password }) => {
  return fetch(`${DATABASE_URL}/signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify(
      {
        email,
        password
      })
  })
    .then(res => checkResponse(res))
};

// ------------------------------------------------------------информация о пользователе
export const getUserData = (token) => {
  return fetch(`${DATABASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      ...headers,
      'authorization': `Bearer ${token}`
    }
  })
    .then(res => checkResponse(res));
};

// ------------------------------------------------------------обновление информации о пользователе
export const updateUserData = (name, email) => {
  return fetch(`${DATABASE_URL}/users/me`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(
      {
        name,
        email,
      })
  })
    .then(res => checkResponse(res));
};

// ------------------------------------------------------------создание карточки фильма
export const createMovieCard = (
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  thumbnail,
  nameRU,
  nameEN,
  movieId,
) => {
  return fetch(`${DATABASE_URL}/movies`, {
    method: 'POST',
    headers,
    body: JSON.stringify(
      {
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        nameRU,
        nameEN,
        movieId,
      })
  })
    .then(res => checkResponse(res));
};

// ------------------------------------------------------------удаление карточки фильма
export const deleteMovieCard = (_id) => {
  return fetch(`${DATABASE_URL}/movies/${_id}`, {
    method: 'DELETE',
    headers,
  })
  .then(res => checkResponse(res));
}

export const updateToken = (token) => {
  headers.authorization = `Bearer ${token}`;
}