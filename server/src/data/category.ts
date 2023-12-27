import { MongoClient, MongoClientOptions } from 'mongodb';
import * as fs from 'fs';

interface Category {
  category: string;
  description: string;
}

async function insertCategories() {
  const client = new MongoClient("mongodb://127.0.0.1:27017/tasty-bite-api");

  try {
    await client.connect();
    console.log('Conectado a la base de datos');

    const db = client.db("tasty-bite-api");
    const collection = db.collection('categories');

    const filePath = '/home/usuario/E04/data/category.json';

    const rawData = fs.readFileSync(filePath, 'utf-8');

    let jsonData = JSON.parse(rawData);
    let categories: Category[] = [];

    jsonData.forEach((element: Category) => {
      categories.push(element);
    });


    // Insertar datos en la colección
    await collection.insertMany(categories);
    console.log('Datos insertados correctamente');
  } finally {
    // Cerrar la conexión
    await client.close();
    console.log('Conexión cerrada');
  }
}

// Ejecutar la función
insertCategories();