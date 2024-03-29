import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SignupFormPage({ login, setLogin, isMobile }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/home" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          first_name: firstName,
          last_name: lastName,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(sessionActions.demoUser());
    return null
  }

  if (login) {
    return null
  }

  let redirect;
  if (isMobile) {
    redirect = () => {
      history.push('/login-mobile')
    }
  } else {
    redirect = () => {
      setLogin(true)
    }
  }

  const handleRedirection = (e) => {
    e.stopPropagation()
    redirect()
  }

  return (
    <div className="form-parent">
      <div className="form-flex desktop">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p className='errors'>{errors.email}</p>}
          <label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          {errors.username && <p className='errors'>{errors.username}</p>}
          <label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          {errors.firstName && <p className='errors'>{errors.firstName}</p>}
          <label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          {errors.lastName && <p className='errors'>{errors.lastName}</p>}
          <label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p className='errors'>{errors.password}</p>}
          <label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {errors.confirmPassword && <p className='errors'>{errors.confirmPassword}</p>}
          <button type="submit">Sign Up</button>
          <div className="new-user">
            <p>Already have an account?</p>
            <button className="catalyst" onClick={handleRedirection}>Login</button>
            <p>Or, use our demo account</p>
            <a className="demo-user" onClick={handleClick}>Demo Login</a>
          </div>
        </form>
      </div>
      <div className="initial-form mobile">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p className='errors'>{errors.email}</p>}
          <label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          {errors.username && <p className='errors'>{errors.username}</p>}
          <label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          {errors.firstName && <p className='errors'>{errors.firstName}</p>}
          <label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          {errors.lastName && <p className='errors'>{errors.lastName}</p>}
          <label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p className='errors'>{errors.password}</p>}
          <label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {errors.confirmPassword && <p className='errors'>{errors.confirmPassword}</p>}
          <button type="submit">Sign Up</button>
          <div className="new-user">
            <p>Already have an account?</p>
            <button className="catalyst" onClick={handleRedirection}>Login</button>
            <p>Or, use our demo account</p>
            <a className="demo-user" onClick={handleClick}>Demo Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
