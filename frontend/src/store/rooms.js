import { csrfFetch } from "./csrf";

const SET_ROOM = "room/setRoom";

const setRoom = (room) => {
    return {
        type: SET_ROOM,
        payload: room
    }
}

export const loadRoom = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/rooms/${id}`);
    if (response.ok) {
        const data = await response.json();
        console.log('room fetch, ', data);
        dispatch(setRoom(data));
        return data
    } else {
        console.log(response.errors);
    }
}

export const newRoom = (room) => async (dispatch) => {
    const { communityId, name } = room
    const response = await csrfFetch(`/api/communities/${communityId}/rooms/new`, {
        method: 'POST',
        body: JSON.stringify({name})
    });
    if (response.ok) {
        const data = await response.json()
        dispatch(setRoom(data));
        return data;
    } else {
        console.log('Errors while creating room: ', response)
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
        default:
            return state;
    }
}

export default roomReducer;
