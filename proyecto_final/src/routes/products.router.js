import express from "express";
import { validAdmin } from "../middlewars/index.js";
const routerProduct = express.Router();

import { productosDAO } from "../daos/index.js";

routerProduct.get("/:id?", async (req, res) => {
  if (req.params.id) return res.send(await productosDAO.getById(req.params.id));
  else res.send(await productosDAO.getAll());
});

routerProduct.post("/", validAdmin, async (req, res) => {
  let { nombre, descripcion, foto, precio, stock, codigo } = req.body;
  precio = Number(precio);
  let timestamp = new Date().toLocaleString();
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
});

routerProduct.put("/:id", validAdmin, (req, res) => {
  const id = req.params.id;
  const producto = req.body;
  productosDAO.modify(id, producto);
  res.status(200).send("Producto modificado");
});

routerProduct.delete("/:id", validAdmin, (req, res) => {
  const id = req.params.id;
  productosDAO.delete(id);
  res.status(200).send("Producto eliminado");
});

export default routerProduct;
