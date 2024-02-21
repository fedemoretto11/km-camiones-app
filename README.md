🇪🇸 Español  

# Contador de KM de empleados v1.0.0
## Trabajo para Rodolfo Moretto SRL


### Descripcion 

El proyecto fue desarrollado para la distribuidora oficial de Arcor, Rodolfo Isidro Moretto SRL, con el objetivo de abordar una necesidad específica: llevar un registro detallado de cada empleado, vehículo y los kilómetros recorridos por el personal durante el mes. Este registro organizado es esencial para calcular el total mensual de kilómetros recorridos por cada miembro del equipo, lo que permite realizar los pagos correspondientes según el recorrido total realizado.

### Tecnologias utilizadas
- Next.JS
- TypeScript
- Tailwind CSS
- Firebase Firestore

### Pre-requisitos

_En caso de que quieras utilizar el repositorio necesitas:_

```
-  Node.js
-  Editor de codigo de su gusto
-  Usuario en Firebase de google

```

### Inicializacion del proyecto


1. Abre una consola CMD y clona el repositorio a tu maquina local del siguiente Link

    ```bash
      git clone https://github.com/fedemoretto11/km-camiones-app
    ```
1. Ejecuta el comando `km-camiones-app` para acceder a la carpeta que contiene el proyecto
1. Instala las depencias necesarias del proyecto utilizando `npm install` o `npm i`
1. Actualiza la informacion en el archivo `.env` de acuerdo a los datos de tu Firestore Database
1. Ejecuta `npm run dev` para inicializar el proyecto


### Dependencias


```
@heroicons/react: v2.1.1              || Conjunto de iconos de alta calidad para React.
clsx: v2.1.0                          || Utilidad para concatenar nombres de clase de manera condicional.
firebase: v10.7.1                     || Plataforma de desarrollo de aplicaciones web y móviles.
next: v14.0.4                         || Framework de React para aplicaciones web.
react: v18                            || Biblioteca principal para interfaces de usuario en React.
react-dom: v18                        || Renderizador DOM para React.
use-debounce: v10.0.0                 || Hook para debouncing en React.
zod: v3.23.0-canary.20231004T224911   || Biblioteca para validación de esquemas en TypeScript.

```

### Proximas implementaciones


-  **Mejora sistema validaciones:** Se espera desarrollar mejoras en el sistema de validacion de los formularios.
-  **Mejora user experience y UI:** Se espera desarrollar mejoras en la experiencia del usuario y en la visualizacion.
-  **Migracion base de datos:** Firestore es una base de datos de forma provisoria, se espera migrar a MongoDB o analizar la posibilidad de utilizar una base de datos relacional.
-  **Ingreso al sistema:** Se espera desarrollar un ingreso al sistema a traves de usuario registrado.


---

🇺🇸 English  

# Kilometers Counter for Employees v1.0.0
## Work for Rodolfo Moretto SRL

### Description

The project was developed for the official distributor of Arcor, Rodolfo Isidro Moretto SRL, with the aim of addressing a specific need: to maintain a detailed record of each employee, vehicle, and the kilometers traveled by staff during the month. This organized record is essential for calculating the total monthly kilometers traveled by each team member, enabling the corresponding payments to be made according to the total distance covered.

### Technologies used
- Next.JS
- TypeScript
- Tailwind CSS
- Firebase Firestore

### Prerequisites

_In case you want to use the repository, you will need:_

```
-  Node.js
-  Code Editor of your choise
-  Google Firebase account

```

### Project initialization


1. Open a CMD console and clone the repository to your local machine from the following link:

    ```bash
      git clone https://github.com/fedemoretto11/km-camiones-app
    ```
1. Run the command `cd km-camiones-app` to navigate to the folder containing the project.
1. Install the necessary dependencies of the project using `npm install` or `npm i`.
1. Update the information in the `.env` file according to your Firestore Database data.
1. Run `npm run dev` to initialize the project.


### Dependencies


```
@heroicons/react: v2.1.1              || High-quality icon set for React.
clsx: v2.1.0                          || Utility for conditional class concatenation.
firebase: v10.7.1                     || Platform for web and mobile app development.
next: v14.0.4                         || React framework for web applications.
react: v18                            || Core library for user interfaces in React.
react-dom: v18                        || DOM renderer for React.
use-debounce: v10.0.0                 || Debouncing hook for React.
zod: v3.23.0-canary.20231004T224911   || Library for schema validation in TypeScript.

```

### Next implementetions


-  **Enhanced Validation System:** Plans to enhance the form validation system are in progress.
-  **Improved User Experience and UI:** Upcoming improvements will focus on enhancing user experience and visualization.
-  **atabase Migration:** Considering migrating from Firestore to MongoDB or exploring the possibility of using a relational database.
-  **System Login:** Development of a user login system is anticipated, enabling access for registered users.





