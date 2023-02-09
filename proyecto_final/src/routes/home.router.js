import express from "express";
const routerHome = express.Router();
import { productosDAO, carritoDAO } from "../daos/index.js";
import Authenticated from "../middlewars/index.js";
import logger from "../../utils/logger.js";

routerHome.get("/home", Authenticated, async (req, res) => {
  const { name, avatar_path, _id } = req.user;

  try {
    const products = await productosDAO.getAll();
    let cart = await carritoDAO.getBySearch({
      userId: _id,
    });
    let listaCarrito = cart.productos;

    res.render("products", { products, name, listaCarrito, avatar_path });
  } catch (error) {
    logger.error(error.message);
  }
});
routerHome.get("/", Authenticated, async (req, res) => {
  res.redirect("/home");
});
export default routerHome;
