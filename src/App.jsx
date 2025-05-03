import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Simulate from './components/Simulate';
import MoreInfo from './components/MoreInfo';  // Import MoreInfo

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/simulate/:algo" element={<Simulate />} />
        <Route path="/moreinfo/:algoType" element={<MoreInfo />} /> 
      </Routes>
    </Router>
  );
}

export default App;
