import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import deleteIcon from "../../images/delete-icon.svg";
import savedIcon from "../../images/saved-icon.svg";
import {
  saveSavedMoviesToStorage,
  saveMoviesToStorage,
  getLocalStorageValue,
} from "../../utils/localStorageHandlers";
import { createMovieCard, deleteMovieCard } from "../../utils/MainApi";

function MoviesCard({ cardData, isSavedPage, handleChangeCard, handleLogOut }) {
  const history = useHistory();

  const [isSavedMovie, setIsSavedMovie] = useState(
    cardData.saved || isSavedPage || false,
  );
  const [isTouched, setIsTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveMovie = () => {
    if (!isLoading) {
      setIsTouched(true);
      setIsLoading(true);
    }
  };

  const deleteAction = () => {
    deleteMovieCard(cardData._id)
      .then(() => {
        setIsSavedMovie(!isSavedMovie);
        const savedMovies = getLocalStorageValue("savedMovies");
        if (savedMovies) {
          const deletedItemIndex = savedMovies.findIndex(
            ({ _id }) => _id === cardData._id,
          );
          if (deletedItemIndex !== -1) {
            savedMovies.splice(deletedItemIndex, 1);
            saveSavedMoviesToStorage(savedMovies);
          }
        }
        if (!isSavedMovie) {
          delete cardData["owner"];
          delete cardData["_id"];
          delete cardData["__v"];
        }
        const newData = {
          ...cardData,
          saved: false,
        };
        if (!isSavedPage) {
          const allMovies = getLocalStorageValue("movies");
          const allMoviesCardIndex = allMovies.findIndex(
            (movie) => movie.movieId === newData.movieId,
          );
          allMovies.splice(allMoviesCardIndex, 1, newData);
          saveMoviesToStorage(allMovies);
        }

        handleChangeCard(newData);
      })
      .catch((err) => {
        if (err.status === 401) {
          handleLogOut();
        }
        console.error(err.message);
      })
      .finally(() => setIsLoading(false));
  };

  const addAction = () => {
    delete cardData["saved"];
    delete cardData["owner"];
    delete cardData["_id"];
    delete cardData["__v"];

    createMovieCard(cardData)
      .then((data) => {
        setIsSavedMovie(!isSavedMovie);
        const savedMovies = getLocalStorageValue("savedMovies");
        const newData = { ...data, saved: true };
        if (savedMovies) {
          savedMovies.push(newData);
          saveSavedMoviesToStorage(savedMovies);
        }
        const allMovies = getLocalStorageValue("movies");
        const allMoviesCardIndex = allMovies.findIndex(
          (movie) => movie.movieId === newData.movieId,
        );
        allMovies.splice(allMoviesCardIndex, 1, newData);
        saveMoviesToStorage(allMovies);

        handleChangeCard(newData);
      })
      .catch((err) => {
        if (err.status === 401) {
          handleLogOut();
        }
        console.error(err.message);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (isTouched) {
      if (isSavedMovie || isSavedPage) {
        deleteAction();
      } else {
        addAction();
      }
    }
    setIsTouched(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTouched]);

  return (
    <li className="movies-card">
      <div className="movies-card__info" title={cardData.nameRU}>
        <h2 className="movies-card__title">{cardData.nameRU}</h2>
        <p className="movies-card__duration">{`${cardData.duration} минут`}</p>
      </div>
      <Link
        className="movies-card__trailer-link"
        target="_blank"
        to={{ pathname: cardData.trailerLink }}
      >
        <img
          src={cardData.image}
          alt={cardData.nameRU}
          className="movies-card__poster"
        />
      </Link>
      {history.location.pathname === "/movies" && (
        <button
          type="button"
          className={`movies-card__button${
            isSavedMovie ? " movies-card__pressed-button" : ""
          } hovered-item`}
          onClick={handleSaveMovie}
        >
          {isSavedMovie ? <img alt="галочка" src={savedIcon} /> : "Сохранить"}
        </button>
      )}
      {history.location.pathname === "/saved-movies" && (
        <button
          type="button"
          className="movies-card__button hovered-item"
          onClick={handleSaveMovie}
        >
          <img alt="крестик" src={deleteIcon} />
        </button>
      )}
    </li>
  );
}

export default MoviesCard;
