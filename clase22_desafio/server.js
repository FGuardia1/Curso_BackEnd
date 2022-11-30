const express = require("express");
const { create } = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const { options_mariaDB, options_sqlite3 } = require("./connection/index");

const Contenedor = require("./containers/ContainerMemory");
const ChatHistory = require("./containers/ContainerFilesystem");
const contenedor = new Contenedor(options_mariaDB, "productos");
const chatHistory = new ChatHistory(options_sqlite3, "messages");

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

const routerProductos = require("./routes/productos.js");

app.use("/", routerProductos);

io.on("connection", async (socket) => {
  console.log("Un cliente se ha conectado");
  socket.emit("list-product", await contenedor.getAll());
  socket.emit("messages", await chatHistory.getAll());

  socket.on("new-message", (data) => {
    chatHistory.save(data);
    io.sockets.emit("messages-push", data);
  });

  socket.on("new-product", (data) => {
    contenedor.save(data);
    io.sockets.emit("product-push", data);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
