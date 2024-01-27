import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage({ login, setLogin, isMobile }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/home" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
    .catch(
      async (response) => {
        const data = await response.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(sessionActions.demoUser());
    return null
  }

  if (!login) {
    return null
  }

  let redirect;
  if (isMobile) {
    redirect = () => {
      history.push('/signup-mobile')
    }
  } else {
    redirect = () => {
      setLogin(false)
    }
  }

  const handleRedirection = (e) => {
    e.stopPropagation()
    redirect()
  }

  return (
    <div className="form-parent">
      <div className="form-flex desktop">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              placeholder="Username or Email"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.credential && <p className='errors'>{errors.credential}</p>}
          <button className="submit" type="submit">Log In</button>
          <div className="new-user">
            <p>Don't have an account?</p>
            <button className="catalyst" onClick={handleRedirection}>Sign Up</button>
            <p>Or, use our demo account</p>
            <a className="demo-user" onClick={handleClick}>Demo Login</a>
          </div>
        </form>
      </div>
      <div className="initial-form mobile">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              placeholder="Username or Email"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.credential && <p className='errors'>{errors.credential}</p>}
          <button className="submit" type="submit">Log In</button>
          <div className="new-user">
            <p>Don't have an account?</p>
            <button className="catalyst" onClick={handleRedirection}>Sign Up</button>
            <p>Or, use our demo account</p>
            <a className="demo-user" onClick={handleClick}>Demo Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
