import React, { useEffect, useState } from 'react';
// import { useRecipes } from '../hooks/useRecipes';
import { Recipe } from '../types/Recipe';
import axios from 'axios';
import { getRecipes } from '../services/getRecipes';



// export async function getImage({ image_id }) {
//   try {
//     const response = await axios.get(`http://10.6.128.69:8080/api/images?image_id=${image_id}`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// }







// export function useImages(imageIds: string[]) {
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     const fetchImages = async () => {
//       console.log('fetchImages');
//       console.log(imageIds);
//       const images = await Promise.all(imageIds.map(image_id => fetchImageUrl({ image_id })));
//       setImages(images);
//     };

//     fetchImages();
//   }, [imageIds]);

//   return images;
// }

export const fetchImageUrl = async (image_id: string): Promise<string> => {
  console.log('fetching image url')
  console.log(image_id)
  const response = await fetch(`http://10.6.128.69:8080/api/images?image_id=${image_id}`);
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

  return recipes;
}


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



export function ListRecipes() {
  const recipes: Recipe[] = useRecipes();
  const images = useImages(recipes);

  return (
    <div>
      <h1>Recipes</h1>
      {recipes && recipes.map((recipe, index) => (
        <div key={recipe._id}>
          <h2>{recipe.title}</h2>
          {recipe.instructions && recipe.instructions.map((instruction, index) => (
            <p key={index}>{instruction}</p>
          ))}
          {images[index] && <img src={images[index]} alt={recipe.title} />}
        </div>
      ))}
    </div>
  );
}