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
      <UserInfo user={user} />
    </div>
    </>
  )
}