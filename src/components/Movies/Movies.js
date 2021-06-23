import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import cards from "../../utils/cards";

function Movies() {
  return (
    <div className="movies">
      <SearchForm />
      <MoviesCardList cards={cards} />
    </div>
  );
}

export default Movies;
