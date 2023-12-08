import axios from "axios";


export const getNameSpecificIngredients = async (ingredients_id) => {
  try {
    // pedimos los ingredientes, en ingredients_id tenemos los ids, entonces tenemos varias peticiones
    // a la api para obtener los ingredientes
    const response = ingredients_id.map(async (id) => {
      const response = await axios.get(`https://teal-monkey-hem.cyclic.app/api/ingredients/${id}`);

      return response.data.ingredient;
    }
    );
    // esperamos a que todas las peticiones terminen
    const results = await Promise.all(response);
    console.log("results de getNameSpecificIngredients");
    console.log(results);
    return results;
  }
  catch (error) {
    console.log(error);
  }
}