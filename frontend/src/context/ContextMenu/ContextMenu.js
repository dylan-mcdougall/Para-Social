import React, { useRef, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import './ContextMenu.css';

const MenuContext = React.createContext();

export function MenuProvider({ children }) {
    const menuRef = useRef();
    const [menuContent, setMenuContent] = useState(null);
    const [onMenuClose, setOnMenuClose] = useState(null);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

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
        menuPosition,
        setMenuContent,
        setOnMenuClose,
        setMenuPosition,
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
    const { menuRef, menuContent, menuPosition, closeMenu } = useContext(MenuContext);

    if (!menuRef || !menuRef.current || !menuContent) return null;

    const menuStyle = {
        top: `${menuPosition.top - 5}px`,
        left: `${menuPosition.left + 8}px`,
    }

    return ReactDOM.createPortal(
        <div id='menu'>
            <div id='menu-background' onClick={closeMenu} />
            <div id='menu-content' style={menuStyle}>
                {menuContent}
            </div>
        </div>,
        menuRef.current
    );
}

export const useMenu = () => useContext(MenuContext)
