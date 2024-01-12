import './PageNotFound.css'
import React from 'react';
import { Header } from '../Header'
import { Link } from 'react-router-dom';


export const PageNotFound = () => {
  return (
    <>
      <Header/>
      <div className="pagenotfound-title-container">
        <h1 className="pagenotfound-title" >404 Página no encontrada</h1>
      </div>
      <div className="pagenotfound-text">
        <p>
          Ups parece que la página a la que estás queriendo acceder no existe.
        </p>
        <div className="pagenotfound-buttons">
          <Link className="pagenotfound-button" to="/">Home</Link>
          <Link className="pagenotfound-button" to="/profile">Mi perfil</Link>
        </div>
        <img className="pagenotfound-image" src="./CocodriloMiedo.png" alt="imagen de perfil" />
      </div>
    </>
  );
}