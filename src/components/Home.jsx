import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Truck } from 'lucide-react';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="logo-container">
          <div className="logo-text">GLOBALKOM</div>
        </div>
        <h1 className="main-title">Raven Receipt</h1>
        {/* <p className="subtitle">Sistem za generisanje reversa za opremu</p> */}
        {/* <div className="version-badge">v2.0</div> */}
      </div>
      
      <div className="buttons-container">
        <button 
          className="action-button pickup-button"
          onClick={() => navigate('/pickup')}
        >
          <HomeIcon size={24} />
          <span>Office PU</span>
          <p className="button-description">Equipment pickup from office</p>
        </button>
        
        <button 
          className="action-button delivery-button"
          onClick={() => navigate('/delivery')}
        >
          <Truck size={24} />
          <span>Work from Home</span>
          <p className="button-description">Equipment shipped to home</p>
        </button>
      </div>
      
      <footer className="home-footer">
        <p> Aug, 2025 | Globalkom/LimoLabs</p>
      </footer>
    </div>
  );
}

export default Home;