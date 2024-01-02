import { FC, useEffect, useState } from 'react';
import './Header.css'
import { useUserStore } from '../state/store'
import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import { Link } from 'react-router-dom';


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
          <Link to="/"><img className='logo'   src='../Logo.png'/></Link>
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
              user.username !== undefined ?
              <>
                <li><Link to="/profile">{user.username}</Link></li>
                <li><Link to="/">Cerrar sesión</Link></li>
              </>
              :
              <>
                <li><Link to="/login">Iniciar Sesión</Link></li>
                <li><Link to="/register">Registarse</Link></li>
              </>
            }
          </ul>
        </div>
      </header>
    </>
  );
} 