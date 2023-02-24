import { getCollectionRandom } from "../negocio/operaciones_random.js";

import { logger } from "../utils/logger.js";

export const obtenerRandom = (req, res, next) => {
  logger.info(
    `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
  );
  let cant = 100000000;
  if (req.query.cant) {
    cant = req.query.cant;
  }

  res.send(getCollectionRandom(cant));
};
