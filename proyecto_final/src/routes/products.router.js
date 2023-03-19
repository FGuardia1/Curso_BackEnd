import express from "express";
import passport from "passport";
const routerProduct = express.Router();
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";

routerProduct.get("/:id?", getProducts);

routerProduct.post("/", addProduct);

routerProduct.put("/:id", updateProduct);

routerProduct.delete("/:id", deleteProduct);

export default routerProduct;
