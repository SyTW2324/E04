import { useEffect, useState } from "react";
import { Recipe } from "../../types/Recipe.tsx";

const fetchRecipes = async () => {
  const response = await fetch("http://localhost:3000/recipes");
  const recipesData = await response.json();

  // Recorrer las recetas y cargar las imágenes
  const recipesWithImages = await Promise.all(
    recipesData.map(async (recipe: Recipe) => {
      const imageUrl = await fetchImageUrl(recipe.images[0]);
      return { ...recipe, imageUrl };
    })
  );

  return recipesWithImages;
};

const fetchImageUrl = async (image_id: string) => {
  const response = await fetch(`http://localhost:3000/images?image_id=${image_id}`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => { 
    fetchRecipes().then((recipesWithImages) => {
      setRecipes(recipesWithImages);
    });

  }, []);

  return { recipes };
}


export function ListRecipes() {
  const { recipes } = useRecipes();
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    recipes.forEach((recipe: Recipe) => {
      recipe.images.forEach((image_id: string) => {
        fetchImageUrl(image_id).then((image) => {
          setImages([...images, image]);
        });
      });
    });
    console.log(images)
  }
  , [recipes]);
  


  return (
    <div>
      {recipes.map((recipe: Recipe) => (
        <Recipe key={recipe.recipe_id} recipe={recipe} />
        
      ))}
    </div>
  );
}

const Recipe = ({ recipe }) => {
  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{String(recipe.recipe_id)}</p>
      {recipe.instructions.map((instruction) => (
        <p>{instruction}</p>
      ))}
      <img src={recipe.imageUrl} alt={recipe.name} />
    </div>
  );
};