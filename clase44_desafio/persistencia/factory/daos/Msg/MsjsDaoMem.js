import { asDto } from "../../dtos/MsgDTO.js";

export default class MsjsDaoMem {
  constructor() {
    this.msjs = [];
  }

  init() {
    console.log("productos dao en memoria -> listo");
  }

  disconnect() {
    console.log("productos dao en memoria -> cerrado");
  }

  #getIndex(id) {
    return this.msjs.findIndex((msj) => msj.id === id);
  }

  getAll() {
    return asDto(this.msjs);
  }

  getById(idBuscado) {
    return asDto(this.msjs[this.#getIndex(idBuscado)]);
  }

  save(newMsj) {
    this.msjs.push(newMsj);
    return asDto(newMsj);
  }

  deleteById(idParaBorrar) {
    const [borrada] = this.msjs.splice(this.#getIndex(idParaBorrar), 1);
    return asDto(borrada);
  }

  deleteAll() {
    this.msjs = [];
  }

  updateById(idParaReemplazar, newMsj) {
    const index = this.#getIndex(idParaReemplazar);
    const actualizada = { ...this.msjs[index], ...newMsj };
    this.msjs.splice(index, 1, actualizada);
    return asDto(actualizada);
  }
}
