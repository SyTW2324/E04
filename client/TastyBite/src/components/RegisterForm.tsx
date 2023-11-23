import './RegisterForm.css'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { PreviewImage } from './PreviewImage';


const postImage = async ({ username, image, setImage}) => {
  if (!image) {
    console.error('Por favor, ingrese una imagen.');
    return;
  }
  const formData = new FormData();
  formData.append('title', `profile_picture_${username}`);
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


const postUser = async ({ image, setImage, setSuccess}) => {

  const username = document.getElementById('username') as HTMLInputElement
  const first_name = document.getElementById('first_name') as HTMLInputElement
  const last_name = document.getElementById('last_name') as HTMLInputElement
  const profile_description = document.getElementById('profile_description') as HTMLInputElement
  const email = document.getElementById('email') as HTMLInputElement
  const password1 = document.getElementById('password-1') as HTMLInputElement
  const password2 = document.getElementById('password-2') as HTMLInputElement

  if (password1.value !== password2.value) {
    console.error('Las contraseñas no coinciden');
    return;
  }


  const result = await postImage({ username: username.value, image, setImage})

  const user = {
    username: username.value,
    first_name: first_name.value,
    last_name: last_name.value,
    profile_description: profile_description.value,
    profile_picture: result.image_id,
    email: email.value,
    password: password1.value,
  }

  console.log(user);
  
  const response = await axios.post(`http://localhost:3000/users`, user);
  if (response.status === 201) {
    setSuccess(true);
  } else {
    console.error('Error al registrar el usuario:', response.data.message);
  }
}


export function RegisterForm() {
  const [image, setImage] = useState<File | null>(null);
  const [success, setSuccess] = useState<boolean>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setImage(file || null);
  };
  
  return (
    <>
      <div className="breadcrumb">
        <a href="#">Tasty Bite</a> &gt; <a href="#">Registro de usuario</a>
      </div>
      <div className="register-form-container">
        <div className="register-form-container__right-container">
          <h1>Registro de usuario</h1>
          <form className="form-register">
            
            <div className="register-form__left-container">
               <div className="form-group username">
                 <input type="text" id="username" placeholder="Nombre de usuario" />
                <input type="email" id="email" placeholder="Correo electrónico" />
               </div>
               <div className="form-group personal-data">
                 <input type="text" id="first_name" placeholder="Nombre" />
                 <input type="text" id="last_name" placeholder="Apellidos" />
               </div>
               <div className="form-group description">
                 <input type="text" id="profile_description" placeholder="Descripción de perfil" />
               </div>

              <div className="form-group password">
                <input type="password" id="password-1" placeholder="Contraseña" />
                <input type="password" id="password-2" placeholder="Repetir Contraseña" />
              </div>
            </div>
            <div className="register-form__right-container">
              
               <div>
                 {/* <label htmlFor="image">Seleccionar imagen:</label>
                 <input type="file" id="image" accept="image/*" onChange={handleImageChange} /> */}
                  <PreviewImage setImage={setImage} />
               </div>
             </div>
            
          </form>
          <div className="form-group button">
            <button onClick={() => postUser({ username, image, setImage, setSuccess })}>Registrarse</button>
          </div>
          {success && <div>Usuario registrado correctamente</div>}



        </div>
        
      </div>
    </>
  )
}  
