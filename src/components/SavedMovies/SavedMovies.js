import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import savedCards from '../../utils/savedCards';

function SavedMovies() {
 

  return (
    <div className="saved-movies">
      
      <SearchForm />
      <MoviesCardList
        cards={savedCards}
        isSavedMoviesList={true}
        isVisibleButtonMore={false}
      />
      
    </div>
  );
}

export default SavedMovies;