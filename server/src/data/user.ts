import { MongoClient, MongoClientOptions } from 'mongodb';
import * as fs from 'fs';

interface User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

async function insertUsers() {
  const client = new MongoClient("mongodb://127.0.0.1:27017/tasty-bite-api");

  try {
    await client.connect();
    console.log('Conectado a la base de datos');

    const db = client.db("tasty-bite-api");
    const collection = db.collection('users');

    const filePath = '/home/usuario/E04/data/user.json';

    const rawData = fs.readFileSync(filePath, 'utf-8');

    let jsonData = JSON.parse(rawData);
    let users: User[] = [];

    jsonData.forEach((element: User) => {
      users.push(element);
    });


    // Insertar datos en la colección
    await collection.insertMany(users);
    console.log('Datos insertados correctamente');
  } finally {
    // Cerrar la conexión
    await client.close();
    console.log('Conexión cerrada');
  }
}

// Ejecutar la función
insertUsers();