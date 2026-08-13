import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import MavioVC from './components/MavioVC';
import { profiles } from './data/profiles';
import './index.css';

function App() {
  return (
    <Router basename="/vc">
      <Routes>
        <Route path="/" element={<MavioVC profile={{...profiles.mahendra, id: 'mahendra'}} />} />
        <Route path="/:profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
