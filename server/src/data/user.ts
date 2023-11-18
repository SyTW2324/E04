import { MongoClient } from 'mongodb';
import { MongoClientOptions } from 'mongodb';


async function insertData() {
  const client = new MongoClient("mongodb://127.0.0.1:27017/tasty-bite-api");

  try {
    await client.connect();
    console.log('Conectado a la base de datos');

    const db = client.db("tasty-bite-api");
    const collection = db.collection('users');

    // Datos a insertar
    const datos = [
      { username: "pepe", first_name: "Juan Jose", last_name: "Garcia Perez", email: "alu@gmail.es" },
    ];

    // Insertar datos en la colección
    await collection.insertMany(datos);
    console.log('Datos insertados correctamente');
  } finally {
    // Cerrar la conexión
    await client.close();
    console.log('Conexión cerrada');
  }
}

// Ejecutar la función
insertData();
