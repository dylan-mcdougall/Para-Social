import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RoomMessages.css';
import { loadRoom } from '../../store/rooms';
import moment from 'moment';
import OpenModalButton from '../OpenModalButton';
import DeleteRoomMessageModal from '../DeleteMessageModal';

function RoomMessages({ isLoaded, room, clearMessages, setClearMessages, displayRoom, roomMessages, setRoomMessages }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const community = useSelector(state => state.community.community);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (displayRoom === null) return
        dispatch(loadRoom(displayRoom));
        setDataLoaded(true)
        if (clearMessages) {
            setRoomMessages([]);
            setClearMessages(false);
        }
        if (!room?.Messages?.length) {
            return;
        }
        roomMessages = roomMessages.filter(msg => !msg.tempId);
    }, [displayRoom, clearMessages, roomMessages]);

    return (
        <>
            {dataLoaded && (
                <div className='room-messages-wrapper'>
                    <ul className='room-messages-ul'>
                        <div>
                            {room?.Messages?.length ? (
                                room.Messages.map((message) => {
                                    let validatedPermissions = null;
                                    if (sessionUser.id === message.user_id) {
                                        validatedPermissions = (
                                            <>
                                                <OpenModalButton
                                                buttonText={'X'}
                                                modalComponent={() => <DeleteRoomMessageModal setClearMessages={setClearMessages} roomId={room.id} messageId={message.id} /> } />
                                            </>
                                        )
                                    }
                                    return (
                                        <li className='message-item' key={message.id}>
                                            <div className='message-details'>
                                                <p className='message-username'>{message?.User?.username}</p>
                                                <p className='datetime-sent'> Sent {moment(message?.createdAt).format('l LT')}</p>
                                                {validatedPermissions}
                                            </div>
                                            <div className='message-content'>
                                                {message?.content_message} 
                                                {message?.content_src && <img src={message.content_src} alt="Uploaded Content" />}
                                            </div>
                                        </li>
                                    )
                                })
                            ) : (
                                roomMessages.map((message, index) => {
                                    return (
                                    <li className='message-item ws' key={message.id || index}>
                                        <p className='testing-ws'>
                                            {message?.content_message || message?.data?.content_message}
                                        </p>
                                    </li>
                                    )
                                })
                            )}
                        </div>
                    </ul>
                </div>
            )}
        </>
    );
}

export default RoomMessages;
