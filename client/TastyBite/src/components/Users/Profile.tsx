import React from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../../state/store';
import { UserInfo } from './UserInfo';
import { Header } from "../Header";
import "./Profile.css";

export function Profile() {
  const user = useUserStore((state: any) => state.user);

  

  return (
    <>
    <Header />
    <div>
      <div className="breadcrumb">
        <Link to="/">Tasty Bite</Link> &gt;
        <span>Mi perfil</span>
      </div>
      <div className="profile-title-container">
        <h1 className="profile-title" >Mi perfil</h1>
      </div>
      {(user.token !== undefined) ?
        <UserInfo user={user} />
      :
        <div className="profile-text">
          <p>
            Ups parace que no has iniciado sesión, por favor inicia sesión o registrate para poder ver tu perfil.
          </p>
          <div className="profile-buttons">
            <Link className="profile-button" to="/login">Log In</Link>
            <Link className="profile-button" to="/register">Sign In</Link>
          </div>
          <img className="profile-image" src="./CocodriloAsustado.png" alt="imagen de perfil" />
        </div>
      }
    </div>
    </>
  )
}