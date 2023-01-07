## crud en react -next js 

#pasos para ejecutar el proyecto
paso 1 npm install
paso 2 npm run dev   (antes ejecutar este comando realize la conexico a la base de datos)

# configuracion de la el fucnionamiento de la base de datos
paso 1 usar una base de datos mysql
paso 2 cree una base de datos , ubicacion del script database/db.sql

CREATE DATABASE platosdb;

use platosdb;

CREATE TABLE plato(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(200),
color VARCHAR(200),
precio INT,
fecha date,
inicioactividad date,
oferta INT  

);

describe plato;


# conexion a la base de datos
Drigirase al archivo db.js  ubicado en la ruta config/db.js y cambie el user y root dependiendo de 
su credenciales de mysql

    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "platosdb",


# esta validacion se lo esta haciendo en backend ubicacion de archico pages/api/index.js

En la lista de platos se deben visualizar solo los platos activos. Un plato está activo cuando su fecha de inicio actividad es mayor o igual a hoy

 const results = await pool.query("SELECT * FROM plato where  DATE(inicioactividad) >= DATE(NOW())");
  
