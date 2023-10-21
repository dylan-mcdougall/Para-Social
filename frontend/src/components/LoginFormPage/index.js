import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect} from "react-router-dom";
import './LoginForm.css';

function LoginFormPage({ login, setLogin }) {
  const dispatch = useDispatch();
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

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <a className="demo-user" onClick={handleClick}>Demo Login</a>
        <button type="submit">Log In</button>
      </form>
      <button onClick={() => setLogin(false)}>Sign Up</button>
    </>
  );
}

export default LoginFormPage;
