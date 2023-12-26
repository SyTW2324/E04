import { useEffect, useState } from "react";
import { getRecipeByCategory } from "../services/getRecipesByCategory";



export const useRecipesByCategory = ({ category_id }) => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRecipeByCategory({ category_id }).then((data) => {
      setRecipes(data);
      setIsLoading(false);
    });
  }, [category_id]);

  return { recipes, isLoading };
}