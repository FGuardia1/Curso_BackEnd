import ProductosRepo from "../persistencia/repos/ProductsRepo.js";
const prodsRepo = ProductosRepo.getInstancia();

import CartsRepo from "../persistencia/repos/CartsRepo.js";
const cartsRepo = CartsRepo.getInstancia();

import logger from "../../utils/logger.js";

export const renderHome = async (req, res) => {
  const { name, avatar_path, _id } = req.user;

  try {
    const products = await prodsRepo.getAll();

    let cart = await cartsRepo.getBySearch({
      userId: _id,
    });
    let listaCarrito = cart.productos;

    res.render("products", { products, name, listaCarrito, avatar_path });
  } catch (error) {
    logger.error(error.message);
  }
};
