import React from "react";
import { Route, Switch } from "react-router-dom";
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

function App() {
    //настройка для отображения до регистрации или после регистрации в header.js
    return (
        <div className="app">
            <div className="page-container">
                <Switch>
                    <Route exact path="/">
                        <Header />
                        <Main />
                        <Footer />
                    </Route>

                    <Route path="/movies">
                        <Header />
                        <Movies />
                        <Footer />
                    </Route>

                    <Route path="/saved-movies">
                        <Header />
                        <SavedMovies />
                        <Footer />
                    </Route>

                    <Route path="/signup">
                        <Register />
                    </Route>

                    <Route path="/signin">
                        <Login />
                    </Route>

                    <Route path="/profile">
                        <Header />
                        <Profile />
                    </Route>
                    <Route exact path="/*">
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;
