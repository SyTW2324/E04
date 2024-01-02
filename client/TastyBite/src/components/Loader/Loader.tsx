

// export function Loader() {import React from 'react';
import { useEffect, useState } from 'react';
import './Loader.css'; // Importa los estilos del loader



export function Loader() {

  const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0);

  const emojisCocina= [
    // espatula
    '🍳',
    // cuchillo
    '🔪',
    // tenedor
    '🍴',
    // cuchara
    '🥄',
    // taza de te
    '🍵',
    // taza de cafe
    '☕',
    // copa de vino
    '🍷',
    // hamburguesa
    '🍔',
    
  ]


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentEmojiIndex((prevIndex) => (prevIndex + 1) % emojisCocina.length);
    }, 1000); // Cambia el emoji cada 1000 milisegundos (1 segundo)
  
    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);



  return (
    <div className="loader-container">
      <div className="loader-card">
        <span className="loader-emoji">
          {emojisCocina[currentEmojiIndex]}
        </span>
        <p>Cargando...</p>
      </div>
    </div>
  );
}