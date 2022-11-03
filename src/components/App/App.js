import {
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import Profile from "../Profile/Profile.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import { useState } from "react";
import NotFound from "../NotFound/NotFound.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import { authorizeUser, createUser, getUserData, updateToken } from "../../utils/MainApi.js";
import { useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      updateToken(jwt);
      getUserData(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          history.push('/');
        })
        .catch(err => console.log(err))
    }
  }

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem('jwt');
    history.push('/signin');
  }

  const handleRegistration = (data) => {
    return createUser(data)
      .then((res) => {
        history.push('/signin');
      })
      .catch((err) => console.error(err))
  };

  const handleAuthorization = (data) => {
    return authorizeUser(data)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        updateToken(res.token)
        history.push('/movies');
      })
      .catch((err) => console.error(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className='page'>
          <Header
            isLoggedIn={isLoggedIn}
          />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              component={Main}
              loggedIn={isLoggedIn}
            />

            <ProtectedRoute
              path="/profile"
              component={Profile}
              loggedIn={isLoggedIn}
              userName={'Вячеслав'}
              email={'pochta@ya.ru'}
              handleLogOut={handleLogOut}
            />

            <ProtectedRoute
              path="/movies"
              component={Movies}
              loggedIn={isLoggedIn}
            />

            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              loggedIn={isLoggedIn}
            />

            <Route path="/signup">
              <Register
                onRegister={handleRegistration}
              />
            </Route>

            <Route path="/signin">
              <Login
                onLogin={handleAuthorization}
              />
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
