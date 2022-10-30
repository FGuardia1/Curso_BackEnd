const express = require("express");
const { create } = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const Contenedor = require("./Contenedor");
const ChatHistory = require("./ChatHistory");
const contenedor = new Contenedor();
const chatHistory = new ChatHistory("chat");
const messages = [
  {
    author: "Juan@gmail.com",
    text: "¡Hola! ¿Qué tal?",
    date: "29/10/2022, 21:00:53",
  },
];

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
  socket.emit("list-product", contenedor.getAll());
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
