import Producto from "../modelos/Product.js";

import ProductsDaoFactory from "../factory/daos/Product/ProductsDaoFactory.js";
import { asDto } from "../factory/dtos/ProductDTO.js";

let instancia = null;

export default class ProductosRepo {
  #dao;

  constructor() {
    this.#dao = ProductsDaoFactory.getDao();
  }

  async getAll() {
    const products = await this.#dao.getAll();
    return products.map((p) => new Producto(p));
  }

  async getById(idBuscado) {
    const dto = await this.#dao.getById(idBuscado);
    return new Producto(dto);
  }

  async add(prodNew) {
    let agregado = await this.#dao.create(asDto(prodNew));
    return new Producto(agregado);
  }

  async removeById(idBuscado) {
    const removida = await this.#dao.delete(idBuscado);
  }

  async removeAll() {
    await this.#dao.deleteAll();
  }
  async modify(idParaReemplazar, newProduct) {
    let updprod = await this.#dao.modify(idParaReemplazar, newProduct);
  }

  static getInstancia = () => {
    if (!instancia) instancia = new ProductosRepo();
    return instancia;
  };
}
