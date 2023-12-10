import axios from "axios";



export const getRecipe = async ({recipe_id}) => {
  try {
    const response = await axios.get(`https://teal-monkey-hem.cyclic.app/api/recipes/${recipe_id}`);
    return response.data;
  }
  catch (error) {
    console.error(error);
  }


}