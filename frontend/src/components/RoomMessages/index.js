import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './RoomMessages.css';
import moment from 'moment';
import OpenModalButton from '../OpenModalButton';
import DeleteRoomMessageModal from '../DeleteMessageModal';

function RoomMessages({ webSocket, roomMessages, setRoomMessages }) {
    const sessionUser = useSelector(state => state.session.user);
    const room = useSelector(state => state.room.room);
    const [dataLoaded, setDataLoaded] = useState(false);

    console.log('room state here: ', room);

    useEffect(() => {
        if (!room) return
        roomMessages = roomMessages.filter((el) => el.room_id === room.id)
        setDataLoaded(true)
    }, [roomMessages])
    
    return (
        <div className='room-messages-wrapper'>
            {dataLoaded && (
                <ul className='room-messages-ul'>
                    <div>
                        {roomMessages ? (
                            roomMessages.map((message) => {
                                console.log('message data here! ', message)
                                let usernameClass = 'message-username';
                                if (sessionUser.id === message.user_id) {
                                    usernameClass = usernameClass + ' current'
                                }
                                let validatedPermissions = null;
                                if (sessionUser.id === message.user_id) {
                                    validatedPermissions = (
                                        <>
                                            <OpenModalButton
                                                buttonText={'X'}
                                                modalComponent={() => <DeleteRoomMessageModal webSocket={webSocket} roomMessages={roomMessages} setRoomMessages={setRoomMessages} roomId={room.id} messageId={message.ws_message_id || message.id} />} />
                                        </>
                                    )
                                }
                                return (
                                    <li className='message-item' key={message.id}>
                                        <div className='message-details'>
                                            <div className='message-details-left'>
                                                <p className={usernameClass}>{message?.username ? message?.username : message?.User?.username} </p>
                                                <p className='datetime-sent'> Sent {moment(message?.created ? message?.created : message?.createdAt).format('l LT')}</p>
                                            </div>
                                            {validatedPermissions}
                                        </div>
                                        <div className='message-content'>
                                            <p className='message-text'>{message?.content_message}</p>
                                            {message?.content_type === 'src' ? <img className='message-image' src={message?.Images?.length ? message?.Images[0].url : message.content_src} alt="Uploaded Content" /> : null}
                                        </div>
                                    </li>
                                )
                            })
                        ) : (
                            room?.Messages?.map((message) => {
                                let usernameClass = 'message-username';
                                if (sessionUser.id === message.user_id) {
                                    usernameClass = usernameClass + ' current'
                                }
                                let validatedPermissions = null;
                                if (sessionUser.id === message.user_id) {
                                    console.log("TESTING WS MESSAGE ID, ", message)
                                    validatedPermissions = (
                                        <>
                                            <OpenModalButton
                                                buttonText={'X'}
                                                modalComponent={() => <DeleteRoomMessageModal webSocket={webSocket} roomId={room.id} messageId={message.ws_message_id || message.id} />} />
                                        </>
                                    )
                                }
                                return (
                                    <li className='message-item' key={message.id}>
                                        <div className='message-details'>
                                            <div className='message-details-left'>
                                                <p className={usernameClass}>{message?.User?.username} </p>
                                                <p className='datetime-sent'> Sent {moment(message?.createdAt).format('l LT')}</p>
                                            </div>
                                            {validatedPermissions}
                                        </div>
                                        <div className='message-content'>
                                            <p className='message-text'>{message?.content_message}</p>
                                            {message?.content_type === 'src' ? <img src={message.Images[0].url} alt="Uploaded Content" /> : null}
                                        </div>
                                    </li>
                                )
                            })
                        )}
                    </div>
                </ul>
            )}
        </div>
    );
}

export default RoomMessages;
