// Sidebar.js
import React from 'react';
import './Sidebar.css'; // Asegúrate de tener un archivo de estilos para el Sidebar

const Sidebar = ({ isVisible, onClose }) => {
  return (
    <div className={`sidebar ${isVisible ? 'visible' : ''}`}>
      {/* Contenido del sidebar */}
      <p>Información del Sidebar</p>
      <button onClick={onClose}>Cerrar Sidebar</button>
    </div>
  );
};

export default Sidebar;
