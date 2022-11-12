import { DATABASE_URL } from "./constants";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((data) => {
    return Promise.reject({
      message: `Получена ошибка, код: ${res.status}, описание: ${data.message}`,
      status: res.status,
    });
  });
};

const headers = {
  "Content-Type": "application/json",
};

// ------------------------------------------------------------обновление токена
export const updateToken = (token) => {
  headers.authorization = `Bearer ${token}`;
};

// ------------------------------------------------------------создание пользователя
export const createUser = ({ name, email, password }) => {
  updateToken(localStorage.getItem("jwt"));
  return fetch(`${DATABASE_URL}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name,
      password,
      email,
    }),
  }).then((res) => checkResponse(res));
};

// ------------------------------------------------------------логин пользователя
export const authorizeUser = ({ email, password }) => {
  updateToken(localStorage.getItem("jwt"));
  return fetch(`${DATABASE_URL}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => checkResponse(res));
};

// ------------------------------------------------------------информация о пользователе
export const getUserData = (token) => {
  updateToken(localStorage.getItem("jwt"));
  return fetch(`${DATABASE_URL}/users/me`, {
    method: "GET",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
};

// ------------------------------------------------------------обновление информации о пользователе
export const updateUserData = (name, email) => {
  updateToken(localStorage.getItem("jwt"));
  return fetch(`${DATABASE_URL}/users/me`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      name,
      email,
    }),
  }).then((res) => checkResponse(res));
};

// ------------------------------------------------------------создание карточки фильма
export const createMovieCard = (cardData) => {
  updateToken(localStorage.getItem("jwt"));
  return fetch(`${DATABASE_URL}/movies`, {
    method: "POST",
    headers,
    body: JSON.stringify(cardData),
  }).then((res) => checkResponse(res));
};

// ------------------------------------------------------------удаление карточки фильма
export const deleteMovieCard = (_id) => {
  updateToken(localStorage.getItem("jwt"));
  return fetch(`${DATABASE_URL}/movies/${_id}`, {
    method: "DELETE",
    headers,
  }).then((res) => checkResponse(res));
};

// ------------------------------------------------------------получение сохраненных фильмов
export const getSavedMovies = () => {
  updateToken(localStorage.getItem("jwt"));
  return fetch(`${DATABASE_URL}/movies`, {
    method: "GET",
    headers,
  }).then((res) => checkResponse(res));
};
