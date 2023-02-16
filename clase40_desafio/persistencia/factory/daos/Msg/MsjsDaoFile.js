import fs from "fs";
import { asDto } from "../../dtos/MsgDTO.js";

export default class MsjsDaoFile {
  constructor(ruta) {
    this.ruta = ruta;
    this.msjs = [];
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
    this.msjs = JSON.parse(texto);
  }

  async #escribirArchivo() {
    const texto = JSON.stringify(this.msjs, null, 2);
    await fs.promises.writeFile(this.ruta, texto);
  }

  #getIndex(id) {
    return this.msjs.findIndex((msjs) => msjs.id === id);
  }

  async getAll() {
    await this.#leerArchivo();
    return asDto(this.msjs);
  }

  async getById(idBuscado) {
    await this.#leerArchivo();
    return asDto(this.msjs[this.#getIndex(idBuscado)]);
  }

  async save(newMsjs) {
    await this.#leerArchivo();
    this.msjs.push(newMsjs);
    await this.#escribirArchivo();
    return asDto(newMsjs);
  }

  async deleteById(idParaBorrar) {
    await this.#leerArchivo();
    const [borrada] = this.msjs.splice(this.#getIndex(idParaBorrar), 1);
    await this.#escribirArchivo();
    return asDto(borrada);
  }

  async deleteAll() {
    this.msjs = [];
    await this.#escribirArchivo();
  }

  async updateById(idParaReemplazar, newMsj) {
    await this.#leerArchivo();
    const index = this.#getIndex(idParaReemplazar);
    const actualizada = { ...this.msjs[index], ...newMsj };
    this.msjs.splice(index, 1, actualizada);
    await this.#escribirArchivo();
    return asDto(actualizada);
  }
}
