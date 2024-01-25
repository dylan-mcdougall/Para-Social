import React from 'react';
import { NavLink } from 'react-router-dom';
import { useMenu } from '../../../context/ContextMenu/ContextMenu';

function HamburgerMenu() {
    const closeMenu = useMenu();

    return (
        <div className='modal-shell hamburger'>
            <div className='menu-shell hamburger'>
                <div className='menu-item hamburger' onClick={closeMenu}>
                    <NavLink to='/login-mobile'>
                        Login
                    </NavLink>
                </div>
                <div className='menu-item hamburger' onClick={closeMenu}>
                    <NavLink to='/signup-mobile'>
                        Sign Up
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default HamburgerMenu;
