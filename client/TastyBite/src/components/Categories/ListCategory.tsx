import React from "react";
import { Link } from "react-router-dom";
import { Header } from "../Header";
import { Categories } from "./Categories";
import { Footer } from "../Footer/Footer";

export function ListCategory() {
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
        <Categories />
      </div>
    </div>
    <Footer/>
    </>
  )
}