import "./SavedMovies.css";
import { useEffect, useLayoutEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import useFormWithValidation from "../../utils/useFormWithValidation";

const SavedMovies = (props) => {
  const {
    isSavedMovieCards,
    onSearchFilms,
    handleLikeButtonClick,
    isNotFoundSearch,
    setIsShortMoviesCards,
    isShortMoviesCards,
    queryFilters,
    setQueryFilters,
  } = props;

  const [isSaved, setIsSaved] = useState(false);

  const { values, handleChange } = useFormWithValidation();

  useLayoutEffect(() => {
    setIsShortMoviesCards(false);
    setIsSaved(true);
    // eslint-disable-next-line
}, [isSavedMovieCards]);

  //Эффект показывает короткометражные фильмы
  useEffect(() => {
    if (isShortMoviesCards === false || onSearchFilms("")) {
      setQueryFilters(isSavedMovieCards);
    } else if (isShortMoviesCards === true && values.name) {
      onSearchFilms(values.name);
    }
    // eslint-disable-next-line
  }, [isShortMoviesCards, isSavedMovieCards, values]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchFilms(values.name);
  };

  return (
    <div className="saved-movies">
      <SearchForm
        onSubmit={handleSubmit}
        values={values}
        handleChange={handleChange}
        isSaved={isSaved}
        setIsShortMoviesCards={setIsShortMoviesCards}
        isShortMoviesCards={isShortMoviesCards}
      />
      <MoviesCardList
        showMovies={queryFilters}
        isSaved={isSaved}
        handleLikeButtonClick={handleLikeButtonClick}
        isSavedMovieCards={isSavedMovieCards}
        isNotFoundSearch={isNotFoundSearch}
      />
    </div>
  );
};

export default SavedMovies;
