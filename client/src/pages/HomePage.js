import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';

const HomePage = props => {
    const findMatch = (e) => {
        e.preventDefault();
        window.location.href = "/languages";
    }

    const navigate = useNavigate();

    const routeChange = () =>{ 
        navigate('/languages');
    }


  return (
    <main>
        <div class="container">
            <div class="img_container">
                img
            </div>
            <div class="info_container">
                <h1>Learn Spanish in just 5 minutes a day. For free.</h1>
                <div class="btn_group">
                    <button class="btn primary" onClick={routeChange}>Start a game</button>
                    <button class="btn secondary">Quick Review Quiz</button>
                </div>
            </div>
        </div>
    </main>
  )
}

HomePage.propTypes = {}

export default HomePage