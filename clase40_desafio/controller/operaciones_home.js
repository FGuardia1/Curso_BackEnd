import { logger } from "../utils/logger.js";

import Producto from "../persistencia/modelos/Product.js";
import ProductosRepo from "../persistencia/repos/ProductsRepo.js";
import Msj from "../persistencia/modelos/Msj.js";
import MsjsRepo from "../persistencia/repos/MsjsRepo.js";
const prodsRepo = ProductosRepo.getInstancia();
const msjsRepo = MsjsRepo.getInstancia();
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
  try {
    prodsRepo.add(new Producto({ title, price, thumbnail }));
    res.status(200).send({ valor: "agregado" });
  } catch (error) {
    logger.error(error.message);
  }
};

const addMsg = async (req, res, next) => {
  let { nombre, apellido, edad, alias, avatar } = req.body;
  try {
    msjsRepo.add(new Msj({ nombre, apellido, edad, alias, avatar }));
  } catch (error) {
    logger.error(error.message);
  }
  // await ProdDao.save({ title, price, thumbnail });
};

export { visualizarPagProd, addProduct, addMsg };
