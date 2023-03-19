import logger from "../../utils/logger.js";

import ProductosRepo from "../persistencia/repos/ProductsRepo.js";

const prodsRepo = ProductosRepo.getInstancia();

const getProducts = async (req, res) => {
  try {
    if (req.params.id) return res.send(await prodsRepo.getById(req.params.id));
    else res.send(await prodsRepo.getAll());
  } catch (error) {
    logger.error(error.message);
  }
};

const addProduct = async (req, res) => {
  let { nombre, descripcion, foto, precio, stock, codigo } = req.body;
  precio = Number(precio);

  let timestamp = new Date().toLocaleString();
  try {
    prodsRepo.add({
      nombre,
      descripcion,
      foto,
      precio,
      stock,
      codigo,
      timestamp,
    });
    res.status(200).send("Producto agregado");
  } catch (error) {
    logger.error(error.message);
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const producto = req.body;

  try {
    await prodsRepo.modify(id, producto);
    res.status(200).send("Producto modificado");
  } catch (error) {
    logger.error(error.message);
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    await prodsRepo.removeById(id);
    res.status(200).send("Producto eliminado");
  } catch (error) {
    logger.error(error.message);
  }
};

export { getProducts, addProduct, updateProduct, deleteProduct };
