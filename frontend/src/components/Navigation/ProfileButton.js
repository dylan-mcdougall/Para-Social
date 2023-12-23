import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { FaUser } from 'react-icons/fa6';
import OpenModalButton from "../OpenModalButton";
import UserImageUpload from "../UserImageUpload";
import './Navigation.css';
import { removeRoom } from "../../store/rooms";
import { removeCommunity } from "../../store/community";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    dispatch(removeCommunity())
    dispatch(removeRoom())
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      {user.ProfileImage ? <img className="profile image-item" src={user?.ProfileImage?.url} alt="Thumbnail" onClick={openMenu} /> : <FaUser onClick={openMenu} className="profile image-item" style={{ backgroundColor: "#00ccff", color: "black" }} />}
      <ul className={ulClassName} ref={ulRef}>
        <li className="profile-username">{user.username}</li>
        <li className="user-image-upload">
          <OpenModalButton
            buttonText={'Upload Image'}
            modalComponent={() => <UserImageUpload user={user} />} />
        </li>
        <li className="logout">
          <button className="logout" onClick={logout}>Log Out</button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;
