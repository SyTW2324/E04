import { useEffect, useState } from "react";
import { getCategory } from "../services/getCategory.ts";


export const useCategory = ({ category_id }) => {
  const [newCategory, setNewCategory] = useState([]);

  useEffect(() => {
    getCategory({category_id}).then((data) => setNewCategory(data));
    
  }, []);

  return newCategory;
}