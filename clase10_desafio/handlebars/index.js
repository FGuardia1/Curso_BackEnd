const express = require("express");
const { create } = require("express-handlebars");

const app = express();
const port = 3000;

const hbs = create({
  helpers: {
    arrayVacio(productos) {
      if (productos.length) return false;
      return true;
    },
  },
});

app.engine("handlebars", hbs.engine);

app.set("view engine", "handlebars");

app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routerProductos = require("./routes/productos.js");

app.use("/", routerProductos);

app.listen(port, () => {
  console.log(`Server listeting on port ${port}`);
});
