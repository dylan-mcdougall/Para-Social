import React, { useContext, useState, useEffect } from 'react';
import './MobileNavigation.css';

const NavContext = React.createContext();
const UpdateNavContext = React.createContext();

export function useNavigation() {
    return useContext(NavContext);
}

export function useNavUpdate() {
    return useContext(UpdateNavContext);
}

export function NavProvider({ children }) {
    const [navTarget, setNavTarget] = useState('room-display');

    function Navigate({ target }) {
        if (target.split(' ')[target.length - 1] !== 'active') {
            target = target + ' active'
        }
        
    }

    return (
        <>
        <NavContext.Provider value={navTarget}>
            {children}
        </NavContext.Provider>
        </>
    )
}
