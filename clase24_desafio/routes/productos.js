const express = require("express");
const { Router } = express;
const router = Router();

function webAuth(req, res, next) {
  if (req.session?.nombre) {
    next();
  } else {
    res.redirect("/");
  }
}

router.get("/home", webAuth, (req, res, next) => {
  req.session.resetMaxAge;
  res.render("view/form_table_chat", { nombre: req.session.nombre });
});

module.exports = router;
