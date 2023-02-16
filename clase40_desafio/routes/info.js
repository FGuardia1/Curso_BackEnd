import express from "express";

export const routerInfo = express.Router();
import compression from "compression";

import { obtenerInfo } from "../controller/operaciones_info.js";

routerInfo.get("/info", compression(), obtenerInfo);
