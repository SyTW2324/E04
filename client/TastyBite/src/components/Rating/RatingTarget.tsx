import React, { useState } from "react";
import "./RatingTarget.css";

export function RatingTarget() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="rating-target">
      <div className="rating-target__title"></div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label key={i}>
            <input 
              type="radio" 
              name="rating" 
              value={ratingValue} 
              onClick={() => setRating(ratingValue)}
              className="star-radio"
            />
            <span 
              className="star" 
              style={{color: ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}} 
              onMouseEnter={() => setHover(ratingValue)} 
              onMouseLeave={() => setHover(0)}
            >☆</span>
          </label>
        );
      })}
    </div>
  )
}