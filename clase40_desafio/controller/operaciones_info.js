import { getInfoSystem } from "../negocio/operaciones_info.js";

import { logger } from "../utils/logger.js";

export const obtenerInfo = (req, res, next) => {
  res.render("view/info", getInfoSystem());
  logger.info(
    `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
  );
};
