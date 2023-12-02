import React, { useRef} from 'react';
import { useMenu } from '../../context/ContextMenu/ContextMenu';

function OpenMenuButton({
    menuComponent,
    buttonIcon,
    onButtonClick,
    onMenuClose
}) {
    const { setMenuContent, setOnMenuClose } = useMenu();
    const buttonRef = useRef()

    const onClick = () => {
        if (onMenuClose) setOnMenuClose(onMenuClose);

        const rect = buttonRef.current.getBoundingClientRect();
        const position = {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
        };

        setMenuContent(menuComponent(position));
        
        if (onButtonClick) onButtonClick();
    };

    return (
        <button ref={buttonRef} onClick={onClick}>{buttonIcon}</button>
    );
}

export default OpenMenuButton;
