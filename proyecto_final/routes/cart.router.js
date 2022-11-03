import express from "express";
const routerCart = express.Router();
import Crud from "../Container/Crud.js";
const carritos = new Crud("carrito.txt");
const products = new Crud("productos.txt");

routerCart.get("/:id/productos", async (req, res) => {
  let cart = await carritos.getById(req.params.id);

  res.send(cart.productos);
});

routerCart.delete("/:id", (req, res) => {
  const id = req.params.id;
  carritos.delete(id);
  res.status(200).send("Carrito eliminado");
});

routerCart.post("/", async (req, res) => {
  let id = await getIdCodigo();

  let timestamp = new Date().toLocaleString();
  let productos = [];
  id = Number(id);
  carritos.create({ id, timestamp, productos });
  res.send({ id });
});

async function getIdCodigo() {
  let carts = await carritos.getAll();

  if (carts.length) {
    let id = carts[carts.length - 1].id + 1;
    return id;
  } else {
    return 1;
  }
}

routerCart.post("/:id/productos", async (req, res) => {
  const idCart = req.params.id;
  const { idProd } = req.body;
  let carrito = await carritos.getById(idCart);
  let producto = await products.getById(idProd);
  carrito.productos.push(producto);
  carritos.modify(idCart, carrito);
  res.status(200).send("Producto agregado a carrito");
});

routerCart.delete("/:id/productos/:id_prod", async (req, res) => {
  const idCart = req.params.id;
  const idProd = req.params.id_prod;
  let carrito = await carritos.getById(idCart);
  carrito.productos = carrito.productos.filter((el) => el.id != idProd);
  carritos.modify(idCart, carrito);
  res.status(200).send("Producto eliminado de carrito");
});

export default routerCart;
