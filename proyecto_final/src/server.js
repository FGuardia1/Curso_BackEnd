import express from "express";
import routerProduct from "./routes/products.router.js";
import routerCart from "./routes/cart.router.js";
import routerLogin from "./routes/loginLogout.router.js";
import routerHome from "./routes/home.router.js";
import routerPedido from "./routes/pedido.router.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import * as strategy from "./passport/strategy.js";
import path from "path";
import { User } from "../utils/models/user.js";

const app = express();
const PORT = process.env.PORT || 8080;
const dirname = `${process.cwd()}`;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(dirname, "public")));

app.use(express.static(path.join(dirname, "../", "public")));
import exphbs from "express-handlebars";

app.set("view engine", "handlebars");

app.set("views", path.join(dirname, "src/views/view"));

app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(dirname, "src/views", "layouts"),
    partialsDir: path.join(dirname, "src/views", "partials"),
  })
);

app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://fer:contra123@cluster0.emeikir.mongodb.net/?retryWrites=true&w=majority",
      ttl: 600,
    }),
    secret: "sh",
    resave: false,
    saveUninitialized: false,
    rolling: false,
    cookie: {
      maxAge: 600000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(
  "login",
  new LocalStrategy({ passReqToCallback: true }, strategy.login)
);

passport.use(
  "register",
  new LocalStrategy({ passReqToCallback: true }, strategy.register)
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use("/api/productos", routerProduct);
app.use("/api/carrito", routerCart);
app.use("/login", routerLogin);
app.use("/api/pedido", routerPedido);
app.use("/", routerHome);

app.get("/js/main.js", function (req, res) {
  res.sendFile(path.join(dirname, "js", "main.js"));
});

app.use("*", (req, res) => {
  res.send("Pagina no encontrada");
});
const server = app.listen(PORT, async () => {
  console.log(`Servidor corriendo en puerto: ${PORT}`);
  try {
    await mongoose.connect(
      "mongodb+srv://fer:contra123@cluster0.emeikir.mongodb.net/?retryWrites=true&w=majority&dbName=ecommerceBackend",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("DB mongo conectada");
  } catch (error) {
    console.log(`Error en conexión de Base de datos: ${error}`);
  }
});

server.on("error", (err) => console.log(err));
