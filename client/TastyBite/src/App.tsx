import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { UploadRecipeForm } from './components/UploadRecipeForm';
import { ListRecipes } from './components/ListRecipes';
import { UserInfo } from './components/UserInfo';

import { useUserStore } from './state/store';


// sum.js
export function sum(a, b) {
  return a + b
}

import {
  createBrowserRouter,
  RouterProvider,
  Link
} from "react-router-dom";


const Home = () => {
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

const Login = () => {
  const setUser = useUserStore((state) => state.setUser);

  return (
    <div>
      <LoginForm setUser={setUser} />
      <Link to="/">
        <button>Ir a Home</button>
      </Link>
      <Link to="/register">
        <button>Ir a Register</button>
      </Link>
      <Link to="/upload-recipe">
        <button>Ir a subir receta</button>
      </Link>
      <Link to="/recipes">
        <button>Ir a Recetas</button>
      </Link>
      <Link to="/profile">
        <button>Ir al perfil</button>
      </Link>
    </div>
  )
}


const Register = () => {
  return (
    <div>
      <RegisterForm />
      <Link to="/">
        <button>Ir a Home</button>
      </Link>
      <Link to="/login">
        <button>Ir a login</button>
      </Link>
      <Link to="/upload-recipe">
        <button>Ir a subir receta</button>
      </Link>
      <Link to="/recipes">
        <button>Ir a Recetas</button>
      </Link>
      <Link to="/profile">
        <button>Ir al perfil</button>
      </Link>
    </div>
  )
}


const UploadRecipe = () => {
  return (
    <div>
      <UploadRecipeForm />
      <Link to="/">
        <button>Ir a Home</button>
      </Link>
      <Link to="/login">
        <button>Ir a login</button>
      </Link>
      <Link to="/register">
        <button>Ir a Register</button>
      </Link>
      <Link to="/recipes">
        <button>Ir a Recetas</button>
      </Link>
      <Link to="/profile">
        <button>Ir al perfil</button>
      </Link>
    </div>
  )
}


const Profile = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div>
      <h1>Profile</h1>
      <UserInfo user={user} />
      <Link to="/">
        <button>Ir a Home</button>
      </Link>
      <Link to="/login">
        <button>Ir a login</button>
      </Link>
      <Link to="/register">
        <button>Ir a Register</button>
      </Link>
      <Link to="/upload-recipe">
        <button>Ir a subir receta</button>
      </Link>
      <Link to="/recipes">
        <button>Ir a Recetas</button>
      </Link>
    </div>
  )
}





function App() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/upload-recipe",
      element: <UploadRecipe />,
    },
    {
      path: "/recipes",
      element: <ListRecipes />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "*",
      element: <h1>404</h1>,
    }
    
  ]);
  


  return (
    <>
      <Header />
      <RouterProvider router={router} />

    </>
  )
}

export default App



// function App() {
//   const [main, setMain] = useState(true)
//   const [user, setUser] = useState({})


//   return (
//     <>
//       <Header />
//       { main ? <LoginForm setUser={setUser} /> : <UserInfo user={user} />}
//       <RegisterForm/>

//       {/* { main ? <LoginForm /> : <UserInfo/>} */}
//       <button onClick={() => setMain(!main)}>Register</button>
//     </>
//   )
// }

// export default App
