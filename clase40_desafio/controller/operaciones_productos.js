import ProductsDaoFactory from "../persistencia/factory/daos/ProductsDaoFactory.js";

import { logger } from "../utils/logger.js";
let ProdDao = ProductsDaoFactory.getDao();
const visualizarPagProd = (req, res, next) => {
  logger.info(
    `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
  );
  req.session.resetMaxAge;
  res.render("view/form_table_chat", { nombre: req.user.username });
};

const addProduct = async (req, res, next) => {
  console.log("prd agregado");
  let { title, price, thumbnail } = req.body;

  await ProdDao.save({ title, price, thumbnail });
  res.send({ valor: "agregado!!!" });
};

export { visualizarPagProd, addProduct };
