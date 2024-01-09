import React from 'react';
import { NavLink } from 'react-router-dom';
import { useMenu } from '../../../context/ContextMenu/ContextMenu';

function HamburgerMenu() {
    const closeMenu = useMenu();

    return (
        <div className='modal-shell'>
            <div className='menu-shell'>
                <div className='menu-item'>
                    <NavLink to='/login-mobile'>
                        Login
                    </NavLink>
                </div>
                <div className='menu-item'>
                    <NavLink to='/signup-mobile'>
                        Sign Up
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default HamburgerMenu;
