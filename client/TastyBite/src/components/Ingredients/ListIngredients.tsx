import React from "react";
import { useIngredients } from "../../hooks/useIngredients";



export function ListIngredients()  {
  const { ingredients, isLoading } = useIngredients();

  
  return (
    <div>
      <h1>Ingredients</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {ingredients.map((ingredient) => (
            <li key={ingredient._id}>
              {ingredient.ingredient} - {ingredient.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}