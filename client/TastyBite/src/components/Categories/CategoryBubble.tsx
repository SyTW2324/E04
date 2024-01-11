import { Link } from "react-router-dom";
import "./CategoryBubble.css";
import React, { useState } from 'react';

export function CategoryBubble({ category, image }) {
  const [isHovered, setIsHovered] = useState(false);

  return (

    <Link
      to={`/categories/${category._id}`}
      className={`category-bubble ${isHovered ? 'hovered' : ''}`}      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >
      {isHovered ? (
        <>
          <div className="category-bubble__image">
            <img src={image} alt={category.category} />
          </div>
          <h3 className="category-bubble__title">{category.description}</h3>
        </>
      ) : (
        <>
          <div className="category-bubble__image">
            <img src={image} alt={category.category} />
          </div>
          <h3 className="category-bubble__title">{category.category}</h3>
        </>
      )}
    </Link> 

  );
}