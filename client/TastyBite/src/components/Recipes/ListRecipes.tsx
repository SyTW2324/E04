import './ListRecipes.css';

import React, { useEffect, useState } from 'react';
import { Recipe } from '../../../types/Recipe';
import { getRecipes } from '../../services/getRecipes';
import { RecipeTarget } from './RecipeTarget';
import { useRecipe } from '../../hooks/useRecipe';
import { Link } from 'react-router-dom';


export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await getRecipes();
      // cambiamos la images por la url de la imagen
      const updatedRecipes = data.map((recipe: any) => {
        return {
          ...recipe,
          images: recipe.images.map((image: any) => {
            const buffer = new Uint8Array(image.image.data.data);
            const blob = new Blob([buffer], { type: image.image.contentType });
            return URL.createObjectURL(blob);
          }),
        };
      });
      setRecipes(updatedRecipes);
      console.log('useRecipes');
      console.log(updatedRecipes);
    };

    fetchRecipes();
  }, []);

  return recipes;
}



export function ListRecipes() {
  const recipes = useRecipe({});
  console.log('ListRecipes');
  console.log(recipes);

  return (
      <div>
        <div className="breadcrumb">
          <Link to="/">Tasty Bite</Link> &gt;
          <span>Recetas</span>
        </div>
        <div className="login-title-container">
          <h1 className="login-title" >Recetas</h1>
        </div>
        {recipes && 
          <>
            <p className="teaser-recipes" >Con más de {recipes.length} recetas para elegir, encontrar la comida ideal nunca fue tan fácil. ¿Cuál te provoca hoy?"</p>
            <div className="recipes-container">
              {recipes.map((recipe) => (
                <RecipeTarget recipe={recipe} key={recipe.recipe_id} />
                ))}
            </div> 
          </>
        }
      </div>
  );
}