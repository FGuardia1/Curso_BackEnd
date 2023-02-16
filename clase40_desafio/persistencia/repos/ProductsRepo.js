import Producto from "../modelos/Product.js";

import ProductsDaoFactory from "../factory/daos/Product/ProductsDaoFactory.js";
import { asDto } from "../factory/dtos/ProductDTO.js";

let instancia = null;

export default class ProductosRepo {
  #dao;

  async generateId() {
    let arr = await this.#dao.getAll();
    if (arr.length === 0) {
      return 1;
    } else {
      let id = arr[arr.length - 1].id;

      return parseInt(id) + 1;
    }
  }

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
    prodNew.setId(await this.generateId());

    await this.#dao.save(asDto(prodNew));
  }

  async removeById(idBuscado) {
    const removida = await this.#dao.deleteById(idBuscado);
    return new Producto(removida);
  }

  async removeAll() {
    await this.#dao.deleteAll();
  }

  static getInstancia = () => {
    if (!instancia) instancia = new ProductosRepo();
    return instancia;
  };
}
