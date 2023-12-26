import "./RecipesByCategory.css";
import React, { useEffect, useState } from "react";
import { useRecipesByCategory } from "../../hooks/useRecipesByCategory";
import { RecipeTarget } from "./RecipeTarget";
import { useParams } from 'react-router-dom';
import { useRecipe } from "../../hooks/useRecipe";
import { useCategory } from "../../hooks/useCategory";


export function RecipesByCategory() {
  const { category_id } = useParams();
  const category = useCategory({ category_id });
  const recipes = useRecipe({ category_id });


  if (!recipes) {
    console.log('no hay recetas');
    console.log(recipes);
    console.log(category);
    return <div className="loader">Loading...</div>;
  }

  return (
    <div>
      { (recipes && category) &&
        <>
        <h1 className="title-recipes">Recetas {category.category} </h1>
          <p className="teaser-recipes" >Disfruta de mas de {recipes.length} {category.description} </p>
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