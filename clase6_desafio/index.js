const express = require("express");
const app = express();
const PORT = 8080;
const Contenedor = require("./Contenedor");
const contenedor = new Contenedor("productos");

app.get("/productos", async (req, res) => {
  res.send(await contenedor.getAll());
});

app.get("/productoRandom", async (req, res) => {
  let items = await contenedor.getAll();
  res.send(items[Math.floor(Math.random() * items.length)]);
});

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
