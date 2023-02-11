const express = require("express");
const { Router } = express;
const routerLog = Router();
const passport = require("passport");
const loginControllers = require("../controller/operaciones_logIn_logOut_register.js");
routerLog.get("/", loginControllers.aLogIn);

routerLog.get("/login", loginControllers.mostrarLogIn);

routerLog.get("/register", loginControllers.mostrarRegister);

routerLog.get("/failregister", loginControllers.mostrarFailRegister);

routerLog.get("/faillogin", loginControllers.mostrarFailLogin);

routerLog.get("/logout", loginControllers.cerrarSesion);

routerLog.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  loginControllers.iniciarSesion
);

routerLog.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  loginControllers.iniciarSesion
);

module.exports = routerLog;
