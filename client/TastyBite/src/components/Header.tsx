import './Header.css'

export function Header() {
  return (
    <>
      <header className="header">
        <div className="left-container">
          <img src='../icons/lines.svg'/>
          <img src='../images/LOGO.png'/>

        </div>
        <div className="center-container">
          <input type="text" placeholder="Search" />
          <img src='../icons/search.svg'/>
          
        </div>
        <div className="right-container"> 
          <ul className="menu">
            <li>Login</li>
            <li>Register</li>
            <li>
              <img src='../icons/cart.svg'/>
              <span>name</span>
            </li>
          </ul>

        </div>
      </header>
    </>
  );
} 