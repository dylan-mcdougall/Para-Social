import React, { useRef} from 'react';
import { useMenu } from '../../context/ContextMenu/ContextMenu';

function OpenMenuButton({
    menuComponent,
    buttonIcon,
    onButtonClick,
    onMenuClose
}) {
    const { setMenuContent, setOnMenuClose, setMenuPosition } = useMenu();
    const buttonRef = useRef()

    const onClick = () => {
        if (onMenuClose) setOnMenuClose(onMenuClose);

        const rect = buttonRef.current.getBoundingClientRect();
        const position = {
            top: rect.top,
            left: rect.left,
        };

        console.log('Button position here!', position)

        setMenuPosition(position);
        setMenuContent(menuComponent);
        
        if (onButtonClick) onButtonClick();
    };

    return (
        <button ref={buttonRef} onClick={onClick}>{buttonIcon}</button>
    );
}

export default OpenMenuButton;
