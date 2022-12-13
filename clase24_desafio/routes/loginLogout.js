const express = require("express");
const { Router } = express;
const router = Router();

router.get("/", (req, res, next) => {
  res.render("view/login");
});

router.get("/logout", (req, res) => {
  const nombre = req.session?.nombre;

  if (nombre) {
    req.session.destroy((err) => {
      if (!err) {
        res.render("view/logout", { nombre });
      } else {
        res.redirect("/");
      }
    });
  } else {
    res.redirect("/");
  }
});

router.post("/login", (req, res) => {
  req.session.nombre = req.body.nombre;
  res.redirect("/home");
});

module.exports = router;
