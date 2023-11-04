import React from 'react';
import { useMenu } from '../../context/ContextMenu/ContextMenu';

function OpenMenuButton({
    menuComponent,
    buttonIcon,
    onButtonClick,
    onMenuClose
}) {
    const { setMenuContent, setOnMenuClose } = useMenu();

    const onClick = () => {
        if (onMenuClose) setOnMenuClose(onMenuClose);
        setMenuContent(menuComponent());
        if (onButtonClick) onButtonClick();
    };

    return (
        <button onClick={onClick}>{buttonIcon}</button>
    );
}

export default OpenMenuButton;
