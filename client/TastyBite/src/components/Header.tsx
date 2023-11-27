import './Header.css'
import { useUserStore } from '../state/store'
import { useEffect, useState } from 'react';


const fetchImageUrl = async (image_id) => {
  console.log('fetching image url')
  console.log(image_id)
  const response = await fetch(`http://localhost:3000/images?image_id=${image_id}`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

export function Header() {

  const user = useUserStore((state) => state.user)
  const [profilePicture, setProfilePicture] = useState()

  useEffect(() => {
    // get para conseguir la profilePicture
    if(user) {
      fetchImageUrl(user.profile_picture).then((url) => {
        setProfilePicture(url)
        console.log(url)
      })
    }

  }, [user])


  return (
    <>
      <header className="header">
        <div className="left-container">
          <img className='lines' src='../icons/lines.svg'/>
          
          <a href="/" ><img className='logo'   src='../images/Logo.png'/></a>


        </div>
        <div className="center-container">
          <input className="input-search" type="text" placeholder="Search" />
          <img className="btn-search" src='../icons/search.svg'/>
          
        </div>
        <div className="right-container"> 
          <ul className="menu">
            {/* si esta logueado */}
            { 
              user ? 
              <>
                <li className="menu-profile">
                  <img src={profilePicture} />
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