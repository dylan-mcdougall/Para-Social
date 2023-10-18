import { csrfFetch } from "./csrf";

const SET_COMMUNITY = "community/setCommunity";
const REMOVE_COMMUNITY = "community/removeCommunity";

const setCommunity = (community) => {
    return {
        type: SET_COMMUNITY,
        payload: community
    }
};

const removeCommunity = () => {
    return {
        type: REMOVE_COMMUNITY,
    }
}

export const loadCommunity = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/community/${id}`);
    if (response.ok) {
        const data = await response.json();
        console.log('community fetch ', data);
        dispatch(setCommunity(data));
        return data
    } else {
        console.log(response.errors);
    }
}

const initialState = { community: null };

const communityReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_COMMUNITY:
            newState = Object.assign({}, state);
            newState.community = action.payload;
            return newState;
        default:
            return state;
    }
}

export default communityReducer;
