import { logger } from "../utils/logger.js";

import Producto from "../persistencia/modelos/Product.js";
import ProductosRepo from "../persistencia/repos/ProductsRepo.js";
const prodsRepo = ProductosRepo.getInstancia();

const addProduct = async (req, res, next) => {
  let { title, price, thumbnail } = req.body;
  try {
    let prodAdd = await prodsRepo.add(
      new Producto({ title, price, thumbnail })
    );
    res.status(200).send(prodAdd);
  } catch (error) {
    logger.error(error.message);
  }
};

const getProducts = async (req, res, next) => {
  try {
    let prods = await prodsRepo.getAll();

    res.status(200).send(prods);
  } catch (error) {
    logger.error(error.message);
  }
};

const deleteProduct = async (req, res, next) => {
  let { id } = req.params;
  try {
    let resp = await prodsRepo.removeById(id);
    res.status(200).send(resp);
  } catch (error) {
    logger.error(error.message);
  }
};

const updateProduct = async (req, res, next) => {
  let { id } = req.params;
  let { title, price, thumbnail } = req.body;
  let idParaReemplazar = id;
  try {
    let resp = await prodsRepo.updateById(idParaReemplazar, {
      title,
      price,
      thumbnail,
    });
    res.status(200).send(resp);
  } catch (error) {
    logger.error(error.message);
  }
};

export { getProducts, addProduct, deleteProduct, updateProduct };
