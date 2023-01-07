import { pool } from "config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getPlato(req, res);
    case "DELETE":
      return await deletePlato(req, res);
    case "PUT":
      return await updatePlato(req, res);
    default:
      return res.status(400).json({ message: "bad request" });
  }
}

const getPlato = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM plato WHERE id = ?", [
      req.query.id,
    ]);
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePlato = async (req, res) => {
  try {
    await pool.query("DELETE FROM plato WHERE id = ?", [req.query.id]);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePlato = async (req, res) => {
  try {
    console.log(req.body)
    await pool.query("UPDATE plato SET ? WHERE id = ?", [
      req.body,
      req.query.id,
    ]);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
