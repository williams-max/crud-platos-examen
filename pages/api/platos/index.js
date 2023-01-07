import { pool } from "config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getPlatos(req, res);
    case "POST":
      return await savePlatos(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const getPlatos = async (req, res) => {
  //SELECT * FROM myTable WHERE  DATE(myDate) = DATE(NOW())
  try {
    const results = await pool.query("SELECT * FROM plato where  DATE(inicioactividad) >= DATE(NOW())");
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

/*
const getPlatos = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM plato where  oferta=0 ");
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
*/
/*
const getPlatos = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM plato ");
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

*/

const savePlatos = async (req, res) => {
  try {
    const { 
      nombre,
      color,
      precio, 
      fecha ,
      inicioactividad ,
      oferta 

     } = req.body;

console.log("save",req.body)

    const result = await pool.query("INSERT INTO plato SET ?", {
      nombre,
      color,
      precio, 
      fecha ,
      inicioactividad ,
      oferta, 
    });

    return res.status(200).json({ ...req.body, id: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
