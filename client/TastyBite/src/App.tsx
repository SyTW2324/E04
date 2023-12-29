import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { LoginForm } from './components/Sign/LoginForm';
import { RegisterForm } from './components/Sign/RegisterForm';
import { UploadRecipeForm } from './components/Recipes/UploadRecipeForm';
import { ListRecipes } from './components/Recipes/ListRecipes';
import { UserInfo } from './components/Users/UserInfo';
import Home from './components/Home';
import { ListCategory } from './components/Categories/ListCategory';
import { ListIngredients } from './components/Ingredients/ListIngredients';
import { Recipe } from './components/Recipes/Recipe';
import { useUserStore } from './state/store';
import { AboutPage } from './components/About/About';


import {
  createBrowserRouter,
  RouterProvider,
  Link
} from "react-router-dom";
import { RecipesByCategory } from './components/Recipes/RecipesByCategory';




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
      <Link to="/about">
        <button>Ir a about</button>
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
      <Link to="/about">
        <button>Ir a about</button>
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
      <Link to="/about">
        <button>Ir a about</button>
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
      <Link to="/about">
        <button>Ir a about</button>
      </Link>
    </div>
  )
}

const Recipes = () => {
  return (
    <div>
      <ListRecipes />
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
      <Link to="/profile">
        <button>Ir al perfil</button>
      </Link>
      <Link to="/about">
        <button>Ir a about</button>
      </Link>
    </div>
  )
}


const About = () => {
  return (
    <div>
      <ListRecipes />
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
      <Link to="/profile">
        <button>Ir al perfil</button>
      </Link>
      <Link to="/recipes">
        <button>Ir a recetas</button>
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
      element: <Recipes />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/categories",
      element: <ListCategory />,
    },
    {
      path: "/ingredients",
      element: <ListIngredients />,
    },
    {
      path: "/recipes/:recipe_id",
      element: <Recipe />,
    },
    {
      path: "/categories/:category",
      element: <RecipesByCategory />,
    },
    {
      path: "/about",
      element: <AboutPage />,
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
