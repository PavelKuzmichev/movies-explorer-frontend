import "./Movies.css";
import { useEffect } from "react";
import useFormWithValidation from "../../utils/useFormWithValidation";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

const Movies = (props) =>{
  const {
    isLoadingData,
    onSearchFilms,
    showMovies,
    setIsShortMoviesCards,
    isShortMoviesCards,
    setShowMovies,
    movies,
    handleLikeButtonClick,
    isSavedMovieCards,
    isNotFoundSearch,
    moviesCards,
  } = props;

  const { values, handleChange } = useFormWithValidation();

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchFilms(values.name);

  };

  //Показывать дополнительные фильмы кликом по кнопке
  const handleAddMovies = () => {
    if (window.innerWidth >= 1280) {
      const addMoviesMaxWidth = movies.slice(0, showMovies.length + 3);
      return addMoviesMaxWidth;
    }
    if (window.innerWidth >= 320) {
      const addMoviesMinWidth = movies.slice(0, showMovies.length + 2);
      return addMoviesMinWidth;
    }
  };

  const handleChangeAddMovies = () => {
    setShowMovies(handleAddMovies);
  };

  const shortFilms = showMovies.filter((item) => {
    return item.duration <= 40;
  });


  //Эффект показывает короткометражные фильмы
  useEffect(() => {
    if (!isShortMoviesCards === false && showMovies) {
      setShowMovies(moviesCards);

    }
    if (isShortMoviesCards === true && shortFilms) {
      setShowMovies(shortFilms);
      //onSearchFilms(values.name);
    }
    // eslint-disable-next-line
  }, [isShortMoviesCards, setShowMovies]);

  const hiddenButton =
    showMovies.length <= 3 || showMovies.length === movies.length || isShortMoviesCards === true
      ? "movies__button_hidden"
      : "";


 
  return (
    <div className="movies">
      <SearchForm  onSubmit={handleSubmit}
          values={values}
          handleChange={handleChange}
          setIsShortMoviesCards={setIsShortMoviesCards}
          isShortMoviesCards={isShortMoviesCards}/>
          {isLoadingData === true ? (
          <Preloader />
        ) : (
      <MoviesCardList 
      showMovies={showMovies}
            movies={movies}
            handleLikeButtonClick={handleLikeButtonClick}
            isSavedMovieCards={isSavedMovieCards}
            isNotFoundSearch={isNotFoundSearch}
            MoreonClick={handleChangeAddMovies}
            hiddenButton={hiddenButton}
            handleChangeAddMovies={handleChangeAddMovies}/>)}
    </div>
  );
}

export default Movies;
