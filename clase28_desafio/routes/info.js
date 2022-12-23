const express = require("express");
const { Router } = express;
const router = Router();
const Authenticated = require("../middlewars/middlewars.js");

router.get("/info", (req, res, next) => {
  res.render("view/info", {
    argumentos: process.argv,
    nombrePlataforma: process.platform,
    versionNode: process.version,
    memoria: process.resourceUsage().maxRSS,
    pathEjec: process.execPath,
    IdProceso: process.pid,
    carpetaProy: process.cwd(),
  });
});

module.exports = router;
