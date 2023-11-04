import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <li>
          Para-Social
        </li>
        <li>
          Browse Communities
        </li>
        <li>
          Analytics
        </li>
        <li className='profile-button'>
          <ProfileButton user={sessionUser} />
        </li>
      </>
    );
  } else {
    sessionLinks = (
      <li>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </li>
    );
  }

  const navClassName = "nav-wrapper" + (sessionUser ? " " : " hidden");

  return (
    <ul className={navClassName}>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
