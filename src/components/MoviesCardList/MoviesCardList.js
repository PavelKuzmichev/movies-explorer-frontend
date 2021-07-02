import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = (props) => {
  const {
    showMovies,
    isSaved,
    handleLikeButtonClick,
    isSavedMovieCards,
    isNotFoundSearch,
    handleChangeAddMovies,
  } = props;
 
  return (
    <section className="moviesCardList">
      {isNotFoundSearch && showMovies.length === 0 ? (
        <p className="cards_notFound">Ничего не найдено</p>
      ) : (
        <ul className="cards">
          {showMovies.map((item) => {
            return (
              <MoviesCard
                key={item.movieId}
                item={item}
                isSaved={isSaved}
                handleLikeButtonClick={handleLikeButtonClick}
                isSavedMovieCards={isSavedMovieCards}
              />
              
            );
          })}
        </ul>
      )}{showMovies.length > 3 && <button className="more" onClick={handleChangeAddMovies}>Ещё</button>}
    </section>
  );
};

export default MoviesCardList;
