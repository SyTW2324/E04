import React from "react";
import { useCategories } from "../hooks/useCategories";

export function ListCategory() {
  const { categories, isLoading } = useCategories();
  

  return (
    <div>
      <h1>List Category</h1>
      {categories && categories.map((category) => (
        <div key={category._id}>
          <h2>{category.category}</h2>
          <p>{category.description}</p>
        </div>
      ))}
    </div>
  )
}