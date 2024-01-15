import React from "react";
import "./Categories.css";
import { useCategories } from "../../hooks/useCategories";
import { Loader } from "../Loader/Loader";
import { TargetCategory } from "./TargetCategory";

export function Categories() {
  const { categories, isLoading } = useCategories();
  
  if (isLoading || !categories) {
    return <Loader />;
  }

  const midIndex = Math.floor(categories.length / 2);
  const firstHalf = categories.slice(0, midIndex);
  const secondHalf = categories.slice(midIndex);
  

  return (
    <>
      <section className="categories-home__container">
        <div className="categories-home__columns-categories">
          {firstHalf.map((category) => (
            <TargetCategory key={category._id} category={category} />
            ))}
        </div>
        <div className="categories-home__image-container">
          <img  src="./CocodriloInformatico.png" alt="imagen de cocodrilo en categorias" />
        </div>
        <div className="categories-home__columns-categories">
          {secondHalf.map((category) => (
            <TargetCategory key={category._id} category={category} />
            ))}
        </div>
      </section>
    </>
  );
}