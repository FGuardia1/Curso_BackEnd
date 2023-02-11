const express = require("express");
const { Router } = express;
const routerRandom = Router();
obtenerRandom = require("../controller/operaciones_random.js");
routerRandom.get("/randoms", obtenerRandom);

module.exports = routerRandom;
