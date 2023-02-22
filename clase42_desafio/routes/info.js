import express from "express";

export const routerInfo = express.Router();
import compression from "compression";

import { obtenerInfo } from "../controller/info.controller.js";
routerInfo.get("/info", compression(), obtenerInfo);
