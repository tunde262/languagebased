import {
    GET_GAME,
    ADD_GAME,
    GAME_LOADING,
    CLEAR_GAME,
    GAME_ERROR,
} from '../actions/types';

const initialState = {
    game: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GAME_LOADING:
            return {
                ...state,
                loading: true
            };
        case CLEAR_GAME:
            return {
                ...state,
                game: null
            };
        case GET_GAME:
            return {
                ...state,
                game: payload,
                loading: false
            };
        case ADD_GAME:
            return {
                ...state,
                game: payload,
                loading: false
            };
        case GAME_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}