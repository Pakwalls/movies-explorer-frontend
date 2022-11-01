import { useState } from "react";
import { CARD_ITEMS } from "../../utils/constants";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies() {
  const [filters, setFilters] = useState({
    search: '',
    isShorts: false,
  })
  const [cards, setCards] = useState(CARD_ITEMS.filter(item => item.saved).slice(0, 12));

  const handleChangeFilters = (newFilterState) => {
    setFilters(newFilterState)
    const filteredCards = CARD_ITEMS.filter(card => {
      const searchCondition = !!card.cardTitle.toLowerCase().match(newFilterState.search.toLowerCase())
      if (newFilterState.isShorts) {
        return searchCondition && card.isShort && card.saved
      }
      return searchCondition && card.saved
    })
    setCards(filteredCards.slice(0, 12))
  }

  return (
    <section className="savedMovies">
      <SearchForm filters={filters} handleChangeFilters={handleChangeFilters} />
      <MoviesCardList cardItems={cards} />
    </section>
  )
}

export default SavedMovies;