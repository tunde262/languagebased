import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

// Actions
import { updateScore, getGameById } from '../actions/gameActions';

import Spinner from '../common/Spinner';

const GamePage = ({ updateScore, getGameById, game: { game, loading } }) => {
  const questions = [
		{
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'London', isCorrect: false },
				{ answerText: 'Paris', isCorrect: true },
				{ answerText: 'Dublin', isCorrect: false },
			],
		},
		{
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

  if(game) {
    if(!game.user_2) {
      window.location.href = `/match/${game._id}`;
    }
  }

  const { id } = useParams();

  useEffect(() => {
    getGameById(id);

  }, [ id ]);

  useEffect(() => {
    if (game && !loading) {
      if(game.score_1_done && game.score_2_done) {
        setShowScore(true);
      }
    }

  }, [ game ]);

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
      
			setShowScore(true);
      
      updateScore(game._id, score)
		}
	};
  
  return (
    <div class="gamePage">
        <div></div>
        <div class="game_main">
          <div className="game_board">
            {showScore ? (
                <div className="match_container">
                  {(game.score_1_done && game.score_2_done) ? (
                    <>
                      <h1>Review!</h1>
                      <div className="match_player_container">
                        <div className="match_player">
                            <span>
                              Player #1 
                              <span style={{fontSize: '1rem', color: '#042c60', marginLeft:'5px'}}>
                                - {game.user_1.username}
                              </span>
                            </span>
                            <div>Score: {game.score_2}/{questions.length}</div>
                            
                        </div>
                        <div className="match_player">
                            <span>
                              Player #2 
                              <span style={{fontSize: '1rem', color: '#042c60', marginLeft:'5px'}}>
                                - {game.user_2.username}
                              </span>
                            </span>
                            <div>Score: {game.score_1}/{questions.length}</div>
                        </div>
                      </div>
                      <button onClick={() => {window.location.href = `/languages`}} className='btn secondary review'>New Game</button>
                    </>
                  ) : (
                    <div style={{width:'100%', display: 'flex', flexDirection:'column', alignItems: 'center', paddingTop:'50px'}}>
                      <h1>Waiting for your opponent...</h1>
                      <div>
                        <Spinner />
                      </div>
                    </div>
                  )}
                  
              </div>
              // <div className='score-section'>
              //   You scored {score} out of {questions.length}
              // </div>
            ) : (
              <>
                <div className='question-section'>
                  <div className='question-count'>
                    <span>Question {currentQuestion + 1}</span>/{questions.length}
                  </div>
                  <div className='question-text'>{questions[currentQuestion].questionText}</div>
                </div>
                <div className='answer-section'>
                  {questions[currentQuestion].answerOptions.map((answerOption) => (
                    <button className='btn primary' style={{margin: '5px auto'}} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                  ))}
                </div>
              </>
            )}
          </div>
  
        </div>
        {!showScore && (
          <div class="gameFooter_container">
            <div>
                <button class="btn">Skip</button>
            </div>
            <div>
                <button class="btn">Check</button>
            </div>
        </div>)}
      
    </div>
    
  )
}

GamePage.propTypes = {
  game: PropTypes.object.isRequired,
  updateScore: PropTypes.func.isRequired,
  getGameById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  game: state.game
});

export default connect(mapStateToProps, { updateScore, getGameById })(GamePage);