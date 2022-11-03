import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { useState, useEffect } from "react";
import Preloader from 'preloader';
import { getMoviesData } from '../../utils/MoviesApi';
import { saveMoviesToStorage, getLocalStorageValue } from '../../utils/localStorageHandlers';
import { loadNextIems } from '../../utils/pagginator';

function Movies() {
  const [filters, setFilters] = useState({
    search: '',
    isShorts: false,
  })
  const localMovies = getLocalStorageValue('movies');
  const pagginator = 12
  const [page, setPage] = useState(1);
  const [isTouched, setIsTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [showNextBtn, setShowNextBtn] = useState(false);

  const [mainCards, setMainCards] = useState([]);

  const handleChangeFilters = (newFilterState) => {
    if (!isTouched) {
      setIsTouched(true)
    }
    if (localMovies.length === 0) {
      getMoviesData()
        .then((data) => {
          saveMoviesToStorage(data);
        })
        .catch((err) => console.error(err))
    }

    setFilters(newFilterState)
    setPage(1)
  }



  const handleLoadMore = () => {
    setPage(page + 1)
  }

  useEffect(() => {
    if (isTouched) {
      const values = getLocalStorageValue('movies');

      const filteredCards = values.filter(card => {
        const searchCondition = !!card.nameRU.toLowerCase().match(filters.search.toLowerCase())
        if (filters.isShorts) {
          return searchCondition && card.isShort
        }
        return searchCondition
      })
      setMainCards(filteredCards)

      if (pagginator < filteredCards.length) {
        setShowNextBtn(true)
      } else {
        setShowNextBtn(false)
      }
      setCards(filteredCards.slice(0, pagginator))
    }
  }, [filters]);

  useEffect(() => {
    if (isTouched && page !== 1) {
      const nextData = loadNextIems(pagginator, mainCards, cards.length, filters)
      setShowNextBtn(nextData.isHaveNext)

      setCards([...cards, ...nextData.nextItems])
    }
  }, [page])

  useEffect(() => {
  }, [cards])
  return (
    <section className="movies">
      <SearchForm filters={filters} handleChangeFilters={handleChangeFilters} />
      <MoviesCardList cardItems={cards} />
      <div className="movies__load-container">
        {isLoading
          ? <Preloader />
          : showNextBtn && <button type='button' className="movies__load-bnt hovered-item" onClick={handleLoadMore}>Ещё</button>
        }
      </div>
    </section>
  )
}

export default Movies;