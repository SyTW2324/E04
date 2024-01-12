import './Footer.css'
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <h2>Contacto</h2>
        <div className="footer-title">
          <div className="footer-links">
            <Link to="/about">Preguntas frecuentes</Link>
          </div>
  
          <div className="footer-links">
            <Link to="/about">Sobre nosotros</Link>
          </div>

          <div className="footer-links">
            <Link to="/about">Privacidad</Link>
          </div>

          <div className="footer-links">
            <Link to="/about">Términos y condiciones</Link>
          </div>
        </div>
      </div>
    </>
  );
}
