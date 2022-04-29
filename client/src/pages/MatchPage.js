import React from 'react'
import PropTypes from 'prop-types'

const MatchPage = props => {
  return (
    <div class="gamePage">
        <div>progress bar</div>
        <div class="game_main">
            <div class="match_container">
                <h1>Match!</h1>
                <div class="match_player_container">
                    <div class="match_player">
                        <span>User #1</span>
                        <button>Ready Up</button>
                    </div>
                    <div class="match_player">
                        <span>User #2</span>
                        <button>Ready Up</button>
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

MatchPage.propTypes = {}

export default MatchPage