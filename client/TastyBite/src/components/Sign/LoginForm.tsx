import axios from 'axios';
import './LoginForm.css'
import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../state/store';
import { Link, useNavigate } from 'react-router-dom';
import { Footer } from '../Footer/Footer';

export function LoginForm({ setUser }) {
  const user = useUserStore((state: any) => state.user )
  const [success, setSuccess] = useState(null);

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

  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate('/profile');
    }
  }, [success]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      console.log('Formulario inválido');
      return false;
    } else {
      const res = await axios.post(`https://teal-monkey-hem.cyclic.app/api/users/login`, data);
      setUser(res.data);
      console.log(res.data);
      if (res.data.username) {
        setSuccess(true);
      }
      
    }
  }



  return (
    <>
      <div className="breadcrumb">
        <Link to="/">Tasty Bite</Link> &gt;
        <span>Iniciar sesión</span>
      </div>
      <div className="login-title-container">
        <h1 className="login-title" >Iniciar Sesión</h1>
      </div>
      <div className="login-form-container">
        <div className="login-form-container__right-container">
          <form onSubmit={handleSubmit} className="form-login">
            <div className="form-group">
              <input className="email" type="text" onChange={handleInputChange} value={data.username} id="username" placeholder="Nombre de usuario" />
            </div>
            <div className="form-group">
              <input className="password-login" type="password" onChange={handleInputChange} value={data.password} id="password" placeholder="Contraseña" />
            </div>
            <div className="form-group-login">
              <button type="submit">Iniciar Sesión</button>
            </div>
            <div className="login-form-container__right-container__register">
              <p>¿No tienes cuenta? <a href="#">Registrate</a></p>
            </div>
          </form>
        </div>
        <div className="login-form-container__left-container">
          <img src="../Cocodrilo.png" alt="Cocodrilo señalando login" />
        </div>
      </div>
      <Footer/>
    </>
  )
}