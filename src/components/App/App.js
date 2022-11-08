import { Switch, Route, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import Profile from "../Profile/Profile.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import NotFound from "../NotFound/NotFound.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import {
  authorizeUser,
  createUser,
  getUserData,
  updateToken,
} from "../../utils/MainApi.js";
import { useEffect, useState } from "react";
import { ERRORS } from "../../utils/constants.js";

function App() {
  const history = useHistory();
  const token = localStorage.getItem("jwt");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (token) {
      loginUser(token);
    } else {
      setIsLoggedIn(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginUser = (jwt) => {
    return getUserData(jwt)
      .then((res) => {
        setCurrentUser(res);
        if (!isLoggedIn) {
          setIsLoggedIn(true);
        }
        handleClearError();
      })
      .catch((err) => {
        if (err.status === 401) {
          localStorage.clear();
          history.push("/");
        }
        setIsLoggedIn(false);
        console.error(err.message);
      });
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    localStorage.clear();
    history.push("/");
  };

  const handleRegistration = (data) => {
    if (!isLoading) {
      setIsLoading(true);
      return createUser(data)
        .then((res) => {
          handleAuthorization(data);
          history.push("/signin");
          handleClearError();
        })
        .catch((err) => {
          console.error(err.message);
          setIsLoggedIn(false);

          if (err.status === 400) {
            setApiError(ERRORS.REGISTER.SERVER_ERROR);
          } else if (err.status === 409) {
            setApiError(ERRORS.EMAIL_EXIST_ERROR);
          } else {
            setApiError(ERRORS.OTHER.INTERNAL_SERVER_ERROR);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleAuthorization = (data) => {
    if (!isLoading) {
      setIsLoading(true);

      return authorizeUser(data)
        .then((res) => {
          localStorage.setItem("jwt", res.token);
          updateToken(res.token);
          handleClearError();
          return getUserData(res.token);
        })
        .then((data) => {
          setCurrentUser(data);
          history.push("/movies");
          handleClearError();
          if (!isLoggedIn) {
            setIsLoggedIn(true);
          }
        })
        .catch((err) => {
          console.error(err);
          if (err.status === 401) {
            setApiError(ERRORS.LOGIN.INVALID_DATA_ERROR);
          } else if (err.status === 409) {
            setApiError(ERRORS.LOGIN.TOKEN_ERROR);
          } else if (err.status === 401) {
            localStorage.clear();
            setIsLoggedIn(false);
            history.push("/");
            console.error(err.message);
          } else {
            setApiError(ERRORS.OTHER.INTERNAL_SERVER_ERROR);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleClearError = () => {
    setApiError("");
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
              handleLogOut={handleLogOut}
              onUpdateUser={setCurrentUser}
            />

            <ProtectedRoute
              exact
              path="/movies"
              component={Movies}
              loggedIn={isLoggedIn}
              handleLogOut={handleLogOut}
            />

            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              loggedIn={isLoggedIn}
              handleLogOut={handleLogOut}
            />

            <Route path="/signup">
              <Register
                handleClearError={handleClearError}
                apiError={apiError}
                onRegister={handleRegistration}
                isLoading={isLoading}
              />
            </Route>

            <Route path="/signin">
              <Login
                handleClearError={handleClearError}
                apiError={apiError}
                onLogin={handleAuthorization}
                isLoading={isLoading}
              />
            </Route>

            <Route exact path="/">
              <Main loggedIn={isLoggedIn} />
            </Route>

            <Route>
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
