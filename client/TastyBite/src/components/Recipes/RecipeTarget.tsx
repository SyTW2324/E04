import { useNavigate } from "react-router-dom";
import "./RecipeTarget.css";

import React from "react";



export function RecipeTarget({ recipe }) {
  const navigate = useNavigate();

  return (
    <div  onClick={() => navigate(`/recipes/${recipe._id}`)} className="recipe-target-container-target" key={recipe._id}>
      <div className="recipe-target-container-body">
        <h2 className="recipe-target-title">{recipe.title}</h2>
        <div className="recipe-target-info">
          <div className="logo-info">
            <img src="../../serving-logo.svg" alt="icono de platillo numero de servicios" />
            <span className="recipe-target-info-item"> {recipe.number_servings} personas</span>

          </div>
          <div className="logo-info">
            <img src="../../clock-logo.svg" alt="icono de reloj tiempo de preparacion" />
            <span className="recipe-target-info-item"> {recipe.time}</span>
          </div>
          <div className="logo-info">
            <img src={
              recipe.difficulty === 'easy' ? '../../difficulty-logo-easy.svg' :
              recipe.difficulty === 'medium' ? '../../difficulty-logo-medium.svg' :
              '../../difficulty-logo-hard.svg'
            } alt="icono de dificultad" />
            <span className="recipe-target-info-item"> {recipe.difficulty}</span>
          </div>
        </div>
      </div>
      <div className="recipe-target-image-container">
        <img src={recipe.images[0]} alt={`Imagen de ${recipe.title}`} />
        
      </div>
    </div>
  );
}