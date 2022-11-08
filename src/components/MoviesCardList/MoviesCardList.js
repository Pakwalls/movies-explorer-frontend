import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  cardItems,
  isSavedPage,
  handleChangeCard,
  handleLogOut,
}) {
  return (
    <ul className="movies-card-list">
      {cardItems.length !== 0 &&
        cardItems.map((card) => {
          return (
            <MoviesCard
              cardData={card}
              isSavedPage={isSavedPage}
              key={isSavedPage ? card._id : card.movieId}
              handleChangeCard={handleChangeCard}
              handleLogOut={handleLogOut}
            />
          );
        })}
    </ul>
  );
}

export default MoviesCardList;
