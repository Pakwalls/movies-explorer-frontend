import { Switch, Route, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import Profile from "../Profile/Profile.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import { useState } from "react";
import NotFound from "../NotFound/NotFound.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import {
  authorizeUser,
  createUser,
  getUserData,
  updateToken,
} from "../../utils/MainApi.js";
import { useEffect } from "react";
import { ERRORS } from "../../utils/constants.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      updateToken(jwt);
      getUserData(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res);
          history.push("/movies");
        })
        .catch((err) => console.error(err));
    }
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem("jwt");
    history.push("/");
  };

  const handleRegistration = (data) => {
    return createUser(data)
      .then((res) => {
        history.push("/signin");
      })
      .catch((err) => {
        console.error(err.message);
        if (err.status === 400) {
          setApiError(ERRORS.REGISTER.SERVER_ERROR);
        } else if (err.status === 409) {
          setApiError(ERRORS.EMAIL_EXIST_ERROR);
        } else {
          setApiError(ERRORS.OTHER.INTERNAL_SERVER_ERROR);
        }
      });
  };

  const handleAuthorization = (data) => {
    return authorizeUser(data)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        updateToken(res.token);
        history.push("/movies");
        setApiError("");
      })
      .catch((err) => {
        console.error(err);
        if (err.status === 400) {
          setApiError(ERRORS.LOGIN.INVALID_DATA_ERROR);
        } else if (err.status === 409) {
          setApiError(ERRORS.LOGIN.TOKEN_ERROR);
        } else {
          setApiError(ERRORS.OTHER.INTERNAL_SERVER_ERROR);
        }
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="page">
          <Header isLoggedIn={isLoggedIn} />
          <Switch>
            <ProtectedRoute
              path="/profile"
              component={Profile}
              loggedIn={isLoggedIn}
              user={currentUser}
              handleLogOut={handleLogOut}
              onUpdateUser={setCurrentUser}
            />

            <ProtectedRoute
              path="/movies"
              component={Movies}
              loggedIn={isLoggedIn}
            />

            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              currentUserId={currentUser._id}
              loggedIn={isLoggedIn}
            />

            <Route path="/signup">
              <Register apiError={apiError} onRegister={handleRegistration} />
            </Route>

            <Route path="/signin">
              <Login apiError={apiError} onLogin={handleAuthorization} />
            </Route>

            <Route path="/">
              <Main loggedIn={isLoggedIn} />
            </Route>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
