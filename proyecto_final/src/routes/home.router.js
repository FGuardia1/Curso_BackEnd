import express from "express";
const routerHome = express.Router();
import { productosDAO } from "../daos/index.js";
import Authenticated from "../middlewars/index.js";

routerHome.get("/home", Authenticated, async (req, res) => {
  const products = await productosDAO.getAll();

  res.render("products", { products });
});
export default routerHome;
