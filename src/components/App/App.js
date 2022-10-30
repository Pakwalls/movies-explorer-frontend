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
import Burger from "../Burger/Burger.js";
import { useState } from "react";
import NotFound from "../NotFound/NotFound.js";

function App() {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

        <Route path="/profile">
          <Profile
            userName={'Вячеслав'}
            email={'pochta@ya.ru'}
            handleLogOut={handleLogOut}
          />
        </Route>

        <Route path="/movies">
          <Movies />
        </Route>

        <Route path="/saved-movies">
          <SavedMovies />
        </Route>

        <Route exact path="/">
          <Main />
          <Burger 
            isLoggedIn={isLoggedIn}
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
