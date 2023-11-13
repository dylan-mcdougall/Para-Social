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
        <div className='nav-left'>
          <li className='title'>
            Para-Social
          </li>
          <li className='link'>
            Browse Communities
          </li>
          <li className='link'>
            Analytics
          </li>
        </div>
        <div className='nav-right'>
          <li className='profile-button'>
            <ProfileButton user={sessionUser} />
          </li>
        </div>
      </>
    );
  } else return null

  const navClassName = "nav-wrapper" + (sessionUser ? " " : " hidden");

  return (
    <ul className={navClassName}>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
