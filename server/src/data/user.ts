import { MongoClient, MongoClientOptions } from 'mongodb';
import * as fs from 'fs';
import { Schema } from 'mongoose';
import FormData from 'form-data';
import axios from 'axios';

interface UserJSON {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  profile_picture: string;
}

interface User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
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
  // const client = new MongoClient("mongodb://127.0.0.1:27017/tasty-bite-api");
  const URL = 'https://teal-monkey-hem.cyclic.app/api/users';
  try {
    // await client.connect();
    console.log('Conectado a la base de datos');

    // const db = client.db("tasty-bite-api");
    // const collectionUsers = db.collection('users');
    // const collectionImages = db.collection('images');

    const filePath = '/home/usuario/E04/data/user.json';

    const rawData = fs.readFileSync(filePath, 'utf-8');

    let jsonData = JSON.parse(rawData);
    let users: UserJSON[] = [];

    jsonData.forEach((element: UserJSON) => {
      users.push(element);
    });

    for (const user of users) {
      const imageToInsert = fs.readFileSync(user.profile_picture);
      const formData = new FormData();
      formData.append('title', user.username);
      formData.append('file', imageToInsert);
      const result = await axios.post('https://teal-monkey-hem.cyclic.app/api/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // console.log(result.data.image_id);
      // const insertedId = new Schema.Types.ObjectId(result.data.image_id.toString());
      // console.log(insertedId);
      let userToInsert: User = {
        username: user.username,
        password: user.password,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        profile_picture: result.data.image_id,
      }
    
      console.log(userToInsert);
      const resultado = await axios.post(URL, userToInsert);
      console.log(resultado);
    };

    console.log('Datos insertados correctamente');
  } catch (error) {
    console.log('Error al insertar los datos');
  } finally {
    // Cerrar la conexión
    // if (client) {
    //   await client.close();
    // }
    console.log('Conexión cerrada');
  }
}

// Ejecutar la función
insertUsers();