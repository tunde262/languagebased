import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import axios from 'axios';

// images
import spanishFlag from '../imgs/SPANISH-FLAG.png';
import frenchFlag from '../imgs/french-flag.png'
import chineseFlag from '../imgs/chinese-flag.png'

// Redux
import { connect } from 'react-redux';

// Actions
import { addGame, joinGame } from '../actions/gameActions';

const LanguagesPages = ({ addGame, joinGame }) => {

    const findMatch = async (e, isSpanish) => {
        e.preventDefault();

        let spanishGames = [];
        let frenchGames = [];

        const openGames = await axios.get(`/api/games/matching`);
        console.log('OPEN GAMES');
        console.log(openGames.data);

        if(openGames.data.length > 0) {
            // Filter all spanish games
            for (let i = 0; i < openGames.data.length; i++) {
                if (openGames.data[i].language === "spanish") {
                    spanishGames.push(openGames.data[i]);
                }
            }

            // Filter all french games
            for (let i = 0; i < openGames.data.length; i++) {
                if (openGames.data[i].language === "french") {
                    frenchGames.push(openGames.data[i]);
                }
            }
        }

        console.log('SPANISH GAMES');
        console.log(spanishGames);

        console.log('FRENCH GAMES');
        console.log(frenchGames);

        if(isSpanish) {

            if(spanishGames.length > 0) {
                console.log('JOIN SPANISH GAME');
                joinGame(spanishGames[0]._id);
            } else {
                addGame('spanish');
            }
            
        } else {
            if(frenchGames.length > 0) {
                console.log('JOIN FRENCH GAME');
                joinGame(frenchGames[0]._id);
            } else {
                addGame('french');
            }
        }
    }

  return (
    <div style={{display: 'flex', justifyContent:'center',}}>
        <div style={{width: '100%', marginTop:'50px', padding:'50px', display: 'flex', alignItems:'center', flexDirection:'column'}}>
            <h1>Choose a language</h1>
            <ul style={{display: 'flex', justifyContent:'center'}}>
                <div style={{border:'2px solid #e5e5e5', display:'flex', flexDirection:'column', alignItems:'center', borderRadius:'12px', padding:'20px', margin:'10px'}}>
                    <div style={{height:'50px'}}>
                        <img style={{height:'70px'}} src={spanishFlag} alt="Spanish Flag" />
                    </div>
                    <h2 style={{margin:'5px 0'}}>Spanish</h2>
                    <button className='btn primary' onClick={e => findMatch(e, true)}>Find Match</button>
                </div>
            </ul>
        </div>
    </div>
  )
}

LanguagesPages.propTypes = {
    addGame: PropTypes.func.isRequired,
    joinGame: PropTypes.func.isRequired
}

export default connect(null, { addGame, joinGame })(LanguagesPages);