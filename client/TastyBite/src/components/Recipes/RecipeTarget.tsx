import { useNavigate } from "react-router-dom";
import "./RecipeTarget.css";

import React, { useEffect } from "react";



export function RecipeTarget({ recipe }) {
  // const { category , ingredients } = useRecipe(recipe.category, recipe.ingredients);
  // console.log("VEAMOS QUE PASA");
  // console.log(category);
  // console.log(ingredients);
  const navigate = useNavigate();

  return (
    <div  onClick={() => navigate(`/recipes/${recipe._id}`)} className="recipe-container-target" key={recipe._id}>
      <div className="recipe-container-body">
        <h2 className="recipe-title">{recipe.title}</h2>
        <div className="recipe-info">
          <div className="logo-info">
            <img src="../../serving-logo.svg" alt="icono de platillo numero de servicios" />
            <span className="recipe-info-item"> {recipe.number_servings} personas</span>

          </div>
          <div className="logo-info">
            <img src="../../clock-logo.svg" alt="icono de reloj tiempo de preparacion" />
            <span className="recipe-info-item"> {recipe.time}</span>
          </div>
          <div className="logo-info">
            <img src={
              recipe.difficulty === 'easy' ? '../../difficulty-logo-easy.svg' :
              recipe.difficulty === 'medium' ? '../../difficulty-logo-medium.svg' :
              '../../difficulty-logo-hard.svg'
            } alt="icono de dificultad" />
            <span className="recipe-info-item"> {recipe.difficulty}</span>
          </div>
        </div>
      </div>
      <div className="recipe-image-container">
        <img src={recipe.images[0]} alt={`Imagen de ${recipe.title}`} />
        
      </div>
    </div>
  );
}