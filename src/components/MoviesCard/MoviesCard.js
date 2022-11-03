import { useState } from "react";
import { useHistory } from "react-router-dom";
import deleteIcon from '../../images/delete-icon.svg';
import savedIcon from '../../images/saved-icon.svg';
import { IMAGE_LINK } from "../../utils/constants";


function MoviesCard({ cardTitle, duration, image, saved }) {
  const currentLocation = useHistory().location.pathname;
 
  const [isSavedMovie, setIsSavedMovie] = useState(saved);

  const handleSaveMovie = () => {
    setIsSavedMovie(!isSavedMovie);
  }
  const movieImage = `${IMAGE_LINK}${image}`

  return (
    <li className="movies-card">
      <div className="movies-card__info" title={cardTitle}>
        <h2 className="movies-card__title">{cardTitle}</h2>
        <p className="movies-card__duration">{`${duration} минут`}</p>
      </div>
      <img src={movieImage} alt={cardTitle} className="movies-card__poster" />
      {currentLocation === "/movies" &&
        <button
          type="button"
          className={`movies-card__button${isSavedMovie ? ' movies-card__pressed-button' : ''} hovered-item`}
          onClick={handleSaveMovie}
        >
          {isSavedMovie
          ? <img alt='галочка' src={savedIcon} /> 
          :"Сохранить"}
        </button>}
      {currentLocation === "/saved-movies"
        && <button type="button" className="movies-card__button hovered-item"
          onClick={handleSaveMovie}
        >
          <img alt='крестик' src={deleteIcon}/>
        </button>}
    </li>
  )
}

export default MoviesCard;