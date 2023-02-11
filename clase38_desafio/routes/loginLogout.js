const express = require("express");
const { Router } = express;
const routerLog = Router();
const passport = require("passport");
const logger = require("../utils/logger.js");
routerLog.get("/", (req, res, next) => {
  logger.info(
    `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
  );
  res.redirect("/login");
});
routerLog.get("/login", (req, res, next) => {
  logger.info(
    `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
  );
  res.render("view/login");
});
routerLog.get("/register", (req, res, next) => {
  logger.info(
    `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
  );
  res.render("view/register");
});

routerLog.get("/failregister", (req, res) => {
  res.render("view/register-error", {});
});
routerLog.get("/faillogin", (req, res) => {
  logger.info(
    `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
  );
  res.render("view/login-error", {});
});

routerLog.get("/logout", (req, res) => {
  logger.info(
    `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
  );
  const username = req.user.username;
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.render("view/logout", { username });
  });
});

routerLog.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  (req, res) => {
    logger.info(
      `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
    );
    res.redirect("/home");
  }
);

routerLog.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  (req, res) => {
    logger.info(
      `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
    );
    res.redirect("/home");
  }
);

module.exports = routerLog;
