import './UploadRecipeForm.css'
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { PreviewImage } from './PreviewImage';
import { useNavigate } from 'react-router-dom';

const getCategoryList = async () => {
  try {
    const response = await fetch(`http://localhost:3000/categories`);
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
    const response = await fetch(`http://localhost:3000/ingredients`);
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
    const result = await axios.post('http://localhost:3000/images', formData, {
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


const postImages = async ({ titleRecipe, images }) => {
  if (!images) {
    console.error('Por favor, ingrese una imagen.');
    return;
  }

  console.log("HOLLLLAAA LÑAS images");
  console.log(images);
  
  let count = 0;
  const images_id = [];
  for (const image of images) {
    const formData = new FormData();
    formData.append('title', `recipe_picture${titleRecipe}_${count}`);
    formData.append('files', image);
    try {
      const result = await axios.post('http://localhost:3000/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Lógica adicional después de la carga exitosa
  
      images_id.push(result.data);
    } catch (error) {
      console.error('Error al cargar la imagen', error);
    }
    count++;
  }
  
  return images_id;
};


const postRecipe = async ({ steps, selectedIngredient, difficulty, images }) => {
  const title = document.getElementById('recipe-title') as HTMLInputElement
  const time = document.getElementById('recipe-time') as HTMLInputElement
  const number_servings = document.getElementById('recipe-servings') as HTMLInputElement


  const result = await postImages({ titleRecipe: title.value, images })

  // const recipe = {
  //   title: title.value,
  //   time: time.value,
  //   number_servings: number_servings.value,
  //   difficulty: difficulty,
  //   images: result,
  //   instructions: Object.values(steps),
  //   ingredients: selectedIngredient
  // }


  const recipe = {
    title: title.value,
    time: time.value,
    number_servings: number_servings.value,
    difficulty: difficulty,
    instructions: Object.values(steps),
    // ingredients: selectedIngredient.category_id
    images: imageId,


    
  }
  console.log(recipe);
  
  const response = await axios.post(`http://localhost:3000/recipes`, recipe);
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setImage(file || null);
  };

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


  const addImage= () => {
    setImages([...images, image]);

  };

  const postImage = async ({ image, setImageId }) => {
    const formData = new FormData();
    formData.append('title', `nueva`);
    formData.append('file', image);
    try {
      // Cambia la URL a la que corresponda en tu aplicación
      const result = await axios.post('http://localhost:3000/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Lógica adicional después de la carga exitosa
      console.log(result.data);
      setImageId(result.data);
    } catch (error) {
      console.error('Error al cargar la imagen', error);
    }
  }

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

    const [selectedIngredient, setSelectedIngredient] = useState(null);

    const handleIngredientChange = (event, id) => {
      setSelectedIngredient({ ingredient_id: id, value: event.target.value });
    };


    ////////////////////////


  return (
    <>
      <div className="breadcrumb">
        <a href="#">Tasty Bite</a> &gt; <a href="#">Subir una receta</a>
      </div>
      <div className="register-form-container">
        <div className="register-form-container__right-container">
          <h1>Sube una receta</h1>
          <form className="form-registe">
            
            <div className="register-form__left-containe">
            {steps.map((step, index) => (
              <div key={index}>
                {/* <input
                  type="text"
                  placeholder="Título del paso"
                  value={step.titulo}
                  onChange={(e) => {
                    const newStep = [...steps];
                    newStep[index].titulo = e.target.value;
                    setSteps(newStep);
                  }}
                /> */}
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
              <div className="form-group username">
                <div className="input-error-group">
                  <input type="text" id="recipe-title" placeholder="Título de la receta" />
                  {errors.username ? (
                    <p className="error-message">{errors.username}</p>
                  ) : (
                    <p className="error-message"></p>
                  )}
                </div>
              </div>
              <div className="form-group">
                  <div className="input-error-group">
                    <input type="text" id="recipe-time" placeholder="Tiempo estimado" />
                    {errors.username ? (
                      <p className="error-message">{errors.username}</p>
                    ) : (
                      <p className="error-message"></p>
                    )}
                  </div>
              </div>
              <div className="form-group username">
                <div className="input-error-group">
                  <input type="text" id="recipe-servings" placeholder="Número de raciones" />
                  {errors.username ? (
                    <p className="error-message">{errors.username}</p>
                  ) : (
                    <p className="error-message"></p>
                  )}
                </div>
              </div>
              <div className="form-group username">
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
            <div>
              <h1>Categorias</h1>
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
              {selectedCategory && (
                <p>Selected Category ID: {selectedCategory.category_id}</p>
              )}         
            </div>
            <div>
              <h1>Ingredientes</h1>
              {IngredientsList && IngredientsList.map((ingredient) => (
                <div key={ingredient.ingredient_id}>
                  <input
                    type="radio"
                    id={ingredient.ingredient}
                    name="ingredientGroup"
                    value={ingredient.ingredient}
                    checked={selectedIngredient && selectedIngredient.ingredient_id === ingredient.ingredient_id}
                    onChange={(event) => handleIngredientChange(event, ingredient.ingredient_id)}
                  />
                  <label htmlFor={ingredient.ingredient}>{ingredient.ingredient}</label>
                </div>
              ))}
              {selectedIngredient && (
                <p>Selected Ingredient ID: {selectedIngredient.ingredient_id}</p>
              )}
            </div>
            <button type="button" onClick={(e) => addImage(e)}>Agregar Imagen</button>
            <div className="register-form__right-container">
               <div className="recipe-image">
                 {/* <label htmlFor="image">Seleccionar imagen:</label>
                 <input type="file" id="image" accept="image/*" onChange={handleImageChange} /> */}
                  {images.map((image, index) => (
                    <div className="pueba" key={index}>

                      <PreviewImage key={index} setImage={setImage} />
                    </div>
                  ))}
               </div>
             </div>
            
          </form>
          
          <div className="form-group button">
            <button onClick={() => postRecipe({ steps, selectedIngredient, difficulty, images })}>Registrarse</button>
          </div>
          
        </div>
        
      </div>
    </>
  )
}  

