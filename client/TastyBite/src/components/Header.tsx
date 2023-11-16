import './Header.css'

export function Header() {
  return (
    <>
      <header className="header">
        <div className="left-container">
          <img className='lines' src='../icons/lines.svg'/>
          <img className='logo' src='../images/Logo.png'/>

        </div>
        <div className="center-container">
          <input className="input-search" type="text" placeholder="Search" />
          <img className="btn-search" src='../icons/search.svg'/>
          
        </div>
        <div className="right-container"> 
          <ul className="menu">
            {/* si esta logueado */}
            { true ? 
              <>
                <li>Iniciar Sesión</li>
                <li>Registarse</li>
                <li className="menu-profile">
                  <img src='../icons/profile.svg'/>
                </li>
              </>
              :
              <>
                <li className="menu-profile">
                  <img src='../icons/profile.svg'/>
                  <span>Nombre</span>
                </li>
              </>
            }
            
          </ul>

        </div>
      </header>
    </>
  );
} 