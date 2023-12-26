import React from "react";
import { useCategories } from "../../hooks/useCategories";
import { Link } from "react-router-dom";

export function ListCategory() {
  const { categories, isLoading } = useCategories();
  

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div>
      <h1>Categorias</h1>
      {categories && categories.map((category) => (
        <div key={category._id} >
        <h2>
          <Link to={`/categories/${category._id}`}>{category.category}</Link>
        </h2>
        <p>{category.description}</p>
      </div>
      ))}
    </div>
  )
}