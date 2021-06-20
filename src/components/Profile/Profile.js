import './Profile.css';

function Profile() {
  

  return (
    <div className="profile">
     
      <div className="profile__page">
        <div className="profile__container">
          <h1 className="profile__title">Привет, Виталий!</h1>
          <form className="profile__form" name="profile">
            <label className="profile__label profile__label_type_name" htmlFor="name">Имя</label>
            <label className="profile__label profile__label_type_email" htmlFor="email">Почта</label>
            <input
              className="profile__input profile__input_type_name"
              id="name"
              name="name"
              type="text"
              placeholder="Ваше имя"
              required
              minLength="2"
              maxLength="30"
            />
            <input
              className="profile__input profile__input_type_email"
              id="email"
              name="email"
              type="email"
              placeholder="Ваша почта"
              required
              minLength="5"
              maxLength="30"
            />
          </form>
        </div>
        <div className="profile__container">
          <button className="profile__button" type="submit" disabled>Редактировать</button>
          <button className="profile__button profile__button_type_exit" type="button">Выйти из аккаунта</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;