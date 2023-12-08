import { useEffect, useState } from "react";
import { getCategories } from "../services/getCategories";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    getCategories().then((data) => {
      console.log("los dato", data);
      setCategories(data);
      setIsLoading(false);
    });
  }, []);

  return { categories, isLoading };
};