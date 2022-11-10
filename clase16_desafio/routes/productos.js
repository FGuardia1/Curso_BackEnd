const express = require("express");
const { Router } = express;
const router = Router();

router.get("/", (req, res, next) => {
  res.render("view/form_table_chat");
});

module.exports = router;
