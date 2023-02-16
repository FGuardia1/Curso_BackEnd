import { logger } from "../utils/logger.js";

import Producto from "../persistencia/modelos/Product.js";
import ProductosRepo from "../persistencia/repos/ProductsRepo.js";

const prodsRepo = ProductosRepo.getInstancia();

const visualizarPagProd = async (req, res, next) => {
  logger.info(
    `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
  );
  req.session.resetMaxAge;

  let productos = await prodsRepo.getAll();

  res.render("view/form_table_chat", { nombre: req.user.username, productos });
};

const addProduct = async (req, res, next) => {
  let { title, price, thumbnail } = req.body;
  prodsRepo.add(new Producto({ title, price, thumbnail }));
};

const addMsg = async (req, res, next) => {
  let { id, nombre, apellido, edad, alias, avatar } = req.body;

  // await ProdDao.save({ title, price, thumbnail });
};

export { visualizarPagProd, addProduct, addMsg };
