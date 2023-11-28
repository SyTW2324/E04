import './RegisterForm.css'
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { PreviewImage } from './PreviewImage';
import { useNavigate } from 'react-router-dom';



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
    const result = await axios.post('http://10.6.128.69:8080/api/images', formData, {
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


const postUser = async ({ image, setImage, setSuccess, errors, setErrors }) => {
  const username = document.getElementById('username') as HTMLInputElement
  const first_name = document.getElementById('first_name') as HTMLInputElement
  const last_name = document.getElementById('last_name') as HTMLInputElement
  const profile_description = document.getElementById('profile_description') as HTMLInputElement
  const email = document.getElementById('email') as HTMLInputElement
  const password1 = document.getElementById('password-1') as HTMLInputElement
  const password2 = document.getElementById('password-2') as HTMLInputElement


  if (!username.value) {
    console.error('Por favor, ingrese un nombre de usuario.');
    // añadimos el error al diccionario de errores, comprobando que no esté ya, para no repetirlo
    setErrors(prevErrors => ({
      ...prevErrors,
      username: 'Por favor, ingrese un nombre de usuario.',
    }));
  } else {
    // comprobamos que no tengamos una entrada en el diccionario de errores con username, y si la tenemos, la eliminamos
    // la quitamos del array de errores
    if (errors.username) {
      const { username, ...rest } = errors;
      setErrors(rest);
    }
  }

  if (!first_name.value) {
    console.error('Por favor, ingrese un nombre.');
    setErrors(prevErrors => ({
      ...prevErrors,
      first_name: 'Por favor, ingrese un nombre.',
    }));
  } else {
    if (errors.first_name) {
      const { first_name, ...rest } = errors;
      setErrors(rest);
    }
  }

  if (!last_name.value) {
    console.error('Por favor, ingrese un apellido.');
    setErrors(prevErrors => ({
      ...prevErrors,
      last_name: 'Por favor, ingrese un apellido.',
    }));
  } else {
    if (errors.last_name) {
      const { last_name, ...rest } = errors;
      setErrors(rest);
    }
  }

  if (!profile_description.value) {
    console.error('Por favor, ingrese una descripción de perfil.');
    setErrors(prevErrors => ({
      ...prevErrors,
      profile_description: 'Por favor, ingrese una descripción de perfil.',
    }));
  } else {
    if (errors.profile_description) {
      const { profile_description, ...rest } = errors;
      setErrors(rest);
    }
  }

  if (!email.value) {
    console.error('Por favor, ingrese un correo electrónico.');
    setErrors(prevErrors => ({
      ...prevErrors,
      email: 'Por favor, ingrese un correo electrónico.',
    }));
  } else {
    if (errors.email) {
      const { email, ...rest } = errors;
      setErrors(rest);
    }
  }

  if (password1.value !== password2.value) {
    console.error('Las contraseñas no coinciden');
    setErrors(prevErrors => ({
      ...prevErrors,
      password: 'Las contraseñas no coinciden',
    }));
  } else {
    if (errors.password) {
      const { password, ...rest } = errors;
      setErrors(rest);
    }
  }

  console.log('errors')
  console.log(errors);

  if (!password1.value || !password2.value) {
    console.error('Por favor, ingrese una contraseña.');
    setErrors(prevErrors => ({
      ...prevErrors,
      password: 'Por favor, ingrese una contrasña.',
    }));
  } else {
    if (errors.password1) {
      const { password, ...rest } = errors;
      setErrors(rest);
    }
  }

  console.log("LASSSS IMAGENESSSS")
  console.log(image);
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
  
  const response = await axios.post(`http://10.6.128.69:8080/api/users`, user);
  if (response.status === 201) {
    setSuccess(true);

  } else {
    console.error('Error al registrar el usuario:', response.data.message);
  }
}


export function RegisterForm() {
  const [image, setImage] = useState<File | null>(null);
  const [success, setSuccess] = useState<boolean>(null);
  const [errors, setErrors] = useState({});

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setImage(file || null);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate('/login');
    }
  }, [success]);

  
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
                  <div className="input-error-group">
                    <input type="text" id="username" placeholder="Nombre de usuario" />
                    {errors.username ? (
                      <p className="error-message">{errors.username}</p>
                    ) : (
                      <p className="error-message"> </p>
                    )}
                  </div>
                  <div className="input-error-group">
                    <input type="email" id="email" placeholder="Correo electrónico" />
                    {errors.email ? (
                      <p className="error-message">{errors.email}</p>
                    ) : (
                      <p className="error-message"> </p>
                    )}
                  </div>
               </div>
               <div className="form-group personal-data">
                <div className="input-error-group">
                  <input type="text" id="first_name" placeholder="Nombre" />
                  {errors.first_name ? (
                    <p className="error-message">{errors.first_name}</p>
                  ) : (
                    <p className="error-message"> </p>
                  )}
                </div>
                <div className="input-error-group">
                  <input type="text" id="last_name" placeholder="Apellidos" />
                  {errors.last_name ? (
                    <p className="error-message">{errors.last_name}</p>
                  ) : (
                    <p className="error-message"> </p>
                  )}

                </div>
               </div>
               <div className="form-group description">
                <div className="description input-error-group">
                  <input type="text" id="profile_description" placeholder="Descripción de perfil" />
                  {errors.profile_description ? (
                    <p className="error-message">{errors.profile_description}</p>
                  ) : (
                    <p className="error-message"> </p>
                  )}
                </div>
               </div>

              <div className="form-group password-register">
                <div className="input-error-group">
                  <input type="password" id="password-1" placeholder="Contraseña" />
                  {errors.password ? (
                    <p className="error-message">{errors.password}</p>
                  ) : (
                    <p className="error-message"> </p>
                  )}
                </div>
                <div className="input-error-group">
                  <input type="password" id="password-2" placeholder="Repetir Contraseña" />
                  {errors.password ? (
                    <p className="error-message">{errors.password}</p>
                  ) : (
                    <p className="error-message"> </p>
                  )}
                </div>
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
          
          <div className="form-group-postuser button">
            <button onClick={() => postUser({ username, image, setImage, setSuccess, errors, setErrors })}>Registrarse</button>
          </div>
          
        </div>
        
      </div>
    </>
  )
}  
