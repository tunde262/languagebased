import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../common/Spinner';

const PrivateRoute = ({ 
    auth: { isAuthenticated, loading }, 
    children 
}) => {
    return (
            loading ? (
            <Spinner />
        ) :
        (isAuthenticated && !loading) ? children : <Navigate to="/" />
    )
};


PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
