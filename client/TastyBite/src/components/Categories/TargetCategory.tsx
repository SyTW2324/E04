import React from 'react';


export function TargetCategory({ category }) {
  return (
    <section className="target-category">
      <h2>{category.name}</h2>
      <p>{category.description}</p>
    </section>
  )
}