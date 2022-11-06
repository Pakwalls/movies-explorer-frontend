import { useEffect, useState } from "react";
import {
  getLocalStorageValue,
  saveSavedMoviesToStorage,
} from "../../utils/localStorageHandlers";
import { getSavedMovies } from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({ currentUserId }) {
  const localMovies = getLocalStorageValue("savedMovies");

  const [filters, setFilters] = useState({
    search: "",
    isShorts: false,
  });
  const [isTouched, setIsTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);

  const handleChangeFilters = (newFilterState) => {
    setIsTouched(true);

    if (!localMovies || localMovies.length === 0) {
      setIsLoading(true);

      getSavedMovies()
        .then((data) => {
          const userCards = data.filter(
            ({ owner }) => owner && owner === currentUserId,
          );
          saveSavedMoviesToStorage(userCards);
        })
        .catch((err) => console.error(err.message))
        .finally(() => setIsLoading(false));
    }
    setFilters(newFilterState);
  };

  useEffect(() => {
    const values = getLocalStorageValue("savedMovies") || [];

    if (isTouched && !isLoading && values.length !== 0) {
      const filteredCards = values.filter((card) => {
        const searchCondition = !!card.nameRU
          .toLowerCase()
          .match(filters.search.toLowerCase());
        if (filters.isShorts) {
          const isShortCondition = card.duration <= 40;
          return searchCondition && isShortCondition;
        }
        return searchCondition;
      });
      setCards(filteredCards);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, isLoading]);

  const handleChangeCard = (cardData) => {
    const changedCardIndex = cards.findIndex(
      (card) => card._id === cardData._id,
    );
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
        />
      )}
    </section>
  );
}

export default SavedMovies;
