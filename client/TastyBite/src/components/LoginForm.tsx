import axios from 'axios';
import './LoginForm.css'
import React, { useState, ChangeEvent, FormEvent } from 'react';


export function LoginForm({ setUser }) {
  const [data, setData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (event: any) => {
    setData({
      ...data,
      [event.target.id]: event.target.value
    })

  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      console.log('Formulario inválido');
      return false;
    } else {
      const res = await axios.post(`http://localhost:3000/users/login`, data);
      setUser(res.data);
    }
  }

  return (
    <>
      <div className="breadcrumb">
        <a href="#">Tasty Bite</a> &gt; <a href="#">Iniciar sesión</a>
      </div>
      <div className="login-form-container">

        <div className="login-form-container__right-container">
          <h1 className="login-title" >Iniciar Sesión</h1>
          <form onSubmit={handleSubmit} className="form-login">
            <div className="form-group">
              <input type="text" onChange={handleInputChange} value={data.username} id="username" placeholder="Nombre de usuario" />
            </div>
            <div className="form-group">
              <input type="password" onChange={handleInputChange} value={data.password} id="password" placeholder="Contraseña" />
            </div>
            <div className="form-group">
              <button type="submit">Iniciar Sesión</button>
            </div>
            <div className="login-form-container__right-container__register">
              <p>¿No tienes cuenta? <a href="#">Registrate</a></p>
            </div>
          </form>
        </div>
        <div className="login-form-container__left-container">
          <img src="../images/Cocodrilo.png" alt="Cocodrilo señalando login" />
        </div>
      </div>
    </>
  )
}