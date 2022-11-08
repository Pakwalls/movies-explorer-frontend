import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useState, useEffect } from "react";
import Preloader from "../Preloader/Preloader";
import {
  FILTER_ERR_MESSAGE,
  FILTER_MESSAGE,
  IMAGE_LINK,
  LARGE_COUNT,
  LARGE_PAGGINATOR,
  SHORT_DURATION,
} from "../../utils/constants";
import { getMoviesData } from "../../utils/MoviesApi";
import {
  saveMoviesToStorage,
  getLocalStorageValue,
  saveMoviesFilter,
} from "../../utils/localStorageHandlers";
import { loadNextIems } from "../../utils/pagginator";
import { useListenWindowSize } from "../../utils/windowSizeHandlers";
import { setAppSizing } from "../../utils/appSizeHandler";

function Movies({ handleLogOut }) {
  const localMovies = getLocalStorageValue("movies");
  const localFilters = getLocalStorageValue("moviesFilter");
  const appSize = useListenWindowSize();

  const [filters, setFilters] = useState(
    localFilters
      ? localFilters
      : {
          search: "",
          isShorts: false,
        },
  );
  const [initCount, setInitCount] = useState(LARGE_COUNT);
  const [pagginator, setPagginator] = useState(LARGE_PAGGINATOR);
  const [page, setPage] = useState(1);
  const [isTouched, setIsTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [showNextBtn, setShowNextBtn] = useState(false);
  const [mainCards, setMainCards] = useState([]);
  const [error, setError] = useState("");

  const handleChangeFilters = (newFilterState) => {
    setIsTouched(true);
    if (!localStorage.getItem("jwt")) {
      handleLogOut();
    }

    if (!localMovies || localMovies.length === 0) {
      setIsLoading(true);
      getMoviesData()
        .then((data) => {
          data.forEach((movie) => {
            movie.thumbnail = `${IMAGE_LINK}${movie.image.formats.thumbnail.url}`;
            movie.image = `${IMAGE_LINK}${movie.image.url}`;
            movie.movieId = movie.id;
            delete movie["id"];
            delete movie["created_at"];
            delete movie["updated_at"];

            return movie;
          });
          setError("");

          saveMoviesToStorage(data);
        })
        .catch((err) => {
          setError(FILTER_ERR_MESSAGE);
        })
        .finally(() => setIsLoading(false));
    }

    setFilters(newFilterState);
    setAppSizing(appSize, setInitCount, setPagginator);
    setPage(1);
  };

  const handleLoadMore = () => {
    if (!localStorage.getItem("jwt")) {
      handleLogOut();
    }

    setPage(page + 1);
    setAppSizing(appSize, setInitCount, setPagginator);
  };

  useEffect(() => {
    const values = getLocalStorageValue("movies") || [];
    if (!localStorage.getItem("jwt")) {
      handleLogOut();
    }

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

      setMainCards(filteredCards);
      setError(filteredCards.length === 0 ? FILTER_MESSAGE : "");

      if (initCount < filteredCards.length) {
        setShowNextBtn(true);
      } else {
        setShowNextBtn(false);
      }
      setCards(filteredCards.slice(0, initCount));
    }
    saveMoviesFilter(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, appSize, isLoading]);

  useEffect(() => {
    if (isTouched && page !== 1) {
      const nextData = loadNextIems(
        pagginator,
        mainCards,
        cards.length,
        filters,
      );
      setShowNextBtn(nextData.isHaveNext);

      setCards([...cards, ...nextData.nextItems]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleChangeCard = (cardData) => {
    const changedCardIndex = cards.findIndex(
      (card) => card.movieId === cardData.movieId,
    );
    const newCards = cards.slice();
    if (changedCardIndex !== -1) {
      newCards.splice(changedCardIndex, 1, cardData);
      setCards(newCards);
    }
  };

  return (
    <section className="movies">
      <SearchForm
        filters={filters}
        handleChangeFilters={handleChangeFilters}
        isEmptyStorage={!!localMovies}
      />
      {isLoading && <Preloader />}
      <span className="movies__search-err">{error}</span>

      {!isLoading && (
        <MoviesCardList
          cardItems={cards}
          handleChangeCard={handleChangeCard}
          isSavedPage={false}
          handleLogOut={handleLogOut}
        />
      )}
      <div className="movies__load-container">
        {showNextBtn && (
          <button
            type="button"
            className="movies__load-bnt hovered-item"
            onClick={handleLoadMore}
          >
            Ещё
          </button>
        )}
      </div>
    </section>
  );
}

export default Movies;
