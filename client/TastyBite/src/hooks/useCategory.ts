import { useEffect, useState } from "react";
import { getCategory } from "../services/getCategory.ts";


export const useCategory = (category: string) => {
  const [newCategory, setNewCategory] = useState([]);

  useEffect(() => {
    getCategory(category).then((data) => setNewCategory(data));
    
  }, []);

  return newCategory;
}