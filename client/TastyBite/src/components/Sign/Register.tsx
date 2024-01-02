import React from 'react';
import { RegisterForm } from './RegisterForm';
import { Link } from 'react-router-dom';
import { Header } from '../Header';

export function Register() {
  return (
    <>
    <Header/>
    <div>
      <RegisterForm />

    </div>
    </>
  )
}