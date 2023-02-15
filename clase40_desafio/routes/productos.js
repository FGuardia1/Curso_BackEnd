const express = require("express");
const visualizarPagProd = require("../controller/operaciones_productos.js");

const { Router } = express;
const routerProduct = Router();
const Authenticated = require("./middlewars/middlewars.js");

routerProduct.get("/home", Authenticated, visualizarPagProd);

routerProduct.post("/add", Authenticated, (req, res, next) => {
  logger.info(
    `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
  );
  req.session.resetMaxAge;
  res.render("view/form_table_chat", { nombre: req.user.username });
});

module.exports = routerProduct;
