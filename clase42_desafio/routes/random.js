import express from "express";
import { obtenerRandom } from "../controller/random.controller.js";

export const routerRandom = express.Router();

routerRandom.get("/randoms", obtenerRandom);
