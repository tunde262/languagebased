import './App.css';
import { BrowserRouter as Router, Route, Routes, Redirect, Link } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import LanguagesPages from './pages/LanguagesPages';
import SearchingPage from './pages/SearchingPage';
import MatchPage from './pages/MatchPage';
import GamePage from './pages/GamePage';
import ReviewPage from './pages/ReviewPage';

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/languages" element={<LanguagesPages />} />
          <Route exact path="/searching" element={<SearchingPage />} />
          <Route exact path="/match" element={<MatchPage />} />
          <Route exact path="/game" element={<GamePage />} />
          <Route exact path="/review" element={<ReviewPage />} />
        </Routes>
    </Router>
  );
}

export default App;
