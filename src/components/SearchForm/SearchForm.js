import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  return (
    <div className="search-form">
      <div className="search-form__search-input-wrapper">
        <input
          className="search-form__text-input"
          type="text"
          placeholder="Фильм"
          required
        />
        <button className="search-form__button" type="submit">Найти</button>
      </div>
      <div className="search-form__shorts-wrapper">
        <FilterCheckbox />
        <p className="search-form__shorts-title">Короткометражки</p>
      </div>
      <hr className="search-form__hr" />
    </div>
  );
}

export default SearchForm;