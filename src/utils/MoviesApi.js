import { MOVIE_URL } from "./constants";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json()
  .then((data) => {return Promise.reject(`Получена ошибка, код: ${res.status}, описание: ${data.message}`)});
}

const headers = {
  "Content-Type": "application/json"
}

export const getMoviesData = () => {
  return fetch(`${MOVIE_URL}`, {
    method: 'GET',
    headers,
  })
  .then(res => checkResponse(res))
};
