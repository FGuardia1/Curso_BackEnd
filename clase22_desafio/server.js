const express = require("express");
const { create } = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const { productDAO, chatDAO } = require("./daos");

const util = require("util");
const routerProductos = require("./routes/productos.js");
const { normalizar, chatSchema } = require("./utils/normalizar.utils");
const app = express();
const PORT = 3000;
app.use(express.static("public"));
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

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

app.use("/", routerProductos);

io.on("connection", async (socket) => {
  console.log("Un cliente se ha conectado");

  let chat = {
    id: "mensajes",
    mensajes: await chatDAO.getAll(),
  };
  const chat_normalizado = normalizar(chat, chatSchema);

  socket.emit("list-product", productDAO.getAll());
  socket.emit("messages", chat_normalizado);

  socket.on("new-message", (data) => {
    chatDAO.create(data);

    io.sockets.emit("messages-push", data);
  });

  socket.on("new-product", (data) => {
    contenedorProd.save(data);
    io.sockets.emit("product-push", data);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
