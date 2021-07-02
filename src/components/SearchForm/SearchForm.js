import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

import "./SearchForm.css";

function SearchForm(props) {
  const { onSubmit, handleChange, values, setIsShortMoviesCards, isShortMoviesCards } =
    props;

  return (
    <div className="search-form">
      <form className="search-form__search-input-wrapper" onSubmit={onSubmit}>
        <input
          className="search-form__text-input"
          id="movies"
          placeholder="Фильм"
          type="search"
          name="name"
          required
          value={values.name || ""}
          onChange={handleChange}
        />
        <button className="search-form__button" type="submit">
          Найти
        </button>
      </form>
      <div className="search-form__shorts-wrapper">
        <FilterCheckbox
          setIsShortMoviesCards={setIsShortMoviesCards}
          isShortMoviesCards={isShortMoviesCards}
        />
        <p className="search-form__shorts-title">Короткометражки</p>
      </div>
      <hr className="search-form__hr" />
    </div>
  );
}

export default SearchForm;
