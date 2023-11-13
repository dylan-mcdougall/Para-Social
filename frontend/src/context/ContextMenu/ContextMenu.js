import React, { useRef, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import './ContextMenu.css';

const MenuContext = React.createContext();

export function MenuProvider({ children }) {
    const menuRef = useRef();
    const [menuContent, setMenuContent] = useState(null);
    const [onMenuClose, setOnMenuClose] = useState(null);

    const closeMenu = () => {
        setMenuContent(null);
        if (typeof onMenuClose === 'function') {
            setOnMenuClose(null);
            onMenuClose();
        }
    };

    const contextValue = {
        menuRef,
        menuContent,
        setMenuContent,
        setOnMenuClose,
        closeMenu
    };

    return (
        <>
        <MenuContext.Provider value={contextValue}>
            {children}
        </MenuContext.Provider>
        <div ref={menuRef} />
        </>
    );
}

export function Menu() {
    const { menuRef, menuContent, closeMenu } = useContext(MenuContext);

    if (!menuRef || !menuRef.current || !menuContent) return null;

    return ReactDOM.createPortal(
        <div id='menu'>
            <div id='menu-background' onClick={closeMenu} />
            <div id='menu-content'>
                {menuContent}
            </div>
        </div>,
        menuRef.current
    );
}

export const useMenu = () => useContext(MenuContext)
