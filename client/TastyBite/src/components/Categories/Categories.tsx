import "./Categories.css";
import React from "react";
import { useCategories } from "../../hooks/useCategories";
import { Loader } from "../Loader/Loader";

export function Categories() {
  const { categories, isLoading } = useCategories();
  
  if (isLoading || !categories) {
    return <Loader />;
  }

  const midIndex = Math.floor(categories.length / 2);
  const firstHalf = categories.slice(0, midIndex);
  const secondHalf = categories.slice(midIndex);
  

  return (
    <section class>
      <div>
        {firstHalf.map((category) => (
          <div key={category._id}>{category.category}</div>
        ))}
      </div>
      <img src="./CocodriloInformatico.png" alt="imagen de cocodrilo en categorias" />
      <div>
        {secondHalf.map((category) => (
          <div key={category._id}>{category.category}</div>
        ))}
      </div>
    </section>
  );
}