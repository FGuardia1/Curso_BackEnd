import Producto from "../persistencia/modelos/Product.js";
import ProductosRepo from "../persistencia/repos/ProductsRepo.js";

export default class ProductsApi {
  constructor() {
    this.dao = ProductosRepo.getInstancia();
  }

  getProducts = async () => {
    try {
      let prods = await this.dao.getAll();
      return prods;
    } catch (error) {}
  };

  createProduct = async ({ datos }) => {
    let { title, price, thumbnail } = datos;
    try {
      const nuevoProd = await this.dao.add(
        new Producto({ title, price, thumbnail })
      );
      return nuevoProd;
    } catch (error) {}
  };

  updateProduct = async ({ id, datos }) => {
    let { title, price, thumbnail } = datos;

    let resp = await this.dao.updateById(id, {
      title,
      price,
      thumbnail,
    });
    return resp;
  };

  deleteProduct = async ({ id }) => {
    try {
      let deleted = await this.dao.removeById(id);
      return deleted;
    } catch (error) {}
  };
}
