import { MongoClient, MongoClientOptions } from 'mongodb';
import * as fs from 'fs';
import axios from 'axios';

interface Ingredient {
  ingredient: string;
  description: string;
}

async function insertIngredients() {
  // const client = new MongoClient("mongodb://127.0.0.1:27017/tasty-bite-api");
  const URL = "https://teal-monkey-hem.cyclic.app/api/ingredients"

  try {
    // await client.connect();
    console.log('Conectado a la base de datos');

    // const db = client.db("tasty-bite-api");
    // const collection = db.collection('ingredients');

    const filePath = '/home/usuario/E04/data/ingredient.json';

    const rawData = fs.readFileSync(filePath, 'utf-8');

    let jsonData = JSON.parse(rawData);
    let ingredients: Ingredient[] = [];

    jsonData.forEach((element: Ingredient) => {
      ingredients.push(element);
    });

    for (const ingredient of ingredients) {
      await axios.post(URL, ingredient);
    }

    // Insertar datos en la colección
    // await collection.insertMany(ingredients);

    console.log('Datos insertados correctamente');
  } finally {
    // Cerrar la conexión
    // await client.close();
    console.log('Conexión cerrada');
  }
}

// Ejecutar la función
insertIngredients();