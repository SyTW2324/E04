import axios from "axios";


export const getIngredients = async () => {
  try {
    const response = await axios.get("https://teal-monkey-hem.cyclic.app/api/ingredients");
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}