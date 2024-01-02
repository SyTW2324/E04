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
          <p className="teaser-recipes" >Disfruta de mas de {recipes.length} {category.description} </p>
          <div className="recipes-container">
            {recipes.map((recipe) => (
              <RecipeTarget recipe={recipe} key={recipe.recipe_id} />
              ))}
          </div> 
        </>
        :
        <Loader/>
      }
    </div>
    </>
  );
}