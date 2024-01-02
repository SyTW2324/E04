import React from 'react';
import { UploadRecipeForm } from './UploadRecipeForm';
import { Link } from 'react-router-dom';
import { Header } from '../Header';


export function UploadRecipe() {
  return (
    <>
    <Header/>
    <div>
      <UploadRecipeForm />

    </div>
    </>
  )
}