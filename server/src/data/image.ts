import { MongoClient } from 'mongodb';
import { MongoClientOptions } from 'mongodb';
import * as fs from 'fs';

async function insertData() {
  const client = new MongoClient("mongodb://127.0.0.1:27017/tasty-bite-api");

  try {
    await client.connect();
    console.log('Conectado a la base de datos');

    const db = client.db("tasty-bite-api");
    const collection = db.collection('images');

    // Datos a insertar
    const datos = [
      {
        imageTitle: 'Ensalada de quinoa',
        image: {
          data: fs.readFileSync('/home/usuario/E04/zzz/recipe/EnsaladaQuinoa.png'),
          contentType: 'image/png',
        },
      }
      // {
      //   imageTitle: 'Ensalada de quinoa 2',
      //   image: {
      //     data: fs.readFileSync('/home/usuario/E04/zzz/recipe/EnsaladaQuinoa2.png'),
      //     contentType: 'image/png',
      //   },
      // },
      // {
      //   imageTitle: 'Pastel de chocolate',
      //   image: {
      //     data: fs.readFileSync('/home/usuario/E04/zzz/recipe/PastelChocolate.png'),
      //     contentType: 'image/png',
      //   },
      // },
      // {
      //   imageTitle: 'Pastel de chocolate 2',
      //   image: {
      //     data: fs.readFileSync('/home/usuario/E04/zzz/recipe/PastelChocolate2.png'),
      //     contentType: 'image/png',
      //   },
      // },
      // {
      //   imageTitle: 'Tacos de pescado',
      //   image: {
      //     data: fs.readFileSync('/home/usuario/E04/zzz/recipe/TacosPescado.png'),
      //     contentType: 'image/png',
      //   },
      // },
      // {
      //   imageTitle: 'Tacos de pescado 2',
      //   image: {
      //     data: fs.readFileSync('/home/usuario/E04/zzz/recipe/TacosPescado2.png'),
      //     contentType: 'image/png',
      //   },
      // },
      // {
      //   imageTitle: 'Ana',
      //   image: {
      //     data: fs.readFileSync('/home/usuario/E04/zzz/user/Ana.png'),
      //     contentType: 'image/png',
      //   },
      // },
      // {
      //   imageTitle: 'Diego',
      //   image: {
      //     data: fs.readFileSync('/home/usuario/E04/zzz/user/Diego.png'),
      //     contentType: 'image/png',
      //   },
      // },
      // {
      //   imageTitle: 'Elisabeth',
      //   image: {
      //     data: fs.readFileSync('/home/usuario/E04/zzz/user/Elisabeth.png'),
      //     contentType: 'image/png',
      //   },
      // },
      // {
      //   imageTitle: 'Juan',
      //   image: {
      //     data: fs.readFileSync('/home/usuario/E04/zzz/user/Juan.png'),
      //     contentType: 'image/png',
      //   },
      // },
      // {
      //   imageTitle: 'Marta',
      //   image: {
      //     data: fs.readFileSync('/home/usuario/E04/zzz/user/Marta.png'),
      //     contentType: 'image/png',
      //   },
      // }
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
