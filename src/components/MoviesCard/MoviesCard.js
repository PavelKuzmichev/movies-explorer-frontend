import React, { useState, useEffect } from "react";
import "./MoviesCard.css";

const MoviesCard = (props) => {
  const { item, isSaved, handleLikeButtonClick, isSavedMovieCards } = props;
  const [isSavedMovieCardsButton, setIsSavedMovieCardsButton] = useState(false);

  const handleSavedMovieButtonClick = () => {
    handleLikeButtonClick(item);
    
    setIsSavedMovieCardsButton(!isSavedMovieCardsButton);
    
  };

  useEffect(() => {
    setIsSavedMovieCardsButton(
      isSavedMovieCards.some((data) => {
                return data.movieId === item.movieId;
      })
     
    );
    
    // eslint-disable-next-line
  }, []);

  const saved = `card__button-saved-movie ${
    (isSaved === true ? "card__button-icon-saved" : "") ||
    (isSavedMovieCardsButton === true ? "card__button-icon-handleSaved" : "")
  }`;

  const getTime = (mins) => {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + "ч " + minutes + "m";
  };

  return (
    <div className="card">
       <a href={item.trailer} target="_blanck">
        <img className="card__image" src={item.image} alt="постер" />
      </a>
      <div className="card__header">
        <h3 className="card__title">{item.nameRU}</h3>
        <span className="card__time">{getTime(item.duration)}</span>
        <button className={saved} onClick={handleSavedMovieButtonClick}></button>
      
      </div>
    </div>
  );
}

export default MoviesCard;
