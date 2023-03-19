import { productosDAO, carritoDAO } from "../daos/index.js";
import logger from "../../utils/logger.js";

import ProductosRepo from "../persistencia/repos/ProductsRepo.js";
const prodsRepo = ProductosRepo.getInstancia();

import CartsRepo from "../persistencia/repos/CartsRepo.js";
const cartsRepo = CartsRepo.getInstancia();

const getListProducts = async (req, res) => {
  try {
    let cart = await cartsRepo.getById(req.params.id);
    res.send(cart.productos);
  } catch (error) {
    logger.error(error.message);
  }
};

const getCartIdByUser = async (req, res) => {
  try {
    let cart = await cartsRepo.getBySearch({
      userId: req.session.passport.user,
    });
    res.send(cart.id);
  } catch (error) {
    logger.error(error.message);
  }
};

const deleteCart = (req, res) => {
  const id = req.params.id;

  try {
    cartsRepo.removeById(id);
    res.status(200).send("Carrito eliminado");
  } catch (error) {
    logger.error(error.message);
  }
};

const createCart = async (req, res) => {
  let userId = req.session.passport.user;

  let timestamp = new Date().toLocaleString();
  let productos = [];

  try {
    let newCartId = await cartsRepo.add({ timestamp, productos, userId });
    res.send({ id: newCartId });
  } catch (error) {
    logger.error(error.message);
  }
};

const addProdToCart = async (req, res) => {
  const idCart = req.params.id;
  let { idProd } = req.body;

  try {
    let carrito = await cartsRepo.getById(idCart);
    let producto = await prodsRepo.getById(idProd);
    carrito.productos.push(producto);
    cartsRepo.modify(idCart, carrito);
    res.status(200).send(carrito.productos);
  } catch (error) {
    logger.error(error.message);
  }
};

const removeProduct = async (req, res) => {
  const idCart = req.params.id;
  const idProd = req.params.id_prod;
  try {
    let carrito = await cartsRepo.getById(idCart);
    carrito.productos = carrito.productos.filter((el) => el.id != idProd);
    cartsRepo.modify(idCart, carrito);
    res.status(200).send("Producto eliminado de carrito");
  } catch (error) {
    logger.error(error.message);
  }
};

const clearCart = async (req, res) => {
  const idCart = req.params.id;
  try {
    let carrito = await cartsRepo.getById(idCart);
    carrito.productos = [];
    cartsRepo.modify(idCart, carrito);
    res.status(200).send("Carrito vaciado");
  } catch (error) {
    logger.error(error.message);
  }
};

export {
  getListProducts,
  addProdToCart,
  getCartIdByUser,
  deleteCart,
  createCart,
  removeProduct,
  clearCart,
};
