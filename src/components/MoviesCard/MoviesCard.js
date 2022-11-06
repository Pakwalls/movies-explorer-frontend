import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import deleteIcon from "../../images/delete-icon.svg";
import savedIcon from "../../images/saved-icon.svg";
import {
  saveSavedMoviesToStorage,
  getLocalStorageValue,
} from "../../utils/localStorageHandlers";
import { createMovieCard, deleteMovieCard } from "../../utils/MainApi";

function MoviesCard({ cardData, isSavedPage, handleChangeCard }) {
  const currentLocation = useHistory().location.pathname;

  const [isSavedMovie, setIsSavedMovie] = useState(isSavedPage || false);
  const [isTouched, setIsTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveMovie = () => {
    if (!isLoading) {
      setIsTouched(true);
      setIsSavedMovie(!isSavedMovie);
      setIsLoading(true);
    }
  };

  const deleteAction = () => {
    deleteMovieCard(cardData._id)
      .then(() => {
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
        handleChangeCard(cardData);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  const addAction = () => {
    createMovieCard(cardData)
      .then((data) => {
        const savedMovies = getLocalStorageValue("savedMovies");
        const newData = { ...data };
        if (savedMovies) {
          savedMovies.push(data);
          saveSavedMoviesToStorage(savedMovies);
        }
        handleChangeCard(newData);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (isTouched) {
      if (!isSavedMovie || isSavedPage) {
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
      <img
        src={cardData.image}
        alt={cardData.nameRU}
        className="movies-card__poster"
      />
      {currentLocation === "/movies" && (
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
      {currentLocation === "/saved-movies" && (
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
