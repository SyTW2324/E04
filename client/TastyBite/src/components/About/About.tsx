import React from "react";
import './About.css'
import { Header } from "../Header";
import { Link } from "react-router-dom";
import { Footer } from "../Footer/Footer";

const redirectToGitHubFacu = () => {
  window.open('https://github.com/facu2002', '_blank');
};

const redirectToGitHubDani = () => {
  window.open('https://github.com/DanielFelipeGomez', '_blank');
};


export function AboutPage() {

  return (
    <>
      <Header/>
      <div className="breadcrumb">
        <Link to="/">Tasty Bite</Link> &gt;
        <span>Sobre nosotros</span>
      </div>
      <div className="about-title-container">
        <h1 className="about-title" >Sobre Nosotros</h1>
      </div>
      <hr className="separator"></hr>

      <div className="about-text-container">
        <div className="about-title-text-container">
          <h2 className="about-text-title">Objetivo</h2>
          <p className="about-text">
            Muchas veces una tarea que hacemos diariamente como puede ser elegir qué comer se hace muy difícil, a veces no encontramos algo que se pueda hacer en poco tiempo, otras veces la cartera nos pone un límite del que queremos prescindir o quizás simplemente tenemos pereza y queremos comer lo antes posible. Es por esto que hemos decidido hacer una aplicación web donde se puede acceder a los perfiles de personas interesadas en el mundo gastronómico, desde allí se podrá colgar recetas propias, atendiendo a diferentes categorías o consultar las recetas de otras personas desde cualquier parte del mundo. Con esta idea desarrollaremos los distintos objetivos que se nos marquen en la asignatura para el desarrollo del proyecto.
          </p>
        </div>
        <div className="about-text-img">
          <img className="about-img" src="./CocodriloChiquito.png" alt="Cocodrilo Chiquito" />
        </div>
      </div>

      <hr className="separator"></hr>
      <div className="about-nosotros-container">
        <div className="about-nosotros-title">
          <h2>¿Quiénes somos?</h2>
        </div>
        <div className="about-nosotros-text-container">

          <div className="about-dani-text-container">
            <h3>Daniel Gómez</h3>
            <p className="about-text">
              Estudiante de último año de Ingeniería Informática, actualmente cursando la asignatura de Sistemas y Tecnologías Web.
              Una de las dos mentes detras de Tasty Bite. Tras la constante en la tarea de decidir qué cocinar y las pocas ideas que 
              en ese momento de hambre se me ocurren, decidí junto a mi compañero Facundo crear una plataforma donde poder compartir
              recetas para aprovechar esos momentos de inspiración y poder ayudar a otras personas a decidir qué cocinar.
              Espero que disfrutes de la plataforma y que te sea de ayuda tanto como lo es para nosotros.
              Recuerda mundo de la cocina es muy amplio y siempre hay algo nuevo que aprender, así que no dudes en compartir tus recetas con nosotros.
            </p>
            <div className="about-dani-links-container">
              <div className="form-group-login">
                <button type="button" onClick={redirectToGitHubDani}>
                  Mi perfil de GitHub
                </button>
              </div>
            </div>
            <img className="dani-img" src="./Dani.jpg" alt="Dani" />
          </div>

          <div className="about-facu-text-container">
            <h3>Facundo García</h3>
            <p className="about-text">
              Alumno de Sistemas y Tecnologías Web, asignatura del cuarto curso del grado de Ingeniería Informática de la Universidad de La Laguna.
              Uno de los cofundadores detrás de Tasty Bite. Permíteme contarte un poco más sobre quién soy y cómo llegamos a esta emocionante aventura gastronómica.
              Desde siempre he sentido una conexión especial con el mundo de la comida. Mi amor por la cocina se ha desarrollado a lo largo de los años, inspirado por recetas familiares, exploraciones culinarias y momentos compartidos alrededor del mundo. Creo firmemente que la comida tiene el poder de unir a las personas y contar historias, y eso es lo que queremos lograr con nuestra plataforma.
              Mi viaje en el mundo gastronómico ha estado lleno de experimentación y descubrimientos. He explorado diferentes cocinas, he perfeccionado recetas familiares y he compartido mi pasión con amigos y familiares. La idea de crear una plataforma donde la gente pueda compartir y descubrir recetas de todo el mundo me entusiasma enormemente.
            </p>
            <div className="about-facu-links-container">
              <div className="form-group-login">
                <button type="button" onClick={redirectToGitHubFacu}>
                  Mi perfil de GitHub
                </button>
              </div>
            </div>
            <img className="facu-img" src="./Facu.jpg" alt="Facu" />

          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}