import "./Home.css";

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "./Header";
import { useCategories } from "../hooks/useCategories";
import { getCategories } from "../services/getCategories";
import { useCategoryStore } from "../state/store";


export function Home () {
  const categories = useCategoryStore((state: any) => state.categories);
  const setCategories = useCategoryStore((state: any) => state.setCategories);
  
  useEffect(() => {
    if (categories.length > 0) {
      return;
    }
    getCategories().then((data) => {
      setCategories(data);
    });
  }), [];

  return (
    <>
    <Header />
    <div className="categories__container">
    {categories && categories.map((category: any) => (
      <Link to={`/categories/${category._id}`} key={category._id} className="categories__label"> 
        <h1>{category.category}</h1>
      </Link>
    ))
    }
    </div>
    
    </>
  )
}

