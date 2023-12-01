// services/getRecipes.ts

import axios from 'axios';

export async function getRecipes() {
  try {
    const response = await axios.get('http://10.6.128.69:8080/api/recipes');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}