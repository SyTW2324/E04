import axios from "axios";



export const getRecipeByCategory = async ({ category_id }) => {
  try {
    const response = await axios.get(`https://teal-monkey-hem.cyclic.app/api/recipes?category_id${category_id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}