import { useContext, useEffect, useState } from "react";
import {
  getLocalStorageValue,
  saveSavedMoviesToStorage,
  saveMoviesToStorage,
} from "../../utils/localStorageHandlers";
import { SHORT_DURATION } from "../../utils/constants";
import { getSavedMovies } from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({ handleLogOut }) {
  const localMovies = getLocalStorageValue("savedMovies");
  const [filters, setFilters] = useState({
    search: "",
    isShorts: false,
  });
  const [isTouched, setIsTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const { _id: currentUserId } = useContext(CurrentUserContext);

  const handleChangeFilters = (newFilterState) => {
    setIsTouched(true);
    if (!localStorage.getItem("jwt")) {
      handleLogOut();
    }

    if (!localMovies || localMovies.length === 0) {
      setIsLoading(true);

      getSavedMovies()
        .then((data) => {
          const userCards = data.filter(
            ({ owner }) => owner && owner === currentUserId,
          );
          saveSavedMoviesToStorage(userCards);
          const allMovies = getLocalStorageValue("movies");
          const newAllMovies = allMovies.map((movie) => {
            const isHaveSavedCard = userCards.findIndex(
              (userCard) => movie.movieId === userCard.movieId,
            );
            const newCard = {
              ...movie,
              saved: isHaveSavedCard !== -1,
            };

            if (isHaveSavedCard !== -1 && userCards[isHaveSavedCard]._id) {
              newCard._id = userCards[isHaveSavedCard]._id;
            }
            return newCard;
          });
          saveMoviesToStorage(newAllMovies);
        })
        .catch((err) => console.error(err.message))
        .finally(() => setIsLoading(false));
    }
    setFilters(newFilterState);
  };

  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      handleLogOut();
    }

    const values = getLocalStorageValue("savedMovies") || [];

    if (isTouched && !isLoading && values.length !== 0) {
      const filteredCards = values.filter((card) => {
        const searchCondition = !!card.nameRU
          .toLowerCase()
          .match(filters.search.toLowerCase());
        if (filters.isShorts) {
          const isShortCondition = card.duration <= SHORT_DURATION;
          return searchCondition && isShortCondition;
        }
        return searchCondition;
      });
      setCards(filteredCards);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, isLoading]);

  const handleChangeCard = (cardData) => {
    if (!localStorage.getItem("jwt")) {
      handleLogOut();
    }

    const changedCardIndex = cards.findIndex(
      (card) => card._id === cardData._id,
    );
    const allMovies = getLocalStorageValue("movies");
    const userCards = getLocalStorageValue("savedMovies");
    const newAllMovies = allMovies.map((movie) => {
      const isHaveSavedCard = userCards.findIndex(
        (userCard) => movie.movieId === userCard.movieId,
      );
      const newCard = {
        ...movie,
        saved: isHaveSavedCard !== -1,
      };

      if (isHaveSavedCard !== -1 && userCards[isHaveSavedCard]._id) {
        newCard._id = userCards[isHaveSavedCard]._id;
      }
      return newCard;
    });

    saveMoviesToStorage(newAllMovies);
    const newCards = cards.slice();
    if (changedCardIndex !== -1) {
      newCards.splice(changedCardIndex, 1);
      setCards(newCards);
    }
  };

  return (
    <section className="saved-movies">
      <SearchForm
        filters={filters}
        handleChangeFilters={handleChangeFilters}
        isEmptyStorage={!!localMovies}
      />
      {isLoading && <Preloader />}
      {!isLoading && (
        <MoviesCardList
          cardItems={cards}
          isSavedPage={true}
          handleChangeCard={handleChangeCard}
          handleLogOut={handleLogOut}
        />
      )}
    </section>
  );
}

export default SavedMovies;
