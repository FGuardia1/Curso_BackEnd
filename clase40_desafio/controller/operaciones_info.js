const getInfoSystem = require("../negocio/operaciones_info.js");
const logger = require("../utils/logger.js");

const obtenerInfo = (req, res, next) => {
  res.render("view/info", getInfoSystem());
  logger.info(
    `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
  );
};

module.exports = obtenerInfo;
