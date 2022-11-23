import express from "express";
const routerCart = express.Router();
import Crud from "../Container/Crud.js";

import { productosDAO, carritoDAO } from "../daos/index.js";

routerCart.get("/:id/productos", async (req, res) => {
  let cart = await carritoDAO.getById(req.params.id);
  res.send(cart.productos);
});

routerCart.delete("/:id", (req, res) => {
  const id = req.params.id;
  carritoDAO.delete(id);
  res.status(200).send("Carrito eliminado");
});

routerCart.post("/", async (req, res) => {
  let timestamp = new Date().toLocaleString();
  let productos = [];
  let newCartId = await carritoDAO.create({ timestamp, productos });
  res.send({ id: newCartId });
});

routerCart.post("/:id/productos", async (req, res) => {
  const idCart = req.params.id;
  const { idProd } = req.body;
  let carrito = await carritoDAO.getById(idCart);
  let producto = await productosDAO.getById(idProd);

  carrito.productos.push(producto);
  carritoDAO.modify(idCart, carrito);
  res.status(200).send("Producto agregado a carrito");
});

routerCart.delete("/:id/productos/:id_prod", async (req, res) => {
  const idCart = req.params.id;
  const idProd = req.params.id_prod;
  let carrito = await carritoDAO.getById(idCart);
  carrito.productos = carrito.productos.filter((el) => el.id != idProd);
  carritoDAO.modify(idCart, carrito);
  res.status(200).send("Producto eliminado de carrito");
});

export default routerCart;
