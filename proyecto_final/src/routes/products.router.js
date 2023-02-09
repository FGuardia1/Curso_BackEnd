import express from "express";
import passport from "passport";
const routerProduct = express.Router();
import logger from "../../utils/logger.js";
import { productosDAO } from "../daos/index.js";

routerProduct.get("/:id?", async (req, res) => {
  try {
    if (req.params.id)
      return res.send(await productosDAO.getById(req.params.id));
    else res.send(await productosDAO.getAll());
  } catch (error) {
    logger.error(error.message);
  }
});

routerProduct.post("/", async (req, res) => {
  let { nombre, descripcion, foto, precio, stock, codigo } = req.body;
  precio = Number(precio);

  let timestamp = new Date().toLocaleString();
  try {
    productosDAO.create({
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
});

routerProduct.put("/:id", (req, res) => {
  const id = req.params.id;
  const producto = req.body;

  try {
    productosDAO.modify(id, producto);
    res.status(200).send("Producto modificado");
  } catch (error) {
    logger.error(error.message);
  }
});

routerProduct.delete("/:id", (req, res) => {
  const id = req.params.id;
  try {
    productosDAO.delete(id);
    res.status(200).send("Producto eliminado");
  } catch (error) {
    logger.error(error.message);
  }
});

export default routerProduct;
