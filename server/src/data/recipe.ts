import { MongoClient, MongoClientOptions } from 'mongodb';
import * as fs from 'fs';
import { Schema } from 'mongoose';
import axios from 'axios';
import FormData from 'form-data';

interface RecipeJSON {
  title: string;
  instructions: string[];
  images: string[];
  time: number;
  category: Schema.Types.ObjectId;
  numberOfServings: number;
  difficulty: string;
}

interface Recipe {
  title: string;
  instructions: string[];
  images: Schema.Types.ObjectId[];
  time: number;
  category: Schema.Types.ObjectId;
  numberOfServings: number;
  difficulty: string;
}

interface Image {
  imageTitle: string;
  image: {
    data: Buffer;
    contentType: string;
  };
}

async function insertRecipes() {
  // const client = new MongoClient("mongodb://127.0.0.1:27017/tasty-bite-api");
  const URL = 'https://teal-monkey-hem.cyclic.app/api/recipes';

  try {
    // await client.connect();
    console.log('Conectado a la base de datos');

    // const db = client.db("tasty-bite-api");
    // const collectionRecipes = db.collection('recipes');
    // const collectionImages = db.collection('images');

    const filePath = '/home/usuario/E04/data/recipe.json';

    const rawData = fs.readFileSync(filePath, 'utf-8');

    let jsonData = JSON.parse(rawData);
    let recipes: RecipeJSON[] = [];

    jsonData.forEach((element: RecipeJSON) => {
      recipes.push(element);
    });

    
    for (const recipe of recipes) {
      let ids: Schema.Types.ObjectId[] = [];
      for (const image of recipe.images) {
        // const imageToInsert = fs.readFileSync(image);
        // let imageRecipe: Image = {
        //   imageTitle: recipe.title,
        //   image: {
        //     data: imageToInsert,
        //     contentType: 'image/png',
        //   },
        // }
        // const insertResult = await collectionImages.insertOne(imageRecipe);
        // const insertedId = new Schema.Types.ObjectId(insertResult.insertedId.toString());
        
        const imageToInsert = fs.readFileSync(image);
        const formData = new FormData();
        formData.append('title', recipe.title);
        formData.append('file', imageToInsert, {
          filename: 'imagen.png',
          contentType: 'image/png',
        });
        const result = await axios.post('https://teal-monkey-hem.cyclic.app/api/images', formData);

        ids.push(result.data.image_id)
      }
      console.log(recipe.category);
      let recipeToInsert: Recipe = {
        title: recipe.title,
        instructions: recipe.instructions,
        time: recipe.time,
        category : recipe.category,
        numberOfServings: recipe.numberOfServings,
        difficulty: recipe.difficulty,
        images: ids,
      }
      const resultado = await axios.post(URL, recipeToInsert);
    } 

    // Insertar datos en la colección
    console.log('Datos insertados correctamente');
  } finally {
    // Cerrar la conexión
    // await client.close();
    console.log('Conexión cerrada');
  }
}

// Ejecutar la función
insertRecipes();