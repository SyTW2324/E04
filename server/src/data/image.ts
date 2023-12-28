import { MongoClient, MongoClientOptions } from 'mongodb';
import * as fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';

interface ImageJSON {
  imageTitle: string;
  image: string;
}


interface Image {
  imageTitle: string;
  image: {
    data: Buffer;
    contentType: string;
  };
}

async function insertImages() {
  // const client = new MongoClient("mongodb://127.0.0.1:27017/tasty-bite-api");
  const URL = "https://teal-monkey-hem.cyclic.app/api/images"
  
  try {
    // await client.connect();
    console.log('Conectado a la base de datos');

    // const db = client.db("tasty-bite-api");
    // const collection = db.collection('images');

    const filePath = '/home/usuario/E04/data/image.json';

    const rawData = fs.readFileSync(filePath, 'utf-8');

    let jsonData = JSON.parse(rawData);
    let images: ImageJSON[] = [];

    jsonData.forEach((element: ImageJSON) => {
      images.push(element);
    });


    for (const image of images) {
    //   await axios.post(URL, image);
      const imageToInsert = fs.readFileSync(image.image);
      const formData = new FormData();
      formData.append('title', image.imageTitle);
      formData.append('file', imageToInsert);
      const result = await axios.post('https://teal-monkey-hem.cyclic.app/api/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
    // }



    // Insertar datos en la colección
    // const insertResult = await collection.insertMany(images);
     
    console.log('Datos insertados correctamente');
  } finally {
    // Cerrar la conexión
    // await client.close();
    console.log('Conexión cerrada');
  }
}

// Ejecutar la función
insertImages();