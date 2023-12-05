import { useState, useEffect } from 'react';
import { getRecipes } from '../services/getRecipes';
import { Recipe } from '../types/Recipe';

export const fetchImageUrl = async (image_id: string): Promise<string> => {
  console.log('fetching image url')
  console.log(image_id)
  const response = await fetch(`https://teal-monkey-hem.cyclic.app/api/images?image_id=${image_id}`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};


export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await getRecipes();
      setRecipes(data);
    };

    fetchRecipes();

    
  }, []);

  useEffect(() => { 
    const fetchImageUrls = async () => {
      const newRecipes = await Promise.all(recipes.map(async (recipe) => {
        const imageUrl = await fetchImageUrl(recipe.images[0].image_id);
        return {
          ...recipe,
          imageUrl,
        };
      }));
      setRecipes(newRecipes);
    };

    fetchImageUrls();
  }, [recipes]);



  return recipes;
}