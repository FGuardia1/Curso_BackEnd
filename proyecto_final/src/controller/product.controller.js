import logger from "../../utils/logger.js";

import ProductosRepo from "../persistencia/repos/ProductsRepo.js";

const prodsRepo = ProductosRepo.getInstancia();

import {
  obtenerProductos,
  agregarProducto,
  modificarProducto,
  eliminarProducto,
  obtenerXcategorias,
} from "../negocio/productos.business.js";

const getProducts = async (req, res) => {
  res.send(await obtenerProductos(req.params.id));
};

const getCategory = async (req, res) => {
  res.send(await obtenerXcategorias(req.params.categoria));
};

const addProduct = async (req, res) => {
  await agregarProducto(req.body);
  res.status(200).send("Producto agregado");
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const producto = req.body;

  await modificarProducto(id, producto);
  res.status(200).send("Producto modificado");
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;

  await eliminarProducto(id);
  res.status(200).send("Producto eliminado");
};

export { getProducts, addProduct, updateProduct, deleteProduct, getCategory };
