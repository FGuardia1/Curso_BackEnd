const express = require("express");
const { Router } = express;
const router = Router();

let productos = [
  {
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    id: 1,
  },
  {
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    id: 2,
  },
  {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    id: 3,
  },
];

router.get("/productos", (req, res) => {
  res.send({ productos });
});
router.get("/productos/:id", (req, res) => {
  const id = req.params.id;
  let prod = getById(id);
  res.send(prod);
});
router.post("/productos", addId, (req, res) => {
  let { title, price, thumbnail, id } = req.body;
  price = Number(price);
  productos.push({ title, price, thumbnail, id });
  res.send({ title, price, thumbnail, id });
});

router.put("/productos/:id", (req, res) => {
  const id = req.params.id;
  const producto = req.body;
  modify(id, producto)
    ? res.status(200).send("Producto actualizado")
    : res.send({
        error: "producto no encontrado",
      });
});

router.delete("/productos/:id", (req, res) => {
  const id = req.params.id;
  deleteById(id);
  res.status(200).send("Producto eliminado");
});

function getById(Number) {
  return (
    productos.find((element) => element.id == Number) || {
      error: "producto no encontrado",
    }
  );
}

function deleteById(id) {
  productos = productos.filter((el) => el.id != Number(id));
}

function modify(id, prodMod) {
  prodMod["id"] = id;
  const obj = productos.find((el) => el.id == id || el.id === Number(id));
  if (!obj) return false;
  productos = productos.map((item) => {
    if (item.id == id || item.id === Number(id)) return prodMod;
    return item;
  });
  return true;
}

function addId(req, res, next) {
  if (productos.length) {
    let id = productos[productos.length - 1].id + 1;
    req.body.id = id;
  } else {
    req.body.id = 1;
  }
  console.log("id prod", req.body.id);
  next();
}

module.exports = router;
