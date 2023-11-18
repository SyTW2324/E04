import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const postImage = async ({imageTitle, image, setImage}) => {
  if (!image) {
    console.error('Por favor, seleccione una imagen.');
    return;
  }
  const formData = new FormData();
  formData.append('title', imageTitle);
  formData.append('file', image);
  try {
    // Cambia la URL a la que corresponda en tu aplicación
    const result = await axios.post('http://localhost:3000/images', formData, {
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


const postUser = async ({imageTitle, image, setImage}) => {
  const username = document.getElementById('username') as HTMLInputElement
  const first_name = document.getElementById('first_name') as HTMLInputElement
  const last_name = document.getElementById('last_name') as HTMLInputElement
  const profile_description = document.getElementById('profile_description') as HTMLInputElement
  const email = document.getElementById('email') as HTMLInputElement
  // const password = document.getElementById('password') as HTMLInputElement

  const result = await postImage({imageTitle, image, setImage})

  const user = {
    username: username.value,
    first_name: first_name.value,
    last_name: last_name.value,
    profile_description: profile_description.value,
    profile_picture: result.image_id,
    email: email.value,
    // password: password.value,
  }
  
  const response = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user),
  })
  const data = await response.json()
}


export function RegisterForm() {
  const [imageTitle, setImageTitle] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setImage(file || null);
  };
  
  return (
    <>
      <div className="breadcrumb">
        <a href="#">Tasty Bite</a> &gt; <a href="#">Iniciar sesión</a>
      </div>
      <div className="register-form-container">

        <div className="register-form-container__right-container">
          <h1>Registro de usuario</h1>
          <form className="form-register">
            <div className="form-group">
              <label>Nombre de usuario</label>
              <input type="text" id="username" placeholder="nombre de usuario" />
            </div>
            <div className="form-group">
              <label>Nombre</label>
              <input type="text" id="first_name" placeholder="nombre" />
            </div>
            <div className="form-group">
              <label>Apellidos</label>
              <input type="text" id="last_name" placeholder="apellidos" />
            </div>
            <div className="form-group">
              <label>Descripción de perfil</label>
              <textarea id="profile_description" placeholder="descripción de perfil" />
            </div>
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
            <div className="form-group">
              <label>Email</label>
              <input type="email" id="email" placeholder="correo electrónico" />
            </div>
            {/* <div className="form-group">
              <input type="password" id="password" placeholder="contraseña" />
            </div> */}
          </form>
          <div className="form-group">

            <button onClick={() => postUser({imageTitle, image, setImage})}>register</button>
          </div>
        </div>
        {/* <div className="register-form-container__left-container">
          <img src="../images/Cocodrilo.png" alt="Cocodrilo señalando register" />
        </div> */}
      </div>
    </>
  )
}  
