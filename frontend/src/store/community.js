import { csrfFetch } from "./csrf";

const SET_COMMUNITY = "community/setCommunity";
const REMOVE_COMMUNITY = "community/removeCommunity";

const setCommunity = (community) => {
    return {
        type: SET_COMMUNITY,
        payload: community
    }
};

export const removeCommunity = () => {
    return {
        type: REMOVE_COMMUNITY,
    }
}

export const loadCommunity = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/communities/${id}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setCommunity(data));
        return data
    } else {
        console.log(response.errors);
    }
}

export const newCommunity = (community) => async (dispatch) => {
    const { creator_id, name, description, privacy, price } = community;
    console.log(privacy);
    const response = await csrfFetch('/api/communities', {
        method: "POST",
        body: JSON.stringify({
            creator_id,
            name,
            description,
            private: privacy,
            price
        })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setCommunity(data));
        return data;
    } else {
        console.log('Errors while creating community: ', response);
    }
}

export const updateCommunity = (community) => async () => {
    const { communityId, name, description, privacy, price } = community;
    const response = await csrfFetch(`/api/communities/${communityId}`, {
        method: 'PATCH',
        body: JSON.stringify({
            name,
            description,
            private: privacy,
            price
        })
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.log('Errors while updating community: ', response);
    }
}

export const deleteCommunity = (communityId) => async (dispatch) => {
    const response = await csrfFetch(`/api/communities/${communityId}`, {
        method: "DELETE"
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(removeCommunity())
        return data;
    } else {
        console.log("Errors while deleting community: ", response)
    }
}

export const joinCommunity = (userId, communityId) => async (dispatch) => {
    const response = await csrfFetch(`api/communities/${communityId}/members/${userId}`, {
        method: 'POST'
    });
    if (response.ok) {
        const data = await response.json();
        await dispatch(loadCommunity(communityId));
        return data
    } else {
        console.error("There was an error joining this community.", response)
    }
}

export const deleteMembership = (userId, communityId) => async () => {
    const response = await csrfFetch(`/api/communities/${communityId}/members/${userId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.log("Errors while deleting membership: ", response)
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
        case REMOVE_COMMUNITY:
            newState = Object.assign({}, state);
            newState.community = null;
            return newState;
        default:
            return state;
    }
}

export default communityReducer;
