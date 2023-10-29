import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPenSquare } from 'react-icons/fa'
import CreateRoomModal from '../CreateRoomModal';
import DeleteRoomModal from '../DeleteRoomModal';
import OpenModalButton from '../OpenModalButton';
import './CommunityRoomsScroll.css'
import UpdateRoomModal from '../UpdateRoomModal';

function CommunityRoomsScroll({ setClearMessages, webSocket, dataLoaded, displayRoom, setDisplayRoom }) {
    const sessionUser = useSelector(state => state.session.user);
    const community = useSelector(state => state.community.community);

    useEffect(() => {
        setClearMessages(true)
    }, [community])
    
    const handleClick = async (roomId) => {
        setClearMessages(true)
        if (webSocket.current) {
            webSocket.current.close()
        }
        await setDisplayRoom(roomId)
    }

    if (!community) return null;

    return (
        <div className='community-rooms-scroll-wrapper'>
            <ul className='community-rooms-ul'>
                <h3>
                    Rooms
                </h3>
                {dataLoaded && (
                    community?.Rooms ? community?.Rooms?.map((room) => {
                        let validatedOwner = null;
                        if (sessionUser.id === community?.creator_id) {
                            validatedOwner = (
                                <div className='room-actions'>
                                    <OpenModalButton
                                        buttonText={<FaPenSquare />}
                                        modalComponent={() => <UpdateRoomModal setDisplayRoom={setDisplayRoom} setClearMessages={setClearMessages}communityId={community.id} roomId={room.id} />} />
                                    <OpenModalButton
                                        buttonText={'X'}
                                        modalComponent={() => <DeleteRoomModal setDisplayRoom={setDisplayRoom} roomId={room.id} />} />
                                </div>
                            )
                        }
                        return (
                            <div className='room-item-wrapper'>
                                <li className='room-item' key={room.id} onClick={() => handleClick(room.id)}>
                                    {room?.name}
                                </li>
                                {validatedOwner}
                            </div>
                        )
                    }) : (
                        <li className='room-item missing'>
                            <p>Please create a Room to get started.</p>
                        </li>
                    )
                )}
            </ul>
            <div className='new-room-button'>
                <OpenModalButton
                    buttonText={'+ Add a Room'}
                    modalComponent={() => <CreateRoomModal webSocket={webSocket} communityId={community.id} />} />
            </div>
        </div>
    )
}

export default CommunityRoomsScroll;
