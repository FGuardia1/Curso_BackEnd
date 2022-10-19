const express = require("express");
const { Router } = express;
const router = Router();

const Contenedor = require("../Contenedor");
const contenedor = new Contenedor();

router.get("/", (req, res, next) => {
  res.render("home.pug");
});

router.get("/productos", (req, res) => {
  res.render("listaProd.pug", { productos: contenedor.getAll() });
});

router.post("/productos", addId, (req, res) => {
  let { title, price, thumbnail, id } = req.body;
  price = Number(price);
  contenedor.save({ title, price, thumbnail, id });
  res.redirect("/");
});

function addId(req, res, next) {
  let prods = contenedor.getAll();
  if (prods.length) {
    let id = prods[prods.length - 1].id + 1;
    req.body.id = id;
  } else {
    req.body.id = 1;
  }
  next();
}

module.exports = router;
