import passport from "passport";
import { logger } from "../utils/logger.js";

const aLogIn = (req, res, next) => {
  logger.info(
    `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
  );
  res.redirect("/login");
};
const mostrarLogIn = (req, res, next) => {
  logger.info(
    `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
  );
  res.render("view/login");
};

const mostrarRegister = (req, res, next) => {
  logger.info(
    `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
  );
  res.render("view/register");
};

const mostrarFailLogin = (req, res) => {
  res.render("view/login-error", {});
};

const mostrarFailRegister = (req, res) => {
  res.render("view/register-error");
};

const cerrarSesion = (req, res) => {
  logger.info(
    `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
  );
  const username = req.user.username;
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.render("view/logout", { username });
  });
};

const iniciarSesion = (req, res) => {
  logger.info(
    `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
  );
  res.redirect("/home");
};

export {
  aLogIn,
  mostrarLogIn,
  mostrarRegister,
  mostrarFailLogin,
  mostrarFailRegister,
  cerrarSesion,
  iniciarSesion,
};
