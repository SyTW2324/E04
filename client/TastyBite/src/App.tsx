import './App.css'
import React from 'react';

import { Header } from './components/Header'
import { Home } from './components/Home';
import { Login } from './components/Sign/Login'
import { ListCategory } from './components/Categories/ListCategory';
import { ListIngredients } from './components/Ingredients/ListIngredients';
import { Recipe } from './components/Recipes/Recipe';
import { useUserStore } from './state/store';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecipesByCategory } from './components/Recipes/RecipesByCategory';
import { Profile } from './components/Users/Profile';
import { Recipes } from './components/Recipes/Recipes';
import { UploadRecipe } from './components/Recipes/UploadRecipe';
import { Register } from './components/Sign/Register';


function App() {
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
      path: "/categories/:category_id",
      element: <RecipesByCategory />,
    },
    {
      path: "*",
      element: <h1>404</h1>,
    }

  ]);
  


  return (
    <>
      <RouterProvider router={router} />
    </>
    
  )
}

export default App

