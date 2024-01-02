import React from 'react'
import { Link } from 'react-router-dom'
import { ListRecipes } from './ListRecipes'
import { Header } from '../Header'


export function Recipes() {
  return (
    <>
    <Header/>
    <div>
      <ListRecipes />

    </div>
    </>
  )
}
