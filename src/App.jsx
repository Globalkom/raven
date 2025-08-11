import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import Delivery from './components/Delivery.jsx';
import Pickup from './components/Pickup.jsx';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/pickup" element={<Pickup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;