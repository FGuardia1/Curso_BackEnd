const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routerProductos = require("./routes/productos.js");

app.use("/", routerProductos);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
