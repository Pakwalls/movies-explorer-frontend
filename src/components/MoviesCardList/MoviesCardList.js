import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ cardItems, children }) {

  return (
    <ul className="movies-card-list">
      {cardItems.map(card => {
        return <MoviesCard
          cardTitle={card.nameRU}
          duration={card.duration}
          image={card.image.url}
          key={card.id}
          saved={card.saved}
        />
      })}
    </ul>
  )
}

export default MoviesCardList;