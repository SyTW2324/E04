import { MongoClient, MongoClientOptions } from 'mongodb';
import * as fs from 'fs';

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
  const client = new MongoClient("mongodb://127.0.0.1:27017/tasty-bite-api");

  try {
    await client.connect();
    console.log('Conectado a la base de datos');

    const db = client.db("tasty-bite-api");
    const collection = db.collection('images');

    const filePath = '/home/usuario/E04/data/image.json';

    const rawData = fs.readFileSync(filePath, 'utf-8');

    let jsonData = JSON.parse(rawData);
    let images: Image[] = [];

    // a partir de la path obtenemos la imagen
    // y la convertimos en un buffer
    jsonData.forEach((element: ImageJSON) => {
      const image = fs.readFileSync(element.image);
    //   const imageType = element.image.contentType;
      const imageTitle = element.imageTitle;

      images.push({
        imageTitle: imageTitle,
        image: {
          data: image,
          contentType: 'image/png',
        },
      });
    });


    // Insertar datos en la colección
    await collection.insertMany(images);
    console.log('Datos insertados correctamente');
  } finally {
    // Cerrar la conexión
    await client.close();
    console.log('Conexión cerrada');
  }
}

// Ejecutar la función
insertImages();