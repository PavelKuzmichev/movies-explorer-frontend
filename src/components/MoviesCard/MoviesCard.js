import "./MoviesCard.css";

function MoviesCard({ card }) {
  return (
    <div className="card">
      <img className="card__image" alt="Фильм" src={card.image} />
      <div className="card__header">
        <h3 className="card__title">{card.title}</h3>
        <span className="card__time">{card.duration}</span>
        <button
          className={`card__button 
                    ${
                      !card.saved
                        ? "card__button_save"
                        : card.movieId
                        ? "card__button_remove"
                        : ""
                    }`}
        />
      </div>
    </div>
  );
}

export default MoviesCard;
