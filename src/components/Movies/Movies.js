import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { useState } from "react";
import { CARD_ITEMS } from "../../utils/constants";
import Preloader from 'preloader';

function Movies() {
  const [filters, setFilters] = useState({
    search: '',
    isShorts: false,
  })
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState(CARD_ITEMS.slice(0, 12));

  const handleChangeFilters = (newFilterState) => {
    setIsLoading(true)
    setPage(1)
    setFilters(newFilterState)
    const filteredCards = CARD_ITEMS.filter(card => {
      const searchCondition = !!card.cardTitle.toLowerCase().match(newFilterState.search.toLowerCase())
      if (newFilterState.isShorts) {
        return searchCondition && card.isShort
      }
      return searchCondition
    })
    setCards(filteredCards.slice(0, 12))
    setIsLoading(false)
  }

  const handleLoadMore = () => {
    setIsLoading(true)
    setPage(page + 1)
    const filteredCards = CARD_ITEMS.filter(card => {
      const searchCondition = !!card.cardTitle.toLowerCase().match(filters.search.toLowerCase())
      if (filters.isShorts) {
        return searchCondition && card.isShort
      }
      return searchCondition
    }).slice(12 * page, 12 * (page + 1))
    setCards([...cards, ...filteredCards])
    setIsLoading(false)
  }

  return (
    <section className="movies">
      <SearchForm filters={filters} handleChangeFilters={handleChangeFilters} />
      <MoviesCardList cardItems={cards} />
      <div className="movies__load-container">
        {isLoading
          ? <Preloader />
          : <button type='button' className="movies__load-bnt hovered-item" onClick={handleLoadMore}>Ещё</button>
        }
      </div>
    </section>
  )
}

export default Movies;