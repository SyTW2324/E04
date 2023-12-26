import { useEffect, useState } from "react";
import { getRecipe } from "../services/getRecipe";
import { getNameSpecificIngredients } from "../services/getNameSpecificIngredients";
import { getCategory } from "../services/getCategory";
import { fetchImageUrl } from "../services/getImage";
import { set } from "mongoose";
import { Recipe } from "../../types/Recipe";


export function useRecipe({ recipe_id }) {
  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {
    const fetchRecipe = async () => {
      const data = await getRecipe({ recipe_id });
      // cambiamos la images por la url de la imagen
      const updatedRecipe = data.map((recipe: any) => {
        return {
          ...recipe,
          images: recipe.images.map((image: any) => {
            const buffer = new Uint8Array(image.image.data.data);
            const blob = new Blob([buffer], { type: image.image.contentType });
            return URL.createObjectURL(blob);
          }),
        };
      });
      setRecipe(updatedRecipe[0]);
      console.log('useRecipe');
      console.log(updatedRecipe[0]);
    };

    fetchRecipe();
  }, []);

  return recipe;
}


