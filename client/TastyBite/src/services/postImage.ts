
import axios from 'axios';



export const postImage = async ({ username, image, setImage}) => {

  const formData = new FormData();
  formData.append('title', `profile_picture_${username}`);
  formData.append('file', image);
  try {
    // Cambia la URL a la que corresponda en tu aplicación
    const result = await axios.post('https://teal-monkey-hem.cyclic.app/api/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Lógica adicional después de la carga exitosa

    return result.data;
  } catch (error) {
    console.error('Error al cargar la imagen', error);
  }

};