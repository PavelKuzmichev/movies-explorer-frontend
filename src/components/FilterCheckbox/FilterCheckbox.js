import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox(props) {
  const { setIsShortMoviesCards, isShortMoviesCards } = props;
  const handleShortMovies = () => {
    setIsShortMoviesCards(!isShortMoviesCards);
  };

  return (
    <div className="filter-checkbox">
      <input
        className="filter-checkbox__switcher"
        type="checkbox"
        onChange={handleShortMovies}
      />
    </div>
  );
}

export default FilterCheckbox;
