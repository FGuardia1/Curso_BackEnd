const logger = require("../utils/logger.js");

const visualizarPagProd = (req, res, next) => {
  logger.info(
    `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
  );
  req.session.resetMaxAge;
  res.render("view/form_table_chat", { nombre: req.user.username });
};

module.exports = visualizarPagProd;
