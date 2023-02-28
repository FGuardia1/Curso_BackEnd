import Msj from "../modelos/Msj.js";

import MsjsDaoFactory from "../factory/daos/Msg/MsjsDaoFactory.js";

import { asDto } from "../factory/dtos/MsgDTO.js";

let instancia = null;

export default class MsjsRepo {
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
    this.#dao = MsjsDaoFactory.getDao();
  }

  async getAll() {
    const msjs = await this.#dao.getAll();
    return msjs.map((m) => new Msj(m));
  }

  async getById(idBuscado) {
    const dto = await this.#dao.getById(idBuscado);
    return new Msj(dto);
  }

  async add(msjNew) {
    msjNew.setId(await this.generateId());

    let newElement = await this.#dao.save(asDto(msjNew));
    return new Msj(newElement);
  }

  async removeById(idBuscado) {
    const removida = await this.#dao.deleteById(idBuscado);
    return new Msj(removida);
  }

  async removeAll() {
    await this.#dao.deleteAll();
  }

  static getInstancia = () => {
    if (!instancia) instancia = new MsjsRepo();
    return instancia;
  };
}
