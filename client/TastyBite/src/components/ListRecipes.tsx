import { useEffect, useState } from "react";
import { Recipe } from "../../types/Recipe.tsx";

const fetchRecipes = async () => {
  const response = await fetch("http://localhost:3000/recipes");
  return await response.json();
}


const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes().then((recipes) => setRecipes(recipes));
  }, []);

  return { recipes };
}

export function ListRecipes() {
  const { recipes } = useRecipes();
  

  return (
    <div className="list-recipes">
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe: Recipe) => (
          <li key={String(recipe.recipe_id)}>
            <h2>{recipe.title}</h2>
            <p>{String(recipe.recipe_id)}</p>
            {recipe.instructions.map((instruction) => (
              <p>{instruction}</p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}