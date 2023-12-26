import { useEffect, useState } from "react";
import { getRecipe } from "../services/getRecipe";
import { getNameSpecificIngredients } from "../services/getNameSpecificIngredients";
import { getCategory } from "../services/getCategory";
import { fetchImageUrl } from "../services/getImage";
import { set } from "mongoose";
import { Recipe } from "../../types/Recipe";


export function useRecipe({ recipe_id = null, category_id = null }) {
  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {
    const fetchRecipe = async () => {
      let data;
      if (recipe_id) {
        console.log('useRecipe recipe_id');
        console.log(recipe_id);
        data = await getRecipe({ recipe_id });
      } else if (category_id !== null) {
        console.log('useRecipe category_id');
        console.log(category_id);
        data = await getRecipe({ category_id });
      } else {
        data = await getRecipe({});

      }
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
      if (updatedRecipe.length === 1) {

        setRecipe(updatedRecipe[0]);
        console.log('useRecipe');
        console.log(updatedRecipe[0]);
      } else {
        console.log('useRecipe varias recetas');
        console.log(updatedRecipe);
        setRecipe(updatedRecipe);
      }
    };

    fetchRecipe();
  }, []);

  return recipe;
}


