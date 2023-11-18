

import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface ImageUploadFormProps {}

const ImageUploadForm: React.FC<ImageUploadFormProps> = () => {
  const [imageTitle, setImageTitle] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setImage(file || null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      console.error('Por favor, seleccione una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('title', imageTitle); // Cambiado de 'imageTitle' a 'title'
    formData.append('file', image); // Cambiado de 'image' a 'file'

    try {
      console.log("imageTitle");
      console.log(imageTitle);
      console.log("image");
      console.log(image);
      // Cambia la URL a la que corresponda en tu aplicación
      await axios.post('http://localhost:3000/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Lógica adicional después de la carga exitosa
      console.log('Imagen cargada exitosamente');
    } catch (error) {
      console.error('Error al cargar la imagen', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="imageTitle">Título de la imagen:</label>
        <input
          type="text"
          id="imageTitle"
          value={imageTitle}
          onChange={(e) => setImageTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="image">Seleccionar imagen:</label>
        <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
      </div>
      <div>
        <button type="submit">Cargar imagen</button>
      </div>
    </form>
  );
};

export default ImageUploadForm;
