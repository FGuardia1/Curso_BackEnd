import express from "express";
const routerCart = express.Router();
import { productosDAO, carritoDAO } from "../daos/index.js";
import logger from "../../utils/logger.js";
routerCart.get("/:id/productos", async (req, res) => {
  try {
    let cart = await carritoDAO.getById(req.params.id);
    res.send(cart.productos);
  } catch (error) {
    logger.error(error.message);
  }
});

routerCart.get("/", async (req, res) => {
  try {
    let cart = await carritoDAO.getBySearch({
      userId: req.session.passport.user,
    });
    res.send(cart._id);
  } catch (error) {
    logger.error(error.message);
  }
});

routerCart.delete("/:id", (req, res) => {
  const id = req.params.id;

  try {
    carritoDAO.delete(id);
    res.status(200).send("Carrito eliminado");
  } catch (error) {
    logger.error(error.message);
  }
});

routerCart.post("/", async (req, res) => {
  let userId = req.session.passport.user;

  let timestamp = new Date().toLocaleString();
  let productos = [];

  try {
    let newCartId = await carritoDAO.create({ timestamp, productos, userId });
    res.send({ id: newCartId });

    res.send("Carrito existente");
  } catch (error) {
    logger.error(error.message);
  }
});

routerCart.post("/:id/productos", async (req, res) => {
  const idCart = req.params.id;
  let { idProd } = req.body;

  try {
    let carrito = await carritoDAO.getById(idCart);
    let producto = await productosDAO.getById(idProd);
    carrito.productos.push(producto);
    carritoDAO.modify(idCart, carrito);
    res.status(200).send(carrito.productos);
  } catch (error) {
    logger.error(error.message);
  }
});

routerCart.delete("/:id/productos/:id_prod", async (req, res) => {
  const idCart = req.params.id;
  const idProd = req.params.id_prod;
  try {
    let carrito = await carritoDAO.getById(idCart);
    carrito.productos = carrito.productos.filter((el) => el.id != idProd);
    carritoDAO.modify(idCart, carrito);
    res.status(200).send("Producto eliminado de carrito");
  } catch (error) {
    logger.error(error.message);
  }
});

routerCart.delete("/:id/productos", async (req, res) => {
  const idCart = req.params.id;
  try {
    let carrito = await carritoDAO.getById(idCart);
    carrito.productos = [];
    carritoDAO.modify(idCart, carrito);
    res.status(200).send("Carrito vaciado");
  } catch (error) {
    logger.error(error.message);
  }
});

export default routerCart;
