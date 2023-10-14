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

// export const loadCommunity = () => async (dispatch) => {

// }
