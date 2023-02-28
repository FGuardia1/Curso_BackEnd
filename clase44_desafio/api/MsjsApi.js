import Msj from "../persistencia/modelos/Msj.js";
import MsjsRepo from "../persistencia/repos/MsjsRepo.js";

export default class MsjsApi {
  constructor() {
    this.dao = MsjsRepo.getInstancia();
  }

  getMsjs = async () => {
    try {
      let msjs = await this.dao.getAll();
      return msjs;
    } catch (error) {}
  };

  createMsj = async ({ datos }) => {
    let { email, nombre, apellido, edad, alias, avatar, texto, date } = datos;
    try {
      const nuevoMsj = await this.dao.add(
        new Msj({ email, nombre, apellido, edad, alias, avatar, texto, date })
      );

      return nuevoMsj;
    } catch (error) {}
  };
}
