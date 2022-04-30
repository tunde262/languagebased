import axios from 'axios';

import {
    GET_GAME,
    ADD_GAME,
    GAME_LOADING,
    CLEAR_GAME,
    GAME_ERROR,
} from './types';


// Get Game by id
export const getGameById = id => async dispatch => {
    dispatch(setGameLoading());
    try {
        const res = await axios.get(`/api/games/find/${id}`);
  
        dispatch({
            type: GET_GAME,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GAME_ERROR,
            payload: { msg: "something went wrong", status: 500 }
        });
        console.log(err);
    }
}

// Get Posts By User Id

// Add Post
export const addGame = ( language ) => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };

    // Create Game

    console.log('CREATING GAME');
    console.log(language); 

    const body = JSON.stringify({ 
        language
    });

    try {        
        const res = await axios.post(`/api/games`, body, config);

        dispatch({
            type: ADD_GAME,
            payload: res.data
        });

        window.location.href = `/game/${res.data._id}`;

    } catch (err) {
      dispatch({
        type: GAME_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};

// Update Game by joining
export const joinGame = id => async dispatch => {
    console.log('JOINING GAME')

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        console.log('GAME ID')
        console.log(id);

        const res = await axios.post(`/api/games/join/${id}`, config);

        dispatch({
            type: GET_GAME,
            payload: res.data
        });

        window.location.href = `/match/${res.data._id}`;

    } catch (err) {
        console.log('ERRORS')
        console.log(err);
    }
}

// Game - Ready Up player 1
export const readyPlayer1 = id => async dispatch => {
    console.log('READYING UP player 1')

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        console.log('GAME ID')
        console.log(id);

        const res = await axios.post(`/api/games/ready_1/${id}`, config);

        dispatch({
            type: GET_GAME,
            payload: res.data
        });

        // window.location.href = `/game/${res.data._id}`;

    } catch (err) {
        console.log('ERRORS')
        console.log(err);
    }
}

// Update Game Score 
export const updateScore = (id, score) => async dispatch => {
    console.log('UPDATING SCORE OF GAME')

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        console.log('GAME ID')
        console.log(id);

        console.log('GAME SCORE');
        console.log(score); 

        const body = JSON.stringify({ 
            score
        });

        const res = await axios.post(`/api/games/score/${id}`, body, config);

        dispatch({
            type: GET_GAME,
            payload: res.data
        });

        // window.location.href = `/game/${res.data._id}`;

    } catch (err) {
        console.log('ERRORS')
        console.log(err);
    }
}

// Game - Ready Up player 2
export const readyPlayer2 = id => async dispatch => {
    console.log('READYING UP PLAYER 2')

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        console.log('GAME ID')
        console.log(id);

        const res = await axios.post(`/api/games/ready_2/${id}`, config);

        dispatch({
            type: GET_GAME,
            payload: res.data
        });

        // window.location.href = `/game/${res.data._id}`;

    } catch (err) {
        console.log('ERRORS')
        console.log(err);
    }
}

// Delete product

// Posts loading
export const setGameLoading = () => {
    return {
        type: GAME_LOADING
    }
}

// Remove all posts
export const clearGame = () => dispatch => {
    dispatch({
        type: CLEAR_GAME
    });

}