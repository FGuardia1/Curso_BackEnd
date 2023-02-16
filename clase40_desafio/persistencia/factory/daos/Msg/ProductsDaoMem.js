import { asDto } from "../../dtos/ProductDTO.js";

export default class ProductsDaoMem {
  constructor() {
    this.products = [];
  }

  init() {
    console.log("productos dao en memoria -> listo");
  }

  disconnect() {
    console.log("productos dao en memoria -> cerrado");
  }

  #getIndex(id) {
    return this.products.findIndex((product) => product.id === id);
  }

  getAll() {
    return asDto(this.products);
  }

  getById(idBuscado) {
    return asDto(this.products[this.#getIndex(idBuscado)]);
  }

  save(newProduct) {
    this.products.push(newProduct);
    return asDto(newProduct);
  }

  deleteById(idParaBorrar) {
    const [borrada] = this.products.splice(this.#getIndex(idParaBorrar), 1);
    return asDto(borrada);
  }

  deleteAll() {
    this.products = [];
  }

  updateById(idParaReemplazar, newProduct) {
    const index = this.#getIndex(idParaReemplazar);
    const actualizada = { ...this.products[index], ...newProduct };
    this.products.splice(index, 1, actualizada);
    return asDto(actualizada);
  }
}
