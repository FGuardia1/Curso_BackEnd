import express from "express";
import passport from "passport";
const routerProduct = express.Router();

import { productosDAO } from "../daos/index.js";

routerProduct.get("/:id?", async (req, res) => {
  // console.log(req.session.passport.user);
  if (req.params.id) return res.send(await productosDAO.getById(req.params.id));
  else res.send(await productosDAO.getAll());
});

routerProduct.post("/", async (req, res) => {
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

routerProduct.put("/:id", (req, res) => {
  const id = req.params.id;
  const producto = req.body;
  productosDAO.modify(id, producto);
  res.status(200).send("Producto modificado");
});

routerProduct.delete("/:id", (req, res) => {
  const id = req.params.id;
  productosDAO.delete(id);
  res.status(200).send("Producto eliminado");
});

export default routerProduct;
