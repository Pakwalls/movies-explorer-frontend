import { getLocalStorageValue } from "./localStorageHandlers";

export const checkSavedMovies = () => {
  const allMovies = getLocalStorageValue("movies") || [];
  const savedMovies = getLocalStorageValue("savedMovies") || [];
  const newAllMovies = allMovies.map((movie) => {
    const isHaveSavedCard = savedMovies.findIndex(
      (userCard) => movie.movieId === userCard.movieId,
    );
    const newCard = {
      ...movie,
      saved: isHaveSavedCard !== -1,
    };

    if (isHaveSavedCard !== -1 && savedMovies[isHaveSavedCard]._id) {
      newCard._id = savedMovies[isHaveSavedCard]._id;
    }
    return newCard;
  });
  return newAllMovies;
};
