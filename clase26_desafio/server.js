const express = require("express");
const { create } = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const { productDAO, chatDAO } = require("./daos");
const credential = require("./utils/credentials.js");
const util = require("util");
const routerProductos = require("./routes/productos.js");
const routerLogInOut = require("./routes/loginLogout.js");
const { normalizar, chatSchema } = require("./utils/normalizar.utils");
const app = express();
const PORT = 3000;
const session = require("express-session");
const MongoStore = require("connect-mongo");

const User = require("./models/user.js");
const mongoose = require("mongoose");

app.use(express.static("public"));
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const cookieParser = require("cookie-parser");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const passport = require("passport");
const Strategy = require("passport-local");
const { login, register } = require("./passport/strategy.js");

passport.use("register", new Strategy({ passReqToCallback: true }, register));
passport.use("login", new Strategy({ passReqToCallback: true }, login));

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

app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: credential.db_atlas_Url,
      mongoOptions: advancedOptions,
    }),
    secret: "shhhhhhhhhhhhhhhhhhhhh",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 60000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
app.use("/", routerProductos);
app.use("/", routerLogInOut);
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

httpServer.listen(PORT, async () => {
  console.log(`Server running on PORT ${PORT}`);

  try {
    await mongoose.connect(credential.db_mongo_local_Uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB mongo conectada");
  } catch (error) {
    console.log(`Error en conexión de Base de datos: ${error}`);
  }
});
