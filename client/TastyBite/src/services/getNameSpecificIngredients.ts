import axios from "axios";

export const getNameSpecificIngredients = async ({ingredients_ids}) => {
  try {
    const promises = ingredients_ids.map(id => 
      axios.get(`https://teal-monkey-hem.cyclic.app/api/ingredients/${id}`)
    );

    const responses = await Promise.all(promises);

    const ingredients = responses.map(response => response.data[0]);
    console.log("ingredients");
    console.log(ingredients);

    return ingredients;
  }
  catch (error) {
    console.log(error);
  }
}