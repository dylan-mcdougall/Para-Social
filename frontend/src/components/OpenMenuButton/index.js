import React, { useRef} from 'react';
import { useMenu } from '../../context/ContextMenu/ContextMenu';

function OpenMenuButton({
    menuComponent,
    buttonIcon,
    flipDirection,
    onButtonClick,
    onMenuClose,
}) {
    const { setMenuContent, setOnMenuClose, setMenuPosition } = useMenu();
    const buttonRef = useRef()

    const onClick = (e) => {
        e.stopPropagation();

        if (onMenuClose) setOnMenuClose(onMenuClose);

        const rect = buttonRef.current.getBoundingClientRect();
        let position;

        if (flipDirection) {
            position = {
                top: rect.top + 20,
                left: rect.left - 115
            }
        } else {
            position = {
                top: rect.top,
                left: rect.left,
            };
        }

        setMenuPosition(position);
        setMenuContent(menuComponent);
        
        if (onButtonClick) onButtonClick();
    };

    return (
        <button ref={buttonRef} onClick={onClick}>{buttonIcon}</button>
    );
}

export default OpenMenuButton;
