import axios from "axios"

export const getCategories = async () => {
  try {
    const response = await axios.get("https://teal-monkey-hem.cyclic.app/api/categories");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}