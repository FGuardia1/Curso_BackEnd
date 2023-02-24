import express from "express";
import {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from "../controller/product.controller.js";

const { Router } = express;
export const routerProduct = Router();

routerProduct.post("/", addProduct);
routerProduct.get("/", getProducts);
routerProduct.delete("/:id", deleteProduct);
routerProduct.put("/:id", updateProduct);
