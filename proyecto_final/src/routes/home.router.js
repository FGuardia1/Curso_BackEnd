import express from "express";
const routerHome = express.Router();
import { productosDAO } from "../daos/index.js";
import Authenticated from "../middlewars/index.js";
import logger from "../../utils/logger.js";

routerHome.get("/home", Authenticated, async (req, res) => {
  const { name, avatar_path } = req.user;
  try {
    const products = await productosDAO.getAll();
    res.render("products", { products, name, avatar_path });
  } catch (error) {
    logger.error(error);
  }
});
routerHome.get("/", Authenticated, async (req, res) => {
  res.redirect("/home");
});
export default routerHome;
