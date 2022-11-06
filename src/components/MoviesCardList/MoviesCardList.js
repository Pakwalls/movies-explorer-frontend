import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ cardItems, isSavedPage, handleChangeCard }) {
  return (
    <ul className="movies-card-list">
      {cardItems.length !== 0 && cardItems.map(card => {
        return <MoviesCard
          cardData={card}
          isSavedPage={isSavedPage}
          key={isSavedPage ? card._id : card.movieId}
          handleChangeCard={handleChangeCard}
        />
      })}
    </ul>
  )
}

export default MoviesCardList;