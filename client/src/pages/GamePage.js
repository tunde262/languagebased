import React from 'react'
import PropTypes from 'prop-types'

const GamePage = props => {
  return (
    <div class="gamePage">
        <div>progress bar</div>
        <div class="game_main">
            <div class="game_container">
                <h1>Which one of these is “the man”?</h1>
                <div class="card_container">
                    <div class="card">
                        <div class="card_img_container">
                            <div class="card_img">
                                <img src="https://d2pur3iezf4d1j.cloudfront.net/images/b40a713e2c973cb54c3c5bb67ef19af4" />
                            </div>
                        </div>
                        <div class="card_text">
                            <span>el hombre</span>
                            <span>1</span>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card_img_container">
                            <div class="card_img">
                                <img src="https://d2pur3iezf4d1j.cloudfront.net/images/b40a713e2c973cb54c3c5bb67ef19af4" />
                            </div>
                        </div>
                        <div class="card_text">
                            <span>el hombre</span>
                            <span>1</span>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card_img_container">
                            <div class="card_img">
                                <img src="https://d2pur3iezf4d1j.cloudfront.net/images/b40a713e2c973cb54c3c5bb67ef19af4" />
                            </div>
                        </div>
                        <div class="card_text">
                            <span>el hombre</span>
                            <span>1</span>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="gameFooter_container">
            <div>
                <button class="btn">Skip</button>
            </div>
            <div>
                <button class="btn">Check</button>
            </div>
        </div>
    </div>
    
  )
}

GamePage.propTypes = {}

export default GamePage