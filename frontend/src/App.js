import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import LandingPage from "./components/LandingPage";
import HomePage from './components/HomePage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [login, setLogin] = useState(true);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route path="/login-mobile">
            <LoginFormPage login={login} isMobile={true} />
          </Route>
          <Route path="/signup-mobile">
            <SignupFormPage login={false} isMobile={true} />
          </Route>
          <Route path='/home'>
            <HomePage />
          </Route>
          <Route exact path='/'>
            <LandingPage login={login} setLogin={setLogin} />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
