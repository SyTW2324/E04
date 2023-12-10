import axios from "axios";



export const getCategory = async ({category_id}) => {
  try {
    const response = await axios.get(`https://teal-monkey-hem.cyclic.app/api/categories?category_id${category_id}`);
    return response.data[0];
  } catch (error) {
    console.error(error);
  }
}
