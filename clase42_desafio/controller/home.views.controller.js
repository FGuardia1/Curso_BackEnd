import { logger } from "../utils/logger.js";

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
  let msjs = await msjsRepo.getAll();
  msjs = msjs.map((e) => {
    e.date = new Date(e.date).toLocaleString();

    return e;
  });
  res.render("view/form_table_chat", {
    nombre: req.user.username,
    productos,
    msjs,
  });
};

const addMsg = async (req, res, next) => {
  let { email, nombre, apellido, edad, alias, avatar, texto, date } = req.body;
  try {
    msjsRepo.add(
      new Msj({ email, nombre, apellido, edad, alias, avatar, texto, date })
    );
    res.status(200).send({ valor: "agregado" });
  } catch (error) {
    logger.error(error.message);
  }
};

export { visualizarPagProd, addMsg };
