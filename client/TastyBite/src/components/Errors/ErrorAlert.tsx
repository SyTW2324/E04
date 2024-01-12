import "./ErrorAlert.css";
import React from "react";



export function ErrorAlert() {
  return (
    <article className="error-alert__container">
      <div className="error-alert__message">
        <h1 className="error-alert__title">Woops! Parece que algo salió mal</h1>
        <p className="error-alert__paragraph">Por favor, intenta nuevamente</p>
      </div>
      <div className="error-alert__image-container">
        <img src="./CocodriloAsustado.png" alt="Error" />
      </div>
    </article>
  )
}