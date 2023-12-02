import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CommunityPage.css'
import { loadRoom } from '../../store/rooms';
import { loadCommunity } from '../../store/community';
import CommunityRoomsScroll from '../CommunityRoomsScroll';
import RoomDisplay from '../RoomDisplay';
import CommunityMembersBar from '../CommunityMembersBar';
import { v4 as uuidv4 } from 'uuid';

const wsUrl = process.env.NODE_ENV === 'production' ? 'wss://para-social.onrender.com' : 'ws://localhost:8000';

function CommunityPage({ promptRender, setPromptRender, isLoaded, dataLoaded, displayCommunity  }) {
    const dispatch = useDispatch();
    const community = useSelector(state => state.community.community);
    const room = useSelector(state => state.room.room);
    const webSocket = useRef(null);
    const [roomMessages, setRoomMessages] = useState([]);
    const [clearMessages, setClearMessages] = useState(false);
    const [displayRoom, setDisplayRoom] = useState(null);
    const [roomDataLoaded, setRoomDataLoaded] = useState(false);

    useEffect(() => {
        if (displayCommunity) {
            dispatch(loadCommunity(displayCommunity))
        }
        setClearMessages(true)

        return () => {
            setClearMessages(false)
        }
    }, [displayCommunity])

    useEffect(() => {
        if (clearMessages) {
            setRoomMessages([])
        }

        return () => {
            setClearMessages(false)
        }
    }, [clearMessages])

    useEffect(() => {
        if (!room) return

        if (webSocket.current) {
            webSocket.current.close()
        }

        const ws = new WebSocket(wsUrl);
        webSocket.current = ws;

        ws.onopen = (e) => {
            const data = {
                action: 'join',
                room_id: room.id
            }
            const parsedData = JSON.stringify(data)
            ws.send(parsedData)
            return console.log(`connected ${e}`);
        }

        ws.onmessage = (e) => {
            const parsedData = JSON.parse(e.data)
            if (parsedData.action === 'delete') {
                const target = parsedData.data.ws_message_id;
                setRoomMessages(prevMessages => prevMessages.filter(msg => msg.ws_message_id !== target));
            } else {
                return setRoomMessages(roomMessages => [...roomMessages, parsedData]);
            }
        }

        ws.onerror = (e) => {
            console.log('closing websocket connection ', e);
            return webSocket.current = null
        }

        ws.onclose = (e) => {
            console.log(`connection closed ${e}`);
            return webSocket.current = null;
        }

        return function() {
            if (webSocket.current) {
                webSocket.current.close()
            }
        }
    }, [displayRoom, displayCommunity, room]);

    useEffect(() => {
        async function fetchRoomData() {
            try {
                await dispatch(loadRoom(displayRoom));
                setRoomDataLoaded(true)
            } catch (error) {
                console.log('Error fetching room data: ', error)
            }
        }
        if (displayRoom) {
            fetchRoomData()
        }

        return () => {
            setRoomDataLoaded(false)
        }
    }, [displayRoom])

    return (
        <div className='community-page-wrapper'>
            {dataLoaded && (
                <div className='community-page-content'>
                    <CommunityRoomsScroll community={community} setRoomMessages={setRoomMessages} promptRender={promptRender} setPromptRender={setPromptRender} displayRoom={displayRoom} setDisplayRoom={setDisplayRoom} webSocket={webSocket} dataLoaded={dataLoaded} />
                    <RoomDisplay displayRoom={displayRoom} setDisplayRoom={setDisplayRoom} roomMessages={roomMessages} setRoomMessages={setRoomMessages} webSocket={webSocket} roomDataLoaded={roomDataLoaded} />
                    <CommunityMembersBar isLoaded={isLoaded} community={community} />
                </div>
            )}
        </div>
    )
}

export default CommunityPage;
