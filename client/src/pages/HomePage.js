import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

// Actions
import { login, register } from '../actions/authActions';

// Initial State
const initialState = {
    username: '',
    password: ''
}

const HomePage = ({
    auth: { 
        isAuthenticated, 
        user 
    }, 
    login,
    register
}) => {
    const [formData, setFormData] = useState(initialState);

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onLogin = async e => {
        e.preventDefault();
        login(username, password);
    }

    const onRegister = async e => {
        e.preventDefault();
        register(username, password);
    }

    // Redirect if logged in
    if(user) {
        window.location.href = "/languages";
    }

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
        <div className="container">
            <div className="img_container">
          
            </div>
            <div className="info_container">
                <h1>Learn Spanish in just 5 minutes a day. For free.</h1>
                <div className="btn_group" id="signDiv"> 
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        className='login input'
                        value={username}
                        onChange={e => onChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        className='login input'
                        value={password}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="btn_group">
                    <button className="btn primary" onClick={onRegister}>Sign Up</button>
                    <button className="btn secondary" onClick={onLogin}>Login</button>
                </div>
            </div>
        </div>
    </main>
  )
}

HomePage.propTypes = {
    auth: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { login, register })(HomePage);