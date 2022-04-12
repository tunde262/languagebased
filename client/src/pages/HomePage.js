import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const HomePage = props => {
    const findMatch = (e) => {
        e.preventDefault();
        window.location.href = "/languages";
    }


  return (
    <main style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div>
            <h1>LanguageBased</h1>
            <form>
                <input type="text" placeholder="Enter Screen Name" />
                <Link to="/languages"><button >Find A Match</button></Link>
            </form>
        </div>
    </main>
  )
}

HomePage.propTypes = {}

export default HomePage