const express = require("express");
const { Router } = express;
const router = Router();
const Authenticated = require("../middlewars/middlewars.js");

router.get("/home", Authenticated, (req, res, next) => {
  req.session.resetMaxAge;
  res.render("view/form_table_chat", { nombre: req.user.username });
});

module.exports = router;
