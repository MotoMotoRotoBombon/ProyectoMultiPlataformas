# AppRestShipping

## Descripción
Este proyecto es una aplicación RESTful que utiliza Node.js, Express, y MongoDB para manejar un sistema de envío. Incluye Swagger para la documentación de la API.

## Requisitos previos
Asegúrate de tener instalados los siguientes programas antes de comenzar:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/) (viene con Node.js)
- [MongoDB](https://www.mongodb.com/) (asegúrate de que el servicio esté corriendo en tu máquina o que tengas acceso a una instancia de MongoDB)

## Pasos para configurar y ejecutar el proyecto

### 1. Clonar el repositorio
Clona este repositorio en tu máquina local usando el siguiente comando:

### ```bash
git clone <URL_DEL_REPOSITORIO>
# Accede al directorio del proyecto clonado:
cd apprestshipping
# Instala todas las dependencias necesarias:
npm install


# Configurar variables de entorno
Crea un archivo .env en la raíz del proyecto y define las variables necesarias. Aquí tienes un ejemplo:
PORT=3020
CONNECTION_STRING=mongodb+srv://axsandovalbe:sABA020401HNENRXA3.@shipping.ctrsz.mongodb.net/

# Para ejecutar el proyecto en modo desarrollo con reinicios automáticos, utiliza el siguiente comando:
npm run dev
