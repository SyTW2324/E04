// services/getRecipes.ts

import axios from 'axios';

export async function getRecipes() {
  try {
    const response = await axios.get('https://teal-monkey-hem.cyclic.app/api/recipes');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}