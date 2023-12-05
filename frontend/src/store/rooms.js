import { csrfFetch } from "./csrf";

const SET_ROOM = "room/setRoom";
const REMOVE_ROOM = "room/removeRoom";

const setRoom = (room) => {
    return {
        type: SET_ROOM,
        payload: room
    }
}

export const removeRoom = () => {
    return {
        type: REMOVE_ROOM,
    }
}

export const loadRoom = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/rooms/${id}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setRoom(data));
        return data
    } else {
        console.log(response.errors);
    }
}

export const newRoom = (room) => async (dispatch) => {
    const { communityId, name, classification } = room
    const response = await csrfFetch(`/api/communities/${communityId}/rooms/new`, {
        method: 'POST',
        body: JSON.stringify({name, classification})
    });
    if (response.ok) {
        const data = await response.json()
        return data;
    } else {
        console.log('Errors while creating room: ', response)
    }
}

export const updateRoom = (room) => async (dispatch) => {
    const { communityId, roomId, name } = room;
    const response = await csrfFetch(`/api/communities/${communityId}/rooms/${roomId}`, {
        method: 'PATCH',
        body: JSON.stringify({name})
    });
    if (response.ok) {
        const data = await response.json()
        return data;
    } else {
        console.log("Errors while updating room: ", response)
    }
}

export const deleteRoom = (communityId, roomId) => async (dispatch) => {
    const response = await csrfFetch(`/api/communities/${communityId}/rooms/${roomId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        const data = await response.json()
        dispatch(removeRoom())
        return data;
    } else {
        console.log('Errors while deleting room: ', response)
    }
}

export const deleteRoomMessage = (roomId, messageId) => async (dispatch) => {
    const response = await csrfFetch(`/api/rooms/${roomId}/messages/${messageId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const data = response.json()
        return data
    } else {
        console.log('Errors while deleting message: ', response);
    }
}

const initialState = { room: null };

const roomReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_ROOM:
            newState = Object.assign({}, state);
            newState.room = action.payload;
            return newState;
        case REMOVE_ROOM:
            newState = Object.assign({}, state);
            newState.room = null
            return newState;
        default:
            return state;
    }
}

export default roomReducer;
