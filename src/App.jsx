import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Features from './components/Features';
import ScannerAction from './components/ScannerAction';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import './index.css';

function MainLayout() {
  return (
    <>
      <Hero />
      <Features />
      <ScannerAction />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router basename="/vc">
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/:profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
