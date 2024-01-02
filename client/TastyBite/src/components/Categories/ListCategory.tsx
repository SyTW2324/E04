import React from "react";
import { useCategories } from "../../hooks/useCategories";
import { Link } from "react-router-dom";
import { Header } from "../Header";
import { Loader } from "../Loader/Loader";

export function ListCategory() {
  const { categories, isLoading } = useCategories();
  

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
    <Header/>
    <div>
      <div className="breadcrumb">
        <Link to="/">Tasty Bite</Link> &gt;
        <span>Categorías de recetas</span>
      </div>
      <div className="profile-title-container">
        <h1 className="profile-title" >Categorías</h1>
      </div>
      {categories && categories.map((category) => (
        <div key={category._id} >
        <h2>
          <Link to={`/categories/${category._id}`}>{category.category}</Link>
        </h2>
        <p>{category.description}</p>
      </div>
      ))}
    </div>
    </>
  )
}