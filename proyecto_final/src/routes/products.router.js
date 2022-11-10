import express from "express";
import { validAdmin } from "../middlewars/index.js";
const routerProduct = express.Router();
import Crud from "../Container/Crud.js";
const products = new Crud("productos.txt");

routerProduct.get("/:id?", async (req, res) => {
  if (req.params.id) return res.send(await products.getById(req.params.id));
  else res.send(await products.getAll());
});

routerProduct.post("/", validAdmin, async (req, res) => {
  let { nombre, descripcion, foto, precio, stock, codigo } = req.body;
  precio = Number(precio);
  let timestamp = new Date().toLocaleString();
  products.create({
    nombre,
    descripcion,
    codigo,
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
  products.modify(id, producto);
  res.status(200).send("Producto modificado");
});

routerProduct.delete("/:id", validAdmin, (req, res) => {
  const id = req.params.id;
  products.delete(id);
  res.status(200).send("Producto eliminado");
});

export default routerProduct;