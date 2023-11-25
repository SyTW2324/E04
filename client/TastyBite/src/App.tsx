import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { UploadRecipeForm } from './components/UploadRecipeForm';

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
    </div>
  )
}

const Login = () => {
  return (
    <div>
      <LoginForm />
      <Link to="/">
        <button>Ir a Home</button>
      </Link>
      <Link to="/register">
        <button>Ir a Register</button>
      </Link>
      <Link to="/upload-recipe">
        <button>Ir a subir receta</button>
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
    </div>
  )
}


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
]);



function App() {
  const [user, setUser] = useState({})


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
