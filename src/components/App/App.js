import {
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
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

function App() {
  // -------------------------------------------------------------------------------------------------------------------------- переменная стейта авторизации
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const history = useHistory();

  function handleLogOut() {
    setIsLoggedIn(false)
    history.push('/');
  }

  function handleSignIn(e) {
    e.preventDefault();
    setIsLoggedIn(true);
    history.push('/movies');
  }

  function handleSignUp(e) {
    e.preventDefault();
    history.push('/signin');
  }

  return (
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
              handleSubmit={handleSignUp}
            />
          </Route>

          <Route path="/signin">
            <Login
              handleSubmit={handleSignIn}
            />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </div>
    </div>
  );
}

export default App;
