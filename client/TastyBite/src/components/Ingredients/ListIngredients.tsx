import React, { useState } from "react";
import { useIngredients } from "../../hooks/useIngredients";
import { Header } from "../Header";
import "./ListIngredients.css";
import { Link } from "react-router-dom";
import { getEmoji } from "../../utils/getEmoji";
import { Footer } from "../Footer/Footer";

export function ListIngredients()  {
  const { ingredients, isLoading } = useIngredients();
  const [randomIngredient, setRandomIngredient] = useState(null);

  const generateRandomIngredient = () => {
    const randomIndex = Math.floor(Math.random() * ingredients.length);
    setRandomIngredient(ingredients[randomIndex]);
  };


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
        <div className="ingredients-gold-container">
          <button onClick={generateRandomIngredient}>Generar ingrediente al azar</button>
          {randomIngredient && (
            <div>
              <h2>Ingrediente al azar, animate a cocinar algo con:</h2>
              <p>{getEmoji(randomIngredient.ingredient)} {randomIngredient.ingredient} - {randomIngredient.description}</p>
            </div>
          )}
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
      <Footer/>
    </>
  )
}