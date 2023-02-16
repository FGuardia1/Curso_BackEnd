import express from "express";
import {
  visualizarPagProd,
  addProduct,
  addMsg,
} from "../controller/operaciones_home.js";
import { Authenticated } from "./middlewars/middlewars.js";

const { Router } = express;
export const routerHome = Router();

routerHome.get("/home", Authenticated, visualizarPagProd);

routerHome.post("/add", Authenticated, addProduct);
routerHome.post("/addMsg", Authenticated, addMsg);
