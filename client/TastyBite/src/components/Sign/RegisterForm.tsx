import './RegisterForm.css'
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { PreviewImage } from '../PreviewImage';
import { useNavigate } from 'react-router-dom';
import { postUser } from '../../services/postUser';


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
      console.log('success')
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
            <button id="button-register" onClick={() => postUser({ username, image, setImage, setSuccess, errors, setErrors })}>Registrarse</button>
          </div>
          
        </div>
        
      </div>
    </>
  )
}  
