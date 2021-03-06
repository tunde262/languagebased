import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

// Actions
import { getGameById, readyPlayer1, readyPlayer2 } from '../actions/gameActions';

import Spinner from '../common/Spinner';

const MatchPage = ({ game: { game, loading }, getGameById, readyPlayer1, readyPlayer2 }) => {

  const [ready_one, setReady_one] = useState(false);
  const [ready_two, setReady_two] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    getGameById(id);

  }, [ id ]);

  useEffect(() => {
    // Load Game data
    if (game && !loading) {
      if(game.ready_1) {
        setReady_one(true);
      }
      if(game.ready_2) {
        setReady_two(true);
      }

      if(game.ready_1 && game.ready_2) {
        window.location.href = `/game/${game._id}`;
      }
    }

  }, [ game ]);

  const readyPlayerOne = async e => {
    e.preventDefault();

    readyPlayer1(game._id)
  }

  const readyPlayerTwo = async e => {
    e.preventDefault();

    readyPlayer2(game._id)
  }

  let gameScreen;

  if(game === null || loading) {
      gameScreen = <Spinner />;
  }
  else {
      if(game.user_2 === null) {
        return (
            <div style={{width:'100%', display: 'flex', flexDirection:'column', alignItems: 'center', paddingTop:'50px'}}>
              <h1>Finding your opponent...</h1>
              <div>
                <Spinner />
              </div>
            </div>
        )
      } else {
        return (
          <div className="gamePage">
            <div>progress bar</div>
            <div className="game_main">
                <div className="match_container">
                    <h1>Match!</h1>
                    <div className="match_player_container">
                        <div className="match_player">
                            <span>
                              Player #1 
                              <span style={{fontSize: '1rem', color: 'red', marginLeft:'5px'}}>
                                - {game.user_1.username}
                              </span>
                            </span>
                            {ready_one ? <button className='btn primary' style={{maxWidth:'50px'}}>Ready</button> : <button className='btn secondary' style={{maxWidth:'50px', margin: '5px 0'}} onClick={(e) => readyPlayerOne(e)}>Ready Up</button>}
                            
                        </div>
                        <div className="match_player">
                            <span>
                              Player #2 
                              <span style={{fontSize: '1rem', color: 'red', marginLeft:'5px'}}>
                                - {game.user_2.username}
                              </span>
                            </span>
                            {ready_two ? <button className='btn primary' style={{maxWidth:'50px'}}>Ready</button> : <button className='btn secondary' style={{maxWidth:'50px', margin: '5px 0'}} onClick={(e) => readyPlayerTwo(e)}>Ready Up</button>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="gameFooter_container">
                <div>
                    <button className="btn">Skip</button>
                </div>
                <div>
                    <button className="btn">Check</button>
                </div>
            </div>
          </div>
        )
      }
  }


  return (
    <>
      {gameScreen}
    </>
  )
}

MatchPage.propTypes = {
  game: PropTypes.object.isRequired,
  getGameById: PropTypes.func.isRequired,
  readyPlayer1: PropTypes.func.isRequired,
  readyPlayer2: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  game: state.game
});

export default connect(mapStateToProps, { getGameById, readyPlayer1, readyPlayer2 })(MatchPage);