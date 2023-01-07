import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { Alert, Checkbox } from "@mui/material";

export function ProductForm() {
  const [data, setData] = useState({
    nombre: "",
    color: "",
    precio: 0,
    fecha: null,
    inicioactividad: null,
    oferta: 0,
  });

  const [activo, SetActivo] = useState(false)
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async (id) => {
      try {
        const { data } = await axios.get("/api/platos/" + id);
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (router.query?.id) {
      fetchProduct(router.query.id);
    }
    console.log("called");
  }, [router.query.id]);

  const handleChange = ({ target: { name, value } }) =>

    setData({ ...data, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    var precioV = data.precio;


    if (precioV <= 25 && precioV >= 9) {

      try {
        if (router.query?.id) {
          await axios.put("/api/platos/" + router.query.id, {

            nombre: data.nombre,
            color: data.color,
            precio: data.precio,
            fecha: data.fecha,
            inicioactividad: data.inicioactividad,
            oferta: data.oferta,

          });
          toast.success("Platos Updated", {
            position: "bottom-center",
          });
        } else {
          await axios.post("/api/platos", data);
          toast.success("Plato Saved", {
            position: "bottom-center",
          });
        }

         router.push("/platos");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      Alert("Precio establecio (9-25)")
    }

  };

  const manejarCheck = (value) => {
    console.log("value", value)
  }

  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
            htmlFor="nombre"
          >
            Nombre del plato
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            type="text"
            placeholder="nombre"
            id="nombre"
            name="nombre"
            onChange={handleChange}
            value={data.nombre}
            autoComplete="off"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="color"
            className="block text-gray-700 dark:text-white font-bold mb-2 text-sm"
          >
            Color:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            name="color"
            placeholder="color"
            onChange={handleChange}
            value={data.color}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="precio"
            className="block text-gray-700 dark:text-white font-bold mb-2 text-sm"
          >
            Precio : Rango 9-25
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            name="precio"
            placeholder="precio"
            min="9"
            max="25"
            onChange={handleChange}
            value={data.precio}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="fecha"
            className="block text-gray-700 dark:text-white font-bold mb-2 text-sm"
          >
            fecha:
          </label>
          <input
            type="date"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            name="fecha"
            placeholder=""
            onChange={handleChange}
            value={data.fecha}
          />
        </div>


        <div className="mb-4">
          <label
            htmlFor="inicioactividad"
            className="block text-gray-700 dark:text-white font-bold mb-2 text-sm"
          >
            Inicio Actividad:
          </label>
          <input
            type="date"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            name="inicioactividad"
            placeholder="Inicio Actividad"
            onChange={handleChange}
            value={data.inicioactividad}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="oferta"
            className="block text-gray-700 dark:text-white font-bold mb-2 text-sm"
          >
            Oferta Si=0 No=1:
          </label>
          <input
            type="number"
            name="oferta"
            max="1"
            min="0"
            placeholder="activo=0 , inactivo=1"
            onChange={handleChange}
            value={data.oferta}
          />
        </div>



        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {router.query?.id ? "Update Product" : "Save Product"}
        </button>
      </form>
    </div>
  );
}
