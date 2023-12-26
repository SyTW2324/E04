import axios from "axios";



export const getRecipe = async ({ recipe_id = null, category_id = null }) => {
  try {
    if (recipe_id) {
      const response = await axios.get(`https://teal-monkey-hem.cyclic.app/api/recipes/${recipe_id}`);
      return response.data;
    } else if (category_id) {
      const response = await axios.get(`https://teal-monkey-hem.cyclic.app/api/recipes?category_id=${category_id}`);
      return response.data;
    } else {
      const response = await axios.get(`https://teal-monkey-hem.cyclic.app/api/recipes`);
      return response.data;
    
    }

  }
  catch (error) {
    console.error(error);
  }


}