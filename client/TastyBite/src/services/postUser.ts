import axios from 'axios';
import { postImage } from './postImage';



export const postUser = async ({ image, setImage, setSuccess, errors, setErrors }) => {
  const username = document.getElementById('username') as HTMLInputElement
  const first_name = document.getElementById('first_name') as HTMLInputElement
  const last_name = document.getElementById('last_name') as HTMLInputElement
  const profile_description = document.getElementById('profile_description') as HTMLInputElement
  const email = document.getElementById('email') as HTMLInputElement
  const password1 = document.getElementById('password-1') as HTMLInputElement
  const password2 = document.getElementById('password-2') as HTMLInputElement


  if (!username.value) {
    console.error('Por favor, ingrese un nombre de usuario.');
    // añadimos el error al diccionario de errores, comprobando que no esté ya, para no repetirlo
    setErrors(prevErrors => ({
      ...prevErrors,
      username: 'Por favor, ingrese un nombre de usuario.',
    }));
  } else {
    // comprobamos que no tengamos una entrada en el diccionario de errores con username, y si la tenemos, la eliminamos
    // la quitamos del array de errores
    if (errors.username) {
      const { username, ...rest } = errors;
      setErrors(rest);
    }
  }

  if (!first_name.value) {
    console.error('Por favor, ingrese un nombre.');
    setErrors(prevErrors => ({
      ...prevErrors,
      first_name: 'Por favor, ingrese un nombre.',
    }));
  } else {
    if (errors.first_name) {
      const { first_name, ...rest } = errors;
      setErrors(rest);
    }
  }

  if (!last_name.value) {
    console.error('Por favor, ingrese un apellido.');
    setErrors(prevErrors => ({
      ...prevErrors,
      last_name: 'Por favor, ingrese un apellido.',
    }));
  } else {
    if (errors.last_name) {
      const { last_name, ...rest } = errors;
      setErrors(rest);
    }
  }

  if (!profile_description.value) {
    console.error('Por favor, ingrese una descripción de perfil.');
    setErrors(prevErrors => ({
      ...prevErrors,
      profile_description: 'Por favor, ingrese una descripción de perfil.',
    }));
  } else {
    if (errors.profile_description) {
      const { profile_description, ...rest } = errors;
      setErrors(rest);
    }
  }

  if (!email.value) {
    console.error('Por favor, ingrese un correo electrónico.');
    setErrors(prevErrors => ({
      ...prevErrors,
      email: 'Por favor, ingrese un correo electrónico.',
    }));
  } else {
    if (errors.email) {
      const { email, ...rest } = errors;
      setErrors(rest);
    }
  }

  if (password1.value !== password2.value) {
    console.error('Las contraseñas no coinciden');
    setErrors(prevErrors => ({
      ...prevErrors,
      password: 'Las contraseñas no coinciden',
    }));
  } else {
    if (errors.password) {
      const { password, ...rest } = errors;
      setErrors(rest);
    }
  }

  console.log('errors')
  console.log(errors);

  if (!password1.value || !password2.value) {
    console.error('Por favor, ingrese una contraseña.');
    setErrors(prevErrors => ({
      ...prevErrors,
      password: 'Por favor, ingrese una contraseña.',
    }));
  } else {
    if (errors.password1) {
      const { password, ...rest } = errors;
      setErrors(rest);
    }
  }

  let user = {}
  if (image) {
    const result = await postImage({ username: username.value, image, setImage})
    user = {
      username: username.value,
      first_name: first_name.value,
      last_name: last_name.value,
      profile_description: profile_description.value,
      profile_picture: result.image_id,
      email: email.value,
      password: password1.value,
    }
  } else {
    user = {
      username: username.value,
      first_name: first_name.value,
      last_name: last_name.value,
      profile_description: profile_description.value,
      profile_picture: "659fda2c77fcce812aa370a8",
      email: email.value,
      password: password1.value,
    }
  }

  console.log('user')
  console.log(user)
  
  const response = await axios.post(`https://teal-monkey-hem.cyclic.app/api/users`, user);
  if (response.status === 201) {
    setSuccess(true);

  } else {
    console.error('Error al registrar el usuario:', response.data.message);
  }
}