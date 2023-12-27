import { MongoClient, MongoClientOptions } from 'mongodb';
import * as fs from 'fs';
import { profile } from 'console';
import { Schema } from 'mongoose';

interface UserJSON {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_picture: string;
}

interface User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_picture: Schema.Types.ObjectId;
}


interface Image {
  imageTitle: string;
  image: {
    data: Buffer;
    contentType: string;
  };
}

async function insertUsers() {
  const client = new MongoClient("mongodb://127.0.0.1:27017/tasty-bite-api");

  try {
    await client.connect();
    console.log('Conectado a la base de datos');

    const db = client.db("tasty-bite-api");
    const collectionUsers = db.collection('users');
    const collectionImages = db.collection('images');

    const filePath = '/home/usuario/E04/data/user.json';

    const rawData = fs.readFileSync(filePath, 'utf-8');

    let jsonData = JSON.parse(rawData);
    let users: UserJSON[] = [];

    jsonData.forEach((element: UserJSON) => {
      users.push(element);
    });

    for (const user of users) {
      const image = fs.readFileSync(user.profile_picture);
      let profile_picture: Image = {
        imageTitle: user.username,
        image: {
          data: image,
          contentType: 'image/png',
        },
      }
      const insertResult = await collectionImages.insertOne(profile_picture);
      const insertedId = new Schema.Types.ObjectId(insertResult.insertedId.toString());
      let userToInsert: User = {
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        profile_picture: insertedId,
      }
      await collectionUsers.insertOne(userToInsert);
    };

    console.log('Datos insertados correctamente');
  } catch (error) {
    console.log('Error al insertar los datos');
  } finally {
    // Cerrar la conexión
    if (client) {
      await client.close();
    }
    console.log('Conexión cerrada');
  }
}

// Ejecutar la función
insertUsers();