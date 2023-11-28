import React from "react";
import { Link } from "react-router-dom";

const Home = (): JSX.Element => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/login">
        <button>Ir a Login</button>
      </Link>
      <Link to="/register">
        <button>Ir a Register</button>
      </Link>
      <Link to="/upload-recipe">
        <button>Ir a subir receta</button>
      </Link>
      <Link to="/profile">
        <button>Ir al perfil</button>
      </Link>
    </div>
  )
}


export default Home;