import fs from "fs";

import { asDto } from "../dtos/ProductDTO.js";

export default class ProductsDaoFile {
  constructor(ruta) {
    this.ruta = ruta;
    this.productos = [];
  }

  async init() {
    try {
      await fs.promises.readFile(this.ruta, "utf-8");
    } catch (error) {
      await fs.promises.writeFile(this.ruta, "[]");
    }
  }

  disconnect() {
    console.log("productos dao en archivo -> cerrado");
  }

  async #leerArchivo() {
    const texto = await fs.promises.readFile(this.ruta, "utf-8");
    this.productos = JSON.parse(texto);
  }

  async #escribirArchivo() {
    const texto = JSON.stringify(this.productos, null, 2);
    await fs.promises.writeFile(this.ruta, texto);
  }

  #getIndex(id) {
    return this.productos.findIndex((productos) => productos.id === id);
  }

  async getAll() {
    await this.#leerArchivo();
    return asDto(this.productos);
  }

  async getById(idBuscado) {
    await this.#leerArchivo();
    return asDto(this.productos[this.#getIndex(idBuscado)]);
  }

  async save(newProd) {
    await this.#leerArchivo();
    this.productos.push(newProd);
    await this.#escribirArchivo();
    return asDto(newProd);
  }

  async deleteById(idParaBorrar) {
    await this.#leerArchivo();
    const [borrada] = this.productos.splice(this.#getIndex(idParaBorrar), 1);
    await this.#escribirArchivo();
    return asDto(borrada);
  }

  async deleteAll() {
    this.productos = [];
    await this.#escribirArchivo();
  }

  async updateById(idParaReemplazar, newProduct) {
    await this.#leerArchivo();
    const index = this.#getIndex(idParaReemplazar);
    const actualizada = { ...this.productos[index], ...newProduct };
    this.productos.splice(index, 1, actualizada);
    await this.#escribirArchivo();
    return asDto(actualizada);
  }
}
