import React, { useState } from "react";
import Logo from "../Logo/Logo";
import "./Header.css";
import { Link } from "react-router-dom";
import { Route, useLocation } from "react-router";
import account from "../../images/background-account.svg";
import Navigation from "./../Navigation/Navigation";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
function Header() {
  const loggedIn = true;

  const [isOpen, setIsOpen] = useState(false);
  const handleBurgerMenuClick = () => setIsOpen(!isOpen);
  const { pathname } = useLocation();
  if (pathname === "/") {
    return (
      <>
        <div className={` ${isOpen ? "header__menu-container" : ""}`} />
        <header className="header">
          <Logo />
          {loggedIn ? (
            <>
              <Navigation />
              <Link
                to="/profile"
                title="Аккаунт"
                className="header__link header__link_account"
              >
                <img src={account} alt="Логотип" className="header__image" />
              </Link>

              <button
                type="button"
                onClick={handleBurgerMenuClick}
                className={"header__button-menu"}
              />
            </>
          ) : (
            <div className="header__sign ">
              <Link to="/signup" title="Регистрация" className="header__link">
                Регистрация
              </Link>
              <Link
                to="/signin"
                title="Войти"
                className="header__link header__link_enter"
              >
                Войти
              </Link>
            </div>
          )}
          <Route exact path={["/", "/movies", "/saved-movies", "/profile"]}>
            <BurgerMenu isOpen={isOpen} closeHandler={handleBurgerMenuClick} />
          </Route>
        </header>
      </>
    );
  }
  return (
    <>
      <div className={` ${isOpen ? "header__menu-container" : ""}`} />
      <header className="header header__white">
        <Logo />
        {loggedIn ? (
          <>
            <Navigation />
            <Link
              to="/profile"
              title="Аккаунт"
              className="header__link header__link_account"
            >
              <img src={account} alt="Логотип" className="header__image" />
            </Link>
            <button
              type="button"
              onClick={handleBurgerMenuClick}
              className={"header__button-menu"}
            />
          </>
        ) : (
          <div className="header__sign">
            <Link to="/signup" title="Регистрация" className="header__link">
              Регистрация
            </Link>
            <Link
              to="/signin"
              title="Войти"
              className="header__link header__link_enter"
            >
              Войти
            </Link>
          </div>
        )}
        <Route exact path={["/", "/movies", "/saved-movies", "/profile"]}>
          <BurgerMenu isOpen={isOpen} closeHandler={handleBurgerMenuClick} />
        </Route>
      </header>
    </>
  );
}
export default Header;
