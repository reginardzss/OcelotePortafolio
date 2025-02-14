"use client";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
//import Home from './pages/Home';
//import About from './pages/About';
//import Projects from './pages/Projects';
//import Contact from './pages/Contact';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;