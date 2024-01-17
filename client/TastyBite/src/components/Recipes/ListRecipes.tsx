import './ListRecipes.css';

import React, { useEffect, useState } from 'react';
import { Recipe } from '../../../types/Recipe';
import { getRecipes } from '../../services/getRecipes';
import { RecipeTarget } from './RecipeTarget';
import { useRecipe } from '../../hooks/useRecipe';
import { Link } from 'react-router-dom';
import { Loader } from '../Loader/Loader';


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

  const [searchRecipes, setSearchRecipes] = useState('');
  const [maxTime, setMaxTime] = useState(99);
  const [difficulty, setDifficulty] = useState([]);
  const [numServings, setNumServings] = useState(9);
  const filteredRecipes = recipes?.filter(recipe =>
    recipe.title.toLowerCase().includes(searchRecipes.toLowerCase())
  ).filter(recipe => recipe.time <= maxTime)
  .filter(recipe => difficulty.length === 0 || difficulty.includes(recipe.difficulty))
  .filter(recipe => recipe.number_servings <= numServings);
  
  const handleDifficultyChange = (event) => {
    if (event.target.checked) {
      setDifficulty(oldDifficulty => [...oldDifficulty, event.target.value]);
    } else {
      setDifficulty(oldDifficulty => oldDifficulty.filter(diff => diff !== event.target.value));
    }
  };



  if (!recipes) {
    return <Loader />;
  }

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
            <p className="teaser-recipes" >Con recetas tan variadas, encontrar la comida ideal nunca fue tan fácil</p>
            <div className="recipes-search__container">
              <input className="recipes-search__name"
                type="text"
                placeholder="Buscar recetas..."
                value={searchRecipes}
                onChange={e => setSearchRecipes(e.target.value)}
                />
              <div className="recipes-search__difficulty">
                <input type="checkbox" value="easy" onChange={handleDifficultyChange} /> Fácil
                <input type="checkbox" value="medium" onChange={handleDifficultyChange} /> Media
                <input type="checkbox" value="hard" onChange={handleDifficultyChange} /> Difícil
              </div>
            </div>
            <div className="recipes-search__container-ranges">
              <input className="recipes-search__time"
                type="range"
                min="0"
                max="99"
                step="3"
                value={maxTime}
                onChange={e => setMaxTime(parseInt(e.target.value))}
              />
              <span>{maxTime} minutos</span>
              <input className="recipes-search__servings"
                type="range"
                min="1"
                max="9"
                step="1"
                value={numServings}
                onChange={e => setNumServings(parseInt(e.target.value))}
              />
              <span>{numServings} personas</span>
            </div>
            <div className="recipes-container">
              {filteredRecipes.map((recipe) => (
                <RecipeTarget recipe={recipe} key={recipe.recipe_id} />
                ))}
            </div> 
          </>
        }
      </div>
  );
}