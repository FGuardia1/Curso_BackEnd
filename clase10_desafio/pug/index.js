const express = require("express");
const app = express();
const port = 3000;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routerProductos = require("./routes/productos.js");

app.use("/", routerProductos);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
