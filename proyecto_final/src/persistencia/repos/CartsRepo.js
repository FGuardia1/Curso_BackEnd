import Cart from "../modelos/Cart.js";

import CartsDaoFactory from "../factory/daos/Cart/CartsDaoFactory.js";
import { asDto } from "../factory/dtos/CartDTO.js";

let instancia = null;

export default class CartsRepo {
  #dao;

  constructor() {
    this.#dao = CartsDaoFactory.getDao();
  }

  async getAll() {
    const carts = await this.#dao.getAll();
    return carts.map((m) => new Cart(m));
  }

  async getById(idBuscado) {
    const dto = await this.#dao.getById(idBuscado);
    return new Cart(dto);
  }

  async getBySearch(filter) {
    const dto = await this.#dao.getBySearch(filter);

    return new Cart(dto);
  }

  async add(cartNew) {
    let newElement = await this.#dao.save(asDto(cartNew));
  }

  async removeById(idBuscado) {
    await this.#dao.deleteById(idBuscado);
  }

  async removeAll() {
    await this.#dao.deleteAll();
  }

  async modify(idParaReemplazar, newProduct) {
    let updprod = await this.#dao.modify(idParaReemplazar, newProduct);
  }

  static getInstancia = () => {
    if (!instancia) instancia = new CartsRepo();
    return instancia;
  };
}
