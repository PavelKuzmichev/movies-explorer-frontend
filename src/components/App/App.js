import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Footer from "../Footer/Footer";
import NotFound from "../NotFound/NotFound";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import "./App.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [movies, setMovies] = useState([]);
  const [showMovies, setShowMovies] = useState([]);
  const [moviesCards, setMoviesCards] = useState([]);
  const [isShortMoviesCards, setIsShortMoviesCards] = useState(false);
  const [isSavedMovieCards, setIsSavedMovieCards] = useState([]);
  const [isNotFoundSearch, setIsNotFoundSearch] = useState(false);
  const [queryFilters, setQueryFilters] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      tokenCheck();
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      getAllMoviesData();
      handleGetSavedMovies();
      const lastSeachedMovies = JSON.parse(
        localStorage.getItem("searchResult")
      );
      if (lastSeachedMovies) {
        setShowMovies(lastSeachedMovies);
      }
    }
  }, [loggedIn]);

  //Сохранение базы фильмов с источника
  const getAllMoviesData = () => {
    setIsLoadingData(true);
    moviesApi
      .searchFilms()
      .then((res) => {
        return res.map((item) => {
          return {
            country: item.country || "не указана",
            director: item.director || "не указан",
            duration: item.duration || "не указана",
            year: item.year || "не указан",
            description: item.description || "нету",
            image: !item.image
              ? ""
              : `https://api.nomoreparties.co${item.image.url}`,
            trailer: item.trailerLink,
            thumbnail: !item.image
              ? ""
              : `https://api.nomoreparties.co${item.image.formats.thumbnail.url}`,
            movieId: item.id || "",
            nameRU: item.nameRU || "не указано",
            nameEN: item.nameEN || "не указано",
          };
        });
      })
      .then((res) => {
        if (res) {
          localStorage.setItem("baseMovies", JSON.stringify(res));
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingData(false));
  };

  // Поиск фильмов во всей базе
  const searchHandler = (query) => {
    const baseMovies = JSON.parse(localStorage.getItem("baseMovies"));
    const searchquery = baseMovies.filter((item) => {
      if (!isShortMoviesCards) {
        return item.nameRU.toLowerCase().includes(query);
      }
      return item.duration <= 40 && item.nameRU.toLowerCase().includes(query);
    });
    localStorage.setItem("searchResult", JSON.stringify(searchquery));
    setMovies(JSON.parse(localStorage.getItem("searchResult")));

    handleSearchFilms(searchquery);
    setIsNotFoundSearch(true);
  };

  // Поиск фильмов в базе сохраненных фильмов
  const searchHandlerSaved = (query) => {
    const searchquery = isSavedMovieCards.filter((item) => {
      if (isShortMoviesCards) {
        return item.duration <= 40 && item.nameRU.toLowerCase().includes(query);
      }
      return item.nameRU.toLowerCase().includes(query);
    });
    setQueryFilters(searchquery);
    handleSearchFilms(searchquery);
    setIsNotFoundSearch(true);
  };

  //зависимость количества фильмов от разрешения экрана
  const handleSearchFilms = (searchquery) => {
    const handleShowMoviesWindowWidth = () => {
      if (window.innerWidth >= 1280) {
        const showMovieMaxWidth = searchquery.slice(0, 12);
        return showMovieMaxWidth;
      }
      if (window.innerWidth >= 768) {
        const showMovieMedWidth = searchquery.slice(0, 8);
        return showMovieMedWidth;
      }
      if (window.innerWidth >= 320) {
        const showMovieMinWidth = searchquery.slice(0, 5);
        return showMovieMinWidth;
      }
    };
    setShowMovies(handleShowMoviesWindowWidth);
    setMoviesCards(handleShowMoviesWindowWidth);
  };

  //показ сохраненных фильмов
  const handleGetSavedMovies = () => {
    mainApi
      .getSavedMovies()
      .then((res) => {
        if (res) {
          setIsSavedMovieCards(res);
        }
      })
      .catch((err) => console.log(err));
  };

  //функция создать/удалить фильм в базе
  function handleLikeButtonClick(data) {
    if (
      isSavedMovieCards &&
      isSavedMovieCards.find((item) => {
        return item.movieId === data.movieId;
      })
    ) {
      if (!data._id) {
        data = isSavedMovieCards.find((item) => {
          return item.movieId === data.movieId;
        });
      }
      if (data._id) {
        return mainApi
          .deleteSavedMovie(data._id)
          .then((res) => {
            if (res) {
              const isDeletedMovie = isSavedMovieCards.filter(
                (item) => item.movieId !== data.movieId
              );

              setIsSavedMovieCards(isDeletedMovie);
              setQueryFilters(isDeletedMovie);
              setIsNotFoundSearch(false);
            }
          })
          .catch((err) => console.log(err));
      }
    } else {
      return mainApi
        .savedMovies(data)
        .then((newMovie) => {
          if (newMovie) {
            setIsSavedMovieCards([...isSavedMovieCards, newMovie]);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  //Регистрация пользователя
  const handleRegister = (values) => {
    const { name, email, password } = values;
    mainApi
      .register(name, email, password)
      .then((res) => {
        if (!res || res.statusCode === 400) {
          throw new Error({ message: "Не передано одно из полей" });
        }
        if (res) {
          handleLogin(values);
        }
      })
      .catch((err) => {
        if (err) {
          handleErrorSubmit();
          console.log({ message: "Некорректно заполнено одно из полей" });
        }
      });
  };
  //Авторизация пользователя
  const handleLogin = (values) => {
    const { email, password } = values;
    mainApi
      .authorization(email, password)
      .then((res) => {
        if (!res) {
          throw new Error({ message: "Не передано одно из полей" });
        }
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          handleGetUserInfo();
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        if (err) {
          handleErrorSubmit();
          console.log({ message: "Необходимо пройти регистрацию" });
        }
      });
  };
  //выход из аккаунта
  const handleSignOut = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      localStorage.removeItem("searchResult");
      localStorage.removeItem("jwt");
      setShowMovies([]);
      setIsNotFoundSearch(false);
      setLoggedIn(false);
    }
  };
  const tokenCheck = () => {
    mainApi.getContent().then((res) => {
      if (res) {
        handleGetUserInfo();
        setLoggedIn(true);
        history.push("/movies");
      }
    });
  };
  //Данные пользователя *** получение
  const handleGetUserInfo = () => {
    mainApi
      .getUserInfo()
      .then((res) => {
        setCurrentUser({
          name: res.name,
          email: res.email,
        });
      })
      .catch(() => console.log("Пользователь не найден"));
  };

  //Данные пользователя *** редактирование
  const handleUpdateUser = (values) => {
    const { email, name } = values;
    mainApi
      .setUserInfo(email, name)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        if (err) {
          handleErrorSubmit();
          console.log({ message: "При обновлении профиля произошла ошибка" });
        }
      });
  };

  const handleErrorSubmit = () => {
    setErrorSubmit(true);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="page-container">
          <Switch>
            <Route exact path="/">
              <Header loggedIn={loggedIn} />
              <Main />
              <Footer />
            </Route>

            <ProtectedRoute loggedIn={loggedIn} path="/movies">
              <Header loggedIn={loggedIn} />
              <Movies
                isLoadingData={isLoadingData}
                movies={movies}
                onSearchFilms={searchHandler}
                showMovies={showMovies}
                setIsShortMoviesCards={setIsShortMoviesCards}
                isShortMoviesCards={isShortMoviesCards}
                setShowMovies={setShowMovies}
                handleLikeButtonClick={handleLikeButtonClick}
                isSavedMovieCards={isSavedMovieCards}
                isNotFoundSearch={isNotFoundSearch}
                moviesCards={moviesCards}
              />
              <Footer />
            </ProtectedRoute>

            <ProtectedRoute loggedIn={loggedIn} path="/saved-movies">
              <Header loggedIn={loggedIn} />
              <SavedMovies
                onSearchFilms={searchHandlerSaved}
                isSavedMovieCards={isSavedMovieCards}
                handleLikeButtonClick={handleLikeButtonClick}
                isNotFoundSearch={isNotFoundSearch}
                isShortMoviesCards={isShortMoviesCards}
                setIsShortMoviesCards={setIsShortMoviesCards}
                setQueryFilters={setQueryFilters}
                queryFilters={queryFilters}
              />
              <Footer />
            </ProtectedRoute>

            <Route path="/signup">
              <Register
                onRegister={handleRegister}
                errorSubmit={errorSubmit}
                setErrorSubmit={setErrorSubmit}
              />
            </Route>

            <Route path="/signin">
              <Login
                onLogin={handleLogin}
                errorSubmit={errorSubmit}
                setErrorSubmit={setErrorSubmit}
              />
            </Route>

            <ProtectedRoute loggedIn={loggedIn} path="/profile">
              <Header loggedIn={loggedIn} />
              <Profile
                onSignOut={handleSignOut}
                onUpdateUser={handleUpdateUser}
                errorSubmit={errorSubmit}
              />
            </ProtectedRoute>
            <Route exact path="/*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
