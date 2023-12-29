import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isVisible, onClose }) => {
  return (
    <div className={`sidebar ${isVisible ? 'visible' : ''}`}>
      <div className="logo-container">
        <img className='logo' src='../Logo.png'/>
        <button className="close-button" onClick={onClose}>
          <img className='close' src='../close.svg'/>
        </button>
      </div>
      <div className="sidebar-container">
        <div className="sidebar-button">
          <button >Log In</button>
        </div>
        <div className="sidebar-button">
          <button >Sign In</button>
        </div>
      </div>
      
    </div>
  );
};

export default Sidebar;
