import { logger } from "./utils/logger.js";
import { config } from "dotenv";
config();

const env = process.env;

import parseArgs from "minimist";

const options = {
  default: { puerto: 8080, modo: "fork" },
};
const argumentos = parseArgs(process.argv.slice(2), options);
const MONGO_ATLAS_URL = env.MONGO_ATLAS_URL;
const PORT = argumentos.puerto;
const MODO = argumentos.modo;

import express from "express";

import { create } from "express-handlebars";

import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";

import * as myRouter from "./routes/index.js";

const app = express();

import session from "express-session";
import MongoStore from "connect-mongo";
import { User } from "./models/user.js";
import mongoose from "mongoose";

app.use(express.static("public"));
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

import cookieParser from "cookie-parser";

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
import passport from "passport";
import { Strategy } from "passport-local";

import { login, register } from "./passport/strategy.js";

import cluster from "cluster";

import { cpus } from "os";
const numCpu = cpus().length;

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
      mongoUrl: MONGO_ATLAS_URL,
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

app.use("/", myRouter.routerLog);

app.use("/", myRouter.routerHome);
app.use("/api", myRouter.routerRandom);
app.use("/", myRouter.routerInfo);

app.get("/*", (req, res, next) => {
  res.send("error 404, pagina no encontrada");
  logger.warn(
    `Se intento acceder a la ruta inexistente ${req.originalUrl} por el metodo ${req.method} `
  );
});

if (MODO == "cluster") {
  if (cluster.isMaster) {
    for (let index = 0; index < numCpu; index++) {
      cluster.fork();
    }
  } else {
    httpServer.listen(PORT, async () => {
      console.log(`Server running on PORT ${PORT}, en modo ${MODO}`);
    });
  }
} else {
  httpServer.listen(PORT, async () => {
    console.log(`Server running on PORT ${PORT}, en modo ${MODO}`);

    try {
      await mongoose.connect(MONGO_ATLAS_URL + "&dbName=ecommerceDesafio", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      logger.info("DB mongo conectada");
    } catch (error) {
      logger.error(`Error en conexión de Base de datos: ${error}`);
    }
  });
}
