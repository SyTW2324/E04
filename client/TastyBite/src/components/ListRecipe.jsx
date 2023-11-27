import './ListRecipes.css'
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';


const getRecipes = () => {
  return axios.get('http://localhost:3000/recipes')
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    })
}



export function ListRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getRecipes().then(recipes => {
      setRecipes(recipes);
    })
  }, [])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.get(`/api/recipes?search=${search}`)
      .then(response => {
        setRecipes(response.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <h1>Recipes</h1>
  );
}

