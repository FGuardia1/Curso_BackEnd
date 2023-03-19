import express from "express";
const routerPedido = express.Router();
import { createPedido } from "../controller/pedido.controller.js";
routerPedido.post("/new", createPedido);

export default routerPedido;
