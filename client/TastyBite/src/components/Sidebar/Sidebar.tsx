import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { logout } from '../../utils/logout';


function Sidebar ({ isVisible, onClose }) {

  return (
    <div className={`sidebar ${isVisible ? 'visible' : ''}`}>
      <div className="logo-container">
        <img className='logo' src='../Logo.png'/>
        <button className="close-button" onClick={onClose}>
          <img className='close' src='../close.svg'/>
        </button>
      </div>
      <div className="sidebar-container">
        <div className="sidebar-up-container">
          <Link className="sidebar-button" to="/">Home</Link>
          <Link className="sidebar-button" to="/login">Log In</Link>
          <Link className="sidebar-button" to="/register">Sign In</Link>
          <Link className="sidebar-button" to="/upload-recipe">Subir receta</Link>
          <Link className="sidebar-button" to="/recipes">Recetas</Link>
          <Link className="sidebar-button" to="/categories">Categorías</Link>
          <Link className="sidebar-button" to="/ingredients">Ingredientes</Link>
          <Link className="sidebar-button" to="/about">Sobre nosotros</Link>
        </div>
        <hr className="separator"></hr>
        <div className="sidebar-down-container">
          <Link className="sidebar-button" to="/profile">Mi perfil</Link>
          <button onClick={logout} className="logout-button">Cerrar sesión</button>
        </div>
      </div>
      
    </div>
  );
};

export default Sidebar;
