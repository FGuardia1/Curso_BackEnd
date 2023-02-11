const express = require("express");
const visualizarPagProd = require("../controller/operaciones_productos.js");

const { Router } = express;
const routerProduct = Router();
const Authenticated = require("./middlewars/middlewars.js");

routerProduct.get("/home", Authenticated, visualizarPagProd);

module.exports = routerProduct;
