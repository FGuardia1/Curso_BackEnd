import logger from "../../utils/logger.js";

import ProductosRepo from "../persistencia/repos/ProductsRepo.js";
const prodsRepo = ProductosRepo.getInstancia();

import CartsRepo from "../persistencia/repos/CartsRepo.js";

const cartsRepo = CartsRepo.getInstancia();
export const obtenerListadoCarrito = async (id) => {
  try {
    let cart = await cartsRepo.getById(id);
    return cart.productos;
  } catch (error) {
    logger.error(error.message);
  }
};

export const buscarCarritoXuser = async (userId) => {
  try {
    let cart = await cartsRepo.getBySearch({
      userId: userId,
    });

    return cart;
  } catch (error) {
    logger.error(error.message);
  }
};

export const eliminarCarrito = (id) => {
  try {
    cartsRepo.removeById(id);
  } catch (error) {
    logger.error(error.message);
  }
};

export const crearCarrito = async (userId) => {
  let timestamp = new Date().toLocaleString();
  let productos = [];

  try {
    let newCartId = await cartsRepo.add({ timestamp, productos, userId });
    return newCartId;
  } catch (error) {
    logger.error(error.message);
  }
};

export const agregarProdAcarrito = async (idCart, idProd) => {
  try {
    let carrito = await cartsRepo.getById(idCart);
    let producto = await prodsRepo.getById(idProd);
    carrito.productos.push(producto);
    cartsRepo.modify(idCart, carrito);
    return carrito.productos;
  } catch (error) {
    logger.error(error.message);
  }
};

export const quitarProdCarrito = async (idCart, idProd) => {
  try {
    let carrito = await cartsRepo.getById(idCart);
    carrito.productos = carrito.productos.filter((el) => el.id != idProd);
    cartsRepo.modify(idCart, carrito);
  } catch (error) {
    logger.error(error.message);
  }
};

export const vaciarCarrito = async (idCart) => {
  try {
    let carrito = await cartsRepo.getById(idCart);
    carrito.productos = [];
    cartsRepo.modify(idCart, carrito);
  } catch (error) {
    logger.error(error.message);
  }
};
