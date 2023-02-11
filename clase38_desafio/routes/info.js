const express = require("express");
const { Router } = express;

const routerInfo = Router();
const compression = require("compression");
const obtenerInfo = require("../controller/operaciones_info");

routerInfo.get("/info", compression(), obtenerInfo);

module.exports = routerInfo;
