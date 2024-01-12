import "./Home.css";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "./Header";
import { useCategories } from "../hooks/useCategories";
import { getCategories } from "../services/getCategories";
import { useCategoryStore } from "../state/store";
import { CategoryBubble } from "./Categories/CategoryBubble";


export function Home () {
  const categories = useCategoryStore((state: any) => state.categories);
  const setCategories = useCategoryStore((state: any) => state.setCategories);


  const [currentText, setCurrentText] = useState(" ");
  const [dynamicTextIndex, setDynamicTextIndex] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const dynamicTexts = ["Tasty Bite", "Comparte tus recetas con todo el mundo", "Todos somos cocineros en algún momento", "Cocina de calidad, al alcance de tu ratón"];

    const typeText = (text: string, charIndex: number) => {
      if (charIndex < text.length) {
        setCurrentText(text.substring(0, charIndex + 1));
        timeoutId = setTimeout(() => typeText(text, charIndex + 1), 100);
      } else {
        timeoutId = setTimeout(() => eraseText(text, text.length - 1), 6000); // Wait for 5 seconds
      }
    };

    const eraseText = (text: string, charIndex: number) => {
      if (charIndex > 0) {
        setCurrentText(text.substring(0, charIndex));
        timeoutId = setTimeout(() => eraseText(text, charIndex - 1), 100);
      } else {
        setCurrentText(" "); // Set to a single space instead of empty string
        setDynamicTextIndex((prevIndex) => (prevIndex + 1) % dynamicTexts.length);
      }
    };

    typeText(dynamicTexts[dynamicTextIndex], 0);

    return () => clearTimeout(timeoutId); // Clear timeout
  }, [dynamicTextIndex]);
  
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
    
    <div className="home-title-container">
      <h1 className="typewriter">
        {currentText}
      </h1>
    </div>

    
    <div className="home-container">
      <div className="home-text-container">
        <p>
        ¡Bienvenido a Tasty Bite! Decidir qué comer puede ser un dolor de cabeza, ¿verdad? Ya sea por falta de tiempo o por querer algo rápido y delicioso. Aquí aparece nuestra plataforma, donde conectamos a amantes de la comida de todo el mundo.
        Publica tus recetas o busca inspiración en las creaciones de otros. Queremos que disfrutes de la comida sin complicaciones, en un ambiente relajado y divertido. Únete a nosotros en Tasty Bite y haz que cada comida sea una experiencia única.
        </p>
        <Link className="home-button" to="/login">¡A comer se ha dicho!</Link>
      </div>

      <div className="home-image-container">
        <img className="home-img" src="./CocodriloCocinando.png" alt="Cocodrilo Chiquito" />
      </div>
    </div>

    <div className="wave">
      <img src="./wave-home.svg" alt="Wave" />
    </div>








    <section className="categories__container">
      {categories && categories.map((category: any) => (
        <CategoryBubble key={category._id} category={category} image={`./${category.category}-icon.svg`} /> 
        
      ))}
    </section>
    
    
    </>
  )
}

