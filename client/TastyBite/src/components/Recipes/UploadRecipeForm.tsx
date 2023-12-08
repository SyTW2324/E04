import './UploadRecipeForm.css'
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { PreviewImage } from '../PreviewImage';
import { useNavigate } from 'react-router-dom';

const getCategoryList = async () => {
  try {
    const response = await fetch(`https://teal-monkey-hem.cyclic.app/api/categories`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};


const getIngredientList = async () => {
  try {
    const response = await fetch(`https://teal-monkey-hem.cyclic.app/api/ingredients`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};


const postImage = async ({ image }) => {
  const formData = new FormData();
  formData.append('title', `nueva`);
  formData.append('file', image);
  try {
    // Cambia la URL a la que corresponda en tu aplicación
    const result = await axios.post('https://teal-monkey-hem.cyclic.app/api/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Lógica adicional después de la carga exitosa
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.error('Error al cargar la imagen', error);
  }
}




const postRecipe = async ({ steps, selectedIngredients, difficulty, images, category }) => {
  const title = document.getElementById('recipe-title') as HTMLInputElement
  const time = document.getElementById('recipe-time') as HTMLInputElement
  const number_servings = document.getElementById('recipe-servings') as HTMLInputElement


  const imagePromises = images.map((image) => postImage({ image }));
  const imageIds = await Promise.all(imagePromises);

  console.log("HOLLLLAAA LÑAS imageIds");
  console.log(imageIds);

  const recipe = {
    title: title.value,
    time: time.value,
    number_servings: number_servings.value,
    difficulty: difficulty,
    instructions: Object.values(steps),
    category: category,
    images: imageIds,
    ingredients: selectedIngredients
  }
  console.log(recipe);
  
  const response = await axios.post(`https://teal-monkey-hem.cyclic.app/api/recipes`, recipe);
  if (response.status === 201) {
    console.log('Receta registrada correctamente');

  } else {
    console.error('Error al registrar el usuario:', response.data.message);
  }
}


export function UploadRecipeForm() {
  const [image, setImage] = useState<File | null>(null);
  const [success, setSuccess] = useState<boolean>(null);
  const [errors, setErrors] = useState({});

  // const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files && e.target.files[0];
  //   setImage(file || null);
  // };

  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate('/login');
    }
  }, [success]);
  


  /////// PASOS PARA la receta //
  const [numSteps, setNumSteps] = useState(1);
  // const [steps, setSteps] = useState([{ titulo: 'Paso 1: ', descripcion: '' }]);
  const [steps, setSteps] = useState([""]);


  const addStep = () => {
    setSteps([...steps, ""]);
    setNumSteps(numSteps + 1);

  };

  const deleteStep = (index) => {
    const newStep = [...steps];
    newStep.splice(index, 1);
    setSteps(newStep);
    setSteps(newStep);
  };
  

  ///


  /// dificultad
  const [difficulty, setDifficulty] = useState(null);

  const handleDifficulty = (difficulty) => {
    console.log(difficulty);
    setDifficulty(difficulty);
  };


  /////// images

  const [images, setImages] = useState<File[]>([]);



  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setImages((prevImages) => [...prevImages, ...filesArray]);
    }
  };


  const removeImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };
  
  // const [imageId, setImageId] = useState(null);
  // useEffect(() => {
  //   if (image) {
  //     postImage({ image, setImageId });
  //   }
  
  
  // }, [images]);




  ////////////////////////// 
  const [CategoriesList, setCategoriesList] = useState(null);

  useEffect(() => {
    getCategoryList().then((data) => {
      setCategoriesList(data);
    });
    }, []);

    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryChange = (event, id) => {
      setSelectedCategory({ category_id: id, value: event.target.value });
    };
    ////////////////////////
    const [IngredientsList, setIngredientsList] = useState(null);

  useEffect(() => {
    getIngredientList().then((data) => {
      setIngredientsList(data);
    });
  }, []);

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const handleIngredientChange = (event: React.ChangeEvent<HTMLInputElement>, ingredientId: string) => {
    if (event.target.checked) {
      setSelectedIngredients(prevIngredients => [...prevIngredients, ingredientId]);
    } else {
      setSelectedIngredients(prevIngredients => prevIngredients.filter(id => id !== ingredientId));
    }
  };

    ////////////////////////


  return (
    <>
      <div className="breadcrumb">
        <a href="#">Tasty Bite</a> &gt; <a href="#">Subir una receta</a>
      </div>
      <div className="upload-recipe-form-container">
        <div className="upload-recipe-form-container__right-container">
          <h1>Sube una receta</h1>
          <form className="form-upload-recipe">
            <div className="upload-recipe-form__left-containe">
            {steps.map((step, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Descripción del paso"
                  value={step}
                  onChange={(e) => {
                    const newStep = [...steps];
                    newStep[index] = e.target.value;
                    setSteps(newStep);
                  }}
                />
                <button type="button" onClick={() => deleteStep(index)}>Eliminar Paso</button>
              </div>
            ))}
            <button type="button" onClick={(e) => addStep(e)}>Agregar Paso</button>
              <div className="form-group title">
                <div className="input-error-group">
                  <input type="text" id="recipe-title" placeholder="Título de la receta" />
                  {errors.title ? (
                    <p className="error-message">{errors.title}</p>
                  ) : (
                    <p className="error-message"></p>
                  )}
                </div>
              </div>
              <div className="form-group">
                  <div className="input-error-group">
                    <input type="text" id="recipe-time" placeholder="Tiempo estimado" />
                    {errors.time ? (
                      <p className="error-message">{errors.time}</p>
                    ) : (
                      <p className="error-message"></p>
                    )}
                  </div>
              </div>
              <div className="form-group servings">
                <div className="input-error-group">
                  <input type="text" id="recipe-servings" placeholder="Número de raciones" />
                  {errors.servings ? (
                    <p className="error-message">{errors.servings}</p>
                  ) : (
                    <p className="error-message"></p>
                  )}
                </div>
              </div>
              <div className="form-group difficulty">
                <button
                  type="button"
                  onClick={() => handleDifficulty('easy')}
                  className={difficulty === 'easy' ? 'active' : ''}
                >
                  Fácil
                </button>

                <button
                  type="button"
                  onClick={() => handleDifficulty('medium')}
                  className={difficulty === 'medium' ? 'active' : ''}
                >
                  Intermedio
                </button>

                <button
                  type="button"
                  onClick={() => handleDifficulty('hard')}
                  className={difficulty === 'hard' ? 'active' : ''}
                >
                  Difícil
                </button>
              </div>
            </div>
            <div className="form-group category">
              <p>Seleccione la categoría de la receta</p>
              {CategoriesList && CategoriesList.map((category) => (
                <div key={category.category_id}>
                  <input
                    type="radio"
                    id={category.category}
                    name="categoryGroup"
                    value={category.category}
                    checked={selectedCategory && selectedCategory.category_id === category.category_id}
                    onChange={(event) => handleCategoryChange(event, category.category_id)}
                  />
                  <label htmlFor={category.category}>{category.category}</label>
                </div>
              ))}         
            </div>
            <div className="form-group ingredient">
            <p>Seleccione los ingredientes de la receta</p>
              {IngredientsList && IngredientsList.map((ingredient) => (
                <div key={ingredient.ingredient_id}>
                <input
                  type="checkbox"
                  id={ingredient.ingredient_id}
                  name="ingredientGroup"
                  value={ingredient.ingredient_id}
                  checked={selectedIngredients.includes(ingredient.ingredient_id)}
                  onChange={(event) => handleIngredientChange(event, ingredient.ingredient_id)}
                />
                <label htmlFor={ingredient.ingredient}>{ingredient.ingredient}</label>
              </div>
              ))}
            </div>
            <div className="upload-recipe-form__right-container">
              <input type="file" id="image" accept="image/*" onChange={handleImageChange} multiple />

                {images.map((image, index) => (
                  <div key={index} className="recipe-image">
                    <img src={image} alt={`Imagen ${index + 1}`} />
                    <button onClick={() => removeImage(index)}>Eliminar imagen</button>
                  </div>
                ))}
            </div>
          </form>
          
          <div className="form-group-postrecipe button">
            <button onClick={() => postRecipe({ steps, selectedIngredients, difficulty, images, category: selectedCategory.category_id })}>Subir receta</button>
          </div>
          
        </div>
        
      </div>
    </>
  )
}  

