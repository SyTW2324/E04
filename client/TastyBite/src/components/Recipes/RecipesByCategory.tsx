import "./RecipesByCategory.css";
import React, { useEffect, useState } from "react";
import { useRecipesByCategory } from "../../hooks/useRecipesByCategory";
import { RecipeTarget } from "./RecipeTarget";
import { Link, useParams } from 'react-router-dom';
import { getCategories } from "../../services/getCategories";
import { useCategoryStore } from "../../state/store";
import { useRecipe } from "../../hooks/useRecipe";
import { Header } from "../Header";
import { Loader } from "../Loader/Loader";
import { Footer } from "../Footer/Footer";
// import { useCategoryStore } from "../state/store";

export function RecipesByCategory() {
  const { category_id } = useParams();
  const categories = useCategoryStore((state: any) => state.categories);
  const setCategories = useCategoryStore((state: any) => state.setCategories);
  const recipes = useRecipe({ category_id });
  const [category, setCategory] = useState({});

  useEffect(() => {
    if (categories.length > 0) {
      const category = categories.find((category: any) => category.category_id === category_id);
      setCategory(category);
      return;
    }
    getCategories().then((data) => {
      setCategories(data);
      const category = data.find((category: any) => category.category_id === category_id);
      setCategory(category);
    });
  
  }, []);

  const [searchRecipes, setSearchRecipes] = useState('');
  const [maxTime, setMaxTime] = useState(100);
  const [difficulty, setDifficulty] = useState([]);
  const [numServings, setNumServings] = useState(10);
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
    console.log('no hay recetas');
    console.log(recipes);
    console.log(category);
    return <Loader/>
  }

  return (
    <>
    <Header/>
    <div className="breadcrumb">
      <Link to="/">Tasty Bite</Link> &gt;
      <span>Categorías de recetas</span>
    </div>
    <div>
      { (recipes && recipes.length > 1 && category) ?
        <>
          <div className="login-title-container">
            <h1 className="login-title" >Recetas {category.category}</h1>
          </div>
          <p className="teaser-recipes" >Disfruta las recetas de la categoría {category.category} : {category.description} </p>
          <div className="recipes-search__container">
              <input className="recipes-search__name"
                type="text"
                placeholder="Buscar recetas..."
                value={searchRecipes}
                onChange={e => setSearchRecipes(e.target.value)}
                />
              <div className="recipes-search__difficulty">
                <input type="checkbox" value="easy" onChange={handleDifficultyChange} /> Easy
                <input type="checkbox" value="medium" onChange={handleDifficultyChange} /> Medium
                <input type="checkbox" value="hard" onChange={handleDifficultyChange} /> Hard
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
        :
        <Loader/>
        
      }
    </div>
    <Footer/> 
    </>
  );
}