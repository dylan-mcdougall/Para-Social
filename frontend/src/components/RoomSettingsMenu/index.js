import React from 'react';
import UpdateRoomModal from '../UpdateRoomModal';
import DeleteRoomModal from '../DeleteRoomModal';
import OpenModalButton from '../OpenModalButton';
import { useMenu } from '../../context/ContextMenu/ContextMenu';

function RoomSettingsMenu({ room, community, setRoomMessages, setPromptRoomScroll, displayRoom, setDisplayRoom, setPromptRender }) {
    const { closeMenu } = useMenu();

    return (
        <div className='modal-shell'>
            <div className='menu-shell'>
                <div className='menu-item'>
                    <OpenModalButton
                        buttonText={"Update Room"}
                        onButtonClick={closeMenu}
                        propagateClick={true}
                        modalComponent={() => <UpdateRoomModal setPromptRender={setPromptRender} setPromptRoomScroll={setPromptRoomScroll} communityId={community.id} room={room} setRoomMessages={setRoomMessages} />} />
                </div>
                <div className='menu-item delete'>
                    <OpenModalButton
                        buttonText={"Delete Room"}
                        onButtonClick={closeMenu}
                        propagateClick={true}
                        modalComponent={() => <DeleteRoomModal setPromptRender={setPromptRender} setPromptRoomScroll={setPromptRoomScroll} displayRoom={displayRoom} setDisplayRoom={setDisplayRoom} roomId={room.id} />} />
                </div>
            </div>
        </div>
    )
}

export default RoomSettingsMenu;
