import { FC, useEffect, useState } from 'react';
import './Header.css'
import { useUserStore } from '../state/store'
import React from 'react';
import Sidebar from './Sidebar/Sidebar';


const fetchImageUrl = async (image_id: string): Promise<string> => {
  console.log('fetching image url')
  console.log(image_id)
  const response = await fetch(`https://teal-monkey-hem.cyclic.app/api/images?image_id=${image_id}`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

export const Header = () => {
  const user = useUserStore((state: any) => state.user )
  const [profilePicture, setProfilePicture] = useState<string | undefined>()
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  
  // useEffect(() => {
  //   // get para conseguir la profilePicture
  //   if(user) {
  //     fetchImageUrl(user.profile_picture).then((url) => {
  //       setProfilePicture(url)
  //       console.log(url)
  //     })
  //   }
  // }, [user])

  return (
    <>
      <header className="header">
        <div className="left-container">
          <img className='lines' src='../lines.svg' onClick={toggleSidebar} />

          <a href="/" ><img className='logo'   src='../Logo.png'/></a>
          {/* <a href="/" onClick={() => navigate('/')}>Tasty Bite</a> */}
        </div>
        <div className="center-container">
          <input className="input-search" type="text" placeholder="Search" />
          <img className="btn-search" src='../search.svg'/>
        </div>
        <Sidebar isVisible={sidebarVisible} onClose={toggleSidebar} />
        <div className="right-container"> 
          <ul className="menu">
            {/* si esta logueado */}
            { 
              user ? 
              <>
                <li className="menu-profile">
                  {/* <img src={profilePicture} /> */}
                  <span>{user.username}</span> {/* Asegúrate de que tu objeto de usuario tenga una propiedad 'name' */}
                </li>
              </>
              :
              <>
                <li><a href="/login">Iniciar Sesión</a></li>
                <li><a href="/register">Registarse</a></li>
                <li className="menu-profile">
                  {/* <img src={profilePicture} /> */}
                </li>
              </>
            }
          </ul>
        </div>
      </header>
    </>
  );
} 