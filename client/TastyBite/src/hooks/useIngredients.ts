import { useEffect, useState } from "react";
import { getIngredients } from "../services/getIngredients";


export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getIngredients().then(ingredients => setIngredients(ingredients));
    setIsLoading(false);
  }, []);

  return { ingredients, isLoading };
}