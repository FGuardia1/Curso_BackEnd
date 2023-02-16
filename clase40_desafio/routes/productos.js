import express from "express";
import {
  visualizarPagProd,
  addProduct,
} from "../controller/operaciones_productos.js";
import { Authenticated } from "./middlewars/middlewars.js";

const { Router } = express;
export const routerProduct = Router();

routerProduct.get("/home", Authenticated, visualizarPagProd);

routerProduct.post("/add", Authenticated, addProduct);
