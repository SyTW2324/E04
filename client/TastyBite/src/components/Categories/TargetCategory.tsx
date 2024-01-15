import './TargetCategory.css';
import { Link } from 'react-router-dom';
import React from 'react';


export function TargetCategory({ category }) {
  return (
    <Link
      to={`/categories/${category._id}`}
      className="target-category__container">
      <h2 className="target-category__title">{category.category}</h2>
      <p className="target-category__paragraph">{category.description}</p>
    </Link>
  )
}