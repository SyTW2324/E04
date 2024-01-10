import React from "react";
import { useIngredients } from "../../hooks/useIngredients";
import { Header } from "../Header";
import "./ListIngredients.css";
import { Link } from "react-router-dom";
import { getEmoji } from "../Recipes/Recipe";

export function ListIngredients()  {
  const { ingredients, isLoading } = useIngredients();

  return (
    <>
    <Header/>
    <div>
      <div className="breadcrumb">
        <Link to="/">Tasty Bite</Link> &gt;
        <span>Ingredientes</span>
      </div>
      <div className="ingredients-title-container">
        <h1 className="ingredients-title" >Ingredientes</h1>
      </div>
      <div className="ingredients-text-container">
        {isLoading ? (
          <p>Loading...</p>
          ) : (
            <ul>
            {ingredients.map((ingredient) => (
              <li key={ingredient._id}>
                {getEmoji(ingredient.ingredient)}
                {ingredient.ingredient} - {ingredient.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </>
  )
}