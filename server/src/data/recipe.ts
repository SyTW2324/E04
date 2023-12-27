import { MongoClient, MongoClientOptions } from 'mongodb';
import * as fs from 'fs';

interface Recipe {
  title: string;
  instructions: string[];
  time: number;
  numberOfServings: number;
  difficulty: string;
}

async function insertRecipes() {
  const client = new MongoClient("mongodb://127.0.0.1:27017/tasty-bite-api");

  try {
    await client.connect();
    console.log('Conectado a la base de datos');

    const db = client.db("tasty-bite-api");
    const collection = db.collection('recipes');

    const filePath = '/home/usuario/E04/data/recipe.json';

    const rawData = fs.readFileSync(filePath, 'utf-8');

    let jsonData = JSON.parse(rawData);
    let recipes: Recipe[] = [];

    jsonData.forEach((element: Recipe) => {
      recipes.push(element);
    });


    // Insertar datos en la colección
    await collection.insertMany(recipes);
    console.log('Datos insertados correctamente');
  } finally {
    // Cerrar la conexión
    await client.close();
    console.log('Conexión cerrada');
  }
}

// Ejecutar la función
insertRecipes();