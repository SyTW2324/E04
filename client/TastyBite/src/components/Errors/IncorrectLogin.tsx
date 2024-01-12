
import { Link } from 'react-router-dom';
import './IncorrectLogin.css'
import React from 'react';



export const IncorrectLogin = () => {
  return (
    <>
      <div className="profile-text">
        <p>
          Ups parece que no has iniciado sesión, por favor inicia sesión o registrate para poder ver tu perfil.
        </p>
        <div className="profile-buttons">
          <Link className="profile-button" to="/login">Log In</Link>
          <Link className="profile-button" to="/register">Sign In</Link>
        </div>
        <img className="profile-image" src="./CocodriloAsustado.png" alt="imagen de perfil" />
      </div>
    </>
  );
}
