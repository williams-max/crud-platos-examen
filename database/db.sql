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


