# Tasty Bite
## Por Daniel Felipe Gómez Aristizabal y Facundo José García Gallo

[![Coverage Status](https://coveralls.io/repos/github/SyTW2324/E04/badge.svg?branch=release/v0.1)](https://coveralls.io/github/SyTW2324/E04?branch=release/v0.1)

### Introducción

Muchas veces una tarea que hacemos diariamente como puede ser elegir qué comer se hace muy difícil, a veces no encontramos algo que se pueda hacer en poco tiempo, otras veces la cartera nos pone un límite del que queremos prescindir o quizás simplemente tenemos pereza y queremos comer lo antes posible.

Es por esto que hemos decidido hacer una aplicación web donde se puede acceder a los perfiles de personas interesadas en el mundo gastronómico, desde allí se podrá colgar recetas propias, atendiendo a diferentes categorías o consultar las recetas de otras personas desde cualquier parte del mundo. Con esta idea desarrollaremos los distintos objetivos que se nos marquen en la asignatura para el desarrollo del proyecto.


### Distribución del código

La distribución del código es relativamente sencilla, en el directorio raíz del proyecto existen dos grandes subdirectorios, `client` y `server`. En el primero se encuentra todo el código relativo al cliente, es decir, la aplicación web que se ejecutará en el navegador del usuario, mientras que en el segundo se encuentra todo el código relativo al servidor, es decir, la aplicación que se ejecutará en el servidor y que se encargará de servir la aplicación web al usuario. Si profundizamos en cada una podemos ver lo siguiente.

En la parte del cliente tenemos una carpeta donde se alojan las pruebas del frontend llamada `cypress`, otra carpeta donde se alojan los componentes de la aplicación web llamada `TastyBite` y todos los ficheros de configuración necesarios para la implementación de la aplicación web. Si queremos llegar a los componentes de React debemos acceder a la carpeta `src`.

### Organización de ramas

En cuanto a las ramas podemos decir que nos encontramos trabajando plenamente en paralelo a la rama `main`, ya que queremos reservar esta rama para la versión final de la aplicación web. Por lo tanto, hemos creado una rama `release/v0.1` donde se encuentra una versión medianamente estable. Al mismo tiempo nos encontramos trabajando en ramas paralelas a esta última y haciendo merges para el correcto worflow de Git.

### Despliegue

En cuanto al despliegue debemos decir que trabajamos con diferentes servicios para poder desplegar de forma gratuita toda la aplicación, tanto el frontend como el backens, sin embargo esto nos llevó a muchos problemas de configuración y de compatibilidad entre los servicios. En conclusión, tenemos desplegada la aplicación web en los siguientes servicios:

Por un lado tenemos la base de datos desplegada en Mongo Atlas, un servicio de bases de datos en la nube que nos permite tener una base de datos de forma gratuita, la string para la conexión con dicho clúster es la siguiente:

mongodb+srv://<nombre_usuario>:<contraseña>@clustertastybite.x3snrwb.mongodb.net/tasty-bite-api

Para el lado del backend, hemos desplegado la aplicación en Cyclic, un servicio de hosting en la nube que nos permite tener una aplicación web en la nube de forma gratuita, el enlace a esta API es el siguiente:

https://teal-monkey-hem.cyclic.app/

Por último tenemos el frontend desplegado en Netlify, otro servicio de hosting en la nube que nos permite tener una aplicación web en la nube de forma gratuita, el enlace es el siguiente:

https://tasty-bite-sytw.netlify.app/


### Instalación

Si deseamos instalar la aplicación web en local debemos tener en cuenta algunas cosas. La raíz del proyecto tiene un fichero `package.json` con un script en el que se instalan las dependencias de la aplicación web, para ejecutarlo simplemente realizar `npm run install-all`. A continuación tenemos todas las librerías necesarias para la ejecución de la aplicación web. 