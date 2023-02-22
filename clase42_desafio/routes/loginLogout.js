import express from "express";

export const routerLog = express.Router();
import passport from "passport";

import * as loginControllers from "../controller/logIn.controller.js";

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
