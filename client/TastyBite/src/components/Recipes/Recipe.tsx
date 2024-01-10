import { Link, useParams } from "react-router-dom";
import "./Recipe.css";
import React, { useEffect, useState } from "react";
import { useRecipe } from "../../hooks/useRecipe";
import { Loader } from "../Loader/Loader";
import { Header } from "../Header";
import { getEmoji } from "../../utils/getEmoji";
import { RatingTarget } from "../Rating/RatingTarget";

export function Recipe() {
  const { recipe_id } = useParams();
  const recipe  = useRecipe({ recipe_id });
  console.log(recipe);

  if (!recipe) {
    return <Loader />;
  }

  return (
    <>
      <Header/>
      {recipe && (
        <>
        <article className="recipe-container">
          <h1 className="recipe-title">{recipe.title}</h1>
          <section className="recipe-info">
            <div className="logo-info">
              <img src="../../serving-logo.svg" alt="icono de platillo numero de servicios" />
              <span className="recipe-target-info-item"> {recipe.number_servings} personas</span>
            </div>
            <div className="logo-info">
              <img src="../../clock-logo.svg" alt="icono de reloj tiempo de preparacion" />
              <span className="recipe-target-info-item"> {recipe.time} minutos</span>
            </div>
            <div className="logo-info">
              <img src={
                recipe.difficulty === 'easy' ? '../../difficulty-logo-easy.svg' :
                recipe.difficulty === 'medium' ? '../../difficulty-logo-medium.svg' :
                '../../difficulty-logo-hard.svg'
              } alt="icono de dificultad" />
              <span className="recipe-target-info-item">Dificiltad {
                recipe.difficulty === 'easy' ? 'Fácil' :
                recipe.difficulty === 'medium' ? 'Media' :
                'Difícil'
              }</span>
            </div>
          </section>

          <section className="recipe-ingredients">
            <h2 className="recipe-subtitle">Ingredientes</h2>
            <ul className="recipe-ingredients-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="recipe-ingredients-list-item">
                  {getEmoji(ingredient.ingredient)} {ingredient.ingredient}
                </li>
              ))}
            </ul>
          </section>
          <div className="recipe-body-container">
            <section className="recipe-instructions">
              <h2 className="recipe-subtitle">Instrucciones</h2>
              <ol className="recipe-instructions-list">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="recipe-instructions-list-item">
                    {instruction}
                  </li>
                ))}
              </ol>
            </section>
            <div className="recipe-image">
              <img src={recipe.images[0]} alt={recipe.title} />
            </div>
          </div>
          <div className="recipe-rating">
            <h3>¿Te ha gustado esta receta? ¡Puntúala!</h3>
            <RatingTarget />
          </div>
        </article>
        

        </>
      )}
    </>
  );
}