const express = require("express");
const validAdmin = require("../middlewars/index");
const routerProduct = express.Router();
const Crud = require("../Crud");
const products = new Crud("productos.txt");

routerProduct.get("/:id?", async (req, res) => {
  if (req.params.id) return res.send(await products.getById(req.params.id));
  else res.send(await products.getAll());
});

routerProduct.post("/", validAdmin, async (req, res) => {
  let { nombre, descripcion, foto, precio, stock } = req.body;
  let id = await getIdCodigo();
  precio = Number(precio);
  id = Number(id);
  let codigo = id;
  let timestamp = new Date().toLocaleString();
  products.create({
    nombre,
    descripcion,
    codigo,
    foto,
    precio,
    stock,
    id,
    codigo,
    timestamp,
  });
  res.status(200).send("Producto agregado");
});

routerProduct.put("/:id", validAdmin, (req, res) => {
  const id = req.params.id;
  const producto = req.body;
  products.modify(id, producto);
  res.status(200).send("Producto modificado");
});

routerProduct.delete("/:id", validAdmin, (req, res) => {
  const id = req.params.id;
  products.delete(id);
  res.status(200).send("Producto eliminado");
});

async function getIdCodigo() {
  let prods = await products.getAll();

  if (prods.length) {
    let id = prods[prods.length - 1].id + 1;

    return id;
  } else {
    return 1;
  }
}

module.exports = routerProduct;
