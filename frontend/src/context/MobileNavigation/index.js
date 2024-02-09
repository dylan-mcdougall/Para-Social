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
    const [navTarget, setNavTarget] = useState('room-display active');

    function Navigate({ target }) {
        if (target.split(' ')[target.length - 1] !== 'active') {
            setNavTarget(`${target} active`)
        }
    }

    const navValue = {
        navTarget,
        setNavTarget,
        Navigate
    }

    return (
        <>
        <NavContext.Provider value={navValue}>
            {children}
        </NavContext.Provider>
        </>
    )
}

export default function Navigation() {
    
    return (
        <div className='navigation-wrapper mobile'>
            <button>Communities</button>
            <button>Room Selection</button>
            <button>Chat</button>
        </div>
    )
}
