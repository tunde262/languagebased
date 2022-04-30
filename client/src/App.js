import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

// Routing
import PrivateRoute from './routes/PrivateRoute';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// Authentication
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/authActions';

// Pages
import HomePage from './pages/HomePage';
import LanguagesPages from './pages/LanguagesPages';
import SearchingPage from './pages/SearchingPage';
import MatchPage from './pages/MatchPage';
import GamePage from './pages/GamePage';
import ReviewPage from './pages/ReviewPage';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());

  }, []);

  return (
    <Provider store={store}>
      <Router>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route
              path="/languages"
              element={
                <PrivateRoute>
                  <LanguagesPages />
                </PrivateRoute>
              }
            />
            <Route exact path="/searching" element={<SearchingPage />} />
            <Route exact path="/review" element={<ReviewPage />} />
            <Route 
              exact 
              path="/match/:id" 
              element={
                <PrivateRoute>
                  <MatchPage />
                </PrivateRoute>
              } 
            />
            <Route 
              exact 
              path="/game/:id" 
              element={
                <PrivateRoute>
                  <GamePage />
                </PrivateRoute>
              } 
            />
          </Routes>
      </Router>
    </Provider>
  );
}

export default App;
