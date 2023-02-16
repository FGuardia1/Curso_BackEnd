import express from "express";
import { obtenerRandom } from "../controller/operaciones_random.js";

export const routerRandom = express.Router();

routerRandom.get("/randoms", obtenerRandom);
