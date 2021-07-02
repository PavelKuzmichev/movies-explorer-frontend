import "./Profile.css";
import { useContext, useEffect } from "react";
import useFormWithValidation from "../../utils/useFormWithValidation";
import CurrentUserContext from "../../contexts/CurrentUserContext";
function Profile(props) {
  const { onSignOut, onUpdateUser, errorSubmit } = props;
  
   const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

  

  const currentUser = useContext(CurrentUserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateUser(values);
    
  };

  useEffect(() => {
    currentUser && resetForm(currentUser);
  }, [currentUser, resetForm]);
  return (
    <div className="profile">
      <div className="profile__page">
        <div className="profile__container">
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          <form className="profile__form" name="profile" onSubmit={handleSubmit} >
            <label
              className="profile__label profile__label_type_name"
              htmlFor="name"
            >
              Имя
            </label>
            <label
              className="profile__label profile__label_type_email"
              htmlFor="email"
            >
              Почта
            </label>
            <input
              className="profile__input profile__input_type_name"
              id="name"
              name="name"
              type="text"
              placeholder="Ваше имя"
              required
              minLength="2"
              maxLength="30"
              value={values.name || ""}
              onChange={handleChange}
             
            /><span className="profile__form_span" id="name-error">
            {errors.name}
          </span>
            <input
              className="profile__input profile__input_type_email"
              id="email"
              name="email"
              type="email"
              placeholder="Ваша почта"
              required
              minLength="5"
              maxLength="30"
              value={values.email || ""}
              onChange={handleChange}
              
            />
            <span className="profile__form_span" id="email-error">
              {errors.email}
            </span>
            
          </form>
        </div>
        <div className="profile__container">
        <span
                className={`profile__saved-button-span ${errorSubmit ? "profile__saved-button-span_active" : ""}`}
                id="text-error"
              >
                При обновлении профиля произошла ошибка.
              </span>
        <button className={`profile__button ${!isValid ? "profile__button_disabled" : ""}`}
                type="submit"
                disabled={!isValid} onClick={handleSubmit} >
            Редактировать
          </button>
          <button
            className="profile__button profile__button_type_exit"
            type="button"
            onClick={onSignOut}
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
