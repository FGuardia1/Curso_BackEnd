import express from "express";
const routerCart = express.Router();
import {
  getListProducts,
  addProdToCart,
  getCartIdByUser,
  deleteCart,
  createCart,
  removeProduct,
  clearCart,
} from "../controller/cart.controller.js";

routerCart.get("/:id/productos", getListProducts);

routerCart.get("/", getCartIdByUser);

routerCart.delete("/:id", deleteCart);

routerCart.post("/", createCart);

routerCart.post("/:id/productos", addProdToCart);

routerCart.delete("/:id/productos/:id_prod", removeProduct);

routerCart.delete("/:id/productos", clearCart);

export default routerCart;
