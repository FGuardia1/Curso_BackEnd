import express from "express";
import {
  visualizarPagProd,
  addMsg,
} from "../controller/home.views.controller.js";
import { Authenticated } from "./middlewars/middlewars.js";

const { Router } = express;
export const routerHome = Router();

routerHome.get("/home", Authenticated, visualizarPagProd);

routerHome.post("/addMsg", Authenticated, addMsg);
