import { useEffect, useState } from "react";
import { getRecipe } from "../services/getRecipe";
import { getNameSpecificIngredients } from "../services/getNameSpecificIngredients";
import { getCategory } from "../services/getCategory";
import { fetchImageUrl } from "../services/getImage";

export const useRecipe = (recipe_id) => {
  const [recipe, setRecipe] = useState(null);


  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await getRecipe({recipe_id});
      const response2 = await getNameSpecificIngredients({ingredients_ids: response[0].ingredients});
      const response3 = await getCategory({category_id: response[0].category});
      console.log("AVER QWUE HAY !");
      const image_id = response[0].images[0] as string;
      const response4 = await fetchImageUrl( image_id )
      console.log("eppaa!");
      console.log({...response[0], ingredients: response2, category: response3, images: response4});
      setRecipe({ ...response[0]  , ingredients: response2, category: response3, images: response4});
    }

    if (recipe_id){
      fetchRecipe();      
    }
  }, [recipe_id]);

  return { recipe };
}

function getImages(arg0: { image_id: any; }) {
  throw new Error("Function not implemented.");
}
