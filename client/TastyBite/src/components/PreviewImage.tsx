
import './PreviewImage.css';
import React, { useState } from 'react';

export const PreviewImage = ({ setImage }) => {
  const [imagenPrevisualizada, setImagenPrevisualizada] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagenPrevisualizada(reader.result);
      };

      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  return (
    <div>
      <label htmlFor="image">Seleccionar imagen:</label>
      <input type="file" id="image" accept="image/*" onChange={handleImageChange} />

      {imagenPrevisualizada ? (
        <div className="preview-image-container">
          <img src={imagenPrevisualizada} alt="Previsualización" style={{ maxWidth: '100%' }} />
        </div>
      ) : (
        <div className="preview-image-container">
          <img src="../../images/CocodriloCorbata.jpg" alt="Imagen predeterminada" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};


