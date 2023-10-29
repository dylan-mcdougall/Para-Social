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

function CommunityPage({ promptRender, setPromptRender, isLoaded, dataLoaded, displayCommunity, setDisplayCommunity }) {
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
    }, [displayCommunity])

    useEffect(() => {
        if (!room) return

        if (webSocket.current) {
            webSocket.current.close()
        }

        const ws = new WebSocket(wsUrl);
        webSocket.current = ws;

        ws.onopen = (e) => {
            console.log(`connected ${e}`);
        }

        ws.onmessage = (e) => {
            const parsedData = JSON.parse(e.data);
            parsedData.tempId = uuidv4();
            return setRoomMessages(roomMessages => [...roomMessages, parsedData]);
        }

        ws.onerror = (e) => {
            console.log(e);
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
    }, [displayRoom, displayCommunity]);

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
                    <CommunityRoomsScroll promptRender={promptRender} setPromptRender={setPromptRender} displayRoom={displayRoom} setDisplayRoom={setDisplayRoom} setClearMessages={setClearMessages} webSocket={webSocket} dataLoaded={dataLoaded} />
                    <RoomDisplay displayRoom={displayRoom} setDisplayRoom={setDisplayRoom} roomMessages={roomMessages} setRoomMessages={setRoomMessages} clearMessages={clearMessages} setClearMessages={setClearMessages} webSocket={webSocket} roomDataLoaded={roomDataLoaded} />
                    <CommunityMembersBar isLoaded={isLoaded} community={community} />
                </div>
            )}
        </div>
    )
}

export default CommunityPage;
