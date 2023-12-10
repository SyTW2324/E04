import { useEffect, useState } from "react";
import { Recipe } from '../types/Recipe';
import { fetchImageUrl } from "../services/getImage";


export function useImages(recipes: Recipe[]) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const newImages = await Promise.all(
        recipes.map(recipe => fetchImageUrl(recipe.images[0]))
      );
      setImages(newImages);
    };

    fetchImages();
  }, [recipes]);

  return images;
}