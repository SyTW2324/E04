import './Footer.css'
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <>
      <footer className="footer-container">
        <h1>Contacto</h1>
        <div className="footer-title">
          <div className="footer-links">
            <Link className="footer-button" to="/about">Preguntas frecuentes</Link>
          </div>
  
          <div className="footer-links">
            <Link className="footer-button" to="/about">Sobre nosotros</Link>
          </div>

          <div className="footer-links">
            <Link className="footer-button" to="/about">Privacidad</Link>
          </div>

          <div className="footer-links">
            <Link className="footer-button" to="/about">Términos y condiciones</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img className='logo' src='./arrow.svg'/>
          </button>            
        </div>
      </footer>

    </>
  );
}
