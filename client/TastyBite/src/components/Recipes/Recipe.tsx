import { Link, useParams } from "react-router-dom";
import "./Recipe.css";
import React, { useEffect, useState } from "react";
import { useRecipe } from "../../hooks/useRecipe";


const ingredientEmojis = {
  'manzana': '🍎',
  'platano': '🍌',
  'uvas': '🍇',
  'sandia': '🍉',
  'limon': '🍋',
  'fresa': '🍓',
  'durazno': '🍑',
  'piña': '🍍',
  'aguacate': '🥑',
  'tomate': '🍅',
  'berenjena': '🍆',
  'zanahoria': '🥕',
  'maiz': '🌽',
  'papa': '🥔',
  'pan': '🍞',
  'queso': '🧀',
  'huevo': '🥚',
  'tocino': '🥓',
  'pollo': '🍗',
  'carne': '🍖',
  'pescado': '🐟',
  'camarones': '🦐',
  'langosta': '🦞',
  'sushi': '🍣',
  'arroz': '🍚',
  'espagueti': '🍝',
  'helado': '🍦',
  'pastel': '🍰',
  'chocolate': '🍫',
  'caramelo': '🍬',
  'miel': '🍯',
  'cerveza': '🍺',
  'vino': '🍷',
  'cafe': '☕',
  'te': '🍵',
  'leche': '🥛',
  'agua': '💧',
  'cacahuate': '🥜',
  'croissant': '🥐',
  'hamburguesa': '🍔',
  'pizza': '🍕',
  'hotdog': '🌭',
  'sandwich': '🥪',
  'taco': '🌮',
  'burrito': '🌯',
  'ensalada': '🥗',
  'palomitas': '🍿',
  'donut': '🍩',
  'galleta': '🍪',
  'cerezas': '🍒',
  'mango': '🥭',
  'coco': '🥥',
  'kiwi': '🥝',
  'cacahuates': '🥜',
  'miel_pot': '🍯',
  'sake': '🍶',
  'champagne': '🍾',
  'copas': '🍷',
  'coctel': '🍸',
  'bebida_tropical': '🍹',
  'cervezas': '🍻',
  'copas_chocando': '🥂',
  'vaso': '🥃',
  'vaso_con_paja': '🥤',
  'palillos': '🥢',
  'cuchillo': '🔪',
  'cuchara': '🥄',
  'tenedor': '🍴',
  'plato': '🍽️',
  'taza': '🍵',
  'taza_con_popote': '🥤',
  'taza_con_tapa': '☕',
  'taza_de_te': '🍵'

};

export function getEmoji(ingredient) {
  ingredient = ingredient.toLowerCase().replace(/ /g, '_');
  // si no tenemos el emoji, probamos solo con la palabra antes del _
  if (!ingredientEmojis[ingredient]) {
    ingredient = ingredient.split('_')[0];
  }
  return ingredientEmojis[ingredient] || '🔪';
}

export function Recipe() {
  const { recipe_id } = useParams();
  const recipe  = useRecipe({ recipe_id });

  
  if (!recipe) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <>

      {recipe && (
        <>
          <h1 className="recipe-title">{recipe.title}</h1>
          
          <div className="recipe-container">
            <section className="recipe-column">
            
              <div className="recipe-body-container">
                <div className="recipe-info">
                  <div className="logo-info">
                    <img src="../../serving-logo.svg" alt="icono de platillo numero de servicios" />
                    <span className="recipe-info-item"> {recipe.number_servings} personas</span>

                  </div>
                  <div className="logo-info">
                    <img src="../../clock-logo.svg" alt="icono de reloj tiempo de preparacion" />
                    <span className="recipe-info-item"> {recipe.time} minutos</span>
                  </div>
                  <div className="logo-info">
                    <img src={
                      recipe.difficulty === 'easy' ? '../../difficulty-logo-easy.svg' :
                      recipe.difficulty === 'medium' ? '../../difficulty-logo-medium.svg' :
                      '../../difficulty-logo-hard.svg'
                    } alt="icono de dificultad" />
                    <span className="recipe-info-item"> {recipe.difficulty}</span>
                  </div>
                  <div className="logo-info">
                    <img src="../../category-icon.svg" alt="icono de platillo numero de servicios" />
                    <span className="recipe-info-item"> {recipe.category.category}</span>

                  </div>
              </div>
              <h2 className="recipe-subtitle">Ingredientes</h2>
              <div className="recipe-ingredients-container">
                {recipe.ingredients.map((ingredient) => (
                  <p key={ingredient._id} className="recipe-ingredient">
                  {getEmoji(ingredient.ingredient)} {ingredient.ingredient}
                </p>
                  ))}
              </div>
                
              </div>
              


            </section>
            <section className="recipe-column">
              <div className="recipe-image-container">
                <img className="recipe-image" src={recipe.images} alt={recipe.title} />
              </div>
            </section>
          </div>
          
          <h2 className="recipe-subtitle">Instrucciones</h2>
          <div className="recipe-instructions-container">

            {recipe.instructions.map((instruction, index) => (
              <div className="recipe-instructions-step">

                <p className="recipe-instructions-step-number">Paso {index + 1}</p>
                <p key={index} className="recipe-instructions">{instruction}</p>
              </div>
              
              ))}
          </div>
        </>)
      }
    </>
  );
}